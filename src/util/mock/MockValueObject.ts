import { ValueObject } from '$util/ValueObject';

export class MockValueObject<V> extends ValueObject {
  private readonly _value: V;

  public constructor(value: V) {
    super();
    this._value = value;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof MockValueObject)) {
      return false;
    }

    return this._value === other._value;
  }

  public serialize(): string {
    return String(this._value);
  }

  public get value(): V {
    return this._value;
  }
}
