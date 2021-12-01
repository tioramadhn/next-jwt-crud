import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { sign } from 'jsonwebtoken'
import bcrypt from "bcrypt"
dbConnect();

export default async function handler(req, res) {
    const { method } = req;

    if (method != 'POST') return res.status(405).json({ success: false, message: "Invalid request method" }).end()

    const { email, password } = req.body;

    const checkUser = await User.findOne({ email })

    if (!checkUser) return res.status(401).json({ message: "Email not registered" }).end();

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) return res.status(401).json({ success: false, message: "Invalid request method" }).end();

    const data = { sub: checkUser._id, email: checkUser.email }
    const authToken = sign(data, process.env.SECRET_KEY, { expiresIn: '1h' })

    res.status(200);
    res.json({
        success: true,
        message: 'Login successfully',
        authToken
    });
}