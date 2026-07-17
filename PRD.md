# Product Requirements Document (PRD)
## Project: Global Export B2B Platform
**Target Brand:** [Your Brand Name]
**Development Approach:** AI-Assisted "Vibe Coding" & Low-Code Infrastructure

---

## 1. Project Overview
This project aims to build a professional B2B export company website, structurally inspired by `tropindoexport.com`. The platform will serve as a digital storefront to showcase local Indonesian commodities to the global market, emphasizing quality, sustainability, and international compliance.

To optimize development speed and minimize the operational burden of managing backend servers and private encryption keys, the architecture strictly adopts a **low-code backend approach**. The frontend is designed to be highly modular, making it perfect for autonomous development workflows using agentic AI tools.

## 2. Website Structure & Navigation
Based on the reference site, the platform requires a clean, conversion-optimized structure:

*   **Home:** 
    *   Hero section with a clear value proposition ("Bringing Indonesia's [Commodity] to the World").
    *   "Why Us?" section (Quality-First, Sustainable & Ethical Sourcing, Global-Ready Compliance).
    *   Featured Products preview.
    *   Recent Insights/Blog preview.
*   **Products:** 
    *   Grid catalog of export commodities.
    *   Detailed product pages including technical specifications, origin, and export documentation availability.
*   **Our Company:** 
    *   About Us, Mission, Vision.
    *   Information on local farmer partnerships and supply chain integrity.
*   **Insights (Blog):** 
    *   Educational articles (e.g., "Top Applications of [Commodity]", "The Journey from Farm to Export").
    *   Designed for SEO to attract B2B buyers.
*   **Contact:** 
    *   B2B Inquiry Form (Name, Company, Email, Product Interest, Message).
    *   Company Address, Email, and direct WhatsApp links.

## 3. Tech Stack & Architecture

### Frontend (Optimized for AI Vibe Coding)
*   **Framework:** Next.js 14+ (App Router) for static generation and SEO performance.
*   **Styling:** Tailwind CSS + Shadcn UI components for rapid, beautiful UI assembly.
*   **Animations:** Framer Motion for smooth, professional micro-interactions.

### Backend & Automation (Low-Code Infrastructure)
*   **CMS & Database:** Supabase or Sanity (Headless CMS). This eliminates the need to build a custom backend or handle sensitive private key management manually, providing a secure, GUI-based dashboard for updating products and insights.
*   **Workflow Automation:** **n8n**. Instead of writing complex backend logic for the contact form, the Next.js form will trigger a webhook to a self-hosted or cloud n8n instance. 
    *   *Flow:* Webhook -> Spam Filter -> Save to Google Sheets / Notion -> Send WhatsApp/Email Notification to the Sales Team.

## 4. Vibe Coding Implementation Guide (For AI Agents)

When feeding this PRD to your AI coding assistant (e.g., Cline, OpenHands, SWE-agent), use the following structural guidelines to ensure clean code generation.

### Phase 1: Initial Setup
**Prompt for Agent:** 
> "Bootstrap a new Next.js 14 project with Tailwind CSS. Install Lucide React for icons and setup Shadcn UI. Create the basic routing structure: `/`, `/products`, `/about`, `/insights`, and `/contact`. Ensure the layout includes a responsive sticky Navbar and a comprehensive Footer."

### Phase 2: Building Core Components
**Prompt for Agent:**
> "Create the following reusable components in `/components`: 
> 1. `HeroSection.tsx`: Full-width background image with overlay text and a CTA button.
> 2. `FeatureGrid.tsx`: 3-column layout for 'Why Us' using Lucide icons.
> 3. `ProductCard.tsx`: Image, Title, brief description, and 'View Details' button.
> Use Tailwind for styling and ensure mobile responsiveness."

### Phase 3: Headless CMS Integration
**Prompt for Agent:**
> "Set up a `lib/cms.ts` file to fetch data for Products and Insights. Use dummy JSON data for now. Define TypeScript interfaces for `Product` (id, name, description, specs, image) and `Post` (id, title, excerpt, date, slug). Map this data into the `/products` and `/insights` pages."

### Phase 4: Low-Code Form Integration
**Prompt for Agent:**
> "Build a Contact form in `/contact`. Create a client-side component using React Hook Form. On submit, instead of a traditional API route, make a POST request to an external webhook URL (defined in `.env.local` as `NEXT_PUBLIC_N8N_WEBHOOK_URL`). Handle loading states and show a success toast notification upon completion."

---

## 5. Design System & Brand Identity
*   **Typography:** Sans-serif for modern, clean look (e.g., Inter or Plus Jakarta Sans).
*   **Color Palette:** 
    *   Primary: Earthy tones (e.g., Forest Green or Deep Ocean Blue) to reflect agricultural/natural commodities.
    *   Background: Clean White / Off-white (`#faf8f5`) for maximum readability.
*   **Imagery:** High-quality imagery of local Indonesian farms, processing facilities, and the final export product. Replace all placeholder text with the actual brand identity before deployment.

## 6. Success Metrics for Launch
1.  Lighthouse SEO Score of 95+.
2.  Fully operational n8n webhook capturing leads flawlessly.
3.  Mobile responsive on all standard viewports.
4.  Zero hardcoded sensitive credentials in the repository.
