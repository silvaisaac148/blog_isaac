import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../services/api";
import MediaGallery from "../components/MediaGallery";

/**
 * Full post detail view — renders rich text content and media gallery.
 */
function PostDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getPost(slug)
            .then((res) => {
                setPost(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching post:", err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-spinner" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <h3>Publicación no encontrada</h3>
            </div>
        );
    }

    const formattedDate = new Date(post.created_at).toLocaleDateString("es-VE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article className="post-detail fade-in-up">
            <button className="back-link" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <header className="post-detail-header">
                <div className="post-detail-meta">
                    <span className="tag">{post.lapso_title}</span>
                    <span>{formattedDate}</span>
                </div>
                <h1>{post.title}</h1>
            </header>

            {post.featured_image && (
                <img
                    src={post.featured_image}
                    alt={post.title}
                    className="post-detail-featured-image"
                />
            )}

            <div
                className="post-detail-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <MediaGallery attachments={post.media_attachments} />
        </article>
    );
}

export default PostDetail;
