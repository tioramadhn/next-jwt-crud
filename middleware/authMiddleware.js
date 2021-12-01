import { verify } from 'jsonwebtoken'


export const authenticated = (fn) => async (req, res) => {
    verify(req.headers.authorization, process.env.SECRET_KEY, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }
        res.status(401).json({ success: false, message: "Sorry you are not authenticated" })
    })
}