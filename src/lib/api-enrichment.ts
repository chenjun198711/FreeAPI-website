/**
 * Hand-curated enrichment content for popular API detail pages.
 *
 * This addresses the AdSense "templated / low-value content" risk (audit
 * finding CNT-03) by giving the top-traffic API pages information that is
 * genuinely different from the boilerplate integration guide:
 *   - API-specific highlights (not generated from category)
 *   - Real rate limits / quotas (where publicly documented)
 *   - Known pitfalls that only apply to this API
 *   - Comparison with sibling APIs in the same category
 *   - A truncated real sample response
 *   - Pro tips
 *
 * Long-tail pages keep the existing template; these ~37 pages now carry
 * meaningfully higher information density.
 */

export interface ApiEnrichment {
  /** A unique one-liner, different from the boilerplate description. */
  tagline?: string;
  /** API-specific unique features (not category-derived). */
  highlights?: string[];
  /** Publicly documented rate limits / quotas. */
  rateLimits?: string;
  /** Known pitfalls that only apply to this API. */
  knownIssues?: string[];
  /** Brief comparison with sibling APIs in the same category. */
  comparison?: string;
  /** A truncated but realistic sample response. */
  sampleResponse?: string;
  /** Pro tips specific to this API. */
  tips?: string[];
}

export const API_ENRICHMENT: Record<string, ApiEnrichment> = {
  // ───────────────────────────── Animals ─────────────────────────────
  "cat-facts-2-animals": {
    tagline: "The simplest free cat facts endpoint — one GET, JSON in, fact out.",
    highlights: [
      "Single endpoint: GET /fact returns one random cat fact as JSON",
      "Optional ?count parameter returns up to 100 facts in one request",
      "No signup, no key, no Referer header required",
    ],
    rateLimits: "No published hard limit; the host (catfact.ninja) is a small Laravel app and will 429 under abusive polling. Treat as ~1 req/sec polite usage.",
    knownIssues: [
      "The fact corpus is small (~300 facts); you will see repeats after a few thousand requests",
      "No category/tag filtering — you cannot request only science or history facts",
    ],
    comparison: "Compared to cat-facts-animals (alexwohlbruck), this endpoint is more reliable and returns JSON directly, while the older one often returns 503.",
    sampleResponse: `{
  "fact": "Cats make about 100 different sounds. Dogs make only about 10.",
  "length": 46
}`,
    tips: [
      "Use ?count=N to batch-fetch facts and cache them client-side rather than polling every page load",
      "The 'length' field is the character count of 'fact' — handy for UI truncation",
    ],
  },
  "dogs-animals": {
    tagline: "Stanford Dogs Dataset served as a free REST API by dog.ceo.",
    highlights: [
      "Returns image URLs for 98+ recognized breeds and sub-breeds",
      "GET /breeds/list/all returns the full breed → sub-breed map in one call",
      "GET /breed/{breed}/images/random for a single random image, or /random/N for a batch",
    ],
    rateLimits: "No auth, no documented rate limit; dog.ceo runs on a donated VPS and will rate-limit obvious abuse. Keep polling under 1 req/sec.",
    knownIssues: [
      "Some sub-breed image pools are tiny (under 10 images); you'll see repeats quickly for rarer breeds",
      "The API returns image URLs hosted on dog.ceo's CDN — do not hotlink in high-traffic apps without caching",
      "Occasional 524 timeouts during peak hours; retry with backoff",
    ],
    comparison: "The most complete free dog image API. randomdog-animals serves fewer breeds but higher-resolution files; placedog-animals is a placeholder service with no breed control.",
    sampleResponse: `{
  "message": "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
  "status": "success"
}`,
    tips: [
      "Cache /breeds/list/all once per day — the breed list rarely changes",
      "Use /random/50 to pre-fetch a batch and serve from your own cache",
    ],
  },
  "dog-facts-2-animals": {
    tagline: "Kinduff's Dog API — random dog facts with tag filtering.",
    highlights: [
      "GET /facts returns one or more facts; ?number=N controls the count",
      "Optional ?raw=true returns a plain array instead of the wrapped object",
      "Source corpus is community-curated on GitHub",
    ],
    rateLimits: "Hosted on GitHub Pages behind Fastly; effectively unlimited for normal use, but don't use it as a hot-path data source.",
    knownIssues: [
      "GitHub Pages can take a few minutes to propagate corpus edits",
      "No language parameter — facts are English only",
    ],
    comparison: "Has more facts than dog-facts-animals (dukengn) and supports the raw array output mode, which is easier for direct rendering.",
    sampleResponse: `{
  "success": true,
  "facts": [
    "Dogs have a sense of time. They can tell how long you've been gone."
  ]
}`,
    tips: ["Fetch ?number=50 once and rotate through the array locally to avoid repeated network calls"],
  },
  "http-cat-animals": {
    tagline: "A cat photo for every HTTP status code, 100 through 599.",
    highlights: [
      "GET /{status} returns the cat image for that HTTP status",
      "Images are served directly (not JSON), so you can use the URL in <img src>",
      "Covers the full IANA HTTP status code registry",
    ],
    rateLimits: "No published limit; the service is static image hosting backed by a CDN.",
    knownIssues: [
      "Not all status codes have a unique image — some 5xx codes share artwork",
      "The domain http.cat is sometimes blocked by aggressive corporate proxies",
    ],
    comparison: "Sibling to http-dog-animals. The cat version has wider status code coverage; the dog version has fresher artwork for newer codes like 451.",
    sampleResponse: `HTTP/1.1 200 OK
Content-Type: image/jpeg

<binary JPEG image for HTTP 200>`,
    tips: [
      "Great for 404/500 error pages: <img src=\"https://http.cat/404\">",
      "Prefer the HTTPS endpoint; the HTTP variant redirects and adds latency",
    ],
  },
  "http-dog-animals": {
    tagline: "HTTP status codes illustrated with dogs — drop-in <img> source.",
    highlights: [
      "GET /{status} or /{status}.jpg returns the dog image for that code",
      "GET /api/list returns JSON of all covered status codes",
      "All assets served over HTTPS with permissive CORS",
    ],
    rateLimits: "No published limit; static CDN-backed hosting.",
    knownIssues: [
      "Newer status codes (e.g. 103, 425, 511) may not have artwork yet",
      "The .jpg extension is optional but some proxies cache differently with/without it",
    ],
    comparison: "Companion to http-cat-animals. Use both and let users pick — they have identical URL shapes.",
    sampleResponse: `HTTP/1.1 200 OK
Content-Type: image/jpeg

<binary JPEG image for HTTP 200>`,
    tips: ["Use https://http.dog/{status} directly in <img> tags — no fetch needed"],
  },
  "randomdog-animals": {
    tagline: "Random dog pictures in JSON, MP4, GIF, or JPEG — your call.",
    highlights: [
      "GET /woof.json returns { url, fileSize, fileType }",
      "Supports ?filter=mp4|gif|jpg|webm to restrict file type",
      "Includes the file size in bytes for prefetch budgeting",
    ],
    rateLimits: "No published limit; the backend is a single volunteer-hosted server, so be polite (~1 req/sec).",
    knownIssues: [
      "Some responses are MP4 videos, not images — check fileType before rendering in <img>",
      "Occasional 5xx errors during European nighttime maintenance windows",
    ],
    comparison: "Higher-resolution files than dogs-animals but no breed filtering. Pair with dog.ceo for breed control and random.dog for variety.",
    sampleResponse: `{
  "url": "https://random.dog/af0603a1-5e20-4b8c-bc33-3a4ee8f7b51e.mp4",
  "fileSizeBytes": 2841151,
  "fileType": "mp4"
}`,
    tips: ["Always branch on fileType: render <video> for mp4/webm, <img> for jpg/gif/png"],
  },
  "shibe-online-animals": {
    tagline: "Shiba Inu, cat, and bird photos from a single endpoint.",
    highlights: [
      "GET /shibes, /cats, or /birds returns an array of image URLs",
      "?count=N controls batch size (default 1, max 100)",
      "?urls=true&httpsUrls=true forces HTTPS URLs",
    ],
    rateLimits: "Backed by a Cloudflare worker; effectively unlimited for normal use.",
    knownIssues: [
      "The shibe image pool is larger than the cat/bird pools",
      "Some older image URLs use http:// — always pass httpsUrls=true",
    ],
    comparison: "The only free API that bundles Shibas, cats, and birds behind one host. For breed-specific dog images use dogs-animals.",
    sampleResponse: `[
  "https://cdn.shibe.online/shibes/67cf8d30b1cf6ec2f9f5d4f0b5a2ef2ef8ec6fb4.jpg"
]`,
    tips: ["Pass ?count=100&urls=true&httpsUrls=true to pre-warm a local cache"],
  },
  "placebear-animals": {
    tagline: "Placeholder bear photos for wireframes and prototypes.",
    highlights: [
      "GET /{width}/{height} returns a bear photo of that exact size",
      "GET /{width}/{height}?grayscale returns a desaturated version",
      "Images are served from a static CDN — no JSON, no key",
    ],
    rateLimits: "No published limit; static image hosting.",
    knownIssues: [
      "The photo pool is small (~20 bears); you will see repeats in grids",
      "No tag or category filtering — you get whatever bear the server picks",
    ],
    comparison: "Like placekitten and placedog but with bears. All three have the same URL shape and can be swapped freely.",
    sampleResponse: `HTTP/1.1 200 OK
Content-Type: image/jpeg

<binary JPEG, e.g. 600x400 bear photo>`,
    tips: ["Use directly in <img src=\"https://placebear.com/640/360\"> — no fetch needed"],
  },
  "placekitten-animals": {
    tagline: "The original placeholder-kitten service — still works after 10+ years.",
    highlights: [
      "GET /{width}/{height} returns a kitten photo cropped to those dimensions",
      "Append /g/ for grayscale: /g/640/480",
      "Pure image response, no JSON, no auth",
    ],
    rateLimits: "No published limit; static legacy hosting.",
    knownIssues: [
      "Very small photo pool — you'll see the same kittens repeatedly",
      "Occasionally goes offline for maintenance; don't use as a critical-path image source",
    ],
    comparison: "Older and less reliable than placebear/placedog, but the most widely recognized placeholder service.",
    sampleResponse: `HTTP/1.1 200 OK
Content-Type: image/jpeg

<binary JPEG, e.g. 320/240 kitten photo>`,
    tips: ["Great for quick demos; swap to placebear or placedog if you hit downtime"],
  },
  "placedog-animals": {
    tagline: "Placeholder dog photos with optional grayscale filter.",
    highlights: [
      "GET /{width}/{height} returns a random dog photo at that size",
      "?grayscale strips color",
      "Served over HTTPS with permissive CORS",
    ],
    rateLimits: "No published limit; static image hosting.",
    knownIssues: [
      "Photo pool is modest (~30 images)",
      "No breed filtering — for breed control use dogs-animals instead",
    ],
    comparison: "Equivalent to placebear and placekitten but with dogs. The three services are interchangeable by domain.",
    sampleResponse: `HTTP/1.1 200 OK
Content-Type: image/jpeg

<binary JPEG, e.g. 800/600 dog photo>`,
    tips: ["<img src=\"https://place.dog/800/600\"> — no fetch needed"],
  },

  // ───────────────────────────── Anime ─────────────────────────────
  "jikan-anime": {
    tagline: "Unofficial REST wrapper around the MyAnimeList database — anime, manga, characters.",
    highlights: [
      "GET /anime/{id} returns full MAL anime metadata (title, score, synopsis, studio)",
      "GET /anime/season/{year}/{season} lists every anime in a given season",
      "GET /anime?q={query}&limit=5 does fuzzy search by title",
      "Also covers manga, characters, people, clubs, and user lists",
    ],
    rateLimits: "3 requests/second, 60 requests/minute on the public jikan.moe host. Higher limits require self-hosting the Jikan v4 Docker image.",
    knownIssues: [
      "Jikan caches MAL responses; fresh data can take up to 24h to appear",
      "The public host is rate-limited — bursts get 429. Always retry with exponential backoff",
      "MyAnimeList outages propagate as 5xx from Jikan",
    ],
    comparison: "The most complete free anime API. AniAPI has a nicer schema but requires an OAuth token for most endpoints; Kitsu is more stable but slower to update.",
    sampleResponse: `{
  "data": {
    "mal_id": 1,
    "title": "Cowboy Bebop",
    "score": 8.75,
    "episodes": 26,
    "synopsis": "In the year 2071..."
  }
}`,
    tips: [
      "Self-host Jikan v4 via Docker if you need >60 req/min — it's the same code",
      "Use the sfw=true filter on search to exclude adult results in family apps",
    ],
  },
  "studio-ghibli-anime": {
    tagline: "Film, character, and location data from Studio Ghibli movies.",
    highlights: [
      "GET /films returns all Ghibli movies with release year, director, RT score",
      "GET /films/{id} for a single film; GET /people returns characters",
      "Cross-linked: each person entry lists the films they appear in",
    ],
    rateLimits: "No published limit; the legacy Heroku host may sleep on free dynos after inactivity — first request can take 5+ seconds.",
    knownIssues: [
      "The classic ghibliapi.herokuapp.com host is end-of-life; migrate to https://ghibliapi.vercel.app",
      "Catalog is frozen at ~22 films — does not include the most recent releases",
      "No images / posters — only text metadata",
    ],
    comparison: "The only free dedicated Ghibli API. For broader anime coverage use jikan-anime.",
    sampleResponse: `{
  "id": "58611129-2dbc-4a81-a72f-77ddfc1b1b49",
  "title": "My Neighbor Totoro",
  "director": "Hayao Miyazaki",
  "release_date": "1988",
  "rt_score": "93"
}`,
    tips: ["Point your client at the Vercel mirror — the Heroku host will be deprecated"],
  },
  "trace-moe-anime": {
    tagline: "Reverse-image search for anime — upload a screenshot, get the exact scene.",
    highlights: [
      "GET /search?url={image-url} or POST /search with multipart image upload",
      "Returns anime title, episode, timestamp, and a preview video of the matched scene",
      "Supports video file upload (up to 10MB) and base64 image cutout",
    ],
    rateLimits: "Free tier: 1 req/sec for search, 1 req/min for video preview. The free host is rate-limited by IP.",
    knownIssues: [
      "Accuracy drops sharply for fan art, redraws, and heavily cropped images",
      "The video preview endpoint is the slowest — only call it for confirmed matches",
      "Adult content is included by default; pass ?anilist_info=true and filter adult=true",
    ],
    comparison: "Unique — no other free API does anime scene reverse search. Pair with jikan-anime to enrich the matched title.",
    sampleResponse: `{
  "result": [
    {
      "anilist_id": 1,
      "filename": "[Group] Show - 01.mkv",
      "episode": 1,
      "from": 1234.56,
      "to": 1236.78,
      "similarity": 0.92
    }
  ]
}`,
    tips: ["Crop the screenshot to the main subject before uploading — it dramatically improves accuracy"],
  },

  // ───────────────────────────── Art & Design ─────────────────────────────
  "artic-edu-art--design": {
    tagline: "The Art Institute of Chicago's public collection API — 100k+ artworks.",
    highlights: [
      "GET /artworks returns paginated artwork records with artist, date, medium",
      "GET /artworks/{id} includes image_id for fetching IIIF tiles",
      "GET /artworks/search?q={query} supports Elasticsearch-style queries with full-text matching",
      "All artwork images are licensed under CC0 for public use",
    ],
    rateLimits: "No hard rate limit, but the API asks for polite usage (~1 req/sec). Search queries are capped at 100 results per page, max 1000 total per query.",
    knownIssues: [
      "The image_url field requires constructing a IIIF URL from the config endpoint — it's not a direct path",
      "Some records have null image_id because of copyright restrictions on the underlying artwork",
      "Pagination uses cursor-based links, not simple page numbers",
    ],
    comparison: "Smaller than the Met's API but better image licensing (CC0 vs the Met's mixed licenses). Use the Met for breadth, the Art Institute for clean licensing.",
    sampleResponse: `{
  "data": [
    {
      "id": 129884,
      "title": "The Bedroom",
      "artist_title": "Vincent van Gogh",
      "date_display": "1889",
      "image_id": "e9667997-7e3b-4d4e-a8ac-3c6b1c3b7c5f"
    }
  ]
}`,
    tips: [
      "Fetch /iiif/manifests/{id} to get a IIIF presentation manifest for deep-zoom viewers",
      "Cache the config endpoint once per session — the IIIF base URL rarely changes",
    ],
  },
  "metropolitan-museum-of-art-art--design": {
    tagline: "The Met's open-access API — 470k+ objects across all curatorial departments.",
    highlights: [
      "GET /objects returns all object IDs (paginated, 1000 per page)",
      "GET /objects/{objectID} returns full metadata: artist, period, medium, dimensions",
      "GET /search?q={query} returns matching object IDs sorted by relevance",
      "All CC0 images are directly downloadable via primaryImage URLs",
    ],
    rateLimits: "Documented limit: 80 requests/second. The API is hosted on Azure and is generally very stable.",
    knownIssues: [
      "isPublicDomain=true doesn't always mean the primaryImage is non-empty — check both",
      "Object IDs are not contiguous; don't assume ID+1 is the next object",
      "Search relevance is basic — combine with department filter for better results",
    ],
    comparison: "The largest free museum API by collection size (~470k objects). The Art Institute of Chicago API is smaller (~100k) but has cleaner IIIF support.",
    sampleResponse: `{
  "objectID": 45734,
  "title": "The Great Wave off Kanagawa",
  "artistDisplayName": "Katsushika Hokusai",
  "objectDate": "1830–32",
  "primaryImage": "https://images.metmuseum.org/CRDImages/...",
  "isPublicDomain": true
}`,
    tips: ["Use ?hasImages=true on /search to filter out records without images"],
  },
  "emoji-hub-art--design": {
    tagline: "Random emoji by category or group — JSON, no auth.",
    highlights: [
      "GET /api/random returns a single random emoji with name and unicode",
      "GET /api/all returns the full catalog; filter by ?category=smileys-and-people",
      "Each entry includes the markdown shortcode and HTML entity",
    ],
    rateLimits: "Hosted on Vercel behind Fastly; no published limit but be polite.",
    knownIssues: [
      "The catalog is frozen at the Unicode version current when the API was published; new emoji (Unicode 15+) may be missing",
      "Some categories overlap with groups — read the schema carefully",
    ],
    comparison: "Simpler than maintaining your own emoji JSON. For full Unicode coverage use the emoji-data NPM package instead.",
    sampleResponse: `{
  "name": "grinning face",
  "category": "Smileys & Emotion",
  "group": "Smileys & Emotion",
  "htmlCode": ["&#128512;"],
  "unicode": ["U+1F600"]
}`,
    tips: ["Fetch /api/all once at app boot and pick locally — no need to call /random repeatedly"],
  },
  "icon-horse-art--design": {
    tagline: "Favicon fetching with sensible fallbacks — never return a broken image.",
    highlights: [
      "GET /{domain} returns that site's favicon, falling back to a generated letter-icon",
      "GET /{domain}?larger=true fetches the highest-resolution icon available",
      "Handles apple-touch-icon, fluid-icon, and manifest icons automatically",
    ],
    rateLimits: "No published limit; the service caches aggressively so most responses are served from CDN.",
    knownIssues: [
      "The fallback letter-icon uses the domain's TLD color, which may clash with your theme",
      "Internal/intranet domains (no public DNS) always fall back",
    ],
    comparison: "More reliable than Google's S2 favicon service (which is deprecated) and produces nicer fallbacks than pure DNS-based favicons.",
    sampleResponse: `HTTP/1.1 200 OK
Content-Type: image/png

<binary PNG favicon>`,
    tips: ["Use <img src=\"https://icon.horse/icon/freeapihub.cc\"> — the /icon/ prefix also works"],
  },

  // ───────────────────────────── Books ─────────────────────────────
  "bible-api-books": {
    tagline: "Free Bible passages as JSON — KJV and WEB translations, no auth.",
    highlights: [
      "GET /john/3:16 returns the verse as JSON with translation reference",
      "GET /john/3:16-18 returns a range of verses in one call",
      "Supports ?translation=web to switch from the default KJV to the World English Bible",
    ],
    rateLimits: "No published hard limit; hosted on Cloudflare Workers, effectively unlimited for polite use.",
    knownIssues: [
      "Only two translations are available: KJV (default) and WEB",
      "Verse ranges spanning chapters need a single reference like john/3:16-4:3, not two calls",
      "Apocryphal books are not included",
    ],
    comparison: "The simplest free Bible JSON API. For more translations use bolls.life or the Faithlife Reveal API, both of which require keys.",
    sampleResponse: `{
  "reference": "John 3:16",
  "verses": [
    {
      "book_id": "JHN",
      "book_name": "John",
      "chapter": 3,
      "verse": 16,
      "text": "For God so loved the world..."
    }
  ],
  "translation_id": "kjv",
  "translation_name": "King James Version"
}`,
    tips: ["Cache full chapters locally; verse-level calls add up quickly at scale"],
  },
  "quran-cloud-books": {
    tagline: "RESTful Quran API — Ayah, Surah, Juz, or the entire Holy Quran.",
    highlights: [
      "GET /surah returns metadata for all 114 surahs",
      "GET /surah/{number} returns the full surah with Arabic text",
      "GET /ayah/{reference}/editions/quran-uthmani,en.asad supports multi-edition parallel fetch",
      "50+ translations and 5+ audio recitations available",
    ],
    rateLimits: "No published hard limit; hosted on AWS, generally responsive. Avoid bursts of >10 req/sec.",
    knownIssues: [
      "Audio file URLs are large MP3s; stream them rather than buffering",
      "Some translation editions are incomplete — always check the 'number_of_ayahs' field",
    ],
    comparison: "More comprehensive than quran-api-books (fawazahmed0) which focuses on translation breadth. Use alquran.cloud for Arabic + audio, fawazahmed0 for 90+ language translations.",
    sampleResponse: `{
  "code": 200,
  "data": {
    "number": 1,
    "name": "الفاتحة",
    "englishName": "Al-Faatiha",
    "ayahs": [
      { "number": 1, "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" }
    ]
  }
}`,
    tips: ["Use the editions parameter to fetch Arabic + translation in a single call"],
  },
  "poetrydb-books": {
    tagline: "Full-text poetry corpus searchable by author, title, or line.",
    highlights: [
      "GET /author returns the list of all indexed poets",
      "GET /title/{title}/author/{author} does scoped lookup",
      "GET /line/{query} does full-text search across all poem lines",
    ],
    rateLimits: "No published limit; hosted on a volunteer server, keep usage polite (~1 req/sec).",
    knownIssues: [
      "The corpus is predominantly English-language public-domain poetry",
      "Search is exact substring — no fuzzy matching or stemming",
      "Some responses are very large (full poems); set a sane response size cap in your client",
    ],
    comparison: "Unique — no other free API exposes a full-text poetry corpus. Combine with poetry-foundation data for richer metadata.",
    sampleResponse: `{
  "title": "Ozymandias",
  "author": "Percy Bysshe Shelley",
  "lines": [
    "I met a traveller from an antique land",
    "Who said—\"Two vast and trunkless legs of stone..."
  ]
}`,
    tips: ["Add .json to any endpoint to force JSON; .text returns plain text"],
  },
  "wizard-world-books": {
    tagline: "Harry Potter universe data — wands, houses, spells, and the full character roster.",
    highlights: [
      "GET /Wizards returns all characters with house, blood status, and species",
      "GET /Spells returns the spell catalog with type and effect",
      "GET /Houses returns the four Hogwarts houses with traits and colors",
      "Cross-linked: each wizard entry includes a navigationProperty to their house",
    ],
    rateLimits: "No published limit; hosted on Heroku free tier — the dyno may sleep after 30 min of inactivity, so the first request can take 10+ seconds.",
    knownIssues: [
      "The Heroku free dyno is end-of-life; the host may be migrated or shut down without notice",
      "Catalog is frozen at the Fantastic Beasts era — no recent Wizarding World additions",
      "No images — text metadata only",
    ],
    comparison: "The only free dedicated Harry Potter API. For general book metadata use the Open Library API.",
    sampleResponse: `{
  "id": "...",
  "firstName": "Harry",
  "lastName": "Potter",
  "house": "Gryffindor",
  "wand": "Phoenix feather, 11 inches, holly",
  "bloodStatus": "Half-blood"
}`,
    tips: ["Cache the entire catalog at app start — it's small enough (~500 records) to keep in memory"],
  },

  // ───────────────────────────── Calendar ─────────────────────────────
  "nameday-calendar": {
    tagline: "Nameday data for 30+ countries — RESTful, no key.",
    highlights: [
      "GET /namedays?country=us&month=7&day=20 returns names celebrated on that day",
      "GET /today?country=gr returns today's Greek nameday",
      "Supports country codes: us, fr, de, gr, it, es, pl, ru, se, etc.",
    ],
    rateLimits: "No published hard limit; the host is a small VPS, keep polling under 1 req/sec.",
    knownIssues: [
      "Not every country has nameday data for every day of the year",
      "Country code is required — there is no global default",
    ],
    comparison: "The only free multilingual nameday API. For holiday data use the public-holidays-calendar (Nager.Date) API instead.",
    sampleResponse: `{
  "data": {
    "us": {
      "month": 7,
      "day": 20,
      "namedays": {
        "us": "Margaret, Rita"
      }
    }
  }
}`,
    tips: ["Fetch the whole year for a country once and cache — the data is static"],
  },
  "isdayoff-calendar": {
    tagline: "Working / non-working / short day lookup for Russia, CIS, USA, and more.",
    highlights: [
      "GET /api/getdate?date=20260101&cc=US returns 0 (working) or 1 (non-working)",
      "GET /api/getdata?month=7&year=2026&cc=RU returns a string of 31 digits, one per day",
      "Supports pre/post-holiday short-day detection via the sd=1 flag",
    ],
    rateLimits: "No published hard limit; the host is a small Russian VPS. Be polite (~1 req/sec).",
    knownIssues: [
      "Date format is YYYYMMDD with no separators — easy to typo",
      "Country codes follow a custom list (cc), not ISO 3166 — check the docs",
      "The API returns plain text '0' or '1', not JSON",
    ],
    comparison: "Covers Russia/CIS better than the public-holidays-calendar (Nager.Date) API, which focuses on EU/US. Use Nager for EU/US, IsDayOff for CIS.",
    sampleResponse: `1`,
    tips: ["Use the /getdata endpoint to fetch an entire month in one request and decode the digit string"],
  },

  // ───────────────────────────── Cloud Storage ─────────────────────────────
  "pantry-cloud-storage--file-sharing": {
    tagline: "Free JSON storage for small projects — a key-value pantry in the cloud.",
    highlights: [
      "POST /apiv1/pantry/{pantry_id} creates a basket; GET retrieves it",
      "Each pantry supports multiple named baskets with arbitrary JSON payloads",
      "Free tier: 100MB storage, 100 req/min",
    ],
    rateLimits: "100 requests per minute on the free tier; 10,000 requests per day. Baskets expire after 30 days of inactivity.",
    knownIssues: [
      "Pantry IDs are long UUIDs — losing the ID means losing access to the data",
      "No auth beyond the pantry ID itself — anyone with the ID can read/write",
      "Baskets are auto-deleted after 30 days without a GET or POST",
    ],
    comparison: "Simpler than jsonbin.io (which requires an API key). Use Pantry for ephemeral project state, not for anything sensitive.",
    sampleResponse: `{
  "name": "My Pantry",
  "percentFull": 0.01,
  "baskets": [
    { "name": "config", "ttl": 2592000 }
  ]
}`,
    tips: ["Never store secrets in a Pantry — the ID is the only auth. Use it for client-side config or demo state."],
  },

  // ───────────────────────────── Cryptocurrency ─────────────────────────────
  "0x-cryptocurrency": {
    tagline: "DEX liquidity aggregator — quote token swaps across 100+ liquidity pools.",
    highlights: [
      "GET /swap/v1/quote?sellToken=ETH&buyToken=USDC&sellAmount=1 returns a signed swap quote",
      "GET /permit2/quote supports EIP-712 gasless approvals via Permit2",
      "Aggregates Uniswap, Sushi, Curve, Balancer, and many more in one call",
    ],
    rateLimits: "Free tier: 100 req/min per IP on api.0x.org. Higher limits require a 0x API key.",
    knownIssues: [
      "Quotes are point-in-time — gas and prices move fast; submit the transaction within ~30 seconds",
      "The free RPC has no SLA; for production use a paid key or self-host the 0x mesh",
      "Some token pairs return no quote if no pool has enough liquidity",
    ],
    comparison: "The leading free DEX aggregator API. 1inch has wider coverage but requires an API key and OAuth flow; Paraswap is similar but with stricter rate limits.",
    sampleResponse: `{
  "chainId": 1,
  "price": "3245.12",
  "guaranteedPrice": "3240.00",
  "to": "0x88ad0951...",
  "data": "0x...",
  "value": "0",
  "gas": "180000",
  "sellToken": "ETH",
  "buyToken": "USDC"
}`,
    tips: ["Always verify the guaranteedPrice — that's the worst-case execution price with slippage"],
  },
  "coingecko-cryptocurrency": {
    tagline: "Free crypto price, market, and social data — 10k+ coins, no key required.",
    highlights: [
      "GET /coins/markets?vs_currency=usd returns top coins by market cap",
      "GET /coins/{id} returns full metadata: links, community stats, tickers",
      "GET /simple/price?ids=bitcoin,ethereum&vs_currencies=usd is the lightest price endpoint",
      "Demo API key (free) raises the limit from 30/min to 50/min",
    ],
    rateLimits: "Demo tier (no key): 30 req/min, ~10k req/month. Pro tier (paid): 500 req/min with higher monthly caps.",
    knownIssues: [
      "The /coins/{id}/market_chart endpoint now requires a demo key on the public host",
      "Coin IDs are not the symbol — 'bitcoin' not 'BTC'; always map via /coins/list first",
      "Public host can 429 under burst traffic; cache aggressively",
    ],
    comparison: "The most popular free crypto API by usage. Coinpaprika has cleaner data modeling but a smaller free tier; CoinRanking requires a key for everything useful.",
    sampleResponse: `{
  "bitcoin": { "usd": 67000.42 },
  "ethereum": { "usd": 3521.18 }
}`,
    tips: [
      "Always pass vs_currencies as an array: vs_currencies=usd,eur,gbp",
      "Use the demo API key (free signup) to dodge the 30/min ceiling",
    ],
  },
  "coinpaprika-cryptocurrency": {
    tagline: "Crypto prices, volume, and exchange data — well-modeled REST API.",
    highlights: [
      "GET /tickers returns market data for all coins, paginated",
      "GET /coins/{coin_id}/markets lists exchanges that trade the coin",
      "GET /people/{person_id} returns founder/team member bios",
      "Strong schema with consistent field names across endpoints",
    ],
    rateLimits: "Free tier: 20,000 calls/month, 50 calls/minute. No key required for basic endpoints but a free key raises the cap.",
    knownIssues: [
      "Coin IDs use the format 'btc-bitcoin' (slug-symbol), not the raw symbol",
      "Some endpoints (e.g. /exchanges) are restricted to paid plans",
    ],
    comparison: "Cleaner schema than CoinGecko but smaller free tier (20k vs 10k+). Use Coinpaprika when you need exchange mapping, CoinGecko for breadth.",
    sampleResponse: `{
  "id": "btc-bitcoin",
  "name": "Bitcoin",
  "symbol": "BTC",
  "rank": 1,
  "quotes": {
    "USD": { "price": 67000.42, "market_cap": 1320000000000 }
  }
}`,
    tips: ["Fetch /tickers once per minute — the data is cached server-side and faster than per-coin calls"],
  },

  // ───────────────────────────── Currency Exchange ─────────────────────────────
  "currency-api-currency-exchange": {
    tagline: "150+ currency rates, no rate limits, served from GitHub Pages / jsDelivr CDN.",
    highlights: [
      "GET /v1/latest/{from}.json returns all rates from a base currency",
      "GET /v1/historical/{date}/{from}.json returns historical rates",
      "Files are static JSON hosted on jsDelivr CDN — effectively unlimited, no key",
      "150+ currencies including obscure ones like South Sudanese Pound",
    ],
    rateLimits: "No published limit; the data is served from CDN edge caches. Treat as unlimited for normal use.",
    knownIssues: [
      "Rates are end-of-day snapshots, not real-time FX",
      "Historical data starts from 2022-01-01 for most currencies",
      "The 'latest' file can lag by up to 24 hours depending on CDN cache",
    ],
    comparison: "More reliable than exchangerate.host (now behind a paid key) and broader than frankfurter.app. The CDN-hosted model means it never rate-limits you.",
    sampleResponse: `{
  "date": "2026-07-19",
  "usd": {
    "eur": 0.92,
    "gbp": 0.78,
    "jpy": 149.50
  }
}`,
    tips: [
      "Use the jsDelivr mirror URL for best latency: cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json",
      "Cache the latest file for 1 hour — the source only updates daily",
    ],
  },
  "vatcomply-com-currency-exchange": {
    tagline: "FX rates plus VAT compliance helpers in one small API.",
    highlights: [
      "GET /rates?base=USD returns exchange rates with a date stamp",
      "GET /rates?base=USD&date=2026-01-01 fetches historical rates",
      "Also exposes /vat-rates and /countries for VAT compliance",
    ],
    rateLimits: "No published hard limit; the host is a small Rails app behind Cloudflare. Keep usage polite.",
    knownIssues: [
      "Rates are sourced from the ECB daily fix — not real-time FX",
      "Base currency must be one of ~30 ECB reference currencies",
    ],
    comparison: "Less breadth than currency-api-currency-exchange (fawazahmed0) but adds VAT lookup. Use fawazahmed0 for FX breadth, VATComply for tax compliance.",
    sampleResponse: `{
  "date": "2026-07-19",
  "base": "USD",
  "rates": {
    "EUR": 0.92,
    "GBP": 0.78,
    "JPY": 149.50
  }
}`,
    tips: ["Pair with /countries for VAT-aware pricing logic in e-commerce"],
  },

  // ───────────────────────────── Development ─────────────────────────────
  "agify-io-development": {
    tagline: "Predict a person's age from their first name — bulk supported.",
    highlights: [
      "GET /?name=alex returns predicted age plus a confidence count",
      "GET /?name=alex&country_id=US biases prediction by country",
      "Batch: GET /?name[]=alex&name[]=maria returns up to 100 in one call",
    ],
    rateLimits: "Free tier: 1000 req/day, no key required. Higher limits require a paid plan.",
    knownIssues: [
      "Accuracy is country-dependent; some countries have noisier name-age distributions",
      "Rare names return count=0 and age=null — always handle that branch",
      "Names are case-insensitive but non-Latin scripts may be rejected",
    ],
    comparison: "Sibling to genderize-io. Both are made by the same team and have the same free-tier limits. Combine for age + gender prediction.",
    sampleResponse: `{
  "name": "alex",
  "age": 32,
  "count": 12345
}`,
    tips: ["Use batched ?name[]=... to stretch the daily quota — 1 call can cover 100 names"],
  },
  "genderize-io-development": {
    tagline: "Estimate gender from a first name, with country bias.",
    highlights: [
      "GET /?name=alex returns gender plus probability",
      "GET /?name=alex&country_id=FR biases prediction by country",
      "Batch: GET /?name[]=alex&name[]=kim returns up to 100 in one call",
    ],
    rateLimits: "Free tier: 1000 req/day, no key required. Paid plans raise the daily cap.",
    knownIssues: [
      "Gender is binary in the response — the API doesn't model non-binary names",
      "Probability below ~0.7 means the name is ambiguous; treat as unknown",
      "Some countries return null for most names due to sparse data",
    ],
    comparison: "Sibling to agify-io. Same team, same free-tier limits, same API shape. Pair them for age + gender.",
    sampleResponse: `{
  "name": "alex",
  "gender": "male",
  "probability": 0.87,
  "count": 12345
}`,
    tips: ["Cache results by name — the underlying distribution barely changes month to month"],
  },

  // ───────────────────────────── Geocoding ─────────────────────────────
  "rest-countries-geocoding": {
    tagline: "Country metadata for every nation — flags, currencies, languages, calling codes.",
    highlights: [
      "GET /all returns every country with full metadata",
      "GET /alpha/{code} looks up by ISO 3166-1 alpha-2/3 code",
      "GET /name/{name} does fuzzy search by country name (in any language)",
      "Field filtering via ?fields=name,capital,population reduces payload size",
    ],
    rateLimits: "No published hard limit; hosted on Cloudflare, effectively unlimited for polite use.",
    knownIssues: [
      "The v3.1 endpoint changed response shapes — pin to v3.1 to avoid surprises",
      "Some territories (e.g. Kosovo) have partial recognition and appear with caveats",
      "Filter with ?fields= to avoid the 250-country full payload when you only need one field",
    ],
    comparison: "The de-facto free country metadata API. No alternatives come close in coverage or reliability.",
    sampleResponse: `{
  "name": { "common": "Germany", "official": "Federal Republic of Germany" },
  "cca2": "DE",
  "capital": ["Berlin"],
  "region": "Europe",
  "population": 83240525,
  "currencies": { "EUR": { "name": "Euro", "symbol": "€" } }
}`,
    tips: ["Always pass ?fields=... to shrink responses — /all is ~600KB unfiltered"],
  },
  "ipapi-co-geocoding": {
    tagline: "IP geolocation with city, region, and ISP — free tier 30k/month.",
    highlights: [
      "GET /json/ returns geolocation for the caller's IP",
      "GET /{ip}/json/ geolocates a specific IPv4/IPv6 address",
      "Returns city, region, country, postal code, timezone, ASN, and organization",
    ],
    rateLimits: "Free tier: 30,000 req/month, 1 req/sec. Paid plans raise both caps. Requires no key for the free tier.",
    knownIssues: [
      "Free tier is for non-commercial use only — check the ToS before deploying in a paid product",
      "Accuracy varies by ISP; some mobile carriers return the carrier's NOC location instead of the user's city",
      "HTTPS is required on the free tier; HTTP requests are rejected",
    ],
    comparison: "More accurate than ip-api.com (which is HTTP-only by default) and has a more generous free tier than ipgeolocation.io. For ASN-only lookups use the Team Cymru DNS-based service.",
    sampleResponse: `{
  "ip": "8.8.8.8",
  "city": "Mountain View",
  "region": "California",
  "country_name": "United States",
  "postal": "94043",
  "latitude": 37.423,
  "longitude": -122.084,
  "org": "AS15169 Google LLC",
  "timezone": "America/Los_Angeles"
}`,
    tips: ["Cache by /24 subnet for IPv4 — the city-level accuracy doesn't improve below that granularity"],
  },

  // ───────────────────────────── Weather ─────────────────────────────
  "open-meteo-weather": {
    tagline: "Global weather forecast — no key, no signup, 10,000 calls/day free.",
    highlights: [
      "GET /v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m returns current conditions",
      "daily=temperature_2m_max,temperature_2m_min,precipitation_sum for a 7-day forecast",
      "Supports 100+ weather variables including soil moisture, wave height, and UV index",
      "Historical data (archive API) goes back to 1940",
    ],
    rateLimits: "Free tier (no key): 10,000 calls/day, ~600 calls/hour, 5 calls/sec for the forecast endpoint. The archive endpoint has a separate 10,000/day quota.",
    knownIssues: [
      "Non-commercial use only on the free tier — commercial use requires a paid API key",
      "The forecast model (IconEU, GFS, etc.) varies by region; default isn't always best for your location — pick via &models=",
      "UV index and some variables are only available for specific forecast models",
    ],
    comparison: "The most generous free weather API. OpenWeatherMap's free tier requires a key and has narrower variable coverage; WeatherAPI.com is comparable but enforces signup.",
    sampleResponse: `{
  "current": {
    "time": "2026-07-20T14:00",
    "temperature_2m": 22.4,
    "wind_speed_10m": 12.3,
    "weather_code": 3
  }
}`,
    tips: [
      "WMO weather_code is the canonical way to map conditions to icons — see the open-meteo docs for the full table",
      "Use &timezone=auto to get times in the local timezone of the location",
      "For marine weather use the dedicated marine API endpoint, not /forecast",
    ],
  },

  // ───────────────────────────── Games & Comics ─────────────────────────────
  "gamerpower-games--comics": {
    tagline: "Game giveaway tracker — PC, console, and mobile freebies in one feed.",
    highlights: [
      "GET /giveaways returns all active giveaways with title, platform, and worth",
      "GET /filter?platform=pc&sort-by=date filters by platform and sort",
      "Each entry includes an image URL and an open-giveaway URL",
    ],
    rateLimits: "No published hard limit; the host is a small VPS. Keep usage polite (~1 req/sec).",
    knownIssues: [
      "Some giveaway 'worth' values are estimates, not exact retail prices",
      "Image URLs are sometimes broken after a giveaway ends — cache or screenshot if you need them long-term",
      "Platform codes are custom (e.g. 'pc', 'steam', 'epic-games-store') — check the docs",
    ],
    comparison: "The only free dedicated game-giveaway API. For broader game metadata use the RAWG API (key required).",
    sampleResponse: `{
  "id": 1234,
  "title": "Dishonored: Death of the Outsider",
  "worth": "$29.99",
  "image": "https://...",
  "platforms": "PC, Steam",
  "type": "Game",
  "end_date": "2026-07-25..."
}`,
    tips: ["Filter by type=game to exclude DLC and loot-pack giveaways"],
  },
  "genshin-impact-games--comics": {
    tagline: "Genshin Impact game data — characters, weapons, artifacts, talents.",
    highlights: [
      "GET /characters returns all character names",
      "GET /characters/{name} returns full stats, rarity, element, weapon type",
      "Also exposes /weapons, /artifacts, /talents, /elements, /nations",
    ],
    rateLimits: "No published limit; hosted on a static-file CDN, effectively unlimited.",
    knownIssues: [
      "Character names are case-sensitive and use kebab-case (e.g. 'raiden-shogun')",
      "The data is frozen at the version current when the API was last updated — recent characters may be missing",
      "No image URLs — text metadata only",
    ],
    comparison: "The simplest free Genshin API. For richer data (including images) use the Genshin.dev fork or the community-maintained Akasha API.",
    sampleResponse: `{
  "name": "Raiden Shogun",
  "vision": "Electro",
  "weapon": "Polearm",
  "nation": "Inazuma",
  "rarity": 5,
  "description": "Her Excellency, the Almighty Shogun..."
}`,
    tips: ["Pin your client to a specific genshin.dev version (e.g. /v1/) to avoid schema breaks"],
  },
  "funtranslations-games--comics": {
    tagline: "Translate text into pirate, Yoda, Klingon, and 50+ novelty languages.",
    highlights: [
      "GET /translate/{style}.json?text={text} returns the translated text",
      "Styles include pirate, yoda, valyrian, dothraki, klingon, minion, and more",
      "POST /translate/{style}.json with form data for long text",
    ],
    rateLimits: "Free tier: 5 req/hour, 60 req/day per IP. No key required but a key raises the cap.",
    knownIssues: [
      "The 5 req/hour ceiling is brutal — cache aggressively",
      "Some styles (Valyrian, Sindarin) have smaller vocabularies and fall back to English for unknown words",
      "Responses include rate-limit headers; read them to avoid surprise 429s",
    ],
    comparison: "The most varied free translation-novelty API. For serious translation use DeepL or Google Translate; FunTranslations is for fun only.",
    sampleResponse: `{
  "success": { "total": 1 },
  "contents": {
    "translated": "Arrr, matey!",
    "text": "Hello, friend!",
    "translation": "pirate"
  }
}`,
    tips: ["Pre-translate a fixed set of strings at build time and bundle them — avoids hitting the 5/hour limit"],
  },
};

/**
 * Get enrichment data for a specific API, if any curated content exists.
 * Returns undefined for long-tail APIs (they keep the standard template).
 */
export function getApiEnrichment(id: string): ApiEnrichment | undefined {
  return API_ENRICHMENT[id];
}
