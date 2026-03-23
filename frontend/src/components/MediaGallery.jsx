/**
 * Renders a gallery of media attachments for a post.
 * Supports images, uploaded videos, embedded videos (YouTube/Vimeo),
 * PDFs, Word, PowerPoint, Excel, and other documents.
 */

const FILE_TYPE_CONFIG = {
    pdf: { icon: "📕", label: "PDF", color: "#e74c3c" },
    word: { icon: "📘", label: "Word", color: "#2b579a" },
    powerpoint: { icon: "📙", label: "PowerPoint", color: "#d24726" },
    excel: { icon: "📗", label: "Excel", color: "#217346" },
    document: { icon: "📄", label: "Documento", color: "#64748b" },
};

function getFileName(url) {
    if (!url) return "Archivo";
    return decodeURIComponent(url.split("/").pop().split("?")[0]);
}

function MediaGallery({ attachments }) {
    if (!attachments || attachments.length === 0) return null;

    const getEmbedUrl = (url) => {
        if (!url) return null;
        const ytMatch = url.match(
            /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/
        );
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        return url;
    };

    const isDocType = (type) =>
        ["pdf", "word", "powerpoint", "excel", "document"].includes(type);

    return (
        <section className="media-gallery">
            <h2>📎 Archivos Adjuntos</h2>
            <div className="media-gallery-grid">
                {attachments.map((item) => (
                    <div key={item.id} className="media-item fade-in-up">
                        {/* Images */}
                        {item.media_type === "image" && item.file && (
                            <img src={item.file} alt={item.caption || "Imagen adjunta"} loading="lazy" />
                        )}

                        {/* Uploaded videos */}
                        {item.media_type === "video" && item.file && (
                            <video controls preload="metadata">
                                <source src={item.file} />
                                Tu navegador no soporta la etiqueta de video.
                            </video>
                        )}

                        {/* Embedded videos (YouTube/Vimeo) */}
                        {item.media_type === "video" && item.external_url && (
                            <iframe
                                src={getEmbedUrl(item.external_url)}
                                title={item.caption || "Video incrustado"}
                                allowFullScreen
                                loading="lazy"
                            />
                        )}

                        {/* Documents: PDF, Word, PowerPoint, Excel, etc. */}
                        {isDocType(item.media_type) && item.file && (
                            <div className="media-doc-card">
                                <div
                                    className="media-doc-icon"
                                    style={{ backgroundColor: `${FILE_TYPE_CONFIG[item.media_type]?.color || "#64748b"}20` }}
                                >
                                    <span>{FILE_TYPE_CONFIG[item.media_type]?.icon || "📄"}</span>
                                </div>
                                <div className="media-doc-info">
                                    <span className="media-doc-name">{getFileName(item.file)}</span>
                                    <span
                                        className="media-doc-badge"
                                        style={{
                                            backgroundColor: `${FILE_TYPE_CONFIG[item.media_type]?.color || "#64748b"}30`,
                                            color: FILE_TYPE_CONFIG[item.media_type]?.color || "#64748b"
                                        }}
                                    >
                                        {FILE_TYPE_CONFIG[item.media_type]?.label || "Archivo"}
                                    </span>
                                </div>
                                <a
                                    href={item.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="media-doc-download"
                                >
                                    ⬇ Descargar
                                </a>
                            </div>
                        )}

                        {item.caption && (
                            <div className="media-item-caption">{item.caption}</div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MediaGallery;
