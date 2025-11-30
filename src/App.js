
















    












// import React, { useState, useEffect, useRef } from 'react';
// import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

// const Portfolio = () => {
//   const [activeSection, setActiveSection] = useState(0);
//   const [isRotating, setIsRotating] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [autoPlay, setAutoPlay] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
//   const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);
//   const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

//   const wrapperRef = useRef(null);
//   const touchStartX = useRef(null);
//   const touchEndX = useRef(null);

//   const [radius, setRadius] = useState(300);
//   const sections = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

//   const professionalTitles = [
//     "Full Stack Developer",
//     "Web Developer",
//     "Associate Software Developer"
//   ];

//   const angle = 360 / sections.length;

//   useEffect(() => {
//     const computeRadius = () => {
//       const w = wrapperRef.current?.offsetWidth ?? 800;
//       const halfAngleRad = (Math.PI * (angle / 2)) / 180;
//       const computed = (w / 2) / Math.tan(halfAngleRad);
      
//       // Adjust radius based on screen size - tightened for mobile to prevent overflow
//       let minRadius = 160;
//       let maxRadius = 900;
      
//       if (window.innerWidth <= 480) {
//         minRadius = 120;
//         maxRadius = 180;
//       } else if (window.innerWidth <= 768) {
//         minRadius = 140;
//         maxRadius = 220;
//       } else if (window.innerWidth <= 1024) {
//         minRadius = 180;
//         maxRadius = 320;
//       }
      
//       setRadius(Math.max(minRadius, Math.min(computed, maxRadius)));
//     };

//     computeRadius();
//     const onResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
//       setIsSmallMobile(window.innerWidth <= 480);
//       computeRadius();
//     };
//     window.addEventListener('resize', onResize);
//     return () => window.removeEventListener('resize', onResize);
//   }, [angle]);

//   useEffect(() => {
//     const titleInterval = setInterval(() => {
//       setCurrentTitleIndex((prev) => (prev + 1) % professionalTitles.length);
//     }, 2000);
//     return () => clearInterval(titleInterval);
//   }, [professionalTitles.length]);

//   const navigateToSection = (index) => {
//     if (isRotating || index === activeSection) return;
//     setIsRotating(true);
//     setActiveSection(index);
//     setMenuOpen(false);
//     setAutoPlay(false);
//     setTimeout(() => setIsRotating(false), 900);
//   };

//   useEffect(() => {
//     if (!autoPlay) return;
//     const interval = setInterval(() => {
//       setActiveSection((prev) => (prev + 1) % sections.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [autoPlay, sections.length]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (isRotating) return;
//       if (e.key === 'ArrowRight') navigateToSection((activeSection + 1) % sections.length);
//       if (e.key === 'ArrowLeft') navigateToSection((activeSection - 1 + sections.length) % sections.length);
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [activeSection, isRotating, sections.length]);

//   useEffect(() => {
//     const el = wrapperRef.current;
//     if (!el) return;

//     const onTouchStart = (e) => {
//       touchStartX.current = e.touches[0].clientX;
//       touchEndX.current = null;
//     };
//     const onTouchMove = (e) => {
//       touchEndX.current = e.touches[0].clientX;
//     };
//     const onTouchEnd = () => {
//       if (touchStartX.current == null || touchEndX.current == null) return;
//       const diff = touchStartX.current - touchEndX.current;
//       const threshold = 40;
//       if (Math.abs(diff) > threshold) {
//         if (diff > 0) {
//           navigateToSection((activeSection + 1) % sections.length);
//         } else {
//           navigateToSection((activeSection - 1 + sections.length) % sections.length);
//         }
//       }
//       touchStartX.current = null;
//       touchEndX.current = null;
//     };

//     el.addEventListener('touchstart', onTouchStart, { passive: true });
//     el.addEventListener('touchmove', onTouchMove, { passive: true });
//     el.addEventListener('touchend', onTouchEnd, { passive: true });

//     return () => {
//       el.removeEventListener('touchstart', onTouchStart);
//       el.removeEventListener('touchmove', onTouchMove);
//       el.removeEventListener('touchend', onTouchEnd);
//     };
//   }, [activeSection, sections.length]);

//   const getRotation = () => `rotateY(${-activeSection * angle}deg)`;

//   const openLink = (url, newTab = true) => {
//     if (!url) return;
//     if (url.startsWith('mailto:')) {
//       window.location.href = url;
//       return;
//     }
//     if (newTab) {
//       window.open(url, '_blank', 'noopener,noreferrer');
//     } else {
//       window.location.href = url;
//     }
//   };

//   const projects = [
//     { icon: '📚', title: 'Novya', tags: ['React','Django','PostgreSQL','Bootstrap'], description: 'AI-powered Learning Management System for online courses.' },
//     { icon: '💹', title: 'Vunathi Capital', tags: ['React','Node.js','Firebase','Zerodha','Bootstrap'], description: 'Real-time trading platform displaying live P/L from Kite Connect.' },
//     { icon: '🧭', title: 'FlowTrack', tags: ['React','FastAPI','PostgreSQL','Bootstrap'], description: 'Ticketing tool with Kanban boards for admin and users.' },
//   ];

//   const skills = [
//     { category: 'Frontend', items: ['React','JavaScript','Angular','HTML5','CSS3','Tailwind','Bootstrap'] },
//     { category: 'Backend', items: ['Python','Django','Node.js','FastAPI','Java','Spring','Spring Boot','jdbc','Hibernate'] },
//     { category: 'Tools & Other', items: ['Github','REST APIs','Swagger','Postman','VScode','Eclipse'] },
//     { category: 'Database', items: ['PostgreSQL','Firebase','MySQL','Oracle'] },
//   ];

//   const styles = {
//     container: { 
//       minHeight: '100vh', 
//       display: 'flex', 
//       flexDirection: 'column', 
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
//       backgroundColor: '#f5f5f5', 
//       boxSizing: 'border-box', 
//       overflow: 'hidden' 
//     },
//     header: { 
//       display: 'flex', 
//       justifyContent: 'space-between', 
//       alignItems: 'center', 
//       padding: isMobile ? '0.6rem 1rem' : '1rem 2rem', 
//       backgroundColor: '#fef0f8', 
//       boxShadow: '0 4px 20px rgba(124,42,98,0.3)', 
//       position: 'sticky', 
//       top: 0, 
//       zIndex: 1000 
//     },
//     logoText: { 
//       margin: 0, 
//       color: '#000', 
//       fontSize: isMobile ? (isSmallMobile ? '1.4rem' : '1.5rem') : 'clamp(1.4rem, 2.2vw + 1rem, 2.2rem)', 
//       fontWeight: 'bold', 
//       background: 'linear-gradient(45deg,#7C2A62,#5a1a4a)', 
//       WebkitBackgroundClip: 'text', 
//       WebkitTextFillColor: 'transparent' 
//     },
//     tagline: { 
//       margin: 0, 
//       color: '#000', 
//       fontSize: isMobile ? (isSmallMobile ? '0.7rem' : '0.75rem') : 'clamp(.75rem, 1.2vw + .2rem, 0.9rem)', 
//       fontWeight: 500 
//     },
//     nav: { 
//       display: 'flex', 
//       alignItems: 'center', 
//       gap: isMobile ? '0.4rem' : '1.5rem' 
//     },
//     navButton: { 
//       padding: isMobile ? '0.4rem 0.6rem' : '0.75rem 1.5rem', 
//       border: 'none', 
//       backgroundColor: 'transparent', 
//       cursor: 'pointer', 
//       fontSize: isMobile ? (isSmallMobile ? '0.75rem' : '0.8rem') : '1rem', 
//       borderRadius: '25px', 
//       transition: 'all 0.3s ease', 
//       fontWeight: 600, 
//       color: '#000' 
//     },
//     activeNavButton: { 
//       backgroundColor: '#7C2A62', 
//       color: '#fff', 
//       boxShadow: '0 4px 15px rgba(124,42,98,0.5)' 
//     },
//     cubeContainer: { 
//       flex: 1, 
//       display: 'flex', 
//       alignItems: 'center', 
//       justifyContent: 'center', 
//       padding: isMobile ? '0.3rem' : '1rem', 
//       perspective: isMobile ? '600px' : '1400px', 
//       overflow: 'hidden' 
//     },
//     cubeWrapper: { 
//       width: 'calc(100% - 1rem)', 
//       maxWidth: isMobile ? '100%' : '900px', 
//       height: isMobile ? (isSmallMobile ? 'clamp(320px, 50vh, 380px)' : 'clamp(360px, 55vh, 440px)') : isTablet ? 'clamp(450px, 50vh, 600px)' : 'clamp(320px, 48vh, 720px)', 
//       position: 'relative', 
//       transformStyle: 'preserve-3d', 
//       transition: 'transform 900ms cubic-bezier(0.22,1,0.36,1)', 
//       willChange: 'transform' 
//     },
//     cubeFace: { 
//       position: 'absolute', 
//       width: '100%', 
//       height: '100%', 
//       backfaceVisibility: 'hidden', 
//       padding: isMobile ? (isSmallMobile ? '0.4rem' : '0.6rem') : '1rem', 
//       overflowY: 'auto', 
//       backgroundColor: 'white', 
//       borderRadius: isMobile ? '12px' : '18px', 
//       boxShadow: '0 8px 30px rgba(124,42,98,0.2)', 
//       boxSizing: 'border-box' 
//     }
//   };

//   const showOverlayContact = activeSection === 4;
//   const contactShiftDesktop = '-40px';
//   const contactShiftMobile = '0px'; // Removed negative margin to prevent cutting

//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         <div>
//           <h1 className="anim-float-3s anim-gpu" style={styles.logoText}>KM</h1>
//           <p style={styles.tagline}>Portfolio</p>
//         </div>

//         <nav style={{ 
//           ...styles.nav, 
//           display: menuOpen || !isMobile ? 'flex' : 'none', 
//           ...(isMobile && menuOpen ? { 
//             position: 'absolute', 
//             top: '100%', 
//             left: 0, 
//             right: 0, 
//             flexDirection: 'column', 
//             backgroundColor: '#F7D9EB', 
//             padding: '0.8rem', 
//             boxShadow: '0 4px 10px rgba(124,42,98,0.2)' 
//           } : {}) 
//         }}>
//           {sections.map((s, i) => (
//             <button
//               key={s}
//               onClick={() => navigateToSection(i)}
//               style={{ 
//                 ...styles.navButton, 
//                 ...(activeSection === i ? styles.activeNavButton : {}), 
//                 ...(isMobile && menuOpen ? { width: '100%' } : {}) 
//               }}
//               onMouseEnter={(e) => { if (activeSection !== i) e.currentTarget.style.backgroundColor = 'rgba(124,42,98,0.1)'; }}
//               onMouseLeave={(e) => { if (activeSection !== i) e.currentTarget.style.backgroundColor = 'transparent'; }}
//             >
//               {s}
//             </button>
//           ))}
//         </nav>

//         <button 
//           onClick={() => setMenuOpen(!menuOpen)} 
//           style={{ 
//             background: 'none', 
//             border: 'none', 
//             cursor: 'pointer', 
//             color: '#000', 
//             display: isMobile ? 'block' : 'none' 
//           }}
//         >
//           {menuOpen ? <X size={isMobile ? 24 : 28} /> : <Menu size={isMobile ? 24 : 28} />}
//         </button>
//       </header>

//       <div style={styles.cubeContainer}>
//         <div ref={wrapperRef} style={styles.cubeWrapper}>
//           <div
//             className="cube-rotator"
//             style={{
//               width: '100%',
//               height: '100%',
//               transform: getRotation(),
//               transformStyle: 'preserve-3d',
//               transition: 'transform 900ms cubic-bezier(0.22,1,0.36,1)',
//               willChange: 'transform'
//             }}
//           >
//             {sections.map((section, idx) => {
//               const faceTransform = `rotateY(${idx * angle}deg) translateZ(${radius}px)${activeSection === idx ? ' translateZ(2px)' : ''}`;
//               const faceClass = activeSection === idx ? 'cube-face active-face' : 'cube-face';
//               return (
//                 <section
//                   key={section}
//                   className={faceClass}
//                   style={{
//                     ...styles.cubeFace,
//                     transform: faceTransform,
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     justifyContent: 'center',
//                     textAlign: 'center',
//                     pointerEvents: activeSection === idx ? 'auto' : 'none'
//                   }}
//                 >
//                   <div className="face-content" style={{ maxWidth: isMobile ? 300 : 750, padding: isMobile ? (isSmallMobile ? '0.4rem' : '0.6rem') : '1rem', width: '100%' }}>
//                     {idx === 0 && (
//                       <>
//                         <h1 className="anim-float-3s anim-gpu" style={{ 
//                           fontSize: isMobile ? (isSmallMobile ? '1rem' : '1.2rem') : 'clamp(1.2rem, 2.6vw + .5rem, 2rem)', 
//                           fontWeight: '700', 
//                           color: '#7C2A62', 
//                           marginBottom: '0.8rem', 
//                           lineHeight: 1.2,
//                           wordBreak: 'break-word',
//                           hyphens: 'auto'
//                         }}>
//                           KRISHNA MOUNIKA VENGALA
//                         </h1>

//                         <div style={{ 
//                           height: isMobile ? (isSmallMobile ? 40 : 45) : 60, 
//                           marginBottom: '0.8rem', 
//                           display: 'flex', 
//                           alignItems: 'center', 
//                           justifyContent: 'center' 
//                         }}>
//                           <h2 className="anim-fade-2s anim-gpu" style={{ 
//                             fontSize: isMobile ? (isSmallMobile ? '0.85rem' : '0.95rem') : 'clamp(.95rem, 1.6vw + .1rem, 1.3rem)', 
//                             color: '#000', 
//                             fontWeight: 500 
//                           }}>
//                             {professionalTitles[currentTitleIndex]}
//                           </h2>
//                         </div>

//                         <p style={{ 
//                           fontSize: isMobile ? (isSmallMobile ? '0.75rem' : '0.8rem') : 'clamp(.85rem, 1.2vw, .95rem)', 
//                           color: '#000', 
//                           lineHeight: 1.4, 
//                           marginBottom: '1rem', 
//                           maxWidth: isMobile ? '280px' : 600, 
//                           margin: '0 auto 1rem',
//                           padding: isMobile ? '0 0.3rem' : '0'
//                         }}>
//                           I build modern full-stack applications with React and Django/FastAPI, delivering high performance, clean architecture, and seamless user experiences.
//                         </p>

//                         <div style={{ 
//                           display: 'flex', 
//                           gap: isMobile ? '0.4rem' : '.8rem', 
//                           justifyContent: 'center', 
//                           flexWrap: 'wrap',
//                           padding: isMobile ? '0 0.3rem' : '0'
//                         }}>
//                           <button 
//                             onClick={() => navigateToSection(2)} 
//                             style={{ 
//                               padding: isMobile ? '.3rem .6rem' : '.35rem .9rem', 
//                               background: '#7C2A62', 
//                               color: '#fff', 
//                               border: 'none', 
//                               borderRadius: 8, 
//                               fontSize: isMobile ? (isSmallMobile ? '0.65rem' : '0.7rem') : '.75rem', 
//                               fontWeight: 600, 
//                               cursor: 'pointer', 
//                               display: 'flex', 
//                               alignItems: 'center', 
//                               gap: '.3rem', 
//                               boxShadow: '0 4px 15px rgba(124,42,98,0.25)', 
//                               transition: 'transform .3s' 
//                             }} 
//                             onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} 
//                             onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
//                           >
//                             Explore My Work
//                           </button>

//                           <button 
//                             onClick={() => navigateToSection(4)} 
//                             style={{ 
//                               padding: isMobile ? '.3rem .6rem' : '.35rem .9rem', 
//                               background: 'transparent', 
//                               color: '#7C2A62', 
//                               border: '2px solid #7C2A62', 
//                               borderRadius: 8, 
//                               fontSize: isMobile ? (isSmallMobile ? '0.65rem' : '0.7rem') : '.75rem', 
//                               fontWeight: 600, 
//                               cursor: 'pointer', 
//                               transition: 'all .3s' 
//                             }} 
//                             onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,42,98,0.1)'} 
//                             onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
//                           >
//                             Let's Connect
//                           </button>
//                         </div>
//                       </>
//                     )}

//                     {idx === 1 && (
//                       <>
//                         <h2 style={{ 
//                           fontSize: isMobile ? (isSmallMobile ? '1.2rem' : '1.3rem') : '1.8rem', 
//                           fontWeight: 700, 
//                           color: '#7C2A62', 
//                           marginBottom: '.5rem' 
//                         }}>About Me</h2>
//                         <h3 style={{ 
//                           fontSize: isMobile ? (isSmallMobile ? '0.9rem' : '1rem') : '1.15rem', 
//                           fontWeight: 600, 
//                           color: '#7C2A62', 
//                           marginBottom: '.6rem' 
//                         }}>Passionate Full-Stack Engineer</h3>
//                         <p style={{ 
//                           fontSize: isMobile ? (isSmallMobile ? '0.75rem' : '0.8rem') : '.92rem', 
//                           color: '#000', 
//                           lineHeight: 1.4, 
//                           maxWidth: isMobile ? '280px' : 700, 
//                           margin: '0 auto',
//                           padding: isMobile ? '0 0.3rem' : '0'
//                         }}>
//                           Modern web technologies are used to build scalable and well-structured applications that seamlessly blend strong engineering with an engaging user experience.
//                         </p>

//                         <div style={{ 
//                           display: 'grid', 
//                           gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4,1fr)', 
//                           gap: isMobile ? '.3rem' : '.5rem', 
//                           marginTop: '0.8rem',
//                           padding: isMobile ? '0 0.2rem' : '0'
//                         }}>
//                           <div style={{ 
//                             background: '#fef0f8', 
//                             padding: isMobile ? (isSmallMobile ? '.4rem' : '.5rem') : '.8rem', 
//                             borderRadius: 8, 
//                             textAlign: 'center', 
//                             boxShadow: '0 2px 6px rgba(124,42,98,0.1)', 
//                             border: '1px solid #7C2A62' 
//                           }}>
//                             <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.9rem' : '1rem') : '1.2rem' }}>💼</div>
//                             <div style={{ fontWeight: 700, color: '#7C2A62', fontSize: isMobile ? (isSmallMobile ? '0.8rem' : '0.85rem') : '1rem' }}>6+</div>
//                             <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.55rem' : '0.6rem') : '.65rem' }}>Months Experience</div>
//                           </div>
//                           <div style={{ 
//                             background: '#fef0f8', 
//                             padding: isMobile ? (isSmallMobile ? '.4rem' : '.5rem') : '.8rem', 
//                             borderRadius: 8, 
//                             textAlign: 'center', 
//                             boxShadow: '0 2px 6px rgba(124,42,98,0.1)', 
//                             border: '1px solid #7C2A62' 
//                           }}>
//                             <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.9rem' : '1rem') : '1.2rem' }}>🏆</div>
//                             <div style={{ fontWeight: 700, color: '#7C2A62', fontSize: isMobile ? (isSmallMobile ? '0.8rem' : '0.85rem') : '1rem' }}>3</div>
//                             <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.55rem' : '0.6rem') : '.65rem' }}>Projects Completed</div>
//                           </div>
//                           <div style={{ 
//                             background: '#fef0f8', 
//                             padding: isMobile ? (isSmallMobile ? '.4rem' : '.5rem') : '.8rem', 
//                             borderRadius: 8, 
//                             textAlign: 'center', 
//                             boxShadow: '0 2px 6px rgba(124,42,98,0.1)', 
//                             border: '1px solid #7C2A62' 
//                           }}>
//                             <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.9rem' : '1rem') : '1.2rem' }}>⚡</div>
//                             <div style={{ fontWeight: 700, color: '#7C2A62', fontSize: isMobile ? (isSmallMobile ? '0.8rem' : '0.85rem') : '1rem' }}>10+</div>
//                             <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.55rem' : '0.6rem') : '.65rem' }}>Technologies</div>
//                           </div>
//                           <div style={{ 
//                             background: '#fef0f8', 
//                             padding: isMobile ? (isSmallMobile ? '.4rem' : '.5rem') : '.8rem', 
//                             borderRadius: 8, 
//                             textAlign: 'center', 
//                             boxShadow: '0 2px 6px rgba(124,42,98,0.1)', 
//                             border: '1px solid #7C2A62' 
//                           }}>
//                             <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.9rem' : '1rem') : '1.2rem' }}>❤️</div>
//                             <div style={{ fontWeight: 700, color: '#7C2A62', fontSize: isMobile ? (isSmallMobile ? '0.8rem' : '0.85rem') : '1rem' }}>100%</div>
//                             <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.55rem' : '0.6rem') : '.65rem' }}>Dedication</div>
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     {idx === 2 && (
//                       <>
//                         <h2 style={{ 
//                           fontSize: isMobile ? (isSmallMobile ? '1.1rem' : '1.2rem') : '1.6rem', 
//                           fontWeight: 700, 
//                           color: '#7C2A62', 
//                           marginBottom: '0.5rem',
//                           marginTop: 0
//                         }}>My Projects</h2>

//                         <div style={{ 
//                           display: 'flex', 
//                           flexDirection: isMobile ? 'column' : 'row',
//                           gap: isMobile ? '0.6rem' : '1rem', 
//                           justifyContent: 'center', 
//                           alignItems: 'stretch', 
//                           width: '100%', 
//                           maxWidth: isMobile ? '280px' : 900,
//                           padding: isMobile ? '0 0.3rem' : '0'
//                         }}>
//                           {projects.map((project, i) => (
//                             <article 
//                               key={i} 
//                               className="anim-light-4s anim-gpu" 
//                               style={{ 
//                                 borderRadius: 10, 
//                                 padding: isMobile ? (isSmallMobile ? '0.5rem' : '0.7rem') : '1rem', 
//                                 width: isMobile ? '100%' : 'min(220px, 32%)', 
//                                 minHeight: isMobile ? 'auto' : 180, 
//                                 boxShadow: '0 6px 20px rgba(124,42,98,0.15)', 
//                                 border: '1.5px solid #F7D9EB', 
//                                 display: 'flex', 
//                                 flexDirection: 'column', 
//                                 justifyContent: 'space-between', 
//                                 animationDelay: `${i * 0.3}s` 
//                               }}
//                             >
//                               <div style={{ 
//                                 width: isMobile ? (isSmallMobile ? 25 : 28) : 35, 
//                                 height: isMobile ? (isSmallMobile ? 25 : 28) : 35, 
//                                 borderRadius: 8, 
//                                 display: 'flex', 
//                                 alignItems: 'center', 
//                                 justifyContent: 'center', 
//                                 fontSize: isMobile ? (isSmallMobile ? 12 : 14) : 16, 
//                                 marginBottom: '.4rem' 
//                               }}>
//                                 {project.icon}
//                               </div>
//                               <h3 style={{ 
//                                 color: '#7C2A62', 
//                                 fontWeight: 700, 
//                                 fontSize: isMobile ? (isSmallMobile ? '0.85rem' : '0.95rem') : '1.1rem',
//                                 marginBottom: '.3rem',
//                                 lineHeight: 1.3 
//                               }}>{project.title}</h3>
//                               <p style={{ 
//                                 fontSize: isMobile ? (isSmallMobile ? '0.65rem' : '0.7rem') : '.75rem', 
//                                 lineHeight: 1.3,
//                                 marginBottom: '.4rem'
//                               }}>{project.description}</p>
//                               <div style={{ 
//                                 display: 'flex', 
//                                 gap: '.2rem', 
//                                 flexWrap: 'wrap', 
//                                 marginTop: 'auto' 
//                               }}>
//                                 {project.tags.map((t, ti) => (
//                                   <span 
//                                     key={ti} 
//                                     style={{ 
//                                       padding: isMobile ? (isSmallMobile ? '.1rem .3rem' : '.12rem .35rem') : '.15rem .4rem', 
//                                       background: '#F7D9EB', 
//                                       borderRadius: 5, 
//                                       fontSize: isMobile ? (isSmallMobile ? '0.5rem' : '0.55rem') : '.6rem', 
//                                       fontWeight: 600, 
//                                       color: '#7C2A62' 
//                                     }}
//                                   >{t}</span>
//                                 ))}
//                               </div>
//                             </article>
//                           ))}
//                         </div>
//                       </>
//                     )}

//                     {idx === 3 && (
//                       <>
//                         <h2 style={{ 
//                           fontSize: isMobile ? (isSmallMobile ? '1.1rem' : '1.2rem') : '1.6rem', 
//                           fontWeight: 700, 
//                           color: '#7C2A62', 
//                           marginBottom: '0.8rem', 
//                           textAlign: 'center',
//                           marginTop: 0
//                         }}>
//                           Skills & Expertise
//                         </h2>

//                         <div style={{ 
//                           display: 'grid', 
//                           gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
//                           gap: isMobile ? '0.6rem' : '1rem', 
//                           justifyItems: 'center', 
//                           alignItems: 'center',
//                           padding: isMobile ? '0 0.3rem' : '0'
//                         }}>
//                           {skills.map((g, i) => (
//                             <div 
//                               key={i} 
//                               style={{ 
//                                 background: '#f8f9fa', 
//                                 padding: isMobile ? (isSmallMobile ? '0.6rem' : '0.8rem') : '1rem', 
//                                 borderRadius: 8, 
//                                 boxShadow: '0 3px 8px rgba(124,42,98,0.1)', 
//                                 width: '100%', 
//                                 textAlign: 'center' 
//                               }}
//                             >
//                               <h3 style={{ 
//                                 color: '#7C2A62', 
//                                 marginBottom: '.5rem', 
//                                 fontWeight: 700, 
//                                 textAlign: 'center',
//                                 fontSize: isMobile ? (isSmallMobile ? '0.9rem' : '1rem') : '1.1rem'
//                               }}>{g.category}</h3>

//                               <div style={{ 
//                                 display: 'flex', 
//                                 justifyContent: 'center', 
//                                 flexWrap: 'wrap', 
//                                 gap: '.3rem' 
//                               }}>
//                                 {g.items.map((s, k) => (
//                                   <span 
//                                     key={k} 
//                                     style={{ 
//                                       padding: isMobile ? '.15rem .3rem' : '.2rem .4rem', 
//                                       background: '#F7D9EB', 
//                                       borderRadius: 4, 
//                                       fontSize: isMobile ? (isSmallMobile ? '0.55rem' : '0.6rem') : '.65rem', 
//                                       fontWeight: 500, 
//                                       textAlign: 'center' 
//                                     }}
//                                   >
//                                     {s}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </>
//                     )}

//                     {idx === 4 && (
//                       <div style={{ marginTop: isMobile ? contactShiftMobile : contactShiftDesktop }}>
//                         <h2 style={{ 
//                           fontSize: isMobile ? (isSmallMobile ? '1.2rem' : '1.3rem') : '1.8rem', 
//                           fontWeight: 700, 
//                           color: '#7C2A62', 
//                           marginBottom: '0.8rem' 
//                         }}>Let's Connect</h2>
//                         <p style={{ 
//                           fontSize: isMobile ? (isSmallMobile ? '0.75rem' : '0.8rem') : '.95rem', 
//                           color: '#000', 
//                           lineHeight: 1.4, 
//                           marginBottom: '1rem',
//                           padding: isMobile ? '0 0.3rem' : '0'
//                         }}>I'm always excited to discuss new projects, innovative ideas, and potential collaborations. Let's create something amazing together!</p>
//                         <div style={{ 
//                           display: 'flex', 
//                           gap: '5px', 
//                           justifyContent: 'center', 
//                           flexWrap: 'wrap' 
//                         }}>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </section>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* pagination / controls */}
//       <div style={{ 
//         position: 'fixed', 
//         bottom: isMobile ? '0.8rem' : '1.5rem', 
//         left: '50%', 
//         transform: 'translateX(-50%)', 
//         display: 'flex', 
//         gap: isMobile ? '.4rem' : '.6rem', 
//         zIndex: 100 
//       }}>
//         {sections.map((_, idx) => (
//           <div 
//             key={idx} 
//             onClick={() => navigateToSection(idx)} 
//             style={{ 
//               width: activeSection === idx ? (isMobile ? '16px' : '24px') : (isMobile ? '6px' : '8px'), 
//               height: isMobile ? '6px' : '8px', 
//               borderRadius: activeSection === idx ? '3px' : '50%', 
//               background: activeSection === idx ? '#7C2A62' : 'rgba(124,42,98,0.3)', 
//               border: '1.5px solid #7C2A62', 
//               cursor: 'pointer', 
//               transition: 'all .3s' 
//             }} 
//           />
//         ))}
//       </div>

//       <div style={{ 
//         position: 'fixed', 
//         bottom: isMobile ? '0.8rem' : '1.5rem', 
//         right: isMobile ? '0.8rem' : '1.5rem', 
//         display: 'flex', 
//         flexDirection: 'column', 
//         gap: '.3rem', 
//         alignItems: 'flex-end' 
//       }}>
//         {/* {!isMobile && (
//           <div style={{ 
//             fontSize: '.7rem', 
//             color: '#7C2A62', 
//             background: '#F7D9EB', 
//             padding: '.4rem .8rem', 
//             borderRadius: 12, 
//             boxShadow: '0 3px 10px rgba(124,42,98,0.2)' 
//           }}>
//             Use ← → arrows
//           </div>
//         )} */}
//         <button 
//           onClick={() => setAutoPlay(!autoPlay)} 
//           style={{ 
//             background: '#F7D9EB', 
//             border: '1.5px solid #7C2A62', 
//             color: '#7C2A62', 
//             padding: isMobile ? '.3rem .5rem' : '.3rem .7rem', 
//             borderRadius: 8, 
//             cursor: 'pointer', 
//             fontWeight: 600, 
//             fontSize: isMobile ? (isSmallMobile ? '0.6rem' : '0.65rem') : '.7rem' 
//           }}
//         >
//           {autoPlay ? '⏸ Pause' : '▶ Play'}
//         </button>
//       </div>

//       {/* overlay contact - adjusted for mobile to row with wrap and smaller sizes to prevent going down too much */}
//       {showOverlayContact && (
//         <div 
//           role="dialog" 
//           aria-label="Contact actions" 
//           style={{ 
//             position: 'fixed', 
//             bottom: isMobile ? '4rem' : '6rem', 
//             left: '50%', 
//             transform: 'translateX(-50%)', 
//             zIndex: 3000, 
//             display: 'flex', 
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             gap: isMobile ? '.3rem' : '.6rem', 
//             alignItems: 'center', 
//             justifyContent: 'center',
//             pointerEvents: 'auto',
//             width: isMobile ? 'calc(100% - 2rem)' : 'auto',
//             maxWidth: isMobile ? '300px' : 'none',
//             padding: isMobile ? '0.3rem' : '0'
//           }}
//         >
//           <button 
//             onClick={() => openLink('mailto:mounikavengala48@gmail.com', false)} 
//             style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               justifyContent: 'center',
//               gap: '.3rem', 
//               padding: isMobile ? '.3rem .6rem' : '.55rem 1rem', 
//               background: '#7C2A62', 
//               color: 'white', 
//               border: 'none', 
//               borderRadius: 10, 
//               fontSize: isMobile ? (isSmallMobile ? '0.7rem' : '0.75rem') : '.95rem', 
//               fontWeight: 700, 
//               cursor: 'pointer',
//               minWidth: isMobile ? '80px' : 'auto',
//               boxShadow: '0 4px 15px rgba(124,42,98,0.3)',
//               transition: 'transform .3s'
//             }}
//             onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             <Mail size={isMobile ? (isSmallMobile ? 11 : 12) : 16} /> Email Me
//           </button>

//           <button 
//             onClick={() => openLink('https://github.com/krishnamounikavengala')} 
//             style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               justifyContent: 'center',
//               gap: '.3rem', 
//               padding: isMobile ? '.3rem .6rem' : '.55rem 1rem', 
//               background: '#7C2A62', 
//               color: 'white', 
//               border: 'none', 
//               borderRadius: 10, 
//               fontSize: isMobile ? (isSmallMobile ? '0.7rem' : '0.75rem') : '.95rem', 
//               fontWeight: 700, 
//               cursor: 'pointer',
//               minWidth: isMobile ? '80px' : 'auto',
//               boxShadow: '0 4px 15px rgba(124,42,98,0.3)',
//               transition: 'transform .3s'
//             }}
//             onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             <Github size={isMobile ? (isSmallMobile ? 11 : 12) : 16} /> GitHub
//           </button>

//           <button 
//             onClick={() => openLink('https://www.linkedin.com/in/krishna-mounika-vengala-721597396')} 
//             style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               justifyContent: 'center',
//               gap: '.3rem', 
//               padding: isMobile ? '.3rem .6rem' : '.55rem 1rem', 
//               background: '#7C2A62', 
//               color: 'white', 
//               border: 'none', 
//               borderRadius: 10, 
//               fontSize: isMobile ? (isSmallMobile ? '0.7rem' : '0.75rem') : '.95rem', 
//               fontWeight: 700, 
//               cursor: 'pointer',
//               minWidth: isMobile ? '80px' : 'auto',
//               boxShadow: '0 4px 15px rgba(124,42,98,0.3)',
//               transition: 'transform .3s'
//             }}
//             onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             <Linkedin size={isMobile ? (isSmallMobile ? 11 : 12) : 16} /> LinkedIn
//           </button>
//         </div>
//       )}

//       {/* Animations & 3D cube CSS - restored original animation behavior */}
//       <style>{`
//         /* Ensure smooth scrolling on mobile */
//         * { 
//           -webkit-overflow-scrolling: touch; 
//           box-sizing: border-box;
//         }

//         /* keyframes for micro animations */
//         @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
//         @keyframes lightFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
//         @keyframes fadeInOut { 0%,100% { opacity: 0; } 50% { opacity: 1; } }

//         /* animation utility classes */
//         .anim-float-3s { animation: float 3s ease-in-out infinite; animation-play-state: running; -webkit-animation-play-state: running; }
//         .anim-light-4s { animation: lightFloat 4s ease-in-out infinite; animation-play-state: running; -webkit-animation-play-state: running; }
//         .anim-fade-2s { animation: fadeInOut 2s ease-in-out infinite; animation-play-state: running; -webkit-animation-play-state: running; }

//         /* GPU hint for smoother animations */
//         .anim-gpu { transform: translateZ(0); will-change: transform, opacity; -webkit-transform: translateZ(0); }

//         /* Basic cube-face setup */
//         .cube-face { 
//           -webkit-transform-style: preserve-3d; 
//           transform-style: preserve-3d; 
//           backface-visibility: hidden; 
//           -webkit-backface-visibility: hidden; 
//           will-change: transform, opacity; 
//           transition: opacity .5s ease, transform .5s ease; 
//           display: block; 
//           overflow-y: auto;
//         }

//         /* face content animate in when face becomes active - exact original */
//         .face-content {
//           opacity: 0;
//           transform: translateY(8px);
//           transition: opacity .55s cubic-bezier(.2,.9,.2,1), transform .55s cubic-bezier(.2,.9,.2,1);
//         }
        
//         /* active face (the face currently centered) */
//         .cube-face.active-face .face-content {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         /* further ensure children within face that use keyframes keep running */
//         .cube-face.active-face .anim-fade-2s,
//         .cube-face.active-face .anim-float-3s,
//         .cube-face.active-face .anim-light-4s {
//           animation-play-state: running;
//         }

//         /* z-index give active face higher stacking while rotation occurs */
//         .cube-face.active-face { z-index: 30; }

//         /* make sure faces on back are not interactive */
//         .cube-face:not(.active-face) { pointer-events: none; }

//         /* ensure dialog buttons are interactive and visible */
//         [role="dialog"] button { -webkit-tap-highlight-color: rgba(0,0,0,0.06); }

//         /* Mobile optimizations - enhanced for smaller screens */
//         @media (max-width: 768px) {
//           .cube-face {
//             font-size: 14px;
//           }
          
//           /* Adjust scrollbar for mobile */
//           .cube-face::-webkit-scrollbar {
//             width: 3px;
//           }
          
//           .cube-face::-webkit-scrollbar-thumb {
//             background: rgba(124,42,98,0.3);
//             border-radius: 3px;
//           }
//         }

//         /* Very small mobile devices */
//         @media (max-width: 480px) {
//           .cube-face { 
//             padding: 0.4rem !important; 
//             font-size: 13px;
//           }
          
//           .face-content {
//             padding: 0.4rem !important;
//             max-width: 260px !important;
//           }

//           h1, h2, h3 {
//             word-break: break-word;
//             overflow-wrap: break-word;
//           }
//         }

//         /* Tablet adjustments */
//         @media (min-width: 769px) and (max-width: 1024px) {
//           .cube-face {
//             padding: 0.9rem !important;
//           }
//         }

//         /* Landscape mobile - tighter spacing */
//         @media (max-height: 500px) and (orientation: landscape) {
//           .cube-face {
//             padding: 0.5rem !important;
//           }
          
//           .face-content {
//             padding: 0.3rem !important;
//           }

//           .cubeWrapper {
//             height: clamp(250px, 40vh, 350px) !important;
//           }
//         }

//         /* Smooth transitions for all interactive elements */
//         button, a {
//           -webkit-tap-highlight-color: transparent;
//           touch-action: manipulation;
//         }

//         /* Prevent text selection on interactive elements */
//         button, .nav-button {
//           -webkit-user-select: none;
//           -moz-user-select: none;
//           -ms-user-select: none;
//           user-select: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Portfolio;




import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  const wrapperRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const [radius, setRadius] = useState(300);
  const sections = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

  const professionalTitles = [
    "Full Stack Developer",
    "Web Developer",
    "Associate Software Developer"
  ];

  const angle = 360 / sections.length;

  useEffect(() => {
    const computeRadius = () => {
      const w = wrapperRef.current?.offsetWidth ?? 800;
      const halfAngleRad = (Math.PI * (angle / 2)) / 180;
      const computed = (w / 2) / Math.tan(halfAngleRad);
      
      // Adjust radius based on screen size - tightened for mobile to prevent overflow
      let minRadius = 160;
      let maxRadius = 900;
      
      if (window.innerWidth <= 480) {
        minRadius = 120;
        maxRadius = 180;
      } else if (window.innerWidth <= 768) {
        minRadius = 140;
        maxRadius = 220;
      } else if (window.innerWidth <= 1024) {
        minRadius = 180;
        maxRadius = 320;
      }
      
      setRadius(Math.max(minRadius, Math.min(computed, maxRadius)));
    };

    computeRadius();
    const onResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
      setIsSmallMobile(window.innerWidth <= 480);
      computeRadius();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [angle]);

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % professionalTitles.length);
    }, 2000);
    return () => clearInterval(titleInterval);
  }, [professionalTitles.length]);

  const navigateToSection = (index) => {
    if (isRotating || index === activeSection) return;
    setIsRotating(true);
    setActiveSection(index);
    setMenuOpen(false);
    setAutoPlay(false);
    setTimeout(() => setIsRotating(false), 900);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay, sections.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isRotating) return;
      if (e.key === 'ArrowRight') navigateToSection((activeSection + 1) % sections.length);
      if (e.key === 'ArrowLeft') navigateToSection((activeSection - 1 + sections.length) % sections.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isRotating, sections.length]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = null;
    };
    const onTouchMove = (e) => {
      touchEndX.current = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      if (touchStartX.current == null || touchEndX.current == null) return;
      const diff = touchStartX.current - touchEndX.current;
      const threshold = 40;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          navigateToSection((activeSection + 1) % sections.length);
        } else {
          navigateToSection((activeSection - 1 + sections.length) % sections.length);
        }
      }
      touchStartX.current = null;
      touchEndX.current = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeSection, sections.length]);

  const getRotation = () => `rotateY(${-activeSection * angle}deg)`;

  const openLink = (url, newTab = true) => {
    if (!url) return;
    if (url.startsWith('mailto:')) {
      window.location.href = url;
      return;
    }
    if (newTab) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  };

  const projects = [
    { icon: '📚', title: 'Novya', tags: ['React','Django','PostgreSQL','Bootstrap'], description: 'AI-powered Learning Management System for online courses.' },
    { icon: '💹', title: 'Vunathi Capital', tags: ['React','Node.js','Firebase','Zerodha','Bootstrap'], description: 'Real-time trading platform displaying live P/L from Kite Connect.' },
    { icon: '🧭', title: 'FlowTrack', tags: ['React','FastAPI','PostgreSQL','Bootstrap'], description: 'Ticketing tool with Kanban boards for admin and users.' },
  ];

  const skills = [
    { category: 'Frontend', items: ['React','JavaScript','Angular','HTML5','CSS3','Tailwind','Bootstrap'] },
    { category: 'Backend', items: ['Python','Django','Node.js','FastAPI','Java','Spring','Spring Boot','jdbc','Hibernate'] },
    { category: 'Tools & Other', items: ['Github','REST APIs','Swagger','Postman','VScode','Eclipse'] },
    { category: 'Database', items: ['PostgreSQL','Firebase','MySQL','Oracle'] },
  ];

  const styles = {
    container: { 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
      backgroundColor: '#f5f5f5', 
      boxSizing: 'border-box', 
      overflow: 'hidden' 
    },
    header: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: isMobile ? '0.6rem 1rem' : '1rem 2rem', 
      backgroundColor: '#fef0f8', 
      boxShadow: '0 4px 20px rgba(124,42,98,0.3)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000 
    },
    logoText: { 
      margin: 0, 
      color: '#000', 
      fontSize: isMobile ? (isSmallMobile ? '1.4rem' : '1.5rem') : 'clamp(1.4rem, 2.2vw + 1rem, 2.2rem)', 
      fontWeight: 'bold', 
      background: 'linear-gradient(45deg,#7C2A62,#5a1a4a)', 
      WebkitBackgroundClip: 'text', 
      WebkitTextFillColor: 'transparent' 
    },
    tagline: { 
      margin: 0, 
      color: '#000', 
      fontSize: isMobile ? (isSmallMobile ? '0.7rem' : '0.75rem') : 'clamp(.75rem, 1.2vw + .2rem, 0.9rem)', 
      fontWeight: 500 
    },
    nav: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: isMobile ? '0.4rem' : '1.5rem' 
    },
    navButton: { 
      padding: isMobile ? '0.4rem 0.6rem' : '0.75rem 1.5rem', 
      border: 'none', 
      backgroundColor: 'transparent', 
      cursor: 'pointer', 
      fontSize: isMobile ? (isSmallMobile ? '0.75rem' : '0.8rem') : '1rem', 
      borderRadius: '25px', 
      transition: 'all 0.3s ease', 
      fontWeight: 600, 
      color: '#000' 
    },
    activeNavButton: { 
      backgroundColor: '#7C2A62', 
      color: '#fff', 
      boxShadow: '0 4px 15px rgba(124,42,98,0.5)' 
    },
    cubeContainer: { 
      flex: 1, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: isMobile ? '0.3rem' : '1rem', 
      perspective: isMobile ? '600px' : '1400px', 
      overflow: 'hidden' 
    },
    cubeWrapper: { 
      width: 'calc(100% - 1rem)', 
      maxWidth: isMobile ? '100%' : '900px', 
      height: isMobile ? (isSmallMobile ? 'clamp(320px, 50vh, 380px)' : 'clamp(360px, 55vh, 440px)') : isTablet ? 'clamp(450px, 50vh, 600px)' : 'clamp(320px, 48vh, 720px)', 
      position: 'relative', 
      transformStyle: 'preserve-3d', 
      transition: 'transform 900ms cubic-bezier(0.22,1,0.36,1)', 
      willChange: 'transform' 
    },
    cubeFace: { 
      position: 'absolute', 
      width: '100%', 
      height: '100%', 
      backfaceVisibility: 'hidden', 
      padding: isMobile ? (isSmallMobile ? '0.4rem' : '0.6rem') : '1rem', 
      overflowY: 'auto', 
      backgroundColor: 'white', 
      borderRadius: isMobile ? '12px' : '18px', 
      boxShadow: '0 8px 30px rgba(124,42,98,0.2)', 
      boxSizing: 'border-box' 
    }
  };

  const showOverlayContact = activeSection === 4;
  const contactShiftDesktop = '-40px';
  const contactShiftMobile = '0px'; // Removed negative margin to prevent cutting

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 className="anim-float-3s anim-gpu" style={styles.logoText}>KM</h1>
          <p style={styles.tagline}>Portfolio</p>
        </div>

        <nav style={{ 
          ...styles.nav, 
          display: menuOpen || !isMobile ? 'flex' : 'none', 
          ...(isMobile && menuOpen ? { 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            right: 0, 
            flexDirection: 'column', 
            backgroundColor: '#F7D9EB', 
            padding: '0.8rem', 
            boxShadow: '0 4px 10px rgba(124,42,98,0.2)' 
          } : {}) 
        }}>
          {sections.map((s, i) => (
            <button
              key={s}
              onClick={() => navigateToSection(i)}
              style={{ 
                ...styles.navButton, 
                ...(activeSection === i ? styles.activeNavButton : {}), 
                ...(isMobile && menuOpen ? { width: '100%' } : {}) 
              }}
              onMouseEnter={(e) => { if (activeSection !== i) e.currentTarget.style.backgroundColor = 'rgba(124,42,98,0.1)'; }}
              onMouseLeave={(e) => { if (activeSection !== i) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {s}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            color: '#000', 
            display: isMobile ? 'block' : 'none' 
          }}
        >
          {menuOpen ? <X size={isMobile ? 24 : 28} /> : <Menu size={isMobile ? 24 : 28} />}
        </button>
      </header>

      <div style={styles.cubeContainer}>
        <div ref={wrapperRef} style={styles.cubeWrapper}>
          <div
            className="cube-rotator"
            style={{
              width: '100%',
              height: '100%',
              transform: getRotation(),
              transformStyle: 'preserve-3d',
              transition: 'transform 900ms cubic-bezier(0.22,1,0.36,1)',
              willChange: 'transform'
            }}
          >
            {sections.map((section, idx) => {
              const faceTransform = `rotateY(${idx * angle}deg) translateZ(${radius}px)${activeSection === idx ? ' translateZ(2px)' : ''}`;
              const faceClass = activeSection === idx ? 'cube-face active-face' : 'cube-face';
              return (
                <section
                  key={section}
                  className={faceClass}
                  style={{
                    ...styles.cubeFace,
                    transform: faceTransform,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    textAlign: 'center',
                    pointerEvents: activeSection === idx ? 'auto' : 'none'
                  }}
                >
                  <div className="face-content" style={{ maxWidth: isMobile ? 300 : 750, padding: isMobile ? (isSmallMobile ? '0.4rem' : '0.6rem') : '1rem', width: '100%' }}>
                    {idx === 0 && (
                      <>
                        <h1 className="anim-float-3s anim-gpu" style={{ 
                          fontSize: isMobile ? (isSmallMobile ? '1rem' : '1.2rem') : 'clamp(1.2rem, 2.6vw + .5rem, 2rem)', 
                          fontWeight: '700', 
                          color: '#7C2A62', 
                          marginBottom: '0.8rem', 
                          lineHeight: 1.2,
                          wordBreak: 'break-word',
                          hyphens: 'auto'
                        }}>
                          KRISHNA MOUNIKA VENGALA
                        </h1>

                        <div style={{ 
                          height: isMobile ? (isSmallMobile ? 40 : 45) : 60, 
                          marginBottom: '0.8rem', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          <h2 className="anim-fade-2s anim-gpu" style={{ 
                            fontSize: isMobile ? (isSmallMobile ? '0.85rem' : '0.95rem') : 'clamp(.95rem, 1.6vw + .1rem, 1.3rem)', 
                            color: '#000', 
                            fontWeight: 500 
                          }}>
                            {professionalTitles[currentTitleIndex]}
                          </h2>
                        </div>

                        <p style={{ 
                          fontSize: isMobile ? (isSmallMobile ? '0.75rem' : '0.8rem') : 'clamp(.85rem, 1.2vw, .95rem)', 
                          color: '#000', 
                          lineHeight: 1.4, 
                          marginBottom: '1rem', 
                          maxWidth: isMobile ? '280px' : 600, 
                          margin: '0 auto 1rem',
                          padding: isMobile ? '0 0.3rem' : '0'
                        }}>
                          I build modern full-stack applications with React and Django/FastAPI, delivering high performance, clean architecture, and seamless user experiences.
                        </p>

                        <div style={{ 
                          display: 'flex', 
                          gap: isMobile ? '0.4rem' : '.8rem', 
                          justifyContent: 'center', 
                          flexWrap: 'wrap',
                          padding: isMobile ? '0 0.3rem' : '0'
                        }}>
                          <button 
                            onClick={() => navigateToSection(2)} 
                            style={{ 
                              padding: isMobile ? '.3rem .6rem' : '.35rem .9rem', 
                              background: '#7C2A62', 
                              color: '#fff', 
                              border: 'none', 
                              borderRadius: 8, 
                              fontSize: isMobile ? (isSmallMobile ? '0.65rem' : '0.7rem') : '.75rem', 
                              fontWeight: 600, 
                              cursor: 'pointer', 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '.3rem', 
                              boxShadow: '0 4px 15px rgba(124,42,98,0.25)', 
                              transition: 'transform .3s' 
                            }} 
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} 
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                          >
                            Explore My Work
                          </button>

                          <button 
                            onClick={() => navigateToSection(4)} 
                            style={{ 
                              padding: isMobile ? '.3rem .6rem' : '.35rem .9rem', 
                              background: 'transparent', 
                              color: '#7C2A62', 
                              border: '2px solid #7C2A62', 
                              borderRadius: 8, 
                              fontSize: isMobile ? (isSmallMobile ? '0.65rem' : '0.7rem') : '.75rem', 
                              fontWeight: 600, 
                              cursor: 'pointer', 
                              transition: 'all .3s' 
                            }} 
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,42,98,0.1)'} 
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            Let's Connect
                          </button>
                        </div>
                      </>
                    )}

                    {idx === 1 && (
                      <>
                        <h2 style={{ 
                          fontSize: isMobile ? (isSmallMobile ? '1.2rem' : '1.3rem') : '1.8rem', 
                          fontWeight: 700, 
                          color: '#7C2A62', 
                          marginBottom: '.5rem' 
                        }}>About Me</h2>
                        <h3 style={{ 
                          fontSize: isMobile ? (isSmallMobile ? '0.9rem' : '1rem') : '1.15rem', 
                          fontWeight: 600, 
                          color: '#7C2A62', 
                          marginBottom: '.6rem' 
                        }}>Passionate Full-Stack Engineer</h3>
                        <p style={{ 
                          fontSize: isMobile ? (isSmallMobile ? '0.75rem' : '0.8rem') : '.92rem', 
                          color: '#000', 
                          lineHeight: 1.4, 
                          maxWidth: isMobile ? '280px' : 700, 
                          margin: '0 auto',
                          padding: isMobile ? '0 0.3rem' : '0'
                        }}>
                          Modern web technologies are used to build scalable and well-structured applications that seamlessly blend strong engineering with an engaging user experience.
                        </p>

                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4,1fr)', 
                          gap: isMobile ? '.3rem' : '.5rem', 
                          marginTop: '0.8rem',
                          padding: isMobile ? '0 0.2rem' : '0'
                        }}>
                          <div style={{ 
                            background: '#fef0f8', 
                            padding: isMobile ? (isSmallMobile ? '.4rem' : '.5rem') : '.8rem', 
                            borderRadius: 8, 
                            textAlign: 'center', 
                            boxShadow: '0 2px 6px rgba(124,42,98,0.1)', 
                            border: '1px solid #7C2A62' 
                          }}>
                            <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.9rem' : '1rem') : '1.2rem' }}>💼</div>
                            <div style={{ fontWeight: 700, color: '#7C2A62', fontSize: isMobile ? (isSmallMobile ? '0.8rem' : '0.85rem') : '1rem' }}>7+</div>
                            <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.55rem' : '0.6rem') : '.65rem' }}>Months Experience</div>
                          </div>
                          <div style={{ 
                            background: '#fef0f8', 
                            padding: isMobile ? (isSmallMobile ? '.4rem' : '.5rem') : '.8rem', 
                            borderRadius: 8, 
                            textAlign: 'center', 
                            boxShadow: '0 2px 6px rgba(124,42,98,0.1)', 
                            border: '1px solid #7C2A62' 
                          }}>
                            <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.9rem' : '1rem') : '1.2rem' }}>🏆</div>
                            <div style={{ fontWeight: 700, color: '#7C2A62', fontSize: isMobile ? (isSmallMobile ? '0.8rem' : '0.85rem') : '1rem' }}>3</div>
                            <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.55rem' : '0.6rem') : '.65rem' }}>Projects Completed</div>
                          </div>
                          <div style={{ 
                            background: '#fef0f8', 
                            padding: isMobile ? (isSmallMobile ? '.4rem' : '.5rem') : '.8rem', 
                            borderRadius: 8, 
                            textAlign: 'center', 
                            boxShadow: '0 2px 6px rgba(124,42,98,0.1)', 
                            border: '1px solid #7C2A62' 
                          }}>
                            <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.9rem' : '1rem') : '1.2rem' }}>⚡</div>
                            <div style={{ fontWeight: 700, color: '#7C2A62', fontSize: isMobile ? (isSmallMobile ? '0.8rem' : '0.85rem') : '1rem' }}>10+</div>
                            <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.55rem' : '0.6rem') : '.65rem' }}>Technologies</div>
                          </div>
                          <div style={{ 
                            background: '#fef0f8', 
                            padding: isMobile ? (isSmallMobile ? '.4rem' : '.5rem') : '.8rem', 
                            borderRadius: 8, 
                            textAlign: 'center', 
                            boxShadow: '0 2px 6px rgba(124,42,98,0.1)', 
                            border: '1px solid #7C2A62' 
                          }}>
                            <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.9rem' : '1rem') : '1.2rem' }}>❤️</div>
                            <div style={{ fontWeight: 700, color: '#7C2A62', fontSize: isMobile ? (isSmallMobile ? '0.8rem' : '0.85rem') : '1rem' }}>100%</div>
                            <div style={{ fontSize: isMobile ? (isSmallMobile ? '0.55rem' : '0.6rem') : '.65rem' }}>Dedication</div>
                          </div>
                        </div>
                      </>
                    )}

                    {idx === 2 && (
                      <>
                        <h2 style={{ 
                          fontSize: isMobile ? (isSmallMobile ? '1.1rem' : '1.2rem') : '1.6rem', 
                          fontWeight: 700, 
                          color: '#7C2A62', 
                          marginBottom: '0.5rem',
                          marginTop: 0
                        }}>My Projects</h2>

                        <div style={{ 
                          display: 'flex', 
                          flexDirection: isMobile ? 'column' : 'row',
                          gap: isMobile ? '0.6rem' : '1rem', 
                          justifyContent: 'center', 
                          alignItems: 'stretch', 
                          width: '100%', 
                          maxWidth: isMobile ? '280px' : 900,
                          padding: isMobile ? '0 0.3rem' : '0'
                        }}>
                          {projects.map((project, i) => (
                            <article 
                              key={i} 
                              className="anim-light-4s anim-gpu" 
                              style={{ 
                                borderRadius: 10, 
                                padding: isMobile ? (isSmallMobile ? '0.5rem' : '0.7rem') : '1rem', 
                                width: isMobile ? '100%' : 'min(220px, 32%)', 
                                minHeight: isMobile ? 'auto' : 180, 
                                boxShadow: '0 6px 20px rgba(124,42,98,0.15)', 
                                border: '1.5px solid #F7D9EB', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between', 
                                animationDelay: `${i * 0.3}s` 
                              }}
                            >
                              <div style={{ 
                                width: isMobile ? (isSmallMobile ? 25 : 28) : 35, 
                                height: isMobile ? (isSmallMobile ? 25 : 28) : 35, 
                                borderRadius: 8, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                fontSize: isMobile ? (isSmallMobile ? 12 : 14) : 16, 
                                marginBottom: '.4rem' 
                              }}>
                                {project.icon}
                              </div>
                              <h3 style={{ 
                                color: '#7C2A62', 
                                fontWeight: 700, 
                                fontSize: isMobile ? (isSmallMobile ? '0.85rem' : '0.95rem') : '1.1rem',
                                marginBottom: '.3rem',
                                lineHeight: 1.3 
                              }}>{project.title}</h3>
                              <p style={{ 
                                fontSize: isMobile ? (isSmallMobile ? '0.65rem' : '0.7rem') : '.75rem', 
                                lineHeight: 1.3,
                                marginBottom: '.4rem'
                              }}>{project.description}</p>
                              <div style={{ 
                                display: 'flex', 
                                gap: '.2rem', 
                                flexWrap: 'wrap', 
                                marginTop: 'auto' 
                              }}>
                                {project.tags.map((t, ti) => (
                                  <span 
                                    key={ti} 
                                    style={{ 
                                      padding: isMobile ? (isSmallMobile ? '.1rem .3rem' : '.12rem .35rem') : '.15rem .4rem', 
                                      background: '#F7D9EB', 
                                      borderRadius: 5, 
                                      fontSize: isMobile ? (isSmallMobile ? '0.5rem' : '0.55rem') : '.6rem', 
                                      fontWeight: 600, 
                                      color: '#7C2A62' 
                                    }}
                                  >{t}</span>
                                ))}
                              </div>
                            </article>
                          ))}
                        </div>
                      </>
                    )}

                    {idx === 3 && (
                      <>
                        <h2 style={{ 
                          fontSize: isMobile ? (isSmallMobile ? '1.1rem' : '1.2rem') : '1.6rem', 
                          fontWeight: 700, 
                          color: '#7C2A62', 
                          marginBottom: '0.8rem', 
                          textAlign: 'center',
                          marginTop: 0
                        }}>
                          Skills & Expertise
                        </h2>

                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                          gap: isMobile ? '0.6rem' : '1rem', 
                          justifyItems: 'center', 
                          alignItems: 'center',
                          padding: isMobile ? '0 0.3rem' : '0'
                        }}>
                          {skills.map((g, i) => (
                            <div 
                              key={i} 
                              style={{ 
                                background: '#f8f9fa', 
                                padding: isMobile ? (isSmallMobile ? '0.6rem' : '0.8rem') : '1rem', 
                                borderRadius: 8, 
                                boxShadow: '0 3px 8px rgba(124,42,98,0.1)', 
                                width: '100%', 
                                textAlign: 'center' 
                              }}
                            >
                              <h3 style={{ 
                                color: '#7C2A62', 
                                marginBottom: '.5rem', 
                                fontWeight: 700, 
                                textAlign: 'center',
                                fontSize: isMobile ? (isSmallMobile ? '0.9rem' : '1rem') : '1.1rem'
                              }}>{g.category}</h3>

                              <div style={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                flexWrap: 'wrap', 
                                gap: '.3rem' 
                              }}>
                                {g.items.map((s, k) => (
                                  <span 
                                    key={k} 
                                    style={{ 
                                      padding: isMobile ? '.15rem .3rem' : '.2rem .4rem', 
                                      background: '#F7D9EB', 
                                      borderRadius: 4, 
                                      fontSize: isMobile ? (isSmallMobile ? '0.55rem' : '0.6rem') : '.65rem', 
                                      fontWeight: 500, 
                                      textAlign: 'center' 
                                    }}
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {idx === 4 && (
                      <div style={{ marginTop: isMobile ? contactShiftMobile : contactShiftDesktop }}>
                        <h2 style={{ 
                          fontSize: isMobile ? (isSmallMobile ? '1.2rem' : '1.3rem') : '1.8rem', 
                          fontWeight: 700, 
                          color: '#7C2A62', 
                          marginBottom: '0.8rem' 
                        }}>Let's Connect</h2>
                        <p style={{ 
                          fontSize: isMobile ? (isSmallMobile ? '0.75rem' : '0.8rem') : '.95rem', 
                          color: '#000', 
                          lineHeight: 1.4, 
                          marginBottom: '1rem',
                          padding: isMobile ? '0 0.3rem' : '0'
                        }}>I'm always excited to discuss new projects, innovative ideas, and potential collaborations. Let's create something amazing together!</p>
                        <div style={{ 
                          display: 'flex', 
                          gap: '5px', 
                          justifyContent: 'center', 
                          flexWrap: 'wrap' 
                        }}>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      {/* pagination / controls */}
      <div style={{ 
        position: 'fixed', 
        bottom: isMobile ? '0.8rem' : '1.5rem', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        gap: isMobile ? '.4rem' : '.6rem', 
        zIndex: 100 
      }}>
        {sections.map((_, idx) => (
          <div 
            key={idx} 
            onClick={() => navigateToSection(idx)} 
            style={{ 
              width: activeSection === idx ? (isMobile ? '16px' : '24px') : (isMobile ? '6px' : '8px'), 
              height: isMobile ? '6px' : '8px', 
              borderRadius: activeSection === idx ? '3px' : '50%', 
              background: activeSection === idx ? '#7C2A62' : 'rgba(124,42,98,0.3)', 
              border: '1.5px solid #7C2A62', 
              cursor: 'pointer', 
              transition: 'all .3s' 
            }} 
          />
        ))}
      </div>

      <div style={{ 
        position: 'fixed', 
        bottom: isMobile ? '0.8rem' : '1.5rem', 
        right: isMobile ? '0.8rem' : '1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '.3rem', 
        alignItems: 'flex-end' 
      }}>
        {/* {!isMobile && (
          <div style={{ 
            fontSize: '.7rem', 
            color: '#7C2A62', 
            background: '#F7D9EB', 
            padding: '.4rem .8rem', 
            borderRadius: 12, 
            boxShadow: '0 3px 10px rgba(124,42,98,0.2)' 
          }}>
            Use ← → arrows
          </div>
        )} */}
        <button 
          onClick={() => setAutoPlay(!autoPlay)} 
          style={{ 
            background: '#F7D9EB', 
            border: '1.5px solid #7C2A62', 
            color: '#7C2A62', 
            padding: isMobile ? '.3rem .5rem' : '.3rem .7rem', 
            borderRadius: 8, 
            cursor: 'pointer', 
            fontWeight: 600, 
            fontSize: isMobile ? (isSmallMobile ? '0.6rem' : '0.65rem') : '.7rem' 
          }}
        >
          {autoPlay ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>

      {/* overlay contact - adjusted for mobile to row with wrap and smaller sizes to prevent going down too much */}
      {showOverlayContact && (
        <div 
          role="dialog" 
          aria-label="Contact actions" 
          style={{ 
            position: 'fixed', 
            bottom: isMobile ? '4rem' : '6rem', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 3000, 
            display: 'flex', 
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: isMobile ? '.3rem' : '.6rem', 
            alignItems: 'center', 
            justifyContent: 'center',
            pointerEvents: 'auto',
            width: isMobile ? 'calc(100% - 2rem)' : 'auto',
            maxWidth: isMobile ? '300px' : 'none',
            padding: isMobile ? '0.3rem' : '0'
          }}
        >
          <button 
            onClick={() => openLink('mailto:mounikavengala48@gmail.com', false)} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '.3rem', 
              padding: isMobile ? '.3rem .6rem' : '.55rem 1rem', 
              background: '#7C2A62', 
              color: 'white', 
              border: 'none', 
              borderRadius: 10, 
              fontSize: isMobile ? (isSmallMobile ? '0.7rem' : '0.75rem') : '.95rem', 
              fontWeight: 700, 
              cursor: 'pointer',
              minWidth: isMobile ? '80px' : 'auto',
              boxShadow: '0 4px 15px rgba(124,42,98,0.3)',
              transition: 'transform .3s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Mail size={isMobile ? (isSmallMobile ? 11 : 12) : 16} /> Email Me
          </button>

          <button 
            onClick={() => openLink('https://github.com/krishnamounikavengala')} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '.3rem', 
              padding: isMobile ? '.3rem .6rem' : '.55rem 1rem', 
              background: '#7C2A62', 
              color: 'white', 
              border: 'none', 
              borderRadius: 10, 
              fontSize: isMobile ? (isSmallMobile ? '0.7rem' : '0.75rem') : '.95rem', 
              fontWeight: 700, 
              cursor: 'pointer',
              minWidth: isMobile ? '80px' : 'auto',
              boxShadow: '0 4px 15px rgba(124,42,98,0.3)',
              transition: 'transform .3s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Github size={isMobile ? (isSmallMobile ? 11 : 12) : 16} /> GitHub
          </button>

          <button 
            onClick={() => openLink('https://www.linkedin.com/in/krishna-mounika-vengala-0b82632b3')} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '.3rem', 
              padding: isMobile ? '.3rem .6rem' : '.55rem 1rem', 
              background: '#7C2A62', 
              color: 'white', 
              border: 'none', 
              borderRadius: 10, 
              fontSize: isMobile ? (isSmallMobile ? '0.7rem' : '0.75rem') : '.95rem', 
              fontWeight: 700, 
              cursor: 'pointer',
              minWidth: isMobile ? '80px' : 'auto',
              boxShadow: '0 4px 15px rgba(124,42,98,0.3)',
              transition: 'transform .3s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Linkedin size={isMobile ? (isSmallMobile ? 11 : 12) : 16} /> LinkedIn
          </button>
        </div>
      )}

      {/* Animations & 3D cube CSS - restored original animation behavior */}
      <style>{`
        /* Ensure smooth scrolling on mobile */
        * { 
          -webkit-overflow-scrolling: touch; 
          box-sizing: border-box;
        }

        /* keyframes for micro animations */
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes lightFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes fadeInOut { 0%,100% { opacity: 0; } 50% { opacity: 1; } }

        /* animation utility classes */
        .anim-float-3s { animation: float 3s ease-in-out infinite; animation-play-state: running; -webkit-animation-play-state: running; }
        .anim-light-4s { animation: lightFloat 4s ease-in-out infinite; animation-play-state: running; -webkit-animation-play-state: running; }
        .anim-fade-2s { animation: fadeInOut 2s ease-in-out infinite; animation-play-state: running; -webkit-animation-play-state: running; }

        /* GPU hint for smoother animations */
        .anim-gpu { transform: translateZ(0); will-change: transform, opacity; -webkit-transform: translateZ(0); }

        /* Basic cube-face setup */
        .cube-face { 
          -webkit-transform-style: preserve-3d; 
          transform-style: preserve-3d; 
          backface-visibility: hidden; 
          -webkit-backface-visibility: hidden; 
          will-change: transform, opacity; 
          transition: opacity .5s ease, transform .5s ease; 
          display: block; 
          overflow-y: auto;
        }

        /* face content animate in when face becomes active - exact original */
        .face-content {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity .55s cubic-bezier(.2,.9,.2,1), transform .55s cubic-bezier(.2,.9,.2,1);
        }
        
        /* active face (the face currently centered) */
        .cube-face.active-face .face-content {
          opacity: 1;
          transform: translateY(0);
        }

        /* further ensure children within face that use keyframes keep running */
        .cube-face.active-face .anim-fade-2s,
        .cube-face.active-face .anim-float-3s,
        .cube-face.active-face .anim-light-4s {
          animation-play-state: running;
        }

        /* z-index give active face higher stacking while rotation occurs */
        .cube-face.active-face { z-index: 30; }

        /* make sure faces on back are not interactive */
        .cube-face:not(.active-face) { pointer-events: none; }

        /* ensure dialog buttons are interactive and visible */
        [role="dialog"] button { -webkit-tap-highlight-color: rgba(0,0,0,0.06); }

        /* Mobile optimizations - enhanced for smaller screens */
        @media (max-width: 768px) {
          .cube-face {
            font-size: 14px;
          }
          
          /* Adjust scrollbar for mobile */
          .cube-face::-webkit-scrollbar {
            width: 3px;
          }
          
          .cube-face::-webkit-scrollbar-thumb {
            background: rgba(124,42,98,0.3);
            border-radius: 3px;
          }
        }

        /* Very small mobile devices */
        @media (max-width: 480px) {
          .cube-face { 
            padding: 0.4rem !important; 
            font-size: 13px;
          }
          
          .face-content {
            padding: 0.4rem !important;
            max-width: 260px !important;
          }

          h1, h2, h3 {
            word-break: break-word;
            overflow-wrap: break-word;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 769px) and (max-width: 1024px) {
          .cube-face {
            padding: 0.9rem !important;
          }
        }

        /* Landscape mobile - tighter spacing */
        @media (max-height: 500px) and (orientation: landscape) {
          .cube-face {
            padding: 0.5rem !important;
          }
          
          .face-content {
            padding: 0.3rem !important;
          }

          .cubeWrapper {
            height: clamp(250px, 40vh, 350px) !important;
          }
        }

        /* Smooth transitions for all interactive elements */
        button, a {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* Prevent text selection on interactive elements */
        button, .nav-button {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;








