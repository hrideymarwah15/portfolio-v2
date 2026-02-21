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
      <div className="h-32 flex items-center justify-center text-[var(--color-foreground)] font-[family-name:var(--font-heading)] text-sm bg-black border-2 border-[var(--color-primary)] animate-pulse">
        LOADING DATA...
      </div>
    );
  }

  // Take last 20 weeks for a compact graph
  const recentWeeks = data.weeks.slice(-20);

  const getColor = (count: number) => {
    if (count === 0) return "bg-[#1E293B]";
    if (count <= 2) return "bg-[var(--color-primary)] opacity-40";
    if (count <= 5) return "bg-[var(--color-primary)] opacity-60";
    if (count <= 8) return "bg-[var(--color-primary)] opacity-80";
    return "bg-[var(--color-primary)] shadow-[0_0_5px_var(--color-primary)]";
  };

  return (
    <div className="flex gap-1 overflow-hidden p-4 bg-black border-2 border-[var(--color-primary)]/50">
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
              className={`w-3 h-3 rounded-none ${getColor(
                day.contributionCount
              )} hover:ring-2 hover:ring-[var(--color-accent)] transition-all cursor-pointer`}
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
  borderColor,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  borderColor: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`bg-black border-2 ${borderColor} shadow-[4px_4px_0_0_currentColor] flex flex-col text-center hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200`}
      style={{ color: borderColor.replace('border-', '') }} 
    >
      <div className={`border-b-2 ${borderColor} p-2 bg-black`}>
        <Icon size={20} className={`mx-auto ${color}`} />
      </div>
      <div className="p-4 flex flex-col items-center justify-center flex-grow bg-[#090909]">
        <p className={`text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] ${color}`}>
          {value}
        </p>
        <p className="text-[10px] md:text-xs text-[var(--color-foreground)] mt-2 font-[family-name:var(--font-heading)] uppercase tracking-wider">
          {label}
        </p>
      </div>
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
    <section className="section-full relative bg-[var(--color-background)] border-b-4 border-[var(--color-border)] scanline-effect" id="stats">
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[var(--color-success)] rounded-full blur-[160px] opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[var(--color-primary)] text-sm md:text-base tracking-widest uppercase mb-4 font-[family-name:var(--font-heading)]">
            // MODULE_04
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-foreground)] uppercase">
            &gt; SYS <span className="text-[var(--color-success)] glow">STATS</span>_
          </h2>
          <p className="text-[var(--color-foreground)] mt-6 text-lg max-w-lg font-[family-name:var(--font-body)]">
            Real-time telemetry from external nodes.
          </p>
        </motion.div>

        {/* GitHub Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black border-4 border-[var(--color-primary)] shadow-[8px_8px_0_0_var(--color-primary)] mb-12 flex flex-col"
        >
          {/* Title Bar */}
          <div className="bg-[var(--color-primary)] text-black px-4 py-3 text-xs md:text-sm font-[family-name:var(--font-heading)] flex items-center justify-between border-b-4 border-[var(--color-primary)] uppercase font-bold">
            <div className="flex items-center gap-2">
              <GitCommit size={18} />
              <span>GITHUB_TELEMETRY.EXE</span>
            </div>
            {githubData && (
              <span className="hidden md:inline-block bg-black text-[var(--color-primary)] px-2 py-1 text-[10px]">
                {githubData.totalContributions} COMMITS YTD
              </span>
            )}
          </div>
          
          <div className="p-6 md:p-8 bg-black">
             <ContributionGraph data={githubData} />
             {/* Decorative loading bar underneath */}
             {githubData && (
               <div className="mt-4 flex h-1 w-full bg-[#1E293B]">
                 <div className="h-full bg-[var(--color-primary)] animate-[pulse_2s_ease-in-out_infinite]" style={{ width: '85%' }}></div>
               </div>
             )}
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            icon={GitCommit}
            label="Commits"
            value={githubData?.totalContributions ?? "..."}
            color="text-[var(--color-success)]"
            borderColor="border-[var(--color-success)]"
            delay={0}
          />
          <StatCard
            icon={Code2}
            label="LC Solved"
            value={leetcodeData.totalSolved ?? "..."}
            color="text-yellow-400"
            borderColor="border-yellow-400"
            delay={0.1}
          />
          <StatCard
            icon={Flame}
            label="Streak"
            value={leetcodeData.streak ?? "..."}
            color="text-orange-400"
            borderColor="border-orange-400"
            delay={0.2}
          />
          <StatCard
            icon={Trophy}
            label="LC Rank"
            value={
              leetcodeData.ranking
                ? `#${leetcodeData.ranking.toLocaleString()}`
                : "..."
            }
            color="text-[var(--color-primary)]"
            borderColor="border-[var(--color-primary)]"
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
            className="mt-12 bg-black border-4 border-yellow-400 shadow-[8px_8px_0_0_#facc15] flex flex-col"
          >
            <div className="bg-yellow-400 text-black px-4 py-2 text-xs md:text-sm font-[family-name:var(--font-heading)] font-bold uppercase border-b-4 border-yellow-400">
               PROBLEM_DIFFICULTY_MATRIX
            </div>
            <div className="p-6 grid grid-cols-3 divide-x-2 divide-yellow-400/30">
              <div className="text-center px-4">
                <p className="text-3xl font-bold text-[var(--color-success)] font-[family-name:var(--font-heading)] mb-2">
                  {leetcodeData.easySolved}
                </p>
                <p className="text-[10px] md:text-xs text-[var(--color-foreground)] font-[family-name:var(--font-body)] uppercase bg-[#090909] py-1 border border-[var(--color-success)]">
                  EASY
                </p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-bold text-yellow-400 font-[family-name:var(--font-heading)] mb-2">
                  {leetcodeData.mediumSolved}
                </p>
                <p className="text-[10px] md:text-xs text-[var(--color-foreground)] font-[family-name:var(--font-body)] uppercase bg-[#090909] py-1 border border-yellow-400">
                  MEDIUM
                </p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-bold text-[var(--color-destructive)] font-[family-name:var(--font-heading)] mb-2">
                  {leetcodeData.hardSolved}
                </p>
                <p className="text-[10px] md:text-xs text-[var(--color-foreground)] font-[family-name:var(--font-body)] uppercase bg-[#090909] py-1 border border-[var(--color-destructive)]">
                  HARD
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
