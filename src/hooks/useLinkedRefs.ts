import { useEffect, useRef } from 'react';

export const useLinkedRefs = <T>(...targets: any[]) => {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const { current } = ref;

		targets
			.filter(t => t)
			.forEach(t => {
				switch (typeof t) {
					case 'function':
						return t(current);
					default:
						t.current = current;
				}
			});
	}, [targets]);

	return ref;
};
