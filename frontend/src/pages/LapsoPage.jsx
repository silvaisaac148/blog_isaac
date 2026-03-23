import { useState, useEffect } from "react";
import { getPosts } from "../services/api";
import PostCard from "../components/PostCard";

/**
 * Generic page that displays posts for a given Lapso.
 * Used for Lapso 1, 2, 3, and 4.
 */
function LapsoPage({ lapsoSlug, title }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getPosts(lapsoSlug)
            .then((res) => {
                setPosts(res.data.results || res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
                setError("No se pudieron cargar las publicaciones.");
                setLoading(false);
            });
    }, [lapsoSlug]);

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-spinner" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">⚠️</div>
                <h3>{error}</h3>
            </div>
        );
    }

    return (
        <div className="fade-in-up">
            <header className="page-header">
                <h1>{title}</h1>
                <p>
                    Asignaciones, análisis e investigaciones correspondientes a{" "}
                    {title.toLowerCase()}.
                </p>
            </header>

            {posts.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <h3>Aún no hay publicaciones</h3>
                    <p>Las asignaciones de este lapso se publicarán próximamente.</p>
                </div>
            ) : (
                <div className="posts-grid">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default LapsoPage;
