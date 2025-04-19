"server-only";
import { createPool, DatabasePool } from "slonik";
import { createPgDriverFactory } from "@slonik/pg-driver";

export class Connection {
  static connectionPool: DatabasePool | null = null;

  private static createDatabaseConnectionPool = async () => {
    Connection.connectionPool = await createPool(
      (process.env.ENV === "production"
        ? process.env.DATABASE_URL
        : process.env.DEV_DATABASE_URL) as string,
      {
        driverFactory: createPgDriverFactory(),
        connectionTimeout: "DISABLE_TIMEOUT",
      },
    );
  };

  public static requestConnectionPool = async () => {
    if (
      !Connection.connectionPool ||
      Connection.connectionPool.state().state != "ACTIVE"
    ) {
      await this.createDatabaseConnectionPool();
    }

    return this.connectionPool as DatabasePool;
  };

  public static requestConnectionPoolEnd = async () => {
    if (!Connection.connectionPool) return;

    if (Connection.connectionPool.state().pendingConnections) return;

    await Connection.connectionPool.end();
  };
}

export default Connection;
