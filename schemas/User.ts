import { model, Schema, Document } from "mongoose"

interface IUser {
    username: string,
    appname?:string,

}

interface IUserDoc extends IUser, Document {

}

const UserSchemaFields: Record<keyof IUser, any> = {
    username: {
        type: String,
        required: true,
    },
    appname: {
        type: String,
        required: false,
    },

}

const UserSchema = new Schema(UserSchemaFields);

const User = model('User', UserSchema);

export { IUser, User };