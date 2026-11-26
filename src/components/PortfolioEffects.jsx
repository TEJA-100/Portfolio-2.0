import React, { useEffect, useRef } from 'react';

const reduceMotionQuery = '(prefers-reduced-motion: reduce)';

export function ParticleBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return undefined;

    const motionPreference = window.matchMedia(reduceMotionQuery);
    const pointer = { x: -1000, y: -1000 };
    let particles = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frameId = 0;
    let lastFrame = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const count = width < 640 ? 19 : width < 1000 ? 29 : 40;
      particles = Array.from({ length: count }, () => {
        const radius = 0.65 + Math.random() * 1.15;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.17,
          vy: (Math.random() - 0.5) * 0.17,
          radius,
          alpha: 0.17 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
        };
      });
      if (motionPreference.matches) render(0, true);
    };

    const render = (time, staticFrame = false) => {
      if (!staticFrame && !motionPreference.matches) frameId = window.requestAnimationFrame(render);
      context.clearRect(0, 0, width, height);

      if (!staticFrame) {
        const seconds = Math.min((time - lastFrame) / 1000 || 0.016, 0.05);
        lastFrame = time;
        for (const point of particles) {
          const dx = point.x - pointer.x;
          const dy = point.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 135 && distance > 0) {
            const influence = (1 - distance / 135) * 0.018;
            point.vx += (dx / distance) * influence;
            point.vy += (dy / distance) * influence;
          }
          point.vx *= 0.992;
          point.vy *= 0.992;
          point.x += point.vx * seconds * 60;
          point.y += point.vy * seconds * 60;
          if (point.x < -6) point.x = width + 6;
          if (point.x > width + 6) point.x = -6;
          if (point.y < -6) point.y = height + 6;
          if (point.y > height + 6) point.y = -6;
        }
      }

      for (let first = 0; first < particles.length; first += 1) {
        const a = particles[first];
        for (let second = first + 1; second < particles.length; second += 1) {
          const b = particles[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 105) {
            context.strokeStyle = 'rgba(202,255,84,' + (0.065 * (1 - distance / 105)) + ')';
            context.lineWidth = 0.65;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      particles.forEach(point => {
        const pulse = staticFrame ? 1 : 0.78 + Math.sin(time * 0.0006 + point.phase) * 0.22;
        context.fillStyle = 'rgba(202,255,84,' + (point.alpha * pulse) + ')';
        context.shadowBlur = point.radius * 5;
        context.shadowColor = 'rgba(202,255,84,.32)';
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fill();
      });
      context.shadowBlur = 0;
    };

    const movePointer = event => {
      if (event.pointerType !== 'touch') {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      }
    };
    const motionChanged = () => {
      window.cancelAnimationFrame(frameId);
      lastFrame = 0;
      if (motionPreference.matches) render(0, true);
      else frameId = window.requestAnimationFrame(render);
    };

    resize();
    if (!motionPreference.matches) frameId = window.requestAnimationFrame(render);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', movePointer, { passive: true });
    motionPreference.addEventListener('change', motionChanged);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', movePointer);
      motionPreference.removeEventListener('change', motionChanged);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-particles" aria-hidden="true" />;
}

export function CursorFollower() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(pointer: fine) and (min-width: 900px)');
    const motionPreference = window.matchMedia(reduceMotionQuery);
    if (!cursor || !finePointer.matches || motionPreference.matches) return undefined;

    const move = event => {
      cursor.style.left = event.clientX + 'px';
      cursor.style.top = event.clientY + 'px';
      cursor.classList.add('is-visible');
      cursor.classList.toggle('is-interactive', Boolean(event.target.closest('a, button, input, textarea, [role="button"]')));
    };
    const hide = () => cursor.classList.remove('is-visible');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', hide);
    };
  }, []);

  return <span ref={cursorRef} className="cursor-follower" aria-hidden="true" />;
}

export function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    const progress = progressRef.current;
    let frameId = 0;
    const update = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
        progress?.style.setProperty('--scroll-progress', String(Math.max(0, Math.min(1, amount))));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />;
}

export function MagneticInteractions() {
  useEffect(() => {
    const motionPreference = window.matchMedia(reduceMotionQuery);
    let activeTarget = null;
    const reset = target => {
      if (!target) return;
      target.style.translate = '';
      if (activeTarget === target) activeTarget = null;
    };
    const move = event => {
      if (motionPreference.matches || event.pointerType === 'touch') return;
      const target = event.target.closest?.('.button, .nav-links a');
      if (activeTarget && activeTarget !== target) reset(activeTarget);
      if (!target) return;
      activeTarget = target;
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
      target.style.translate = Math.max(-4, Math.min(4, x * 5)) + 'px ' + Math.max(-4, Math.min(4, y * 5)) + 'px';
    };
    const leave = event => {
      const target = event.target.closest?.('.button, .nav-links a');
      if (target && !target.contains(event.relatedTarget)) reset(target);
    };
    const motionChanged = () => { if (motionPreference.matches) reset(activeTarget); };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leave, { passive: true });
    motionPreference.addEventListener('change', motionChanged);
    return () => {
      reset(activeTarget);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leave);
      motionPreference.removeEventListener('change', motionChanged);
    };
  }, []);

  return null;
}
