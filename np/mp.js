function findShortestPath() {
    const start = document.getElementById('start').value;
    const target = document.getElementById('target').value;
    const resultDiv = document.getElementById('result');

    // Simulated response from backend (C++ program or server)
    const simulatedPaths = {
        "0-5": "0 → 1 → 3 → 4 → 5",
        "0-3": "0 → 1 → 3"
    };

    const key = `${start}-${target}`;
    const path = simulatedPaths[key] || "Path not found or invalid input";

    // Display result
    resultDiv.innerHTML = `<strong>Shortest Path:</strong> ${path}`;
}
