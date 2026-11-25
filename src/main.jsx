import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import anime from 'animejs/lib/anime.es.js';
import {
  bootstrap5, canva, colab, css3, expressjs, figma, firebase, git, github,
  html5, java, js, mongodb, nodejs, numpy, pandas, prisma, python, react as reactLogo,
  render, tailwindcss, vscode,
} from 'tech-stack-icons/icons.json';
import cppLogo from './assets/icons/cplusplus.svg';
import '../styles.css';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'rilVAIOmGF41FQxDl';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_zqdsdfl';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_xq8g7s5';

const links = [
  ['Home', '#home'], ['About Me', '#about'], ['Education & Experience', '#education'],
  ['Skills', '#skills'], ['Projects', '#projects'], ['Certification', '#certifications'], ['Contact', '#contact'],
];
const socials = [
  { label: 'LinkedIn', brand: 'linkedin', href: 'https://www.linkedin.com/in/tejasai-gudla/', icon: 'fab fa-linkedin-in', external: true },
  { label: 'Email', brand: 'email', href: 'mailto:teja75003@gmail.com', icon: 'far fa-envelope' },
  { label: 'GitHub', brand: 'github', href: 'https://github.com/TEJA-100', icon: 'fab fa-github', external: true },
  { label: 'Codeolio', brand: 'codeolio', href: 'https://codolio.com/profile/Teja%20Sai%20GUDLA', icon: 'fas fa-code', external: true },
];
const certificates = [
  { title: 'C++ Skill Up', provider: 'GeeksforGeeks', date: 'September 23, 2026', dateTime: '2026-09-23', image: '/certificates/cplusplus-gfg.png', icon: 'fa-laptop-code', seal: 'GFG', href: 'https://drive.google.com/file/d/1U9IkTcQHbHRn7-JkhWyOi1fzG3n06lE-/view?pli=1' },
  { title: 'Object Oriented Programming through Java', provider: 'Aditya University · Coursera', date: 'September 10, 2026', dateTime: '2026-09-10', image: '/certificates/java-oop-aditya.png', icon: 'fa-mug-hot', seal: 'AU', href: '/certificates/java-oop-aditya.png' },
  { title: 'Responsive Web Design', provider: 'freeCodeCamp', date: 'October 4, 2025', dateTime: '2025-10-04', image: '/certificates/responsive-web-design-freecodecamp.png', icon: 'fa-code', seal: 'FCC', href: 'https://www.freecodecamp.org/certification/teja24b11ec100/responsive-web-design' },
  { title: 'Legacy JavaScript Algorithms and Data Structures V7', provider: 'freeCodeCamp', date: 'April 15, 2026', dateTime: '2026-04-15', image: '/certificates/javascript-algorithms-freecodecamp.png', icon: 'fa-code-branch', seal: 'FCC', href: 'https://www.freecodecamp.org/certification/teja24b11ec100/javascript-algorithms-and-data-structures' },
  { title: 'NumPy and Pandas Basics for Future Data Scientists', provider: 'Coursera · University of Michigan', date: 'March 5, 2026', dateTime: '2026-03-05', image: '/certificates/numpy-pandas-coursera.png', icon: 'fa-chart-line', seal: 'CO', href: 'https://www.coursera.org/account/accomplishments/verify/PKJT36F9TO8T' },
  { title: 'Free Python Course', provider: 'GeeksforGeeks', date: 'Course edition · 2025', image: '/certificates/python-gfg.png', icon: 'fa-terminal', seal: 'GFG', href: 'https://media.geeksforgeeks.org/courses/certificates/46bafb535a635ef3b6bb3d4d5203493d.pdf' },
];
const projects = [
  { title: 'ResuMatch — AI-Powered Resume Analyzer', description: 'A full-stack resume analysis platform that evaluates resumes against job requirements using ATS-based skill matching and scoring. Automated document parsing, candidate dashboards, and recruiter-focused features simplify resume evaluation.', highlights: ['Parses PDF and DOCX resumes to extract candidate information and skills.', 'Matches skills against job requirements and calculates resume scores.', 'Provides JWT authentication with separate candidate and recruiter dashboards.'], tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'REST APIs', 'PDF Parsing', 'DOCX Parsing'], date: 'MAY 2026', demo: 'https://resu-match-one.vercel.app/', repo: 'https://github.com/TEJA-100/ResuMatch', image: '/projects/ats-resume.png', icon: 'fa-file-lines', accent: 'resume' },
  { title: 'TaskFlow — Task Management Application', description: 'A MERN-stack task management application for organizing daily activities through a structured, intuitive interface. It supports task organization, priority management, and progress tracking for personal productivity and workflow management.', highlights: ['Create, edit, delete, and track tasks by status.', 'Organize work with priorities, categories, due dates, and subtasks.', 'Uses REST APIs and MongoDB for persistent task management.'], tags: ['React.js', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JavaScript'], date: 'MAY 2026', demo: 'https://to-do-list-seven-delta-15.vercel.app/', repo: 'https://github.com/TEJA-100/TaskFlow', image: '/projects/taskflow.png', icon: 'fa-list-check', accent: 'taskflow' },
  { title: 'Naviel', description: 'Responsive company website with Home, About, Services, Projects, and Contact pages, plus an inquiry form built with a component-based architecture.', tags: ['React', 'JavaScript', 'Tailwind CSS'], date: 'JANUARY 2026', demo: 'https://naviel.vercel.app/', repo: 'https://github.com/TEJA-100/Naviel', image: '/projects/naviel.png', icon: 'fa-compass', accent: 'naviel' },
  { title: 'AquaMart', description: 'An aquarium e-commerce experience with organized product categories and intuitive navigation, optimized for smooth cross-browser use.', tags: ['HTML', 'CSS', 'Netlify'], date: 'NOVEMBER 2025', demo: 'https://aquamart-ts.netlify.app/', repo: 'https://github.com/TEJA-100/AquaMart-', image: '/projects/aquamart.png', icon: 'fa-fish', accent: 'aqua' },
  { title: 'DesignHub', description: 'A responsive graphic design course website with course details, curriculum, tools, pricing, certification, and student reviews.', tags: ['HTML5', 'CSS3', 'Bootstrap'], date: 'DECEMBER 2025', demo: 'https://designhub-ts.netlify.app/', repo: 'https://github.com/TEJA-100/DesignHub', image: '/projects/designhub.png', icon: 'fa-pen-ruler', accent: 'design' },
];
const hardwareProjects = [
  { title: 'Smart Agriculture Monitoring System', highlights: ['Collects real-time temperature, humidity, and soil moisture readings using ESP32.', 'Transmits sensor data through MQTT and integrates cloud services with FastAPI.', 'Uses eight sensor records for ML prediction and the current record for LLM analysis.'], tags: ['ESP32', 'DHT11', 'Soil Moisture Sensor', 'Arduino IDE', 'C++', 'MQTT', 'HiveMQ Cloud', 'Python', 'FastAPI', 'Machine Learning', 'LLM Integration'], date: '', repo: 'https://github.com/TEJA-100/ESP32-Smart-IOT-Farming-System', icon: 'fa-seedling', accent: 'agriculture', media: [{ label: 'Hardware view', image: '/projects/agriculture-hardware.jpeg' }, { label: 'Dashboard view', image: '/projects/agriculture-dashboard.png' }] },
  { title: 'Smart Patient Health Monitoring System', highlights: ['Monitors heart rate using the SEN-11574 pulse sensor and temperature using LM35.', 'Uses LM741 operational amplifiers for analog signal conditioning.', 'Provides an ESP32-hosted dashboard with buzzer alerts for abnormal readings.'], tags: ['ESP32', 'Arduino IDE', 'Embedded C/C++', 'LM35', 'SEN-11574', 'LM741', 'Wi-Fi', 'HTML', 'CSS', 'JavaScript', 'WebServer'], date: 'OCTOBER 31', repo: 'https://github.com/TEJA-100/Smart-Patient-Health-Monitoring', icon: 'fa-heart-pulse', accent: 'patient', media: [{ label: 'Hardware view', image: '/projects/patient-hardware.jpeg' }, { label: 'Website dashboard', image: '/projects/patient-dashboard.png' }] },
  { title: 'Obstacle Avoiding Robot', highlights: ['Detects obstacles and automatically changes direction to avoid collisions.', 'Controls motor movement through an Arduino-based embedded system.', 'Uses sensor-based decision-making for autonomous navigation.'], tags: ['Arduino UNO', 'Embedded C', 'Ultrasonic Sensor', 'L293D Motor Driver', 'DC Motors', 'Servo Motor', 'AFMotor Library'], date: 'AUGUST 4, 2026', repo: '', icon: 'fa-robot', accent: 'boat', media: [{ label: 'Project view', image: '/projects/moving-bot.jpeg' }] },
];
// Leave this list empty until proficiency data is supplied. Add { name, level } entries to show ratings.
const technicalRatings = [];
const services = [
  { title: 'Frontend Development', description: 'Building responsive, interactive, and modern user interfaces with seamless user experiences.', stack: 'React · JavaScript · Tailwind CSS', icon: 'fa-display', color: 'service-cyan' },
  { title: 'Backend Engineering', description: 'Developing secure APIs, server-side logic, authentication, and scalable database systems.', stack: 'Node.js · Express.js · MongoDB', icon: 'fa-server', color: 'service-violet' },
  { title: 'Full-Stack Applications', description: 'Creating end-to-end web applications, connecting frontend interfaces with powerful backend infrastructure.', stack: 'MERN Stack · REST APIs', icon: 'fa-layer-group', color: 'service-amber' },
  { title: 'IoT & Hardware Integration', description: 'Integrating microcontrollers, sensors, and electronic components into connected smart systems.', stack: 'ESP32 · Arduino · Sensors', icon: 'fa-microchip', color: 'service-rose' },
];

function ExternalLink({ href, children, ...props }) {
  return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
}

function SocialLinks({ className = '' }) {
  return <div className={className}>{socials.map(({ label, brand, href, icon, external }) => {
    const Link = external ? ExternalLink : 'a';
    return <Link key={label} className={`social-link social-link-${brand}`} href={href} aria-label={label}><i className={icon} aria-hidden="true" />{className.includes('about-socials') && <span>{label}</span>}</Link>;
  })}</div>;
}

function Eyebrow({ children }) { return <p className="eyebrow">{children}</p>; }
function SectionHeading({ number, eyebrow, title, intro, centered = false, id }) {
  return <div className={`section-heading${centered ? ' centered-heading' : ''}`}>
    <Eyebrow>{number} — {eyebrow}</Eyebrow><h2 id={id}>{title}</h2>{intro && <p className="section-intro">{intro}</p>}
  </div>;
}

function Header({ activeSection }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const closeOnOutside = event => { if (!menuRef.current?.contains(event.target)) setOpen(false); };
    const closeOnEscape = event => { if (event.key === 'Escape') { setOpen(false); menuRef.current?.querySelector('.menu-toggle')?.focus(); } };
    document.addEventListener('pointerdown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => { document.removeEventListener('pointerdown', closeOnOutside); document.removeEventListener('keydown', closeOnEscape); };
  }, [open]);
  return <header className="site-header" ref={menuRef}>
    <nav className="nav-shell" aria-label="Main navigation">
      <a className="wordmark" href="#home" aria-label="Teja Sai Gudla, home">TS<span>.</span></a>
      <button className={`menu-toggle${open ? ' is-open' : ''}`} type="button" aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => { const next = !open; setOpen(next); if (next) window.setTimeout(() => menuRef.current?.querySelector('.nav-links a')?.focus({ preventScroll: true }), 0); }}><span /><span /></button>
      <ul className={`nav-links${open ? ' is-open' : ''}`} id="primary-navigation">{links.map(([label, href]) => <li key={href}><a href={href} className={activeSection === href.slice(1) ? 'active' : ''} aria-current={activeSection === href.slice(1) ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a></li>)}</ul>
      <a className="nav-contact" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
    </nav>
  </header>;
}

function PageLoadingBar() {
  const [introLoading, setIntroLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timeout;
    let intro;
    if (reduced) { setProgress(100); timeout = window.setTimeout(() => setIntroLoading(false), 300); }
    else {
      const counter = { value: 0 };
      intro = anime.timeline({ complete: () => { setProgress(100); setIntroLoading(false); } });
      intro
        .add({ targets: '.site-loader-brand', opacity: [0, 1], scale: [.88, 1], duration: 360, easing: 'easeOutExpo' })
        .add({ targets: '.site-loader-caption', opacity: [0, 1], translateY: [8, 0], duration: 240, easing: 'easeOutQuad' }, '-=100')
        .add({ targets: '.site-loader-track span', scaleX: [0, 1], duration: 720, easing: 'easeInOutQuad' }, '-=80')
        .add({ targets: counter, value: 100, round: 1, duration: 720, easing: 'easeInOutQuad', update: () => setProgress(counter.value) }, '-=720')
        .add({ targets: '.site-loader', opacity: [1, 0], duration: 420, delay: 120, easing: 'easeInOutQuad' });
    }
    const trigger = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[href]');
      if (!link || link.hasAttribute('download')) return;
      const href = link.getAttribute('href') || '';
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      window.clearTimeout(timeout);
      setActive(true);
      setCycle(value => value + 1);
      timeout = window.setTimeout(() => setActive(false), 900);
    };
    document.addEventListener('click', trigger, true);
    return () => { intro?.pause(); window.clearTimeout(timeout); document.removeEventListener('click', trigger, true); };
  }, []);
  return <>
    {introLoading && <div className="site-loader" role="status" aria-label="Loading portfolio"><div className="loader-orbit loader-orbit-one" /><div className="loader-orbit loader-orbit-two" /><div className="site-loader-inner"><div className="site-loader-brand">TS<span>.</span></div><p className="site-loader-caption">Preparing the portfolio</p><div className="site-loader-track"><span /></div><p className="loader-percent" aria-hidden="true">{progress}%</p><p className="site-loader-foot">TEJA SAI · SOFTWARE DEVELOPER</p></div></div>}
    <div className={`page-loading-bar${active ? ' is-active' : ''}`} key={cycle} aria-hidden="true"><span /></div>
  </>;
}

function Hero() {
  const [role, setRole] = useState('MERN STACK DEVELOPER');
  useEffect(() => {
    const roles = ['MERN STACK DEVELOPER', 'AI ENGINEER', 'UI/UX DESIGNER', 'FREELANCER', 'IoT ENTHUSIAST'];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let active = true;
    let phraseIndex = 0;
    let visibleRole = roles[0];
    let runningAnimation;
    const animateCharacters = async (from, to, duration) => {
      const progress = { length: from };
      runningAnimation = anime({
        targets: progress,
        length: to,
        round: 1,
        duration,
        easing: 'linear',
        update: () => {
          visibleRole = roles[phraseIndex].slice(0, progress.length);
          if (active) setRole(visibleRole);
        },
      });
      await runningAnimation.finished;
    };
    const sequence = async () => {
      while (active) {
        await new Promise(resolve => setTimeout(resolve, 2050));
        if (!active) break;
        await animateCharacters(visibleRole.length, 0, Math.max(200, visibleRole.length * 34));
        phraseIndex = (phraseIndex + 1) % roles.length;
        visibleRole = '';
        await animateCharacters(0, roles[phraseIndex].length, roles[phraseIndex].length * 60);
      }
    };
    sequence();
    return () => { active = false; runningAnimation?.pause(); };
  }, []);
  return <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
    <h1 className="visually-hidden" id="hero-title">Teja Sai Gudla — Software Developer</h1>
    <div className="hero-stage" aria-hidden="true">
      <div className="hero-grid" />
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
      <div className="hero-orbit orbit-three" />
      <span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /><span className="orbit-dot dot-three" />
      <span className="hero-binary binary-one">0101<br />0010<br />1101</span><span className="hero-binary binary-two">1010<br />0101<br />0011</span>
      <span className="hero-kinetic-word">{role}<span className="hero-type-cursor">|</span></span>
      <img className="hero-portrait" src="/hero-person.png" alt="" />
    </div>
    <ul className="hero-badges" aria-label="Focus areas"><li className="hero-badge badge-dsa"><i className="fas fa-code-branch" aria-hidden="true" /><span>DSA</span></li><li className="hero-badge badge-web"><i className="fas fa-globe" aria-hidden="true" /><span>Web Development</span></li><li className="hero-badge badge-rag"><i className="fas fa-brain" aria-hidden="true" /><span>RAG</span></li><li className="hero-badge badge-hardware"><i className="fas fa-microchip" aria-hidden="true" /><span>Hardware</span></li></ul>
    <div className="hero-actions-only" aria-label="Explore the portfolio"><a className="button button-lime" href="#projects">My previous works <span aria-hidden="true">↘</span></a><ExternalLink className="button button-outline hero-cv-button" href="https://drive.google.com/uc?export=download&id=1SknwOn0uy4_Thfxtp_JNLkXe02BPu3-s" aria-label="Download my CV" title="Download my CV"><i className="fas fa-file-arrow-down" aria-hidden="true" />My Resume</ExternalLink></div>
    <a className="hero-scroll-cue" href="#about"><span className="scroll-cue-line" aria-hidden="true" />SCROLL TO EXPLORE <span className="scroll-cue-arrow" aria-hidden="true">↓</span></a>
  </section>;
}

function About() {
  return <section className="section-wrap about-section" id="about" aria-labelledby="about-title">
    <SectionHeading number="01" eyebrow="A LITTLE ABOUT ME" id="about-title" title={<>Code with Purpose.<br /><span>Build for Impact.</span></>} />
    <div className="about-layout"><figure className="about-photo-frame"><img src="/profile1.jpg" alt="Teja Sai Gudla in a black suit at his university" className="about-photo" /></figure>
      <div className="about-copy-block"><div className="about-identity"><Eyebrow>HELLO, I’M TEJA SAI GUDLA</Eyebrow><h3>Software Developer</h3><p className="about-specialty">MERN STACK DEVELOPER · IOT ENTHUSIAST · GENAI</p></div><p>I’m an Electronics and Communication Engineering undergraduate at Aditya University, driven by an interest in engineering software, exploring emerging technologies, and translating complex ideas into practical digital solutions.</p><p>My technical expertise spans JavaScript, React, Node.js, Express.js, and MongoDB, with a focus on crafting intuitive web experiences, robust REST APIs, and scalable backend architectures.</p><p>I’m expanding my knowledge of Generative AI, Retrieval-Augmented Generation (RAG), and intelligent application development, exploring how AI capabilities can be integrated into meaningful real-world systems.</p><SocialLinks className="about-socials" /><ExternalLink className="button button-lime about-resume" href="https://drive.google.com/uc?export=download&id=1SknwOn0uy4_Thfxtp_JNLkXe02BPu3-s"><i className="fas fa-file-pdf" aria-hidden="true" />Download my CV</ExternalLink></div>
    </div>
    <div className="stats-grid" aria-label="Portfolio statistics"><article className="stat-card"><span className="stat-number">08+</span><span className="stat-label">Projects</span></article><article className="stat-card"><span className="stat-number">02</span><span className="stat-label">Months Experience</span></article></div>
  </section>;
}

const education = [
  { date: '2024 — PRESENT', title: 'Bachelor of Technology', company: 'Aditya University', location: 'Surampalem', detail: 'Electronics and Communication Engineering', extra: 'CGPA: 8.23 / 10' },
  { date: 'JUNE 2022 — MAY 2024', title: 'Intermediate · M.P.C', company: 'Aditya Junior College', location: 'Rajamahendravaram', detail: 'Board of Intermediate Education', extra: 'CGPA: 9.31' },
];
const experience = [
  { date: 'MAY 2026 — JUNE 2026', title: 'MERN Stack Developer', company: 'Eduexpose Pvt. Ltd.', location: 'Hyderabad', href: 'https://www.eduexpose.in/', certificate: '/certificates/eduexpose-internship.png', bullets: ['Built hands-on experience with React, Node.js, Express.js, and MongoDB.', 'Developed ResuMatch with REST APIs, JWT authentication, resume parsing, and ATS-based candidate matching.', 'Built TaskFlow to strengthen API integration, database management, and full-stack workflows.'] },
  { date: 'DECEMBER 2025 — APRIL 2026', title: 'UX Designer & Frontend Developer', company: 'Naviel', location: 'Surampalem', href: 'https://naviel.vercel.app/', bullets: ['Designed and developed responsive login interfaces with HTML, CSS, and JavaScript.', 'Built interactive GPS tracking dashboards and frontend modules for EventHub and the Naviel company website.', 'Improved responsive layouts and collaborated with backend developers using Git and GitHub.'] },
];
function TimelineGroup({ title, entries }) {
  return <div className="timeline-group"><h3 className="subsection-label">{title}</h3><div className="timeline">{entries.map(entry => <article className="timeline-entry" key={entry.title}><span className="timeline-marker" aria-hidden="true" /><div className="timeline-card"><p className="timeline-date">{entry.date}</p><h4>{entry.title}</h4>{entry.company && <p className="timeline-company">{entry.href ? <ExternalLink href={entry.href}>{entry.company}</ExternalLink> : entry.company}</p>}{entry.location && <p className="timeline-location"><i className="fas fa-location-dot" aria-hidden="true" />{entry.location}</p>}{entry.detail && <p>{entry.detail}</p>}{entry.extra && <p className="timeline-detail">{entry.extra}</p>}{entry.bullets && <ul>{entry.bullets.map(text => <li key={text}><span className="timeline-bullet" aria-hidden="true" />{text}</li>)}</ul>}{entry.certificate && <ExternalLink className="timeline-certificate-link" href={entry.certificate} aria-label={`View ${entry.company} internship certificate`}><i className="fas fa-award" aria-hidden="true" /><span>View certificate</span><i className="fas fa-arrow-up-right-from-square timeline-certificate-external" aria-hidden="true" /></ExternalLink>}</div></article>)}</div></div>;
}
function Journey() {
  return <section className="section-wrap timeline-section" id="education" aria-labelledby="education-title"><SectionHeading number="02" eyebrow="THE JOURNEY SO FAR" id="education-title" centered title={<>Education <span>&amp;</span> Experience</>} intro="A few steps, lessons, and teams that have shaped how I build." /><TimelineGroup title="Education" entries={education} /><div className="experience-group"><TimelineGroup title="Experience" entries={experience} /></div></section>;
}

const techIcons = { bootstrap5, canva, colab, css3, expressjs, figma, firebase, git, github, html5, java, js, mongodb, nodejs, numpy, pandas, prisma, python, react: reactLogo, render, tailwindcss, vscode };
function TechStackIcon({ name, className = '' }) {
  if (name === 'c-mark') return <span className={`tech-stack-mark tech-stack-mark-c${className ? ` ${className}` : ''}`} aria-hidden="true">C</span>;
  if (name === 'cpp') return <img className={`tech-stack-icon${className ? ` ${className}` : ''}`} src={cppLogo} alt="" aria-hidden="true" />;
  const svg = techIcons[name]?.svg?.dark;
  return svg ? <img className={`tech-stack-icon${className ? ` ${className}` : ''}`} src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`} alt="" aria-hidden="true" /> : null;
}
const skillGroups = [
  { title: 'Programming Languages', items: [['Python', 'python'], ['C', 'c-mark'], ['C++', 'cpp'], ['Java', 'java'], ['JavaScript', 'js']] },
  { title: 'Frontend Development', items: [['HTML5', 'html5'], ['CSS3', 'css3'], ['Bootstrap', 'bootstrap5'], ['Tailwind CSS', 'tailwindcss'], ['React.js', 'react']] },
  { title: 'Backend & Tools', items: [['Node.js', 'nodejs'], ['Express.js', 'expressjs'], ['Firebase', 'firebase'], ['MongoDB', 'mongodb'], ['Git', 'git'], ['GitHub', 'github'], ['VS Code', 'vscode'], ['Render', 'render']] },
  { title: 'Libraries', items: [['NumPy', 'numpy'], ['Pandas', 'pandas'], ['Matplotlib', 'fa-chart-column']] },
];
const hardwareSkillGroups = [
  { title: 'Hardware', items: [['Arduino Uno', 'fa-microchip'], ['ESP32', 'fa-wifi'], ['NodeMCU', 'fa-microchip'], ['Sensor Integration', 'fa-tower-broadcast'], ['ESP32 Web Server Communication', 'fa-network-wired'], ['PCB Designing', 'fa-diagram-project']] },
  { title: 'Tools', items: [['Arduino IDE', 'fa-code'], ['ThingSpeak', 'fa-chart-line'], ['Blynk IoT', 'fa-wifi'], ['EasyEDA', 'fa-draw-polygon']] },
];
function SkillIcon({ icon }) {
  if (!icon) return null;
  return icon.startsWith('fa-') ? <i className={`fas ${icon}`} aria-hidden="true" /> : <TechStackIcon name={icon} />;
}
function SkillGroup({ title, items }) {
  return <div className="skill-category"><h3>{title}</h3><div className="skill-items">{items.map(([name, icon]) => <span className="skill-chip" key={name}><SkillIcon icon={icon} />{name}</span>)}</div></div>;
}
function Skills() {
  const [tab, setTab] = useState('software');
  const choose = (next) => setTab(next);
  const onKeyDown = event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); const next = tab === 'software' ? 'hardware' : 'software'; choose(next); document.getElementById(`${next}-tab`)?.focus(); } };
  return <section className="section-wrap skills-section" id="skills" aria-labelledby="skills-title"><SectionHeading number="03" eyebrow="WHAT I WORK WITH" id="skills-title" title={<>Skills &amp; <span>toolkit.</span></>} intro="A growing set of tools for shaping practical, thoughtful products." />
    <div className="skill-tabs" role="tablist" aria-label="Skill category" onKeyDown={onKeyDown}><button className={`skill-tab${tab === 'software' ? ' is-active' : ''}`} id="software-tab" role="tab" type="button" aria-selected={tab === 'software'} aria-controls="software-panel" tabIndex={tab === 'software' ? 0 : -1} onClick={() => choose('software')}>Software Skills</button><button className={`skill-tab${tab === 'hardware' ? ' is-active' : ''}`} id="hardware-tab" role="tab" type="button" aria-selected={tab === 'hardware'} aria-controls="hardware-panel" tabIndex={tab === 'hardware' ? 0 : -1} onClick={() => choose('hardware')}>Hardware Skills</button></div>
    <div className="skills-panel" id="software-panel" role="tabpanel" aria-labelledby="software-tab" hidden={tab !== 'software'}>{skillGroups.map(group => <SkillGroup key={group.title} {...group} />)}</div>
    <div className="skills-panel hardware-panel" id="hardware-panel" role="tabpanel" aria-labelledby="hardware-tab" hidden={tab !== 'hardware'}>{hardwareSkillGroups.map(group => <SkillGroup key={group.title} {...group} />)}</div>
    <div className="ratings-block services-block"><div className="services-intro"><Eyebrow>HOW I CAN HELP</Eyebrow><h3>What My <span>Services</span></h3><p>Engineering digital experiences, intelligent applications, and connected systems.</p></div><div className="services-grid">{services.map(service => <article className={`service-card ${service.color}`} key={service.title}><span className="service-icon"><i className={`fas ${service.icon}`} aria-hidden="true" /></span><h4>{service.title}</h4><p>{service.description}</p><span className="service-stack">{service.stack}</span></article>)}</div></div>
  </section>;
}

function ProjectLinks({ demo, repo }) { return <div className="project-links">{demo && <ExternalLink href={demo} aria-label="Visit live project"><i className="fas fa-arrow-up-right-from-square" /></ExternalLink>}{repo && <ExternalLink href={repo} aria-label="View GitHub repository"><i className="fab fa-github" /></ExternalLink>}</div>; }
function FeaturedProject() {
  return <article className="featured-project"><div className="featured-preview" aria-label="Profile Card Generator project concept"><div className="preview-topbar"><span className="preview-brand"><i className="fas fa-id-card" /> PROFILE / CARD</span><span className="preview-menu">01 — 05</span></div><div className="preview-card"><span className="preview-avatar"><i className="fas fa-user" /></span><span className="preview-spark">✳</span><p className="preview-caption">YOUR LINKS,</p><h3>All in one<br /><span>place.</span></h3><div className="preview-link-row"><span>in</span><span>✉</span><span>⌘</span><span>↗</span></div></div><div className="preview-foot"><span>PROFILE CARD GENERATOR</span><span>BUILT WITH JS <i className="fab fa-js" /></span></div></div>
    <div className="featured-info"><Eyebrow>FEATURED PROJECT · 01</Eyebrow><h3>Profile Card<br /><span>Generator</span></h3><p className="project-summary">A dynamic web app for creating a shareable profile card with social links. Uses local storage for session-based persistence and Firebase for secure data storage and retrieval.</p><div className="project-tech">{['HTML', 'CSS', 'JavaScript', 'Firebase'].map(item => <span key={item}>{item}</span>)}</div><div className="project-actions"><ExternalLink href="https://js-projects-ashy.vercel.app/" className="button button-lime">Live project <span aria-hidden="true">↗</span></ExternalLink><ExternalLink href="https://github.com/TEJA-100/Js-Projects/tree/main/ProfileCardGenerator" className="button button-outline"><i className="fab fa-github" aria-hidden="true" /> Repository</ExternalLink></div><p className="project-date">FEBRUARY 2026</p></div></article>;
}
function ProjectCarousel() {
  const [category, setCategory] = useState('software');
  const [index, setIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const collection = category === 'software' ? projects : hardwareProjects;
  const current = collection[index % collection.length];
  const media = current.media || [];

  useEffect(() => { setIndex(0); setMediaIndex(0); }, [category]);
  useEffect(() => {
    if (paused || hovered || focused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setIndex(value => (value + 1) % collection.length), 2800);
    return () => window.clearInterval(timer);
  }, [category, collection.length, paused, hovered, focused]);
  useEffect(() => {
    if (media.length < 2 || paused || hovered || focused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setMediaIndex(value => (value + 1) % media.length), 3000);
    return () => window.clearInterval(timer);
  }, [category, index, media.length, paused, hovered, focused]);
  const choose = next => { setIndex((next + collection.length) % collection.length); setMediaIndex(0); };
  const keyControl = event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      choose(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  };
  const selectedMedia = media[mediaIndex];

  return <div className="project-showcase" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} onKeyDown={keyControl}>
    <div className="project-switch" role="tablist" aria-label="Project category">
      <button type="button" role="tab" aria-selected={category === 'software'} className={category === 'software' ? 'is-active' : ''} onClick={() => setCategory('software')}>Software Projects <span>05</span></button>
      <button type="button" role="tab" aria-selected={category === 'hardware'} className={category === 'hardware' ? 'is-active' : ''} onClick={() => setCategory('hardware')}>Hardware Projects <span>03</span></button>
    </div>
    <article className={`project-slide project-slide-${current.accent}`} key={`${category}-${current.title}`}>
      <div className={`project-slide-visual${selectedMedia?.image || current.image ? ' has-project-image' : ''}`}>
        {selectedMedia?.image || current.image ? <img src={selectedMedia?.image || current.image} alt={`${current.title} ${selectedMedia?.label || 'project preview'}`} /> : <div className="project-slide-placeholder"><i className={`fas ${current.icon}`} aria-hidden="true" /><span>{selectedMedia?.label || current.title}</span><small>PROJECT PREVIEW</small></div>}
        <span className="project-visual-index">{String(index + 1).padStart(2, '0')} / {String(collection.length).padStart(2, '0')}</span>
        {media.length > 1 && <div className="project-media-dots" role="group" aria-label={`${current.title} images`}>{media.map((item, mediaItemIndex) => <button key={item.label} type="button" className={mediaIndex === mediaItemIndex ? 'is-active' : ''} aria-label={`Show ${item.label}`} aria-pressed={mediaIndex === mediaItemIndex} onClick={() => setMediaIndex(mediaItemIndex)} />)}</div>}
      </div>
      <div className="project-slide-copy"><Eyebrow>{category === 'software' ? 'SOFTWARE PROJECT' : 'HARDWARE PROJECT'} · {String(index + 1).padStart(2, '0')}</Eyebrow><h3>{current.title}</h3>{current.company && <p className="project-subtitle">{current.company}</p>}{current.description && <p className="project-slide-description">{current.description}</p>}{current.highlights?.length > 0 && <ul className="project-highlights">{current.highlights.map(item => <li key={item}>{item}</li>)}</ul>}<div className="project-tags">{current.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-slide-footer"><time>{current.date || (selectedMedia?.label || '')}</time><ProjectLinks demo={current.demo} repo={current.repo} /></div></div>
    </article>
    <div className="project-carousel-controls"><button type="button" aria-label="Previous project" onClick={() => choose(index - 1)}>←</button><div className="project-carousel-dots" role="group" aria-label="Choose a project">{collection.map((project, itemIndex) => <button key={project.title} type="button" aria-label={`Show ${project.title}`} aria-current={index === itemIndex ? 'true' : undefined} className={index === itemIndex ? 'is-active' : ''} onClick={() => choose(itemIndex)} />)}</div><button type="button" aria-label="Next project" onClick={() => choose(index + 1)}>→</button><button className="project-carousel-pause" type="button" aria-label={paused ? 'Resume project carousel' : 'Pause project carousel'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Play' : 'Pause'}</button></div>
  </div>;
}
function Projects() {
  return <section className="section-wrap projects-section" id="projects" aria-labelledby="projects-title"><SectionHeading number="04" eyebrow="SELECTED WORK" id="projects-title" title={<>Ideas, made <span>real.</span></>} intro="A selection of projects built through curiosity, iteration, and plenty of coffee." /><ProjectCarousel /></section>;
}

function Certificates() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const certificate = certificates[active];
  const choose = index => { if (index === active) return; if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setActive(index); return; } anime.remove('.cert-feature'); anime({ targets: '.cert-feature', opacity: [1, 0], translateY: [0, 8], duration: 160, easing: 'easeInQuad', complete: () => { setActive(index); requestAnimationFrame(() => anime({ targets: '.cert-feature', opacity: [0, 1], translateY: [8, 0], duration: 300, easing: 'easeOutQuad' })); } }); };
  useEffect(() => {
    if (paused || hovered || focused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => choose((active + 1) % certificates.length), 2800);
    return () => window.clearInterval(timer);
  }, [active, paused, hovered, focused]);
  const onKeyDown = event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); const change = event.key === 'ArrowRight' ? 1 : -1; const next = (active + change + certificates.length) % certificates.length; choose(next); document.querySelector(`[data-cert-index="${next}"]`)?.focus(); } };
  return <section className="section-wrap cert-section" id="certifications" aria-labelledby="cert-title"><SectionHeading number="05" eyebrow="LEARNING IN PUBLIC" id="cert-title" title={<>Certifications &amp; <span>milestones.</span></>} intro="Courses and credentials that mark a few steps in the learning journey." /><div className="cert-carousel" role="region" aria-roledescription="carousel" aria-label="Certificates" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}><div className="cert-track" aria-live={paused || hovered || focused ? 'polite' : 'off'}><article className="cert-feature" key={certificate.title}><div className={`cert-art${certificate.image ? ' has-image' : ''}`}>{certificate.image ? <img className="cert-image" src={certificate.image} alt={`${certificate.title} certificate from ${certificate.provider}`} /> : <><span className="cert-art-label">CERTIFICATE / <b>{String(active + 1).padStart(2, '0')}</b></span><i className={`fas ${certificate.icon}`} aria-hidden="true" /><span className="cert-art-line" /><span className="cert-art-seal">{certificate.seal}</span></>}</div><div className="cert-feature-copy"><Eyebrow>CERTIFICATE {String(active + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}</Eyebrow><h3>{certificate.title}</h3><p className="cert-provider">{certificate.provider}</p><p className="cert-date">{certificate.dateTime ? <time dateTime={certificate.dateTime}>{certificate.date}</time> : certificate.date}</p><ExternalLink className="text-link" href={certificate.href}>View certificate <span aria-hidden="true">↗</span></ExternalLink></div></article></div><div className="cert-controls"><button className="cert-arrow" type="button" aria-label="Previous certificate" onClick={() => choose((active - 1 + certificates.length) % certificates.length)}>←</button><div className="cert-dots" role="group" aria-label="Choose a certificate" onKeyDown={onKeyDown}>{certificates.map((item, index) => <button key={item.title} type="button" data-cert-index={index} className={`cert-dot${active === index ? ' is-active' : ''}`} aria-label={`Show ${item.title} certificate`} aria-current={active === index ? 'true' : undefined} onClick={() => choose(index)} />)}</div><button className="cert-arrow" type="button" aria-label="Next certificate" onClick={() => choose((active + 1) % certificates.length)}>→</button><span className="cert-counter"><span>{String(active + 1).padStart(2, '0')}</span> / {String(certificates.length).padStart(2, '0')}</span><button className="cert-toggle" type="button" aria-label={paused ? 'Resume automatic certificate carousel' : 'Pause automatic certificate carousel'} aria-pressed={paused} onClick={() => setPaused(value => !value)}><span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span></button></div></div></section>;
}

function Contact() {
  const [status, setStatus] = useState('');
  const [statusTone, setStatusTone] = useState('');
  const [sending, setSending] = useState(false);
  const submit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const value = field => form.elements.namedItem(field)?.value?.trim() || '';
    if (!window.emailjs) { setStatusTone('is-error'); setStatus('Email delivery is unavailable right now. Please use the email link to contact me directly.'); return; }
    setSending(true); setStatusTone(''); setStatus('Sending your message…');
    try {
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: 'teja75003@gmail.com',
        to_name: 'Teja Sai Gudla',
        name: value('name'),
        from_name: value('name'),
        email: value('email'),
        from_email: value('email'),
        reply_to: value('email'),
        subject: value('subject'),
        message: value('message'),
      });
      form.reset(); setStatusTone('is-success'); setStatus('Thanks — your message has been sent.');
    }
    catch (error) {
      console.error('EmailJS contact form error:', error);
      const detail = typeof error?.text === 'string' ? error.text : '';
      setStatusTone('is-error');
      setStatus(detail ? `Your message could not be sent: ${detail}` : 'Your message could not be sent. Please check the email service settings or email me directly.');
    }
    finally { setSending(false); }
  };
  return <section className="section-wrap contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-intro"><Eyebrow>06 — HAVE A GOOD ONE IN MIND?</Eyebrow><h2 id="contact-title">Let’s make<br /><span>something together.</span></h2><p>Have a project, opportunity, or idea you’d like to discuss? I’d love to hear about it.</p><a className="contact-email" href="mailto:teja75003@gmail.com">teja75003@gmail.com <span aria-hidden="true">↗</span></a><a className="contact-phone" href="tel:+917386475223"><i className="fas fa-phone" aria-hidden="true" /> +91 73864 75223</a><p className="contact-location"><i className="fas fa-location-dot" aria-hidden="true" /> Rajamahendravaram</p><SocialLinks className="contact-socials" /></div>
    <form className="contact-form" onSubmit={submit}><div className="form-row"><label>Your name<input type="text" name="name" autoComplete="name" placeholder="Name" required /></label><label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label></div><label>Subject<input type="text" name="subject" placeholder="What’s this about?" required /></label><label>Your message<textarea name="message" rows="4" placeholder="A little about what you have in mind…" required /></label><button className="button button-lime send-button" type="submit" disabled={sending}><span>{sending ? 'Sending…' : 'Send message'}</span><i className="fas fa-arrow-up-right-from-square" aria-hidden="true" /></button><p className={`form-status ${statusTone}`} role="status" aria-live="polite">{status}</p></form>
  </section>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-grid"><div className="footer-brand-col"><a className="wordmark footer-wordmark" href="#home">TS<span>.</span></a><p>Building thoughtful digital<br />experiences, one idea at a time.</p><SocialLinks className="footer-socials" /></div><div className="footer-col"><h2>EXPLORE</h2>{links.slice(1, 5).map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div><div className="footer-col"><h2>MORE</h2>{links.slice(5).map(([label, href]) => <a href={href} key={href}>{label}</a>)}<ExternalLink href="https://drive.google.com/file/d/1SknwOn0uy4_Thfxtp_JNLkXe02BPu3-s/view?usp=sharing">Resume <span aria-hidden="true">↗</span></ExternalLink></div><div className="footer-contact"><h2>GET IN TOUCH</h2><a className="footer-email" href="mailto:teja75003@gmail.com">teja75003@gmail.com <span aria-hidden="true">↗</span></a><a className="footer-email" href="tel:+917386475223">+91 73864 75223</a><p>Open to conversations about opportunities and thoughtful collaborations.</p></div></div><div className="footer-bottom"><span>© 2026 Teja Sai Gudla. All rights reserved.</span><a href="#home">Back to top ↑</a><span>DESIGNED &amp; BUILT WITH INTENTION</span></div></footer>;
}

const assistantSuggestions = [
  'Tell me about Teja Sai',
  'Explore my projects',
  'What are my technical skills?',
  'Tell me about my experience',
  'What are my IoT skills?',
  'How can I contact Teja?',
];

function getAssistantAnswer(question) {
  const q = question.toLowerCase();
  if (/contact|email|phone|reach|linkedin/.test(q)) return `You can reach Teja at [teja75003@gmail.com](mailto:teja75003@gmail.com) or call **+91 73864 75223**. He is also on [LinkedIn](https://www.linkedin.com/in/tejasai-gudla/) and [GitHub](https://github.com/TEJA-100).`;
  if (/iot|hardware|agriculture|patient|bot|robot|embedded|esp32|arduino/.test(q)) return `Teja's IoT and hardware work includes **Smart Agriculture Monitoring**, **Smart Patient Health Monitoring**, and an **Obstacle Avoiding Robot**. His hands-on areas include ESP32, Arduino UNO, sensor integration, embedded C/C++, MQTT, and ESP32-hosted dashboards.\n\nAsk me to [explore the projects](#projects) or jump to the [hardware project section](#projects).`;
  if (/skill|stack|technology|technical|language|react|rag|tool/.test(q)) return `Teja works across software and hardware: **JavaScript, React, Node.js, Express.js, MongoDB, REST APIs, and Git**, alongside **C/C++, Arduino UNO, ESP32, sensor integration, and MQTT**. He is also exploring **Generative AI and RAG**.\n\n[See the skills section](#skills).`;
  if (/experience|career|intern|eduexpose|naviel|work history/.test(q)) return `Teja has **two months of experience** as a MERN Stack Developer at Eduexpose in Hyderabad, where he worked with React, Node.js, Express.js, MongoDB, and full-stack application workflows. He also worked as a UX Designer and Frontend Developer with Naviel in Surampalem from December 2025 to April 2026.\n\n[View the timeline](#education).`;
  if (/education|university|college|degree|study|cgpa/.test(q)) return `Teja is pursuing a **B.Tech in Electronics and Communication Engineering at Aditya University, Surampalem**. He completed Intermediate MPC at **Aditya Junior College, Rajamahendravaram**.\n\n[See education and experience](#education).`;
  if (/certif|certificate|achievement|credential/.test(q)) return `Teja's certificates include C++ Skill Up from GeeksforGeeks, Responsive Web Design and JavaScript Algorithms from freeCodeCamp, Python from GeeksforGeeks, and NumPy and Pandas from the University of Michigan on Coursera.\n\n[Browse the certificates](#certifications).`;
  if (/project|work|portfolio|resumatch|taskflow|naviel|aquamart|designhub/.test(q)) return `Here are some of Teja's projects:\n\n### Software projects\n- [ResuMatch](https://resu-match-one.vercel.app/) · [GitHub](https://github.com/TEJA-100/ResuMatch)\n- [TaskFlow](https://to-do-list-seven-delta-15.vercel.app/) · [GitHub](https://github.com/TEJA-100/TaskFlow)\n- [Naviel](https://naviel.vercel.app/) · [GitHub](https://github.com/TEJA-100/Naviel)\n- [AquaMart](https://aquamart-ts.netlify.app/) · [GitHub](https://github.com/TEJA-100/AquaMart-)\n- [DesignHub](https://designhub-ts.netlify.app/) · [GitHub](https://github.com/TEJA-100/DesignHub)\n\n### Hardware projects\n- Smart Agriculture Monitoring · [GitHub](https://github.com/TEJA-100/ESP32-Smart-IOT-Farming-System)\n- Smart Patient Health Monitoring · [GitHub](https://github.com/TEJA-100/Smart-Patient-Health-Monitoring)\n- Obstacle Avoiding Robot\n\n[Open the projects section](#projects).`;
  if (/about|teja|who|introduc|bio|yourself/.test(q)) return `Teja Sai Gudla is an Electronics and Communication Engineering undergraduate at Aditya University who enjoys building practical software and connected systems. He works with the MERN stack, explores Generative AI and RAG, and brings an interdisciplinary interest in embedded systems and IoT.\n\n[Learn more about Teja](#about).`;
  return `I can help you explore Teja's **projects, skills, experience, education, certificates, and contact details**. Try one of the suggested questions, or ask about a specific project or technology.`;
}

function AssistantMarkdown({ text }) {
  const inline = (value, keyPrefix) => value.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\((?:https?:\/\/|mailto:|#)[^)\s]+\))/g).filter(Boolean).map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={key}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={key}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={key} href={link[2]} target={link[2].startsWith('http') ? '_blank' : undefined} rel={link[2].startsWith('http') ? 'noreferrer' : undefined}>{link[1]}</a>;
    return part;
  });
  return <div className="assistant-markdown">{text.split(/\n\s*\n/).map((block, blockIndex) => {
    const lines = block.split('\n');
    if (lines[0].startsWith('### ')) {
      const rest = lines.slice(1);
      return <div key={blockIndex}><h4>{inline(lines[0].slice(4), `h-${blockIndex}`)}</h4>{rest.length > 0 && rest.every(line => /^\s*[-*]\s+/.test(line)) && <ul>{rest.map((line, index) => <li key={index}>{inline(line.replace(/^\s*[-*]\s+/, ''), `hlist-${blockIndex}-${index}`)}</li>)}</ul>}</div>;
    }
    if (lines.every(line => /^\s*[-*]\s+/.test(line))) return <ul key={blockIndex}>{lines.map((line, index) => <li key={index}>{inline(line.replace(/^\s*[-*]\s+/, ''), `l-${blockIndex}-${index}`)}</li>)}</ul>;
    return <p key={blockIndex}>{lines.map((line, index) => <React.Fragment key={index}>{index > 0 && <br />}{inline(line, `p-${blockIndex}-${index}`)}</React.Fragment>)}</p>;
  })}</div>;
}

function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);
  const transcriptRef = useRef(null);
  const replyTimerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(replyTimerRef.current), []);
  useEffect(() => {
    if (!open || minimized) return;
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [messages, typing, open, minimized]);
  useEffect(() => {
    if (!open) return;
    const handleEscape = event => { if (event.key === 'Escape') closeChat(); };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  const closeChat = () => { window.clearTimeout(replyTimerRef.current); setTyping(false); setMinimized(false); setOpen(false); requestAnimationFrame(() => triggerRef.current?.focus()); };
  const sendMessage = (value = draft) => {
    const question = value.trim();
    if (!question || typing) return;
    setMessages(current => [...current, { id: `${Date.now()}-user`, role: 'user', text: question }]);
    setDraft('');
    setTyping(true);
    replyTimerRef.current = window.setTimeout(() => {
      setMessages(current => [...current, { id: `${Date.now()}-assistant`, role: 'assistant', text: getAssistantAnswer(question) }]);
      setTyping(false);
    }, 650);
  };
  const clearChat = () => { window.clearTimeout(replyTimerRef.current); setMessages([]); setTyping(false); };
  const showChat = () => { setOpen(true); setMinimized(false); window.setTimeout(() => inputRef.current?.focus(), 80); };

  return <div className="ts-assistant-widget">
    {open && <section className={`ts-chat-panel${minimized ? ' is-minimized' : ''}`} role="dialog" aria-modal="false" aria-labelledby="ts-chat-title">
      <header className="ts-chat-header"><span className="ts-chat-avatar" aria-hidden="true">TS</span><div className="ts-chat-heading"><h2 id="ts-chat-title">TS Assistant</h2><p><span className="ts-online-dot" />Portfolio AI Assistant</p></div><div className="ts-chat-controls">{messages.length > 0 && <button type="button" className="ts-chat-control" onClick={clearChat} aria-label="Clear chat" title="Clear chat"><i className="fas fa-rotate-left" aria-hidden="true" /></button>}<button type="button" className="ts-chat-control" onClick={() => setMinimized(value => !value)} aria-label={minimized ? 'Restore chat' : 'Minimize chat'} title={minimized ? 'Restore chat' : 'Minimize chat'}><i className={`fas ${minimized ? 'fa-up-right-and-down-left-from-center' : 'fa-minus'}`} aria-hidden="true" /></button><button type="button" className="ts-chat-control" onClick={closeChat} aria-label="Close chat" title="Close chat"><i className="fas fa-xmark" aria-hidden="true" /></button></div></header>
      {!minimized && <><div className="ts-chat-transcript" ref={transcriptRef} aria-live="polite">
        <div className="ts-chat-message assistant-message"><span className="ts-message-avatar" aria-hidden="true">TS</span><div className="ts-message-content"><AssistantMarkdown text={'Hey! 👋 Welcome to my portfolio.\n\nI’m TS Assistant, your AI guide. I can help you explore my technical skills, projects, experience, education and achievements.\n\nWhat would you like to know?'} /></div></div>
        {messages.map(message => <div className={`ts-chat-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`} key={message.id}>{message.role === 'assistant' && <span className="ts-message-avatar" aria-hidden="true">TS</span>}<div className="ts-message-content">{message.role === 'assistant' ? <AssistantMarkdown text={message.text} /> : message.text}</div></div>)}
        {messages.length === 0 && <div className="ts-chat-suggestions"><p>Suggested questions</p>{assistantSuggestions.map(question => <button key={question} type="button" onClick={() => sendMessage(question)}>{question}<i className="fas fa-arrow-up-right-from-square" aria-hidden="true" /></button>)}</div>}
        {typing && <div className="ts-chat-message assistant-message"><span className="ts-message-avatar" aria-hidden="true">TS</span><div className="ts-typing-indicator" role="status" aria-label="TS Assistant is typing"><span /><span /><span /></div></div>}
      </div><form className="ts-chat-composer" onSubmit={event => { event.preventDefault(); sendMessage(); }}><input ref={inputRef} type="text" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Ask anything about Teja..." aria-label="Ask TS Assistant" /><button type="submit" disabled={!draft.trim() || typing} aria-label="Send message"><i className="fas fa-arrow-up" aria-hidden="true" /></button><p>Enter to send · <button type="button" onClick={clearChat}>Clear chat</button></p></form></>}
      {minimized && <button type="button" className="ts-chat-restore" onClick={() => setMinimized(false)}>Chat is minimized <span>Restore</span></button>}
    </section>}
    {!open && <><span className="ts-chat-tooltip" role="tooltip">Chat with TS Assistant</span><button ref={triggerRef} type="button" className="ts-chat-launcher" aria-label="Chat with TS Assistant" aria-expanded={open} onClick={showChat}><span className="ts-chat-launcher-icon"><span className="ts-chat-launcher-monogram">TS</span><span className="ts-chat-launcher-spark" aria-hidden="true">✦</span></span><span className="ts-chat-launcher-ping" aria-hidden="true" /></button></>}
  </div>;
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    if (window.emailjs) window.emailjs.init(EMAILJS_PUBLIC_KEY);
    const sections = document.querySelectorAll('main section[id]');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }), { rootMargin: '-32% 0px -58% 0px' });
    sections.forEach(section => observer.observe(section));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      anime({ targets: '.site-header', opacity: [0, 1], duration: 780, easing: 'easeOutQuad' });
      anime({ targets: '.nav-links a, .wordmark, .nav-contact', opacity: [0, 1], translateY: [-8, 0], delay: anime.stagger(45, { start: 180 }), duration: 560, easing: 'easeOutCubic' });
      anime({ targets: '.hero-kinetic-word', opacity: [0, 1], duration: 1250, easing: 'easeOutExpo' });
      anime({ targets: '.hero-actions-only a', translateY: [18, 0], opacity: [0, 1], delay: anime.stagger(110, { start: 260 }), duration: 980, easing: 'easeOutExpo' });
      anime({ targets: '.orbit-one, .orbit-two, .orbit-three', rotate: [0, 360], duration: 90000, loop: true, easing: 'linear' });
      anime({ targets: '.hero-portrait', opacity: [0, 1], translateY: [34, 0], scale: [.96, 1], duration: 1450, delay: 140, easing: 'easeOutExpo', complete: () => anime({ targets: '.hero-portrait', translateY: [0, -8], direction: 'alternate', duration: 5000, loop: true, easing: 'easeInOutSine' }) });
      anime({ targets: '.hero-badge', opacity: [0, 1], delay: anime.stagger(95, { start: 480 }), duration: 820, easing: 'easeOutQuad' });
      anime({ targets: '.hero-binary', opacity: [.18, .62], translateY: [0, -12], direction: 'alternate', duration: 3900, loop: true, delay: anime.stagger(440), easing: 'easeInOutSine' });
      anime({ targets: '.hero-scroll-cue .scroll-cue-arrow', translateY: [0, 5], direction: 'alternate', duration: 1150, loop: true, easing: 'easeInOutSine' });
      const revealSelector = [
        '.section-heading', '.about-photo-frame', '.about-identity', '.about-copy-block > p', '.about-socials', '.about-resume', '.stat-card',
        '.timeline-group > .subsection-label', '.timeline-entry', '.skill-tabs', '.skill-category', '.service-card',
        '.project-switch', '.project-slide', '.project-carousel-controls', '.cert-feature', '.cert-controls',
        '.contact-intro > *', '.contact-form', '.footer-grid > *', '.footer-bottom > *',
      ].join(',');
      const revealTargets = document.querySelectorAll(revealSelector);
      revealTargets.forEach(element => { element.style.opacity = '0'; element.style.transform = 'translateY(24px)'; });
      const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        const element = entry.target;
        if (entry.isIntersecting) {
          anime.remove(element);
          anime({ targets: element, opacity: [0, 1], translateY: [24, 0], duration: 740, easing: 'easeOutCubic', complete: () => element.style.removeProperty('transform') });
        } else if (element.style.opacity !== '0') {
          anime.remove(element);
          element.style.opacity = '0';
          element.style.transform = 'translateY(24px)';
        }
      }), { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });
      revealTargets.forEach(element => revealObserver.observe(element));
      let heroHasExited = false;
      const heroElement = document.querySelector('.hero');
      const heroObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) { heroHasExited = true; return; }
        if (!heroHasExited) return;
        heroHasExited = false;
        anime({ targets: '.hero-kinetic-word, .hero-scroll-cue', opacity: [.65, 1], duration: 980, easing: 'easeOutCubic' });
        anime({ targets: '.hero-badge, .hero-actions-only a', opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(80), duration: 880, easing: 'easeOutCubic' });
        anime.remove('.hero-portrait');
        anime({ targets: '.hero-portrait', opacity: [.78, 1], translateY: [15, 0], scale: [.985, 1], duration: 1250, easing: 'easeOutExpo', complete: () => anime({ targets: '.hero-portrait', translateY: [0, -8], direction: 'alternate', duration: 5000, loop: true, easing: 'easeInOutSine' }) });
      }), { threshold: 0.18 });
      if (heroElement) heroObserver.observe(heroElement);
      return () => { observer.disconnect(); revealObserver.disconnect(); heroObserver.disconnect(); anime.remove('*'); };
    }
    return () => observer.disconnect();
  }, []);
  return <><PageLoadingBar /><a className="skip-link" href="#main">Skip to content</a><Header activeSection={activeSection} /><main id="main"><Hero /><About /><Journey /><Skills /><Projects /><Certificates /><Contact /></main><Footer /><ChatAssistant /></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
