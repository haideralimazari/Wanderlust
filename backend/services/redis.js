import { createClient } from 'redis';
import { REDIS_URL } from '../config/utils.js';

let redis = null;

export async function connectToRedis() {
  try {
    if (REDIS_URL) {
      const client = createClient({
        url: REDIS_URL,
        disableOfflineQueue: true,
      });
      await client.connect();
      redis = client;
      console.log('Redis Connected: ' + REDIS_URL);
    } else {
      console.log('Redis not configured, cache disabled.');
    }
  } catch (error) {
    redis = null;
    console.error('Error connecting to Redis:', error.message);
  }
}

export function getRedisClient() {
  return redis;
}
