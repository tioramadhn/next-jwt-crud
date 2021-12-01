import dbConnect from '../../../utils/dbConnect';
import Student from '../../../models/Student';
import handleErrors from '../../../utils/handleErrors'
import { authenticated } from '../../../middleware/authMiddleware';

dbConnect();

async function handler(req, res) {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const getStudentById = await Student.findById(id);

                if (!getStudentById) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: getStudentById });
            } catch (err) {
                res.status(400).json({ success: false, message: "Data tidak ditemukan" });
            }
            break;
        case 'PUT':
            try {
                const editStudent = await Student.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!editStudent) {
                    return res.status(400).json({ success: false, message: "Data tidak ada yang di ubah" });
                }
                res.status(200).json({ success: true, message: "Data berhasil di update" });
            } catch (error) {
                res.status(400).json({ success: false, errors: handleErrors(error) });
            }
            break;
        case 'DELETE':
            try {
                const deletedStudent = await Student.deleteOne({ _id: id });

                if (!deletedStudent) {
                    return res.status(400).json({ success: false, message: "Data gagal dihapus" })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false, message: "Data gagal di hapus" })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}

export default authenticated(handler)