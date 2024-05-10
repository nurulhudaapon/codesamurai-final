import * as formatters from './format';
import * as sorters from './sort';
import * as utils from './utils';
import * as zone from './zone';

export const Time = {
	...formatters,
	...sorters,
	...utils,
	...zone,
};
