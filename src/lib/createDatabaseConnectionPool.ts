"server-only";
import { createPool } from "slonik";
import { createPgDriverFactory } from "@slonik/pg-driver";

export const createDatabaseConnectionPool = async () => {
  return createPool(process.env.DATABASE_URL as string, {
    driverFactory: createPgDriverFactory(),
    connectionTimeout: "DISABLE_TIMEOUT",
  });
};
