import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = Schema(
    {
        user_id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        tasks: [{ type: mongoose.Types.ObjectId, ref: 'Task' }],
        bankaccount: {
            bank_id: { type: String },
            bankaccount_id: { type: String },
        },
    },
    { timestamps: true }
)

const UserModel = mongoose.model('User', UserSchema)

const TaskSchema = Schema(
    {
        sender: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        receiver: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },

        created_at: { type: Date, required: true },
        title: { type: String, required: true },
        restaurantName: { type: String, required: true },
        taskContent: { type: String, required: true },
        due_start: { type: Date, required: true },
        due_end: { type: Date, required: true },
        fee: { type: Number, required: true },
        status: { type: String, required: true }, // 'open', 'accepted', 'completed'
    },

    { timestamps: true }
)

const TaskModel = mongoose.model('Task', TaskSchema)

const MessageSchema = new Schema({
    sender: { type: String, required: true },
    body: { type: String, required: [true, 'Body field is required!'] },
})

const MessageModel = mongoose.model('Message', MessageSchema)

const ChatBoxSchema = new Schema({
    name: { type: String, required: true },
    sender: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    title: { type: String, required: true },
    messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
    due_period: { type: String, required: true },
    fee: { type: String, required: true },
    from: { type: String, required: true },
    task_id: { type: mongoose.Types.ObjectId, ref: 'Task', required: true },
})

const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema)

export { UserModel, TaskModel, MessageModel, ChatBoxModel }
