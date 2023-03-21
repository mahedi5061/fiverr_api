import Gig from "../models/gig.model.js";
import Review from "../models/review.model.js";
import createError from "../utils/createError.js";

export const createReviewController = async (req, res, next) => {
  if (req.isSeller) {
    return next(createError(403, "Sellers can't create a review!"));
  }
  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });
  try {
    const review = await Review.findOne({
      userId: req.userId,
      gigId: req.body.gigId,
    });

    //there has a problem i can't solve this probelm that is user update their review but unfortunately i can't solve this problem...
    if (review) {
      return next(
        createError(403, "You have already created a review for this gig!")
      );
    }

    //TODO: check if the user purchased the gig.
    const saveReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).send(saveReview);
  } catch (err) {
    next(err);
  }
};

export const getReviewController = async (req, res, next) => {
  try {
    const review = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(review);
  } catch (err) {
    next(err);
  }
};

export const deleteReviewController = (req, res, next) => {};
