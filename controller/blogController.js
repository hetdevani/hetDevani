const { Blog } = require("../modal/index.model");
const mongoose = require("mongoose");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.addBlog = async (req, res) => {
    try {
        const { title, content, author, isShow = true } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({
                status: false,
                message: "Title, content, and author fields are required"
            });
        }

        const blog = await Blog.create({ title, content, author, isShow });

        return res.status(201).json({
            status: true,
            message: "Blog created successfully",
            blog
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};

exports.getBlog = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || "";

        const fieldsToSearch = ["title", "content", "author"];
        const matchQuery = search
            ? {
                $or: fieldsToSearch.map((field) => ({
                    [field]: { $regex: search, $options: "i" },
                })),
            }
            : {}; 

        const commonPipeline = [{ $match: matchQuery }];

        const paginationPipeline = [
            ...commonPipeline,
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
        ];

        const countPipeline = [
            ...commonPipeline,
            { $count: "total" },
        ];

        const blogTotal = await Blog.aggregate(countPipeline);
        const totalBlogs = blogTotal.length > 0 ? blogTotal[0].total : 0;

        const blogs = await Blog.aggregate(paginationPipeline);

        return res.status(200).json({
            status: true,
            message: "Blogs fetched successfully",
            blogs,
            totalBlogs,
            page,
            limit,
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};


exports.editBlog = async (req, res) => {
    try {
        const { id } = req.query;
        const { title, content, author, isShow } = req.body;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                status: false,
                message: "Invalid blog ID format"
            });
        }

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                status: false,
                message: "Blog not found"
            });
        }

        blog.title = title ?? blog.title;
        blog.content = content ?? blog.content;
        blog.author = author ?? blog.author;
        blog.isShow = isShow ?? blog.isShow;

        await blog.save();

        return res.status(200).json({
            status: true,
            message: "Blog updated successfully",
            blog
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.query;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                status: false,
                message: "Invalid blog ID format"
            });
        }

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                status: false,
                message: "Blog not found"
            });
        }

        await blog.deleteOne();

        return res.status(200).json({
            status: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};
