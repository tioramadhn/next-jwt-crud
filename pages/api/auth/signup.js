import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import handleErrors from '../../../utils/handleErrors'
import { sign } from 'jsonwebtoken'
dbConnect();

export default async function handler(req, res) {

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const Users = await User.find({});

                res.status(200).json({ success: true, data: Users })
            } catch (error) {
                res.status(400).json({ success: false, message: "Data gagal didapatkan" });
            }
            break;
        case 'POST':
            try {
                const user = await User.create(req.body);
                const data = { sub: user._id, email: user.email }
                const jwt = sign(data, process.env.SECRET_KEY, { expiresIn: '1h' })
                // const token = createToken(user._id);
                // res.setHeader('Set-Cookie', serialize('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV !== "development", maxAge: maxAge * 1000, path: '/' }));
                res.status(201).json({ success: true, message: 'User berhasil ditambahkan', authToken: jwt })
            } catch (error) {
                res.status(400).json({ success: false, errors: handleErrors(error) });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}