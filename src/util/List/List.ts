import type { BinaryFunction, BinaryPredicate, Mapper } from '$util/Type';
import type { ReadonlyList } from './ReadonlyList';

export interface List<V> extends ReadonlyList<V> {
  add(value: V): List<V>;

  filter<W extends V>(predicate: (value: V, i: number) => value is W): List<W>;

  filter(predicate: BinaryPredicate<V, number>): List<V>;

  map<W>(mapper: Mapper<V, W>): List<W>;

  remove(key: number): List<V>;

  set(key: number, value: V): List<V>;

  sort(comparator: BinaryFunction<V, V, number>): List<V>;
}
