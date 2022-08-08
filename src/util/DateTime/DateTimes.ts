import type { Collection } from '$util/Collection';
import type { Equalable } from '$util/Equalable';
import { ImmutableList } from '$util/List/ImmutableList';
import type { ReadonlyList } from '$util/List/ReadonlyList';
import type { BinaryPredicate, ForEach, Mapper, Nullable } from '$util/Type';
import type { DateTime } from './DateTime';

export class DateTimes implements Collection<number, DateTime>, Equalable {
  private readonly datetimes: ImmutableList<DateTime>;

  public static empty(): DateTimes {
    return DateTimes.ofArray([]);
  }

  public static of(datetimes: ReadonlyList<DateTime>): DateTimes {
    return DateTimes.ofArray(datetimes.toArray());
  }

  public static ofArray(datetimes: readonly DateTime[]): DateTimes {
    return new DateTimes(ImmutableList.ofArray(datetimes));
  }

  protected constructor(datetimes: ImmutableList<DateTime>) {
    this.datetimes = datetimes;
  }

  public [Symbol.iterator](): IterableIterator<[number, DateTime]> {
    return this.iterator();
  }

  public contains(value: DateTime): boolean {
    return this.datetimes.contains(value);
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof DateTimes)) {
      return false;
    }

    return this.datetimes.equals(other.datetimes);
  }

  public every(predicate: BinaryPredicate<DateTime, number>): boolean {
    return this.datetimes.every(predicate);
  }

  public filter(predicate: BinaryPredicate<DateTime, number>): DateTimes {
    return DateTimes.of(this.datetimes.filter(predicate));
  }

  public find(predicate: BinaryPredicate<DateTime, number>): Nullable<DateTime> {
    return this.datetimes.find(predicate);
  }

  public forEach(foreach: ForEach<number, DateTime>): void {
    this.datetimes.forEach(foreach);
  }

  public get(key: number): Nullable<DateTime> {
    return this.datetimes.get(key);
  }

  public isEmpty(): boolean {
    return this.datetimes.isEmpty();
  }

  public iterator(): IterableIterator<[number, DateTime]> {
    return this.datetimes.iterator();
  }

  public map<W>(mapper: Mapper<DateTime, W>): Collection<number, W> {
    return this.datetimes.map(mapper);
  }

  public size(): number {
    return this.datetimes.size();
  }

  public some(predicate: BinaryPredicate<DateTime, number>): boolean {
    return this.datetimes.some(predicate);
  }

  public toArray(): DateTime[] {
    return this.datetimes.toArray();
  }

  public toString(): string {
    return this.datetimes
      .toArray()
      .map((d: DateTime): string => {
        return d.toString();
      })
      .join(', ');
  }

  public values(): Iterable<DateTime> {
    return this.datetimes.values();
  }
}
