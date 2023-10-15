import champ from '@public/lol-course/champ1.png';
import line from '@public/lol-course/underline.png';
import style from '@styles/lol-course/why.module.css';
import Image from 'next/image';
import { GiBiceps, GiLaurelCrown, GiRoundStar } from 'react-icons/gi';

export default function Why() {
	return (
		<section className={style.section}>
			<div className={style.area}>
				<div className={style.top}>
					<h2>Imagine what you could achieve </h2>
					<span>If you had professional teaching you how to get better</span>
					<Image
						src={line}
						alt="Imagine what you could achieve if you had professional teaching you how to get better"
					/>
				</div>
				<div className={style.why_area}>
					<div className={style.img_area}>
						<Image
							src={champ}
							alt="Conquer The Nexus Course: Imagine what you could achieve if you had professional teaching you how to get better"
						/>
					</div>
					<div className={style.text_area}>
						<div className={style.item}>
							<GiBiceps />
							<h3>
								<b>Carry</b> your team every game
							</h3>
						</div>
						<div className={style.item}>
							<GiLaurelCrown />
							<h3>
								Become <b>the best</b> in your group
							</h3>
						</div>
						<div className={style.item}>
							<GiRoundStar />
							<h3>
								<b>Achieve</b> your dream rank
							</h3>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
