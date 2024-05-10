import _groupBy from 'lodash/groupBy';
import _sumBy from 'lodash/sumBy';

/**
 * Creates an object composed of keys generated from the results of running each element of collection through
 * iteratee. The corresponding value of each key is an array of the elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @param array The collection to iterate over.
 * @param groupKey The property name to group by.
 * @return Returns the composed aggregate object.
 */
export const groupBy = <DataT>(array: DataT[], groupKey: keyof DataT) => _groupBy(array, groupKey);

export const sumBy = _sumBy;

export const sum = <T>(data: T[] | undefined, field: (d: T) => number | null | undefined) => {
    return data?.reduce((acc, item) => acc + (field(item) || 0), 0) || 0;
}
