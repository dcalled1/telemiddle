import {Document, Schema,Model, model, Types} from 'mongoose';

const QueueMessageSchema = new Schema<QueueMessageDocument, QueueMessageModel>({
// const QueueMessageSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    queue: {
        type: Types.ObjectId,
        ref: 'Queue',
        required: true
    }
});

// export default model('QueueMessage', QueueMessageSchema);

export interface QueueMessage {
    message : String;
    queue: Types.ObjectId;
}

interface QueueMessageBaseDocument extends QueueMessage, Document {
    getMessage(): String;
    getQueue(): Types.ObjectId;
}

export interface QueueMessageDocument extends QueueMessageBaseDocument {

}

QueueMessageSchema.methods.getName = function () {
    return this.message;
}

QueueMessageSchema.methods.getOwner = function () {
    return this.queue;
}

export interface QueueMessageModel extends Model<QueueMessageDocument> {
    
}

export default model<QueueMessageDocument, QueueMessageModel>('QueueMessage', QueueMessageSchema);