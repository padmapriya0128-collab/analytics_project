from flask import Flask, request, jsonify, render_template
from static.visual_chart import generate_chart
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

def student_analyze(cgpa,skill,projects,certifications,internships):

    score = 0
    strength = []
    weakness = []
    recommendations = []

    # CGPA
    if cgpa >= 8:
        score += 25
        strength.append("Good at Academics")
    elif cgpa >= 7:
        score += 15
        weakness.append("Average at Academics")
    else:
        weakness.append("Not Good at Academics")
        recommendations.append("Improve Academics")

    # Skills
    all_skills = [
        "python", "java", "c++", "html",
        "css", "javascript", "sql",
        "react", "node.js"
    ]

    if skill.lower() in all_skills:
        score += 30
        strength.append("Good Technical Skills")
    else:
        weakness.append("Need to Improve Skills")
        recommendations.append("Learn New Skills")

    # Projects
    if projects >= 5:
        score += 20
        strength.append("Good Technical Projects")
    elif projects >= 3:
        score += 10
        weakness.append("Average Technical Projects")
    else:
        weakness.append("Not Enough Technical Projects")
        recommendations.append("Work on More Technical Projects")

    # Certifications
    if certifications >= 5:
        score += 10
        strength.append("Good Certifications")
    elif certifications >= 3:
        score += 5
        weakness.append("Average Certifications")
    else:
        weakness.append("Need More Certifications")
        recommendations.append("Complete More Certifications")

    # Internships
    if internships >= 3:
        score += 15
        strength.append("Good Internship Experience")
    elif internships >= 1:
        score += 5
        weakness.append("Average Internship Experience")
    else:
        weakness.append("No Internship Experience")
        recommendations.append("Gain Internship Experience")

    # Readiness
    if score >= 80:
        readiness = "Placement Ready"
    elif score >= 60:
        readiness = "Needs Improvement"
    else:
        readiness = "Not Ready"
        recommendations.append("Improve Overall Profile")

    return {
        "score": score,
        "readiness": readiness,
        "strength": strength,
        "weakness": weakness,
        "recommendations": recommendations
    }

@app.route("/analyze",methods=["POST"])
def analyze():
    data = request.get_json()

    result = student_analyze(
        float(data["cgpa"]),
        data["skill"],
        int(data["projects"]),
        int(data["certifications"]),
        int(data["internships"])
    )
    print("Analysis Result:",result)

    chart_path = generate_chart(
        result["score"] * 0.3,   
        result["score"] * 0.3,   
        result["score"] * 0.2,
        result["score"] * 0.1,
        result["score"] * 0.1
    )

    result["chart"] = chart_path

    return jsonify(result)
    
if __name__ == "__main__":
    app.run(debug=True)