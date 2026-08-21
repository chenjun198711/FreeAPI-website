import type { ApiEntry } from "@/types";

/**
 * Generates rich, contextual content for API detail pages.
 * This addresses AdSense "low-value content" by providing unique,
 * helpful information for each API listing.
 */

export function getApiUseCases(api: ApiEntry): string[] {
  const useCases: string[] = [];
  const categoryLower = api.category.toLowerCase();

  // Category-specific use cases
  if (categoryLower.includes("animal")) {
    useCases.push("Display random animal images and facts in web or mobile applications");
    useCases.push("Build educational content for biology and nature platforms");
    useCases.push("Add engaging pet-related features to social apps");
  } else if (categoryLower.includes("anime")) {
    useCases.push("Power anime and manga discovery platforms");
    useCases.push("Build character databases and fan wikis");
    useCases.push("Create recommendation engines for anime content");
  } else if (categoryLower.includes("weather")) {
    useCases.push("Display real-time weather forecasts in dashboards");
    useCases.push("Build weather-aware notification systems");
    useCases.push("Integrate climate data into agricultural or travel apps");
  } else if (categoryLower.includes("finance") || categoryLower.includes("currency") || categoryLower.includes("cryptocurrency")) {
    useCases.push("Build financial dashboards with real-time market data");
    useCases.push("Create currency conversion tools for e-commerce");
    useCases.push("Develop trading analysis and portfolio tracking apps");
  } else if (categoryLower.includes("news")) {
    useCases.push("Aggregate headlines from multiple sources");
    useCases.push("Build personalized news feeds");
    useCases.push("Create media monitoring and sentiment analysis tools");
  } else if (categoryLower.includes("machine-learning") || categoryLower.includes("ai")) {
    useCases.push("Integrate AI-powered text analysis into applications");
    useCases.push("Build intelligent chatbots and virtual assistants");
    useCases.push("Automate content moderation and classification");
  } else if (categoryLower.includes("game")) {
    useCases.push("Fetch game data for review and discovery platforms");
    useCases.push("Build gaming leaderboards and achievement trackers");
    useCases.push("Create interactive gaming companion apps");
  } else if (categoryLower.includes("music")) {
    useCases.push("Build music discovery and recommendation apps");
    useCases.push("Create playlist generators and music analyzers");
    useCases.push("Integrate lyrics and metadata into media players");
  } else if (categoryLower.includes("geocod") || categoryLower.includes("government") || categoryLower.includes("transportation")) {
    useCases.push("Build location-aware applications with mapping features");
    useCases.push("Create public transit and navigation tools");
    useCases.push("Develop government data dashboards and civic tech apps");
  } else if (categoryLower.includes("health")) {
    useCases.push("Build health information and reference apps");
    useCases.push("Create fitness tracking and wellness platforms");
    useCases.push("Integrate medical data into healthcare applications");
  } else if (categoryLower.includes("sport")) {
    useCases.push("Display live scores and sports statistics");
    useCases.push("Build fantasy sports and prediction platforms");
    useCases.push("Create athlete performance tracking tools");
  } else if (categoryLower.includes("book")) {
    useCases.push("Build book discovery and recommendation engines");
    useCases.push("Create reading list and library management apps");
    useCases.push("Integrate literary metadata into educational platforms");
  } else if (categoryLower.includes("food")) {
    useCases.push("Build recipe discovery and meal planning apps");
    useCases.push("Create restaurant and food review platforms");
    useCases.push("Integrate nutritional data into health apps");
  } else if (categoryLower.includes("develop") || categoryLower.includes("programm")) {
    useCases.push("Integrate developer tools into CI/CD pipelines");
    useCases.push("Build code analysis and documentation platforms");
    useCases.push("Create developer productivity dashboards");
  } else {
    useCases.push("Integrate this API into your web or mobile application");
    useCases.push("Build data-driven dashboards and visualization tools");
    useCases.push("Create automated workflows using the API endpoints");
  }

  return useCases.slice(0, 4);
}

export function getIntegrationSteps(api: ApiEntry): { title: string; description: string }[] {
  const steps: { title: string; description: string }[] = [];

  // Step 1: Review documentation
  steps.push({
    title: "Review the API Documentation",
    description: `Visit the official ${api.name} documentation to understand available endpoints, request formats, and response structures. Familiarize yourself with the API's rate limits and usage policies before integration.`,
  });

  // Step 2: Authentication setup
  if (api.auth === "No") {
    steps.push({
      title: "No Authentication Required",
      description: `Good news — ${api.name} does not require any authentication. You can start making API requests directly without registering for an API key or setting up OAuth credentials.`,
    });
  } else if (api.auth === "apiKey") {
    steps.push({
      title: "Obtain an API Key",
      description: `${api.name} requires an API key for authentication. Register on the provider's website to get your unique key. Keep it secure and never expose it in client-side code — use environment variables or a backend proxy.`,
    });
  } else if (api.auth === "OAuth") {
    steps.push({
      title: "Set Up OAuth Authentication",
      description: `${api.name} uses OAuth for authentication. You'll need to register your application with the provider to obtain client credentials. Implement the OAuth flow to obtain access tokens for authorized requests.`,
    });
  }

  // Step 3: Protocol
  if (api.https === "Yes") {
    steps.push({
      title: "Use HTTPS for Secure Requests",
      description: `${api.name} supports HTTPS, ensuring encrypted communication. Always use HTTPS endpoints in production to protect data in transit and comply with modern web security standards.`,
    });
  } else {
    steps.push({
      title: "Note: No HTTPS Support",
      description: `${api.name} does not currently support HTTPS. Be cautious when transmitting sensitive data. Consider using a backend proxy with HTTPS to add a security layer for your users.`,
    });
  }

  // Step 4: CORS
  if (api.cors === "Yes") {
    steps.push({
      title: "CORS Enabled — Direct Browser Access",
      description: `${api.name} has CORS enabled, meaning you can make requests directly from the browser. This is ideal for frontend-only applications built with React, Vue, or vanilla JavaScript.`,
    });
  } else if (api.cors === "No") {
    steps.push({
      title: "No CORS — Use a Backend Proxy",
      description: `${api.name} does not support CORS. To use it in a browser-based app, set up a backend proxy server that forwards requests to the API and returns the response with appropriate CORS headers.`,
    });
  } else {
    steps.push({
      title: "CORS Status Unknown — Test Before Use",
      description: `The CORS status for ${api.name} is unknown. Test with a simple browser-based request to verify. If CORS is not supported, set up a backend proxy to handle requests server-side.`,
    });
  }

  // Step 5: Implementation
  steps.push({
    title: "Implement and Test",
    description: `Write your API integration code, start with a simple test request to verify connectivity. Implement proper error handling for network failures, rate limits, and invalid responses. Monitor your API usage to stay within any limits.`,
  });

  return steps;
}

export function getApiFaqs(api: ApiEntry): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];

  faqs.push({
    question: `Is ${api.name} free to use?`,
    answer: `Yes, ${api.name} is listed as a free public API. However, some free APIs may have usage limits or rate restrictions. Check the official documentation for details on any quotas or fair use policies.`,
  });

  if (api.auth === "No") {
    faqs.push({
      question: `Do I need an API key for ${api.name}?`,
      answer: `No, ${api.name} does not require authentication. You can start using the API immediately without registering or obtaining any credentials. This makes it perfect for quick prototyping and demos.`,
    });
  } else if (api.auth === "apiKey") {
    faqs.push({
      question: `How do I get an API key for ${api.name}?`,
      answer: `To use ${api.name}, you need to register on the provider's website to obtain an API key. The key is typically included in request headers or query parameters. Keep your key secure and never commit it to public repositories.`,
    });
  } else {
    faqs.push({
      question: `How does authentication work with ${api.name}?`,
      answer: `${api.name} uses OAuth authentication. You'll need to register your application with the provider, implement the OAuth authorization flow, and use access tokens to authenticate your API requests.`,
    });
  }

  faqs.push({
    question: `Can I use ${api.name} in a browser-based application?`,
    answer:
      api.cors === "Yes"
        ? `Yes, ${api.name} supports CORS, so you can make requests directly from the browser. This makes it suitable for frontend applications built with React, Vue, Angular, or vanilla JavaScript.`
        : api.cors === "No"
        ? `${api.name} does not support CORS. For browser-based apps, you'll need to route requests through a backend proxy server that adds the necessary CORS headers to responses.`
        : `The CORS status of ${api.name} is unknown. Test with a browser request first. If CORS is not supported, use a backend proxy to forward requests server-side.`,
  });

  faqs.push({
    question: `What category does ${api.name} belong to?`,
    answer: `${api.name} is categorized under ${api.category}. You can browse more APIs in the same category to find similar services and alternatives for your project.`,
  });

  faqs.push({
    question: `Is ${api.name} secure?`,
    answer:
      api.https === "Yes"
        ? `Yes, ${api.name} supports HTTPS, which encrypts all data transmitted between your application and the API server. Always use HTTPS endpoints in production environments.`
        : `${api.name} does not support HTTPS. For applications handling sensitive data, consider using a secure backend proxy that communicates with the API over an unencrypted connection but serves your clients over HTTPS.`,
  });

  return faqs;
}

export function getApiCodeExample(api: ApiEntry): string {
  const isNoAuth = api.auth === "No";

  if (isNoAuth) {
    return `// JavaScript example
fetch("${api.url}")
  .then(response => {
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return response.json();
  })
  .then(data => {
    console.log("API response:", data);
  })
  .catch(error => {
    console.error("Error fetching from ${api.name}:", error);
  });`;
  }

  return `// JavaScript example (with API key)
const apiKey = process.env.API_KEY; // Store your key securely

fetch("${api.url}", {
  headers: {
    "Authorization": \`Bearer \${apiKey}\`,
    // Or use: "X-API-Key": apiKey
    // Check the docs for the correct header format
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return response.json();
  })
  .then(data => {
    console.log("API response:", data);
  })
  .catch(error => {
    console.error("Error fetching from ${api.name}:", error);
  });`;
}

export function getPythonCodeExample(api: ApiEntry): string {
  const isNoAuth = api.auth === "No";

  if (isNoAuth) {
    return `# Python example
import requests

response = requests.get("${api.url}")

if response.status_code == 200:
    data = response.json()
    print("API response:", data)
else:
    print(f"Error: {response.status_code}")`;
  }

  return `# Python example (with API key)
import requests
import os

api_key = os.environ.get("API_KEY")  # Store your key securely

headers = {
    "Authorization": f"Bearer {api_key}",
    # Or use: "X-API-Key": api_key
}

response = requests.get("${api.url}", headers=headers)

if response.status_code == 200:
    data = response.json()
    print("API response:", data)
else:
    print(f"Error: {response.status_code}")`;
}
