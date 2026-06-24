def student_analyze(cgpa, skill, projects, certifications, internships):
    score = 0
    strength = []
    weakness = []
    recommendations = []

    if cgpa >= 8:
        score += 25
        strength.append("good at academics")
        
    elif cgpa >= 7:
        score += 15
        weakness.append("average at academics")
        
    else:
        weakness.append("not good at academics")
        recommendations.append("improve academics")

    
    all_skills = ["python","java","c++","html","css","javascript","sql","react","node.js"]
    if skill.lower() in all_skills:
        score += 30
        strength.append("good at skills")
    else:
        weakness.append("need to improve skills")
        recommendations.append("learn new skills")

    
    if projects >= 5:
        score += 20
        strength.append("good at technical projects")
    elif projects >= 3:
        score += 10
        weakness.append("average at technical projects")
    else:
        weakness.append("not good at technical projects")
        recommendations.append("work on more technical projects")


    if certifications >= 5:
        score += 10
        strength.append("good at certifications")
    elif certifications >= 3:
        score += 5
        weakness.append("average at certifications")
    else:
        weakness.append("not good at certifications")
        recommendations.append("pursue more certifications")


    if internships >= 3:
        score += 15
        strength.append("good at internships performance")
    elif internships >= 1:
        score += 5
        weakness.append("average at internships performance")
    else:
        weakness.append("not good at internships performance")
        recommendations.append("gain more internship experience")


    if score >= 80:
        readiness = "Placement Ready"
    elif score >= 60:
        readiness = "Needs Improvement"
    else:
        readiness = "Not Ready"
        recommendations.append("work on all areas to improve readiness")

    return {
        "score": score,
        "readiness": readiness,
        "strength": strength,
        "weakness": weakness,
        "recommendations": recommendations
    }

if __name__ == "__main__":
    result = student_analyze(8.5, "python", 5, 4, 2)
    print(result)