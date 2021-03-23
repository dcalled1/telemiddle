import { Schema, Model, model, Types, Document} from 'mongoose';
import UserM, { UserDocument, UserModel } from './User';

const ChannelSchema = new Schema({
// const ChannelSchema = new Schema<ChannelDocument, ChannelModel>({
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

export default model('Channel', ChannelSchema);

// export interface Channel {
//     name : String;
//     owner: Types.ObjectId;
// }

// interface ChannelBaseDocument extends Channel, Document {
//     getName(): String;
//     getOwner(): Types.ObjectId;
// }

// export interface ChannelDocument extends ChannelBaseDocument {

// }

// ChannelSchema.methods.getName = function () {
//     return this.name;
// }

// ChannelSchema.methods.getOwner = function () {
//     return this.owner;
// }

// export interface ChannelModel extends Model<ChannelDocument> {
    
// }

// export default model<ChannelDocument, ChannelModel>('Channel', ChannelSchema);