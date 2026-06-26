fetch("/analyze", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        cgpa: 8.5,
        skill: "python",
        projects: 5,
        communication: 4,
        arrears: 2
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
});