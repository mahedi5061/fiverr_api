import Conversation from "../models/conversation.model.js";

export const createConversationController = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });
  try {
    const saveConversation = await newConversation.save();
    res.status(201).send(saveConversation);
  } catch (err) {
    next(err);
  }
};

export const getConversationsController = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversationController = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversationController = async (req, res, next) => {
  try {
    const updateConversation = await Conversation.findByIdAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySeller: req.isSeller,
          // readByBuyer: !req.isSeller,

          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );
    res.status(200).send(updateConversation);
  } catch (err) {
    next(err);
  }
};
