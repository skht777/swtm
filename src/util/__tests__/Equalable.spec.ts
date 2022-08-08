import { isEqualable } from '$util/Equalable';

describe('Equalable', () => {
  describe('isEqualable', () => {
    it('returns true if the object has equals()', () => {
      expect(
        isEqualable({
          equals(): boolean {
            return true;
          }
        })
      ).toBe(true);
    });

    it('returns false if the object does not have equals()', () => {
      expect(isEqualable({})).toBe(false);
      expect(isEqualable([])).toBe(false);
    });
  });
});
