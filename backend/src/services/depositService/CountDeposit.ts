import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";


export const counteDeposit = async (filter = "", period = ""): Promise< number | Error > => {

    try {
        const [{ count }] = await Knex(ETableNames.deposit)
            .where(function() {
                this.where("nameUser", "like", `%${filter}%`)
                .orWhere("createdAt", "like", `%${period}%`);
            })
                .andWhere(function() {
                this.where("nameUser", "like", `%${filter}%`)
                .andWhere("createdAt", "like", `%${period}%`);
            })
            .count<[{ count: number }]>("* as count")

        if (Number.isInteger(Number(count))) return Number(count);

        return new Error ("Erro ao consultar a quantidade de total de registros"); 

    } catch (error) {
        console.log("Falha assíncrona qtd registros");
        return new Error ("Erro ao consultar a quantidade de total de registros"); 
    }

}
