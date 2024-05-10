import * as casing from './casing';
import * as cloning from './clone';
import * as decoders from './decode';
import * as encoders from './encode';
import * as formatters from './format';

export const String = {
	...casing,
	...formatters,
	...cloning,
	...encoders,
	...decoders,
};
