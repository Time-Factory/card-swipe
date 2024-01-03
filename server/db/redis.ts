import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

const pubClient = createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});
const subClient = pubClient.duplicate();

export default createAdapter(pubClient, subClient);
