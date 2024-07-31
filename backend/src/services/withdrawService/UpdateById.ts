import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IWithdraw } from "../../database/models";

export const updateByIdWithdraw = async (id: number, user: Pick<IWithdraw, "amount" | "updatedAt">): Promise< void | Error > => {

    try {
        const result = await Knex(ETableNames.withdraw)
            .update(user)
            .where("id", "=", id)

        if (result > 0) return;
    
        return new Error ("Erro ao atualizar registro"); 
    } catch (error) {
        console.log("Falha assíncrona excluir");
        return new Error ("Erro ao atualizar registro"); 
    }


}