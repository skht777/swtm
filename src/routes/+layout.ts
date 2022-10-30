import { DBConfigStore } from '$infra/db/DBConfigStore';
import config from '../infra/db/config';

export const trailingSlash = 'always';
export const prerender = true;
export const ssr = false;

DBConfigStore.getInstance().set(config);
