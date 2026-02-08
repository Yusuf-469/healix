import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export const useLandingScroll = (containerRef) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const lenis = new Lenis({ duration: 1.2, smooth: true });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.timeline({
        scrollTrigger: { trigger: '#section-hero', start: 'top top', end: 'bottom top', scrub: 1, pin: true }
      })
      .fromTo('#hero-brand', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.3 })
      .to('#hero-container', { opacity: 0, scale: 1.5, filter: 'blur(20px)', duration: 0.2 }, 0.8);

      // Doctor showcase
      gsap.timeline({
        scrollTrigger: { trigger: '#section-doctor', start: 'top bottom', end: 'bottom top', scrub: 1, pin: true }
      })
      .fromTo('#doctor-model', { y: '100vh', opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 })
      .fromTo('#doctor-info', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 }, 0.4)
      .fromTo('#doctor-features li', { x: -30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.05 }, 0.5);

      // Stethoscope showcase
      gsap.timeline({
        scrollTrigger: { trigger: '#section-analyzer', start: 'top bottom', end: 'bottom top', scrub: 1, pin: true }
      })
      .fromTo('#stethoscope-model', { y: '100vh', rotateZ: -180 }, { y: 0, rotateZ: 0, duration: 0.3 })
      .fromTo('#analyzer-scan-line', { scaleX: 0 }, { scaleX: 1, duration: 0.2 }, 0.7);

      // Syringe showcase
      gsap.timeline({
        scrollTrigger: { trigger: '#section-tracker', start: 'top bottom', end: 'bottom top', scrub: 1, pin: true }
      })
      .fromTo('#syringe-model', { x: '100vw', rotateZ: 360 }, { x: 0, rotateZ: 15, duration: 0.3 });

      // Pills showcase
      gsap.timeline({
        scrollTrigger: { trigger: '#section-medication', start: 'top bottom', end: 'bottom top', scrub: 1, pin: true }
      })
      .fromTo('#pills-model', { y: '100vh' }, { y: 0, duration: 0.3 })
      .to('#pills-cap', { y: -50, rotateZ: 15, duration: 0.2 }, 0.3);

      // Dashboard showcase
      gsap.timeline({
        scrollTrigger: { trigger: '#section-dashboard', start: 'top bottom', end: 'bottom top', scrub: 1, pin: true }
      })
      .fromTo('#dashboard-model', { scale: 0 }, { scale: 1, duration: 0.4 });

      // FAQ cards
      gsap.fromTo('#faq-cards', { y: 100, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1,
        scrollTrigger: { trigger: '#section-faq', start: 'top 80%', scrub: 1 }
      });

      // Contact section
      gsap.timeline({
        scrollTrigger: { trigger: '#section-contact', start: 'top bottom', end: 'bottom bottom', scrub: 1 }
      })
      .fromTo('#about-content', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 })
      .fromTo('#contact-content', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0.2);
    }, containerRef);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy();
    };
  }, [containerRef]);
};
