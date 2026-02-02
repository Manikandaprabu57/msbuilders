import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, CheckCircle, MapPin, Phone, Mail, 
  Instagram, Linkedin, Facebook, ChevronDown, Award, HardHat, 
  Ruler, Building2, Hammer
} from 'lucide-react';
import GooeyNav from './components/GooeyNav';

/* MS BUILDERS COLOR THEME:
  - Base: Deep Blue (#1e3a8a) inspired by the MS logo
  - Secondary: Light Blue (#3b82f6) for contrast
  - Accent: Red (#dc2626) from the logo's red roofs
  - Background: Soft White (#f8fafc) and Light Gray (#e2e8f0)
  - Text: Dark Blue (#1e293b) instead of black
*/

// --- DESIGN TOKENS ---
const COLORS = {
  bg: "bg-[#f8fafc]",        // Soft White
  bgAlt: "bg-white",         // Pure White
  bgDark: "bg-[#1e3a8a]",    // Deep Blue
  text: "text-[#1e293b]",    // Dark Slate
  textMuted: "text-slate-600",// Medium Grey
  accent: "text-[#3b82f6]",  // Royal Blue
  accentRed: "text-[#dc2626]",  // Red Accent
  accentBg: "bg-[#3b82f6]",  // Royal Blue Background
  accentRedBg: "bg-[#dc2626]",  // Red Background
  border: "border-slate-200"
};

// --- DATA ---
const SERVICES = [
  { title: "CONTRACTS", desc: "End-to-end construction contracts ensuring quality and timely delivery.", icon: <Building2 className="w-8 h-8" /> },
  { title: "APPROVAL DRAWING", desc: "Complete architectural approval drawings for regulatory compliance and project authorization.", icon: <Building2 className="w-8 h-8" /> },
  { title: "2D PLAN 3D ELEVATION", desc: "Detailed 2D floor plans and stunning 3D elevation designs for visualization.", icon: <Ruler className="w-8 h-8" /> },
  { title: "ESTIMATION", desc: "Accurate cost estimation and budget planning for your construction projects.", icon: <HardHat className="w-8 h-8" /> },
  { title: "INTERIOR DESIGNS", desc: "Creative and functional interior design solutions tailored to your lifestyle.", icon: <Building2 className="w-8 h-8" /> },
  { title: "3D WALKTHROUGH", desc: "Immersive 3D walkthroughs to experience your dream home before construction.", icon: <Building2 className="w-8 h-8" /> },
  { title: "ELECTRICAL DESIGN", desc: "Comprehensive electrical design and planning for safety and efficiency.", icon: <Hammer className="w-8 h-8" /> },
  { title: "RENOVATION WORK", desc: "Professional renovation services to transform and upgrade existing spaces.", icon: <Hammer className="w-8 h-8" /> },
  { title: "CONSULTING", desc: "Expert construction consulting services from planning to execution.", icon: <Award className="w-8 h-8" /> },
];

const PROJECTS = [
  { id: 1, title: "New project at Pollachi", cat: "Residential", img: "https://5.imimg.com/data5/SELLER/Default/2023/9/341417050/PZ/AJ/YZ/51126412/commercial-building-design-500x500.jpg" },
  { id: 2, title: "Home Project at Coimbatore", cat: "Residential", img: "https://5.imimg.com/data5/ANDROID/Default/2025/9/541496630/QS/AZ/OU/161975083/product-jpeg-500x500.jpg" },
  { id: 3, title: "Project at Pollachi", cat: "Residential", img: "https://i.pinimg.com/originals/1d/67/e1/1d67e16db2edaf38d7a4d6a39ca6dd12.jpg" },
  { id: 4, title: "Modern home at Coimbatore", cat: "Residential", img: "https://i.pinimg.com/236x/d2/22/19/d22219c23aece45c58e3f5849428062b.jpg" }
];

// --- COMPONENTS ---

// 1. Custom Cursor
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Add listeners for hoverable elements
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.hover-trigger')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-[#3b82f6] rounded-full pointer-events-none z-50 hidden md:flex items-center justify-center"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? "rgba(59, 130, 246, 0.2)" : "transparent"
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
    >
      <div className={`w-1 h-1 bg-[#3b82f6] rounded-full ${isHovering ? 'hidden' : 'block'}`} />
    </motion.div>
  );
};

// 2. Navigation with GooeyNav
const Navbar = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Change color when scrolled past hero section
      setIsScrolled(currentScrollY > window.innerHeight * 0.8);
    };

    const handleMouseMove = () => {
      // Show nav on any mouse movement
      setShowNav(true);
      
      // Clear existing timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      
      // Set new timeout to hide after 5 seconds
      hideTimeoutRef.current = setTimeout(() => {
        setShowNav(false);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  // Find initial active index
  const initialActiveIndex = navItems.findIndex(item => item.href === `#${activeSection}`);

  const handleNavClick = (href, label) => {
    setMobileMenuOpen(false);
    setActiveSection(label.toLowerCase());
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <div 
        className={`hidden md:block ${isScrolled ? 'scrolled' : ''} ${showNav ? '' : 'nav-hidden'}`}
        onMouseEnter={() => {
          setShowNav(true);
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
          }
        }}
        onMouseLeave={() => {
          hideTimeoutRef.current = setTimeout(() => {
            setShowNav(false);
          }, 5000);
        }}
      >
        <GooeyNav
          items={navItems}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={initialActiveIndex >= 0 ? initialActiveIndex : 0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      {/* Mobile Hamburger Button */}
      <motion.button
        className="md:hidden fixed top-4 right-4 z-[1001] w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={mobileMenuOpen ? "open" : "closed"}
          className="w-6 h-5 flex flex-col justify-between"
        >
          <motion.span
            className="w-full h-0.5 bg-[#1e3a8a] rounded"
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 9 }
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-full h-0.5 bg-[#1e3a8a] rounded"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-full h-0.5 bg-[#1e3a8a] rounded"
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -9 }
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[1000] bg-[#1e3a8a]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              className="flex flex-col items-center justify-center h-full gap-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.label);
                  }}
                  className={`text-3xl font-bold tracking-wider transition-colors ${
                    activeSection === item.label.toLowerCase()
                      ? 'text-[#3b82f6]'
                      : 'text-white hover:text-[#3b82f6]'
                  }`}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// 3. Hero Section
const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Parallax Text
  const y2 = useTransform(scrollY, [0, 500], [0, -100]); // Parallax Background

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: y2 }}
      >
        {/* Overlay gradient using Blue tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/80 via-[#3b82f6]/40 to-white/90 z-10" />
        {/* White shadow gradient from top to bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/60 z-20" />
        <video 
          src="/images/Video_Ready_After_User_Request.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-70"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
        style={{ y: y1 }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-2 sm:px-3 border border-[#3b82f6] text-[#3b82f6] text-[10px] sm:text-xs font-bold tracking-[0.1em] sm:tracking-[0.2em] mb-4 sm:mb-6 rounded-full bg-white">
            ENGINEERS, PLANNERS, CONTRACTORS
          </span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6 sm:mb-8">
          <motion.span 
            className="block text-[#1e293b] drop-shadow-lg"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            BUILD YOUR
          </motion.span>
          <motion.span 
            className="block font-black"
            style={{
              color: 'white',
              textShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.7)',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            DREAM HOME
          </motion.span>
          <motion.span 
            className="block text-[#1e293b] drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            WITH US
          </motion.span>
        </h1>

        <motion.p 
          className="text-[#1e293b] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed drop-shadow-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          From approval drawings to complete construction contracts, we bring your vision to life with expertise and precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 w-full max-w-lg mx-auto"
        >
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#3b82f6] text-white font-bold text-sm sm:text-base tracking-widest hover:bg-[#dc2626] transition-colors duration-300 hover-trigger shadow-lg"
          >
            VIEW PROJECTS
          </button>
          <button 
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#3b82f6] text-[#3b82f6] bg-white/80 font-bold text-sm sm:text-base tracking-widest hover:bg-[#3b82f6] hover:text-white transition-colors duration-300 hover-trigger"
          >
            OUR SERVICES
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#1e293b]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-[#3b82f6]" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// 4. About Section (Storytelling)
const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Years Experience", value: "10+" },
    { label: "Projects Completed", value: "450+" },
    { label: "Awards Won", value: "32" },
    { label: "Team Members", value: "120" },
  ];

  return (
    <section id="about" className="bg-white pt-32 pb-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-[#3b82f6]/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-[#dc2626]/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, -50, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h4 
              className="text-[#3b82f6] font-bold tracking-widest mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              WHO WE ARE
            </motion.h4>
            <motion.h2 
              className="text-4xl md:text-6xl text-[#1e293b] font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Building Dreams, <br/> Creating <span className="text-[#dc2626]">Legacies</span>
            </motion.h2>
            <motion.p 
              className="text-[#1e293b] text-lg mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Led by <strong>Er. M. Suganeshwaran BE., ME Struct.</strong>, MS Builders is a trusted name in construction services in Pollachi and Coimbatore. 
            </motion.p>
            <motion.p 
              className="text-slate-600 text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              From approval drawings and 3D designs to complete construction contracts, we handle every aspect of your dream home with precision and care. Our comprehensive services ensure your project is delivered on time, within budget, and beyond expectations.
            </motion.p>

            {/* Contact Info */}
            <motion.div 
              className="space-y-4 mt-8 p-6 bg-slate-50 border-l-4 border-[#3b82f6] rounded"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div 
                className="flex items-center gap-3 text-[#1e293b]"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Phone className="text-[#3b82f6]" size={20} />
                <span className="font-semibold text-lg">8973636860</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-[#1e293b]"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <MapPin className="text-[#3b82f6]" size={20} />
                <span>Lakshmi Nagar, Pollachi 642001</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-[#1e293b]"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Instagram className="text-[#3b82f6]" size={20} />
                <span>@_ms_builders_design_</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image of Owner */}
          <div className="relative">
            <motion.div 
              className="absolute top-0 right-0 w-3/4 h-3/4 border-2 border-[#3b82f6]/30 z-0"
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 3 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="/images/owner.jpeg"
                alt="Er. M. Suganeshwaran - Founder"
                className="w-full h-auto shadow-2xl"
              />
            </motion.div>
            
            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-[#dc2626] text-white p-6 rounded-lg shadow-xl z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, rotate: -3 }}
            >
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm">Years Experience</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 4.5. Mission & Vision Section
const MissionVision = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[50px] border-[#3b82f6] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Slogan */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-5xl font-black text-[#1e3a8a] mb-3 tracking-tight">
              Zero Surprises.
            </h3>
            <h3 className="text-3xl md:text-5xl font-black text-[#3b82f6] tracking-tight">
              Just What We Promised
            </h3>
          </motion.div>
          <motion.div
            className="w-24 h-1 bg-[#dc2626] mx-auto mt-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mission Card */}
          <motion.div
            className="bg-white p-8 md:p-10 rounded-lg shadow-xl border-t-4 border-[#3b82f6] relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] rounded-lg flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <Award className="text-white" size={32} />
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">Our Mission</h4>
              <p className="text-slate-600 text-lg leading-relaxed">
                To deliver exceptional construction services that exceed expectations, combining innovative design with 
                superior craftsmanship. We are committed to building lasting relationships with our clients by providing 
                transparent, reliable, and high-quality solutions for every project.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="bg-white p-8 md:p-10 rounded-lg shadow-xl border-t-4 border-[#dc2626] relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#dc2626]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] rounded-lg flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <HardHat className="text-white" size={32} />
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">Our Vision</h4>
              <p className="text-slate-600 text-lg leading-relaxed">
                To be the most trusted construction partner in South India, recognized for our integrity, innovation, 
                and commitment to excellence. We envision creating sustainable, beautiful spaces that enhance communities 
                and stand the test of time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 5. Services Section
const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services" className="bg-slate-50 pt-16 pb-16">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h4 className="text-[#3b82f6] font-bold tracking-widest mb-4">OUR SERVICES</h4>
          <h2 className="text-4xl md:text-5xl text-[#1e293b] font-bold">Comprehensive Construction Solutions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              className={`p-8 border-2 border-slate-200 bg-white relative overflow-hidden group hover-trigger cursor-pointer shadow-lg rounded-lg`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              {/* Background fill animation */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] z-0"
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: hoveredIndex === idx ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              
              <div className="relative z-10">
                <div className={`mb-4 p-3 rounded-lg w-fit transition-colors duration-300 ${hoveredIndex === idx ? 'bg-white text-[#3b82f6]' : 'bg-slate-100 text-[#1e293b]'}`}>
                  {service.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${hoveredIndex === idx ? 'text-white' : 'text-[#1e293b]'}`}>
                  {service.title}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${hoveredIndex === idx ? 'text-white/90' : 'text-slate-600'}`}>
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Projects Section (Scroll Reveal)
const Projects = ({ onExploreClick }) => {
  return (
    <section id="projects" className="bg-white pt-16 pb-16">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <center>
          <h4 className="text-[#3b82f6] font-bold tracking-widest mb-4">PORTFOLIO</h4>
          <h2 className="text-4xl md:text-5xl text-[#1e293b] font-bold">Our Projects</h2>
          </center>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* Explore Button */}
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button 
            onClick={onExploreClick}
            className="group px-10 py-5 bg-gradient-to-r from-[#3b82f6] to-[#1e3a8a] text-white font-bold tracking-widest hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            EXPLORE ALL PROJECTS
            <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Project Card Sub-component
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className={`group relative h-[500px] overflow-hidden hover-trigger border border-white/5 ${index % 2 === 1 ? 'md:mt-20' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <img 
        src={project.img} 
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/90 via-[#1e3a8a]/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
      
      <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <span className="text-[#3b82f6] text-sm font-bold tracking-widest uppercase mb-2 block">
          {project.cat}
        </span>
        <h3 className="text-3xl text-white font-bold mb-4">{project.title}</h3>
        <div className="h-[1px] w-0 group-hover:w-full bg-white/50 transition-all duration-700 mb-4" />
        <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          Click to view project case study
        </p>
      </div>
    </motion.div>
  );
};

// 7. Contact Section (Minimal)
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration
      const serviceID = 'service_a8jhbv6';
      const templateID = 'template_f8qjtpj';
      const publicKey = 'hdnR9F95rHGW2qBhh';

      // Import EmailJS
      const emailjs = (await import('@emailjs/browser')).default;
      
      console.log('EmailJS loaded, preparing to send...');
      console.log('Form data:', formData);
      
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        submission_time: new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          dateStyle: 'medium',
          timeStyle: 'short'
        })
      };

      console.log('Sending email with params:', templateParams);
      
      const result = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      console.log('EmailJS Success:', result);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('EmailJS Error Details:', error);
      console.error('Error message:', error.text || error.message);
      console.error('Error status:', error.status);
      setSubmitStatus('error');
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-slate-50 pt-16 pb-32 relative">
      <div className="container mx-auto px-6">
        <div className="bg-white p-10 md:p-20 border-2 border-slate-200 relative overflow-hidden shadow-2xl">
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 p-10 opacity-5">
             <Building2 size={300} className="text-[#3b82f6]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            <div>
              <h4 className="text-[#3b82f6] font-bold tracking-widest mb-4">START A PROJECT</h4>
              <h2 className="text-4xl md:text-5xl text-[#1e293b] font-bold mb-8">Let's build your<br/>dream home together.</h2>
              <p className="text-slate-600 text-lg mb-10">
                From planning to execution, we're here to make your construction journey smooth and hassle-free.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-[#1e293b]">
                  <div className="w-12 h-12 bg-[#3b82f6] flex items-center justify-center rounded-full text-white">
                    <MapPin />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Location</p>
                    <p className="font-medium">Lakshmi Nagar, Pollachi 642001</p>
                    <p className="text-sm text-slate-600">Pollachi | Coimbatore</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[#1e293b]">
                  <div className="w-12 h-12 bg-[#3b82f6] flex items-center justify-center rounded-full text-white">
                    <Phone />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Phone</p>
                    <a href="tel:8973636860" className="font-medium text-xl hover:text-[#3b82f6] transition-colors">8973636860</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[#1e293b]">
                  <div className="w-12 h-12 bg-[#3b82f6] flex items-center justify-center rounded-full text-white">
                    <Mail />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <a href="mailto:msbuildersdesignpollachi12@gmail.com" className="font-medium hover:text-[#3b82f6] transition-colors break-all">msbuildersdesignpollachi12@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[#1e293b]">
                  <div className="w-12 h-12 bg-[#3b82f6] flex items-center justify-center rounded-full text-white">
                    <Instagram />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Instagram</p>
                    <a href="https://www.instagram.com/_ms_builders_design_/" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-[#3b82f6] transition-colors">@_ms_builders_design_</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 pt-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-slate-600 uppercase tracking-wider font-semibold">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-slate-50 border-2 border-slate-200 p-4 text-[#1e293b] focus:outline-none focus:border-[#3b82f6] transition-colors disabled:opacity-50" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-600 uppercase tracking-wider font-semibold">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-slate-50 border-2 border-slate-200 p-4 text-[#1e293b] focus:outline-none focus:border-[#3b82f6] transition-colors disabled:opacity-50" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600 uppercase tracking-wider font-semibold">Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full bg-slate-50 border-2 border-slate-200 p-4 text-[#1e293b] focus:outline-none focus:border-[#3b82f6] transition-colors disabled:opacity-50"
                >
                  <option>General Inquiry</option>
                  <option>New Project Proposal</option>
                  <option>Request Quote</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600 uppercase tracking-wider font-semibold">Message</label>
                <textarea 
                  rows="4" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full bg-slate-50 border-2 border-slate-200 p-4 text-[#1e293b] focus:outline-none focus:border-[#3b82f6] transition-colors disabled:opacity-50" 
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border-2 border-green-500 text-green-700 font-semibold">
                  ✓ Thank you! Your message has been sent successfully. We'll respond shortly.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border-2 border-red-500 text-red-700 font-semibold">
                  ✗ Failed to send message. Please try again or contact us directly.
                </div>
              )}
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#3b82f6] text-white font-bold tracking-widest hover:bg-[#dc2626] transition-colors duration-300 hover-trigger disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="mt-16 w-full h-[400px] relative z-10 border-2 border-slate-200 rounded-sm overflow-hidden">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.8985485!2d77.0052!3d10.6637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDM5JzQ5LjMiTiA3N8KwMDAnMTguNyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen="" 
               loading="lazy"
               title="MS Builders Location - Pollachi"
             ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

// 8. Footer
const Footer = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1e3a8a] relative overflow-hidden">
      {/* White shadow overlay for logo visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/20">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <img 
                src="/images/logo.png" 
                alt="MS Builders" 
                className="h-32 md:h-36 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] brightness-110"
              />
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Building excellence since 2001. From concept to completion, we deliver quality construction services in Pollachi and Coimbatore.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/_ms_builders_design_/" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#dc2626] hover:scale-110 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#dc2626] hover:scale-110 transition-all duration-300 cursor-pointer">
                <Linkedin size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#dc2626] hover:scale-110 transition-all duration-300 cursor-pointer">
                <Facebook size={18} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 tracking-wider">QUICK LINKS</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('home')} 
                  className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#dc2626] transition-all duration-300"></span>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} 
                  className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#dc2626] transition-all duration-300"></span>
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} 
                  className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#dc2626] transition-all duration-300"></span>
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('projects')} 
                  className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#dc2626] transition-all duration-300"></span>
                  Projects
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} 
                  className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#dc2626] transition-all duration-300"></span>
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 tracking-wider">OUR SERVICES</h3>
            <ul className="space-y-3 text-white/80 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Approval Drawings</li>
              <li className="hover:text-white transition-colors cursor-pointer">3D Design & Visualization</li>
              <li className="hover:text-white transition-colors cursor-pointer">Construction Contracts</li>
              <li className="hover:text-white transition-colors cursor-pointer">Structural Engineering</li>
              <li className="hover:text-white transition-colors cursor-pointer">Project Management</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 tracking-wider">CONTACT INFO</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/80 text-sm">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-[#3b82f6]" />
                <span>Lakshmi Nagar, Pollachi 642001, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-3 text-white/80 text-sm">
                <Phone size={18} className="flex-shrink-0 text-[#3b82f6]" />
                <a href="tel:8973636860" className="hover:text-white transition-colors">+91 8973636860</a>
              </li>
              <li className="flex items-center gap-3 text-white/80 text-sm">
                <Mail size={18} className="flex-shrink-0 text-[#3b82f6]" />
                <a href="mailto:msbuildersdesignpollachi12@gmail.com" className="hover:text-white transition-colors">msbuildersdesignpollachi12@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
          <p>&copy; 2026 MS Builders - Engineers, Planners, Contractors. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Hidden Projects Page Component
const AllProjectsPage = ({ onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Sample project images - you can replace these with actual images
  const projectImages = {
    1: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    2: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800'
    ],
    3: [
      'https://images.unsplash.com/photo-1600607688097-df92c42462e0?w=800',
      'https://images.unsplash.com/photo-1600607688066-890987a5e0e7?w=800',
      'https://images.unsplash.com/photo-1600607688080-9e3c8b7f2b38?w=800'
    ],
    4: [
      'https://images.unsplash.com/photo-1600607688097-df92c42462e0?w=800',
      'https://images.unsplash.com/photo-1600607688066-890987a5e0e7?w=800',
      'https://images.unsplash.com/photo-1600607688080-9e3c8b7f2b38?w=800'
    ]
  };

  return (
    <motion.div
      className="fixed inset-0 z-[2000] bg-[#f8fafc] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-8 right-8 z-[2001] w-14 h-14 bg-[#dc2626] text-white rounded-full flex items-center justify-center hover:bg-[#b91c1c] hover:scale-110 transition-all duration-300 shadow-xl"
      >
        <X size={24} />
      </button>

      {/* Content */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h4 className="text-[#3b82f6] font-bold tracking-widest mb-4 text-center">COMPLETE PORTFOLIO</h4>
          <h1 className="text-5xl md:text-7xl text-[#1e293b] font-bold mb-12 text-center">All Our Projects</h1>
          <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-16">
            Explore our complete collection of residential and commercial construction projects across Pollachi and Coimbatore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <div key={project.id}>
              <motion.div
                className="group relative h-[400px] overflow-hidden hover-trigger border border-slate-200 shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              >
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/90 via-[#1e3a8a]/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="text-[#3b82f6] text-xs font-bold tracking-widest uppercase mb-2 block">
                    {project.cat}
                  </span>
                  <h3 className="text-xl text-white font-bold">{project.title}</h3>
                  <p className="text-white/80 text-sm mt-2">Click to view gallery</p>
                </div>

                {/* Expand indicator */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: selectedProject === project.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-white" size={20} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Project Images Gallery */}
              <AnimatePresence>
                {selectedProject === project.id && projectImages[project.id] && (
                  <motion.div
                    className="mt-6 mb-8"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
                      <h4 className="text-2xl font-bold text-[#1e3a8a] mb-4">Project Gallery</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {projectImages[project.id].map((imgUrl, imgIdx) => (
                          <motion.div
                            key={imgIdx}
                            className="relative h-64 overflow-hidden rounded-lg shadow-md group cursor-pointer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: imgIdx * 0.1 }}
                          >
                            <img 
                              src={imgUrl}
                              alt={`${project.title} - Image ${imgIdx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(true);

  // React Bit: Global Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track if user is in hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsInHeroSection(window.scrollY < heroHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans selection:bg-[#3b82f6] selection:text-white">
      <CustomCursor />
      
      {/* Scroll Progress Bar - Fixed at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#3b82f6] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Logo in top left corner - visible only in hero section */}
      <motion.div 
        className="fixed top-3 left-3 md:top-6 md:left-6 z-[1000]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isInHeroSection ? 1 : 0, 
          scale: isInHeroSection ? 1 : 0.8,
          pointerEvents: isInHeroSection ? 'auto' : 'none'
        }}
        transition={{ duration: 0.5 }}
      >
        <a href="#home" onClick={() => {
          setActiveSection('home');
          document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <img 
            src="/images/logo.png" 
            alt="MS Builders Logo" 
            className="h-16 sm:h-24 md:h-32 lg:h-40 w-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-lg"
          />
        </a>
      </motion.div>

      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        <Hero />
        <About />
        <MissionVision />
        <Services />
        <Projects onExploreClick={() => setShowAllProjects(true)} />
        <Contact />
      </main>

      <Footer />

      {/* Hidden Projects Page */}
      <AnimatePresence>
        {showAllProjects && (
          <AllProjectsPage onClose={() => setShowAllProjects(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}