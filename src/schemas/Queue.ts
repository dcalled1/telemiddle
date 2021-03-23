import { Schema, Model, model, Types, Document} from 'mongoose';
import UserM, { UserDocument, UserModel } from './User';

// const QueueSchema = new Schema<QueueDocument, QueueModel>({
const QueueSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default model('Queue', QueueSchema);

// export interface Queue {
//     name : String;
//     owner: Types.ObjectId;
// }

// interface QueueBaseDocument extends Queue, Document {
//     getName(): String;
//     getOwner(): Types.ObjectId;
// }

// export interface QueueDocument extends QueueBaseDocument {

// }

// QueueSchema.methods.getName = function () {
//     return this.name;
// }

// QueueSchema.methods.getOwner = function () {
//     return this.owner;
// }

// export interface QueueModel extends Model<QueueDocument> {
    
// }

// export default model<QueueDocument, QueueModel>('Queue', QueueSchema);