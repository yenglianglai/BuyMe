import { ChatBoxModel, UserModel, TaskModel } from '../models/BuyMe'

exports.GetChat = async (req, res) => {
    const id = req.query.id
    const user = await UserModel.findOne({ user_id: id })
    const chatRooms = await ChatBoxModel.find({
        $or: [
            {
                sender: user,
            },
            {
                receiver: user,
            },
        ],
    }).populate('messages')
    res.send({ chatRooms: chatRooms })
}

exports.FulfillOrder = async (req, res) => {
    const senderID = req.body.senderID
    const receiverID = req.body.receiverID
    const userID = req.body.userID
    const taskID = req.body.taskID

    try {
        await TaskModel.findOneAndUpdate(
            {
                sender: senderID,
                receiver: receiverID,
            },
            { status: 'completed' }
        )
    } catch (e) {
        console.log(e)
    }

    try {
        await ChatBoxModel.findOneAndDelete({ task_id: taskID })
    } catch (e) {
        console.log(e)
    }

    const user = await UserModel.findOne({ user_id: userID })
    const chatRooms = await ChatBoxModel.find({
        $or: [
            {
                sender: user,
            },
            {
                receiver: user,
            },
        ],
    }).populate('messages')
    res.send({ chatRooms: chatRooms })
}
