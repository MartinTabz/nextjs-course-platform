'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function SigninPage() {
	const supabase = createClientComponentClient();
	const router = useRouter();

	const handleSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/auth/callback`,
			},
		});
		router.refresh();
	};

	return (
		<div>
			<h1>Sign In</h1>
			<button onClick={handleSignIn}>Sign In with Discord</button>
		</div>
	);
}
