import { Schema, model, Types} from 'mongoose';

const QueueMessageSchema = new Schema({
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

export default model('QueueMessage', QueueMessageSchema);