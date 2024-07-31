import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IDeposit } from "../../database/models";

export const updateByIdDeposit = async (id: number, deposit: Pick<IDeposit, "amount" | "updatedAt">): Promise< void | Error > => {

    try {
        const result = await Knex(ETableNames.deposit)
            .update(deposit)
            .where("id", "=", id)

        if (result > 0) return;
    
        return new Error ("Erro ao atualizar registro"); 
    } catch (error) {
        console.log("Falha assíncrona excluir");
        return new Error ("Erro ao atualizar registro"); 
    }


}