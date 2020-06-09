import dotenv from "dotenv";
import redis from "redis";

dotenv.config();

const redisclient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  prefix: `${process.env.REDIS_PREFIX}:`,
});

redisclient.on("connected", () => {
  console.log(`Connected to Redis`);
});

redisclient.on("disconnected", () => {
  console.log(`Disconnected from Redis`);
});
redisclient.on("error", (error) => {
  console.error(error);
});

export default redisclient;
