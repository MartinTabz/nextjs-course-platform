import style from '@styles/lol-course/features.module.css';
import { FaCrown, FaInfinity, FaLightbulb } from 'react-icons/fa6';

export default function Features() {
	return (
		<section className={style.section}>
			<div className={style.area}>
				<div className={style.item}>
					<FaInfinity />
					<span>Full lifetime access</span>
				</div>
				<div className={style.item}>
					<FaCrown />
					<span>Learn from the best</span>
				</div>
				<div className={style.item}>
					<FaLightbulb />
					<span>Practical tips & tricks</span>
				</div>
			</div>
		</section>
	);
}
