# CRUD Blog API - Interview Task

## 📌 Project Setup

### Install Dependencies
```sh
npm install
```

### Start Server
```sh
npm start
```

---

## 📌 API Endpoints

### 🔹 Create Blog
**Endpoint:**
```http
POST /blog/create
```
**Request Body:**
```json
{
  "title": "Sample Blog Title",
  "content": "This is a sample blog content.",
  "author": "John Doe",
  "isShow": true
}
```
**Response:**
```json
{
  "status": true,
  "message": "Blog created successfully",
  "blog": { /* Created Blog Object */ }
}
```

---

### 🔹 Get Blogs (With Pagination & Search)
**Endpoint:**
```http
GET /blog/show?page=1&limit=10&search=sample
```
**Response:**
```json
{
  "status": true,
  "message": "Blogs fetched successfully",
  "blogs": [ /* List of Blogs */ ],
  "totalBlogs": 100,
  "page": 1,
  "limit": 10
}
```

---

### 🔹 Update Blog
**Endpoint:**
```http
PUT /blog/update?id=blogId
```
**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "author": "Updated Author",
  "isShow": false
}
```
**Response:**
```json
{
  "status": true,
  "message": "Blog updated successfully",
  "blog": { /* Updated Blog Object */ }
}
```

---

### 🔹 Delete Blog
**Endpoint:**
```http
DELETE /blog/delete?id=blogId
```
**Response:**
```json
{
  "status": true,
  "message": "Blog deleted successfully"
}
```

---

## 📌 Project Structure
```
├── controller
│   ├── blogController.js
├── modal
│   ├── index.model.js
├── routes
│   ├── blog.route.js
│   ├── index.js
├── index.js
├── README.md
└── .env
```

## 📌 Environment Variables (`.env`)
```
port=3000
mongoDb_url=mongodb+srv://123:123@cluster0.7q5mecv.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0

---

## 📌 Deployment & Hosting
To deploy on **Vercel**:
```sh
vercel
```
To deploy on **AWS EC2**:
```sh
pm run build && pm2 start server.js
```

--
