# AI Usage Log



| Tool | Prompt | Output used | Output rejected | Verification | Commit |

|---|---|---|---|---|---|

| ChatGPT | In plain language, explain the proposed technology stack for a neighborhood listing platform. The stack uses Next.js with the App Router, TypeScript, Tailwind CSS, accessible HTML, Node.js, npm, Git, GitHub, and Vercel. Explain what each technology does and how they work together. Do not provide code. | Used the concise explanations of each technology and how the tools support development, version control, and deployment. | No code was requested or provided. No unsupported setup commands were used. | Compared the explanation with the technologies required by the project instructions. | feat: create accessible neighborhood app shell |

| Gemini | In plain language, explain the proposed technology stack for a neighborhood listing platform. The stack uses Next.js with the App Router, TypeScript, Tailwind CSS, accessible HTML, Node.js, npm, Git, GitHub, and Vercel. Explain what each technology does and how they work together. Do not provide code. | Used the project-specific examples and the explanation of the development-to-deployment workflow. | Rejected the database-query example because a database is not part of the current app-shell task. Also rejected the assumption that deployment is already automatic because Vercel has not been connected yet. | Compared the response with the project requirements and the ChatGPT response. | feat: create accessible neighborhood app shell |

| Google AI Studio | Act as an application-shell architect for a neighborhood listing platform using Next.js, TypeScript, Tailwind CSS, ESLint, accessible HTML, a src directory, and npm. Provide commands and a file plan without a giant code dump. | Used the suggested Next.js options and general file plan as planning references. | Rejected the command that created a nested neighborhood-platform directory and rejected unnecessary placeholder folders and utilities. | Corrected the command to install directly in the existing repository and verified that the development server returned HTTP 200. | feat: create accessible neighborhood app shell |

| ChatGPT | Help implement a simple accessible app shell with a heading, project purpose, and feature cards for Listings, Neighborhood Sponsors, and Voice Help. | Used semantic HTML, Tailwind styling, the three required feature cards, and updated page metadata. | No additional packages, secrets, or unnecessary features were used. | Inspected the rendered page, terminal output, and browser Console; no application errors were found. | feat: create accessible neighborhood app shell |

## Two Differences Between the Responses



1. ChatGPT provided... a shorter and more general explanation, while Gemini included project-specific examples such as listing prices, bedroom counts, application routes, Server Components, and SEO.



1. ChatGPT presented... the stack mainly through paragraphs, while Gemini included a pipeline diagram and a numbered workflow showing how the technologies work together from development through deployment.

