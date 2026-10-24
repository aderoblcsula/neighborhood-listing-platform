import "server-only";

import { createClient } from "@supabase/supabase-js";

function requireEnvironmentVariable(name: string): string {
	const value = process.env[name];

	if (!value) {
		throw new Error(`Missing required server environment variable: ${name}`);
	}

	return value;
}

export function createPublicDatabaseClient() {
	return createClient(
		requireEnvironmentVariable("SUPABASE_URL"),
		requireEnvironmentVariable(
			"NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
		),
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		},
	);
}