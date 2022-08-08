import type { Collection } from '../Collection';
import { ImmutableList } from '../List/ImmutableList';
import type { ReadonlyList } from '../List/ReadonlyList';
import type { BinaryFunction, BinaryPredicate, ForEach, Mapper, Nullable } from '../Type';
import { Duration } from './Duration';

export class Durations implements Collection<number, Duration> {
  private readonly durations: ImmutableList<Duration>;

  public static empty(): Durations {
    return Durations.ofArray([]);
  }

  public static of(durations: ReadonlyList<Duration>): Durations {
    return Durations.ofArray(durations.toArray());
  }

  public static ofArray(durations: readonly Duration[]): Durations {
    return new Durations(ImmutableList.ofArray(durations));
  }

  protected constructor(durations: ImmutableList<Duration>) {
    this.durations = durations;
  }

  public [Symbol.iterator](): IterableIterator<[number, Duration]> {
    return this.iterator();
  }

  public contains(value: Duration): boolean {
    return this.durations.contains(value);
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Durations)) {
      return false;
    }

    return this.durations.equals(other.durations);
  }

  public every(predicate: BinaryPredicate<Duration, number>): boolean {
    return this.durations.every(predicate);
  }

  public filter(predicate: BinaryPredicate<Duration, number>): Durations {
    return Durations.of(this.durations.filter(predicate));
  }

  public find(predicate: BinaryPredicate<Duration, number>): Nullable<Duration> {
    return this.durations.find(predicate);
  }

  public forEach(foreach: ForEach<number, Duration>): void {
    this.durations.forEach(foreach);
  }

  public get(key: number): Nullable<Duration> {
    return this.durations.get(key);
  }

  public isEmpty(): boolean {
    return this.durations.isEmpty();
  }

  public iterator(): IterableIterator<[number, Duration]> {
    return this.durations.iterator();
  }

  public map<W>(mapper: Mapper<Duration, W>): Collection<number, W> {
    return this.durations.map(mapper);
  }

  public merge(): Duration {
    if (this.durations.isEmpty()) {
      return Duration.NONE;
    }

    return this.durations.reduce((d1: Duration, d2: Duration) => {
      return Duration.merge(d1, d2);
    });
  }

  public size(): number {
    return this.durations.size();
  }

  public some(predicate: BinaryPredicate<Duration, number>): boolean {
    return this.durations.some(predicate);
  }

  public sort(comparator: BinaryFunction<Duration, Duration, number>): Durations {
    return Durations.of(this.durations.sort(comparator));
  }

  public sortByDateTime(): Durations {
    const durations: ImmutableList<Duration> = this.durations.sort((d1: Duration, d2: Duration) => {
      if (d1.from.isBefore(d2.from)) {
        return -1;
      }
      if (d1.from.isAfter(d2.from)) {
        return 1;
      }
      if (d1.to.isBefore(d2.to)) {
        return -1;
      }
      if (d1.to.isAfter(d2.to)) {
        return 1;
      }

      return 0;
    });

    return Durations.of(durations);
  }

  public toArray(): Duration[] {
    return this.durations.toArray();
  }

  public toString(): string {
    return this.durations
      .toArray()
      .map((d: Duration): string => {
        return d.toString();
      })
      .join(', ');
  }

  public values(): Iterable<Duration> {
    return this.durations.values();
  }
}
