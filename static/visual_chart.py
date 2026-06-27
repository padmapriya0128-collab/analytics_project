import matplotlib.pyplot as plt
import os

def generate_chart(cgpa_score, skill_score, project_score, certificate_score, internship_score):

    scores = [
        cgpa_score,
        skill_score,
        project_score,
        certificate_score,
        internship_score
    ]

    categories = [
        "CGPA",
        "Skills",
        "Projects",
        "Certificates",
        "Internships"
    ]

    plt.figure(figsize=(6,6))
    plt.pie(scores, labels=categories, autopct="%1.1f%%")
    plt.title("Placement Readiness Analysis")

    image_location = os.path.join(os.getcwd(), "static", "chart.png")
    plt.savefig(image_location)
    plt.close()

    return "/static/chart.png"