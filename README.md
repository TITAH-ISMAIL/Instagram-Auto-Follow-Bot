# 🤖 Instagram Auto-Follow Bot

## 📋 Project Idea

This project is an **automated Instagram bot** that follows accounts based on predefined user interests.  
The program performs the following steps:

1. Fetches suggested profiles from Instagram.
2. Analyzes each suggested profile and compares it with the owner’s interests.
3. Calculates an **interest score** for each profile.
4. Automatically follows profiles with a high interest score.
5. Skips profiles that are not relevant enough.

The goal of this project is to help build a follower base that aligns with the user’s interests intelligently and safely.

---

## 🧠 How Does the Analysis Work?

### ✅ Analysis via **Gemini API**

Instead of using simple, rule-based algorithms, this project leverages **Google Gemini API** to analyze profiles.  
The program sends the suggested profile data (bio, name, content, etc.) to Gemini API, which performs natural language analysis and returns an **interest score** for each profile based on the preferences defined in the `ownerInterests.ts` file.

---

## 🔗 Project Components

- `instagramApi.ts`: Functions for communicating with Instagram (fetching suggestions, sending follow requests).
- `geminiApi.ts`: Interface for interacting with Gemini API and analyzing profiles.
- `ownerInterests.ts`: Contains the account owner’s interests.
- `types.ts`: Defines the data types used in the project.
- `main.ts`: The main logic of the bot.

---

## ⚠️ Notes

- Be cautious of **Instagram’s rate limits** on follow actions to avoid temporary bans.
- Make sure to configure the Gemini API key properly in your development environment.
