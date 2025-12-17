import Author from "../models/Author.js";
import Post from "../models/Post.js";

// Create author
export const createAuthor = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const author = await Author.create({ name, email });
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all authors
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get author by ID
export const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE author
export const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    author.name = name ?? author.name;
    author.email = email ?? author.email;

    await author.save();
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE author
export const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    await author.destroy();
    res.json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ⭐ NESTED ENDPOINT
export const getAuthorPosts = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const posts = await Post.findAll({
      where: { author_id: id },
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
