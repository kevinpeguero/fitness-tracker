const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

// Home page route
router.get("/all", function(req, res) {
  db.Workout.find({})
    .sort({ _id: -1 })
    .populate("exercises")
    .then(function(dbWorkout) {
      res.send(dbWorkout);
    });
});

router.post("/", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbUser => {
      res.redirect("/");
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/submit/:id", ({ body, params }, res) => {
  id = params.id;
  db.Exercise.create(body).then(({ _id }) => {
    db.Workout.findOneAndUpdate(
      { _id: id },
      { $push: { exercises: _id } },
      { new: true }
    )
      .then(dbUser => {
        res.redirect("/");
      })
      .catch(err => {
        res.json(err);
      });
  });
});

router.delete("/delete/:id", (req, res) => {
  id = req.params.id;
  db.Workout.remove(
    {
      _id: id
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

module.exports = router;
