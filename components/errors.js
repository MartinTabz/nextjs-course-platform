'use client';

export default function ShowError({ e }) {
	return (
		<>
			<h1>Something went wrong!</h1>
			<span>{e.error.message}</span>
			<button onClick={e.reset}>Try Again</button>
		</>
	);
}
