import type { Collection } from '$util/Collection';
import type { BinaryFunction, BinaryPredicate, Mapper } from '$util/Type';
import { AList } from './AList';

export class MutableList<V> extends AList<V> {
  public static empty<V>(): MutableList<V> {
    return MutableList.ofInternal([]);
  }

  public static of<V>(collection: Collection<number, V>): MutableList<V> {
    return MutableList.ofInternal([...collection.values()]);
  }

  public static ofArray<V>(array: readonly V[]): MutableList<V> {
    return MutableList.ofInternal([...array]);
  }

  private static ofInternal<V>(array: V[]): MutableList<V> {
    return new MutableList(array);
  }

  protected constructor(list: V[]) {
    super(list);
  }

  public add(value: V): MutableList<V> {
    this.list.push(value);

    return this;
  }

  public filter<W extends V>(predicate: (value: V, i: number) => value is W): MutableList<W>;
  public filter(predicate: BinaryPredicate<V, number>): MutableList<V>;
  public filter(predicate: BinaryPredicate<V, number>): MutableList<V> {
    return MutableList.ofArray(this.filterInternal(predicate));
  }

  public map<W>(mapper: Mapper<V, W>): MutableList<W> {
    return MutableList.ofArray(this.list.map<W>(mapper));
  }

  public remove(key: number): MutableList<V> {
    this.list = this.removeInternal(key);

    return this;
  }

  public set(key: number, value: V): MutableList<V> {
    this.list = this.setInternal(key, value);

    return this;
  }

  public sort(comparator: BinaryFunction<V, V, number>): MutableList<V> {
    this.list.sort(comparator);

    return this;
  }
}
