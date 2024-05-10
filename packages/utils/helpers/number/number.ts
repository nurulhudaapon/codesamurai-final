import * as calculators from './calc';
import * as formatters from './format';
import * as parsers from './parse';

export const Number = {
	...formatters,
	...calculators,
	...parsers,
};
