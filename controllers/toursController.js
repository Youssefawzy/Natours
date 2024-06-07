const Tour = require("./../modules/tourModel");
const APIFeatures = require("./../utils/apiFeatures");
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    let features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;
    res.status(200).json({
      status: "success",
      length: tours.length,
      tours,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: { message: err.message, stack: err.stack },
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      tour,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: { message: err.message, stack: err.stack },
    });
  }
};

exports.createTour = async (req, res) => {
  console.log(req.body);
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: "success",
      tour: newTour,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: { message: err.message, stack: err.stack },
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidatours: true,
    });

    res.status(200).json({
      status: "success",
      updatedTour,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: { message: err.message, stack: err.stack },
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: { message: err.message, stack: err.stack },
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: { message: err.message, stack: err.stack },
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; // Convert to number
    console.log(`Year: ${year}`);

    const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
    const endOfYear = new Date(`${year}-12-31T23:59:59Z`);

    const plan = await Tour.aggregate([
      { $unwind: "$startDates" },
      {
        $match: {
          startDates: {
            $regex: new RegExp(`^${year}`),
          },
        },
      },
      {
        $group: {
          _id: {
            $month: {
              $dateFromString: {
                dateString: { $substr: ["$startDates", 0, 10] },
              },
            },
          },
          numTourStarts: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      { $addFields: { month: "$_id" } },
      { $project: { _id: 0 } },
      { $sort: { numTourStarts: -1 } },
      { $limit: 12 },
    ]);

    res.status(200).json({
      status: "success",
      data: { plan },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err: { message: err.message, stack: err.stack },
    });
  }
};
