import { UserModel } from '../models/BuyMe'

exports.GetReceiverId = async (req, res) => {
    let user = await UserModel.findOne({ _id: req.query.userObjId })
    if (!user) {
        res.status(200).send({
            message: 'error',
            content: 'Cannot find user with this ID!',
        })
    } else {
        res.status(200).send({
            message: 'success',
            content: {
                id: user.user_id,
            },
        })
    }
}

exports.GetTransferAccount = async (req, res) => {
    const { userId } = req.query
    let user = await UserModel.findOne({ user_id: userId })
    if (!user) {
        res.status(200).send({
            message: 'error',
            content: 'Cannot find user with this ID!',
        })
    } else {
        res.status(200).send({
            message: 'success',
            content: {
                name: user.name,
                id: user.user_id,
                bankaccount: user.bankaccount,
            },
        })
    }
}
