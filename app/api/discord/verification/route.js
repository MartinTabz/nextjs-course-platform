import { getServiceSupabase } from '@utils/service-supabase';

export async function POST(req) {
	var discordid = null;
	try {
		const { userid } = await req.json();
		discordid = userid;
	} catch (error) {
		console.log(error);
	}

	if (discordid == null) {
		const send = {
			exist: null,
			purchased: null,
			error: 'Something went wrong with sending user ID',
		};
		return new Response(JSON.stringify(send));
	}

	const supabase = getServiceSupabase();

	const { data: profile } = await supabase
		.from('profile')
		.select('id')
		.eq('discord_id', discordid)
		.single();

	if (!profile?.id) {
		const send = {
			exist: false,
			purchased: false,
			error: null,
		};
		return new Response(JSON.stringify(send));
	}

	const { data: hasproduct } = await supabase
		.from('purchase')
		.select('id')
		.eq('user', profile.id);

	if (hasproduct == null || hasproduct.length == 0) {
		const send = {
			exist: true,
			purchased: false,
			error: null,
		};
		return new Response(JSON.stringify(send));
	}

	if (hasproduct.length > 0) {
		const send = {
			exist: true,
			purchased: true,
			error: null,
		};
		return new Response(JSON.stringify(send));
	} else {
		const send = {
			exist: true,
			purchased: false,
			error: null,
		};
		return new Response(JSON.stringify(send));
	}
}
