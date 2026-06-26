function analyze() {

    fetch("/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cgpa: parseFloat(document.getElementById("cgpa").value),
            skill: document.getElementById("skill").value,
            projects: parseInt(document.getElementById("projects").value),
            certifications: parseInt(document.getElementById("certifications").value),
            internships: parseInt(document.getElementById("internships").value)
        })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("result").innerHTML =
        `
        <h3>Score: ${data.score}</h3>
        <h3>Readiness: ${data.readiness}</h3>
        <p>Strengths: ${data.strength.join(", ")}</p>
        <p>Weakness: ${data.weakness.join(", ")}</p>
        <p>Recommendations: ${data.recommendations.join(", ")}</p>
        `;
    });

}