// main logic for the Instagram auto-follow bot
// This script fetches suggested profiles, analyzes them using the Gemini API,
// import necessary files from local files
import { fetchSuggestedProfiles, sendFollowRequest } from "./instagramApi";
import { analyzeProfiles } from "./geminiApi";
import { SuggestedProfile, GeminiScore } from "./types";
import ownerInterests from "./ownerInterests";

// timeout function to avoid rate limiting
// by Instagram
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("Fetching suggested profiles...");
  const suggested: SuggestedProfile[] = await fetchSuggestedProfiles();

  console.log("Analyzing profiles with Gemini API...");
  const scores: GeminiScore[] = await analyzeProfiles(suggested, ownerInterests);

  let followedCount = 0;
  let skippedCount = 0;

  for (const score of scores) {
    if (score.interest_score >= 90) {
      try {
        await sendFollowRequest(score.username);
        console.log(`Followed @${score.username} (score: ${score.interest_score})`);
        followedCount++;

        // delay between follow requests to avoid rate limiting
        await sleep(3000);

      } catch (err) {
        console.error(`Failed to follow @${score.username}:`, err);
      }
    } else {
      console.log(`Skipping @${score.username} (score: ${score.interest_score})`);
      skippedCount++;
    }
  }

  console.log("Summary:");
  console.log(`Followed: ${followedCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log("Done.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
});
