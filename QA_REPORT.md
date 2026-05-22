# QA Report: Vasu Bhardwaj Portfolio

**Date:** 2026-05-22  
**Tester:** OpenCode AI Agent  
**Scope:** Full-page visual QA, content audit, mobile responsiveness, functional testing  
**Browsers tested:** Headless Chromium (desktop 1280x900, mobile 375x812)

---

## Executive Summary

The portfolio has a strong visual direction (dark luxury aesthetic with gold accents) but suffers from **broken assets**, **content gaps**, and **several UX inconsistencies**. The biggest blocker is the missing project images. Content-wise, the tone oscillates between genuinely impressive and unnecessarily buzzword-heavy, and key information (education, skills, more projects) is missing.

---

## Severity Legend

| Severity | Meaning |
|----------|---------|
| **P0** | Broken / crashes / completely missing |
| **P1** | Major visual or UX issue |
| **P2** | Minor inconsistency or polish gap |
| **P3** | Content / copy suggestion |

---

## 1. Broken Assets & Functionality (P0)

### P0-1: Project images are 404
**Location:** Projects section (`/image-1.jpg`, `/image-2.jpg`)  
**Evidence:** Screenshots show broken image placeholders in the project cards.  
**Impact:** Makes the portfolio look unfinished.  
**Fix:** Add actual project screenshots to `public/` or use Unsplash/placeholder images as temporary stand-ins.

### P0-2: "Live" demo links are fake
**Location:** Projects section, both cards  
**Issue:** The "Live" links point to the same GitHub repo as "View Code" (`href={project.github}`). There is no actual live demo.  
**Fix:** Either deploy the projects and link to real demos, or remove the "Live" button and rename "View Code" to "View on GitHub".

### P0-3: "Get My Resume" button does nothing
**Location:** Experience section CTA  
**Issue:** Clicking scrolls to `#terminal` but there is no resume download in the terminal or anywhere else.  
**Fix:** Add a real resume PDF to `public/resume.pdf` and change the button to an `<a href="/resume.pdf" download>`.

### P0-4: Terminal "email" command gives zero feedback
**Location:** Terminal overlay  
**Issue:** Typing `email` runs `navigator.clipboard.writeText()` but the user sees no confirmation.  
**Fix:** Add a toast or inline message: "vasubhrdwj@gmail.com copied to clipboard."

---

## 2. Major Visual Issues (P1)

### P1-1: Hero title overflows on mobile
**Location:** Hero section, `<h1>`  
**Issue:** `text-[12vw]` on mobile (375px) creates a massive font that dominates the screen and pushes content down awkwardly.  
**Fix:** Cap the hero title at `text-5xl` or `text-6xl` on small screens, use `text-[8vw] sm:text-[6vw] md:text-[5vw]` instead of a flat 12vw.

### P1-2: Stats cards have uneven heights on mobile
**Location:** Stats grid (`#stats`)  
**Issue:** In the 2-column grid, cards with longer labels wrap differently, creating ragged rows.  
**Fix:** Add `h-full` to stat cards and ensure grid rows align with `items-stretch`.

### P1-3: Project card stacking effect is broken without images
**Location:** Projects section  
**Issue:** The `card-stack` sticky-scroll overlay effect relies on full-bleed images. With broken images, you get a black screen with floating text.  
**Fix:** Fix P0-1 first. Then verify the `min-h-screen` grid doesn't leave awkward empty space if an image is shorter than text.

### P1-4: Experience timeline with one entry looks sad
**Location:** Experience section  
**Issue:** A single timeline entry with a vertical line and a dot feels like a mistake — timelines are for sequences.  
**Fix:** Since you only have one job, replace the timeline with a featured job card. Re-introduce the timeline only when you have 2+ entries.

### P1-5: Mobile menu has no animation
**Location:** Navigation  
**Issue:** Mobile menu appears/disappears instantly with no slide or fade.  
**Fix:** Add a CSS transition or GSAP animation for the mobile menu dropdown.

---

## 3. Minor Visual Inconsistencies (P2)

### P2-1: Button style inconsistency
**Location:** Across the site  
**Issue:** "View Projects" (hero) has a border + hover fill. "Initiate Uplink" (hero) is text-only. "Initiate Uplink" (terminal) is solid gold. There are 3 different button treatments for similar CTAs.  
**Fix:** Standardize on two button variants — `primary` (solid gold) and `secondary` (bordered ghost). Apply consistently.

### P2-2: Section label tracking is inconsistent
**Location:** Section headers  
**Issue:** "Performance Metrics" uses `tracking-[0.35em]`, "Selected Work" uses `tracking-[0.35em]`, but "Professional Journey" also uses `tracking-[0.35em]`. This is actually consistent — **but** the hero subtitle also uses it, which creates too much identical styling.  
**Fix:** Reduce hero subtitle tracking to `[0.2em]` so section labels feel more prominent.

### P2-3: Footer "Built with React, Three.js..." is ironic
**Location:** Footer  
**Issue:** The Three.js canvas is currently empty (WebGL fallback). Mentioning it in the footer draws attention to a broken feature.  
**Fix:** Either fix the Three.js animation for non-WebGL (CSS fallback), or change the footer text to "Built with React, Tailwind CSS, and obsessive attention to detail."

### P2-4: Gold border opacity inconsistency
**Location:** Multiple components  
**Issue:** `border-gold/20`, `border-gold/30`, and `border-white/5` are used interchangeably for similar card borders.  
**Fix:** Standardize on `border-white/10` for all cards, and reserve `border-gold/30` for primary CTAs only.

### P2-5: Terminal header traffic-light dots are off-center
**Location:** Terminal overlay  
**Issue:** The red/yellow/green dots are not vertically centered within the header bar.  
**Fix:** Add `items-center` to the parent flex container.

---

## 4. Content Issues & Copy Suggestions (P3)

### P3-1: Hero subtitle is a job description, not a hook
**Current:** "Systems Architect & AI Engineer"  
**Problem:** It's a title. A subtitle should add context or intrigue.  
**Suggestion:**  
- Option A: "Reinforcement Learning · Distributed Systems · Backend Architecture"  
- Option B: "Building autonomous infrastructure that performs under pressure."  
- Option C: "I turn complex problems into production-grade systems."

### P3-2: Hero body copy is too abstract
**Current:** "I build systems that think under pressure. Reinforcement learning for autonomous operations, distributed infrastructure that never sleeps, and algorithms that scale."  
**Problem:** Reads like AI-generated buzzword soup. "Never sleeps" is cliche. "Algorithms that scale" is vague.  
**Suggestion:**  
> "I design and ship backend systems for high-stakes environments. Currently building AI-driven operational tooling at Zenarate. Previously ranked Top 5% globally on LeetCode. I care about reliability, performance, and clean architecture."

### P3-3: Only 2 projects is too thin for "Case Studies"
**Current:** "Case Studies" heading with 2 projects.  
**Problem:** "Case Studies" implies depth, analysis, and a body of work. Two repos is a starting point, not a portfolio.  
**Suggestion:**  
- If you only have 2 projects, rename to "Selected Projects" or "Featured Work".  
- Add 1-2 more projects (even smaller ones) to fill the page. A portfolio with 2 items looks empty.  
- If you truly only have 2, add a "More on GitHub" link below the cards.

### P3-4: Project descriptions are jargon-heavy
**Current (Incident Commander):** "A deterministic, multi-actor OpenEnv framework that deploys an LLM as an on-call Site Reliability Engineer. Uses GRPO reinforcement learning to train a 7B base model to resolve simulated production outages..."  
**Problem:** 50% of visitors won't know what GRPO, OpenEnv, or 7B base model means. You're writing for other ML researchers, not hiring managers.  
**Suggestion — rewrite for clarity:**  
> "An autonomous incident-response system powered by a fine-tuned 7B LLM. Trained with GRPO reinforcement learning to diagnose outages, delegate tasks to specialist agents, and write post-mortems — all without human intervention."

**Current (Load Balancer):** "A production-grade Layer 4 traffic distribution architecture. Implemented HAProxy with active health checks, rate limiting, and automated failover for a distributed FastAPI microservices cluster."  
**Suggestion:**  
> "A Layer 4 load balancer built with HAProxy for a FastAPI microservices cluster. Features active health checks, rate limiting, and automated failover — fully containerized with Docker Compose."

### P3-5: Stats section numbers lack context
**Current:** "41 Repositories", "296 Contributions", "83+ Contests"  
**Problem:** These are vanity metrics without a story. 296 GitHub contributions in 12 months is actually low. 83+ contests sounds like spam.  
**Suggestion:** Replace with more meaningful metrics:  
- "1,878" → keep (LeetCode rating is strong)  
- "Top 5%" → keep  
- "41 Repos" → change to "15+ Production Projects" (if true) or remove  
- "296 Contributions" → remove or replace with "2 Years Professional Experience"  
- "83+ Contests" → remove. Contest farming is not a selling point for senior roles.  
- Add: "Python, Go, TypeScript" (languages) or "FastAPI, Docker, Kubernetes" (tools)

### P3-6: Missing sections every portfolio needs
**Issue:** There is no:  
1. **Skills / Tech Stack** — A visual grid of languages, frameworks, and tools.  
2. **Education** — Even a single line matters.  
3. **About / Bio** — The hero is the only bio. A 2-3 sentence "About" section adds personality.  
4. **Testimonials / Endorsements** — If you have any, even from professors or peers.  
5. **Blog / Writing** — If you write about systems or ML, link it.

### P3-7: "Ready to Deploy / Initiate Uplink" is cringe
**Current:** Section label "Ready to Deploy", heading "Let's Build Together", CTA "Initiate Uplink"  
**Problem:** The military/space jargon feels forced and unprofessional to hiring managers. You're applying for jobs, not launching a rocket.  
**Suggestion:**  
- Section label: "Get in Touch"  
- Heading: "Let's Build Together" (keep this one — it's fine)  
- CTA: "Contact Me" or "Open Terminal"  
- Terminal welcome message: "Vasu Bhardwaj — Software Engineer" instead of "Systems Architect & AI Engineer"

### P3-8: Experience copy is generic
**Current:** "Building core backend systems and AI-driven operational tooling. Focus on distributed architecture, performance optimization, and intelligent automation that scales under production pressure."  
**Problem:** This could be pasted into any backend engineer's LinkedIn. What did you actually ship?  
**Suggestion (add specifics):**  
> "Building core backend systems and AI-driven operational tooling. Shipped a real-time inference pipeline that reduced model latency by 40%. Designed a distributed task queue handling 10K+ jobs/day."

### P3-9: Footer "All rights reserved" is unnecessary
**Issue:** This is a personal portfolio, not a commercial product. "All rights reserved" feels corporate and defensive.  
**Suggestion:** "2026 Vasu Bhardwaj. Crafted with care." or just "2026 Vasu Bhardwaj."

---

## 5. Mobile-Specific Issues

| Issue | Severity | Notes |
|-------|----------|-------|
| Hero title too large | P1 | `12vw` causes overflow and pushes CTA too low |
| Stats heatmap width | P2 | Heatmap may need horizontal scroll on very small screens |
| Experience timeline | P1 | Single entry with timeline dot looks like a bug |
| Project card text padding | P2 | `px-6` on mobile feels cramped for long descriptions |
| Terminal modal padding | P2 | `p-4 md:p-8` wastes precious vertical space on mobile. Use `p-0` and full-height terminal. |
| Footer grid | P2 | 3-column grid stacks to 1-column but gap-12 feels excessive |

---

## 6. Proposed Fix Plan

### Phase 1: Critical Fixes (P0)
1. Add project images to `public/` or use placeholder service.
2. Fix "Live" links — remove if no demo exists.
3. Add a real resume PDF and wire up the download button.
4. Add clipboard copy feedback in terminal.

### Phase 2: Visual Polish (P1 + P2)
5. Cap hero title size on mobile.
6. Replace single-entry timeline with a featured job card.
7. Standardize button styles (primary / secondary).
8. Add mobile menu animation.
9. Fix terminal header dot alignment.
10. Standardize border colors.

### Phase 3: Content Overhaul (P3)
11. Rewrite hero copy to be concrete, not abstract.
12. Rename "Case Studies" to "Featured Projects" (or add more projects).
13. Rewrite project descriptions for clarity.
14. Replace vanity stats with meaningful metrics.
15. Add a Skills/Tech Stack section.
16. Add a short About/Bio section.
17. Soften the military jargon in the CTA section.
18. Add specific accomplishments to the Experience description.

---

## Approval Checklist

Before I start fixing, please review and let me know:

- [ ] **Which Phase 1 fixes should I prioritize?**
- [ ] **Do you have project screenshots I should use, or should I generate placeholders?**
- [ ] **Do you have a resume PDF I can add, or should I skip the download button?**
- [ ] **For the Experience section: do you have other jobs/internships to add, or should I convert the timeline to a single card?**
- [ ] **Which content rewrite suggestions do you agree with? Any you want to keep as-is?**
- [ ] **Should I add a Skills/Tech Stack section? If yes, what technologies should I list?**

Once you approve, I'll implement everything in order of priority.
