import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function PreorderPage({ searchParams }) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: already, error: already_error } = await supabase
		.from('preorder')
		.select('id')
		.eq('user', session.user.id)
		.eq('product', searchParams.p);

	if (already_error) {
		redirect('/preorder/failed');
	} else if (already.length > 0) {
		redirect('/preorder/succeeded');
	} else {
		const { data: new_preorder, error: new_preorder_error } = await supabase
			.from('preorder')
			.insert([{ product: searchParams.p, user: session.user.id }])
			.select()
			.single();

		if (new_preorder_error || new_preorder == null) {
			redirect('/preorder/failed');
		} else {
			redirect('/preorder/succeeded');
		}
	}
}
