import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarWeeks,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds
} from 'date-fns';
import differenceInCalendarQuarters from 'date-fns/differenceInCalendarQuarters';
import type { List } from '$util/List/List';
import { MutableList } from '$util/List/MutableList';
import { ValueObject } from '$util/ValueObject';
import type { DateTimeUnit } from './DateTime';
import { DateTime } from './DateTime';
import { DateTimeError } from './DateTimeError';
import { DateTimes } from './DateTimes';

export type ModifyingDateTime = 'from' | 'to';

const FROM = 'from';
const TO = 'to';

export class Duration extends ValueObject {
  private readonly _from: DateTime;
  private readonly _to: DateTime;

  public static readonly NONE: Duration = new Duration(DateTime.NONE, DateTime.NONE);

  public static merge(duration1: Duration, duration2: Duration): Duration {
    if (duration1.isNone()) {
      return duration2;
    }
    if (duration2.isNone()) {
      return duration1;
    }

    let from: DateTime = duration1._from;
    let to: DateTime = duration1._to;

    if (duration2._from.isBefore(duration1._from)) {
      from = duration2._from;
    }
    if (duration2._to.isAfter(duration1._to)) {
      to = duration2._to;
    }

    return Duration.of(from, to);
  }

  public static of(from: DateTime, to: DateTime): Duration {
    if (from.isNone() || to.isNone()) {
      return Duration.NONE;
    }
    if (from.isAfter(to)) {
      const f: string = from.toString();
      const t: string = to.toString();

      throw new DateTimeError(`from IS AFTER THAN to. from: ${f}, to: ${t}`);
    }

    return new Duration(from, to);
  }

  protected constructor(from: DateTime, to: DateTime) {
    super();
    this._from = from;
    this._to = to;
  }

  public advance(num: number, unit: DateTimeUnit): Duration {
    return Duration.of(this._from.sub(num, unit), this._to.sub(num, unit));
  }

  /**
   * shorten the Duration by clipping from or to
   */
  public clip(modifying: ModifyingDateTime, num: number, unit: DateTimeUnit): Duration {
    switch (modifying) {
      case FROM: {
        return Duration.of(this._from.add(num, unit), this._to);
      }
      case TO:
      default: {
        return Duration.of(this._from, this._to.sub(num, unit));
      }
    }
  }

  public contains(datetime: DateTime): boolean {
    return !(datetime.isBefore(this._from) || datetime.isAfter(this._to));
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Duration)) {
      return false;
    }
    if (!this._from.equals(other._from)) {
      return false;
    }
    if (!this._to.equals(other._to)) {
      return false;
    }

    return true;
  }

  /**
   * lengthen the Duration by extending from or to
   */
  public extend(modifying: ModifyingDateTime, num: number, unit: DateTimeUnit): Duration {
    switch (modifying) {
      case FROM: {
        return Duration.of(this._from.sub(num, unit), this._to);
      }
      case TO:
      default: {
        return Duration.of(this._from, this._to.add(num, unit));
      }
    }
  }

  public includes(other: Duration): boolean {
    if (this._from.isBefore(other._from) || this._from.isSame(other._from)) {
      return this._to.isAfter(other._to) || this._to.isSame(other._to);
    }

    return false;
  }

  public isNone(): boolean {
    return this === Duration.NONE;
  }

  public overlapsWith(other: Duration): boolean {
    if (this._to.isBefore(other._from)) {
      return false;
    }
    if (other._to.isBefore(this._from)) {
      return false;
    }

    return true;
  }

  public postpone(num: number, unit: DateTimeUnit): Duration {
    return Duration.of(this._from.add(num, unit), this._to.add(num, unit));
  }

  public serialize(): string {
    const f: string = this._from.toString();
    const t: string = this._to.toString();

    return `${f} - ${t}`;
  }

  public toDateTimes(unit: DateTimeUnit): DateTimes {
    const list: List<DateTime> = MutableList.empty();

    for (let dt: DateTime = this._from; !dt.isAfter(this._to); dt = dt.add(1, unit)) {
      list.add(dt);
    }

    return DateTimes.of(list);
  }

  public get dates(): number {
    return differenceInCalendarDays(this._to.date, this._from.date) + 1;
  }

  public get from(): DateTime {
    return this._from;
  }

  public get hours(): number {
    return differenceInHours(this._to.date, this.from.date);
  }

  public get minutes(): number {
    return differenceInMinutes(this._to.date, this.from.date);
  }

  public get months(): number {
    return differenceInCalendarMonths(this._to.date, this._from.date) + 1;
  }

  public get quarters(): number {
    return differenceInCalendarQuarters(this._to.date, this._from.date) + 1;
  }

  public get seconds(): number {
    return differenceInSeconds(this._to.date, this._from.date);
  }

  public get to(): DateTime {
    return this._to;
  }

  public get weeks(): number {
    return differenceInCalendarWeeks(this._to.date, this._from.date) + 1;
  }
}
