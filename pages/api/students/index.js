import Student from '../../../models/Student';
import handleErrors from '../../../utils/handleErrors'
import dbConnect from '../../../utils/dbConnect';
import { authenticated } from '../../../middleware/authMiddleware';
dbConnect();

async function handler(req, res) {

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const Students = await Student.find({});
                res.status(200).json({ success: true, data: Students })
            } catch (error) {
                res.status(400).json({ errors: handleErrors(error) });
            }
            break;
        case 'POST':
            try {
                const insertStudent = await Student.create(req.body);

                res.status(201).json({ success: true, data: insertStudent })
            } catch (error) {
                res.status(400).json({ errors: handleErrors(error) });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
export default authenticated(handler)