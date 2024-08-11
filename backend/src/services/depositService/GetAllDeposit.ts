import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IDeposit } from "../../database/models";

export const getAllDeposit = async (page: number, limit: number, filter: string, id = 0, order = "desc", period = ""): Promise< IDeposit[] | Error > => {

    try {

        const result = await Knex(ETableNames.deposit)
            .select("*")
            .where(function() {
                this.where("id", "=", Number(id))
                .orWhere("nameUser", "like", `%${filter}%`)
                .orWhere("createdAt", "like", `%${period}%`);
            })
                .andWhere(function() {
                this.where("nameUser", "like", `%${filter}%`)
                .andWhere("createdAt", "like", `%${period}%`);
            })
            .orderBy("createdAt", order) 
            .offset((page - 1) * limit)
            .limit(limit);
    
        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.deposit)
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