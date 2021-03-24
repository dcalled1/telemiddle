import { Schema, Model, model, Types, Document} from 'mongoose';
import './Channel';

// const WorkerQueueSchema = new Schema({
const WorkerQueueSchema = new Schema<WorkerQueueDocument, WorkerQueueModel>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    channel: {
        type: Types.ObjectId,
        ref: 'Channel',
        required: true
    }
});

// export default model('WorkerQueue', WorkerQueueSchema);

export interface WorkerQueue {
    name : String;
    channel: Types.ObjectId;
}

interface WorkerQueueBaseDocument extends WorkerQueue, Document {
    getName(): String;
    getChannel(): Types.ObjectId;
}

export interface WorkerQueueDocument extends WorkerQueueBaseDocument {

}

WorkerQueueSchema.methods.getName = function () {
    return this.name;
}

WorkerQueueSchema.methods.getChannel = function () {
    return this.channel;
}

export interface WorkerQueueModel extends Model<WorkerQueueDocument> {
    
}

export default model<WorkerQueueDocument, WorkerQueueModel>('WorkerQueue', WorkerQueueSchema);