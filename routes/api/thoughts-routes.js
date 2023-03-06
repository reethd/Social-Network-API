const router = require("express").Router();
const {
  getThoughts,
  getThoughtById,
  createNewThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

router.route("/").get(getThoughts).post(createNewThought);

router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(createReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// router
//   .route("/:thoughtId/reactions")
//   .post(createReaction)
//   .delete(deleteReaction);

module.exports = router;
