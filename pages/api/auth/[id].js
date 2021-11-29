import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const getUserById = await User.findById(id);

                if (!getUserById) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: getUserById });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const editUser = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!editUser) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: editUser, message: "User berhasil di update" });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedUser = await User.deleteOne({ _id: id });

                if (!deletedUser) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {}, message: "User berhasil dihapus" });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}