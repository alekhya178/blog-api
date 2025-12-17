import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Author from "./Author.js";

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

/* ================================
   RELATIONSHIP (VERY IMPORTANT)
   ================================ */

// One Author → Many Posts
Author.hasMany(Post, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
});

// One Post → One Author
Post.belongsTo(Author, {
  foreignKey: "author_id",
});

export default Post;
