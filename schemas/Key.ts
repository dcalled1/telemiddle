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
    owner: Types.ObjectId | Record<string, unknown>;
}