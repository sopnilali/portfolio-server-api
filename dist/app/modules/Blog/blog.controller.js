"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const blog_service_1 = require("./blog.service");
const createBlog = async (req, res) => {
    const result = await blog_service_1.BlogService.createBlog(req);
    res.status(200).json({
        success: true,
        message: "Blog created successfully",
        data: result
    });
};
const getAllBlog = async (req, res) => {
    const result = await blog_service_1.BlogService.getAllBlog();
    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        data: result
    });
};
const getSingleBlog = async (req, res) => {
    const result = await blog_service_1.BlogService.getSingleBlog(req.params.id);
    res.status(200).json({
        success: true,
        message: "Blog fetched successfully",
        data: result
    });
};
const updateBlog = async (req, res) => {
    const result = await blog_service_1.BlogService.updateBlog(req.params.id, req);
    res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        data: result
    });
};
const deleteBlog = async (req, res) => {
    const result = await blog_service_1.BlogService.deleteBlog(req.params.id);
    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
        data: result
    });
};
const editorUpload = async (req, res) => {
    const result = await blog_service_1.BlogService.editorUpload(req);
    res.status(200).json({
        success: true,
        message: "Editor upload successfully",
        data: result
    });
};
exports.BlogController = { createBlog, getAllBlog, getSingleBlog, updateBlog, deleteBlog, editorUpload };
