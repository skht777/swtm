import type { DexieOptions } from 'dexie';

export default class DBConfig {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _options: DexieOptions;

  public static readonly NONE = new DBConfig('', 0, {});

  public static of(name: string, version: number, options: DexieOptions = {}): DBConfig {
    if (name === '' && version == 0 && Object.keys(options).length == 0) {
      return DBConfig.NONE;
    }

    return new DBConfig(name, version, options);
  }

  private constructor(name: string, version: number, options: DexieOptions) {
    this._name = name;
    this._version = version;
    this._options = options;
  }

  public isNone() {
    return this === DBConfig.NONE;
  }

  public get name(): string {
    return this._name;
  }

  public get version(): number {
    return this._version;
  }

  public get options(): DexieOptions {
    return this._options;
  }
}
