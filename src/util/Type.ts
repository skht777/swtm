export type Primitive = null | undefined | boolean | number | string | symbol | bigint;
export type NumberString = `${number}`;
export type Nullable<T> = null | T;
export type Undefinable<T> = undefined | T;
export type Unknown<T extends object> = {
  [K in keyof T]: unknown;
};
export type UnaryFunction<I, O> = (arg: I) => O;
export type BinaryFunction<I, J, O> = (arg1: I, arg2: J) => O;
export type Predicate<I> = (arg: I) => boolean;
export type BinaryPredicate<I, J> = (arg1: I, arg2: J) => boolean;
export type Consumer<I> = (arg: I) => unknown | void;
export type Supplier<O> = () => O;
export type ForEach<K, V> = (value: V, key: K) => unknown | void;
export type Mapper<V, O> = (value: V, index: number) => O;

export class Type {
  public static isArray(n: unknown): n is unknown[] {
    return Array.isArray(n);
  }

  public static isBigInt(n: unknown): n is bigint {
    return typeof n === 'bigint';
  }

  public static isBoolean(n: unknown): n is boolean {
    return typeof n === 'boolean';
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public static isFunction(n: unknown): n is Function {
    return typeof n === 'function';
  }

  public static isInteger(n: unknown): n is number {
    if (!Type.isNumber(n)) {
      return false;
    }

    return n % 1 === 0;
  }

  public static isNaN(n: unknown): n is number {
    if (typeof n === 'number') {
      return n !== n;
    }

    return false;
  }

  public static isNone(n: unknown): n is null | undefined {
    return n == null;
  }

  public static isNull(n: unknown): n is null {
    return n === null;
  }

  public static isNumber(n: unknown): n is number {
    return typeof n === 'number';
  }

  public static isObject<T extends object = object>(n: unknown): n is Unknown<T> {
    if (typeof n === 'object') {
      return n !== null;
    }

    return false;
  }

  public static isPrimitive(n: unknown): n is Primitive {
    switch (typeof n) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'symbol':
      case 'undefined': {
        return true;
      }
      default: {
        return Type.isNull(n);
      }
    }
  }

  public static isString(n: unknown): n is string {
    return typeof n === 'string';
  }

  public static isSymbol(n: unknown): n is symbol {
    return typeof n === 'symbol';
  }

  public static isUndefined(n: unknown): n is undefined {
    return typeof n === 'undefined';
  }
}
