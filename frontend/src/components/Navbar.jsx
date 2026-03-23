import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
    { to: "/", label: "Presentación" },
    { to: "/lapso-1", label: "Lapso 1" },
    { to: "/lapso-2", label: "Lapso 2" },
    { to: "/lapso-3", label: "Lapso 3" },
    { to: "/lapso-4", label: "Lapso 4" },
];

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar" role="navigation" aria-label="Navegación principal">
            <div className="navbar-inner">
                <NavLink to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
                    📘 Portafolio G&M
                </NavLink>

                <button
                    className="navbar-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Abrir menú"
                    aria-expanded={isOpen}
                >
                    {isOpen ? "✕" : "☰"}
                </button>

                <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.to === "/"}
                                className={({ isActive }) => (isActive ? "active" : "")}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
