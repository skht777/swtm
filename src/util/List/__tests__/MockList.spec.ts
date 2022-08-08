import { MockValueObject } from '$util/mock/MockValueObject';
import type { Nullable, Predicate } from '$util//Type';
import { MockList } from '$util/List/mock/MockList';

describe('AList', () => {
  describe('contains', () => {
    it('returns false if the value does not exist', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const list: MockList<MockValueObject<number>> = new MockList([value1, value2]);

      expect(list.contains(value3)).toBe(false);
    });

    it('returns true if the value exists', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(2);

      const list: MockList<MockValueObject<number>> = new MockList([value1, value2]);

      expect(list.contains(value1)).toBe(true);
      expect(list.contains(value2)).toBe(true);
      expect(list.contains(value3)).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const value: MockValueObject<number> = new MockValueObject(1);

      const list: MockList<MockValueObject<number>> = new MockList([value]);

      expect(list.equals(list)).toBe(true);
    });

    it('returns false if the size is different', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const list1: MockList<MockValueObject<number>> = new MockList([value1]);
      const list2: MockList<MockValueObject<number>> = new MockList([value1, value2]);

      expect(list1.equals(list2)).toBe(false);
    });

    it('returns false when the different class instance given', () => {
      const list: MockList<MockValueObject<number>> = new MockList([]);

      expect(list.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true even if the order is different', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const list1: MockList<MockValueObject<number>> = new MockList([value2, value1]);
      const list2: MockList<MockValueObject<number>> = new MockList([value1, value2]);

      expect(list1.equals(list2)).toBe(false);
    });

    it('returns true if the length is the same and the list is the same', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const list1: MockList<MockValueObject<number>> = new MockList([value1, value2]);
      const list2: MockList<MockValueObject<number>> = new MockList([value1, value2]);

      expect(list1.equals(list2)).toBe(true);
    });
  });

  describe('every', () => {
    it('returns true if all the values are the same', () => {
      const list: MockList<MockValueObject<number>> = new MockList([
        new MockValueObject(2),
        new MockValueObject(4),
        new MockValueObject(6),
        new MockValueObject(8)
      ]);

      const every: boolean = list.every((v: MockValueObject<number>) => {
        return v.value % 2 === 0;
      });

      expect(every).toBe(true);
    });

    it('returns false if at least one of the values is not false', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const value3: MockValueObject<number> = new MockValueObject(6);
      const value4: MockValueObject<number> = new MockValueObject(8);
      const value5: MockValueObject<number> = new MockValueObject(3);

      const list1: MockList<MockValueObject<number>> = new MockList([value1, value2, value3, value4]);
      const list2: MockList<MockValueObject<number>> = new MockList([value2, value1, value3, value4]);
      const list3: MockList<MockValueObject<number>> = new MockList([value2, value3, value1, value4]);
      const list4: MockList<MockValueObject<number>> = new MockList([value2, value3, value4, value1]);
      const list5: MockList<MockValueObject<number>> = new MockList([value1, value5, value3, value4]);
      const list6: MockList<MockValueObject<number>> = new MockList([value1, value2, value5, value4]);

      const predicate: Predicate<MockValueObject<number>> = (v: MockValueObject<number>) => {
        return v.value % 2 === 0;
      };

      const every1: boolean = list1.every(predicate);
      const every2: boolean = list2.every(predicate);
      const every3: boolean = list3.every(predicate);
      const every4: boolean = list4.every(predicate);
      const every5: boolean = list5.every(predicate);
      const every6: boolean = list6.every(predicate);

      expect(every1).toBe(false);
      expect(every2).toBe(false);
      expect(every3).toBe(false);
      expect(every4).toBe(false);
      expect(every5).toBe(false);
      expect(every6).toBe(false);
    });
  });

  describe('find', () => {
    it('returns the first found value', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const list: MockList<MockValueObject<number>> = new MockList([value1, value2, value3, value4]);

      const found1: Nullable<MockValueObject<number>> = list.find((v: MockValueObject<number>) => {
        return v.value === 1;
      });
      const found2: Nullable<MockValueObject<number>> = list.find((v: MockValueObject<number>) => {
        return v.value === 2;
      });
      const found3: Nullable<MockValueObject<number>> = list.find((v: MockValueObject<number>) => {
        return v.value % 2 === 0;
      });
      const found4: Nullable<MockValueObject<number>> = list.find((v: MockValueObject<number>) => {
        return v.value > 1000;
      });

      expect(found1).toBe(value1);
      expect(found2).toBe(value2);
      expect(found3).toBe(value2);
      expect(found4).toBeNull();
    });
  });

  describe('forEach', () => {
    it('calls back as much as the size of set', () => {
      const list: MockList<MockValueObject<number>> = new MockList([
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      ]);

      expect(list.size()).toBe(3);
      list.forEach((value: MockValueObject<number>, index: number) => {
        expect(list.get(index)).toBe(value);
      });
    });
  });

  describe('get', () => {
    it('returns value at the correct key', () => {
      const values: MockValueObject<number>[] = [
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      ];

      const list: MockList<MockValueObject<number>> = new MockList(values);

      expect(list.size()).toBe(values.length);
      for (let i = 0; i < list.size(); i++) {
        expect(list.get(i)).toBe(values[i]);
      }
    });

    it('returns null at incorrect keys', () => {
      const list: MockList<MockValueObject<number>> = new MockList([
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      ]);

      expect(list.get(-1)).toBeNull();
      expect(list.get(3)).toBeNull();
    });
  });

  describe('isEmpty', () => {
    it('returns true if the values does not exist', () => {
      const list1: MockList<MockValueObject<number>> = new MockList([new MockValueObject(1), new MockValueObject(2)]);
      const list2: MockList<MockValueObject<number>> = new MockList([]);

      expect(list1.isEmpty()).toBe(false);
      expect(list2.isEmpty()).toBe(true);
    });
  });

  describe('iterator', () => {
    it('returns [number, MockValueObject]', () => {
      const list: MockList<MockValueObject<number>> = new MockList([new MockValueObject(1), new MockValueObject(2)]);

      let i = 0;

      for (const value of list) {
        expect(value[0]).toBe(i);
        expect(value[1].value).toBe(list.get(i)?.value);
        i++;
      }
    });
  });

  describe('reduce', () => {
    it('throws Error when the elements are empty', () => {
      const list: MockList<MockValueObject<number>> = new MockList([]);

      expect(() => {
        list.reduce((v1: MockValueObject<number>) => {
          return v1;
        });
      }).toThrow(Error);
    });

    it('returns initial value when the elements are empty and initialValue is spedcified', () => {
      const list: MockList<MockValueObject<number>> = new MockList([]);

      expect(
        list.reduce((v1: MockValueObject<number>) => {
          return v1;
        }, new MockValueObject(3)).value
      ).toBe(3);
    });

    it('returns a value', () => {
      const list: MockList<MockValueObject<number>> = new MockList([
        new MockValueObject(2),
        new MockValueObject(4),
        new MockValueObject(6),
        new MockValueObject(8)
      ]);

      expect(
        list.reduce((v1: MockValueObject<number>) => {
          return v1;
        }).value
      ).toBe(2);
      expect(
        list.reduce((_v1: MockValueObject<number>, v2: MockValueObject<number>) => {
          return v2;
        }).value
      ).toBe(8);
    });
  });

  describe('some', () => {
    it('returns true if at least one of the values returns true', () => {
      const list1: MockList<MockValueObject<number>> = new MockList([
        new MockValueObject(2),
        new MockValueObject(4),
        new MockValueObject(6),
        new MockValueObject(8)
      ]);
      const list2: MockList<MockValueObject<number>> = new MockList([
        new MockValueObject(1),
        new MockValueObject(4),
        new MockValueObject(3),
        new MockValueObject(3)
      ]);

      const predicate: Predicate<MockValueObject<number>> = (v: MockValueObject<number>) => {
        return v.value % 2 === 0;
      };

      const some1: boolean = list1.some(predicate);
      const some2: boolean = list2.some(predicate);

      expect(some1).toBe(true);
      expect(some2).toBe(true);
    });

    it('returns false if none of the values are true', () => {
      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const value3: MockValueObject<number> = new MockValueObject(6);
      const value4: MockValueObject<number> = new MockValueObject(8);

      const list: MockList<MockValueObject<number>> = new MockList([value1, value2, value3, value4]);

      const predicate: Predicate<MockValueObject<number>> = (v: MockValueObject<number>) => {
        return v.value % 2 === 1;
      };

      const some: boolean = list.some(predicate);

      expect(some).toBe(false);
    });
  });

  describe('toArray', () => {
    it('returns its retaining shallow-copied array', () => {
      const values: MockValueObject<number>[] = [
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      ];

      const list: MockList<MockValueObject<number>> = new MockList(values);
      const array: MockValueObject<number>[] = list.toArray();

      expect(list.size()).toBe(values.length);
      for (let i = 0; i < values.length; i++) {
        expect(list.get(i)).toBe(array[i]);
      }

      array.push(new MockValueObject(4));

      expect(list.size()).not.toBe(array.length);
    });
  });

  describe('toString', () => {
    it('returns concatenated string', () => {
      const list: MockList<MockValueObject<number>> = new MockList([
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      ]);

      expect(list.toString()).toBe('1, 2, 3');
    });
  });

  describe('values', () => {
    it('returns its retaining values', () => {
      const values: MockValueObject<number>[] = [new MockValueObject(1), new MockValueObject(2)];
      const list: MockList<MockValueObject<number>> = new MockList(values);

      let i = 0;

      for (const value of list.values()) {
        expect(value).toBe(values[i]);
        i++;
      }
    });
  });
});
