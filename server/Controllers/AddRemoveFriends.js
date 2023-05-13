import User from "../Models/User.js";

export const AddRemoveFriends = async (req, res) => {
    const { id, friendId } = req.params
    const user = await User.findById(id)
    const friend = await User.findById(friendId)

    if (user.friends.include(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId)
        friend.friends = friend.friends.filter((id) => id !== id)
    }
    else {
        user.friends.push(friendId)
        friend.friends.push(id)
    }

    await user.save()
    await friend.save()

    const friends = await Promise.all(userData.friends.map((id) => User.findById(id)))

    const formattedFriends = friends.map(({
        _id, firstname, lastname, occupation, location, picturePath
    }) => {
        return { _id, firstname, lastname, occupation, location, picturePath }
    })

    res.status(200).json(formattedFriends)
}