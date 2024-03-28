
type EmptyObject = {};

export type BaseProps<
	Keys extends keyof GlobalProps = keyof EmptyObject,
	RequiredKeys extends Keys = keyof EmptyObject
> = {
	className?: string;
} & Omit<Pick<GlobalProps, Keys>, RequiredKeys> &
	Required<Pick<GlobalProps, RequiredKeys>>;

export type ThemeSize = 'sm' | 'xs' | 'lg';

export interface GlobalProps {
	size?: ThemeSize;
	loading?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
}
