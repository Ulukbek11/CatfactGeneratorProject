import { useState, useEffect, useCallback } from 'react'

const API_URL = 'https://catfact.ninja/fact'
const STORAGE_KEY = 'catfacts_history'

function loadHistory() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : []
    } catch {
        return []
    }
}

function saveHistory(history) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } catch {
        // storage full or unavailable — silently ignore
    }
}

export function useCatFact() {
    const [history, setHistory] = useState(loadHistory)
    const [currentFact, setCurrentFact] = useState(() => {
        const saved = loadHistory()
        return saved.length > 0 ? saved[0] : null
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchFact = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(API_URL)
            if (!response.ok) throw new Error('Failed to fetch')

            const data = await response.json()
            const newFact = {
                id: Date.now(),
                text: data.fact,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }

            setCurrentFact(newFact)
            setHistory(prev => {
                const updated = [newFact, ...prev].slice(0, 20)
                saveHistory(updated)
                return updated
            })
        } catch (err) {
            setError('Could not fetch a cat fact. Check your connection and try again.')
        } finally {
            setLoading(false)
        }
    }, [])

    const selectFact = useCallback((fact) => {
        setCurrentFact(fact)
    }, [])

    // Fetch initial fact on mount only if no saved history
    useEffect(() => {
        if (history.length === 0) {
            fetchFact()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return { currentFact, history, loading, error, fetchFact, selectFact }
}
