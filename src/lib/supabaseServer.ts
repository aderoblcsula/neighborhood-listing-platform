import "server-only";

import { createAdminDatabaseClient } from "@/lib/supabase/admin";
import { createAuthenticatedDatabaseClient } from "@/lib/supabase/authenticated";

export { createPublicDatabaseClient } from "@/lib/supabase/public";
export { createAuthenticatedDatabaseClient };

type AdminAuthorization =
	| {
			ok: true;
			database: ReturnType<typeof createAdminDatabaseClient>;
	  }
	| {
			ok: false;
			response: Response;
	  };

export async function authorizeAdmin(
	request: Request,
): Promise<AdminAuthorization> {
	const authorization = request.headers.get("authorization");
	const token = authorization?.match(/^Bearer\s+(\S+)$/i)?.[1];

	if (!token) {
		return {
			ok: false,
			response: Response.json(
				{ error: "Authentication required." },
				{ status: 401 },
			),
		};
	}

	try {
		// Verify the caller with their own session first.
		const userDatabase = createAuthenticatedDatabaseClient(token);

		const {
			data: { user },
			error: authenticationError,
		} = await userDatabase.auth.getUser(token);

		if (authenticationError || !user) {
			return {
				ok: false,
				response: Response.json(
					{ error: "Authentication required." },
					{ status: 401 },
				),
			};
		}

		// Read the protected database role, never a caller-supplied role.
		const { data: profile, error: profileError } = await userDatabase
			.from("profiles")
			.select("role")
			.eq("id", user.id)
			.maybeSingle();

		if (profileError) {
			return {
				ok: false,
				response: Response.json(
					{ error: "Unable to verify access." },
					{ status: 500 },
				),
			};
		}

		if (profile?.role !== "admin") {
			return {
				ok: false,
				response: Response.json(
					{ error: "Administrator access required." },
					{ status: 403 },
				),
			};
		}

		// Create the privileged client only after administrator verification.
		return {
			ok: true,
			database: createAdminDatabaseClient(),
		};
	} catch {
		return {
			ok: false,
			response: Response.json(
				{ error: "Unable to verify access." },
				{ status: 500 },
			),
		};
	}
}