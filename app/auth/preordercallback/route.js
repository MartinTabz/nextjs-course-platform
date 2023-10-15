import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');
	const p = requestUrl.searchParams.get('p');

	if (code) {
		const supabase = createRouteHandlerClient({ cookies });
		await supabase.auth.exchangeCodeForSession(code);
	}

	// URL to redirect to after sign in process completes
	const redirectURL = new URL('/preorder', request.url); // Assuming "/preorder" is the absolute path
	redirectURL.searchParams.set('p', p);

	return NextResponse.redirect(redirectURL.toString());
}
