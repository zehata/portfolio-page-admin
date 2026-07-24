"server-only";
import { createPool, DatabasePool } from "slonik";
import { createPgDriverFactory } from "@slonik/pg-driver";

export const createConnectionPool = async () => {
  return await createPool(
    (process.env.ENV === "production"
      ? process.env.DATABASE_URL
      : process.env.DEV_DATABASE_URL) as string,
    {
      driverFactory: createPgDriverFactory(),
      connectionTimeout: "DISABLE_TIMEOUT",
    },
  );
};

export const endConnectionPool = async (connectionPool: DatabasePool) => {
  return await connectionPool.end();
};
