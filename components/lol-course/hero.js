import bg from '@public/lol-course/herobg.webp';
import video from '@public/lol-course/videothumb.webp';
import style from '@styles/lol-course/hero.module.css';
import Image from 'next/image';

export default function Hero() {
	return (
		<section className={style.section}>
			<div className={style.area}>
				<div className={style.top_text}>
					<h1>
						The Complete Guide to <br /> League of Legends
					</h1>
					<p>
						Join our League of Legends course to level up your gaming skills and
						be trained like a professional player under the expert guidance of
						former LCS coach DanDan
					</p>
				</div>
				<div className={style.video}>
					<div className={style.video_top}>Watch The Video - Find out everything you need to know!</div>
					<div className={style.video_video}>
						<Image src={video} alt="Temporary video banner" />
					</div>
				</div>
			</div>
			<Image
				className={style.bg}
				src={bg}
				alt="Conquer The Nexus - League of Legends professional course"
			/>
		</section>
	);
}
