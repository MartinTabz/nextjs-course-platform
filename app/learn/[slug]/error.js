'use client';

import ShowError from '@components/errors';

export default function Error({ error, reset }) {
	return <ShowError e={{ error, reset }} />;
}
