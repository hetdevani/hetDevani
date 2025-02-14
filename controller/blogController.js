const { Blog } = require("../modal/index.model")


exports.addBlog = async (req, res) => {
    try {
        const { title, content, author, isShow } = req.body

        if (!title ) {
            return res.status(404).json({
                status: false,
                message: "title field is required"
            })
        }

        if (!content ) {
            return res.status(404).json({
                status: false,
                message: "content field is required"
            })
        }

        if (!author ) {
            return res.status(404).json({
                status: false,
                message: "author field  is required"
            })
        }



        const blog = new Blog()

        blog.title = title
        blog.content = content
        blog.author = author
        blog.isShow = isShow || 1

        await blog.save()

        return res.status(201).json({
            status: true,
            message: "Blog created successfully",
            blog
        })
    } catch (error) {
         console.log("error",error);
         return res.status(500).json({
            status:false,
            message:"Internal server Error !1"
         })
         
    }
}


exports.getBlog = async (req, res) => {
    try {
        const {id} = req.query;
        let blog;

        if (id) {
            blog = await Blog.findById(id); 

            if (!blog) {
                return res.status(404).json({
                    status: false,
                    message: "Invalid blog ID!"
                });
            }
        } else {
            blog = await Blog.find();
        }

        return res.status(200).json({
            status: true,
            message: "Blog(s) retrieved successfully",
            data: blog
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error!"
        });
    }
};


exports.editBlog = async(req,res)=>{
    try {
        const { title, content, author, isShow } = req.body

        const {id} = req.query

        const blog = await  Blog.findById(id)

        blog.title = title || blog.title
        blog.content = content||blog.content
        blog.author = author ||blog.author
        blog.isShow = isShow || blog.isShow 

        await blog.save()

        return res.status(200).json({
            status: true,
            message: "Blog update successfully",
            blog
        })

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error!"
        });
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const {id} = req.query;
        if (!id ) {
            return res.status(404).json({
                status: false,
                message: "id required for delete blog"
            })
        }

        const blog  = await Blog.findById(id)

        if (!blog) {
            return res.status(401).json({
                status:false,
                message:"Invalid blog id"
            })
        }

        await blog.deleteOne()

        return res.status(200).json({
            status: true,
            message: "Blog delete successfully",
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error!"
        });
    }
};