import Post from "../models/Post.js";
import Author from "../models/Author.js";

/* ===============================
   CREATE POST
   =============================== */
export const createPost = async (req, res) => {
  try {
    const { title, content, author_id } = req.body;

    if (!title || !content || !author_id) {
      return res.status(400).json({
        message: "title, content, and author_id are required",
      });
    }

    // Check if author exists
    const author = await Author.findByPk(author_id);
    if (!author) {
      return res.status(400).json({ message: "Author does not exist" });
    }

    const post = await Post.create({ title, content, author_id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
   GET ALL POSTS (with filter)
   =============================== */
export const getAllPosts = async (req, res) => {
  try {
    const { author_id } = req.query;

    const posts = await Post.findAll({
      where: author_id ? { author_id } : {},
      include: {
        model: Author,
        attributes: ["name", "email"],
      },
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
   GET POST BY ID (with author)
   =============================== */
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id, {
      include: {
        model: Author,
        attributes: ["name", "email"],
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
   UPDATE POST
   =============================== */
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = title ?? post.title;
    post.content = content ?? post.content;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
   DELETE POST
   =============================== */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
