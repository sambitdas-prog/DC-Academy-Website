# DC Academy

DC Academy is a static marketing website for a Kolkata-based coaching center focused on Class 11/12 board preparation and competitive exam training. The project is built with plain HTML, CSS, and JavaScript, and includes a landing page, legal policy pages, and assets for branding and visual presentation.

## Project Overview

The site is designed to showcase:
- coaching programs for ICSE, CBSE, WBCHSE board students
- preparation for WBJEE, JEE Mains, and NEET physics
- modern landing page sections such as hero, features, testimonials, FAQs, and contact form
- legal pages for privacy and terms
- theme toggling and interactive UI components

## Files Included

- `index.html` — main landing page with navigation, hero section, program highlights, FAQ, and contact form
- `privacy.html` — privacy policy page with contact details and information handling statements
- `terms.html` — terms & conditions page describing enrollment, fee, attendance, and liability rules
- `index.css` — shared stylesheet for all pages, responsive layout, animations, and visual styling
- `index.js` — site interaction logic for the landing page (theme toggle, mobile menu, header behavior, slide shows, tabs, accordion, and toast notifications)
- `legal.js` — shared JS used by the legal pages for theme toggling and header behavior
- `assets/` — static media including favicon, logo, slideshow images, and other visual assets

## Features

- Responsive landing page optimized for desktop and mobile
- Dark/light theme toggle persisted in `localStorage`
- Hero slideshow with rotating images
- Sticky header with active section highlighting
- Mobile hamburger menu and internal anchor navigation
- FAQ accordion and tabbed highlights content
- Privacy and terms legal pages with the same look-and-feel as the main site
- SEO-friendly meta tags and accessible image alt text

## Usage

### View locally
1. Open `index.html` directly in your browser.
2. Or run a local web server from the project folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Deploy
Because this is a static website, it can be hosted on any static web host such as GitHub Pages, Netlify, Vercel, Firebase Hosting, or plain Apache/Nginx.

## URL
dcacademybirati.vercel.app

### Editing
- Update content in `index.html`, `privacy.html`, and `terms.html`
- Modify styling in `index.css`
- Change interactive behavior in `index.js` or `legal.js`
- Add or replace assets inside `assets/`

### Recommended improvements
- Add validation or backend integration for the contact form
- Add a `LICENSE` file for project distribution
- Add a small build step or bundler if the project grows in complexity
- Add unit tests or visual regression checks if desired

## Notes

- `index.html` uses Google FontAwesome icons via CDN for decorative iconography.
- `privacy.html` and `terms.html` are linked from the footer and use the same CSS and JS setup.
- There is no package manager configuration or build pipeline included.

## Contact

Update this section with the project owner or maintenance contact if you intend to share or publish the repository.
