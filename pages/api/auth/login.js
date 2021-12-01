import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { sign } from 'jsonwebtoken'
import bcrypt from "bcrypt"
import cookie from 'cookie'

dbConnect();

export default async function handler(req, res) {
    const { method } = req;

    if (method != 'POST') return res.status(405).json({ success: false, message: "Invalid request method" })

    const { email, password } = req.body;

    const checkUser = await User.findOne({ email })

    if (!checkUser) return res.status(401).json({ success: false, message: "Email not registered" });

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) return res.status(401).json({ success: false, message: "Password wrong!" });

    const data = { sub: checkUser._id, email: checkUser.email }
    const authToken = sign(data, process.env.SECRET_KEY, { expiresIn: '1h' })

    res.setHeader('Set-Cookie', cookie.serialize('auth', authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3600,
        sameSite: 'strict',
        path: '/'
    }));

    res.status(200);
    res.json({
        success: true,
        message: 'Login successfully',
        authToken
    });
}