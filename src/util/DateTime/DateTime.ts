import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addYears,
  format,
  isAfter,
  isBefore,
  isEqual,
  isValid,
  parse,
  subDays,
  subHours,
  subMinutes,
  subMonths,
  subSeconds,
  subYears
} from 'date-fns';
import { Type } from '$util/Type';
import { ValueObject } from '$util/ValueObject';

export type DateTimeUnit = 'years' | 'months' | 'dates' | 'hours' | 'minutes' | 'seconds';
export type MonthNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type DateNumbers =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;
export type HourNumbers =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;
export type MinuteNumbers =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59;
export type SecondNumbers =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59;

const YEARS = 'years';
const MONTHS = 'months';
const DATES = 'dates';
const HOURS = 'hours';
const MINUTES = 'minutes';
const SECONDS = 'seconds';
const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
const PREHISTORICAL_DATE: Date = new Date(0);

export class DateTime extends ValueObject {
  private readonly _dt: Date;

  public static readonly NONE: DateTime = new DateTime(PREHISTORICAL_DATE);

  public static now(): DateTime {
    return DateTime.of(new Date());
  }

  public static of(dt: Date): DateTime {
    return new DateTime(dt);
  }

  public static ofYMD(years: number, months: MonthNumbers, dates: DateNumbers): DateTime {
    return DateTime.of(new Date(years, months - 1, dates, 0, 0, 0));
  }

  public static ofYMDHMS(
    years: number,
    months: MonthNumbers,
    dates: DateNumbers,
    hours: HourNumbers,
    minutes: MinuteNumbers,
    seconds: SecondNumbers
  ): DateTime {
    return DateTime.of(new Date(years, months - 1, dates, hours, minutes, seconds));
  }

  public static parse(dt: string, format: string = DATETIME_FORMAT): DateTime {
    const date: Date = parse(dt, format, PREHISTORICAL_DATE);

    if (isValid(date)) {
      return DateTime.of(date);
    }

    return DateTime.NONE;
  }

  protected constructor(dt: Date) {
    super();
    this._dt = dt;
  }

  public add(num: number, unit: DateTimeUnit): DateTime {
    if (this.isNone()) {
      return this;
    }

    switch (unit) {
      case YEARS: {
        return DateTime.of(addYears(this._dt, num));
      }
      case MONTHS: {
        return DateTime.of(addMonths(this._dt, num));
      }
      case DATES: {
        return DateTime.of(addDays(this._dt, num));
      }
      case HOURS: {
        return DateTime.of(addHours(this._dt, num));
      }
      case MINUTES: {
        return DateTime.of(addMinutes(this._dt, num));
      }
      case SECONDS: {
        return DateTime.of(addSeconds(this._dt, num));
      }
    }
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof DateTime)) {
      return false;
    }

    return isEqual(this._dt, other._dt);
  }

  /**
   * returns true when this > other
   * returns false when this === other
   */
  public isAfter(other: DateTime): boolean {
    if (this.isNone()) {
      return false;
    }
    if (other.isNone()) {
      return false;
    }

    return isAfter(this._dt, other._dt);
  }

  /**
   * returns true when this < other
   * returns false when this === other
   */
  public isBefore(other: DateTime): boolean {
    if (this.isNone()) {
      return false;
    }
    if (other.isNone()) {
      return false;
    }

    return isBefore(this._dt, other._dt);
  }

  public isInvalid(): boolean {
    return !this.isValid();
  }

  public isNext(unit: DateTimeUnit, other: DateTime): boolean {
    if (this.add(1, unit).isSame(other)) {
      return true;
    }
    if (this.sub(1, unit).isSame(other)) {
      return true;
    }

    return false;
  }

  public isNone(): boolean {
    return this === DateTime.NONE;
  }

  /**
   * returns true when this === other
   */
  public isSame(other: DateTime): boolean {
    if (this.isNone()) {
      return false;
    }
    if (other.isNone()) {
      return false;
    }

    return isEqual(this._dt, other._dt);
  }

  public isValid(): boolean {
    if (this.isNone()) {
      return false;
    }

    return isValid(this._dt);
  }

  public removeTime(): DateTime {
    return DateTime.ofYMD(
      this._dt.getFullYear(),
      (this._dt.getMonth() + 1) as MonthNumbers,
      this._dt.getDate() as DateNumbers
    );
  }

  public removeTimezoneOffset(): DateTime {
    return DateTime.of(new Date(this._dt.getTime() - this._dt.getTimezoneOffset() * 60_000));
  }

  public serialize(f?: string): string {
    if (this.isNone()) {
      return 'NONE';
    }
    if (Type.isUndefined(f)) {
      return format(this._dt, DATETIME_FORMAT);
    }

    return format(this._dt, f);
  }

  public sub(num: number, unit: DateTimeUnit): DateTime {
    if (this.isNone()) {
      return this;
    }

    switch (unit) {
      case YEARS: {
        return DateTime.of(subYears(this._dt, num));
      }
      case MONTHS: {
        return DateTime.of(subMonths(this._dt, num));
      }
      case DATES: {
        return DateTime.of(subDays(this._dt, num));
      }
      case HOURS: {
        return DateTime.of(subHours(this._dt, num));
      }
      case MINUTES: {
        return DateTime.of(subMinutes(this._dt, num));
      }
      case SECONDS: {
        return DateTime.of(subSeconds(this._dt, num));
      }
    }
  }

  public override toString(format?: string): string {
    return this.serialize(format);
  }

  public get date(): Date {
    return this._dt;
  }

  public get dates(): number {
    return this._dt.getDate();
  }

  public get hours(): number {
    return this._dt.getHours();
  }

  public get minutes(): number {
    return this._dt.getMinutes();
  }

  public get months(): number {
    return this._dt.getMonth() + 1;
  }

  public get ms(): number {
    return this._dt.getMilliseconds();
  }

  public get seconds(): number {
    return this._dt.getSeconds();
  }

  public get time(): number {
    return this._dt.getTime();
  }

  public get years(): number {
    return this._dt.getFullYear();
  }
}
