import axios from "axios";

/*
In-memory YouTube cache
skill → videos
*/
const youtubeCache = {};


/*
Fetch YouTube tutorials for a skill
*/
export const getYouTubeResources = async (skill) => {

  /* 1️⃣ Return cached results if available */

  if (youtubeCache[skill]) {
    console.log("YouTube cache hit:", skill);
    return youtubeCache[skill];
  }

  try {

    if (!process.env.YOUTUBE_API_KEY) {
      console.warn("YOUTUBE_API_KEY missing — using fallback search");

      const fallback = getFallbackVideos(skill);
      youtubeCache[skill] = fallback;

      return fallback;
    }

    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          q: `${skill} tutorial`,
          part: "snippet",
          maxResults: 3,
          type: "video"
        },
        timeout: 4000
      }
    );

    const videos = res.data.items.map(video => ({
      title: video.snippet.title,
      url: `https://youtube.com/watch?v=${video.id.videoId}`,
      type: "Video"
    }));

    /* 2️⃣ Save in cache */

    youtubeCache[skill] = videos;

    return videos;

  } catch (error) {

    console.warn(
      "YouTube API error:",
      error.response?.data || error.message
    );

    const fallback = getFallbackVideos(skill);

    youtubeCache[skill] = fallback;

    return fallback;

  }

};


/*
Fallback YouTube resources
*/
const getFallbackVideos = (skill) => {

  return [
    {
      title: `${skill} Beginner Tutorial`,
      url: `https://www.youtube.com/results?search_query=${skill}+beginner+tutorial`,
      type: "Video"
    },
    {
      title: `${skill} Crash Course`,
      url: `https://www.youtube.com/results?search_query=${skill}+crash+course`,
      type: "Video"
    },
    {
      title: `Learn ${skill} Full Course`,
      url: `https://www.youtube.com/results?search_query=learn+${skill}+full+course`,
      type: "Video"
    }
  ];

};


/*
Static roadmap.sh links
Expanded to support most frontend/backend skills
*/
export const getRoadmapResources = (skill) => {

  const roadmapLinks = {

    /* Frontend */

    HTML: "https://roadmap.sh/frontend",
    CSS: "https://roadmap.sh/frontend",
    JavaScript: "https://roadmap.sh/javascript",
    React: "https://roadmap.sh/react",
    "Next.js": "https://roadmap.sh/react",
    "State Management": "https://roadmap.sh/react",
    "Responsive Design": "https://roadmap.sh/frontend",
    "Web Performance Optimization": "https://roadmap.sh/frontend",

    /* Backend */

    "Node.js": "https://roadmap.sh/backend",
    Backend: "https://roadmap.sh/backend",
    "REST APIs": "https://roadmap.sh/backend",
    MongoDB: "https://roadmap.sh/backend",
    SQL: "https://roadmap.sh/backend",

    /* DevOps */

    DevOps: "https://roadmap.sh/devops",
    Docker: "https://roadmap.sh/devops",
    Kubernetes: "https://roadmap.sh/devops",

    /* Tools */

    Git: "https://roadmap.sh/git"

  };

  if (!roadmapLinks[skill]) return [];

  return [
    {
      title: `${skill} Roadmap`,
      url: roadmapLinks[skill],
      type: "Roadmap"
    }
  ];

};