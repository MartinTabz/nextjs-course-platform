import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';

export default async function DashboardPage() {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session.user.id) {
	}

	const { data: profile, error } = await supabase
		.from('profile')
		.select('*')
		.eq('id', session.user.id)
      .single();

	if (error) {
		throw new Error(error.message);
	}

	return (
		<div>
			<h1>Welcome to the Dashboard</h1>
			{session && (
				<div>
					<h2>This is your profile:</h2>
               <Image src={profile.avatar_url} width={100} height={100} />
               <h3>{profile.discord_name}</h3>
               <span>{profile.email}</span>
				</div>
			)}
		</div>
	);
}
