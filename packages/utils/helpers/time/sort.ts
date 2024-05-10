/**
 * Sorts two dates
 * @param a
 * @param b
 * @returns
 */
export const sort = (a: Date | string, b: Date | string, type: 'asc' | 'desc' = 'asc') => {
	const dateA = new Date(a);
	const dateB = new Date(b);

	if (type === 'desc') return dateB.getTime() - dateA.getTime();

	return dateA.getTime() - dateB.getTime();
};

export function createSorter<DataT, Key extends keyof DataT>(key: Key, type?: 'asc' | 'desc') {
	return (a: DataT, b: DataT) => sort(String(a[key]), String(b[key]), type);
}

export function createFixer<DataT, Key extends keyof DataT>(key: Key) {
	return (item: DataT) => ({ ...item, [key]: new Date(String(item[key]) + 'Z') });
}
