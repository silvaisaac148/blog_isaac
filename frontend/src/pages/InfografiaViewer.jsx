import { useNavigate } from "react-router-dom";

/**
 * Renders a full-screen iframe for a static HTML infographic.
 * The HTML file must be placed in /public/infografias/.
 */
function InfografiaViewer({ src, title }) {
    const navigate = useNavigate();

    return (
        <div className="fade-in-up" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-md)",
                    marginBottom: "var(--space-lg)",
                    flexWrap: "wrap",
                }}
            >
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: "var(--color-bg-card)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-secondary)",
                        borderRadius: "var(--radius-md)",
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        transition: "var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-border-active)";
                        e.currentTarget.style.color = "var(--color-text-primary)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-border)";
                        e.currentTarget.style.color = "var(--color-text-secondary)";
                    }}
                >
                    ← Volver
                </button>
                <h2
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.25rem",
                        color: "var(--color-text-primary)",
                        margin: 0,
                    }}
                >
                    {title}
                </h2>
                <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        marginLeft: "auto",
                        background: "transparent",
                        border: "1px solid var(--color-border-active)",
                        color: "var(--color-accent-secondary)",
                        borderRadius: "var(--radius-md)",
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                    }}
                >
                    ↗ Abrir en nueva pestaña
                </a>
            </div>
            <iframe
                src={src}
                title={title}
                style={{
                    width: "100%",
                    flex: 1,
                    minHeight: "80vh",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    background: "#050916",
                }}
            />
        </div>
    );
}

export default InfografiaViewer;
