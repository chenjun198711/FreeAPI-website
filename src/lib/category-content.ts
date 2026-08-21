import type { Category } from "@/types";

interface CategoryContent {
  description: string;
  longDescription: string;
  useCases: string[];
  popularFor: string[];
}

/**
 * Generates rich, contextual content for category pages.
 * This helps address AdSense "low-value content" by providing
 * unique, descriptive content for each category page.
 */
export function getCategoryContent(category: Category): CategoryContent {
  const categoryMap: Record<string, CategoryContent> = {
    "animals": {
      description: "Free APIs for animal data, including pet adoption, animal facts, and wildlife information. Build apps that display animal photos, facts, and rescue information.",
      longDescription: "The Animals category features free public APIs that provide access to animal-related data, including pet adoption listings, random animal facts, species information, and animal images. These APIs are perfect for building educational apps, pet-focused social platforms, wildlife conservation tools, and entertainment applications. Whether you need cat facts for a fun project or comprehensive pet adoption data for a civic tech app, you'll find the right API here.",
      useCases: [
        "Build a pet adoption platform with real-time listings",
        "Create educational apps with animal facts and species data",
        "Add random animal images to enhance user engagement",
        "Develop wildlife conservation and research tools",
      ],
      popularFor: ["pet adoption apps", "animal fact generators", "educational content", "wildlife research"],
    },
    "anime": {
      description: "Free APIs for anime and manga data, including character info, episode lists, and recommendation engines. Build anime discovery and fan platforms.",
      longDescription: "The Anime category offers free public APIs for accessing anime and manga metadata, character databases, episode information, and recommendation engines. These APIs are ideal for building anime discovery platforms, fan wikis, recommendation systems, and tracking applications. Access comprehensive data about your favorite anime series, manga titles, and characters to create rich, engaging experiences for anime enthusiasts.",
      useCases: [
        "Build anime and manga discovery platforms",
        "Create character databases and fan wikis",
        "Develop personalized anime recommendation engines",
        "Track watched episodes and build watchlists",
      ],
      popularFor: ["anime discovery", "manga databases", "character info", "recommendation engines"],
    },
    "finance": {
      description: "Free financial APIs for stock prices, market data, banking information, and economic indicators. Build financial dashboards and trading tools.",
      longDescription: "The Finance category provides free public APIs for accessing financial market data, stock prices, economic indicators, banking information, and investment analysis tools. These APIs enable developers to build financial dashboards, portfolio trackers, market analysis tools, and personal finance applications. Access real-time and historical financial data to power your fintech applications without the high costs typically associated with financial data feeds.",
      useCases: [
        "Build stock market dashboards with real-time prices",
        "Create personal finance and budget tracking apps",
        "Develop investment portfolio analysis tools",
        "Power fintech applications with economic data",
      ],
      popularFor: ["stock prices", "market data", "financial dashboards", "investment tracking"],
    },
    "weather": {
      description: "Free weather APIs for forecasts, current conditions, and climate data. Build weather apps, dashboards, and climate-aware applications.",
      longDescription: "The Weather category features free public APIs that provide access to current weather conditions, forecasts, historical weather data, and climate information. These APIs are essential for building weather applications, agricultural planning tools, travel planners, and any application that needs to display or react to weather conditions. Get accurate, real-time weather data for any location worldwide.",
      useCases: [
        "Build weather forecast apps and dashboards",
        "Create climate-aware smart home automations",
        "Develop agricultural and farming planning tools",
        "Add weather widgets to travel and event apps",
      ],
      popularFor: ["weather forecasts", "climate data", "weather widgets", "agricultural apps"],
    },
    "development": {
      description: "Free developer tools and APIs for code analysis, CI/CD, documentation, and development workflows. Enhance your development process.",
      longDescription: "The Development category offers free public APIs that help developers build better software. From code analysis and documentation generation to CI/CD integrations and development utilities, these APIs power the tools that developers use every day. Whether you're building a developer platform, integrating code quality checks, or creating documentation tools, you'll find the APIs you need to streamline your development workflow.",
      useCases: [
        "Integrate code analysis into CI/CD pipelines",
        "Build developer documentation platforms",
        "Create code quality and security scanning tools",
        "Develop project management tools for development teams",
      ],
      popularFor: ["code analysis", "CI/CD tools", "developer platforms", "documentation generation"],
    },
    "machine-learning": {
      description: "Free AI and machine learning APIs for text analysis, image recognition, predictions, and NLP. Build intelligent applications without ML expertise.",
      longDescription: "The Machine Learning category provides free public APIs that give developers access to AI-powered capabilities without requiring machine learning expertise. These APIs cover natural language processing, image recognition, text generation, sentiment analysis, and predictive analytics. Build intelligent chatbots, automate content moderation, perform image classification, and add AI features to your applications using these powerful yet accessible APIs.",
      useCases: [
        "Build AI-powered chatbots and virtual assistants",
        "Implement image recognition and classification",
        "Add sentiment analysis to social monitoring tools",
        "Create text summarization and content generation apps",
      ],
      popularFor: ["AI APIs", "NLP", "image recognition", "chatbots", "sentiment analysis"],
    },
    "games--comics": {
      description: "Free APIs for game data, comics info, and gaming statistics. Build game discovery platforms, comics databases, and gaming companion apps.",
      longDescription: "The Games & Comics category features free public APIs for accessing video game data, comic book information, gaming statistics, and related content. These APIs are perfect for building game discovery platforms, review aggregators, comics databases, and gaming companion applications. Access release dates, reviews, character info, and gaming achievements to create engaging experiences for gamers and comic enthusiasts.",
      useCases: [
        "Build game discovery and review platforms",
        "Create comics databases and reading trackers",
        "Develop gaming companion apps with stats and guides",
        "Aggregate gaming news and release information",
      ],
      popularFor: ["game databases", "comics info", "gaming stats", "review aggregators"],
    },
    "music": {
      description: "Free music APIs for lyrics, artist info, song metadata, and music discovery. Build music apps, playlist generators, and lyric databases.",
      longDescription: "The Music category offers free public APIs for accessing song lyrics, artist information, album metadata, music streaming data, and discovery features. These APIs enable developers to build music discovery apps, lyric databases, playlist generators, and music analysis tools. Whether you're creating a music recommendation engine or a lyrics search platform, you'll find the data you need here.",
      useCases: [
        "Build music discovery and recommendation apps",
        "Create lyrics search and annotation platforms",
        "Develop playlist generators and music analyzers",
        "Add music metadata to media player applications",
      ],
      popularFor: ["music discovery", "lyrics APIs", "artist info", "playlist generators"],
    },
    "news": {
      description: "Free news APIs for headlines, articles, and media content. Build news aggregators, monitoring tools, and personalized feeds.",
      longDescription: "The News category provides free public APIs for accessing news headlines, articles, and media content from various sources worldwide. These APIs are essential for building news aggregators, media monitoring tools, personalized news feeds, and sentiment analysis platforms. Access breaking news, category-specific content, and historical articles to keep your users informed.",
      useCases: [
        "Build news aggregation and curation platforms",
        "Create media monitoring and sentiment analysis tools",
        "Develop personalized news feed applications",
        "Power content discovery with trending stories",
      ],
      popularFor: ["news aggregation", "headlines", "media monitoring", "personalized feeds"],
    },
    "health": {
      description: "Free health APIs for medical info, fitness data, and wellness resources. Build health apps and wellness platforms.",
      longDescription: "The Health category features free public APIs that provide access to health information, medical data, fitness tracking, and wellness resources. These APIs enable developers to build health reference applications, fitness tracking platforms, wellness tools, and medical information systems. Access drug information, health statistics, fitness data, and wellness content to create applications that help users lead healthier lives.",
      useCases: [
        "Build health information and reference apps",
        "Create fitness tracking and wellness platforms",
        "Develop medical information lookup tools",
        "Integrate health data into care management systems",
      ],
      popularFor: ["health data", "fitness tracking", "medical info", "wellness apps"],
    },
    "cryptocurrency": {
      description: "Free crypto APIs for blockchain data, token prices, and market analysis. Build crypto trackers and DeFi applications.",
      longDescription: "The Cryptocurrency category offers free public APIs for accessing blockchain data, cryptocurrency prices, market analysis, and trading information. These APIs are essential for building crypto tracking apps, portfolio managers, DeFi platforms, and blockchain analytics tools. Access real-time and historical price data, blockchain transaction info, and market metrics to power your cryptocurrency applications.",
      useCases: [
        "Build cryptocurrency price tracking dashboards",
        "Create portfolio management and analysis tools",
        "Develop DeFi and blockchain analytics platforms",
        "Power crypto trading bots with market data",
      ],
      popularFor: ["crypto prices", "blockchain data", "market analysis", "DeFi apps"],
    },
    "geocoding": {
      description: "Free geocoding APIs for address lookup, coordinates, and location data. Build mapping apps and location-based services.",
      longDescription: "The Geocoding category provides free public APIs for converting addresses to coordinates (geocoding) and coordinates to addresses (reverse geocoding). These APIs are fundamental for building mapping applications, location-based services, delivery tracking systems, and geographic data analysis tools. Access accurate location data for any address worldwide to power your location-aware applications.",
      useCases: [
        "Build mapping and navigation applications",
        "Create location-based service platforms",
        "Develop delivery and logistics tracking systems",
        "Power geographic data analysis and visualization",
      ],
      popularFor: ["address lookup", "coordinates", "mapping apps", "location services"],
    },
  };

  // Return mapped content or generate generic content
  return categoryMap[category.slug] || {
    description: `Browse ${category.count} free public APIs in the ${category.name} category. Find the perfect API for your next project with detailed information on authentication, HTTPS, and CORS support.`,
    longDescription: `The ${category.name} category features ${category.count} free public APIs that developers can integrate into their applications. Each API listing includes detailed information about authentication requirements, HTTPS support, and CORS compatibility to help you choose the right API for your needs. Whether you're building a web app, mobile application, or backend service, you'll find free APIs in the ${category.name} category that can accelerate your development process.`,
    useCases: [
      `Integrate ${category.name.toLowerCase()} APIs into your web or mobile applications`,
      `Build data-driven dashboards using ${category.name.toLowerCase()} data`,
      `Create automated workflows with ${category.name.toLowerCase()} API endpoints`,
      `Develop tools and utilities leveraging ${category.name.toLowerCase()} data`,
    ],
    popularFor: [category.name.toLowerCase(), `${category.name.toLowerCase()} APIs`, "free APIs", "developer tools"],
  };
}
