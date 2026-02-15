const factText = document.getElementById('fact-text');
        const generateBtn = document.getElementById('generate-btn');

        async function getNewFact() {
            // Disable button and show loading state
            generateBtn.disabled = true;
            factText.className = 'loading';
            factText.textContent = 'Fetching a cat fact...';

            try {
                const response = await fetch('https://catfact.ninja/fact');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch cat fact');
                }

                const data = await response.json();
                
                // Display the fact
                factText.className = '';
                factText.textContent = data.fact;
                
            } catch (error) {
                factText.className = 'error';
                factText.textContent = 'Oops! Could not fetch a cat fact. Please try again.';
                console.error('Error:', error);
            } finally {
                // Re-enable button
                generateBtn.disabled = false;
            }
        }

        // Optional: Load a fact when page loads
        window.addEventListener('load', getNewFact);