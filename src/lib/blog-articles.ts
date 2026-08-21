export interface ArticleBlock {
  type: "heading" | "paragraph" | "code" | "list" | "quote" | "callout";
  content?: string;
  items?: string[];
  language?: string;
  title?: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: string;
  content: ArticleBlock[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "how-to-choose-the-right-api",
    title: "How to Choose the Right API for Your Project: A Developer's Decision Framework",
    description:
      "A practical framework for evaluating and selecting APIs. Learn how to assess documentation quality, rate limits, authentication, reliability, and total cost of ownership before committing.",
    date: "Jun 10, 2026",
    readTime: "12 min",
    category: "API Development",
    tags: ["api selection", "developer guide", "api evaluation"],
    author: "FreeAPI Hub Team",
    content: [
      {
        type: "paragraph",
        content:
          "Choosing the right API can make or break your project. I have seen teams spend weeks building on top of an API only to discover it falls apart under production load, or worse, gets shut down with 30 days notice. After working with hundreds of public APIs catalogued on FreeAPI Hub, I have developed a decision framework that helps you evaluate APIs systematically instead of relying on guesswork.",
      },
      {
        type: "heading",
        content: "1. Start With the Documentation Test",
      },
      {
        type: "paragraph",
        content:
          "Before you write a single line of integration code, read the documentation. This sounds obvious, but you would be surprised how many developers skip this step and jump straight into coding. Good documentation tells you not just what the API does, but also what happens when things go wrong. Look for these specific elements:",
      },
      {
        type: "list",
        items: [
          "Authentication setup with copy-pasteable code examples in multiple languages",
          "Clear request and response schemas with field types and descriptions",
          "Error codes with explanations of what each one means and how to handle it",
          "Rate limiting details including headers and retry guidance",
          "Changelog or version history showing active maintenance",
          "Interactive playground or sandbox where you can test calls in the browser",
        ],
      },
      {
        type: "paragraph",
        content:
          "If the documentation is sparse, outdated, or consists entirely of auto-generated reference pages with no narrative guides, that is a red flag. APIs with poor docs tend to have poor developer experience across the board. You will waste hours reverse-engineering behavior that should have been documented.",
      },
      {
        type: "callout",
        title: "Pro Tip",
        content:
          "Search for the API on GitHub Issues and Stack Overflow. If there are unresolved questions from months ago with no maintainer response, the API is effectively abandoned.",
      },
      {
        type: "heading",
        content: "2. Evaluate Rate Limits Against Your Real Needs",
      },
      {
        type: "paragraph",
        content:
          "Rate limits are the silent killer of API projects. An API might offer 1,000 requests per day for free, which sounds generous until you realize your application needs to make 50 requests just to render a single dashboard page. Calculate your actual usage pattern before committing.",
      },
      {
        type: "paragraph",
        content:
          "Here is a simple formula I use: take your peak concurrent users, multiply by the average number of API calls per user session, and divide by your peak session duration in minutes. That gives you your required requests per minute. Compare this against the API rate limit with a 2x safety margin.",
      },
      {
        type: "code",
        language: "python",
        content: `# Example: Calculating required API capacity
peak_users = 500
calls_per_session = 12
session_duration_min = 15

required_rpm = (peak_users * calls_per_session) / session_duration_min
print(f"Required: {required_rpm:.0f} requests/minute")
print(f"With 2x margin: {required_rpm * 2:.0f} requests/minute")

# Compare against the API's rate limit
api_rate_limit_rpm = 100
if required_rpm * 2 > api_rate_limit_rpm:
    print("WARNING: This API cannot handle your peak load")`,
      },
      {
        type: "paragraph",
        content:
          "Also check what happens when you exceed the limit. Some APIs return a 429 status with a Retry-After header, which is the correct behavior. Others simply block your account or throttle you silently with no indication of when you can retry. The former is manageable; the latter will cause intermittent failures that are nearly impossible to debug.",
      },
      {
        type: "heading",
        content: "3. Understand Authentication Complexity",
      },
      {
        type: "paragraph",
        content:
          "API authentication falls into three broad categories, each with different complexity tradeoffs. The simplest is API key-based auth, where you pass a token in the header or query string. This is easy to implement but provides no granular permissions or user delegation.",
      },
      {
        type: "paragraph",
        content:
          "OAuth 2.0 is more powerful but significantly more complex. You need to handle redirect flows, token refresh, and scope management. If your application acts on behalf of end users, OAuth is usually necessary. But if you are just calling an API from a backend service, OAuth adds unnecessary complexity.",
      },
      {
        type: "paragraph",
        content:
          "JWT-based authentication sits in between. It is stateless, self-contained, and works well for service-to-service communication. The downside is token revocation is harder since there is no central session store. For most internal integrations, API keys or JWTs are sufficient. Save OAuth for when you genuinely need user delegation.",
      },
      {
        type: "heading",
        content: "4. Check Uptime History and Reliability Signals",
      },
      {
        type: "paragraph",
        content:
          "An API that goes down regularly is worse than no API at all. Unfortunately, most free APIs do not publish uptime statistics. Here are the signals I look for instead. First, check if the API has a status page. APIs with public status pages tend to be more reliable because the provider is committed to transparency.",
      },
      {
        type: "paragraph",
        content:
          "Second, look at the provider's infrastructure. APIs hosted on major cloud providers (AWS, Google Cloud, Azure) with CDN distribution are generally more reliable than those running on a single VPS. Third, test the API yourself over a week. Write a simple health check script that pings the endpoint every 10 minutes and logs response times.",
      },
      {
        type: "code",
        language: "javascript",
        content: `// Simple API health monitoring script
const API_URL = "https://api.example.com/health";
const log = [];

async function checkApi() {
  const start = Date.now();
  try {
    const res = await fetch(API_URL);
    const elapsed = Date.now() - start;
    log.push({
      time: new Date().toISOString(),
      status: res.status,
      latency: elapsed,
    });
    if (res.status !== 200) {
      console.error(\`[\${new Date().toISOString()}] HTTP \${res.status} (\${elapsed}ms)\`);
    }
  } catch (err) {
    log.push({ time: new Date().toISOString(), error: err.message });
    console.error(\`API check failed: \${err.message}\`);
  }
}

// Run every 10 minutes
setInterval(checkApi, 10 * 60 * 1000);
checkApi(); // Initial check`,
      },
      {
        type: "paragraph",
        content:
          "After a week, review the log. If you see downtime exceeding 1 percent or latency spikes above 5 seconds, look for alternatives. A good free API should maintain at least 99 percent uptime. Premium APIs should be at 99.9 percent or higher.",
      },
      {
        type: "heading",
        content: "5. Assess the Total Cost of Ownership",
      },
      {
        type: "paragraph",
        content:
          "Free APIs are not always free. Many have hidden costs that only become apparent after you have integrated them. The most common pattern is a free tier that works for development but becomes expensive at scale. A weather API offering 10,000 calls per day for free might charge 0.01 US dollars per call beyond that, which adds up quickly for a popular application.",
      },
      {
        type: "paragraph",
        content:
          "Another hidden cost is development time. An API with poor documentation, inconsistent response formats, or frequent breaking changes will cost your team hours of maintenance. Sometimes paying for a well-maintained premium API is cheaper overall than using a free one that constantly breaks.",
      },
      {
        type: "paragraph",
        content:
          "Consider vendor lock-in as well. If you build deeply around a specific API, switching costs increase over time. Design your integration layer with abstraction in mind so you can swap providers without rewriting your entire application.",
      },
      {
        type: "heading",
        content: "6. Verify Long-Term Viability",
      },
      {
        type: "paragraph",
        content:
          "APIs get deprecated. Google alone has shut down dozens of APIs over the years, leaving developers scrambling. Before committing to an API, assess its long-term viability. Check when the API was last updated. Look at the provider's business model, if there is no clear revenue path, the API may not survive long term.",
      },
      {
        type: "paragraph",
        content:
          "Open source APIs hosted on public infrastructure tend to be more sustainable than side projects. Government and institutional APIs are usually stable but may have limited features. APIs from venture-funded startups offer cutting-edge features but carry the risk of the company failing or pivoting.",
      },
      {
        type: "paragraph",
        content:
          "Always have a fallback plan. If the API you depend on shuts down tomorrow, what is your backup? Having a secondary API identified, even if not integrated, reduces your risk significantly.",
      },
      {
        type: "heading",
        content: "Putting It All Together",
      },
      {
        type: "paragraph",
        content:
          "Choosing an API is an investment. The time you spend evaluating options upfront saves you from costly rewrites and production failures later. Use this framework as a checklist for every new API integration. Score each candidate on documentation quality, rate limit fit, authentication complexity, reliability, cost trajectory, and long-term viability.",
      },
      {
        type: "paragraph",
        content:
          "At FreeAPI Hub, we catalog over 1,400 free public APIs across 50 categories. Each listing includes documentation links, auth requirements, HTTPS support, and CORS information to help you make these evaluations quickly. Browse our directory to find APIs that meet your project needs, and use this framework to make your final selection.",
      },
    ],
  },
  {
    slug: "rest-api-authentication-explained",
    title: "Understanding REST API Authentication: API Keys, OAuth 2.0, and JWT Compared",
    description:
      "A deep dive into the three most common API authentication methods. Learn how each works, when to use them, and see working code examples in Python and JavaScript.",
    date: "Jun 8, 2026",
    readTime: "14 min",
    category: "API Development",
    tags: ["api authentication", "oauth", "jwt", "api keys"],
    author: "FreeAPI Hub Team",
    content: [
      {
        type: "paragraph",
        content:
          "Authentication is the first and most critical decision in any API integration. Get it wrong and you expose your application to security vulnerabilities, rate limit abuse, or broken user experiences. Yet many developers treat auth as an afterthought, copying boilerplate code without understanding what happens under the hood. This guide breaks down the three most common authentication methods, explains how each works, and shows you exactly when to use them.",
      },
      {
        type: "heading",
        content: "API Keys: Simple but Limited",
      },
      {
        type: "paragraph",
        content:
          "API keys are the simplest form of authentication. The API provider issues you a unique string, and you include it in every request. The server verifies the key and either allows or denies access. That is it. No tokens, no redirects, no refresh logic. This simplicity makes API keys the most common authentication method for public APIs.",
      },
      {
        type: "paragraph",
        content:
          "The key typically goes in one of three places: a request header, a query parameter, or a custom header. Headers are the recommended approach because query parameters get logged in server access logs, creating a security risk. Here is how to send an API key in Python and JavaScript:",
      },
      {
        type: "code",
        language: "python",
        content: `import requests

# Method 1: Authorization header (recommended)
headers = {"Authorization": "Bearer YOUR_API_KEY"}
response = requests.get("https://api.example.com/data", headers=headers)

# Method 2: Custom header (common pattern)
headers = {"X-API-Key": "YOUR_API_KEY"}
response = requests.get("https://api.example.com/data", headers=headers)

# Method 3: Query parameter (not recommended)
response = requests.get("https://api.example.com/data?api_key=YOUR_API_KEY")

print(response.json())`,
      },
      {
        type: "code",
        language: "javascript",
        content: `// JavaScript fetch with API key
const API_KEY = process.env.API_KEY;

// Recommended: Authorization header
const response = await fetch("https://api.example.com/data", {
  headers: {
    "Authorization": \`Bearer \${API_KEY}\`,
  },
});

const data = await response.json();
console.log(data);`,
      },
      {
        type: "paragraph",
        content:
          "API keys work well for server-to-server communication where the key never reaches the client. They are also fine for low-stakes public APIs. But they have significant limitations. A single key identifies your application, not individual users. You cannot grant different permissions to different users. And if the key leaks, anyone who has it can impersonate your application until you rotate it.",
      },
      {
        type: "callout",
        title: "Security Note",
        content:
          "Never expose API keys in client-side JavaScript. If your frontend needs to call an authenticated API, proxy the request through your backend.",
      },
      {
        type: "heading",
        content: "OAuth 2.0: Delegation Without Sharing Passwords",
      },
      {
        type: "paragraph",
        content:
          "OAuth 2.0 solves a different problem. Instead of identifying your application, it lets a user grant your application limited access to their account on another service, without sharing their password. This is how you log into a third-party app using your Google or GitHub account.",
      },
      {
        type: "paragraph",
        content:
          "The OAuth 2.0 authorization code flow works in five steps. First, your application redirects the user to the provider authorization page. Second, the user logs in and approves your requested scopes. Third, the provider redirects back to your application with an authorization code. Fourth, your backend exchanges that code for an access token. Fifth, you use the access token to make API requests on behalf of the user.",
      },
      {
        type: "code",
        language: "javascript",
        content: `// OAuth 2.0 Authorization Code Flow (Node.js)
const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/callback";

// Step 1: Redirect user to authorization page
function getAuthUrl() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "read:user",
  });
  return \`https://api.example.com/oauth/authorize?\${params}\`;
}

// Step 4: Exchange code for token (server-side)
async function exchangeCodeForToken(code) {
  const response = await fetch("https://api.example.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code: code,
    }),
  });
  return response.json();
  // Returns: { access_token, refresh_token, expires_in, token_type }
}

// Step 5: Use access token for API calls
async function getUserData(accessToken) {
  const response = await fetch("https://api.example.com/user", {
    headers: { "Authorization": \`Bearer \${accessToken}\` },
  });
  return response.json();
}`,
      },
      {
        type: "paragraph",
        content:
          "Access tokens expire, typically within an hour. When they do, you use the refresh token to get a new access token without requiring the user to log in again. This refresh flow is critical to implement correctly, otherwise users will be logged out repeatedly.",
      },
      {
        type: "code",
        language: "python",
        content: `import requests

def refresh_access_token(refresh_token, client_id, client_secret):
    """Exchange refresh token for a new access token."""
    response = requests.post("https://api.example.com/oauth/token", data={
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": client_id,
        "client_secret": client_secret,
    })
    
    if response.status_code == 200:
        tokens = response.json()
        return tokens["access_token"], tokens.get("refresh_token")
    else:
        raise Exception(f"Token refresh failed: {response.status_code}")

# Usage
new_access, new_refresh = refresh_access_token(
    stored_refresh_token,
    CLIENT_ID,
    CLIENT_SECRET,
)`,
      },
      {
        type: "paragraph",
        content:
          "OAuth 2.0 is complex, but it is the right choice when your application acts on behalf of users. It provides granular scope-based permissions, user-specific rate limits, and the ability to revoke access per application. The complexity is justified by the security and flexibility gains.",
      },
      {
        type: "heading",
        content: "JWT: Stateless and Self-Contained",
      },
      {
        type: "paragraph",
        content:
          "JSON Web Tokens (JWT) take a fundamentally different approach. Instead of the server looking up the token in a database on every request, the token itself contains all the necessary information. The server just verifies the cryptographic signature. This makes JWTs stateless and fast, since there is no database lookup required for authentication.",
      },
      {
        type: "paragraph",
        content:
          "A JWT has three parts separated by dots: header, payload, and signature. The header specifies the algorithm used for signing. The payload contains claims like user ID, role, and expiration time. The signature is computed using the header, payload, and a secret key known only to the server.",
      },
      {
        type: "code",
        language: "javascript",
        content: `// Creating and verifying JWTs in Node.js
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

// Create a token (typically done at login)
function createToken(userId, role) {
  return jwt.sign(
    { userId, role },
    SECRET,
    { expiresIn: "1h" }
  );
}

// Verify a token (done on each protected request)
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return { valid: true, payload: decoded };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

// Usage in an Express middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }
  
  const token = authHeader.substring(7);
  const result = verifyToken(token);
  
  if (!result.valid) {
    return res.status(401).json({ error: "Invalid token" });
  }
  
  req.user = result.payload;
  next();
}`,
      },
      {
        type: "paragraph",
        content:
          "JWTs excel in microservice architectures. Service A can issue a token, and Service B can verify it without calling back to Service A. This eliminates a network round-trip on every request. JWTs also work well for single-page applications where the token is stored client-side and sent with each API call.",
      },
      {
        type: "paragraph",
        content:
          "However, JWTs have a significant drawback: they cannot be easily revoked. Once issued, a JWT is valid until it expires. If a user logs out or their account is compromised, you cannot invalidate their existing tokens without maintaining a blocklist, which defeats the stateless advantage. For this reason, keep JWT expiration times short and use refresh tokens for session continuity.",
      },
      {
        type: "heading",
        content: "Comparison: Which Should You Use?",
      },
      {
        type: "paragraph",
        content:
          "The choice depends on your use case. Use API keys when you are calling an API from a backend service and do not need user-level identity. They are simple, fast to implement, and sufficient for most server-to-server integrations.",
      },
      {
        type: "paragraph",
        content:
          "Use OAuth 2.0 when your application needs to access another service on behalf of a user. It is the standard for delegated access and provides the best security for user-facing applications. The complexity is real, but libraries like Passport.js and Authlib handle most of the heavy lifting.",
      },
      {
        type: "paragraph",
        content:
          "Use JWT when you need stateless authentication within your own application or microservice cluster. JWTs are fast, self-contained, and work well at scale. Just remember to keep expiration times short and have a refresh strategy.",
      },
      {
        type: "paragraph",
        content:
          "Many production systems combine these methods. For example, you might use OAuth 2.0 for user login, issue a JWT for session management, and use API keys for third-party service calls. Understanding each method individually is the first step to building a secure and maintainable authentication architecture.",
      },
    ],
  },
  {
    slug: "api-rate-limiting-best-practices",
    title: "API Rate Limiting Best Practices: How to Handle 429 Errors Gracefully",
    description:
      "Rate limits are a reality of working with APIs. Learn proven strategies for handling rate limits, implementing exponential backoff, and building resilient integrations.",
    date: "Jun 5, 2026",
    readTime: "11 min",
    category: "API Development",
    tags: ["rate limiting", "error handling", "api resilience"],
    author: "FreeAPI Hub Team",
    content: [
      {
        type: "paragraph",
        content:
          "Every developer who works with APIs eventually hits a rate limit. The HTTP 429 status code, meaning Too Many Requests, is the API way of telling you to slow down. How you handle this response determines whether your application degrades gracefully or crashes entirely. This guide covers practical strategies for dealing with rate limits, from simple retry logic to advanced queuing systems.",
      },
      {
        type: "heading",
        content: "Understanding Rate Limit Headers",
      },
      {
        type: "paragraph",
        content:
          "Well-designed APIs include rate limit information in response headers. These headers tell you not just when you hit the limit, but how close you are to hitting it. The most common headers follow a standard pattern, though naming conventions vary slightly between APIs.",
      },
      {
        type: "list",
        items: [
          "X-RateLimit-Limit: The maximum number of requests allowed in the current window",
          "X-RateLimit-Remaining: How many requests you have left in the current window",
          "X-RateLimit-Reset: Unix timestamp when the window resets",
          "Retry-After: Seconds to wait before making another request (sent with 429 responses)",
        ],
      },
      {
        type: "paragraph",
        content:
          "Monitoring these headers proactively is the best way to avoid hitting rate limits in the first place. If you see Remaining dropping below 20 percent, throttle your requests before the API forces you to. This is especially important for batch jobs that make many sequential requests.",
      },
      {
        type: "code",
        language: "python",
        content: `import requests
import time

class RateLimitedClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.remaining = None
        self.reset_time = None
    
    def get(self, path):
        # Check if we should wait before making a request
        if self.remaining is not None and self.remaining <= 1:
            wait = max(0, self.reset_time - time.time())
            if wait > 0:
                print(f"Rate limit approaching, waiting {wait:.0f}s")
                time.sleep(wait)
        
        response = requests.get(f"{self.base_url}{path}")
        
        # Update rate limit info from headers
        if "X-RateLimit-Remaining" in response.headers:
            self.remaining = int(response.headers["X-RateLimit-Remaining"])
        if "X-RateLimit-Reset" in response.headers:
            self.reset_time = float(response.headers["X-RateLimit-Reset"])
        
        if response.status_code == 429:
            retry_after = int(response.headers.get("Retry-After", 60))
            print(f"Rate limited. Retrying after {retry_after}s")
            time.sleep(retry_after)
            return self.get(path)  # Retry once
        
        return response.json()`,
      },
      {
        type: "heading",
        content: "Implementing Exponential Backoff",
      },
      {
        type: "paragraph",
        content:
          "When you receive a 429 response, the simplest approach is to wait and retry. But a fixed delay is inefficient. If the rate limit resets in 1 second, waiting 60 seconds wastes time. If it resets in 55 seconds, waiting 1 second triggers another 429. Exponential backoff solves this by starting with a short delay and doubling it on each failure.",
      },
      {
        type: "paragraph",
        content:
          "The key insight is adding jitter, a small random variation to the delay. Without jitter, multiple clients hitting the same rate limit will all retry at the same time, creating a thundering herd problem. Jitter spreads retries across a window, reducing collisions.",
      },
      {
        type: "code",
       language: "javascript",
        content: `// Exponential backoff with jitter
async function fetchWithRetry(url, options = {}, maxRetries = 5) {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        // Parse Retry-After header if available
        const retryAfter = response.headers.get("Retry-After");
        let delay;
        
        if (retryAfter) {
          delay = parseInt(retryAfter) * 1000;
        } else {
          // Exponential backoff: 1s, 2s, 4s, 8s, 16s
          const baseDelay = Math.pow(2, attempt) * 1000;
          // Add jitter: random 0-50% of base delay
          const jitter = Math.random() * baseDelay * 0.5;
          delay = baseDelay + jitter;
        }
        
        console.log(\`Rate limited. Attempt \${attempt + 1}. Waiting \${Math.round(delay)}ms\`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      
      return await response.json();
    } catch (err) {
      lastError = err;
      // Network errors also warrant retry
      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError || new Error("Max retries exceeded");
}`,
      },
      {
        type: "heading",
        content: "Batching and Caching to Reduce Requests",
      },
      {
        type: "paragraph",
        content:
          "The best way to handle rate limits is to avoid triggering them. Two strategies help: batching and caching. Many APIs support bulk endpoints that let you fetch multiple resources in a single request. Instead of making 100 individual requests, you make one batch request and get all the data at once.",
      },
      {
        type: "paragraph",
        content:
          "Caching is even more impactful. If your application requests the same data repeatedly, store the response locally and serve subsequent requests from cache. This dramatically reduces API calls. Use cache headers from the API response to determine how long to cache each resource.",
      },
      {
        type: "code",
        language: "python",
        content: `import time
import hashlib

class ApiCache:
    def __init__(self):
        self._cache = {}
    
    def get(self, url):
        key = hashlib.md5(url.encode()).hexdigest()
        if key in self._cache:
            entry = self._cache[key]
            if time.time() < entry["expires"]:
                return entry["data"]
            else:
                del self._cache[key]
        return None
    
    def set(self, url, data, ttl_seconds=300):
        key = hashlib.md5(url.encode()).hexdigest()
        self._cache[key] = {
            "data": data,
            "expires": time.time() + ttl_seconds,
        }

# Usage: cache API responses for 5 minutes
cache = ApiCache()

def get_weather(city):
    url = f"/weather?city={city}"
    cached = cache.get(url)
    if cached:
        return cached
    
    data = api_client.get(url)
    cache.set(url, data, ttl_seconds=300)
    return data`,
      },
      {
        type: "heading",
        content: "Building a Request Queue",
      },
      {
        type: "paragraph",
        content:
          "For applications that need to make large numbers of API calls, a request queue is the most robust solution. Instead of firing requests as fast as possible, you queue them and process at a controlled rate. This ensures you never exceed the rate limit, even under heavy load.",
      },
      {
        type: "paragraph",
        content:
          "A simple token bucket implementation works well for most cases. You maintain a pool of tokens that refills at the API rate limit. Each request consumes one token. If no tokens are available, the request waits until one becomes available. This naturally throttles requests to stay within limits.",
      },
      {
        type: "code",
        language: "javascript",
        content: `class TokenBucket {
  constructor(capacity, refillRatePerSecond) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRatePerSecond;
    this.lastRefill = Date.now();
  }
  
  async acquire() {
    this._refill();
    
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return;
    }
    
    // Wait for a token to become available
    const waitMs = (1 / this.refillRate) * 1000;
    await new Promise(resolve => setTimeout(resolve, waitMs));
    this._refill();
    this.tokens -= 1;
  }
  
  _refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate
    );
    this.lastRefill = now;
  }
}

// Usage: 100 requests per minute = 1.67 per second
const bucket = new TokenBucket(100, 100 / 60);

async function rateLimitedApiCall(url) {
  await bucket.acquire();
  const response = await fetch(url);
  return response.json();
}`,
      },
      {
        type: "heading",
        content: "Monitoring and Alerting",
      },
      {
        type: "paragraph",
        content:
          "Rate limit handling should be observable. Log every 429 response, track how often they occur, and alert when the frequency spikes. A sudden increase in rate limit errors often indicates a bug, such as a loop making redundant API calls, or a traffic spike you were not expecting.",
      },
      {
        type: "paragraph",
        content:
          "Set up dashboards to track your API usage over time. Most API providers offer usage analytics in their developer portals. Compare your actual usage against the rate limit to identify headroom. If you are consistently using 80 percent or more of your quota, it is time to either optimize your calls or upgrade to a higher tier.",
      },
      {
        type: "paragraph",
        content:
          "Rate limiting is not an obstacle, it is a design constraint. By building rate limit awareness into your application from the start, you create integrations that are resilient, efficient, and respectful of the APIs you depend on. The strategies in this guide, from header monitoring to request queuing, will help you build API integrations that just work.",
      },
    ],
  },
  {
    slug: "build-weather-app-free-api-tutorial",
    title: "Build a Weather App with Free APIs: A Complete Step-by-Step Tutorial",
    description:
      "Learn to build a fully functional weather application using the free Open-Meteo API. No API key required. Includes geocoding, forecasts, and error handling in Python and JavaScript.",
    date: "Jun 3, 2026",
    readTime: "15 min",
    category: "API Development",
    tags: ["weather api", "open-meteo", "python tutorial", "javascript"],
    author: "FreeAPI Hub Team",
    content: [
      {
        type: "paragraph",
        content:
          "Building a weather app is the classic API tutorial for a reason. It touches every fundamental skill: making HTTP requests, parsing JSON, handling errors, and presenting data to users. In this tutorial, we will build a real weather application using the Open-Meteo API, which is completely free, requires no API key, and offers both current conditions and forecasts.",
      },
      {
        type: "heading",
        content: "Why Open-Meteo?",
      },
      {
        type: "paragraph",
        content:
          "Open-Meteo is an open-source weather API that provides global weather data from national weather services. It stands out among free weather APIs for several reasons. It requires no registration or API key, which means you can start coding immediately. It offers a generous free tier of 10,000 calls per day for non-commercial use. It provides hourly forecasts up to 7 days and daily forecasts up to 16 days. And it supports both geocoding and reverse geocoding, so you can search by city name.",
      },
      {
        type: "callout",
        title: "What You Will Build",
        content:
          "By the end of this tutorial, you will have a weather app that takes a city name, fetches current conditions and a 7-day forecast, and displays the results with proper error handling.",
      },
      {
        type: "heading",
        content: "Step 1: Geocoding, Converting City Names to Coordinates",
      },
      {
        type: "paragraph",
        content:
          "Weather APIs work with latitude and longitude, but users search by city name. Open-Meteo provides a geocoding endpoint that converts city names to coordinates. This is our first API call.",
      },
      {
        type: "code",
        language: "python",
        content: `import requests

def geocode_city(city_name):
    """Convert a city name to latitude and longitude."""
    url = "https://geocoding-api.open-meteo.com/v1/search"
    params = {"name": city_name, "count": 1, "language": "en"}
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()
    
    if not data.get("results"):
        raise ValueError(f"City '{city_name}' not found")
    
    result = data["results"][0]
    return {
        "name": result["name"],
        "country": result.get("country", ""),
        "latitude": result["latitude"],
        "longitude": result["longitude"],
    }

# Test it
location = geocode_city("Tokyo")
print(f"{location['name']}, {location['country']}")
print(f"Lat: {location['latitude']}, Lon: {location['longitude']}")`,
      },
      {
        type: "paragraph",
        content:
          "The geocoding endpoint returns a list of matching locations. We take the first result and extract the coordinates. If no matches are found, we raise a clear error message. Always validate the response structure before accessing nested fields, as API responses can vary.",
      },
      {
        type: "heading",
        content: "Step 2: Fetching Weather Data",
      },
      {
        type: "paragraph",
        content:
          "Now that we have coordinates, we can fetch weather data. The Open-Meteo forecast endpoint accepts a wide range of parameters to customize what data you receive. For our app, we want current temperature, wind speed, and a 7-day forecast.",
      },
      {
        type: "code",
        language: "python",
        content: `def get_weather(latitude, longitude):
    """Fetch current weather and 7-day forecast."""
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m",
        "daily": "weather_code,temperature_2m_max,temperature_2m_min",
        "timezone": "auto",
        "forecast_days": 7,
    }
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

# Fetch weather for Tokyo
weather = get_weather(location["latitude"], location["longitude"])
current = weather["current"]
print(f"Temperature: {current['temperature_2m']}°C")
print(f"Wind: {current['wind_speed_10m']} km/h")
print(f"Humidity: {current['relative_humidity_2m']}%")`,
      },
      {
        type: "paragraph",
        content:
          "The current parameter specifies which weather variables to include in the current conditions. The daily parameter does the same for the daily forecast. The weather_code is a WMO (World Meteorological Organization) code that represents the overall weather condition, like sunny, cloudy, or rain.",
      },
      {
        type: "heading",
        content: "Step 3: Decoding Weather Codes",
      },
      {
        type: "paragraph",
        content:
          "Weather codes are numeric, but users need readable descriptions. The WMO weather interpretation codes map to human-readable strings. Here is a complete mapping you can use in your application.",
      },
      {
        type: "code",
        language: "javascript",
        content: `// WMO Weather interpretation codes
const WEATHER_CODES = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

function describeWeather(code) {
  return WEATHER_CODES[code] || "Unknown";
}`,
      },
      {
        type: "heading",
        content: "Step 4: Putting It All Together",
      },
      {
        type: "paragraph",
        content:
          "Now let us build a complete weather application that ties everything together. This version includes error handling, formatted output, and a clean user interface in the terminal. The same structure applies whether you are building a web app, mobile app, or CLI tool.",
      },
      {
        type: "code",
        language: "python",
        content: `import requests

WEATHER_CODES = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Foggy", 48: "Rime fog", 51: "Light drizzle", 53: "Moderate drizzle",
    55: "Dense drizzle", 61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
    71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow", 80: "Rain showers",
    81: "Moderate showers", 82: "Violent showers", 95: "Thunderstorm",
}

class WeatherApp:
    def __init__(self):
        self.session = requests.Session()
    
    def search(self, city_name):
        try:
            location = self._geocode(city_name)
            weather = self._get_weather(location)
            self._display(location, weather)
        except requests.ConnectionError:
            print("Error: Could not connect to the weather service.")
        except ValueError as e:
            print(f"Error: {e}")
        except Exception as e:
            print(f"Unexpected error: {e}")
    
    def _geocode(self, city_name):
        url = "https://geocoding-api.open-meteo.com/v1/search"
        res = self.session.get(url, params={"name": city_name, "count": 1})
        res.raise_for_status()
        data = res.json()
        if not data.get("results"):
            raise ValueError(f"City '{city_name}' not found")
        r = data["results"][0]
        return {"name": r["name"], "country": r.get("country", ""),
                "lat": r["latitude"], "lon": r["longitude"]}
    
    def _get_weather(self, loc):
        url = "https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": loc["lat"], "longitude": loc["lon"],
            "current": "temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code",
            "daily": "weather_code,temperature_2m_max,temperature_2m_min",
            "timezone": "auto", "forecast_days": 7,
        }
        res = self.session.get(url, params=params)
        res.raise_for_status()
        return res.json()
    
    def _display(self, location, weather):
        current = weather["current"]
        daily = weather["daily"]
        
        print(f"\\n{'=' * 40}")
        print(f"  Weather for {location['name']}, {location['country']}")
        print(f"{'=' * 40}")
        
        code = current["weather_code"]
        print(f"  Condition: {WEATHER_CODES.get(code, 'Unknown')}")
        print(f"  Temperature: {current['temperature_2m']}°C")
        print(f"  Humidity: {current['relative_humidity_2m']}%")
        print(f"  Wind: {current['wind_speed_10m']} km/h")
        
        print(f"\\n  7-Day Forecast:")
        print(f"  {'-' * 36}")
        for i, date in enumerate(daily["time"]):
            cond = WEATHER_CODES.get(daily["weather_code"][i], "Unknown")
            hi = daily["temperature_2m_max"][i]
            lo = daily["temperature_2m_min"][i]
            print(f"  {date}  {cond:20s}  {lo}°C - {hi}°C")
        print()

# Run the app
app = WeatherApp()
app.search("San Francisco")`,
      },
      {
        type: "heading",
        content: "Step 5: Building a Web Version",
      },
      {
        type: "paragraph",
        content:
          "For a web application, the logic is the same but the presentation layer changes. Here is a JavaScript version using fetch that you can drop into any frontend framework. The key difference is that all API calls are asynchronous, so you need to handle loading states and errors in the UI.",
      },
      {
        type: "code",
        language: "javascript",
        content: `async function getWeather(cityName) {
  // Step 1: Geocode the city name
  const geoRes = await fetch(
    \`https://geocoding-api.open-meteo.com/v1/search?name=\${encodeURIComponent(cityName)}&count=1\`
  );
  const geoData = await geoRes.json();
  
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(\`City "\${cityName}" not found\`);
  }
  
  const location = geoData.results[0];
  
  // Step 2: Fetch weather data
  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current: "temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "7",
  });
  
  const weatherRes = await fetch(
    \`https://api.open-meteo.com/v1/forecast?\${params}\`
  );
  const weather = await weatherRes.json();
  
  return { location, weather };
}

// UI integration
async function handleSearch(city) {
  try {
    document.getElementById("loading").style.display = "block";
    const { location, weather } = await getWeather(city);
    renderWeather(location, weather);
  } catch (error) {
    document.getElementById("error").textContent = error.message;
  } finally {
    document.getElementById("loading").style.display = "none";
  }
}`,
      },
      {
        type: "heading",
        content: "Next Steps and Improvements",
      },
      {
        type: "paragraph",
        content:
          "You now have a working weather app. Here are some ways to extend it. Add geolocation support using the browser Geolocation API to detect the user location automatically. Cache responses to avoid redundant API calls. Add unit conversion between Celsius and Fahrenheit. Display weather icons instead of text descriptions. Build an hourly forecast view using the hourly data endpoint.",
      },
      {
        type: "paragraph",
        content:
          "The Open-Meteo API also offers specialized endpoints for marine weather, air quality, and climate data. Explore the full API documentation to discover what else you can build. And check out the Weather category on FreeAPI Hub for alternative weather APIs with different features and coverage areas.",
      },
    ],
  },
  {
    slug: "free-vs-paid-apis-guide",
    title: "Free vs Paid APIs: When to Upgrade and What to Consider Before Paying",
    description:
      "Free APIs are great for prototypes, but production applications need reliability. Learn the key differences, hidden costs, and decision criteria for upgrading to paid API plans.",
    date: "Jun 1, 2026",
    readTime: "10 min",
    category: "API Development",
    tags: ["free api", "paid api", "api pricing", "production"],
    author: "FreeAPI Hub Team",
    content: [
      {
        type: "paragraph",
        content:
          "Every developer starts with free APIs. They are perfect for prototyping, learning, and side projects. But there comes a point in every project lifecycle where you have to decide: is the free tier enough, or do I need to pay? Making this decision too early wastes money. Making it too late risks your application reliability and user experience. This guide will help you identify the right moment to upgrade and what factors to consider.",
      },
      {
        type: "heading",
        content: "The Real Differences Between Free and Paid APIs",
      },
      {
        type: "paragraph",
        content:
          "The difference between free and paid APIs is not just request volume. Free APIs often have structural limitations that affect how you build your application. Understanding these differences helps you plan your architecture accordingly.",
      },
      {
        type: "paragraph",
        content:
          "Rate limits are the most obvious difference. A free API might allow 100 requests per minute while the paid tier allows 1,000. But rate limits are just the surface. Free tiers often lack service level agreements, meaning the provider guarantees nothing about uptime or response time. If the API goes down for 6 hours, you have no recourse. Paid tiers typically include SLAs of 99.5 percent or higher.",
      },
      {
        type: "list",
        items: [
          "Rate limits: Free tiers typically offer 100-1,000 calls/day, paid tiers offer 10,000+ or unlimited",
          "Uptime guarantees: Free APIs have no SLA, paid tiers often guarantee 99.5-99.99 percent uptime",
          "Support: Free APIs usually offer community support only, paid tiers include email or chat support",
          "Data freshness: Free tiers may serve cached data with delays, paid tiers offer real-time data",
          "Features: Advanced features like webhooks, bulk exports, and custom integrations are often paid-only",
          "Historical data: Free APIs may limit historical data access to 7-30 days, paid tiers offer years",
        ],
      },
      {
        type: "heading",
        content: "Signs You Have Outgrown the Free Tier",
      },
      {
        type: "paragraph",
        content:
          "The transition from free to paid is rarely a single moment. It is a gradual process where the free tier becomes increasingly painful. Here are the specific signs that indicate it is time to upgrade. If you are experiencing two or more of these, start evaluating paid options.",
      },
      {
        type: "paragraph",
        content:
          "First, you are regularly hitting rate limits. If you see 429 errors more than once a week, your application has grown beyond what the free tier supports. Each rate limit hit is a degraded user experience. Second, your users are complaining about stale data. If your app shows weather from 3 hours ago when competitors show current conditions, the free tier cache delay is hurting you.",
      },
      {
        type: "paragraph",
        content:
          "Third, you are spending significant development time working around free tier limitations. Building complex caching layers, request queues, and fallback mechanisms to stay within rate limits is engineering effort that could go toward features. When the workarounds become more complex than the core feature, it is time to pay.",
      },
      {
        type: "callout",
        title: "Rule of Thumb",
        content:
          "If you are spending more than 2 hours per week managing rate limit workarounds, the cost of a paid plan is almost certainly less than the cost of your time.",
      },
      {
        type: "heading",
        content: "Hidden Costs of Free APIs",
      },
      {
        type: "paragraph",
        content:
          "Free APIs have costs that do not appear on a pricing page. The most significant is reliability risk. A free API can be shut down or significantly changed with minimal notice. If your application depends on it, you face emergency migration work. This risk increases when the API is provided as a side project rather than a core product of a company.",
      },
      {
        type: "paragraph",
        content:
          "Development time is another hidden cost. Free APIs often have poorer documentation, fewer code examples, and no SDKs. Your team spends extra time figuring out edge cases and writing custom integration code. Over a few months, this time cost can exceed the price of a paid API with better tooling.",
      },
      {
        type: "paragraph",
        content:
          "Data quality is a subtle but important cost. Free APIs may serve less accurate data, update less frequently, or have gaps in coverage. If your application makes decisions based on API data, inaccuracies propagate into your product. A currency conversion app using a free API with 1-hour delayed rates might lose users to a competitor using a real-time paid feed.",
      },
      {
        type: "heading",
        content: "How to Evaluate Paid API Plans",
      },
      {
        type: "paragraph",
        content:
          "When comparing paid API plans, look beyond the price per call. The cheapest plan is not always the best value. Consider the total cost of ownership including development time, reliability impact, and feature availability.",
      },
      {
        type: "code",
        language: "javascript",
        content: `// Framework for evaluating API pricing
function evaluateApiPlan(plan, requirements) {
  const score = {
    rateLimit: 0,
    reliability: 0,
    support: 0,
    features: 0,
    cost: 0,
  };
  
  // Rate limit: does it cover your peak with 2x margin?
  if (plan.rateLimit >= requirements.peakRpm * 2) score.rateLimit = 25;
  else if (plan.rateLimit >= requirements.peakRpm) score.rateLimit = 15;
  else score.rateLimit = 0;
  
  // Reliability: SLA percentage
  score.reliability = (plan.sla || 95) - 95; // 95% baseline, 99.99% = ~5 points
  
  // Support: response time
  if (plan.supportResponseTime === "24h") score.support = 10;
  else if (plan.supportResponseTime === "48h") score.support = 5;
  else score.support = 0;
  
  // Features: how many required features are included?
  const featureMatch = requirements.features.filter(
    f => plan.features.includes(f)
  ).length;
  score.features = (featureMatch / requirements.features.length) * 30;
  
  // Cost: lower is better, scaled
  if (plan.monthlyPrice === 0) score.cost = 20;
  else if (plan.monthlyPrice < 50) score.cost = 15;
  else if (plan.monthlyPrice < 200) score.cost = 10;
  else score.cost = 5;
  
  const total = Object.values(score).reduce((a, b) => a + b, 0);
  return { score: total, breakdown: score };
}`,
      },
      {
        type: "heading",
        content: "Negotiating Better Rates",
      },
      {
        type: "paragraph",
        content:
          "API pricing is often more flexible than it appears. If you are a startup or open source project, many API providers offer discounts or extended free tiers. Reach out to their sales team and explain your use case. You would be surprised how often they offer a better deal than the listed pricing.",
      },
      {
        type: "paragraph",
        content:
          "Volume discounts are standard. If you expect to use more than the highest listed tier, ask about enterprise pricing. Per-call costs often drop by 50 percent or more at higher volumes. Also ask about annual billing discounts, which typically save 10-20 percent compared to monthly billing.",
      },
      {
        type: "heading",
        content: "The Hybrid Approach: Using Both Free and Paid",
      },
      {
        type: "paragraph",
        content:
          "You do not have to choose all or nothing. A common pattern is to use free APIs for non-critical features and paid APIs for core functionality. For example, a travel app might use a free weather API for background information while paying for a flights API that drives bookings. This approach optimizes cost while maintaining reliability where it matters.",
      },
      {
        type: "paragraph",
        content:
          "Another hybrid strategy is using a free API as the primary source with a paid API as fallback. If the free API is rate limited or down, requests fall through to the paid API. This gives you the cost savings of the free tier with the reliability of the paid tier. The implementation is straightforward using a circuit breaker pattern.",
      },
      {
        type: "code",
        language: "python",
        content: `import time

class ApiFallback:
    """Use free API first, fall back to paid API on failure."""
    
    def __init__(self, free_api, paid_api, failure_threshold=5):
        self.free_api = free_api
        self.paid_api = paid_api
        self.failures = 0
        self.threshold = failure_threshold
        self.circuit_open = False
        self.circuit_reset = 0
    
    def call(self, endpoint, params):
        # If circuit is open, go straight to paid API
        if self.circuit_open:
            if time.time() > self.circuit_reset:
                self.circuit_open = False
                self.failures = 0
            else:
                return self.paid_api.call(endpoint, params)
        
        # Try free API first
        try:
            result = self.free_api.call(endpoint, params)
            self.failures = 0
            return result
        except Exception:
            self.failures += 1
            if self.failures >= self.threshold:
                self.circuit_open = True
                self.circuit_reset = time.time() + 300  # 5 min cooldown
            # Fall back to paid API
            return self.paid_api.call(endpoint, params)`,
      },
      {
        type: "heading",
        content: "Making the Decision",
      },
      {
        type: "paragraph",
        content:
          "The decision to upgrade from free to paid should be data-driven. Track your API usage, error rates, and the time spent managing free tier limitations. When the cost of staying free, measured in development time, user churn, and reliability risk, exceeds the price of a paid plan, it is time to upgrade.",
      },
      {
        type: "paragraph",
        content:
          "Start with the cheapest paid tier that covers your current needs with 50 percent headroom. You can always upgrade further as your application grows. And remember that FreeAPI Hub catalogs both free and freemium APIs, so you can compare options and pricing across providers before making a commitment.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return BLOG_ARTICLES.map((article) => article.slug);
}
