function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>
                © {year} — Blog Portafolio | Gerencia y Mercadeo |{" "}
                <a href="/">Ingeniería en Informática</a>
            </p>
        </footer>
    );
}

export default Footer;
