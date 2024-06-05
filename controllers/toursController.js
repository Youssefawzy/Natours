const Tour = require("./../modules/tourModel");
const APIFeatures = require("./../utils/apiFeatures");
exports.getAllTours = async (req, res) => {
  try {
    console.log("here");
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
