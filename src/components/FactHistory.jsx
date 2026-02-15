import './FactHistory.css'

function FactHistory({ history, currentId, onSelect }) {
    if (history.length === 0) return null

    return (
        <aside className="fact-history">
            <div className="history-header">
                <h3>History</h3>
                <span className="history-count">{history.length}</span>
            </div>

            <ul className="history-list">
                {history.map((fact, index) => (
                    <li key={fact.id}>
                        <button
                            className={`history-item ${fact.id === currentId ? 'is-active' : ''}`}
                            onClick={() => onSelect(fact)}
                        >
                            <span className="history-index">#{String(index + 1).padStart(2, '0')}</span>
                            <span className="history-text">{fact.text}</span>
                            <span className="history-time">{fact.timestamp}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default FactHistory
