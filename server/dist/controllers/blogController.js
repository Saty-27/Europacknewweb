"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendedBlogs = exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogBySlug = exports.getAllBlogs = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const node_cache_1 = __importDefault(require("node-cache"));
const blogCache = new node_cache_1.default({ stdTTL: 300 }); // Cache for 5 minutes
const getAllBlogs = async (req, res) => {
    try {
        const cacheKey = JSON.stringify(req.query);
        const cached = blogCache.get(`list_${cacheKey}`);
        if (cached)
            return res.status(200).json({ success: true, ...cached, cached: true });
        const { category, tag, status, limit = 10, skip = 0, sort = '-createdAt' } = req.query;
        const query = {};
        if (category)
            query.category = category;
        if (tag)
            query.tags = tag;
        if (status)
            query.status = status;
        const blogs = await Blog_1.default.find(query)
            .sort(sort)
            .limit(Number(limit))
            .skip(Number(skip))
            .lean();
        const total = await Blog_1.default.countDocuments(query);
        blogCache.set(`list_${cacheKey}`, JSON.parse(JSON.stringify({ blogs, total })));
        res.status(200).json({ success: true, blogs, total });
    }
    catch (error) {
        console.error('[BlogController] getAllBlogs Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllBlogs = getAllBlogs;
const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const cached = blogCache.get(`blog_${slug}`);
        if (cached)
            return res.status(200).json({ success: true, blog: cached, cached: true });
        const blog = await Blog_1.default.findOne({ slug })
            .populate('relations.relatedProducts')
            .populate('relations.relatedBlogs')
            .lean();
        if (!blog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }
        // Increment views asynchronously
        Blog_1.default.updateOne({ _id: blog._id }, { $inc: { 'analytics.views': 1 } }).exec().catch(console.error);
        blogCache.set(`blog_${slug}`, JSON.parse(JSON.stringify(blog)));
        res.status(200).json({ success: true, blog });
    }
    catch (error) {
        console.error('[BlogController] getBlogBySlug Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getBlogBySlug = getBlogBySlug;
const createBlog = async (req, res) => {
    try {
        const blogData = req.body;
        // Automatic slug from title if not provided
        if (!blogData.slug && blogData.title) {
            blogData.slug = blogData.title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
        }
        const blog = await Blog_1.default.create(blogData);
        blogCache.flushAll(); // Clear cache on new blog
        res.status(201).json({ success: true, blog });
    }
    catch (error) {
        console.error('[BlogController] createBlog Error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ success: false, error: 'Slug must be unique' });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createBlog = createBlog;
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).lean();
        if (!blog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }
        blogCache.flushAll(); // Clear cache on update
        res.status(200).json({ success: true, blog });
    }
    catch (error) {
        console.error('[BlogController] updateBlog Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog_1.default.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }
        blogCache.flushAll(); // Clear cache on delete
        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    }
    catch (error) {
        console.error('[BlogController] deleteBlog Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteBlog = deleteBlog;
const getRecommendedBlogs = async (req, res) => {
    try {
        const { currentBlogId, category, tags } = req.query;
        const query = {
            status: 'published',
            _id: { $ne: currentBlogId }
        };
        if (category || tags) {
            query.$or = [
                { category: category },
                { tags: { $in: Array.isArray(tags) ? tags : [tags] } }
            ];
        }
        const blogs = await Blog_1.default.find(query)
            .sort('-analytics.views -createdAt')
            .limit(4)
            .lean();
        res.status(200).json({ success: true, blogs });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getRecommendedBlogs = getRecommendedBlogs;
