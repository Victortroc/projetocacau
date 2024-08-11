import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";

export const counteWithdraw = async (filter = "", period = "", statusBy = ""): Promise<number | Error> => {
  try {
    const query = Knex(ETableNames.withdraw).count<[{ count: number }]>("* as count");

    if (filter) {
      query.where((builder) => {
        builder
          .where("nameUser", "like", `%${filter}%`)
          .andWhere((innerBuilder) => {
            if (period) {
              innerBuilder.where("createdAt", "like", `%${period}%`);
            }
            if (statusBy) {
              innerBuilder.where("status", "=", statusBy);
            }
          });
      });
    } else {
      if (period) {
        query.andWhere("createdAt", "like", `%${period}%`);
      }
      if (statusBy) {
        query.andWhere("status", "=", statusBy);
      }
    }

    const [{ count }] = await query;

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Erro ao consultar a quantidade de total de registros");

  } catch (error) {
    console.log("Falha assíncrona ao consultar a quantidade de registros");
    return new Error("Erro ao consultar a quantidade de total de registros");
  }
}
