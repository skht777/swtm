import { ValueObject } from '$util/ValueObject';
import { DateTime } from '$util/DateTime/DateTime';
import { Duration } from '$util/DateTime/Duration';

const dateFormat = 'yyyy/MM/dd HH:mm:ss';

export class Term extends ValueObject {
  private readonly _start: DateTime;
  private readonly _end: DateTime;

  public static readonly NONE: Term = new Term(DateTime.NONE, DateTime.NONE);

  public static of(start: DateTime, end: DateTime): Term {
    if (start.isNone() && end.isNone()) {
      return Term.NONE;
    }

    return new Term(start, end);
  }

  public static ofDuration(duration: Duration): Term {
    return Term.of(duration.from, duration.to);
  }

  protected constructor(start: DateTime, end: DateTime) {
    super();
    this._start = DateTime.of(start.date);
    this._end = DateTime.of(end.date);
  }

  public isNone(): boolean {
    return this === Term.NONE;
  }

  equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Term)) {
      return false;
    }

    return this._start.equals(other._start) && this._end.equals(other._end);
  }

  public serialize(): string {
    const props: string[] = [];

    props.push(this._start.serialize(dateFormat));
    props.push(this._end.serialize(dateFormat));

    return props.join(', ');
  }

  public get start(): DateTime {
    return this._start;
  }

  public get end(): DateTime {
    return this._end;
  }

  public get duration(): Duration {
    return Duration.of(this._start, this._end);
  }
}
