import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  BarChart3,
  Zap,
  TrendingUp,
  Award,
  ArrowRight,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Index() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PlacementAI
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Placement Readiness Analyzer
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Discover your strengths, identify skill gaps, and improve your chances of placement success.
              </p>
            </div>

            <Link to="/assessment">
              <Button className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Start Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl rounded-full"></div>
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-purple-400/20 to-blue-400/20 backdrop-blur-sm border border-white/20 p-8 flex flex-col items-center justify-center gap-6">
              <div className="text-center space-y-4">
                <BarChart3 className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto" />
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Complete Analysis & Insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Key Features
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Comprehensive tools to assess and improve your placement readiness
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Profile Analysis",
                desc: "Deep dive into your academic and skill profile",
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Readiness Scoring",
                desc: "Get an accurate placement readiness score",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Skill Gap Detection",
                desc: "Identify missing skills for your target roles",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Smart Recommendations",
                desc: "Personalized improvement roadmap",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur border border-gray-200/20 dark:border-gray-700/20 hover:border-purple-400/50 dark:hover:border-purple-400/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all">
                  <span className="text-purple-600 dark:text-purple-400">
                    {feature.icon}
                  </span>
                </div>
                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Impact & Results
          </h3>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Students Analyzed", value: 5000, suffix: "+" },
              { label: "Success Rate", value: 87, suffix: "%" },
              { label: "Avg Score Improvement", value: 28, suffix: "%" },
              { label: "Companies Partnered", value: 150, suffix: "+" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 border border-purple-200/20 dark:border-purple-500/20 hover:border-purple-400/50 transition-all"
              >
                <p className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text mb-2">
                  <AnimatedCounter
                    from={0}
                    to={stat.value}
                    duration={2500}
                    delay={300 + i * 100}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 dark:from-purple-600/20 dark:via-blue-600/20 dark:to-cyan-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-4">Ready to Boost Your Placement?</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Take the assessment now and get personalized recommendations to achieve your placement goals.
          </p>
          <Link to="/assessment">
            <Button className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Begin Your Assessment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur border-t border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">PlacementAI</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your intelligent companion for placement success.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Assessment</li>
                <li>Analytics</li>
                <li>Recommendations</li>
                <li>Roadmap</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Blog</li>
                <li>Guide</li>
                <li>FAQ</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Cookies</li>
                <li>License</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200/20 dark:border-gray-700/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 PlacementAI. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-purple-600 transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-purple-600 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-purple-600 transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
