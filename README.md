# Blog API – Authors and Posts

##  Project Overview

This project is a RESTful API for a simple blog platform built using Node.js, Express, PostgreSQL, and Sequelize ORM.  
The API allows managing authors and their corresponding blog posts while demonstrating a one-to-many relationship between data entities.

Each author can have multiple posts, and each post belongs to exactly one author.  
The API enforces data integrity using foreign key constraints and supports cascade deletion.

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **ORM:** Sequelize  
- **API Testing:** Postman  

---

##  Project Structure
``` text
blog-api/
│
├── src/
│   ├── controllers/
│   │   ├── authorController.js
│   │   └── postController.js
│   │
│   ├── routes/
│   │   ├── authorRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── models/
│   │   ├── Author.js
│   │   └── Post.js
│   │
│   ├── config/
│   │   └── database.js
│   │
│   └── app.js
│
├── .gitignore   
├── .env         
├── package.json
└── README.md

```
##  Setup Instructions

### 1️. Clone the repository
```bash
git clone <your-github-repo-link>
cd blog-api
```

### 2️.Install dependencies
```
npm install
```

### 3️.Configure environment variables

Create a .env file in the root directory and add:
```
DB_NAME=blogdb
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

```
Make sure PostgreSQL is running on your system.

### 4️.Run the application
```
node src/app.js
```
If successful, you will see:
```
PostgreSQL connected successfully
All tables synced successfully
Server running on http://localhost:3000
```

## API Endpoints Documentation

### Author Endpoints:
### 1.Create Author

```
POST /authors
```
```
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### 2.Get All Authors
```
GET /authors
```

### 3.Get Author by ID
```
GET /authors/{id}
```

### 4.Update Author
```
PUT /authors/{id}
```

```
{
  "name": "Updated Name"
}
```

### 5.Delete Author

```
DELETE /authors/{id}
```

Deleting an author automatically deletes all associated posts.

### Post Endpoints:

### 1.Create Post
```
POST /posts
``` 
```
{
  "title": "My First Post",
  "content": "This is my blog post",
  "author_id": 1
}
```
Returns 400 error if author_id does not exist.

### 2.Get All Posts

```
GET /posts
```

### 3.Filter Posts by Author
```
GET /posts?author_id=1
```

### 4.Get Post by ID (with Author details)
```
GET /posts/{id}
```

### 5.Update Post
```PUT /posts/{id}
```
```
{
  "title": "Updated Title"
}
```
### 6.Delete Post
```
DELETE /posts/{id}
```
### Nested Resource Endpoint:
##  1.Get all posts of a specific author
```
GET /authors/{id}/posts
```
## 🗄️ Database Schema (ERD Explanation)

The database consists of two tables: **Author** and **Post**, designed using a one-to-many relationship.

### Author Table
- `id` (Primary Key): Uniquely identifies each author.
- `name`: Stores the author’s name.
- `email`: Stores the author’s email address. This field is unique to prevent duplicate author records.

### Post Table
- `id` (Primary Key): Uniquely identifies each post.
- `title`: Title of the blog post.
- `content`: Main content of the post.
- `author_id` (Foreign Key): References `Author.id` to associate each post with an author.

### Relationship Description
- One **Author** can have **many Posts**.
- Each **Post** belongs to exactly **one Author**.
- The `author_id` column in the Post table is a foreign key referencing the Author table.

### Cascade Delete Rule
The foreign key constraint is configured with **ON DELETE CASCADE**.  
This means when an author is deleted, all posts associated with that author are automatically removed from the database.  
This ensures data integrity and prevents orphaned records.

This schema efficiently models the one-to-many relationship and supports reliable relational data operations.


##  Key Features

One-to-many relationship using foreign keys

Cascade delete for data integrity

Validation for non-existent authors

Efficient queries using eager loading (no N+1 problem)

Clean MVC-style project structure

##  Testing

All endpoints were tested using Postman.
(Optional) A Postman collection can be added for easier testing.

##  Conclusion

This project demonstrates proper backend API design with relational data handling, database constraints, and efficient querying. It follows best practices for RESTful API development using Node.js and Sequelize.
