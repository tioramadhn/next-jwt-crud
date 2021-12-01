import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import handleErrors from '../../../utils/handleErrors'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'
dbConnect();

export default async function handler(req, res) {

    const { method } = req;

    if (method != 'POST') return res.status(405).json({ success: false, message: "Invalid request method" })
    try {
        const user = await User.create(req.body);
        const data = { sub: user._id, email: user.email }
        const jwt = sign(data, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 3600,
            sameSite: 'strict',
            path: '/'
        }));
        res.status(201).json({ success: true, message: 'User berhasil ditambahkan', data })
    } catch (err) {
        res.status(400).json({ success: false, errors: handleErrors(err) });
    }

}