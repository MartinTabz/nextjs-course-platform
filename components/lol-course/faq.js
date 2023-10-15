'use client';

import style from '@styles/lol-course/faq.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export default function Faq() {
	const [dropdownStates, setDropdownStates] = useState({});

	const data = [
		{
			q: 'Who is the course for?',
			a: 'The course is for anyone who is ready to start learning and playing according to the coaches advice.',
		},
		{
			q: 'How long does the course last?',
			a: 'The course includes more than 4 hours of educational videos and practical exercises so you can train yourself',
		},
		{
			q: 'How much experience do I need to have with the game?',
			a: 'It can be done without any experience, but we recommend that you have at least a basic understanding of how the game works to be able to fully understand the course. ',
		},
		{
			q: 'How do I access the videos and the rest of the material after purchase?',
			a: 'When you make a purchase, you will need to sign in via Discord and the course will then appear on this page. If you log out or want to access the course from another device, you will find a login button at the bottom of this page.',
		},
		{
			q: 'What if I have any other questions about the course?',
			a: 'If you have any other questions about the course do not hesitate to contact us at support@cqrgame.com',
		},
	];

	const handleOpen = (index) => {
		console.log(index);
		setDropdownStates((prevState) => ({
			...prevState,
			[index]: !prevState[index],
		}));
	};

	return (
		<section className={style.section}>
			<div className={style.area}>
				<h2>Frequently Asked Questions</h2>
				<div className={style.questions}>
					{data.map((item, index) => (
						<div
							style={{
								border: dropdownStates[index] ? '1px solid #646464' : '',
							}}
							onClick={() => handleOpen(index)}
							className={style.item}
							key={index}
						>
							<div
								style={{
									borderBottom: dropdownStates[index]
										? '1px solid #646464'
										: '',
								}}
								className={style.question}
							>
								<span>{item.q}</span>
								<MdOutlineKeyboardArrowDown
									style={{
										transform: dropdownStates[index] && 'rotate(180deg)',
									}}
								/>
							</div>
							<AnimatePresence>
								{dropdownStates[index] && (
									<motion.div
										initial={{ height: 0 }}
										animate={{
											height: 'auto',
											transition: {
												delay: 0,
											},
										}}
										exit={{
											height: 0,
											transition: {
												delay: 0.3,
											},
										}}
										transition={{ duration: 0.3 }}
										className={style.answer}
									>
										<motion.p
											initial={{ opacity: 0 }}
											animate={{
												opacity: 1,
												transition: {
													delay: 0.3,
												},
											}}
											exit={{
												opacity: 0,
												transition: {
													delay: 0,
												},
											}}
										>
											{item.a}
										</motion.p>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					))}
				</div>
				<div className={'lol-cta'}>
					<a href="#join">Join now</a>
				</div>
			</div>
		</section>
	);
}
