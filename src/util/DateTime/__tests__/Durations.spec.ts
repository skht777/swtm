import { DateTime } from '$util/DateTime/DateTime';
import { ImmutableList } from '$util/List/ImmutableList';
import type { List } from '$util/List/List';
import { MockValueObject } from '$util/mock/MockValueObject';
import { Duration } from '$util/DateTime/Duration';
import { Durations } from '$util/DateTime/Durations';

describe('Durations', () => {
  describe('contains', () => {
    it('delegates inner method', () => {
      const list: List<Duration> = ImmutableList.empty();
      const durations: Durations = Durations.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      durations.durations = list;

      const spy = vi.spyOn(list, 'contains');

      durations.contains(Duration.of(DateTime.ofYMD(2001, 3, 3), DateTime.ofYMD(2001, 3, 5)));

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const durations: Durations = Durations.ofArray([
        Duration.of(DateTime.ofYMD(2001, 3, 3), DateTime.ofYMD(2001, 3, 5))
      ]);

      expect(durations.equals(durations)).toBe(true);
    });

    it('returns false when different class instance given', () => {
      const durations: Durations = Durations.ofArray([
        Duration.of(DateTime.ofYMD(2001, 3, 3), DateTime.ofYMD(2001, 3, 5))
      ]);

      expect(durations.equals(new MockValueObject(1))).toBe(false);
    });

    it('delegates inner method', () => {
      const list: List<Duration> = ImmutableList.ofArray([
        Duration.of(DateTime.ofYMD(2001, 3, 3), DateTime.ofYMD(2001, 3, 5)),
        Duration.of(DateTime.ofYMD(2001, 3, 5), DateTime.ofYMD(2001, 3, 8))
      ]);
      const durations1: Durations = Durations.empty();
      const durations2: Durations = Durations.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      durations1.durations = list;

      const spy = vi.spyOn(list, 'equals');

      durations1.equals(durations2);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('every', () => {
    it('delegates inner method', () => {
      const list: List<Duration> = ImmutableList.empty();
      const durations: Durations = Durations.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      durations.durations = list;

      const spy = vi.spyOn(list, 'every');

      durations.every(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('filter', () => {
    it('delegates inner method', () => {
      const list: List<Duration> = ImmutableList.empty();
      const durations: Durations = Durations.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      durations.durations = list;

      const spy = vi.spyOn(list, 'filter');

      durations.filter(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('delegates inner method', () => {
      const list: List<Duration> = ImmutableList.empty();
      const durations: Durations = Durations.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      durations.durations = list;

      const spy = vi.spyOn(list, 'find');

      durations.find(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('forEach', () => {
    it('delegates inner method', () => {
      const list: List<Duration> = ImmutableList.ofArray([
        Duration.of(DateTime.ofYMD(2001, 3, 3), DateTime.ofYMD(2001, 3, 5))
      ]);
      const durations: Durations = Durations.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      durations.durations = list;

      const spy = vi.spyOn(list, 'forEach');

      durations.forEach(() => {
        // NOOP
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('delegates inner method', () => {
      const list: List<Duration> = ImmutableList.empty();
      const durations: Durations = Durations.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      durations.durations = list;

      const spy = vi.spyOn(list, 'get');

      durations.get(0);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('isEmpty', () => {
    it('delegates inner method', () => {
      const list: List<Duration> = ImmutableList.empty();
      const durations: Durations = Durations.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      durations.durations = list;

      const spy = vi.spyOn(list, 'isEmpty');

      durations.isEmpty();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('map', () => {
    it('delegates inner method', () => {
      const list: List<Duration> = ImmutableList.empty();
      const durations: Durations = Durations.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      durations.durations = list;

      const spy = vi.spyOn(list, 'map');

      durations.map(() => {
        return null;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('merge', () => {
    it('returns Duration.NONE when it is empty', () => {
      expect(Durations.empty().merge()).toBe(Duration.NONE);
    });

    it('returns merged Duration', () => {
      const list: List<Duration> = ImmutableList.ofArray([
        Duration.of(DateTime.ofYMD(2001, 3, 3), DateTime.ofYMD(2001, 3, 5)),
        Duration.of(DateTime.ofYMD(2001, 3, 7), DateTime.ofYMD(2001, 3, 8))
      ]);
      const durations: Durations = Durations.of(list);
      const duration: Duration = durations.merge();

      expect(duration.from.toString()).toBe('2001-03-03 00:00:00');
      expect(duration.to.toString()).toBe('2001-03-08 00:00:00');
    });
  });

  describe('size', () => {
    it('delegates inner method', () => {
      const list: List<Duration> = ImmutableList.empty();
      const durations: Durations = Durations.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      durations.durations = list;

      const spy = vi.spyOn(list, 'size');

      durations.size();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('some', () => {
    it('delegates inner method', () => {
      const list: List<Duration> = ImmutableList.empty();
      const durations: Durations = Durations.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      durations.durations = list;

      const spy = vi.spyOn(list, 'some');

      durations.some(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('sort', () => {
    it('does not affect original array', () => {
      const durations: Durations = Durations.ofArray([
        Duration.of(DateTime.ofYMD(2001, 4, 1), DateTime.ofYMD(2001, 4, 10)),
        Duration.of(DateTime.ofYMD(2001, 4, 16), DateTime.ofYMD(2001, 4, 19)),
        Duration.of(DateTime.ofYMD(2001, 4, 1), DateTime.ofYMD(2001, 4, 15)),
        Duration.of(DateTime.ofYMD(2001, 4, 16), DateTime.ofYMD(2001, 4, 20)),
        Duration.of(DateTime.ofYMD(2001, 4, 10), DateTime.ofYMD(2001, 4, 15))
      ]);

      const ds: Durations = durations.sort(() => {
        return -1;
      });

      expect(durations.equals(ds)).toBe(false);
      expect(ds.get(0)?.from.toString()).toBe('2001-04-10 00:00:00');
      expect(ds.get(0)?.to.toString()).toBe('2001-04-15 00:00:00');
      expect(ds.get(1)?.from.toString()).toBe('2001-04-16 00:00:00');
      expect(ds.get(1)?.to.toString()).toBe('2001-04-20 00:00:00');
      expect(ds.get(2)?.from.toString()).toBe('2001-04-01 00:00:00');
      expect(ds.get(2)?.to.toString()).toBe('2001-04-15 00:00:00');
      expect(ds.get(3)?.from.toString()).toBe('2001-04-16 00:00:00');
      expect(ds.get(3)?.to.toString()).toBe('2001-04-19 00:00:00');
      expect(ds.get(4)?.from.toString()).toBe('2001-04-01 00:00:00');
      expect(ds.get(4)?.to.toString()).toBe('2001-04-10 00:00:00');
    });
  });

  describe('sortByDateTime', () => {
    it('sort the durations by from and to', () => {
      const durations: Durations = Durations.ofArray([
        Duration.of(DateTime.ofYMD(2001, 4, 1), DateTime.ofYMD(2001, 4, 10)),
        Duration.of(DateTime.ofYMD(2001, 4, 16), DateTime.ofYMD(2001, 4, 19)),
        Duration.of(DateTime.ofYMD(2001, 4, 1), DateTime.ofYMD(2001, 4, 15)),
        Duration.of(DateTime.ofYMD(2001, 4, 16), DateTime.ofYMD(2001, 4, 20)),
        Duration.of(DateTime.ofYMD(2001, 4, 10), DateTime.ofYMD(2001, 4, 15))
      ]);

      const ds: Durations = durations.sortByDateTime();

      expect(durations.equals(ds)).toBe(false);
      expect(ds.get(0)?.from.toString()).toBe('2001-04-01 00:00:00');
      expect(ds.get(0)?.to.toString()).toBe('2001-04-10 00:00:00');
      expect(ds.get(1)?.from.toString()).toBe('2001-04-01 00:00:00');
      expect(ds.get(1)?.to.toString()).toBe('2001-04-15 00:00:00');
      expect(ds.get(2)?.from.toString()).toBe('2001-04-10 00:00:00');
      expect(ds.get(2)?.to.toString()).toBe('2001-04-15 00:00:00');
      expect(ds.get(3)?.from.toString()).toBe('2001-04-16 00:00:00');
      expect(ds.get(3)?.to.toString()).toBe('2001-04-19 00:00:00');
      expect(ds.get(4)?.from.toString()).toBe('2001-04-16 00:00:00');
      expect(ds.get(4)?.to.toString()).toBe('2001-04-20 00:00:00');
    });
  });

  describe('values', () => {
    it('delegates inner method', () => {
      const list: List<Duration> = ImmutableList.empty();
      const durations: Durations = Durations.empty();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      durations.durations = list;

      const spy = vi.spyOn(list, 'values');

      durations.values();

      expect(spy).toHaveBeenCalled();
    });
  });
});
