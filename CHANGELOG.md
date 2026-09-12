# Changelog

All notable changes to AI Today will be documented in this file.

## [Unreleased] - 2026-09-12

### Fixed
- JSON-LD @context URLs fixed on index.html and all post pages (was broken `https://***`)
- Feed elements verified: guid, atom:link, category present on all items
- Sitemap lastmod present on all URLs
- robots meta + canonical tags verified on all pages

## [1.0.0] - 2026-09-11

### Added
- AI Today blog: frontier models, safety, policy and business — reported daily
- Index page with lead story, sidebar cards, story grid, newsletter signup
- 7 article posts: GPT-6 Astra, Rogue Agents, Loss of Control, Claude Fable 5.1, Sandbagging, NYC Schools ban, Music lawsuit
- Desk pages: Models, Safety, Policy
- RSS feed (feed.xml) with guid, atom:link, category
- Sitemap (sitemap.xml) with lastmod on all URLs
- JSON-LD structured data (Blog on index, BlogPosting on posts)
- robots meta + canonical on all pages
- Client-side search, filtering, dark mode toggle, scroll progress
- GitHub Pages deployment via Actions