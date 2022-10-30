import DBConfig from './DBConfig';

export class DBConfigStore {
  private _config;

  private static readonly INSTANCE: DBConfigStore = new DBConfigStore(DBConfig.NONE);

  public static getInstance(): DBConfigStore {
    return DBConfigStore.INSTANCE;
  }

  private constructor(config: DBConfig) {
    this._config = config;
  }

  public get() {
    return this._config;
  }

  public set(config: DBConfig) {
    this._config = config;
  }
}
