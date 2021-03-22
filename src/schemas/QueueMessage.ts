import { Schema, model, Types} from 'mongoose';

const QueueMessageSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    queue: {
        type: Types.ObjectId,
        ref: 'Queue',
        required: true
    }
});

export default model('QueueMessage', QueueMessageSchema);