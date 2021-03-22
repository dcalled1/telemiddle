import { Schema, model, Types} from 'mongoose';

const MessageSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    channel: {
        type: Types.ObjectId,
        ref: 'Channel',
        require: true
    }
});

export default model('Message', MessageSchema);