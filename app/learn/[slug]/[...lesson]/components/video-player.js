'use client';

import MuxVideo from '@mux/mux-video-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function VideoPlayer({ passedData }) {
	const supabase = createClientComponentClient();

	const handleView = async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (session) {
			const { data: progress } = await supabase
				.from('progress')
				.select('viewed')
				.eq('user', session.user.id)
				.eq('lesson', passedData.lekceId)
				.single();
			if (!progress) {
				await supabase
					.from('progress')
					.insert([{ user: session.user.id, lesson: passedData.lekceId }]);
			}
		}
	};

	return (
		<div>
			<MuxVideo
				onEnded={() => handleView()}
				controls
				streamType="on-demand"
				src={passedData.videoUrl}
				type="hls"
			/>
		</div>
	);
}
