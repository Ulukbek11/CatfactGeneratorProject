import './Header.css'

function Header() {
    return (
        <header className="header">
            <div className="header-inner">
                <a href="/" className="logo">
                    <span className="logo-text">catfacts</span>
                    <span className="logo-dot">.</span>
                </a>
                <nav className="header-nav">
                    <span className="nav-tag">v1.0</span>
                    <a
                        href="https://catfact.ninja"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-link"
                    >
                        API ↗
                    </a>
                </nav>
            </div>
        </header>
    )
}

export default Header
