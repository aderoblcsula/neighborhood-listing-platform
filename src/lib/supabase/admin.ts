import "server-only";

import { createClient } from "@supabase/supabase-js";

export function createAdminDatabaseClient() {
	const url = process.env.SUPABASE_URL;

	// Prefer the exam-required name while preserving the existing setup.
	const key =
		process.env.SUPABASE_SERVICE_ROLE_KEY ||
		process.env.SUPABASE_SECRET_KEY;

	if (!url || !key) {
		throw new Error("Missing administrator database configuration.");
	}

	return createClient(url, key, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});
}