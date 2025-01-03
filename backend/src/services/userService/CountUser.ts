import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";


export const counteUser = async (filter = ""): Promise< number | Error > => {

    try {
        const [{ count }] = await Knex(ETableNames.user)
            .where("name", "like", `%${filter}%`)
            .count<[{ count: number }]>("* as count")

        if (Number.isInteger(Number(count))) return Number(count);

        return new Error ("Erro ao consultar a quantidade de total de registros"); 

    } catch (error) {
        console.log("Falha assíncrona qtd registros");
        return new Error ("Erro ao consultar a quantidade de total de registros"); 
    }

}
