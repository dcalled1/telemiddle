import { Schema, model, Types} from 'mongoose';

const ChannelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default model('Channel', ChannelSchema);