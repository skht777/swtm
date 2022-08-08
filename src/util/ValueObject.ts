import type { Equalable } from './Equalable';

export abstract class ValueObject implements Equalable {
  public abstract equals(other: unknown): boolean;

  public abstract serialize(): string;

  public toString(): string {
    return this.serialize();
  }
}
