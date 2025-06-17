"server-only";

import { ArticleType, Stamps, stampsTables } from "@/lib/types";
import { createSqlTag, DatabasePool } from "slonik";
import { z } from "zod";

const sql = createSqlTag({
  typeAliases: {
    void: z.object({}).strict(),
  },
});

export const updateStampQuery = async (
  pool: DatabasePool,
  articleType: ArticleType,
  stamps: Stamps,
) =>
  pool.transaction(async (transactionConnection) => {
    return transactionConnection.query(sql.typeAlias("void")`
      UPDATE ${sql.identifier([stampsTables[articleType]])} AS stamps
      SET
        label = modified.label,
        value = modified.value,
        color = modified.color,
        icon = modified.icon
      FROM (values
        ${sql.join(
          Object.values(stamps).map((stamp) => {
            return sql.fragment`(${sql.join([sql.uuid(stamp.id), stamp.label, stamp.value, stamp.color ?? sql.fragment`NULL`, stamp.icon ?? sql.fragment`NULL`], sql.fragment`, `)})`;
          }),
          sql.fragment`, `,
        )}
      ) AS modified(id, label, value, color, icon)
      WHERE stamps.id = modified.id;
    `);
  });

export default updateStampQuery;
