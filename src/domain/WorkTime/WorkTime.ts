import { ValueObject } from '$util/ValueObject';
import { WorkTimeId } from './WorkTimeId';
import { RecordType } from './RecordType';
import { Term } from '$domain/Term/Term';
import { DateTime } from '$util/DateTime/DateTime';

export class WorkTime extends ValueObject {
  private readonly _id: WorkTimeId;
  private readonly _type: RecordType;
  private readonly _date: DateTime;
  private readonly _term: Term;

  public static readonly NONE: WorkTime = new WorkTime(WorkTimeId.INVALID, RecordType.NONE, DateTime.NONE, Term.NONE);

  public static of(id: WorkTimeId, type: RecordType, date: DateTime, term: Term): WorkTime {
    if (id.isInvalid() && type.isNone() && date.isNone() && term.isNone()) {
      return this.NONE;
    }

    return new WorkTime(id, type, date, term);
  }

  protected constructor(id: WorkTimeId, type: RecordType, date: DateTime, term: Term) {
    super();
    this._id = id;
    this._type = type;
    this._date = date;
    this._term = term;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof WorkTime)) {
      return false;
    }

    return (
      this._id.equals(other._id) &&
      this._date.equals(other._date) &&
      this._type.equals(other._type) &&
      this._term.equals(other._term)
    );
  }

  public isNone(): boolean {
    return this === WorkTime.NONE;
  }

  public serialize(): string {
    const props: string[] = [];

    props.push(this._id.toString());
    props.push(this._type.toString());
    props.push(this._date.toString());
    props.push(this._term.toString());

    return props.join(', ');
  }

  public get id(): WorkTimeId {
    return this._id;
  }

  public get type(): RecordType {
    return this._type;
  }

  public get term(): Term {
    return this._term;
  }

  public get date(): DateTime {
    return this._date;
  }
}
