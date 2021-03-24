import { Document, Model, model, Types, Schema, Query } from "mongoose";

const KeySchema: Schema = new Schema({
    appname: {
        type: String,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
        unique: true,
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

export interface Key {
    appname: string;
    uuid: string;
    owner: Types.ObjectId;
}

export interface KeyDocument extends Key, Document {}

export interface KeyModel extends Model<KeyDocument> {}

export default model<KeyDocument, KeyModel>('Key', KeySchema);