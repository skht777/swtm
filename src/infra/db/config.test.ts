import { indexedDB, IDBKeyRange } from 'fake-indexeddb';
import DBConfig from './DBConfig';
import baseConfig from './config';

const config = DBConfig.of(baseConfig.name, baseConfig.version, { indexedDB, IDBKeyRange });

export default config;
