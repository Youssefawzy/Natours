const Review = require("./../modules/reviewModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    length: reviews.length,
    reviews,
  });
});

exports.createReview = catchAsync(async (req, res) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;


  const review = await Review.create(req.body);

  res.status(200).json({
    status: "success",
    review,
  });
});
