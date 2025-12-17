import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

// POST /posts → create a post
router.post("/", createPost);

// GET /posts → get all posts (optional filter by author_id)
router.get("/", getAllPosts);

// GET /posts/:id → get single post with author details
router.get("/:id", getPostById);

// PUT /posts/:id → update post
router.put("/:id", updatePost);

// DELETE /posts/:id → delete post
router.delete("/:id", deletePost);

export default router;
