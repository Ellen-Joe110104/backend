import { User } from "../models/user.model.js"

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        // Kiểm tra nếu người dùng có tồn tại
        const user = await User.findOne({ clerkId: id });

        if (!user) {
            //Đăng nhập
            await User.create({
                clerkId: id,
                fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                imageUrl
            })
        }

        res.status(200).json({ success: true })
    } catch (error) {
        console.log("Error in auth callback", error);
        next(error)
    }
};