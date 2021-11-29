import jwt from 'jsonwebtoken';

// create json web token
export const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
        expiresIn: maxAge
    });
};

export default createToken