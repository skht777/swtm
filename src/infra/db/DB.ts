import Dexie from 'dexie';
import type DBConfig from './DBConfig';

interface WorkTimeEntity {
  id?: number;
  type: string;
  date: Date;
  term: TermEntity;
}

interface TermEntity {
  start: Date;
  end?: Date;
}

interface DB extends Dexie {
  workTime: Dexie.Table<WorkTimeEntity, number>;
}

type SchemaDefinition = { [p: string]: string | null };

const SCHEMA: SchemaDefinition = {
  workTime: '++id, type, date, term'
};

class DB extends Dexie {
  public constructor(config: DBConfig) {
    super(config.name, config.options);
    this.version(config.version).stores(SCHEMA);
  }
}

export default DB;
export type { WorkTimeEntity, TermEntity, DB };
