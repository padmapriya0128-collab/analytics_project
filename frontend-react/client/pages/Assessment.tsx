import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { StudentData } from "@/lib/scoring";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const SKILLS = [
  "Java",
  "Python",
  "C++",
  "JavaScript",
  "React",
  "SQL",
  "DSA",
  "AI/ML",
  "Web Development",
  "Mobile Development",
];

const CERTIFICATIONS = [
  "AWS Solutions Architect",
  "Google Cloud Professional",
  "Microsoft Azure",
  "AWS Developer",
  "Certified Kubernetes Administrator",
  "Java Certification",
];

export default function Assessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<StudentData>({
    name: "",
    college: "",
    department: "",
    year: "4th Year",
    cgpa: 0,
    technicalSkills: [],
    projectCount: 0,
    certifications: [],
    internshipExperience: "No",
    leetcodeStats: "",
    hackerrankStats: "",
    githubProfile: "",
    communicationSkills: 5,
    leadershipSkills: 5,
    teamworkSkills: 5,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "cgpa" || name === "projectCount" ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      technicalSkills: prev.technicalSkills.includes(skill)
        ? prev.technicalSkills.filter((s) => s !== skill)
        : [...prev.technicalSkills, skill],
    }));
  };

  const toggleCertification = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert],
    }));
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    localStorage.setItem("studentData", JSON.stringify(formData));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Placement Readiness Assessment
          </h1>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    num <= step
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {num < step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    num
                  )}
                </div>
                <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                  {["Basic", "Skills", "Projects", "Profiles", "Soft Skills"][num - 1]}
                </p>
              </div>
            ))}
          </div>
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200/20 dark:border-gray-700/20 rounded-xl p-8 min-h-96">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold">Basic Information</h2>

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="college">College</Label>
                <Input
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  placeholder="Your college name"
                  className="mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="CSE, ECE, etc."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="year">Year</Label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={(e) => handleSelectChange("year", e.target.value)}
                    className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="cgpa">CGPA (0-10)</Label>
                <Input
                  id="cgpa"
                  name="cgpa"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={handleInputChange}
                  placeholder="3.5"
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {/* Step 2: Technical Skills */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold">Technical Skills</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select all the technical skills you're proficient in
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {SKILLS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.technicalSkills.includes(skill)
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                        : "border-gray-300 dark:border-gray-600 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={formData.technicalSkills.includes(skill)}
                        onChange={() => {}}
                      />
                      <span className="font-medium">{skill}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Projects & Certs */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold">Projects & Certifications</h2>

              <div>
                <Label htmlFor="projectCount">Number of Projects Completed</Label>
                <Input
                  id="projectCount"
                  name="projectCount"
                  type="number"
                  min="0"
                  value={formData.projectCount}
                  onChange={handleInputChange}
                  placeholder="3"
                  className="mt-2"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Count significant projects you've completed
                </p>
              </div>

              <div>
                <Label>Certifications</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Select all certifications you have
                </p>
                <div className="space-y-2">
                  {CERTIFICATIONS.map((cert) => (
                    <button
                      key={cert}
                      onClick={() => toggleCertification(cert)}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        formData.certifications.includes(cert)
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                          : "border-gray-300 dark:border-gray-600 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={formData.certifications.includes(cert)}
                          onChange={() => {}}
                        />
                        <span className="font-medium">{cert}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Coding Profiles */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold">Coding Profiles</h2>

              <div>
                <Label htmlFor="leetcode">LeetCode Profile</Label>
                <Input
                  id="leetcode"
                  name="leetcodeStats"
                  value={formData.leetcodeStats}
                  onChange={handleInputChange}
                  placeholder="Your LeetCode username or stats (e.g., 150 problems)"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="hackerrank">HackerRank Profile</Label>
                <Input
                  id="hackerrank"
                  name="hackerrankStats"
                  value={formData.hackerrankStats}
                  onChange={handleInputChange}
                  placeholder="Your HackerRank username or stats"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="github">GitHub Profile</Label>
                <Input
                  id="github"
                  name="githubProfile"
                  value={formData.githubProfile}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Internship Experience</Label>
                <select
                  name="internshipExperience"
                  value={formData.internshipExperience}
                  onChange={(e) =>
                    handleSelectChange("internshipExperience", e.target.value)
                  }
                  className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                >
                  <option>No</option>
                  <option>1 Internship</option>
                  <option>2 Internships</option>
                  <option>3+ Internships</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 5: Soft Skills */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold">Soft Skills Assessment</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Rate yourself on a scale of 1-10
              </p>

              {[
                {
                  name: "communicationSkills",
                  label: "Communication Skills",
                  desc: "Ability to express ideas clearly",
                },
                {
                  name: "leadershipSkills",
                  label: "Leadership Skills",
                  desc: "Ability to guide and motivate",
                },
                {
                  name: "teamworkSkills",
                  label: "Teamwork Skills",
                  desc: "Ability to collaborate effectively",
                },
              ].map(({ name, label, desc }) => (
                <div key={name}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Label>{label}</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {desc}
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">
                      {formData[name as keyof typeof formData]}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData[name as keyof typeof formData]}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        [name]: parseInt(e.target.value),
                      }));
                    }}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrev}
            disabled={step === 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {step === 5 ? (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Complete Assessment
              <CheckCircle className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
