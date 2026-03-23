import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Fetch all lapsos with their nested posts.
 */
export const getLapsos = () => api.get("/lapsos/");

/**
 * Fetch a single lapso by slug.
 */
export const getLapso = (slug) => api.get(`/lapsos/${slug}/`);

/**
 * Fetch posts, optionally filtered by lapso slug.
 * @param {string} [lapsoSlug] - Filter posts by lapso.
 */
export const getPosts = (lapsoSlug) => {
    const params = lapsoSlug ? { lapso: lapsoSlug } : {};
    return api.get("/posts/", { params });
};

/**
 * Fetch a single post with full content and media attachments.
 */
export const getPost = (slug) => api.get(`/posts/${slug}/`);

export default api;
