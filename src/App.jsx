import { useEffect } from 'react'
import Header from './components/Header'
import FactCard from './components/FactCard'
import FactHistory from './components/FactHistory'
import { useCatFact } from './hooks/useCatFact'
import catHero from './assets/cat-hero.png'
import './App.css'

function App() {
    const { currentFact, history, loading, error, fetchFact, selectFact } = useCatFact()

    // Keyboard shortcut: spacebar to fetch new fact
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' && e.target === document.body) {
                e.preventDefault()
                fetchFact()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [fetchFact])

    return (
        <div className="app">
            <Header />

            <main className="main-layout">
                <section className="hero-section">
                    <div className="hero-image-wrapper">
                        <img src={catHero} alt="Stylized cat illustration" className="hero-image" />
                    </div>
                    <div className="hero-text">
                        <h2>Random facts about <br /><span className="highlight">our feline friends</span></h2>
                        <p className="hero-subtitle">
                            Hit the button or press <kbd>space</kbd> to discover something new.
                        </p>
                    </div>
                </section>

                <div className="content-grid">
                    <FactCard
                        fact={currentFact}
                        loading={loading}
                        error={error}
                        onNext={fetchFact}
                    />
                    <FactHistory
                        history={history}
                        currentId={currentFact?.id}
                        onSelect={selectFact}
                    />
                </div>
            </main>

            <footer className="site-footer">
                <p>Powered by <a href="https://catfact.ninja" target="_blank" rel="noopener noreferrer">catfact.ninja</a></p>
            </footer>
        </div>
    )
}

export default App
