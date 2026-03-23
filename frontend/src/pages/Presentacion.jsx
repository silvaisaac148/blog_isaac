/**
 * Presentación page — the landing/home tab.
 * Shows project objective, subproject description, and student profile.
 */
function Presentacion() {
    return (
        <div className="fade-in-up">
            {/* Hero */}
            <section className="hero">
                <span className="hero-badge">Gerencia y Mercadeo</span>
                <h1>Portafolio Universitario</h1>
                <p className="hero-subtitle">
                    Documentación académica de la materia Gerencia y Mercadeo —
                    Ingeniería en Informática. Aquí encontrarás las asignaciones,
                    análisis e investigaciones realizadas durante los 4 lapsos del curso.
                </p>
            </section>

            {/* Info Cards */}
            <section className="info-grid">
                <div className="info-card fade-in-up">
                    <div className="info-card-icon">🎯</div>
                    <h3>Objetivo General del Proyecto</h3>
                    <p>
                        Desarrollar un portafolio digital interactivo que documente de
                        manera organizada y profesional todas las actividades, asignaciones
                        y proyectos realizados en la materia Gerencia y Mercadeo, aplicando
                        competencias tanto de gestión empresarial como de desarrollo de
                        software.
                    </p>
                </div>

                <div className="info-card fade-in-up">
                    <div className="info-card-icon">📋</div>
                    <h3>Presentación del Subproyecto</h3>
                    <p>
                        Este subproyecto consiste en la creación de un blog web
                        full-stack utilizando tecnologías modernas (Django, React,
                        PostgreSQL) como medio para presentar y compartir el contenido
                        académico de cada lapso, incluyendo artículos, infografías,
                        mapas mentales y análisis de casos.
                    </p>
                </div>

                <div className="info-card fade-in-up">
                    <div className="info-card-icon">👨‍💻</div>
                    <h3>Perfil del Estudiante</h3>
                    <p>
                        Futuro Ingeniero en Informática con pasión por el desarrollo
                        web, la arquitectura de software y la integración de
                        tecnologías modernas. Comprometido con el aprendizaje continuo
                        y la excelencia académica en la intersección entre tecnología
                        y gestión empresarial.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Presentacion;
