const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title:String,
    content:String,
    author:String,
    isShow:Number
},{
    timestamps: true,
    versionKey: false,
  }
)

module.exports = new mongoose.model("bolg",blogSchema)
