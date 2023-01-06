import { UserModel } from '../models/BuyMe'

exports.UserLogin = async (req, res) => {
    const { userId } = req.body

    const user = await UserModel.findOne({ user_id: userId })

    if (!user) {
        res.status(400).send({
            message: 'error',
            content: 'User does not exist!',
        })
    } else {
        res.status(200).send({
            message: 'success',
            content: {
                password: user.password,
                name: user.name,
                id: user.user_id,
            },
        })
    }
}
