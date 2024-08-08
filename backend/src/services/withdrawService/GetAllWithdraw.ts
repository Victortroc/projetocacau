import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IWithdraw } from "../../database/models";

export const getAllWithdraw = async (page: number, limit: number, filter: string, id = 0, order = "desc", period = "", statusBy= ""): Promise< IWithdraw[] | Error > => {

    try {

        // const result = await Knex(ETableNames.withdraw)
        //     .select("*")
        //     .where("id", "=", Number(id))
        //     .orWhere("nameUser", "like", `%${filter}%`)
        //     .orWhere("createdAt", "like", `%${period}%`)
        //     .orWhere("status", "=", statusBy)
        //     .orderBy("createdAt", order) 
        //     .offset((page - 1) * limit)
        //     .limit(limit);

        const query = Knex(ETableNames.withdraw)
        .select("*")
        .orderBy("createdAt", order)
        .offset((page - 1) * limit)
        .limit(limit);

        if (id > 0) {
        query.where("id", "=", Number(id));
        }

        if (filter) {
            query.andWhere((builder) => {
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

        const result = await query;
    
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