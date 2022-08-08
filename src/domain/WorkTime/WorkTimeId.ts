import type { SafeParseReturnType } from 'zod';
import { z } from 'zod';
import type { Equalable } from '$util/Equalable';
import { ValueObject } from '$util/ValueObject';

export class WorkTimeId extends ValueObject implements Equalable {
  private readonly _value: number;

  public static readonly INVALID: WorkTimeId = new WorkTimeId(-1);

  public static of(id: number): WorkTimeId {
    return this.parse(id);
  }

  public static parse(value: unknown): WorkTimeId {
    const parsed: SafeParseReturnType<number, number> = z.number().int().min(1).safeParse(value);

    if (parsed.success) {
      return new WorkTimeId(parsed.data);
    }

    return WorkTimeId.INVALID;
  }

  protected constructor(id: number) {
    super();
    this._value = id;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof WorkTimeId)) {
      return false;
    }

    return this._value === other._value;
  }

  public isInvalid(): boolean {
    return this === WorkTimeId.INVALID;
  }

  public isValid(): boolean {
    return !this.isInvalid();
  }

  public serialize(): string {
    return `${this._value}`;
  }

  public get value(): number {
    return this._value;
  }
}
