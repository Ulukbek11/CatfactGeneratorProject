import './FactCard.css'

function FactCard({ fact, loading, error, onNext }) {
    return (
        <div className="fact-card">
            <div className="fact-card-label">
                <span className="label-dot" />
                <span>{loading ? 'Fetching…' : 'Current Fact'}</span>
            </div>

            <div className={`fact-body ${loading ? 'is-loading' : ''}`}>
                {error ? (
                    <p className="fact-error">{error}</p>
                ) : (
                    <blockquote className="fact-quote">
                        <p>{fact?.text || 'Loading your first cat fact…'}</p>
                    </blockquote>
                )}
            </div>

            {fact && !loading && !error && (
                <div className="fact-meta">
                    <span className="fact-length">{fact.text.length} characters</span>
                    <span className="fact-time">{fact.timestamp}</span>
                </div>
            )}

            <button
                className="next-btn"
                onClick={onNext}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="spinner" />
                        Fetching…
                    </>
                ) : (
                    'Next fact →'
                )}
            </button>
        </div>
    )
}

export default FactCard
