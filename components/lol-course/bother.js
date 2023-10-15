import icon1 from '@public/lol-course/lolicon1.webp';
import icon2 from '@public/lol-course/lolicon2.webp';
import icon3 from '@public/lol-course/lolicon3.webp';
import underline from '@public/lol-course/underline.png';
import style from '@styles/lol-course/bother.module.css';
import box from '@styles/lol-course/box.module.css';
import Image from 'next/image';
import { HiShoppingCart } from 'react-icons/hi';

export default function Bother() {
	return (
		<section className={style.section}>
			<div className={style.area}>
				<div className={style.text_area}>
					<div className={style.top}>
						<span>Step-by-step learning</span>
						<h2>Why Bother<br />getting a course </h2>
						<Image src={underline} alt="" />
					</div>
					<p>
						Experienced players have unraveled the game's intricacies over time,
						making it highly challenging to master. Join the course coached by
						DanDan where he'll take you from basic mechanics to advanced
						strategies, role improvement, teamwork tips, and practical exercises
						for overall game enhancement.
					</p>
				</div>
				<div className={box.section}>
					<div className={box.area}>
						<div className={box.text}>
							<h2>Complete Guide</h2>
							<p>
								Discover your full potential in League of Legends under the
								guidance of a former professional coach and climb higher than
								ever before!
							</p>
							<a href="#join">
								<HiShoppingCart />
								Yes! I want to improve
							</a>
						</div>
						<div className={box.img}>
							<Image src={icon3} alt="" />
						</div>
					</div>
					<a className={box.mobil_cta} href="#join">
						<HiShoppingCart />
						Yes! I want to improve
					</a>
					<Image className={box.bgicon1} src={icon1} alt="" />
					<Image className={box.bgicon2} src={icon2} alt="" />
				</div>
			</div>
		</section>
	);
}
