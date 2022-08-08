import { ValueObject } from '$util/ValueObject';

const WORK = 'WORK';
const REST = 'REST';
export class RecordType extends ValueObject {
  private readonly _value: string;

  public static readonly NONE: RecordType = new RecordType('');
  public static readonly WORK: RecordType = new RecordType(WORK);
  public static readonly REST: RecordType = new RecordType(REST);

  public static of(value: string): RecordType {
    switch (value) {
      case REST:
        return RecordType.REST;
      case WORK:
        return RecordType.WORK;
      default:
        return RecordType.NONE;
    }
  }

  protected constructor(value: string) {
    super();
    this._value = value;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof RecordType)) {
      return false;
    }

    return this._value === other._value;
  }

  public isNone(): boolean {
    return this === RecordType.NONE;
  }

  public isWork(): boolean {
    return this === RecordType.WORK;
  }

  public isRest(): boolean {
    return this === RecordType.REST;
  }

  public serialize(): string {
    return this._value;
  }

  public get value(): string {
    return this._value;
  }
}
