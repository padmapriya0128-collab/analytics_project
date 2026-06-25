export interface StudentData {
  name: string;
  college: string;
  department: string;
  year: string;
  cgpa: number;
  technicalSkills: string[];
  projectCount: number;
  certifications: string[];
  internshipExperience: string;
  leetcodeStats: string;
  hackerrankStats: string;
  githubProfile: string;
  communicationSkills: number;
  leadershipSkills: number;
  teamworkSkills: number;
  resumeUrl?: string;
}

export interface ScoreBreakdown {
  academics: number;
  technicalSkills: number;
  projects: number;
  certifications: number;
  codingPractice: number;
  internships: number;
  softSkills: number;
  overall: number;
}

export interface GapAnalysis {
  area: string;
  status: "strong" | "weak" | "moderate";
  suggestion: string;
}

export interface Recommendation {
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  duration: string;
}

export interface PlacementPrediction {
  level: "high" | "medium" | "low";
  percentage: number;
  message: string;
}

export interface RoadmapItem {
  month: number;
  tasks: string[];
  milestones: string[];
}

export function calculateScore(data: StudentData): ScoreBreakdown {
  const academicsScore = Math.min(data.cgpa * 16.67, 20);
  
  const technicalScore = Math.min(data.technicalSkills.length * 3, 25);
  
  const projectsScore = Math.min(data.projectCount * 5, 15);
  
  const certificationsScore = Math.min(data.certifications.length * 3.33, 10);
  
  let codingScore = 0;
  if (data.leetcodeStats) codingScore += 5;
  if (data.hackerrankStats) codingScore += 5;
  if (data.githubProfile) codingScore += 5;
  codingScore = Math.min(codingScore, 15);
  
  const internshipScore = data.internshipExperience ? 10 : 0;
  
  const softSkillsScore = 
    (data.communicationSkills / 10) * 1.67 +
    (data.leadershipSkills / 10) * 1.67 +
    (data.teamworkSkills / 10) * 1.67;
  
  const overall = 
    academicsScore +
    technicalScore +
    projectsScore +
    certificationsScore +
    codingScore +
    internshipScore +
    softSkillsScore;

  return {
    academics: Math.round(academicsScore),
    technicalSkills: Math.round(technicalScore),
    projects: Math.round(projectsScore),
    certifications: Math.round(certificationsScore),
    codingPractice: Math.round(codingScore),
    internships: Math.round(internshipScore),
    softSkills: Math.round(softSkillsScore),
    overall: Math.round(overall),
  };
}

export function identifyGaps(data: StudentData, scores: ScoreBreakdown): GapAnalysis[] {
  const gaps: GapAnalysis[] = [];

  if (data.cgpa < 7.5) {
    gaps.push({
      area: "CGPA",
      status: "weak",
      suggestion: "Focus on improving your academic performance to meet placement criteria",
    });
  }

  const dsaSkills = data.technicalSkills.filter(s => 
    s.toLowerCase().includes("dsa") || 
    s.toLowerCase().includes("algorithm") ||
    s.toLowerCase().includes("data structure")
  );
  if (dsaSkills.length === 0) {
    gaps.push({
      area: "Data Structures & Algorithms",
      status: "weak",
      suggestion: "DSA is critical for placement. Start with fundamentals.",
    });
  }

  if (data.projectCount === 0) {
    gaps.push({
      area: "Projects",
      status: "weak",
      suggestion: "Build at least 2-3 significant projects for your portfolio",
    });
  } else if (data.projectCount < 3) {
    gaps.push({
      area: "Projects",
      status: "moderate",
      suggestion: "Aim for 3+ projects to strengthen your portfolio",
    });
  }

  if (!data.internshipExperience || data.internshipExperience === "No") {
    gaps.push({
      area: "Internship Experience",
      status: "weak",
      suggestion: "Internship experience significantly boosts placement chances",
    });
  }

  if (!data.githubProfile) {
    gaps.push({
      area: "GitHub Profile",
      status: "moderate",
      suggestion: "Create and maintain an active GitHub profile",
    });
  }

  if (data.communicationSkills < 6) {
    gaps.push({
      area: "Communication Skills",
      status: "weak",
      suggestion: "Practice communication through mock interviews and presentations",
    });
  }

  if (data.certifications.length === 0) {
    gaps.push({
      area: "Certifications",
      status: "moderate",
      suggestion: "Earn relevant certifications to boost credibility",
    });
  }

  return gaps;
}

export function generateRecommendations(data: StudentData, scores: ScoreBreakdown): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (scores.codingPractice < 10) {
    recommendations.push({
      priority: "high",
      title: "Master Data Structures & Algorithms",
      description: "Solve at least 200 DSA problems on LeetCode/HackerRank. Focus on arrays, strings, trees, and graphs.",
      duration: "3-4 months",
    });
  }

  if (scores.projects < 10) {
    recommendations.push({
      priority: "high",
      title: "Build Full Stack Projects",
      description: "Create 2-3 projects using React, Node.js, and databases. Deploy on GitHub and showcase",
      duration: "2-3 months",
    });
  }

  if (scores.internships === 0) {
    recommendations.push({
      priority: "high",
      title: "Apply for Internships",
      description: "Target 1-2 internships in your final year. Start applying 3-4 months in advance",
      duration: "Ongoing",
    });
  }

  if (scores.academicsScore < 14) {
    recommendations.push({
      priority: "high",
      title: "Improve CGPA",
      description: "Focus on coursework and maintain a minimum 7.5+ CGPA for better placements",
      duration: "Ongoing",
    });
  }

  if (scores.certifications < 5) {
    recommendations.push({
      priority: "medium",
      title: "Earn Industry Certifications",
      description: "Get AWS, Google Cloud, or specialized certifications relevant to your domain",
      duration: "1-2 months",
    });
  }

  recommendations.push({
    priority: "medium",
    title: "Optimize Your Resume",
    description: "Update resume with projects, achievements, and tailored descriptions for each role",
    duration: "1-2 weeks",
  });

  if (data.communicationSkills < 7) {
    recommendations.push({
      priority: "high",
      title: "Practice Mock Interviews",
      description: "Participate in mock interviews to improve communication and confidence",
      duration: "2-3 months",
    });
  }

  recommendations.push({
    priority: "medium",
    title: "Participate in Hackathons",
    description: "Join hackathons to build projects quickly and network with companies",
    duration: "Ongoing",
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

export function generatePlacementPrediction(scores: ScoreBreakdown): PlacementPrediction {
  const score = scores.overall;

  if (score >= 80) {
    return {
      level: "high",
      percentage: Math.min(95, 70 + (score - 80) / 2),
      message: "Excellent preparation! You have a strong chance of placement in top companies.",
    };
  } else if (score >= 60) {
    return {
      level: "medium",
      percentage: Math.min(75, 50 + (score - 60) / 4),
      message: "Good progress! Focus on the recommendations to increase your placement chances.",
    };
  } else {
    return {
      level: "low",
      percentage: Math.max(20, (score / 60) * 40),
      message: "Work on the identified gaps. Follow the recommendations to improve significantly.",
    };
  }
}

export function generateRoadmap(data: StudentData, scores: ScoreBreakdown): RoadmapItem[] {
  const roadmap: RoadmapItem[] = [
    {
      month: 1,
      tasks: [
        "Start DSA preparation - Complete basic data structures",
        "Set up GitHub profile and upload existing projects",
        "Analyze job descriptions and identify required skills",
      ],
      milestones: ["GitHub profile ready", "50 DSA problems solved"],
    },
    {
      month: 2,
      tasks: [
        "Continue DSA practice - 50-70 problems",
        "Start first full-stack project",
        "Improve resume and create portfolio website",
      ],
      milestones: ["100 DSA problems solved", "Project 1 started"],
    },
    {
      month: 3,
      tasks: [
        "Advance DSA - Complex problems and interviews",
        "Complete first project and deploy",
        "Apply for internships if eligible",
      ],
      milestones: ["Project 1 deployed", "Internship applications sent"],
    },
    {
      month: 4,
      tasks: [
        "Earn certifications (AWS/GCP/Azure)",
        "Start second project",
        "Practice mock interviews",
      ],
      milestones: ["Certification earned", "Project 2 started"],
    },
    {
      month: 5,
      tasks: [
        "Complete second project with advanced features",
        "Participate in hackathons",
        "Network with professionals on LinkedIn",
      ],
      milestones: ["Project 2 completed", "Hackathon participation"],
    },
    {
      month: 6,
      tasks: [
        "Final resume polish and optimization",
        "Intensive mock interview practice",
        "Apply to placement drives with confidence",
      ],
      milestones: ["Resume finalized", "Placement ready"],
    },
  ];

  return roadmap;
}
