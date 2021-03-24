import {Document, Schema,Model, model, Types} from 'mongoose';

const ChannelMessageSchema = new Schema<ChannelMessageDocument, ChannelMessageModel>({
// const ChannelMessageSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    workerqueue: {
        type: Types.ObjectId,
        ref: 'WorkerQueue',
        required: true
    }
});

// export default model('ChannelMessage', ChannelMessageSchema);

export interface ChannelMessage {
    message : String;
    workerqueue: Types.ObjectId;
}

interface ChannelMessageBaseDocument extends ChannelMessage, Document {
    getMessage(): String;
    getChannel(): Types.ObjectId;
}

export interface ChannelMessageDocument extends ChannelMessageBaseDocument {

}

ChannelMessageSchema.methods.getMessage = function () {
    return this.message;
}

ChannelMessageSchema.methods.getWorkerQueue = function () {
    return this.workerqueue;
}

export interface ChannelMessageModel extends Model<ChannelMessageDocument> {
    
}

export default model<ChannelMessageDocument, ChannelMessageModel>('ChannelMessage', ChannelMessageSchema);