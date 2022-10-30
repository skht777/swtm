import { DBConfigStore } from '$infra/db/DBConfigStore';

const configStore = DBConfigStore.getInstance();

describe('DBConfigStore', () => {
  test.skip('configure for test', () => {
    const config = configStore.get();

    expect(Object.keys(config.options).length).toBe(2);
  });
});
