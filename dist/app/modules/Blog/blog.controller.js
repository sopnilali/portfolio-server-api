import { BlogService } from "./blog.service.js";
const createBlog = async (req, res) => {
    const result = await BlogService.createBlog(req);
    res.status(200).json({
        success: true,
        message: "Blog created successfully",
        data: result
    });
};
const getAllBlog = async (req, res) => {
    const result = await BlogService.getAllBlog();
    res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        data: result
    });
};
const getSingleBlog = async (req, res) => {
    const result = await BlogService.getSingleBlog(req.params.id);
    res.status(200).json({
        success: true,
        message: "Blog fetched successfully",
        data: result
    });
};
const updateBlog = async (req, res) => {
    const result = await BlogService.updateBlog(req.params.id, req);
    res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        data: result
    });
};
const deleteBlog = async (req, res) => {
    const result = await BlogService.deleteBlog(req.params.id);
    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
        data: result
    });
};
const editorUpload = async (req, res) => {
    const result = await BlogService.editorUpload(req);
    res.status(200).json({
        success: true,
        message: "Editor upload successfully",
        data: result
    });
};
export const BlogController = { createBlog, getAllBlog, getSingleBlog, updateBlog, deleteBlog, editorUpload };
