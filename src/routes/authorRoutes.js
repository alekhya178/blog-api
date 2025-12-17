import express from "express";
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getAuthorPosts
} from "../controllers/authorController.js";

const router = express.Router();

router.post("/", createAuthor);
router.get("/", getAllAuthors);

// ⭐ NESTED ROUTE FIRST
router.get("/:id/posts", getAuthorPosts);

// NORMAL ROUTES
router.get("/:id", getAuthorById);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
