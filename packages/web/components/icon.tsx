import {
	X,
	Check,
	ChevronUp,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	LucideProps,
	Plus,
	LogOut
} from 'lucide-react';

export const icons = {
	Cross: X,
	Check,
	ChevronUp,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Plus,
	LogOut
};

export type IconsTypes = keyof typeof icons;

export interface IconProps extends Omit<LucideProps, 'name' | 'size'> {
	name: IconsTypes;
	size?: 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	currentColor?: boolean;
}

export const Icon = ({ size, currentColor, ...prop }: IconProps) => {
	const { color, ...restProps } = prop;
	const IconComponent = icons[prop.name];

	const iconDefaultSize = size || 'default';

	const iconSize: Record<typeof iconDefaultSize, number> = {
		default: 18,
		xs: 12,
		sm: 14,
		md: 16,
		lg: 20,
		xl: 24,
	};

	return (
		<IconComponent
			size={iconSize[iconDefaultSize]}
			{...restProps}
		/>
	);
};