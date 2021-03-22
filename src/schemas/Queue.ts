import { Schema, model, Types} from 'mongoose';

const QueueSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default model('Queue', QueueSchema);