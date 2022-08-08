import { Type } from './Type';

export interface Equalable {
  equals(other: unknown): boolean;
}

export const isEqualable = (n: unknown): n is Equalable => {
  if (!Type.isObject<Equalable>(n)) {
    return false;
  }

  return Type.isFunction(n.equals);
};
