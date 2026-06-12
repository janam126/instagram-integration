import { Redis } from '@upstash/redis';

const TOKEN_KEY = 'instagram:access_token';
const REFRESHED_AT_KEY = 'instagram:token_refreshed_at';

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return Redis.fromEnv();
}

export async function getStoredToken(): Promise<string | null> {
  const redis = getRedis();
  if (!redis) return null;
  return redis.get<string>(TOKEN_KEY);
}

export async function setStoredToken(token: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await Promise.all([
    redis.set(TOKEN_KEY, token),
    redis.set(REFRESHED_AT_KEY, new Date().toISOString()),
  ]);
}

export async function getTokenAge(): Promise<number | null> {
  const redis = getRedis();
  if (!redis) return null;
  const iso = await redis.get<string>(REFRESHED_AT_KEY);
  if (!iso) return null;
  return (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24);
}
