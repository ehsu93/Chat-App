import { Schema } from 'mongoose';
import sha256 from 'sha256';

const userSchema = new Schema({
    email: { type: String, required: true},
    hashedPassword: { type: String, required: true },
});

/**
 * #param {*} password
 */
userSchema.methods.comparePassword = function comparePassword(password) {
    return this.hashedPassword === sha256(password);
};

export default userSchema;
