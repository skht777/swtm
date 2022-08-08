import { ImmutableList } from '$util/List/ImmutableList';
import type { List } from '$util/List/List';
import { MockValueObject } from '$util/mock/MockValueObject';
import { DateTime } from '$util/DateTime/DateTime';
import { DateTimes } from '$util/DateTime/DateTimes';

describe('DateTimes', () => {
  describe('contains', () => {
    it('delegates inner method', () => {
      const list: List<DateTime> = ImmutableList.empty();
      const datetimes: DateTimes = DateTimes.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      datetimes.datetimes = list;

      const spy = vi.spyOn(list, 'contains');

      datetimes.contains(DateTime.ofYMD(2001, 3, 3));

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const datetimes: DateTimes = DateTimes.ofArray([DateTime.ofYMD(2001, 3, 3)]);

      expect(datetimes.equals(datetimes)).toBe(true);
    });

    it('returns false when different class instance given', () => {
      const datetimes: DateTimes = DateTimes.ofArray([DateTime.ofYMD(2001, 3, 3)]);

      expect(datetimes.equals(new MockValueObject(1))).toBe(false);
    });

    it('delegates inner method', () => {
      const list: List<DateTime> = ImmutableList.ofArray([DateTime.ofYMD(2001, 3, 3), DateTime.ofYMD(2001, 3, 5)]);
      const datetimes1: DateTimes = DateTimes.empty();
      const datetimes2: DateTimes = DateTimes.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      datetimes1.datetimes = list;

      const spy = vi.spyOn(list, 'equals');

      datetimes1.equals(datetimes2);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('every', () => {
    it('delegates inner method', () => {
      const list: List<DateTime> = ImmutableList.empty();
      const datetimes: DateTimes = DateTimes.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      datetimes.datetimes = list;

      const spy = vi.spyOn(list, 'every');

      datetimes.every(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('filter', () => {
    it('delegates inner method', () => {
      const list: List<DateTime> = ImmutableList.empty();
      const datetimes: DateTimes = DateTimes.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      datetimes.datetimes = list;

      const spy = vi.spyOn(list, 'filter');

      datetimes.filter(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('delegates inner method', () => {
      const list: List<DateTime> = ImmutableList.empty();
      const datetimes: DateTimes = DateTimes.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      datetimes.datetimes = list;

      const spy = vi.spyOn(list, 'find');

      datetimes.find(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('forEach', () => {
    it('delegates inner method', () => {
      const list: List<DateTime> = ImmutableList.ofArray([DateTime.ofYMD(2001, 3, 3)]);
      const datetimes: DateTimes = DateTimes.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      datetimes.datetimes = list;

      const spy = vi.spyOn(list, 'forEach');

      datetimes.forEach(() => {
        // NOOP
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('delegates inner method', () => {
      const list: List<DateTime> = ImmutableList.empty();
      const datetimes: DateTimes = DateTimes.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      datetimes.datetimes = list;

      const spy = vi.spyOn(list, 'get');

      datetimes.get(0);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('isEmpty', () => {
    it('delegates inner method', () => {
      const list: List<DateTime> = ImmutableList.empty();
      const datetimes: DateTimes = DateTimes.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      datetimes.datetimes = list;

      const spy = vi.spyOn(list, 'isEmpty');

      datetimes.isEmpty();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('map', () => {
    it('delegates inner method', () => {
      const list: List<DateTime> = ImmutableList.empty();
      const datetimes: DateTimes = DateTimes.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      datetimes.datetimes = list;

      const spy = vi.spyOn(list, 'map');

      datetimes.map(() => {
        return null;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('size', () => {
    it('delegates inner method', () => {
      const list: List<DateTime> = ImmutableList.empty();
      const datetimes: DateTimes = DateTimes.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      datetimes.datetimes = list;

      const spy = vi.spyOn(list, 'size');

      datetimes.size();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('some', () => {
    it('delegates inner method', () => {
      const list: List<DateTime> = ImmutableList.empty();
      const datetimes: DateTimes = DateTimes.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      datetimes.datetimes = list;

      const spy = vi.spyOn(list, 'some');

      datetimes.some(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('values', () => {
    it('delegates inner method', () => {
      const list: List<DateTime> = ImmutableList.empty();
      const datetimes: DateTimes = DateTimes.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      datetimes.datetimes = list;

      const spy = vi.spyOn(list, 'values');

      datetimes.values();

      expect(spy).toHaveBeenCalled();
    });
  });
});
