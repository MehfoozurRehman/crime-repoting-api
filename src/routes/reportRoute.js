const router = require("express").Router();
const reportModel = require("../models/reportModel");

router.get("/report/get_all", async (req, res) => {
  try {
    res.send(await reportModel.find({}));
  } catch (error) {
    console.log(error);
  }
});
router.post("/report/create", async (req, res) => {
  try {
    new reportModel(req.body).save();
    res.json(req.body);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/report/delete", async (req, res) => {
  try {
    reportModel.deleteOne({ _id: req.body._id }, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message: "successfully Deleted",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});
router.put("/report/edit", async (req, res) => {
  try {
    reportModel.findByIdAndUpdate(
      req.body._id,
      {
        $set: req.body,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            name: req.body.name,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
