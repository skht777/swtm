import type { Equalable } from './Equalable';
import type { BinaryPredicate, ForEach, Mapper, Nullable } from './Type';

export interface Collection<K, V> extends Equalable, Iterable<[K, V]> {
  contains(value: V): boolean;

  every(predicate: BinaryPredicate<V, K>): boolean;

  filter(predicate: BinaryPredicate<V, K>): Collection<K, V>;

  find(predicate: BinaryPredicate<V, K>): Nullable<V>;

  forEach(foreach: ForEach<K, V>): void;

  get(key: K): Nullable<V>;

  isEmpty(): boolean;

  iterator(): IterableIterator<[K, V]>;

  map<W>(mapper: Mapper<V, W>): Collection<K, W>;

  size(): number;

  some(predicate: BinaryPredicate<V, K>): boolean;

  values(): Iterable<V>;
}
