"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GitCommit, Flame, Trophy, Code2 } from "lucide-react";

interface GitHubData {
  totalContributions: number;
  weeks: {
    contributionDays: {
      contributionCount: number;
      date: string;
    }[];
  }[];
}

interface LeetCodeData {
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  ranking?: number;
  streak?: number;
}

function ContributionGraph({ data }: { data: GitHubData | null }) {
  if (!data) {
    return (
      <div className="h-32 flex items-center justify-center text-[var(--color-muted-foreground)] text-sm">
        Loading contribution data...
      </div>
    );
  }

  // Take last 20 weeks for a compact graph
  const recentWeeks = data.weeks.slice(-20);

  const getColor = (count: number) => {
    if (count === 0) return "bg-[var(--color-border)]";
    if (count <= 2) return "bg-[var(--color-primary)]/30";
    if (count <= 5) return "bg-[var(--color-primary)]/50";
    if (count <= 8) return "bg-[var(--color-primary)]/70";
    return "bg-[var(--color-primary)]";
  };

  return (
    <div className="flex gap-1 overflow-hidden">
      {recentWeeks.map((week, weekIdx) => (
        <div key={weekIdx} className="flex flex-col gap-1">
          {week.contributionDays.map((day, dayIdx) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: weekIdx * 0.02 + dayIdx * 0.01,
                duration: 0.3,
              }}
              className={`w-3 h-3 rounded-sm ${getColor(
                day.contributionCount
              )} hover:ring-1 hover:ring-[var(--color-primary)] transition-all cursor-pointer`}
              title={`${day.date}: ${day.contributionCount} contributions`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-6 text-center hover:border-[var(--color-primary)]/20 transition-all duration-300"
    >
      <Icon size={24} className={`mx-auto mb-3 ${color}`} />
      <p className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">
        {value}
      </p>
      <p className="text-xs text-[var(--color-muted-foreground)] mt-1 uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}

export function StatsSection() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [leetcodeData, setLeetcodeData] = useState<LeetCodeData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch GitHub stats
        const ghRes = await fetch("/api/github");
        if (ghRes.ok) {
          const ghData = await ghRes.json();
          setGithubData(ghData);
        }

        // Fetch LeetCode stats
        const lcRes = await fetch("/api/leetcode");
        if (lcRes.ok) {
          const lcData = await lcRes.json();
          setLeetcodeData(lcData);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <section className="section-full noise relative" id="stats">
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[var(--color-success)] rounded-full blur-[160px] opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[var(--color-primary)] text-sm tracking-widest uppercase mb-2 font-[family-name:var(--font-heading)]">
            Chapter Four
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)]">
            Live <span className="gradient-text">Stats</span>
          </h2>
          <p className="text-[var(--color-muted-foreground)] mt-4 max-w-lg">
            Real-time metrics from GitHub and LeetCode, pulled directly from their APIs.
          </p>
        </motion.div>

        {/* GitHub Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 mb-8 glow"
        >
          <div className="flex items-center gap-3 mb-6">
            <GitCommit size={20} className="text-[var(--color-success)]" />
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)]">
              GitHub Contributions
            </h3>
            {githubData && (
              <span className="ml-auto text-sm text-[var(--color-muted-foreground)]">
                {githubData.totalContributions} this year
              </span>
            )}
          </div>
          <ContributionGraph data={githubData} />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={GitCommit}
            label="Contributions"
            value={githubData?.totalContributions ?? "..."}
            color="text-[var(--color-success)]"
            delay={0}
          />
          <StatCard
            icon={Code2}
            label="Problems Solved"
            value={leetcodeData.totalSolved ?? "..."}
            color="text-yellow-400"
            delay={0.1}
          />
          <StatCard
            icon={Flame}
            label="Current Streak"
            value={leetcodeData.streak ?? "..."}
            color="text-orange-400"
            delay={0.2}
          />
          <StatCard
            icon={Trophy}
            label="LeetCode Rank"
            value={
              leetcodeData.ranking
                ? `#${leetcodeData.ranking.toLocaleString()}`
                : "..."
            }
            color="text-[var(--color-primary)]"
            delay={0.3}
          />
        </div>

        {/* LeetCode breakdown */}
        {leetcodeData.totalSolved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 glass rounded-2xl p-6"
          >
            <h4 className="text-sm font-medium text-[var(--color-muted-foreground)] mb-4 uppercase tracking-wider">
              Problem Breakdown
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">
                  {leetcodeData.easySolved}
                </p>
                <p className="text-xs text-[var(--color-muted-foreground)]">
                  Easy
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">
                  {leetcodeData.mediumSolved}
                </p>
                <p className="text-xs text-[var(--color-muted-foreground)]">
                  Medium
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-400">
                  {leetcodeData.hardSolved}
                </p>
                <p className="text-xs text-[var(--color-muted-foreground)]">
                  Hard
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
