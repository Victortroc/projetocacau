import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";


export const deleteByIdWithdraw = async (id: number): Promise< void | Error > => {

    try {
        const result = await Knex(ETableNames.withdraw)
            .where("id", "=", id)
            .del()

        if (result > 0) return;
    
        return new Error ("Erro ao excluir saque"); 
    } catch (error) {
        console.log("Falha assíncrona excluir");
        return new Error ("Erro ao excluir saque"); 
    }


}