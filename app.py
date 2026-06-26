from flask import Flask, request, jsonify

app = Flask(__name__)

def student_analyze(cgpa, skill, projects, communication, arrears):

    score = (
        (cgpa * 10) +
        (projects * 5) +
        (communication * 5) -
        (arrears * 10)
    )

    if score >= 80:
        readiness = "High"
    elif score >= 60:
        readiness = "Medium"
    else:
        readiness = "Low"

    strengths = []
    weakness = []

    if cgpa >= 8:
        strengths.append("Good Academic Performance")
    else:
        weakness.append("Improve CGPA")

    if projects >= 4:
        strengths.append("Strong Project Experience")
    else:
        weakness.append("Do More Projects")

    if communication >= 4:
        strengths.append("Good Communication")
    else:
        weakness.append("Improve Communication")

    return {
        "score": score,
        "readiness": readiness,
        "strength": strengths,
        "weakness": weakness
    }

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json

    result = student_analyze(
        data["cgpa"],
        data["skill"],
        data["projects"],
        data["communication"],
        data["arrears"]
    )

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)