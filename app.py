from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

def student_analyze(cgpa, skill, projects, certifications, internships):
    score =0
    strength=[]
    weakness=[]
    recommendations=[]
    readiness=[]
    return {
        "score": score,
        "readiness": readiness,
        "strength": strength,
        "weakness": weakness,
        "recommendations": recommendations
    }

@app.route("/analyze",methods=["POST"])
def analyze():
    data=request.get_json()

    result = student_analyze(
        data["cgpa"],
        data["skill"],
        data["projects"],
        data["certifications"],
        data["internships"]
    )

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)