const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} =require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing");


const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errorMsg);
    }else {
        next();
    }
};

router.post("/",validateReview,wrapAsync(async(req ,res) => {
    let listing = await Listing.findById(req.params.id).populate("reviews");
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review saved");
    console.log(req.body);
    res.redirect(`/listings/${listing._id}`)

}));

//Delete Review Route

router.delete("/:reviewId" , wrapAsync(async (req, res ) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`)
}));

module.exports = router;