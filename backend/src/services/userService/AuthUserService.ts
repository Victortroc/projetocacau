import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { Knex } from '../../database/knex';
import { ETableNames } from '../../database/ETableNames';

interface AuthUserServiceProps {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  serializedUser: any;
}

const AuthUserService = async ({ email, password }: AuthUserServiceProps): Promise< AuthResponse > => {

    const user = await Knex(ETableNames.user)
        .select("*")
        .where("email", "=", email)
        .first();


    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Senha inválida');
    }

    const token = jwt.sign(
        { 
            id: user.id, 
            name: user.name, 
            email: user.email 
        }, 
        authConfig.secret, 
        {
        expiresIn: authConfig.expiresIn,
        }
    );

    const serializedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        balance: user.balance
    };

    return {
        token,
        serializedUser
    };
};

export default AuthUserService;
