/**
 * Returns a clone name based on the existing names and the clone name
 * @param existingNames List of existing names
 * @param cloneName The name of the clone
 * @returns `CLONE_NAME Clone (CLONE_NUMBER)`
 * @example getCloneName(['Test Clone (1)', 'Test Clone (4)'], 'Test') => 'Test Clone (5)'
 */
export function getCloneName(existingNames: string[], { cloneName }: { cloneName: string }) {
	const CloneNameRegex = /(.*)\sClone\s\((\d+)\)$/;
	const cleanedCloneName = cloneName.replace(CloneNameRegex, '$1');

	const matchingNamesCloneNumber = existingNames
		.filter((name) => name.replace(CloneNameRegex, '$1') === cleanedCloneName)
		.map((name) => +name.replace(CloneNameRegex, '$2'))
		.filter((number) => !isNaN(number));

	const minimumAvailableCloneNumber = Math.max(...matchingNamesCloneNumber, 0) + 1;

	return `${cleanedCloneName} Clone (${minimumAvailableCloneNumber})`;
}
