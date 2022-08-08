import { MockValueObject } from '$util//mock/MockValueObject';
import { DateTime } from '$util/DateTime/DateTime';
import { DateTimeError } from '$util/DateTime/DateTimeError';
import type { DateTimes } from '$util/DateTime/DateTimes';
import { Duration } from '$util/DateTime/Duration';
import { describe } from 'vitest';

describe('Duration', () => {
  describe('merge', () => {
    it('returns the other if one is Duration.NONE', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 2);
      const duration1: Duration = Duration.of(dt1, dt2);

      expect(Duration.merge(duration1, Duration.NONE)).toBe(duration1);
      expect(Duration.merge(Duration.NONE, duration1)).toBe(duration1);
      expect(Duration.merge(Duration.NONE, Duration.NONE)).toBe(Duration.NONE);
    });

    it('duration1 is before than duration2, return duration1.from and duration2.to', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 2);
      const dt3: DateTime = DateTime.ofYMD(2000, 1, 4);
      const dt4: DateTime = DateTime.ofYMD(2000, 1, 5);
      const duration1: Duration = Duration.of(dt1, dt2);
      const duration2: Duration = Duration.of(dt3, dt4);

      const duration3: Duration = Duration.merge(duration1, duration2);

      expect(duration3.from.toString()).toBe('2000-01-01 00:00:00');
      expect(duration3.to.toString()).toBe('2000-01-05 00:00:00');
    });

    it('duration1 is after than duration2, return duration2.from and duration1.to', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 2);
      const dt3: DateTime = DateTime.ofYMD(2000, 1, 4);
      const dt4: DateTime = DateTime.ofYMD(2000, 1, 5);
      const duration1: Duration = Duration.of(dt3, dt4);
      const duration2: Duration = Duration.of(dt1, dt2);

      const duration3: Duration = Duration.merge(duration1, duration2);

      expect(duration3.from.toString()).toBe('2000-01-01 00:00:00');
      expect(duration3.to.toString()).toBe('2000-01-05 00:00:00');
    });

    it('duration1 overlaps duration2, return duration1.from and duration1.to', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 2);
      const dt3: DateTime = DateTime.ofYMD(2000, 1, 4);
      const dt4: DateTime = DateTime.ofYMD(2000, 1, 5);
      const duration1: Duration = Duration.of(dt1, dt4);
      const duration2: Duration = Duration.of(dt2, dt3);

      const duration3: Duration = Duration.merge(duration1, duration2);

      expect(duration3.from.toString()).toBe('2000-01-01 00:00:00');
      expect(duration3.to.toString()).toBe('2000-01-05 00:00:00');
    });
  });

  describe('of', () => {
    it('returns Duration.NONE when given DateTime.NONE into from', () => {
      const dt: DateTime = DateTime.ofYMD(2000, 2, 1);

      expect(Duration.of(DateTime.NONE, dt)).toBe(Duration.NONE);
    });

    it('returns Duration.NONE when given DateTime.NONE into to', () => {
      const dt: DateTime = DateTime.ofYMD(2000, 2, 1);

      expect(Duration.of(dt, DateTime.NONE)).toBe(Duration.NONE);
    });

    it('does not throw DateTimeError when from is before than to', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 2);

      expect(() => {
        Duration.of(dt1, dt2);
      }).not.toThrow(Error);
    });

    it('does not throw DateTimeError when from is same to to', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 1);

      expect(() => {
        Duration.of(dt1, dt2);
      }).not.toThrow(Error);
    });
    it('throws DateTimeError when from is after then to', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 2);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 1);

      expect(() => {
        Duration.of(dt1, dt2);
      }).toThrow(DateTimeError);
    });
  });

  describe('advance', () => {
    it('subtract dates ', () => {
      const dt1: Duration = Duration.of(DateTime.ofYMD(2000, 4, 2), DateTime.ofYMD(2000, 4, 4));
      const dt2: Duration = dt1.advance(1, 'dates');

      expect(dt2.from.years).toBe(2000);
      expect(dt2.from.months).toBe(4);
      expect(dt2.from.dates).toBe(1);
      expect(dt2.to.years).toBe(2000);
      expect(dt2.to.months).toBe(4);
      expect(dt2.to.dates).toBe(3);
    });
  });

  describe('clip', () => {
    it('shortens the duration by clipping from', () => {
      const dt1: Duration = Duration.of(DateTime.ofYMD(2000, 4, 2), DateTime.ofYMD(2000, 4, 4));
      const dt2: Duration = dt1.clip('from', 1, 'dates');
      const dt3: Duration = dt1.clip('from', 2, 'dates');

      expect(dt2.from.years).toBe(2000);
      expect(dt2.from.months).toBe(4);
      expect(dt2.from.dates).toBe(3);
      expect(dt2.to.years).toBe(2000);
      expect(dt2.to.months).toBe(4);
      expect(dt2.to.dates).toBe(4);
      expect(dt3.from.years).toBe(2000);
      expect(dt3.from.months).toBe(4);
      expect(dt3.from.dates).toBe(4);
      expect(dt3.to.years).toBe(2000);
      expect(dt3.to.months).toBe(4);
      expect(dt3.to.dates).toBe(4);
    });

    it('throws DateTimeError when from passes to', () => {
      const dt1: Duration = Duration.of(DateTime.ofYMD(2000, 4, 2), DateTime.ofYMD(2000, 4, 4));

      expect(() => {
        dt1.clip('from', 3, 'dates');
      }).toThrow(DateTimeError);
    });

    it('shortens the duration by clipping to', () => {
      const dt1: Duration = Duration.of(DateTime.ofYMD(2000, 4, 2), DateTime.ofYMD(2000, 4, 4));
      const dt2: Duration = dt1.clip('to', 1, 'dates');
      const dt3: Duration = dt1.clip('to', 2, 'dates');

      expect(dt2.from.years).toBe(2000);
      expect(dt2.from.months).toBe(4);
      expect(dt2.from.dates).toBe(2);
      expect(dt2.to.years).toBe(2000);
      expect(dt2.to.months).toBe(4);
      expect(dt2.to.dates).toBe(3);
      expect(dt3.from.years).toBe(2000);
      expect(dt3.from.months).toBe(4);
      expect(dt3.from.dates).toBe(2);
      expect(dt3.to.years).toBe(2000);
      expect(dt3.to.months).toBe(4);
      expect(dt3.to.dates).toBe(2);
    });

    it('throws DateTimeError when from passes to', () => {
      const dt1: Duration = Duration.of(DateTime.ofYMD(2000, 4, 2), DateTime.ofYMD(2000, 4, 4));

      expect(() => {
        dt1.clip('to', 3, 'dates');
      }).toThrow(DateTimeError);
    });
  });

  describe('contains', () => {
    it('returns true when given datetime is equal to from', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 2);
      const dt2: DateTime = DateTime.ofYMD(2000, 3, 2);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.contains(DateTime.ofYMD(2000, 2, 2))).toBe(true);
    });

    it('returns true when given datetime is equal to to', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 2);
      const dt2: DateTime = DateTime.ofYMD(2000, 3, 2);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.contains(DateTime.ofYMD(2000, 3, 2))).toBe(true);
    });

    it('returns true when given datetime is between from and to', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 2);
      const dt2: DateTime = DateTime.ofYMD(2000, 3, 2);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.contains(DateTime.ofYMD(2000, 2, 3))).toBe(true);
      expect(duration.contains(DateTime.ofYMD(2000, 2, 4))).toBe(true);
      expect(duration.contains(DateTime.ofYMD(2000, 2, 5))).toBe(true);
      expect(duration.contains(DateTime.ofYMD(2000, 2, 27))).toBe(true);
      expect(duration.contains(DateTime.ofYMD(2000, 2, 28))).toBe(true);
      expect(duration.contains(DateTime.ofYMD(2000, 3, 1))).toBe(true);
    });

    it('returns false when given datetime is out of from', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 2);
      const dt2: DateTime = DateTime.ofYMD(2000, 3, 2);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.contains(DateTime.ofYMD(2000, 2, 1))).toBe(false);
    });

    it('returns true when given datetime is out of to', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 2);
      const dt2: DateTime = DateTime.ofYMD(2000, 3, 2);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.contains(DateTime.ofYMD(2000, 3, 3))).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 2);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.equals(duration)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 2);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.equals(new MockValueObject(1))).toBe(false);
    });

    it('returns false when different property instance given', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 4);
      const dt3: DateTime = DateTime.ofYMD(2000, 2, 3);
      const dt4: DateTime = DateTime.ofYMD(2000, 2, 2);
      const duration1: Duration = Duration.of(dt1, dt2);
      const duration2: Duration = Duration.of(dt1, dt3);
      const duration3: Duration = Duration.of(dt4, dt2);

      expect(duration1.equals(duration2)).toBe(false);
      expect(duration1.equals(duration3)).toBe(false);
    });

    it('returns true when the same instance given', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 2);
      const dt3: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt4: DateTime = DateTime.ofYMD(2000, 2, 2);
      const duration1: Duration = Duration.of(dt1, dt2);
      const duration2: Duration = Duration.of(dt3, dt4);

      expect(duration1.equals(duration2)).toBe(true);
    });
  });

  describe('extend', () => {
    it('lengthens the duration by extending from', () => {
      const dt1: Duration = Duration.of(DateTime.ofYMD(2000, 4, 2), DateTime.ofYMD(2000, 4, 4));
      const dt2: Duration = dt1.extend('from', 1, 'dates');
      const dt3: Duration = dt1.extend('from', 2, 'dates');

      expect(dt2.from.years).toBe(2000);
      expect(dt2.from.months).toBe(4);
      expect(dt2.from.dates).toBe(1);
      expect(dt2.to.years).toBe(2000);
      expect(dt2.to.months).toBe(4);
      expect(dt2.to.dates).toBe(4);
      expect(dt3.from.years).toBe(2000);
      expect(dt3.from.months).toBe(3);
      expect(dt3.from.dates).toBe(31);
      expect(dt3.to.years).toBe(2000);
      expect(dt3.to.months).toBe(4);
      expect(dt3.to.dates).toBe(4);
    });

    it('lengthens the duration by extending to', () => {
      const dt1: Duration = Duration.of(DateTime.ofYMD(2000, 4, 2), DateTime.ofYMD(2000, 4, 4));
      const dt2: Duration = dt1.extend('to', 1, 'dates');
      const dt3: Duration = dt1.extend('to', 2, 'dates');

      expect(dt2.from.years).toBe(2000);
      expect(dt2.from.months).toBe(4);
      expect(dt2.from.dates).toBe(2);
      expect(dt2.to.years).toBe(2000);
      expect(dt2.to.months).toBe(4);
      expect(dt2.to.dates).toBe(5);
      expect(dt3.from.years).toBe(2000);
      expect(dt3.from.months).toBe(4);
      expect(dt3.from.dates).toBe(2);
      expect(dt3.to.years).toBe(2000);
      expect(dt3.to.months).toBe(4);
      expect(dt3.to.dates).toBe(6);
    });

    it('throws DateTimeError when from passes to', () => {
      const dt1: Duration = Duration.of(DateTime.ofYMD(2000, 4, 2), DateTime.ofYMD(2000, 4, 4));

      expect(() => {
        dt1.clip('to', 3, 'dates');
      }).toThrow(DateTimeError);
    });
  });

  describe('includes', () => {
    it('returns true when other is completely included by duration', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 5);
      const dt3: DateTime = DateTime.ofYMD(2000, 2, 2);
      const dt4: DateTime = DateTime.ofYMD(2000, 2, 4);
      const duration1: Duration = Duration.of(dt1, dt2);
      const duration2: Duration = Duration.of(dt3, dt4);

      expect(duration1.includes(duration2)).toBe(true);
    });

    it("returns true when other's from is same to duration", () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 5);
      const dt3: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt4: DateTime = DateTime.ofYMD(2000, 2, 4);
      const duration1: Duration = Duration.of(dt1, dt2);
      const duration2: Duration = Duration.of(dt3, dt4);

      expect(duration1.includes(duration2)).toBe(true);
    });

    it("returns true when other's to is same to duration", () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 5);
      const dt3: DateTime = DateTime.ofYMD(2000, 2, 2);
      const dt4: DateTime = DateTime.ofYMD(2000, 2, 5);
      const duration1: Duration = Duration.of(dt1, dt2);
      const duration2: Duration = Duration.of(dt3, dt4);

      expect(duration1.includes(duration2)).toBe(true);
    });

    it('returns true when other is same to duration', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 5);
      const dt3: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt4: DateTime = DateTime.ofYMD(2000, 2, 5);
      const duration1: Duration = Duration.of(dt1, dt2);
      const duration2: Duration = Duration.of(dt3, dt4);

      expect(duration1.includes(duration2)).toBe(true);
    });

    it("returns false when other's from is not covered by duration", () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 5);
      const dt3: DateTime = DateTime.ofYMD(2000, 1, 31);
      const dt4: DateTime = DateTime.ofYMD(2000, 2, 4);
      const duration1: Duration = Duration.of(dt1, dt2);
      const duration2: Duration = Duration.of(dt3, dt4);

      expect(duration1.includes(duration2)).toBe(false);
    });

    it("returns false when other's to is not covered by duration", () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 2, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 2, 5);
      const dt3: DateTime = DateTime.ofYMD(2000, 2, 2);
      const dt4: DateTime = DateTime.ofYMD(2000, 2, 6);
      const duration1: Duration = Duration.of(dt1, dt2);
      const duration2: Duration = Duration.of(dt3, dt4);

      expect(duration1.includes(duration2)).toBe(false);
    });
  });

  describe('isNone', () => {
    it('returns true when Duration.NONE given', () => {
      expect(Duration.NONE.isNone()).toBe(true);
    });

    it('returns false when others given', () => {
      expect(Duration.of(DateTime.now(), DateTime.now()).isNone()).toBe(false);
    });
  });

  describe('overlapsWith', () => {
    it('returns false when this ends before other begins', () => {
      expect(
        Duration.of(DateTime.ofYMD(2001, 5, 5), DateTime.ofYMD(2001, 6, 5)).overlapsWith(
          Duration.of(DateTime.ofYMD(2001, 6, 6), DateTime.ofYMD(2001, 7, 6))
        )
      ).toBe(false);
      expect(
        Duration.of(DateTime.ofYMD(2001, 6, 6), DateTime.ofYMD(2001, 7, 6)).overlapsWith(
          Duration.of(DateTime.ofYMD(2001, 5, 5), DateTime.ofYMD(2001, 6, 5))
        )
      ).toBe(false);
    });

    it('returns true when the date this ends and other begins are the same', () => {
      expect(
        Duration.of(DateTime.ofYMD(2001, 5, 5), DateTime.ofYMD(2001, 6, 5)).overlapsWith(
          Duration.of(DateTime.ofYMD(2001, 6, 5), DateTime.ofYMD(2001, 7, 6))
        )
      ).toBe(true);
      expect(
        Duration.of(DateTime.ofYMD(2001, 6, 6), DateTime.ofYMD(2001, 7, 6)).overlapsWith(
          Duration.of(DateTime.ofYMD(2001, 5, 5), DateTime.ofYMD(2001, 6, 6))
        )
      ).toBe(true);
    });

    it('returns true when this ends after other begins', () => {
      expect(
        Duration.of(DateTime.ofYMD(2001, 5, 5), DateTime.ofYMD(2001, 6, 6)).overlapsWith(
          Duration.of(DateTime.ofYMD(2001, 6, 5), DateTime.ofYMD(2001, 7, 6))
        )
      ).toBe(true);
      expect(
        Duration.of(DateTime.ofYMD(2001, 6, 5), DateTime.ofYMD(2001, 7, 6)).overlapsWith(
          Duration.of(DateTime.ofYMD(2001, 5, 5), DateTime.ofYMD(2001, 6, 6))
        )
      ).toBe(true);
    });
  });

  describe('postpone', () => {
    it('add dates ', () => {
      const dt1: Duration = Duration.of(DateTime.ofYMD(2000, 4, 2), DateTime.ofYMD(2000, 4, 4));
      const dt2: Duration = dt1.postpone(1, 'dates');

      expect(dt2.from.years).toBe(2000);
      expect(dt2.from.months).toBe(4);
      expect(dt2.from.dates).toBe(3);
      expect(dt2.to.years).toBe(2000);
      expect(dt2.to.months).toBe(4);
      expect(dt2.to.dates).toBe(5);
    });
  });

  describe('toDateTimes', () => {
    it('returns unique DateTimes when duration from and to is the same', () => {
      const duration: Duration = Duration.of(DateTime.ofYMD(2001, 3, 3), DateTime.ofYMD(2001, 3, 3));

      const datetimes: DateTimes = duration.toDateTimes('dates');

      expect(datetimes.size()).toBe(1);
      expect(datetimes.get(0)?.toString()).toBe('2001-03-03 00:00:00');
    });

    it('returns DateTimes', () => {
      const duration: Duration = Duration.of(DateTime.ofYMD(2001, 3, 3), DateTime.ofYMD(2001, 3, 8));

      const datetimes: DateTimes = duration.toDateTimes('dates');

      expect(datetimes.size()).toBe(6);
      expect(datetimes.get(0)?.toString()).toBe('2001-03-03 00:00:00');
      expect(datetimes.get(1)?.toString()).toBe('2001-03-04 00:00:00');
      expect(datetimes.get(2)?.toString()).toBe('2001-03-05 00:00:00');
      expect(datetimes.get(3)?.toString()).toBe('2001-03-06 00:00:00');
      expect(datetimes.get(4)?.toString()).toBe('2001-03-07 00:00:00');
      expect(datetimes.get(5)?.toString()).toBe('2001-03-08 00:00:00');
    });
  });

  describe('dates', () => {
    it('returns the number of the days between from and to', () => {
      const dt1: DateTime = DateTime.ofYMD(2011, 7, 2);
      const dt2: DateTime = DateTime.ofYMD(2012, 7, 2);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.dates).toBe(367);
    });
  });

  describe('hours', () => {
    it('returns the number of the hours between from and to', () => {
      const dt1: DateTime = DateTime.ofYMD(2011, 1, 1);
      const dt2: DateTime = DateTime.ofYMD(2011, 1, 2);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.hours).toBe(24);
    });
  });

  describe('minutes', () => {
    it('returns the number of the minutes between from and to', () => {
      const dt1: DateTime = DateTime.ofYMDHMS(2011, 1, 1, 11, 1, 1);
      const dt2: DateTime = DateTime.ofYMDHMS(2011, 1, 1, 12, 1, 1);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.minutes).toBe(60);
    });
  });

  describe('months', () => {
    it('returns the number of the months between from and to', () => {
      const dt1: DateTime = DateTime.ofYMD(2014, 1, 31);
      const dt2: DateTime = DateTime.ofYMD(2014, 9, 1);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.months).toBe(9);
    });
  });

  describe('quarters', () => {
    it('returns the number of the quarters between from and to', () => {
      const dt1: DateTime = DateTime.ofYMD(2013, 12, 31);
      const dt2: DateTime = DateTime.ofYMD(2014, 7, 2);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.quarters).toBe(4);
    });
  });

  describe('seconds', () => {
    it('returns the number of the seconds between from and to', () => {
      const dt1: DateTime = DateTime.ofYMDHMS(2011, 1, 1, 11, 1, 1);
      const dt2: DateTime = DateTime.ofYMDHMS(2011, 1, 1, 11, 2, 1);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.seconds).toBe(60);
    });
  });

  describe('weeks', () => {
    it('returns the number of the weeks between from and to', () => {
      const dt1: DateTime = DateTime.ofYMD(2014, 7, 5);
      const dt2: DateTime = DateTime.ofYMD(2014, 7, 20);
      const duration: Duration = Duration.of(dt1, dt2);

      expect(duration.weeks).toBe(4);
    });
  });
});
