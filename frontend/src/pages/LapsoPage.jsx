import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../services/api";
import PostCard from "../components/PostCard";

const INFOGRAFIAS_LAPSO1 = [
    {
        slug: "cto",
        title: "Infografía CTO · De Programador a Orquestador",
        excerpt: "Infografía visual sobre el rol del CTO y su evolución desde programador hasta orquestador estratégico de tecnología.",
        icon: "📊",
        path: "/infografia/cto",
    },
];

/**
 * Generic page that displays posts for a given Lapso.
 * Used for Lapso 1, 2, 3, and 4.
 */
function LapsoPage({ lapsoSlug, title }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const infografias = lapsoSlug === "lapso-1" ? INFOGRAFIAS_LAPSO1 : [];

    return (
        <div className="fade-in-up">
            <header className="page-header">
                <h1>{title}</h1>
                <p>
                    Asignaciones, análisis e investigaciones correspondientes a{" "}
                    {title.toLowerCase()}.
                </p>
            </header>

            {infografias.length > 0 && (
                <section style={{ marginBottom: "var(--space-2xl)" }}>
                    <h2
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.1rem",
                            color: "var(--color-text-secondary)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            marginBottom: "var(--space-lg)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <span>📊</span> Infografías
                    </h2>
                    <div className="posts-grid">
                        {infografias.map((inf) => (
                            <article
                                key={inf.slug}
                                className="post-card fade-in-up"
                                onClick={() => navigate(inf.path)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === "Enter" && navigate(inf.path)}
                            >
                                <div
                                    className="post-card-image-placeholder"
                                    style={{ fontSize: "3rem" }}
                                >
                                    {inf.icon}
                                </div>
                                <div className="post-card-body">
                                    <div className="post-card-date">Infografía interactiva</div>
                                    <h3>{inf.title}</h3>
                                    {inf.excerpt && <p>{inf.excerpt}</p>}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {posts.length === 0 && infografias.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <h3>Aún no hay publicaciones</h3>
                    <p>Las asignaciones de este lapso se publicarán próximamente.</p>
                </div>
            )}

            {posts.length > 0 && (
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
