import "server-only";

import { createClient } from "@supabase/supabase-js";

function requireEnvironmentVariable(name: string): string {
	const value = process.env[name];

	if (!value) {
		throw new Error(`Missing required server environment variable: ${name}`);
	}

	return value;
}

export function createAdminDatabaseClient() {
	return createClient(
		requireEnvironmentVariable("SUPABASE_URL"),
		requireEnvironmentVariable("SUPABASE_SECRET_KEY"),
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		},
	);
}