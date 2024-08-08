import { Request, Response } from "express";
import * as yup from "yup";
import { validation }from "../../middleware";
import { IUser } from "../../database/models";
import { createUser } from "../../services/userService/CreateUserService";
import bcrypt from 'bcryptjs';


interface IBodyProps extends Omit<IUser, "id" | "createdAt" | "updatedAt"> {};

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
const phoneRegex = /^\(\d{2,3}\) 9 \d{4}-\d{4}$/;

export const createValidation = validation((getSchema) => ({
body: getSchema<IBodyProps>(
    yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    admin: yup.boolean().default(false),
    address: yup.string().nullable().min(5, 'Address cannot be smaller than 5 characters').max(120, 'Address cannot be longer than 120 characters').when('admin', {
        is: false,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.nullable()
    }),
    phone: yup.string().nullable().when('admin', {
        is: false,
        then: (schema) => schema.required().test('phone', 'Phone number must be in the format (DDD) 9 9999-9999', value => phoneRegex.test(value)),
        otherwise: (schema) => schema.nullable()
    }),
    cpf: yup.number().nullable().when('admin', {
        is: false,
        then: (schema) => schema.required().test('length', 'CPF must be 11 digits', (value) => value?.toString().length === 11),
        otherwise: (schema) => schema.nullable()
    }),
    birthday: yup.string().nullable().when('admin', {
        is: false,
        then: (schema) => schema.required().test('birthday', 'Birthday must be in the format DD-MM-YYYY', value => dateRegex.test(value)),
        otherwise: (schema) => schema.nullable()
    }),
    balance: yup.number().nullable().when('admin', {
        is: false,
        then: (schema) => schema.nullable(),
        otherwise: (schema) => schema.nullable()
    })
    })
)
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData: Omit<IUser, "id" | "updatedAt"> = {
        ...req.body,
        createdAt: new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1-$2-$3'),
        password: hashedPassword
    };

    const result = await createUser(userData);

    if (result instanceof Error) {
        return res.status(500).json({
            error: {
                default: result.message
            }
        })
    }

    return res.status(201).json(result);

};
