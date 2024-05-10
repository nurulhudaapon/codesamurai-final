import { formatToDate, formatToTime } from './format';

test('Helpers.Time.formatToDate', () => {
	expect(formatToDate(new Date('2000-01-01T00:00:00.0000'))).toEqual('Jan 1, 2000');
	expect(formatToDate(new Date('2022-01-31T00:00:00.0000'))).toEqual('Jan 31, 2022');
	expect(formatToDate(new Date('I am not a Date'))).toEqual(null);
});

test('Helpers.Time.formatToTime', () => {
	expect(formatToTime(new Date('2000-01-01T00:00:00.0800'))).toEqual('12:00 AM');
	expect(formatToTime(new Date('2022-01-31T13:00:00.0000'))).toEqual('1:00 PM');
	expect(formatToTime(new Date('I am not a Date'))).toEqual(null);
});
