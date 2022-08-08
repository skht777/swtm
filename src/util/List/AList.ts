import type { BinaryFunction, BinaryPredicate, Mapper } from '$util/Type';
import { Type } from '$util/Type';
import { AReadonlyList } from './AReadonlyList';
import type { List } from './List';

export abstract class AList<V> extends AReadonlyList<V> implements List<V> {
  protected constructor(list: V[]) {
    super(list);
  }

  public abstract add(value: V): List<V>;

  public abstract override filter<W extends V>(predicate: (value: V, i: number) => value is W): List<W>;
  public abstract override filter(predicate: BinaryPredicate<V, number>): List<V>;

  public abstract override map<W>(mapper: Mapper<V, W>): List<W>;

  public abstract remove(key: number): List<V>;

  public abstract set(key: number, value: V): List<V>;

  public abstract override sort(comparator: BinaryFunction<V, V, number>): List<V>;

  protected removeInternal(key: number): V[] {
    if (!Type.isInteger(key)) {
      return this.list;
    }
    if (key < 0 || this.list.length <= key) {
      return this.list;
    }

    return [...this.list.slice(0, key), ...this.list.slice(key + 1)];
  }

  protected setInternal(key: number, value: V): V[] {
    if (!Type.isInteger(key)) {
      return this.list;
    }
    if (key < 0 || this.list.length <= key) {
      return this.list;
    }

    return [...this.list.slice(0, key), value, ...this.list.slice(key + 1)];
  }
}
