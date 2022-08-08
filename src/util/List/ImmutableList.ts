import type { Collection } from '$util/Collection';
import type { BinaryFunction, BinaryPredicate, Mapper } from '$util/Type';
import { AList } from './AList';

export class ImmutableList<V> extends AList<V> {
  private static readonly EMPTY: ImmutableList<unknown> = new ImmutableList<unknown>([]);

  public static empty<V>(): ImmutableList<V> {
    return ImmutableList.EMPTY as ImmutableList<V>;
  }

  public static of<V>(collection: Collection<number, V>): ImmutableList<V> {
    return ImmutableList.ofInternal([...collection.values()]);
  }

  public static ofArray<V>(array: readonly V[]): ImmutableList<V> {
    return ImmutableList.ofInternal([...array]);
  }

  private static ofInternal<V>(array: V[]): ImmutableList<V> {
    if (array.length === 0) {
      return ImmutableList.empty();
    }

    return new ImmutableList(array);
  }

  protected constructor(list: V[]) {
    super(list);
  }

  public add(value: V): ImmutableList<V> {
    return ImmutableList.ofArray([...this.list, value]);
  }

  public filter<W extends V>(predicate: (value: V, i: number) => value is W): ImmutableList<W>;
  public filter(predicate: BinaryPredicate<V, number>): ImmutableList<V>;
  public filter(predicate: BinaryPredicate<V, number>): ImmutableList<V> {
    return ImmutableList.ofArray(this.filterInternal(predicate));
  }

  public override isEmpty(): boolean {
    return this === ImmutableList.empty();
  }

  public map<W>(mapper: Mapper<V, W>): ImmutableList<W> {
    return ImmutableList.ofArray(this.list.map(mapper));
  }

  public remove(key: number): ImmutableList<V> {
    const list: V[] = this.removeInternal(key);

    if (list === this.list) {
      return this;
    }

    return ImmutableList.ofArray(list);
  }

  public set(key: number, value: V): ImmutableList<V> {
    const list: V[] = this.setInternal(key, value);

    if (list === this.list) {
      return this;
    }

    return ImmutableList.ofArray(list);
  }

  public sort(comparator: BinaryFunction<V, V, number>): ImmutableList<V> {
    const list: V[] = this.toArray();

    list.sort(comparator);

    return ImmutableList.ofArray(list);
  }
}
