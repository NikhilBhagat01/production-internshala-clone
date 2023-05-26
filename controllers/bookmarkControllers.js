import userModel from "../models/userModel";

export const addBookmarkController = async () => {
  const user = await userModel.findOne(req.user._id);

  res.json({ user });
};
