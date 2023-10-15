import champ from '@public/lol-course/champ2.png';
import line from '@public/lol-course/underline.png';
import style from '@styles/lol-course/how.module.css';
import Image from 'next/image';
import { IoFlame, IoGameController, IoTrophySharp } from 'react-icons/io5';

export default function How() {
	return (
		<section className={style.section}>
			<div className={style.area}>
				<div className={style.top}>
					<h2>You will achieve LOL Mastery</h2>
					<span>Via professional in this endeavour</span>
					<Image
						src={line}
						alt="Imagine what you could achieve if you had professional teaching you how to get better"
					/>
				</div>
				<div className={style.how_area}>
					<div className={style.text_area}>
						<div className={style.info}>
							<h3>Taught by professional</h3>
							<p>
								You will get access to well-structured video course made by
								professional coach covering everything from mastering game
								mechanics to advanced tactics.
							</p>
						</div>
						<div className={style.items}>
							<div className={style.item}>
								<IoGameController />
								<h3>
									Professional player for <b>6 years</b>
								</h3>
							</div>
							<div className={style.item}>
								<IoTrophySharp />
								<h3>
									Coached <b>100Thieves</b>
								</h3>
							</div>
							<div className={style.item}>
								<IoFlame />
								<h3>
									Challenger as <b>3 different roles</b>
								</h3>
							</div>
							<span className={style.meet}>Meet DanDan</span>
						</div>
					</div>
					<div className={style.img_area}>
						<Image
							src={champ}
							alt="Conquer The Nexus: Course taught by professional coach"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
