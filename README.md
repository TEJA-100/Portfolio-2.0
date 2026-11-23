# TejaSai Portfolio 2.0

A responsive, animated portfolio for Teja Sai Gudla, an Electronics and Communication Engineering undergraduate at Aditya University. It presents education, experience, software and hardware skills, projects, certificates, and contact details in a dark interface with lime accents.

## Features

- Animated hero with role typing, portrait, orbit graphics, and project/CV links
- Responsive navigation and layouts for desktop, tablet, and mobile
- Scroll reveals and section backgrounds with reduced-motion support
- Education and experience timelines
- Software/hardware skill tabs and grouped technology icons
- Software and hardware project carousels, including project previews
- Certificate carousel with dates and links
- Contact form integrated with EmailJS

## Tech stack

- React 19 for the component-based interface
- Vite 6 for local development and production builds
- Anime.js for hero, loader, and interaction animations
- `tech-stack-icons` and Font Awesome for technology and interface icons
- HTML5 and custom responsive CSS
- EmailJS for contact form delivery

## Color palette

| Purpose | Color | Hex |
| --- | --- | --- |
| Page background | Near black | `#090A08` |
| Secondary background | Deep charcoal | `#0E100D` |
| Card surface | Charcoal | `#11130F` |
| Primary text | Off-white | `#F2F3ED` |
| Secondary text | Muted gray | `#92958D` |
| Dividers and borders | Dark gray | `#292C25` |
| Main accent | Neon lime | `#CAFF54` |

Small technology and service icons also use their recognizable brand colors.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

## EmailJS configuration

Set these variables in a local `.env.local` file or the deployment environment:

```text
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

Configure the EmailJS template to deliver to `teja75003@gmail.com` (the code supplies `to_email` and `reply_to` parameters). Reconnect the Gmail service in EmailJS if it reports an invalid OAuth grant. Never commit private provider credentials or OAuth tokens.

## Project structure

```text
index.html
src/main.jsx
src/assets/icons/
styles.css
public/
  certificates/
  projects/
  favicon.png
package.json
```

