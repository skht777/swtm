import { DBConfigStore } from './src/infra/db/DBConfigStore';
import config from './src/infra/db/config.test';

DBConfigStore.getInstance().set(config);
