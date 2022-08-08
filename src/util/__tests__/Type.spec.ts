import { Type } from '$util/Type';

describe('Type', () => {
  describe('isArray', () => {
    it('returns true when array given', () => {
      expect(Type.isArray([])).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isArray(undefined)).toBe(false);
      expect(Type.isArray(null)).toBe(false);
      expect(Type.isArray(true)).toBe(false);
      expect(Type.isArray(false)).toBe(false);
      expect(Type.isArray(NaN)).toBe(false);
      expect(Type.isArray(0)).toBe(false);
      expect(Type.isArray(-1)).toBe(false);
      expect(Type.isArray(1.5)).toBe(false);
      expect(Type.isArray('1')).toBe(false);
      expect(Type.isArray('2')).toBe(false);
      expect(Type.isArray(Symbol())).toBe(false);
      expect(Type.isArray({})).toBe(false);
    });
  });

  describe('isBoolean', () => {
    it('returns true when boolean given', () => {
      expect(Type.isBoolean(true)).toBe(true);
      expect(Type.isBoolean(false)).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isBoolean(undefined)).toBe(false);
      expect(Type.isBoolean(null)).toBe(false);
      expect(Type.isBoolean(NaN)).toBe(false);
      expect(Type.isBoolean(0)).toBe(false);
      expect(Type.isBoolean(-1)).toBe(false);
      expect(Type.isBoolean(1.5)).toBe(false);
      expect(Type.isBoolean('1')).toBe(false);
      expect(Type.isBoolean('2')).toBe(false);
      expect(Type.isBoolean(Symbol())).toBe(false);
      expect(Type.isBoolean({})).toBe(false);
      expect(Type.isBoolean([])).toBe(false);
    });
  });

  describe('isFunction', () => {
    it('returns true when function given', () => {
      expect(
        Type.isFunction((): null => {
          return null;
        })
      ).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isFunction(undefined)).toBe(false);
      expect(Type.isFunction(null)).toBe(false);
      expect(Type.isFunction(true)).toBe(false);
      expect(Type.isFunction(false)).toBe(false);
      expect(Type.isFunction(NaN)).toBe(false);
      expect(Type.isFunction(0)).toBe(false);
      expect(Type.isFunction(-1)).toBe(false);
      expect(Type.isFunction(1.5)).toBe(false);
      expect(Type.isFunction('1')).toBe(false);
      expect(Type.isFunction('2')).toBe(false);
      expect(Type.isFunction(Symbol())).toBe(false);
      expect(Type.isFunction({})).toBe(false);
      expect(Type.isFunction([])).toBe(false);
    });
  });

  describe('isInteger', () => {
    it('returns true when int number given', () => {
      expect(Type.isInteger(-1)).toBe(true);
      expect(Type.isInteger(0)).toBe(true);
      expect(Type.isInteger(1)).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isInteger(undefined)).toBe(false);
      expect(Type.isInteger(null)).toBe(false);
      expect(Type.isInteger(true)).toBe(false);
      expect(Type.isInteger(false)).toBe(false);
      expect(Type.isInteger(NaN)).toBe(false);
      expect(Type.isInteger(0.1)).toBe(false);
      expect(Type.isInteger(-1.2)).toBe(false);
      expect(Type.isInteger(1.5)).toBe(false);
      expect(Type.isInteger('1')).toBe(false);
      expect(Type.isInteger('2')).toBe(false);
      expect(Type.isInteger(Symbol())).toBe(false);
      expect(Type.isInteger({})).toBe(false);
      expect(Type.isInteger([])).toBe(false);
    });
  });

  describe('isNaN', () => {
    it('returns true when NaN given', () => {
      expect(Type.isNaN(NaN)).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isNaN(undefined)).toBe(false);
      expect(Type.isNaN(null)).toBe(false);
      expect(Type.isNaN(false)).toBe(false);
      expect(Type.isNaN(true)).toBe(false);
      expect(Type.isNaN(0)).toBe(false);
      expect(Type.isNaN(-1)).toBe(false);
      expect(Type.isNaN(1.5)).toBe(false);
      expect(Type.isNaN('1')).toBe(false);
      expect(Type.isNaN('2')).toBe(false);
      expect(Type.isNaN(Symbol())).toBe(false);
      expect(Type.isNaN({})).toBe(false);
      expect(Type.isNaN([])).toBe(false);
    });
  });

  describe('isNone', () => {
    it('returns true when null or undefined given', () => {
      expect(Type.isNone(undefined)).toBe(true);
      expect(Type.isNone(null)).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isNone(false)).toBe(false);
      expect(Type.isNone(true)).toBe(false);
      expect(Type.isNone(NaN)).toBe(false);
      expect(Type.isNone(0)).toBe(false);
      expect(Type.isNone(-1)).toBe(false);
      expect(Type.isNone(1.5)).toBe(false);
      expect(Type.isNone('1')).toBe(false);
      expect(Type.isNone('2')).toBe(false);
      expect(Type.isNone(Symbol())).toBe(false);
      expect(Type.isNone({})).toBe(false);
      expect(Type.isNone([])).toBe(false);
    });
  });

  describe('isNull', () => {
    it('returns true when null given', () => {
      expect(Type.isNull(null)).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isNull(undefined)).toBe(false);
      expect(Type.isNull(false)).toBe(false);
      expect(Type.isNull(true)).toBe(false);
      expect(Type.isNull(NaN)).toBe(false);
      expect(Type.isNull(0)).toBe(false);
      expect(Type.isNull(-1)).toBe(false);
      expect(Type.isNull(1.5)).toBe(false);
      expect(Type.isNull('1')).toBe(false);
      expect(Type.isNull('2')).toBe(false);
      expect(Type.isNull(Symbol())).toBe(false);
      expect(Type.isNull({})).toBe(false);
      expect(Type.isNull([])).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('returns true when number given', () => {
      expect(Type.isNumber(NaN)).toBe(true);
      expect(Type.isNumber(0)).toBe(true);
      expect(Type.isNumber(-1)).toBe(true);
      expect(Type.isNumber(1.5)).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isNumber(undefined)).toBe(false);
      expect(Type.isNumber(null)).toBe(false);
      expect(Type.isNumber(false)).toBe(false);
      expect(Type.isNumber(true)).toBe(false);
      expect(Type.isNumber('1')).toBe(false);
      expect(Type.isNumber('2')).toBe(false);
      expect(Type.isNumber(Symbol())).toBe(false);
      expect(Type.isNumber({})).toBe(false);
      expect(Type.isNumber([])).toBe(false);
    });
  });

  describe('isObject', () => {
    it('returns true when object given', () => {
      expect(Type.isObject({})).toBe(true);
      expect(Type.isObject([])).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isObject(undefined)).toBe(false);
      expect(Type.isObject(null)).toBe(false);
      expect(Type.isObject(false)).toBe(false);
      expect(Type.isObject(true)).toBe(false);
      expect(Type.isObject(NaN)).toBe(false);
      expect(Type.isObject(0)).toBe(false);
      expect(Type.isObject(-1)).toBe(false);
      expect(Type.isObject(1.5)).toBe(false);
      expect(Type.isObject('1')).toBe(false);
      expect(Type.isObject('2')).toBe(false);
      expect(Type.isObject(Symbol())).toBe(false);
    });
  });

  describe('isPrimitive', () => {
    it('returns true when array given', () => {
      expect(Type.isPrimitive(undefined)).toBe(true);
      expect(Type.isPrimitive(null)).toBe(true);
      expect(Type.isPrimitive(true)).toBe(true);
      expect(Type.isPrimitive(false)).toBe(true);
      expect(Type.isPrimitive(NaN)).toBe(true);
      expect(Type.isPrimitive(0)).toBe(true);
      expect(Type.isPrimitive(-1)).toBe(true);
      expect(Type.isPrimitive(1.5)).toBe(true);
      expect(Type.isPrimitive('1')).toBe(true);
      expect(Type.isPrimitive('2')).toBe(true);
      expect(Type.isPrimitive(Symbol())).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isPrimitive({})).toBe(false);
      expect(Type.isPrimitive([])).toBe(false);
    });
  });

  describe('isString', () => {
    it('returns true when string given', () => {
      expect(Type.isString('')).toBe(true);
      expect(Type.isString('1')).toBe(true);
      expect(Type.isString('aa')).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isString(undefined)).toBe(false);
      expect(Type.isString(null)).toBe(false);
      expect(Type.isString(false)).toBe(false);
      expect(Type.isString(true)).toBe(false);
      expect(Type.isString(NaN)).toBe(false);
      expect(Type.isString(0)).toBe(false);
      expect(Type.isString(-1)).toBe(false);
      expect(Type.isString(1.5)).toBe(false);
      expect(Type.isString(Symbol())).toBe(false);
      expect(Type.isString({})).toBe(false);
      expect(Type.isString([])).toBe(false);
    });
  });

  describe('isSymbol', () => {
    it('returns true when string given', () => {
      expect(Type.isSymbol(Symbol())).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isSymbol(undefined)).toBe(false);
      expect(Type.isSymbol(null)).toBe(false);
      expect(Type.isSymbol(false)).toBe(false);
      expect(Type.isSymbol(true)).toBe(false);
      expect(Type.isSymbol(NaN)).toBe(false);
      expect(Type.isSymbol(0)).toBe(false);
      expect(Type.isSymbol(-1)).toBe(false);
      expect(Type.isSymbol(1.5)).toBe(false);
      expect(Type.isSymbol('1')).toBe(false);
      expect(Type.isSymbol('2')).toBe(false);
      expect(Type.isSymbol({})).toBe(false);
      expect(Type.isSymbol([])).toBe(false);
    });
  });

  describe('isUndefined', () => {
    it('returns true when undefined given', () => {
      expect(Type.isUndefined(undefined)).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Type.isUndefined(null)).toBe(false);
      expect(Type.isUndefined(false)).toBe(false);
      expect(Type.isUndefined(true)).toBe(false);
      expect(Type.isUndefined(NaN)).toBe(false);
      expect(Type.isUndefined(0)).toBe(false);
      expect(Type.isUndefined(-1)).toBe(false);
      expect(Type.isUndefined(1.5)).toBe(false);
      expect(Type.isUndefined('1')).toBe(false);
      expect(Type.isUndefined('2')).toBe(false);
      expect(Type.isUndefined(Symbol())).toBe(false);
      expect(Type.isUndefined({})).toBe(false);
      expect(Type.isUndefined([])).toBe(false);
    });
  });
});
