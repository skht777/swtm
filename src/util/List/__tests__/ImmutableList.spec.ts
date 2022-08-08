import { MockValueObject } from '$util/mock/MockValueObject';
import type { Nullable } from '$util/Type';
import { ImmutableList } from '$util/List/ImmutableList';

describe('ImmutableList', () => {
  describe('of', () => {
    it('returns copied collection, does not use the same one', () => {
      const list: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([
        new MockValueObject(1),
        new MockValueObject(2)
      ]);
      const copied: ImmutableList<MockValueObject<number>> = ImmutableList.of(list);

      expect(list.size()).toBe(copied.size());
      list.forEach((v: MockValueObject<number>, k: number) => {
        expect(v).toBe(copied.get(k));
      });

      list.add(new MockValueObject(3));

      expect(list.size()).toBe(copied.size());
    });
  });

  describe('ofArray', () => {
    it('returns ImmutableList.empty() when the size is 0', () => {
      const list: ImmutableList<MockValueObject<number>> = ImmutableList.empty();

      expect(list.isEmpty()).toBe(true);
      expect(list).toBe(ImmutableList.empty());
    });

    it('returns instance', () => {
      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([
        new MockValueObject(1),
        new MockValueObject(3)
      ]);
      const list2: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([
        new MockValueObject(2),
        new MockValueObject(4),
        new MockValueObject(5)
      ]);

      expect(list1.size()).toBe(2);
      expect(list2.size()).toBe(3);
    });
  });

  describe('empty', () => {
    it('returns singleton instance', () => {
      expect(ImmutableList.empty()).toBe(ImmutableList.empty<MockValueObject<string>>());
    });

    it('always returns 0-size array', () => {
      expect(ImmutableList.empty().isEmpty()).toBe(true);
    });
  });

  describe('add', () => {
    it('can extend immutably', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.empty();

      expect(list1.size()).toBe(0);

      const list2: ImmutableList<MockValueObject<number>> = list1.add(value1);

      expect(list1).not.toBe(list2);
      expect(list1.size()).toBe(0);
      expect(list2.size()).toBe(1);
      expect(list2.get(0)).toBe(value1);

      const list3: ImmutableList<MockValueObject<number>> = list2.add(value2);

      expect(list1).not.toBe(list2);
      expect(list2).not.toBe(list3);
      expect(list3).not.toBe(list1);
      expect(list1.size()).toBe(0);
      expect(list2.size()).toBe(1);
      expect(list3.size()).toBe(2);
      expect(list3.get(0)).toBe(value1);
      expect(list3.get(1)).toBe(value2);
    });
  });

  describe('set', () => {
    it('can be set the value into first position', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3]);
      const list2: ImmutableList<MockValueObject<number>> = list1.set(0, value4);

      expect(list1).not.toBe(list2);
      expect(list1.size()).toBe(3);
      expect(list2.size()).toBe(3);
      expect(list2.get(0)).toBe(value4);
      expect(list2.get(1)).toBe(value2);
      expect(list2.get(2)).toBe(value3);
    });

    it('can be set the value into middle position', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3]);
      const list2: ImmutableList<MockValueObject<number>> = list1.set(1, value4);

      expect(list1).not.toBe(list2);
      expect(list1.size()).toBe(3);
      expect(list2.size()).toBe(3);
      expect(list2.get(0)).toBe(value1);
      expect(list2.get(1)).toBe(value4);
      expect(list2.get(2)).toBe(value3);
    });

    it('can be set the value into last position', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3]);
      const list2: ImmutableList<MockValueObject<number>> = list1.set(2, value4);

      expect(list1).not.toBe(list2);
      expect(list1.size()).toBe(3);
      expect(list2.size()).toBe(3);
      expect(list2.get(0)).toBe(value1);
      expect(list2.get(1)).toBe(value2);
      expect(list2.get(2)).toBe(value4);
    });

    it('returns itself when given key is less than 0', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3]);
      const list2: ImmutableList<MockValueObject<number>> = list1.set(-1, value4);

      expect(list1).toBe(list2);
    });

    it('returns itself when given key is greater than list length', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3]);

      const list2: ImmutableList<MockValueObject<number>> = list1.set(list1.size(), value4);

      expect(list1).toBe(list2);
    });

    it('returns itself when given key is not integer', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3]);

      const list2: ImmutableList<MockValueObject<number>> = list1.set(2.2, value4);

      expect(list1).toBe(list2);
    });
  });

  describe('remove', () => {
    it('can remove retaining value if it contains', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3]);

      const list2: ImmutableList<MockValueObject<number>> = list1.remove(0);

      expect(list1).not.toBe(list2);
      expect(list1.size()).toBe(3);
      expect(list2.size()).toBe(2);
      expect(list2.get(0)).toBe(value2);
      expect(list2.get(1)).toBe(value3);
    });

    it('removes middle value', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3]);
      const list2: ImmutableList<MockValueObject<number>> = list1.remove(1);

      expect(list1).not.toBe(list2);
      expect(list1.size()).toBe(3);
      expect(list2.size()).toBe(2);
      expect(list2.get(0)).toBe(value1);
      expect(list2.get(1)).toBe(value3);
    });

    it('removes last value', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3]);
      const list2: ImmutableList<MockValueObject<number>> = list1.remove(2);

      expect(list1).not.toBe(list2);
      expect(list1.size()).toBe(3);
      expect(list2.size()).toBe(2);
      expect(list2.get(0)).toBe(value1);
      expect(list2.get(1)).toBe(value2);
    });

    it('returns itself when given key is greater than list length', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3]);
      const list2: ImmutableList<MockValueObject<number>> = list1.remove(3);

      expect(list1).toBe(list2);
    });

    it('returns itself when given key is less than 0', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3]);
      const list2: ImmutableList<MockValueObject<number>> = list1.remove(-1);

      expect(list1).toBe(list2);
    });

    it('returns itself when given key is not integer', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3]);
      const list2: ImmutableList<MockValueObject<number>> = list1.remove(0.8);

      expect(list1).toBe(list2);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the value size is 0', () => {
      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([
        new MockValueObject(1),
        new MockValueObject(2)
      ]);
      const list2: ImmutableList<MockValueObject<number>> = ImmutableList.empty();

      expect(list1.isEmpty()).toBe(false);
      expect(list2.isEmpty()).toBe(true);
    });
  });

  describe('map', () => {
    it('execute the mapper function and returns mapped Address immutably', () => {
      const list1: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      ]);
      const list2: ImmutableList<MockValueObject<string>> = list1.map<MockValueObject<string>>(
        (value: MockValueObject<number>) => {
          const num: number = value.value;

          return new MockValueObject<string>(`${num ** 2}`);
        }
      );

      expect(list1.size()).toBe(list2.size());
      expect(list1).not.toBe(list2);
      list2.forEach((v: MockValueObject<string>, k: number) => {
        const value: Nullable<MockValueObject<number>> = list1.get(k);

        expect(v).not.toBeNull();
        if (value === null) {
          throw new Error();
        }

        expect(v.value).toBe(`${value.value ** 2}`);
      });
    });
  });

  describe('filter', () => {
    it('returns ImmutableList.EMPTY when no match', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(2);

      const list: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3, value4]);

      const filtered: ImmutableList<MockValueObject<number>> = list.filter((v: MockValueObject<number>) => {
        return v.value > 100;
      });

      expect(filtered.size()).toBe(0);
      expect(filtered).toBe(ImmutableList.empty<number>());
    });

    it('can remove match values', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(2);
      const value5: MockValueObject<number> = new MockValueObject(5);

      const list: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray([value1, value2, value3, value4]);

      const filtered1: ImmutableList<MockValueObject<number>> = list.filter((v: MockValueObject<number>) => {
        return v.value % 2 === 0;
      });
      const filtered2: ImmutableList<MockValueObject<number>> = list.filter((v: MockValueObject<number>) => {
        return v === value4;
      });
      const filtered3: ImmutableList<MockValueObject<number>> = list.filter((v: MockValueObject<number>) => {
        return v === value5;
      });

      expect(filtered1.size()).toBe(2);
      expect(filtered1.get(0)).toBe(value2);
      expect(filtered1.get(1)).toBe(value4);
      expect(filtered2.size()).toBe(1);
      expect(filtered2.get(0)).toBe(value4);
      expect(filtered3.size()).toBe(0);
    });
  });

  describe('sort', () => {
    it('when the size is 0, do nothing', () => {
      const list: ImmutableList<MockValueObject<number>> = ImmutableList.empty();
      const sorted: ImmutableList<MockValueObject<number>> = list.sort(() => {
        return 1;
      });

      expect(sorted.size()).toBe(0);
      expect(list).toBe(sorted);
    });

    it('when the size is 1, just copy a list shallowly', () => {
      const arr: MockValueObject<number>[] = [new MockValueObject(2)];
      const list: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray(arr);
      const sorted: ImmutableList<MockValueObject<number>> = list.sort(() => {
        return 1;
      });

      expect(sorted.size()).toBe(1);
      expect(list).not.toBe(sorted);
      expect(list.get(0)).toBe(sorted.get(0));
    });

    it('returns like an array', () => {
      const arr: MockValueObject<number>[] = [
        new MockValueObject(4),
        new MockValueObject(2),
        new MockValueObject(3),
        new MockValueObject(1)
      ];
      const list: ImmutableList<MockValueObject<number>> = ImmutableList.ofArray(arr);
      const sorted: ImmutableList<MockValueObject<number>> = list.sort(
        (m1: MockValueObject<number>, m2: MockValueObject<number>) => {
          return m1.value - m2.value;
        }
      );

      expect(sorted.size()).toBe(list.size());
      expect(list).not.toBe(sorted);
      expect(sorted.get(0)).toBe(list.get(3));
      expect(sorted.get(0)?.value).toBe(1);
      expect(sorted.get(1)).toBe(list.get(1));
      expect(sorted.get(1)?.value).toBe(2);
      expect(sorted.get(2)).toBe(list.get(2));
      expect(sorted.get(2)?.value).toBe(3);
      expect(sorted.get(3)).toBe(list.get(0));
      expect(sorted.get(3)?.value).toBe(4);
    });
  });
});
