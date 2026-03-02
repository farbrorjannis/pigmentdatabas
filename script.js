// script.js
let pigmentsData = [];

// Ladda pigmentdata från JSON-filen
async function loadPigments() {
    try {
        const response = await fetch('pigments.json');
        const data = await response.json();
        pigmentsData = data.pigment;
        console.log('Pigment laddade:', pigmentsData.length);
    } catch (error) {
        console.error('Kunde inte ladda pigment:', error);
        document.getElementById('results').innerHTML = 
            '<p class="hint">❌ Kunde inte ladda pigmentdatabasen. Försök igen senare.</p>';
    }
}

// Sökfunktion
function searchPigments() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        document.getElementById('results').innerHTML = 
            '<p class="hint">⬆️ Skriv in en sökterm ovan ⬆️</p>';
        return;
    }
    
    const results = pigmentsData.filter(pigment => 
        pigment.pigmentKod.toLowerCase().includes(searchTerm) ||
        pigment.vanligtNamn.toLowerCase().includes(searchTerm)
    );
    
    displayResults(results);
}

// Applicera filter
function applyFilters() {
    const colorFamily = document.getElementById('colorFamilyFilter').value;
    const lightfastness = document.getElementById('lightfastnessFilter').value;
    
    let filtered = pigmentsData;
    
    if (colorFamily !== 'alla') {
        filtered = filtered.filter(p => p.fargfamilj === colorFamily);
    }
    
    if (lightfastness !== 'alla') {
        filtered = filtered.filter(p => p.ljusakthet === lightfastness);
    }
    
    displayResults(filtered);
}

// Visa resultat i grid
function displayResults(pigments) {
    const resultsContainer = document.getElementById('results');
    
    if (pigments.length === 0) {
        resultsContainer.innerHTML = '<p class="hint">🔍 Inga pigment hittades. Försök med en annan sökning.</p>';
        return;
    }
    
    let html = '';
    pigments.forEach(p => {
        html += `
            <div class="pigment-card">
                <div class="pigment-color-bar" style="background-color: ${p.hexFarg}"></div>
                <div class="pigment-content">
                    <div class="pigment-header">
                        <span class="pigment-kod">${p.pigmentKod}</span>
                        <span class="pigment-namn">${p.vanligtNamn}</span>
                    </div>
                    
                    <div class="pigment-details">
                        <div class="detail-item">
                            <span class="detail-label">Ljusäkthet:</span>
                            <span class="detail-value">${p.ljusakthet} - ${p.ljusakthetText}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Transparens:</span>
                            <span class="detail-value">${p.transparens}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Färgfamilj:</span>
                            <span class="detail-value">${p.fargfamilj}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Kemisk formel:</span>
                            <span class="detail-value">${p.kemiskFormel || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Oljeabsorption:</span>
                            <span class="detail-value">${p.oljeabsorption || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Hälsofara:</span>
                            <span class="detail-value">${p.hälsofara || 'Ingen information'}</span>
                        </div>
                    </div>
                    
                    <div class="pigment-beskrivning">
                        ${p.beskrivning || ''}
                    </div>
                    
                    <div style="margin-top: 1rem; font-size: 0.9rem; color: #7f8c8d;">
                        <strong>Tillverkare:</strong> ${p.tillverkareNamn}
                    </div>
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
}

// Lyssna på Enter-tangenten i sökfältet
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchPigments();
    }
});

// Ladda pigment när sidan laddas
loadPigments();
