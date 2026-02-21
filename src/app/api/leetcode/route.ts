import { NextResponse } from "next/server";

export async function GET() {
  const username = "hrideymarwah15";

  try {
    // Fetch user profile
    const profileRes = await fetch(
      `https://alfa-leetcode-api.onrender.com/${username}`,
      { next: { revalidate: 3600 } }
    );

    // Fetch solved stats
    const solvedRes = await fetch(
      `https://alfa-leetcode-api.onrender.com/${username}/solved`,
      { next: { revalidate: 3600 } }
    );

    if (!profileRes.ok && !solvedRes.ok) {
      // Fallback: try alternative API
      const fallbackRes = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${username}`,
        { next: { revalidate: 3600 } }
      );

      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        return NextResponse.json({
          totalSolved: fallbackData.totalSolved || 0,
          easySolved: fallbackData.easySolved || 0,
          mediumSolved: fallbackData.mediumSolved || 0,
          hardSolved: fallbackData.hardSolved || 0,
          ranking: fallbackData.ranking || 0,
          streak: 0,
        });
      }

      return NextResponse.json(
        { error: "All LeetCode APIs unavailable" },
        { status: 503 }
      );
    }

    const profileData = profileRes.ok ? await profileRes.json() : {};
    const solvedData = solvedRes.ok ? await solvedRes.json() : {};

    return NextResponse.json({
      totalSolved: solvedData.solvedProblem || 0,
      easySolved: solvedData.easySolved || 0,
      mediumSolved: solvedData.mediumSolved || 0,
      hardSolved: solvedData.hardSolved || 0,
      ranking: profileData.ranking || 0,
      streak: 0, // Streak requires calendar parsing
    });
  } catch (error) {
    console.error("LeetCode API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
