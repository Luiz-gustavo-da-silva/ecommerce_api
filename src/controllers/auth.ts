import { Request, Response } from "express"
import {hashSync, compareSync} from 'bcrypt'
import { prismaCilent } from ".."
import * as jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    const { email, password, name, role } = req.body

    let user = await prismaCilent.user.findFirst({ where: { email } })

    if (user) {
        throw Error('User already exists!')
    }

    user = await prismaCilent.user.create({
        data: {
            name,
            email,
            role,
            password: hashSync(password, 10)
        }
    })

    res.json(user)
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    let user = await prismaCilent.user.findFirst({ where: { email } })

    if (!user) {
        throw Error('User does not exists!')
    }

    if(!compareSync(password, user.password)){
        throw Error('Incorrect pasword!')
    }

    const token = jwt.sign({
        userId: user.
    },)

    res.json(user)
}


