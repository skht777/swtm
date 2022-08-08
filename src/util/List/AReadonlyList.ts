import { isEqualable } from '$util/Equalable';
import type { BinaryFunction, BinaryPredicate, ForEach, Mapper, Nullable, Undefinable } from '$util/Type';
import { Type } from '$util/Type';
import type { List } from './List';
import type { ReadonlyList } from './ReadonlyList';

export abstract class AReadonlyList<V> implements ReadonlyList<V> {
  protected list: V[];

  protected constructor(list: V[]) {
    this.list = list;
  }

  public abstract filter<W extends V>(predicate: (value: V, i: number) => value is W): List<W>;
  public abstract filter(predicate: BinaryPredicate<V, number>): List<V>;

  public abstract map<W>(mapper: Mapper<V, W>): List<W>;

  public abstract sort(comparator: BinaryFunction<V, V, number>): List<V>;

  public [Symbol.iterator](): IterableIterator<[number, V]> {
    return this.iterator();
  }

  public contains(value: V): boolean {
    const found: Undefinable<V> = this.list.find((v: V): boolean => {
      if (v === value) {
        return true;
      }
      if (isEqualable(v)) {
        return v.equals(value);
      }

      return false;
    });

    return !Type.isUndefined(found);
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof AReadonlyList)) {
      return false;
    }
    if (this.size() !== other.size()) {
      return false;
    }

    return this.list.every((v: V, i: number): boolean => {
      if (v === other.list[i]) {
        return true;
      }
      if (isEqualable(v)) {
        return v.equals(other.list[i]);
      }

      return false;
    });
  }

  public every(predicate: BinaryPredicate<V, number>): boolean {
    return this.list.every(predicate);
  }

  protected filterInternal(predicate: BinaryPredicate<V, number>): V[] {
    const arr: V[] = [];

    this.list.forEach((v: V, i: number): void => {
      if (predicate(v, i)) {
        arr.push(v);
      }
    });

    return arr;
  }

  public find(predicate: BinaryPredicate<V, number>): Nullable<V> {
    const found: Undefinable<V> = this.list.find(predicate);

    if (Type.isUndefined(found)) {
      return null;
    }

    return found;
  }

  public forEach(foreach: ForEach<number, V>): void {
    this.list.forEach(foreach);
  }

  public get(key: number): Nullable<V> {
    const v: Undefinable<V> = this.list[key];

    if (Type.isUndefined(v)) {
      return null;
    }

    return v;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public iterator(): IterableIterator<[number, V]> {
    return this.list
      .map((v: V, i: number): [number, V] => {
        return [i, v];
      })
      .values();
  }

  public reduce(reducer: BinaryFunction<V, V, V>): V;
  public reduce(reducer: BinaryFunction<V, V, V>, initialValue: V): V;
  public reduce(reducer: BinaryFunction<V, V, V>, initialValue?: V): V {
    if (Type.isUndefined(initialValue)) {
      return this.list.reduce(reducer);
    }

    return this.list.reduce(reducer, initialValue);
  }

  public serialize(): string {
    return this.list
      .map((v: V): string => {
        if (Type.isUndefined(v)) {
          return 'undefined';
        }
        if (Type.isNull(v)) {
          return 'null';
        }

        return String(v);
      })
      .join(', ');
  }

  public size(): number {
    return this.list.length;
  }

  public some(predicate: BinaryPredicate<V, number>): boolean {
    return this.list.some(predicate);
  }

  public toArray(): V[] {
    return [...this.list];
  }

  public toString(): string {
    return this.serialize();
  }

  public values(): Iterable<V> {
    return this.toArray();
  }
}
