'use client';

import style from '@styles/signin.module.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { BsDiscord } from 'react-icons/bs';

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
	};

	return (
		<section className={style.section}>
			<button className={style.btn} onClick={handleSignIn}>
				<BsDiscord />
				Sign In with Discord
			</button>
		</section>
	);
}
