// Single source of truth for all resume-derived content.
// Every fact here is taken directly from Sargunan's uploaded resume.
// Do not add metrics, clients, or claims not present in the source.

export const profile = {
  name: 'Sargunan C',
  title: 'Applied GenAI Engineer',
  location: 'Bengaluru, Karnataka, India',
  email: 'csargunan04@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sargunanchandran',
  github: 'https://github.com/Sargunan-1619',
  resumeUrl: '/Sargunan-C-Resume.pdf',

  positioning:
    'RAG & LLM Applications | AI Agents | AI Workflow Automation with n8n',

  summary:
    'Applied GenAI Engineer and recent B.Tech graduate building practical LLM applications, retrieval-augmented generation (RAG) pipelines, and AI-driven workflow automation. Experienced in integrating LLM APIs, vector search, and structured-output extraction into functioning end-to-end systems using n8n and Python. Focused on production-oriented AI engineering rather than isolated experimentation.',

  status: 'Available for AI Engineering Opportunities',
}

export const skillGroups = [
  {
    id: 'genai',
    label: 'Generative AI',
    emphasis: true,
    items: [
      'LLMs',
      'Prompt Engineering',
      'RAG',
      'AI Agents',
      'Embeddings',
      'Vector Search',
      'Semantic Search',
      'Context Retrieval',
    ],
  },
  {
    id: 'ai-engineering',
    label: 'AI Engineering',
    emphasis: true,
    items: [
      'LLM APIs',
      'Retrieval Pipelines',
      'Document Processing',
      'Structured Outputs',
      'JSON Validation',
      'API Integration',
      'AI Application Development',
    ],
  },
  {
    id: 'ai-automation',
    label: 'AI Automation',
    emphasis: true,
    items: [
      'n8n',
      'Workflow Automation',
      'Webhooks',
      'Email / IMAP Automation',
      'Google Sheets Integration',
      'Workflow Orchestration',
    ],
  },
  {
    id: 'platforms',
    label: 'AI Platforms & Tools',
    emphasis: false,
    items: ['OpenAI API', 'Groq', 'Google Gemini', 'Hugging Face'],
  },
  {
    id: 'engineering',
    label: 'Programming & Engineering',
    emphasis: false,
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'REST APIs', 'Git', 'GitHub', 'VS Code'],
  },
] as const

// A project's live-demo link is one of three states:
// - a real URL (string) to an external live deployment
// - the literal 'self' sentinel, meaning "this portfolio site is the demo"
// - null, meaning no live demo exists and no link should render
type LiveDemo = string | 'self' | null

export interface Project {
  id: string
  index: string
  name: string
  tags: string[]
  tech: string[]
  problem: string
  approach: string
  architecture: string
  implementation: string
  decisions: string
  result: string
  screenshot: string | null
  screenshotAlt: string | null
  pipeline: string[]
  liveDemo: LiveDemo
  github: string
}

export const projects: Project[] = [
  {
    id: 'rag-assistant',
    index: '01',
    name: 'RAG-Powered Component Specification Assistant',
    tags: ['RAG', 'LLM', 'Embeddings', 'Vector Search', 'n8n'],
    tech: ['n8n', 'Groq', 'Qdrant', 'Hugging Face Embeddings'],
    problem:
      'Component specification queries need answers grounded in a real knowledge source — not a model guessing from general training data, where domain-specific details are easy to hallucinate.',
    approach:
      'Built a retrieval-augmented generation assistant that grounds LLM responses in a dedicated knowledge source instead of relying on model memory alone.',
    architecture:
      'Source documents are converted into embeddings and indexed for vector search, enabling semantic (meaning-based) rather than keyword-based lookup of relevant content.',
    implementation:
      'Retrieval and generation are integrated using n8n as the orchestration layer: a form submission triggers PDF extraction, recursive text splitting, embedding generation via Hugging Face, and insertion into a Qdrant vector store. A separate chat-triggered agent uses a Groq-hosted LLM with a Qdrant search tool to answer engineering questions.',
    decisions:
      'Chose semantic vector search over keyword search specifically to handle component-spec queries where the right answer is not always a literal keyword match. Used n8n as the orchestration layer to keep retrieval and generation stages explicit and inspectable rather than hiding them inside a single opaque call.',
    result:
      'A working assistant that fetches relevant context before generation, reducing hallucination risk on domain-specific queries. This is a personal / demo-scale build, not a deployed production system.',
    screenshot: 'project-rag-screenshot.png',
    screenshotAlt:
      'n8n workflow canvas showing the RAG-Powered Component Specification Assistant: a chat trigger connected to a Component Spec RAG Agent using a Groq Chat Model and a Qdrant search tool, alongside a document ingestion pipeline with PDF extraction, text splitting, Hugging Face embeddings, and Qdrant insert.',
    pipeline: ['Documents', 'Embeddings', 'Vector Search', 'RAG', 'LLM', 'Response'],
    liveDemo: null,
    github: 'https://github.com/Sargunan-1619',
  },
  {
    id: 'rfq-parser',
    index: '02',
    name: 'AI-Powered Supply Chain RFQ & Email Parser',
    tags: ['LLM', 'n8n', 'Groq', 'IMAP', 'JSON', 'Google Sheets'],
    tech: ['n8n', 'Groq', 'IMAP', 'Google Sheets API'],
    problem:
      'Supplier RFQ emails arrive as unstructured text and require manual reading and re-entry into structured records — slow and error-prone at any real volume.',
    approach:
      'Automated ingestion of unstructured supplier RFQ emails via IMAP monitoring in n8n, triggering a processing workflow on new incoming mail without manual intervention.',
    architecture:
      'Incoming email → LLM extraction → structured JSON → validation → Google Sheets. A Groq-hosted LLM extracts structured fields from unstructured email text — supplier name, email, product, quantity, unit, delivery date, price, currency, and notes.',
    implementation:
      'An IMAP trigger watches for new mail. A Basic LLM Chain node calls Groq to extract fields as JSON. A validation step checks the extracted JSON against the expected field structure before logging. Validated records are appended to Google Sheets for downstream use.',
    decisions:
      'Added an explicit JSON validation step before logging rather than trusting LLM output directly, since structured-extraction output needs a integrity check before it reaches a shared spreadsheet.',
    result:
      'A working automation that turns unstructured supplier emails into validated, structured spreadsheet rows without manual re-entry. This is a personal / demo-scale build, not a deployed production system.',
    screenshot: 'project-rfq-screenshot.png',
    screenshotAlt:
      'n8n workflow canvas showing the Supply Chain RFQ & Email Parser: an IMAP email trigger connected to a Basic LLM Chain using a Groq Chat Model, followed by a Parse & Validate JSON node and a Log to Google Sheet node.',
    pipeline: ['Incoming Email', 'LLM Extraction', 'Structured JSON', 'Validation', 'Google Sheets'],
    liveDemo: null,
    github: 'https://github.com/Sargunan-1619',
  },
  {
    id: 'portfolio',
    index: '03',
    name: '3D AI Engineer Personal Portfolio',
    tags: ['React', 'TypeScript', 'Three.js / React Three Fiber', 'Framer Motion'],
    tech: ['React', 'TypeScript', 'React Three Fiber', 'Framer Motion', 'Tailwind CSS'],
    problem:
      'A static resume page does not communicate how an AI engineer actually thinks about systems — pipelines, retrieval, orchestration.',
    approach:
      'Designed and built an interactive 3D personal portfolio using React, TypeScript, and React Three Fiber to present GenAI projects with an immersive, responsive interface.',
    architecture:
      'Component-based architecture separating 3D scenes, content sections, and shared data, with scroll-linked state driving which part of the 3D system is highlighted.',
    implementation:
      'Implemented smooth UI animations and transitions with Framer Motion, ensuring the site remains performant and professional across devices.',
    decisions:
      'Kept the 3D scene to one reused system rather than a different 3D element per section, to avoid decoration for its own sake and keep performance predictable on lower-end devices.',
    result:
      'An interactive engineering portfolio designed to present GenAI systems, technical architecture, and workflow automation through a performance-conscious 3D interface.',
    screenshot: null,
    screenshotAlt: null,
    pipeline: [],
    liveDemo: 'self',
    github: 'https://github.com/Sargunan-1619',
  },
]

export const timeline = [
  {
    id: 'bsnl',
    kind: 'Experience',
    title: 'Telecom Infrastructure Intern',
    org: 'Bharat Sanchar Nigam Limited (BSNL)',
    location: 'Chennai, India',
    period: 'June 2025',
    points: [
      'Assisted with broadband and optical fiber infrastructure operations, gaining hands-on exposure to network architecture and real-time configuration in a live telecommunications environment.',
      'Supported monitoring of network infrastructure components as part of day-to-day operations during the internship period.',
    ],
  },
  {
    id: 'education',
    kind: 'Education',
    title: 'B.Tech — Electronics & Communication Engineering',
    org: 'SASTRA Deemed University',
    location: null,
    period: '2022 – 2026',
    points: [],
  },
] as const

export const certifications = [
  {
    name: 'Career Essentials in Generative AI',
    issuer: 'Microsoft & LinkedIn Learning (2026)',
    detail: 'Generative AI, Microsoft Copilot, Responsible AI',
  },
  {
    name: 'AI and Neural Networks',
    issuer: 'SASTRA University',
    detail: null,
  },
] as const

export const architectureNodes = [
  {
    id: 'documents',
    label: 'Documents',
    short: 'Source material',
    detail:
      'Raw source documents (specs, emails, PDFs) are the starting point of the pipeline before any AI processing happens.',
  },
  {
    id: 'embeddings',
    label: 'Embeddings',
    short: 'Vector representation',
    detail:
      'Text is converted into numerical vector embeddings that capture meaning, enabling comparison by semantic similarity rather than exact words.',
  },
  {
    id: 'vector-db',
    label: 'Vector Search',
    short: 'Semantic retrieval',
    detail:
      'Embeddings are indexed in a vector store (Qdrant) so relevant content can be retrieved by meaning-based similarity search.',
  },
  {
    id: 'rag',
    label: 'RAG',
    short: 'Grounded context',
    detail:
      'Retrieves relevant context before generation, improving factual grounding and reducing hallucination on domain-specific queries.',
  },
  {
    id: 'llm',
    label: 'LLM',
    short: 'Generation & extraction',
    detail:
      'A hosted LLM (Groq, Gemini) generates responses or extracts structured fields from unstructured text, using the retrieved context where applicable.',
  },
  {
    id: 'agent',
    label: 'AI Agent',
    short: 'Tool-using reasoning',
    detail:
      'Connects models with tools and external services — an LLM-driven agent reasons over a query and calls what it needs, like a vector search tool, before responding.',
  },
  {
    id: 'automation',
    label: 'Automation',
    short: 'Orchestration',
    detail:
      'n8n connects triggers (form submissions, incoming email), AI steps, and downstream actions (Google Sheets, vector inserts) into one working pipeline.',
  },
] as const
