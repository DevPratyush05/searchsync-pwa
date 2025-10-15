import type { SearchResult } from "../types";

export const mockSearchResults: SearchResult[] = [
  // Videos (8 items)
  {
    id: "1",
    type: "video",
    title: "Understanding React Hooks - Complete Guide",
    description:
      "Learn how to use React Hooks in this comprehensive tutorial. We cover useState, useEffect, and custom hooks with practical examples.",
    source: "YouTube",
    url: "https://youtube.com/watch?v=abc123",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    published_date: "2024-01-15",
    confidence_score: 0.95,
  },
  {
    id: "2",
    type: "video",
    title: "Mastering Tailwind CSS - From Zero to Expert",
    description:
      "Complete guide to Tailwind CSS covering utilities, components, and advanced techniques for modern web development.",
    source: "YouTube",
    url: "https://youtube.com/watch?v=def456",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
    published_date: "2024-01-12",
    confidence_score: 0.87,
  },
  {
    id: "3",
    type: "video",
    title: "TypeScript for React Developers - Advanced Patterns",
    description:
      "Deep dive into TypeScript patterns and best practices specifically for React applications.",
    source: "YouTube",
    url: "https://youtube.com/watch?v=ghi789",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop",
    published_date: "2024-01-18",
    confidence_score: 0.92,
  },
  {
    id: "4",
    type: "video",
    title: "Next.js 14 Full Course - App Router & Server Components",
    description:
      "Learn Next.js 14 with the new App Router, Server Components, and all the latest features.",
    source: "YouTube",
    url: "https://youtube.com/watch?v=jkl012",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop",
    published_date: "2024-01-20",
    confidence_score: 0.89,
  },
  {
    id: "5",
    type: "video",
    title: "Building Modern PWAs with Vite and React",
    description:
      "Step-by-step guide to building Progressive Web Apps with modern tooling and best practices.",
    source: "YouTube",
    url: "https://youtube.com/watch?v=mno345",
    thumbnail:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=225&fit=crop",
    published_date: "2024-01-22",
    confidence_score: 0.91,
  },
  {
    id: "6",
    type: "video",
    title: "AI-Powered Search Implementation Guide",
    description:
      "How to integrate AI and machine learning into your search functionality for better results.",
    source: "YouTube",
    url: "https://youtube.com/watch?v=pqr678",
    thumbnail:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop",
    published_date: "2024-01-25",
    confidence_score: 0.84,
  },
  {
    id: "7",
    type: "video",
    title: "Web Performance Optimization Masterclass",
    description:
      "Advanced techniques for optimizing web application performance and Core Web Vitals.",
    source: "YouTube",
    url: "https://youtube.com/watch?v=stu901",
    thumbnail:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
    published_date: "2024-01-28",
    confidence_score: 0.88,
  },
  {
    id: "8",
    type: "video",
    title: "GraphQL vs REST API - Complete Comparison",
    description:
      "Detailed comparison between GraphQL and REST APIs with real-world examples and use cases.",
    source: "YouTube",
    url: "https://youtube.com/watch?v=vwx234",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop",
    published_date: "2024-01-30",
    confidence_score: 0.93,
  },

  // Articles (8 items)
  {
    id: "9",
    type: "article",
    title: "The Future of Web Development in 2024",
    description:
      "Exploring the latest trends in web development including AI integration, WebAssembly, and new framework capabilities.",
    source: "Medium",
    url: "https://medium.com/article/123",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    published_date: "2024-01-10",
    confidence_score: 0.88,
  },
  {
    id: "10",
    type: "article",
    title: "Building Progressive Web Apps in 2024",
    description:
      "A practical guide to building fast, reliable, and engaging Progressive Web Applications with modern tools.",
    source: "Dev.to",
    url: "https://dev.to/article/456",
    thumbnail:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=225&fit=crop",
    published_date: "2024-01-08",
    confidence_score: 0.91,
  },
  {
    id: "11",
    type: "article",
    title: "State Management in Modern React Applications",
    description:
      "Comparing different state management solutions including Context API, Zustand, and Redux Toolkit.",
    source: "CSS-Tricks",
    url: "https://css-tricks.com/article/789",
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop",
    published_date: "2024-01-14",
    confidence_score: 0.86,
  },
  {
    id: "12",
    type: "article",
    title: "The Rise of Edge Computing in Web Development",
    description:
      "How edge computing is changing the way we build and deploy web applications.",
    source: "Smashing Magazine",
    url: "https://smashingmagazine.com/article/101",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop",
    published_date: "2024-01-16",
    confidence_score: 0.89,
  },
  {
    id: "13",
    type: "article",
    title: "Microfrontends: Breaking Down Monolithic UIs",
    description:
      "A comprehensive guide to implementing microfrontend architecture in large-scale applications.",
    source: "LogRocket",
    url: "https://logrocket.com/article/112",
    thumbnail:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=225&fit=crop",
    published_date: "2024-01-19",
    confidence_score: 0.87,
  },
  {
    id: "14",
    type: "article",
    title: "Web3 and Blockchain for Web Developers",
    description:
      "Introduction to Web3 technologies and how traditional web developers can get started.",
    source: "FreeCodeCamp",
    url: "https://freecodecamp.org/article/131",
    thumbnail:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
    published_date: "2024-01-21",
    confidence_score: 0.82,
  },
  {
    id: "15",
    type: "article",
    title: "Accessibility First: Building Inclusive Web Apps",
    description:
      "Best practices for building web applications that are accessible to everyone.",
    source: "A List Apart",
    url: "https://alistapart.com/article/415",
    thumbnail:
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=225&fit=crop",
    published_date: "2024-01-24",
    confidence_score: 0.94,
  },
  {
    id: "16",
    type: "article",
    title: "The Complete Guide to Web Security in 2024",
    description:
      "Essential security practices every web developer should know and implement.",
    source: "OWASP",
    url: "https://owasp.org/article/516",
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop",
    published_date: "2024-01-26",
    confidence_score: 0.9,
  },

  // Wikipedia Articles (6 items)
  {
    id: "17",
    type: "wiki",
    title: "JavaScript Programming Language",
    description:
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web.",
    source: "Wikipedia",
    url: "https://wikipedia.org/wiki/JavaScript",
    published_date: "2024-01-01",
    confidence_score: 0.92,
  },
  {
    id: "18",
    type: "wiki",
    title: "React (JavaScript Library)",
    description:
      "React is a free and open-source front-end JavaScript library for building user interfaces based on components.",
    source: "Wikipedia",
    url: "https://wikipedia.org/wiki/React_(JavaScript_library)",
    published_date: "2024-01-05",
    confidence_score: 0.89,
  },
  {
    id: "19",
    type: "wiki",
    title: "Progressive Web Application",
    description:
      "A progressive web application (PWA) is a type of application software delivered through the web.",
    source: "Wikipedia",
    url: "https://wikipedia.org/wiki/Progressive_web_application",
    published_date: "2024-01-03",
    confidence_score: 0.91,
  },
  {
    id: "20",
    type: "wiki",
    title: "Artificial Intelligence",
    description:
      "Artificial intelligence (AI) is the intelligence of machines or software, as opposed to the intelligence of humans or animals.",
    source: "Wikipedia",
    url: "https://wikipedia.org/wiki/Artificial_intelligence",
    published_date: "2024-01-07",
    confidence_score: 0.95,
  },
  {
    id: "21",
    type: "wiki",
    title: "Machine Learning",
    description:
      "Machine learning (ML) is a field of study in artificial intelligence concerned with the development and study of statistical algorithms.",
    source: "Wikipedia",
    url: "https://wikipedia.org/wiki/Machine_learning",
    published_date: "2024-01-09",
    confidence_score: 0.88,
  },
  {
    id: "22",
    type: "wiki",
    title: "TypeScript Programming Language",
    description:
      "TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript.",
    source: "Wikipedia",
    url: "https://wikipedia.org/wiki/TypeScript",
    published_date: "2024-01-11",
    confidence_score: 0.9,
  },

  // Reels/Short Videos (4 items)
  {
    id: "23",
    type: "reel",
    title: "React useState Hook in 60 Seconds",
    description:
      "Quick tutorial showing how to use the useState hook in React for state management.",
    source: "Instagram",
    url: "https://instagram.com/reel/abc123",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    published_date: "2024-01-29",
    confidence_score: 0.85,
  },
  {
    id: "24",
    type: "reel",
    title: "CSS Grid vs Flexbox - When to Use",
    description:
      "Quick comparison between CSS Grid and Flexbox layout systems with practical examples.",
    source: "TikTok",
    url: "https://tiktok.com/reel/def456",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
    published_date: "2024-01-27",
    confidence_score: 0.83,
  },
  {
    id: "25",
    type: "reel",
    title: "JavaScript Array Methods You Should Know",
    description:
      "Essential JavaScript array methods every developer should master in under 60 seconds.",
    source: "Instagram",
    url: "https://instagram.com/reel/ghi789",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop",
    published_date: "2024-01-31",
    confidence_score: 0.87,
  },
  {
    id: "26",
    type: "reel",
    title: "Building Your First API with Node.js",
    description:
      "Step-by-step guide to creating a REST API using Node.js and Express in a short format.",
    source: "TikTok",
    url: "https://tiktok.com/reel/jkl012",
    thumbnail:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=225&fit=crop",
    published_date: "2024-02-01",
    confidence_score: 0.81,
  },
];

export const quickSuggestions = [
  "React tutorials",
  "AI news",
  "Web development",
  "Python basics",
  "Machine learning",
  "Startup advice",
  "JavaScript frameworks",
  "CSS animations",
  "Node.js backend",
  "Database design",
];
