import { Document, Model, model, Types, Schema, Query } from "mongoose";

// Schema
const UserSchema = new Schema<UserDocument, UserModel>({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    }
});


export interface User {
    username: string;
    email: string;
}

/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the 
 * type of `company` field is not deterministic
 */
interface UserBaseDocument extends User, Document {
    getUsername(): string;
    getEmail(): string;
}

// Export this for strong typing
export interface UserDocument extends UserBaseDocument {
}


// Virtuals


// Methods
UserSchema.methods.getUsername = function () {
    return this.username;
};

UserSchema.methods.getEmail = function () {
    return this.email;
};




// For model
export interface UserModel extends Model<UserDocument> {
    
}

// Static methods


// Document middlewares


// Query middlewares


// Default export
const UserM = model<UserDocument, UserModel>("User", UserSchema);
export default UserM;