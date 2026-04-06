function showSection(sectionId) {
    document.querySelectorAll('.content-sec').forEach(sec => sec.style.display = 'none');
    document.getElementById(sectionId + '-sec').style.display = 'block';
    
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

function calcRatio() {
    const ca = parseFloat(document.getElementById('currAssets').value);
    const cl = parseFloat(document.getElementById('currLiab').value);
    const res = document.getElementById('ratioResult');

    if (ca && cl) {
        const ratio = (ca / cl).toFixed(2);
        let verdict = ratio >= 2 ? "✅ Healthy Liquidity" : "⚠️ Risk of Low Liquidity";
        res.innerHTML = `<h4>Current Ratio: ${ratio}:1</h4><p>Working Notes: CA/CL = ${ca}/${cl}</p><p><b>Verdict:</b> ${verdict}</p>`;
    }
}

function calcTax() {
    const income = parseFloat(document.getElementById('annualIncome').value);
    const res = document.getElementById('taxResult');
    
    // Simple Slab Logic (Example New Regime)
    let tax = 0;
    if (income > 1200000) tax = (income - 1200000) * 0.20 + 90000;
    else if (income > 800000) tax = (income - 800000) * 0.10 + 40000;
    
    res.innerHTML = `<h4>Estimated Tax: ₹${tax.toLocaleString()}</h4><p>Slab: FY 2025-26 New Regime</p>`;
}

let examMode = false;
function toggleExamMode() {
    examMode = !examMode;
    const btn = document.getElementById('examBtn');
    btn.innerText = examMode ? "📖 EXAM MODE ON" : "📖 EXAM MODE OFF";
    btn.style.background = examMode ? "#16a34a" : "#334155";
}// --- Navigation & UI Logic ---
function showSection(sectionId) {
    // Sabhi sections ko hide karo
    document.querySelectorAll('.content-sec').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Sirf selected section dikhao
    const target = document.getElementById(sectionId + '-sec');
    if (target) {
        target.style.display = 'block';
    } else {
        // Agar tool section nahi bana toh home dikhao (Preventing errors)
        document.getElementById('home-sec').style.display = 'block';
    }

    // Navigation highlights update karo
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    // Note: Iske liye event based selection ya menu check lagta hai
}

// --- Ratio Analyzer Logic ---
function calcRatio() {
    const ca = parseFloat(document.getElementById('currAssets').value) || 0;
    const cl = parseFloat(document.getElementById('currLiab').value) || 0;
    const res = document.getElementById('ratioResult');

    if (cl > 0) {
        const ratio = (ca / cl).toFixed(2);
        let verdict = ratio >= 2 ? "✅ Healthy Liquidity" : "⚠️ Risk: Low Liquidity (Ideal 2:1)";
        res.innerHTML = `
            <div class="working-notes">
                <strong>Working Notes:</strong> Current Assets / Current Liabilities = ${ca} / ${cl}
            </div>
            <h4>Result: ${ratio}:1</h4>
            <p>${verdict}</p>
        `;
    } else {
        res.innerHTML = "❌ Please enter valid Current Liabilities.";
    }
}

// --- Income Tax Logic (FY 2025-26 - Simplified) ---
function calcTax() {
    const income = parseFloat(document.getElementById('annualIncome').value) || 0;
    const res = document.getElementById('taxResult');
    let tax = 0;

    // New Regime Slabs (Simplified Example)
    if (income <= 300000) tax = 0;
    else if (income <= 700000) tax = (income - 300000) * 0.05;
    else if (income <= 1000000) tax = (income - 700000) * 0.10 + 20000;
    else if (income <= 1200000) tax = (income - 1000000) * 0.15 + 50000;
    else tax = (income - 1200000) * 0.20 + 80000;

    res.innerHTML = `
        <div class="working-notes">Applying New Tax Regime Slabs...</div>
        <h4>Net Tax Payable: ₹${tax.toLocaleString('en-IN')}</h4>
        <p><small>*Standard deduction and rebate 87A not included in this quick preview.</small></p>
    `;
}

// --- Exam Mode & Dark Mode ---
let examMode = false;
function toggleExamMode() {
    examMode = !examMode;
    const btn = document.getElementById('examBtn');
    const notes = document.querySelectorAll('.working-notes');
    
    btn.innerText = examMode ? "📖 EXAM MODE ON" : "📖 EXAM MODE OFF";
    btn.style.background = examMode ? "#16a34a" : "#334155";
    
    // Exam mode mein working notes hamesha dikhenge
    notes.forEach(note => {
        note.style.display = examMode ? "block" : "none";
        note.style.border = examMode ? "1px dashed #f59e0b" : "none";
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// --- Initial Setup ---
window.onload = () => {
    console.log("FinSmart Pro Engine Loaded.");
};
