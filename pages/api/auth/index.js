import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import handleErrors from '../../../utils/handleErrors'
import createToken, { maxAge } from '../../../utils/createJwt';
import cookie from 'js-cookie'
import { serialize } from 'cookie';
dbConnect();

export default async function handler(req, res) {

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const Users = await User.find({});

                res.status(200).json({ success: true, data: Users })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const user = await User.create(req.body);
                const token = createToken(user._id);
                // cookie.set('token', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.setHeader('Set-Cookie', serialize('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, path: '/' }));
                // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(201).json({ success: true, user: user.id, token, message: 'User berhasil ditambahkan' })
            } catch (error) {
                const err = handleErrors(error);
                res.status(400).json({ success: false, error: err });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}