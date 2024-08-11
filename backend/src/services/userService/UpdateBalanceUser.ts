import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IUser } from "../../database/models";

export const updateBalanceUser = async (id: number, amount: number, edit:number = 0): Promise< void | Error > => {

    if(edit) {
        try {
            const resultEdit = await Knex(ETableNames.user)
                .decrement("balance", amount)
                .where("id", "=", id)
    
            if (resultEdit > 0) return;
        
            return new Error ("Erro ao decrementer atualizar saldo"); 
        } catch (error) {
            return new Error ("Erro ao decrementer atualizar saldo"); 
        }
    }

    try {
        const result = await Knex(ETableNames.user)
            .increment("balance", amount)
            .where("id", "=", id)

        if (result > 0) return;
    
        return new Error ("Erro ao incrementer atualizar saldo"); 
    } catch (error) {
        return new Error ("Erro ao incrementer atualizar saldo"); 
    }


}