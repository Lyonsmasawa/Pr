import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = JSON.parse(req.cookies.jwt)
    if (!token) return res.status(401).send("You are not authorized!")
    jwt.verify(token.jwt, process.env.JWT_KEY, async(error, payload) => {
        if (error) return res.status(403).send("Token isn't valid!")
        console.log(payload)
        req.userId = payload?.userId        
    })
    next()
}