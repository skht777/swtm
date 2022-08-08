import type { Equalable } from './Equalable';
import type { ValueObject } from './ValueObject';

export abstract class Entity<T extends ValueObject> implements Equalable {
  public abstract getIdentifier(): T;

  public abstract serialize(): string;

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Entity)) {
      return false;
    }

    return this.getIdentifier().equals(other.getIdentifier());
  }

  public toString(): string {
    return this.serialize();
  }
}
