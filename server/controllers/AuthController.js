import { PrismaClient } from "@prisma/client"
import { compare, genSalt, hash } from "bcrypt"
import jwt from "jsonwebtoken"

const generatePassword = async(password) => {
    const salt = await genSalt()
    return await hash(password, salt)
}

const maxAge = 3 * 24 * 60 * 60

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge })
}

export const signUp = async(req, res, next) => {
    console.log(req.body)
    try {
        const prisma = new PrismaClient()
        const { email, password } = req.body
        if (email && password) {
            const user = await prisma.user.create({
                    data: {
                        email,
                        password: await generatePassword(password),
                    }
                })
                // return res.cookie("jwt", createToken(email, user.id), {
                //     httpOnly: false,
                //     maxAge: maxAge * 1000,
                // }).status(201).json({ user: { id: user.id, email: user.email } })
            return res.status(201).json({ user: { id: user.id, email: user.email }, jwt: createToken(email, user.id) })
        }
        return res.status(400).send("Email and password required")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error.")
    }
}


export const Login = async(req, res, next) => {
    console.log(req.body)
    try {
        const prisma = new PrismaClient()
        const { email, password } = req.body
        if (email && password) {
            const user = await prisma.user.findUnique({
                where: { email },
            })
            if (!user) {
                return res.status(400).send("User not found!")
            }
            const auth = await compare(password, user.password)
            if (!auth) {
                return res.status(400).send("Invalid password!")
            }
            return res.status(200).json({ user: { id: user.id, email: user.email }, jwt: createToken(email, user.id) })
        }
        return res.status(400).send("Email and password required")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error.")
    }
}