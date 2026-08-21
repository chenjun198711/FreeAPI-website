export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  views: number;
  category: string;
  summary: string;
  tags: string[];
  featured: boolean;
  externalUrl?: string;
  internal?: boolean;
}

export interface BlogCategory {
  name: string;
  count: number;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "top-free-ai-tools-academic-research",
    title: "Top 7 Free AI Tools for Academic Research and Paper Discovery",
    date: "Mar 24, 2026",
    readTime: "7 min",
    views: 1890,
    category: "Academic Research",
    summary:
      "Discover the best free AI tools that help researchers find, analyze, and understand academic papers faster. From semantic search to paper summarization, these tools are transforming how research gets done.",
    tags: ["AI tools", "academic research", "paper discovery"],
    featured: true,
    externalUrl: "https://freeapihub.com/blog/top-free-ai-tools-academic-research-paper-discovery",
  },
  {
    slug: "top-ai-video-editing-tools-compared",
    title: "Top AI Video Editing Tools Compared for Faster Content Creation",
    date: "Apr 27, 2026",
    readTime: "8 min",
    views: 1560,
    category: "Video Editing",
    summary:
      "A comprehensive comparison of AI-powered video editing tools. See which tool delivers the best results for automated editing, caption generation, and effects — all without breaking the bank.",
    tags: ["AI tools", "video editing", "content creation"],
    featured: true,
    externalUrl: "https://freeapihub.com/blog/top-ai-video-editing-tools-compared",
  },
  {
    slug: "detectron2-tutorial-api-object-detection",
    title: "Detectron2 Tutorial API: Free Object Detection in Python",
    date: "May 14, 2026",
    readTime: "14 min",
    views: 46,
    category: "AI APIs",
    summary:
      "A practical Detectron2 tutorial API guide for object detection. Covers a free hosted endpoint, bounding boxes, instance segmentation, full Python and JavaScript code, plus real error handling.",
    tags: ["detectron2 tutorial", "free object detection api"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/detectron2-tutorial-api-object-detection",
  },
  {
    slug: "starcoder2-api-tutorial-free-ai-code-generation",
    title: "StarCoder2 API Tutorial: Free AI Code Generation in Python & JS",
    date: "May 13, 2026",
    readTime: "14 min",
    views: 45,
    category: "AI APIs",
    summary:
      "Learn to use StarCoder2 via a free Hugging Face Inference API. Covers setup, prompt engineering, error handling, and complete code examples in Python and JavaScript.",
    tags: ["starcoder2 api", "free ai code generation"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/starcoder2-api-tutorial-free-ai-code-generation",
  },
  {
    slug: "musicgen-api-tutorial-python",
    title: "MusicGen API Tutorial: Generate Free AI Music with Python",
    date: "May 12, 2026",
    readTime: "13 min",
    views: 68,
    category: "API Development",
    summary:
      "A practical MusicGen API tutorial showing how to generate AI music for free using Python and JavaScript. Includes prompt tips, error handling, and sample output.",
    tags: ["musicgen api", "free ai music generation"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/musicgen-api-tutorial-python",
  },
  {
    slug: "google-cloud-vision-api-tutorial",
    title: "Google Cloud Vision API Tutorial: Build an Image Recognition App",
    date: "May 11, 2026",
    readTime: "16 min",
    views: 55,
    category: "Media APIs",
    summary:
      "Learn to build an image recognition app using Google Cloud Vision's free tier. Covers label detection, text extraction, and face detection with Python and JavaScript.",
    tags: ["google cloud vision", "free image recognition api"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/google-cloud-vision-api-tutorial",
  },
  {
    slug: "hugging-face-api-tutorial-free-ai-models",
    title: "Hugging Face API Tutorial: Run Free AI Models in Python",
    date: "May 10, 2026",
    readTime: "14 min",
    views: 39,
    category: "AI APIs",
    summary:
      "A hands-on Hugging Face API tutorial showing how to run free AI models for text generation, sentiment analysis, and summarization with working code examples.",
    tags: ["hugging face api", "free ai model api"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/hugging-face-api-tutorial-free-ai-models",
  },
  {
    slug: "unsplash-api-tutorial-python-javascript",
    title: "Unsplash API Tutorial: Fetch Free Royalty-Free Images in Python and JavaScript",
    date: "May 10, 2026",
    readTime: "14 min",
    views: 39,
    category: "Media APIs",
    summary:
      "Step-by-step Unsplash API tutorial to integrate over 3 million royalty-free images into your apps. Covers authentication, searching, random photos, and proper attribution.",
    tags: ["unsplash api", "free image api"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/unsplash-api-tutorial-python-javascript",
  },
  {
    slug: "free-news-api-tutorial-headlines-dashboard",
    title: "Free News API Tutorial: Build a Live Headlines Dashboard",
    date: "May 10, 2026",
    readTime: "14 min",
    views: 57,
    category: "API Development",
    summary:
      "Uses the Hacker News Algolia API (no key needed) to fetch live headlines in Python and JavaScript. Build a working news dashboard from scratch.",
    tags: ["free news api", "news dashboard javascript"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/free-news-api-tutorial-headlines-dashboard",
  },
  {
    slug: "countries-now-api-tutorial",
    title: "Build a Country Info Explorer Using the Countries Now API",
    date: "May 10, 2026",
    readTime: "11 min",
    views: 60,
    category: "API Development",
    summary:
      "Learn how to build a country info explorer in Python using the Countries Now API. Beginner-friendly tutorial covering capitals, population data, and currency info.",
    tags: ["countries now api", "free country data api"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/countries-now-api-tutorial-country-info-explorer",
  },
  {
    slug: "free-currency-api-tutorial-python",
    title: "How to Fetch Currency Exchange Rates with a Free API (Python Tutorial)",
    date: "May 9, 2026",
    readTime: "11 min",
    views: 110,
    category: "API Development",
    summary:
      "Uses the free Frankfurter API (no key required) with working code, error handling, and real-world use cases for currency conversion.",
    tags: ["free currency api", "exchange rate api python"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/free-currency-api-tutorial-python-exchange-rates",
  },
  {
    slug: "free-dictionary-api-tutorial-word-lookup",
    title: "Free Dictionary API Tutorial: Build a Word Lookup Tool in Python",
    date: "May 8, 2026",
    readTime: "9 min",
    views: 148,
    category: "Software Development",
    summary:
      "Learn how to build a working word lookup tool using the free Dictionary API. No API key needed — just clean, working Python code.",
    tags: ["free dictionary api", "word definition api"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/free-dictionary-api-tutorial-word-lookup-tool",
  },
  {
    slug: "build-random-quotes-generator-free-api",
    title: "Build a Random Quotes Generator App Using a Free Quotes API",
    date: "May 8, 2026",
    readTime: "11 min",
    views: 134,
    category: "API Development",
    summary:
      "Covers API calls, JSON parsing, error handling, and real-world use cases — no API key required. Build a working quotes app from scratch.",
    tags: ["free quotes api", "random quote generator"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/build-random-quotes-generator-app-free-api",
  },
  {
    slug: "free-weather-api-python-tutorial",
    title: "How to Use a Free Weather API in Python for Beginners",
    date: "May 8, 2026",
    readTime: "10 min",
    views: 110,
    category: "API Development",
    summary:
      "Uses the Open-Meteo API — no API key, no signup, just clean working code. Perfect beginner tutorial for working with weather data in Python.",
    tags: ["free weather api", "open-meteo api python"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/free-weather-api-python-tutorial-beginners",
  },
  {
    slug: "why-developers-use-ai-coding-tools-wrong",
    title: "Why Most Devs Use AI Coding Tools Wrong: Build Better Software",
    date: "Mar 24, 2026",
    readTime: "10 min",
    views: 820,
    category: "Software Development",
    summary:
      "Most developers underutilize AI coding tools. Learn the right strategies to maximize productivity, avoid common pitfalls, and build better software with AI assistance.",
    tags: ["ai coding tools", "developer productivity"],
    featured: false,
    externalUrl: "https://freeapihub.com/blog/why-developers-use-ai-coding-tools-wrong-build-better",
  },
  {
    slug: "how-to-choose-the-right-api",
    title: "How to Choose the Right API for Your Project: A Developer's Decision Framework",
    date: "Jun 10, 2026",
    readTime: "12 min",
    views: 0,
    category: "API Development",
    summary:
      "A practical framework for evaluating and selecting APIs. Learn how to assess documentation quality, rate limits, authentication, reliability, and total cost of ownership before committing.",
    tags: ["api selection", "developer guide", "api evaluation"],
    featured: true,
    internal: true,
  },
  {
    slug: "rest-api-authentication-explained",
    title: "Understanding REST API Authentication: API Keys, OAuth 2.0, and JWT Compared",
    date: "Jun 8, 2026",
    readTime: "14 min",
    views: 0,
    category: "API Development",
    summary:
      "A deep dive into the three most common API authentication methods. Learn how each works, when to use them, and see working code examples in Python and JavaScript.",
    tags: ["api authentication", "oauth", "jwt", "api keys"],
    featured: true,
    internal: true,
  },
  {
    slug: "api-rate-limiting-best-practices",
    title: "API Rate Limiting Best Practices: How to Handle 429 Errors Gracefully",
    date: "Jun 5, 2026",
    readTime: "11 min",
    views: 0,
    category: "API Development",
    summary:
      "Rate limits are a reality of working with APIs. Learn proven strategies for handling rate limits, implementing exponential backoff, and building resilient integrations.",
    tags: ["rate limiting", "error handling", "api resilience"],
    featured: false,
    internal: true,
  },
  {
    slug: "build-weather-app-free-api-tutorial",
    title: "Build a Weather App with Free APIs: A Complete Step-by-Step Tutorial",
    date: "Jun 3, 2026",
    readTime: "15 min",
    views: 0,
    category: "API Development",
    summary:
      "Learn to build a fully functional weather application using the free Open-Meteo API. No API key required. Includes geocoding, forecasts, and error handling in Python and JavaScript.",
    tags: ["weather api", "open-meteo", "python tutorial", "javascript"],
    featured: false,
    internal: true,
  },
  {
    slug: "free-vs-paid-apis-guide",
    title: "Free vs Paid APIs: When to Upgrade and What to Consider Before Paying",
    date: "Jun 1, 2026",
    readTime: "10 min",
    views: 0,
    category: "API Development",
    summary:
      "Free APIs are great for prototypes, but production applications need reliability. Learn the key differences, hidden costs, and decision criteria for upgrading to paid API plans.",
    tags: ["free api", "paid api", "api pricing", "production"],
    featured: false,
    internal: true,
  },
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  { name: "API Development", count: 13 },
  { name: "Software Development", count: 4 },
  { name: "AI APIs", count: 3 },
  { name: "Media APIs", count: 2 },
  { name: "Academic Research", count: 1 },
  { name: "Video Editing", count: 1 },
  { name: "Technology", count: 2 },
  { name: "Web Development", count: 1 },
];

export const TRENDING_POSTS = BLOG_POSTS.sort((a, b) => b.views - a.views).slice(0, 4);

export const POPULAR_TAGS = [
  "free api tutorial",
  "python api",
  "javascript tutorial",
  "ai models",
  "object detection",
  "image recognition",
  "code generation",
  "weather api",
  "dictionary api",
  "currency api",
  "news api",
  "music generation",
];
