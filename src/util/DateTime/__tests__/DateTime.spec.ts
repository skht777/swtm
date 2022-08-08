import { MockValueObject } from '$util/mock/MockValueObject';
import { DateTime } from '$util/DateTime/DateTime';

describe('DateTime', () => {
  describe('parse', () => {
    it('returns instance', () => {
      const dt: DateTime = DateTime.parse('2000/01/02 03:04:05.6', 'yyyy/MM/dd HH:mm:ss.SSS');

      expect(dt.years).toBe(2000);
      expect(dt.months).toBe(1);
      expect(dt.dates).toBe(2);
      expect(dt.hours).toBe(3);
      expect(dt.minutes).toBe(4);
      expect(dt.seconds).toBe(5);
      expect(dt.ms).toBe(6);
    });

    it('returns 0 when omitted', () => {
      const dt: DateTime = DateTime.parse('2000/01/02', 'yyyy/MM/dd');

      expect(dt.years).toBe(2000);
      expect(dt.months).toBe(1);
      expect(dt.dates).toBe(2);
      expect(dt.hours).toBe(0);
      expect(dt.minutes).toBe(0);
      expect(dt.seconds).toBe(0);
      expect(dt.ms).toBe(0);
    });

    it('returns DateTime.NONE when parse failed', () => {
      expect(DateTime.parse('2000/01/02', 'yyyy-MM-dd')).toBe(DateTime.NONE);
      expect(DateTime.parse('2000/01/02', 'yyyy')).toBe(DateTime.NONE);
      expect(DateTime.parse('2000/01/02', 'MM')).toBe(DateTime.NONE);
    });
  });

  describe('add', () => {
    it('returns DateTime.NONE when it is DateTime.NONE', () => {
      expect(DateTime.NONE.add(1, 'years')).toBe(DateTime.NONE);
    });

    it('returns added DateTime, original one is immutable', () => {
      const dt1: DateTime = DateTime.of(new Date(2000, 0, 1, 1, 1, 1));
      const dt2: DateTime = dt1.add(2, 'years');
      const dt3: DateTime = dt1.add(2, 'months');
      const dt4: DateTime = dt1.add(2, 'dates');
      const dt5: DateTime = dt1.add(2, 'hours');
      const dt6: DateTime = dt1.add(2, 'minutes');
      const dt7: DateTime = dt1.add(2, 'seconds');

      expect(dt1.date.getFullYear()).toBe(2000);
      expect(dt1.date.getMonth()).toBe(0);
      expect(dt1.date.getDate()).toBe(1);
      expect(dt1.date.getHours()).toBe(1);
      expect(dt1.date.getMinutes()).toBe(1);
      expect(dt1.date.getSeconds()).toBe(1);
      expect(dt2.date.getFullYear()).toBe(2002);
      expect(dt2.date.getMonth()).toBe(0);
      expect(dt2.date.getDate()).toBe(1);
      expect(dt2.date.getHours()).toBe(1);
      expect(dt2.date.getMinutes()).toBe(1);
      expect(dt2.date.getSeconds()).toBe(1);
      expect(dt3.date.getFullYear()).toBe(2000);
      expect(dt3.date.getMonth()).toBe(2);
      expect(dt3.date.getDate()).toBe(1);
      expect(dt3.date.getHours()).toBe(1);
      expect(dt3.date.getMinutes()).toBe(1);
      expect(dt3.date.getSeconds()).toBe(1);
      expect(dt4.date.getFullYear()).toBe(2000);
      expect(dt4.date.getMonth()).toBe(0);
      expect(dt4.date.getDate()).toBe(3);
      expect(dt4.date.getHours()).toBe(1);
      expect(dt4.date.getMinutes()).toBe(1);
      expect(dt4.date.getSeconds()).toBe(1);
      expect(dt5.date.getFullYear()).toBe(2000);
      expect(dt5.date.getMonth()).toBe(0);
      expect(dt5.date.getDate()).toBe(1);
      expect(dt5.date.getHours()).toBe(3);
      expect(dt5.date.getMinutes()).toBe(1);
      expect(dt5.date.getSeconds()).toBe(1);
      expect(dt6.date.getFullYear()).toBe(2000);
      expect(dt6.date.getMonth()).toBe(0);
      expect(dt6.date.getDate()).toBe(1);
      expect(dt6.date.getHours()).toBe(1);
      expect(dt6.date.getMinutes()).toBe(3);
      expect(dt6.date.getSeconds()).toBe(1);
      expect(dt7.date.getFullYear()).toBe(2000);
      expect(dt7.date.getMonth()).toBe(0);
      expect(dt7.date.getDate()).toBe(1);
      expect(dt7.date.getHours()).toBe(1);
      expect(dt7.date.getMinutes()).toBe(1);
      expect(dt7.date.getSeconds()).toBe(3);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const dt: DateTime = DateTime.ofYMD(2000, 1, 1);

      expect(dt.equals(dt)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      const dt: DateTime = DateTime.ofYMD(2000, 1, 1);

      expect(dt.equals(new MockValueObject(1))).toBe(false);
    });

    it('returns false when different property instance given', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 2);

      expect(dt1.equals(dt2)).toBe(false);
    });

    it('returns true when the same instance given', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 1);

      expect(dt1.equals(dt2)).toBe(true);
    });
  });

  describe('isAfter', () => {
    it('returns false when it is DateTime.NONE', () => {
      expect(DateTime.NONE.isAfter(DateTime.now())).toBe(false);
    });

    it('returns false when other is DateTime.NONE', () => {
      expect(DateTime.now().isAfter(DateTime.NONE)).toBe(false);
    });

    it('returns true if the given DateTime is after', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 2);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 1);

      expect(dt1.isAfter(dt2)).toBe(true);
    });

    it('returns false if the given DateTime is the same', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 1);

      expect(dt1.isAfter(dt2)).toBe(false);
    });
  });

  describe('isBefore', () => {
    it('returns false when it is DateTime.NONE', () => {
      expect(DateTime.NONE.isBefore(DateTime.now())).toBe(false);
    });

    it('returns false when other is DateTime.NONE', () => {
      expect(DateTime.now().isBefore(DateTime.NONE)).toBe(false);
    });

    it('returns true if the given DateTime is before', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 2);

      expect(dt1.isBefore(dt2)).toBe(true);
    });

    it('returns false if the given DateTime is the same', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 1);

      expect(dt1.isBefore(dt2)).toBe(false);
    });
  });

  describe('isInvalid', () => {
    it('returns true when DateTime.NONE given', () => {
      expect(DateTime.NONE.isInvalid()).toBe(true);
    });

    it('returns false when the date is valid', () => {
      expect(DateTime.ofYMD(2000, 2, 28).isInvalid()).toBe(false);
    });
  });

  describe('isNext', () => {
    it('returns true when it is next to the other', () => {
      const dt1: DateTime = DateTime.ofYMD(2001, 4, 5);

      expect(dt1.isNext('years', DateTime.ofYMD(1999, 4, 5))).toBe(false);
      expect(dt1.isNext('years', DateTime.ofYMD(2000, 4, 5))).toBe(true);
      expect(dt1.isNext('years', DateTime.ofYMD(2001, 4, 5))).toBe(false);
      expect(dt1.isNext('years', DateTime.ofYMD(2002, 4, 5))).toBe(true);
      expect(dt1.isNext('years', DateTime.ofYMD(2003, 4, 5))).toBe(false);
      expect(dt1.isNext('months', DateTime.ofYMD(2001, 2, 5))).toBe(false);
      expect(dt1.isNext('months', DateTime.ofYMD(2001, 3, 5))).toBe(true);
      expect(dt1.isNext('months', DateTime.ofYMD(2001, 4, 5))).toBe(false);
      expect(dt1.isNext('months', DateTime.ofYMD(2001, 5, 5))).toBe(true);
      expect(dt1.isNext('months', DateTime.ofYMD(2001, 6, 5))).toBe(false);
      expect(dt1.isNext('dates', DateTime.ofYMD(2001, 4, 3))).toBe(false);
      expect(dt1.isNext('dates', DateTime.ofYMD(2001, 4, 4))).toBe(true);
      expect(dt1.isNext('dates', DateTime.ofYMD(2001, 4, 5))).toBe(false);
      expect(dt1.isNext('dates', DateTime.ofYMD(2001, 4, 6))).toBe(true);
      expect(dt1.isNext('dates', DateTime.ofYMD(2001, 4, 7))).toBe(false);
    });
  });

  describe('isNone', () => {
    it('returns true when DateTime.NONE given', () => {
      expect(DateTime.NONE.isNone()).toBe(true);
    });

    it('returns false when others given', () => {
      expect(DateTime.of(new Date()).isNone()).toBe(false);
    });
  });

  describe('isSame', () => {
    it('returns false when it is DateTime.NONE', () => {
      expect(DateTime.NONE.isSame(DateTime.now())).toBe(false);
    });

    it('returns false when other is DateTime.NONE', () => {
      expect(DateTime.now().isSame(DateTime.NONE)).toBe(false);
    });

    it('returns true if the given DateTime is the same', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 1);

      expect(dt1.isSame(dt2)).toBe(true);
    });

    it('returns false if the given DateTime is after', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 2);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 1);

      expect(dt1.isSame(dt2)).toBe(false);
    });

    it('returns false if the given DateTime is before', () => {
      const dt1: DateTime = DateTime.ofYMD(2000, 1, 1);
      const dt2: DateTime = DateTime.ofYMD(2000, 1, 2);

      expect(dt1.isSame(dt2)).toBe(false);
    });
  });

  describe('isValid', () => {
    it('returns false when DateTime.NONE given', () => {
      expect(DateTime.NONE.isValid()).toBe(false);
    });

    it('returns true when the date is valid', () => {
      expect(DateTime.ofYMD(2000, 2, 28).isValid()).toBe(true);
    });
  });

  describe('removeTime', () => {
    it('remove hours, minutes, seconds', () => {
      const dt1: DateTime = DateTime.ofYMDHMS(2000, 2, 3, 4, 5, 6);
      const dt2: DateTime = dt1.removeTime();

      expect(dt1.years).toBe(2000);
      expect(dt1.months).toBe(2);
      expect(dt1.dates).toBe(3);
      expect(dt1.hours).toBe(4);
      expect(dt1.minutes).toBe(5);
      expect(dt1.seconds).toBe(6);
      expect(dt2.years).toBe(2000);
      expect(dt2.months).toBe(2);
      expect(dt2.dates).toBe(3);
      expect(dt2.hours).toBe(0);
      expect(dt2.minutes).toBe(0);
      expect(dt2.seconds).toBe(0);
    });
  });

  describe('removeTimezoneOffset', () => {
    it('remove timezone offset', () => {
      const now: Date = new Date(2000, 2, 3, 4, 5, 6, 7);
      const dt1: DateTime = DateTime.of(now);
      const dt2: DateTime = dt1.removeTimezoneOffset();
      const timezoneOffset: number = now.getTimezoneOffset(); // -540

      expect(dt1.years).toBe(2000);
      expect(dt1.months).toBe(3);
      expect(dt1.dates).toBe(3);
      expect(dt1.hours).toBe(4);
      expect(dt1.minutes).toBe(5);
      expect(dt1.seconds).toBe(6);
      expect(dt1.ms).toBe(7);
      expect(dt2.years).toBe(2000);
      expect(dt2.months).toBe(3);
      if (now.getHours() - timezoneOffset / 60 < 0) {
        expect(dt2.dates).toBe(2);
      } else if (now.getHours() - timezoneOffset / 60 >= 24) {
        expect(dt2.dates).toBe(4);
      } else {
        expect(dt2.dates).toBe(3);
      }
      expect(dt2.hours).toBe(4 - Math.ceil(timezoneOffset / 60));
      expect(dt2.minutes).toBe(5 - Math.floor(timezoneOffset % 60));
      expect(dt2.seconds).toBe(6);
      expect(dt2.ms).toBe(7);
    });
  });

  describe('sub', () => {
    it('returns DateTime.NONE when it is DateTime.NONE', () => {
      expect(DateTime.NONE.sub(1, 'years')).toBe(DateTime.NONE);
    });

    it('returns subtracted DateTime, original one is immutable', () => {
      const dt1: DateTime = DateTime.ofYMDHMS(2000, 1, 1, 1, 1, 1);
      const dt2: DateTime = dt1.sub(2, 'years');
      const dt3: DateTime = dt1.sub(2, 'months');
      const dt4: DateTime = dt1.sub(2, 'dates');
      const dt5: DateTime = dt1.sub(2, 'hours');
      const dt6: DateTime = dt1.sub(2, 'minutes');
      const dt7: DateTime = dt1.sub(2, 'seconds');

      expect(dt1.date.getFullYear()).toBe(2000);
      expect(dt1.date.getMonth()).toBe(0);
      expect(dt1.date.getDate()).toBe(1);
      expect(dt1.date.getHours()).toBe(1);
      expect(dt1.date.getMinutes()).toBe(1);
      expect(dt1.date.getSeconds()).toBe(1);
      expect(dt2.date.getFullYear()).toBe(1998);
      expect(dt2.date.getMonth()).toBe(0);
      expect(dt2.date.getDate()).toBe(1);
      expect(dt2.date.getHours()).toBe(1);
      expect(dt2.date.getMinutes()).toBe(1);
      expect(dt2.date.getSeconds()).toBe(1);
      expect(dt3.date.getFullYear()).toBe(1999);
      expect(dt3.date.getMonth()).toBe(10);
      expect(dt3.date.getDate()).toBe(1);
      expect(dt3.date.getHours()).toBe(1);
      expect(dt3.date.getMinutes()).toBe(1);
      expect(dt3.date.getSeconds()).toBe(1);
      expect(dt4.date.getFullYear()).toBe(1999);
      expect(dt4.date.getMonth()).toBe(11);
      expect(dt4.date.getDate()).toBe(30);
      expect(dt4.date.getHours()).toBe(1);
      expect(dt4.date.getMinutes()).toBe(1);
      expect(dt4.date.getSeconds()).toBe(1);
      expect(dt5.date.getFullYear()).toBe(1999);
      expect(dt5.date.getMonth()).toBe(11);
      expect(dt5.date.getDate()).toBe(31);
      expect(dt5.date.getHours()).toBe(23);
      expect(dt5.date.getMinutes()).toBe(1);
      expect(dt5.date.getSeconds()).toBe(1);
      expect(dt6.date.getFullYear()).toBe(2000);
      expect(dt6.date.getMonth()).toBe(0);
      expect(dt6.date.getDate()).toBe(1);
      expect(dt6.date.getHours()).toBe(0);
      expect(dt6.date.getMinutes()).toBe(59);
      expect(dt6.date.getSeconds()).toBe(1);
      expect(dt7.date.getFullYear()).toBe(2000);
      expect(dt7.date.getMonth()).toBe(0);
      expect(dt7.date.getDate()).toBe(1);
      expect(dt7.date.getHours()).toBe(1);
      expect(dt7.date.getMinutes()).toBe(0);
      expect(dt7.date.getSeconds()).toBe(59);
    });
  });

  describe('toString', () => {
    it('returns NONE when it is DateTime.NONE', () => {
      expect(DateTime.NONE.toString()).toBe('NONE');
    });

    it('returns as specified format even if default format is specified', () => {
      const dt: DateTime = DateTime.ofYMD(2000, 1, 2);

      expect(dt.toString('yyyy')).toBe('2000');
      expect(dt.toString('MM')).toBe('01');
      expect(dt.toString('dd')).toBe('02');
    });

    it('returns as default format if format is not given', () => {
      const dt: DateTime = DateTime.ofYMD(2000, 1, 2);

      expect(dt.toString()).toBe('2000-01-02 00:00:00');
    });

    it('returns 24 hour time', () => {
      const dt: DateTime = DateTime.ofYMDHMS(2000, 1, 2, 23, 56, 0);

      expect(dt.toString()).toBe('2000-01-02 23:56:00');
    });
  });
});
