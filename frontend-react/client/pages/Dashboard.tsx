import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@/components/CircularProgress";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { StudentData, calculateScore, identifyGaps, generateRecommendations, generatePlacementPrediction, generateRoadmap, ScoreBreakdown, GapAnalysis, Recommendation, RoadmapItem } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { Download, Home, RefreshCw, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [scores, setScores] = useState<ScoreBreakdown | null>(null);
  const [gaps, setGaps] = useState<GapAnalysis[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [prediction, setPrediction] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("studentData");
    if (!data) {
      navigate("/assessment");
      return;
    }

    const parsedData = JSON.parse(data) as StudentData;
    setStudentData(parsedData);

    const scoreData = calculateScore(parsedData);
    setScores(scoreData);
    setGaps(identifyGaps(parsedData, scoreData));
    setRecommendations(generateRecommendations(parsedData, scoreData));
    setPrediction(generatePlacementPrediction(scoreData));
    setRoadmap(generateRoadmap(parsedData, scoreData));
  }, [navigate]);

  if (!studentData || !scores) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-4 animate-pulse"></div>
          <p className="text-xl font-semibold">Loading your analysis...</p>
        </div>
      </div>
    );
  }

  const categoryData = [
    { name: "Academics", value: scores.academics },
    { name: "Tech Skills", value: scores.technicalSkills },
    { name: "Projects", value: scores.projects },
    { name: "Certifications", value: scores.certifications },
    { name: "Coding", value: scores.codingPractice },
    { name: "Internship", value: scores.internships },
    { name: "Soft Skills", value: scores.softSkills },
  ];

  const radarData = [
    { name: "Academics", value: scores.academics },
    { name: "Technical", value: scores.technicalSkills },
    { name: "Projects", value: scores.projects },
    { name: "Certifications", value: scores.certifications },
    { name: "Coding", value: scores.codingPractice },
    { name: "Internships", value: scores.internships },
    { name: "Soft Skills", value: scores.softSkills },
  ];

  const pieData = [
    { name: "Strengths", value: categoryData.filter((c) => c.value >= 15).length },
    { name: "Moderate", value: categoryData.filter((c) => c.value >= 10 && c.value < 15).length },
    { name: "Needs Work", value: categoryData.filter((c) => c.value < 10).length },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {studentData.name}'s Placement Analysis
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {studentData.college} • {studentData.department}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                localStorage.removeItem("studentData");
                navigate("/assessment");
              }}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retake
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white gap-2"
            >
              <Download className="w-4 h-4" />
              PDF Report
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overall Score Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1 flex justify-center">
            <CircularProgress
              percentage={scores.overall}
              title="Overall Readiness Score"
              size={220}
              strokeWidth={10}
            />
          </div>

          {/* Placement Prediction */}
          <div className="md:col-span-2 space-y-6">
            <div
              className={`p-6 rounded-xl border-2 ${
                prediction.level === "high"
                  ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
                  : prediction.level === "medium"
                    ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700"
                    : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    prediction.level === "high"
                      ? "bg-green-200 dark:bg-green-800"
                      : prediction.level === "medium"
                        ? "bg-yellow-200 dark:bg-yellow-800"
                        : "bg-red-200 dark:bg-red-800"
                  }`}
                >
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 capitalize">
                    {prediction.level} Placement Chance
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {prediction.message}
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 bg-gradient-to-r ${
                        prediction.level === "high"
                          ? "from-green-500 to-green-600"
                          : prediction.level === "medium"
                            ? "from-yellow-500 to-yellow-600"
                            : "from-red-500 to-red-600"
                      }`}
                      style={{ width: `${prediction.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-semibold mt-2">
                    {Math.round(prediction.percentage)}% Confidence
                  </p>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Technical Skills", value: studentData.technicalSkills.length },
                { label: "Projects", value: studentData.projectCount },
                { label: "Certifications", value: studentData.certifications.length },
                { label: "CGPA", value: studentData.cgpa.toFixed(2) },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200/20 dark:border-gray-700/20"
                >
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Scores */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200/20 dark:border-gray-700/20 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Category Scores</h2>
          <div className="grid md:grid-cols-7 gap-4">
            {categoryData.map((category) => (
              <div
                key={category.name}
                className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-200/20 dark:border-purple-500/20 text-center"
              >
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                  {category.name}
                </p>
                <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                  {category.value}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  / 25
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Bar Chart */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200/20 dark:border-gray-700/20 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6">Score Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,100,0.1)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: "8px" }} />
                <Bar
                  dataKey="value"
                  fill="url(#barGradient)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200/20 dark:border-gray-700/20 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6">Strength Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200/20 dark:border-gray-700/20 rounded-xl p-8 mb-12">
          <h3 className="text-xl font-bold mb-6">Skill Profile Radar</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(100,100,100,0.1)" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fontSize: 12 }} domain={[0, 25]} />
              <Radar
                name="Your Score"
                dataKey="value"
                stroke="#a855f7"
                fill="#a855f7"
                fillOpacity={0.3}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Gap Analysis */}
        {gaps.length > 0 && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200/20 dark:border-gray-700/20 rounded-xl p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              <h2 className="text-2xl font-bold">Skill Gaps Identified</h2>
            </div>
            <div className="space-y-4">
              {gaps.map((gap, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border-l-4 ${
                    gap.status === "weak"
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold mb-1">{gap.area}</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {gap.suggestion}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        gap.status === "weak"
                          ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
                          : "bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200"
                      }`}
                    >
                      {gap.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200/20 dark:border-gray-700/20 rounded-xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
          </div>
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200/20 dark:border-purple-500/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-lg">{rec.title}</h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      rec.priority === "high"
                        ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
                        : rec.priority === "medium"
                          ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
                          : "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                    }`}
                  >
                    {rec.priority}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {rec.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ⏱️ {rec.duration}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6-Month Roadmap */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200/20 dark:border-gray-700/20 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8">6-Month Improvement Roadmap</h2>
          <div className="space-y-6">
            {roadmap.map((item) => (
              <div key={item.month} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold mb-4">
                    M{item.month}
                  </div>
                  {item.month < 6 && (
                    <div className="w-1 h-12 bg-gradient-to-b from-purple-600 to-blue-600"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h4 className="font-bold text-lg mb-3">Month {item.month}</h4>
                  <div className="space-y-2 mb-4">
                    {item.tasks.map((task, i) => (
                      <div key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
                    <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                      ✓ Milestones: {item.milestones.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <Button
            onClick={() => {
              localStorage.removeItem("studentData");
              navigate("/assessment");
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
}
