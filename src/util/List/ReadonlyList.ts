import type { Collection } from '$util/Collection';
import type { BinaryFunction, BinaryPredicate, Mapper } from '$util/Type';

export interface ReadonlyList<V> extends Collection<number, V> {
  filter<W extends V>(predicate: (value: V, i: number) => value is W): ReadonlyList<W>;

  filter(predicate: BinaryPredicate<V, number>): ReadonlyList<V>;

  map<W>(mapper: Mapper<V, W>): ReadonlyList<W>;

  reduce(reducer: BinaryFunction<V, V, V>): V;

  reduce(reducer: BinaryFunction<V, V, V>): V;

  reduce(reducer: BinaryFunction<V, V, V>, initialValue: V): V;

  sort(comparator: BinaryFunction<V, V, number>): ReadonlyList<V>;

  toArray(): V[];
}
