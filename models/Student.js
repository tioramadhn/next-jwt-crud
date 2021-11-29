const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    nim: {
        type: String,
        required: [true, 'Please enter your nim'],
        unique: true,
        maxlength: [10, 'Description cannot be more than 10 characters']
    },
    jurusan: {
        type: String,
        required: [true, 'Please enter your jurusan'],
    }
})

module.exports = mongoose.models.Student || mongoose.model('Student', StudentSchema);