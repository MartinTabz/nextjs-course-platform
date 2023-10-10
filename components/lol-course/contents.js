import akali from '@public/lol-course/akali.webp';
import jinx from '@public/lol-course/jinx.webp';
import underline from '@public/lol-course/underline.png';
import style from '@styles/lol-course/contents.module.css';
import discord from '@styles/lol-course/discord.module.css';
import Image from 'next/image';
import { FaDiscord, FaGift } from 'react-icons/fa6';
import bonus from "@public/lol-course/bonustag.webp"

export default function Contents() {
	const chapters = [
		{
			name: 'Chapter One',
			lesson_count: 5,
			desc: 'The basics of League of Legends',
			bonus: false,
		},
		{
			name: 'Chapter Two',
			lesson_count: 6,
			desc: 'Key elements of the game',
			bonus: false,
		},
		{
			name: 'Chapter Three',
			lesson_count: 6,
			desc: 'Master your role',
			bonus: false,
		},
		{
			name: 'Chapter Four',
			lesson_count: 4,
			desc: 'The rules of success',
			bonus: false,
		},
		{
			name: 'Bonus Chapter',
			lesson_count: 3,
			desc: 'Practical exercises',
			bonus: true,
		},
	];
	return (
		<>
			<section className={style.section}>
				<div className={style.area}>
					<div className={style.top}>
						<h2>Content of the Course</h2>
						<span>Over 5 Hours Of Educational Content</span>
						<Image
							src={underline}
							alt="Conquer The Nexus - Content of the Course"
						/>
					</div>
					<div className={style.chapters}>
						{chapters.map((ch, index) => (
							<div className={style.item} key={index}>
								{ch.bonus ? (
									<div className={style.bonus}>
										<FaGift />
									</div>
								) : (
									<span className={style.count}>{index + 1}</span>
								)}
								<div className={style.item_info}>
									<h4>
										{ch.name}
										<span>{ch.lesson_count} lessons</span>
									</h4>
									<p>{ch.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<Image className={style.akali} src={akali} alt="" />
				<Image className={style.jinx} src={jinx} alt="" />
			</section>
			<section className={discord.section}>
				<div className={discord.box}>
               <Image className={discord.bonus} src={bonus} alt='' />
					<FaDiscord className={discord.logo} />
					<div className={discord.info}>
						<h3>Free access to League Of Legends server</h3>
						<p>
							After purchasing the course, you will receive an invitation to a
							special Discord server where you can find educational content,
							news, and many other interesting things related to League of
							Legends
						</p>
					</div>
				</div>
            <div className={discord.background}></div>
			</section>
		</>
	);
}
