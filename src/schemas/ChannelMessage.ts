import { Schema, model, Types} from 'mongoose';

const ChannelMessageSchema = new Schema({
    message: {
        type: String,
        required: true,
        unique: true
    },
    queue: {
        type: Types.ObjectId,
        ref: 'Channel',
        required: true
    }
});

export default model('ChannelMessage', ChannelMessageSchema);