import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IWithdraw } from "../../database/models";

export const getAllWithdraw = async (page: number, limit: number, filter: string, id = 0): Promise< IWithdraw[] | Error > => {

    try {

        const result = await Knex(ETableNames.withdraw)
            .select("*")
            .where("id", "=", Number(id))
            .orWhere("nameUser", "like", `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);
    
        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.withdraw)
                .select("*")
                .where("id", "=", id)
                .first();

            if (resultById) return [...result, resultById];
        }

        return result;

    } catch (error) {
        console.log("Falha assíncrona consultar registros");
        return new Error("Erro ao consultar os registros");
    }


}