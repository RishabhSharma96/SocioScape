import User from "../Models/User.js";

export const getUserData = async (req, res) => {
    try {
        const { id } = req.params
        const userData = await User.findById(id)
        res.status(200).json(userData)
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}