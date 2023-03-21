import User from "../models/user.model.js";
import createError from "../utils/createError.js";

//deleted user
export const deleteUserController = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can only delete your account!"));
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    successMessage: "Your account deleted successfully!",
  });
};

//get user
export const getUserController = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};
