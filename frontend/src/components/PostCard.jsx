import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
    const navigate = useNavigate();

    const formattedDate = new Date(post.created_at).toLocaleDateString("es-VE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article
            className="post-card fade-in-up"
            onClick={() => navigate(`/post/${post.slug}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/post/${post.slug}`)}
        >
            {post.featured_image ? (
                <img
                    src={post.featured_image}
                    alt={post.title}
                    className="post-card-image"
                    loading="lazy"
                />
            ) : (
                <div className="post-card-image-placeholder">📝</div>
            )}
            <div className="post-card-body">
                <div className="post-card-date">{formattedDate}</div>
                <h3>{post.title}</h3>
                {post.excerpt && <p>{post.excerpt}</p>}
            </div>
        </article>
    );
}

export default PostCard;
