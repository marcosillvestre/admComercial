import 'dotenv/config'
import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const authToken = req.headers.authorization
    if (!authToken) {
        return res.status(401).json({ error: 'token not provided or expired' })
    }

    const token = authToken.split(" ")[1]


    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                throw new Error()
            }
            req.userId = decoded.id
            req.userName = decoded.name
            return next()
        })
    } catch (error) {
        return res.status(401).json({ error: "token invalid" })
    }
}