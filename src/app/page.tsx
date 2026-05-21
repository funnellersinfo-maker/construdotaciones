"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Shield,
  Shirt,
  Flame,
  Zap,
  SignpostBig,
  Palette,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  Clock,
  Users,
  Award,
  Truck,
  Menu,
  X,
  ExternalLink,
  Star,
  HardHat,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

/* ─────────────────────────── data ─────────────────────────── */

const SERVICES = [
  {
    icon: Shirt,
    title: "Dotaciones Industriales",
    desc: "Nuestras prendas están diseñadas y confeccionadas para una máxima comodidad con altos estándares de Calidad, Durabilidad y Frescura.",
    img: "/images/service-dotaciones.jpg",
  },
  {
    icon: Shield,
    title: "Seguridad Industrial",
    desc: "Todos nuestros productos cuentan con todas las certificaciones y el respaldo de las mejores marcas en el mercado.",
    img: "/images/service-seguridad.jpg",
  },
  {
    icon: Palette,
    title: "Bordados y Estampados",
    desc: "Este servicio es un plus muy valioso que le brindamos a nuestros clientes. Cada hilada la hacemos con dedicación para obtener grandiosos acabados.",
    img: "/images/service-bordados.jpg",
  },
  {
    icon: Flame,
    title: "Venta y Recarga de Extintores",
    desc: "No solo comercializamos el producto, también le ofrecemos el mantenimiento, recarga y capacitación con nuestros técnicos especializados.",
    img: "/images/service-extintores.jpg",
  },
  {
    icon: Zap,
    title: "Abrasivos e Insumos de Metalmecánica",
    desc: "Nuestra empresa ofrece una amplia gama de abrasivos e insumos de metalmecánica de alta calidad para su industria.",
    img: "/images/service-abrasivos.jpg",
  },
  {
    icon: SignpostBig,
    title: "Señalización",
    desc: "Contamos con excelentes precios, dado que somos fabricantes. Pregunte por nuestra línea de distribuidores.",
    img: "/images/service-senalizacion.jpg",
  },
];

const STATS = [
  { value: 10, suffix: "+", label: "Años de Experiencia", icon: Clock },
  { value: 500, suffix: "+", label: "Clientes Satisfechos", icon: Users },
  { value: 1000, suffix: "+", label: "Proyectos Entregados", icon: Award },
  { value: 32, suffix: "", label: "Departamentos Cobertura", icon: Truck },
];

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "#contacto" },
];

/* ─────────────────── Animated counter ──────────────────── */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/* ────────────── Section wrapper with reveal ──────────── */

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────── Navigation ──────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#inicio"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center overflow-hidden">
                <HardHat className="w-6 h-6 text-background" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-none">
                  CONSTRU<span className="text-primary">DOTACIONES</span>
                </span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                  Cartagena, Colombia
                </span>
              </div>
            </motion.a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-6" />
                </a>
              ))}
              <a
                href="#contacto"
                className="ml-4 px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                Contáctenos
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-4 text-lg font-medium rounded-xl hover:bg-secondary transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-primary" />
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-5 py-3 text-center font-semibold bg-primary text-primary-foreground rounded-full"
              >
                Contáctenos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ────────────────────── Hero Section ──────────────────── */

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-industrial.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 vignette" />
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              y: [null, "-100vh"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6"
        >
          <Badge
            variant="outline"
            className="px-4 py-2 text-xs sm:text-sm border-primary/30 bg-primary/5 backdrop-blur-sm"
          >
            <span className="mr-2 inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
            Cartagena, +10 años de experiencia
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6"
        >
          <span className="block text-foreground">CONSTRU</span>
          <span className="block gradient-text-amber">DOTACIONES</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground mb-4 font-light"
        >
          Trabajamos unidos por su seguridad, con más de{" "}
          <span className="text-primary font-semibold">10 años de experiencia</span>.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground/70 mb-10"
        >
          Dotaciones industriales, seguridad industrial, bordados, estampados, extintores, abrasivos y señalización.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#servicios"
            className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              Nuestros Servicios
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-amber-500 to-primary animate-shimmer" />
          </a>
          <a
            href="tel:+573025658351"
            className="group px-8 py-4 border border-border rounded-full font-bold text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-primary" />
            (+57) 302-565-8351
          </a>
        </motion.div>


      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-bounce z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground/50 tracking-widest uppercase">
            Descubre más
          </span>
          <ChevronDown className="w-5 h-5 text-primary/60" />
        </div>
      </motion.div>

      {/* WhatsApp button - bottom right, no overlap */}
      <motion.a
        href="https://wa.link/fyej5y"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
        className="absolute bottom-8 right-6 sm:right-10 z-10 inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 hover:shadow-xl hover:shadow-green-600/30 hover:scale-105"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        WhatsApp
      </motion.a>
    </section>
  );
}

/* ─────────────────── Marquee banner ──────────────────── */

function MarqueeBanner() {
  const items = [
    "Dotaciones Industriales",
    "Seguridad Industrial",
    "Bordados y Estampados",
    "Extintores",
    "Abrasivos",
    "Señalización",
    "Calidad Premium",
    "Envíos a toda Colombia",
  ];
  return (
    <div className="relative overflow-hidden py-4 border-y border-border/50 bg-secondary/30">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-medium text-muted-foreground/60 flex items-center gap-3"
          >
            <Star className="w-3 h-3 text-primary/40" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── About / Stats ──────────────────── */

function AboutSection() {
  return (
    <section id="nosotros" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealSection className="text-center mb-16 sm:mb-20">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Sobre Nosotros
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">
            En <span className="gradient-text-amber">CONSTRUDOTACIONES</span>
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed">
            Diariamente brindamos la mejor asesoría y acompañamiento con nuestro excelente equipo de trabajo, 
            ofreciéndoles nuestra amplia gama de productos para la dotación, suministros y seguridad de sus trabajadores.
          </p>
        </RevealSection>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <RevealSection key={stat.label} delay={i * 0.15}>
                <div className="service-card relative p-6 sm:p-8 rounded-2xl bg-card border border-border/50 text-center overflow-hidden group">
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text-amber mb-2">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </RevealSection>
            );
          })}
        </div>

        {/* Feature highlights */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              title: "TU SEGURIDAD ES NUESTRO COMPROMISO",
              desc: "Todos nuestros productos cumplen con las normativas y certificaciones vigentes en Colombia.",
              icon: Shield,
            },
            {
              title: "ENVIAMOS A TODA COLOMBIA",
              desc: "Cobertura nacional con servicio de entrega rápida y confiable a todo el territorio colombiano.",
              icon: Truck,
            },
            {
              title: "CALIDAD GARANTIZADA",
              desc: "Más de 10 años respaldando la confianza de nuestros clientes con productos de primera línea.",
              icon: Award,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealSection key={item.title} delay={i * 0.2}>
                <div className="p-6 rounded-2xl bg-gradient-to-b from-card to-secondary/30 border border-border/30 group hover:border-primary/30 transition-all duration-500">
                  <Icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-sm font-bold tracking-wider text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Services Section ──────────────────── */

function ServicesSection() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section id="servicios" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealSection className="text-center mb-16 sm:mb-20">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Nuestros Servicios
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">
            NUESTROS <span className="gradient-text-amber">SERVICIOS</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg">
            Ofrecemos una amplia gama de productos y servicios para la dotación, suministros y seguridad de sus trabajadores.
          </p>
        </RevealSection>

        {/* Desktop: Tabbed layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-start">
          {/* Services list */}
          <div className="flex flex-col gap-3">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const isActive = i === activeService;
              return (
                <motion.button
                  key={service.title}
                  onClick={() => setActiveService(i)}
                  className={`relative text-left p-5 rounded-2xl border transition-all duration-500 cursor-pointer group ${
                    isActive
                      ? "bg-card border-primary/30 shadow-lg shadow-primary/5"
                      : "bg-transparent border-border/30 hover:border-border hover:bg-card/50"
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeService"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3
                        className={`font-bold text-base mb-1 transition-colors duration-300 ${
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground/70 line-clamp-2">{service.desc}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Image showcase */}
          <div className="relative sticky top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-border/30"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url('${SERVICES[activeService].img}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {SERVICES[activeService].title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {SERVICES[activeService].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Card grid */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <RevealSection key={service.title} delay={i * 0.1}>
                <div className="service-card group relative rounded-2xl overflow-hidden border border-border/30 bg-card">
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${service.img}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm mb-2">{service.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ────────────────── Why Choose Us ──────────────────── */

function WhyChooseSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Nuestra Diferencia
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            ¿POR QUÉ <span className="gradient-text-amber">ELEGIRNOS</span>?
          </h2>
        </RevealSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: "01",
              title: "Experiencia Comprobada",
              desc: "Más de 10 años en el mercado nos respaldan con un historial de excelencia.",
            },
            {
              num: "02",
              title: "Productos Certificados",
              desc: "Todos nuestros equipos y prendas cuentan con certificaciones vigentes.",
            },
            {
              num: "03",
              title: "Servicio Personalizado",
              desc: "Asesoría y acompañamiento dedicado para cada uno de nuestros clientes.",
            },
            {
              num: "04",
              title: "Cobertura Nacional",
              desc: "Realizamos envíos a toda Colombia con servicio rápido y confiable.",
            },
          ].map((item, i) => (
            <RevealSection key={item.num} delay={i * 0.15}>
              <div className="relative p-6 rounded-2xl bg-card border border-border/30 hover:border-primary/20 transition-all duration-500 group h-full">
                <span className="text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                  {item.num}
                </span>
                <h3 className="text-base font-bold mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Catalog CTA Section ──────────────── */

function CatalogSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="relative rounded-3xl overflow-hidden border border-border/30">
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/hero-industrial.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />

            <div className="relative p-8 sm:p-12 lg:p-20">
              <div className="max-w-xl">
                <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                  Catálogo 2025
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">
                  Descubre Nuestro{" "}
                  <span className="gradient-text-amber">Catálogo Completo</span>
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
                  Explore nuestra amplia variedad de productos y servicios. Desde dotaciones industriales 
                  hasta señalización, tenemos todo lo que su empresa necesita.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#contacto"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                  >
                    Solicitar Catálogo
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.link/fyej5y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-full font-bold text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                    aria-label="Solicitar catálogo por WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-500">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─────────────────── Contact Section ──────────────────── */

function ContactSection() {
  const [formState, setFormState] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    mensaje: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const msg = encodeURIComponent(
        `🏢 *NUEVO CONTACTO - CONSTRUDOTACIONES*\n👤 Nombre: ${formState.nombre}\n📞 Teléfono: ${formState.telefono}\n📧 Correo: ${formState.correo}\n💬 Mensaje: ${formState.mensaje}\n---\nEnviado desde el sitio web CONSTRUDOTACIONES`
      );
      window.open(`https://wa.me/573025658351?text=${msg}`, "_blank");
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setFormState({ nombre: "", telefono: "", correo: "", mensaje: "" });
    },
    [formState]
  );

  return (
    <section id="contacto" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Contáctenos
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">
            HABLEMOS DE SU <span className="gradient-text-amber">PROYECTO</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg">
            Estamos listos para asesorarle y brindarle la mejor solución para su empresa.
          </p>
        </RevealSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <RevealSection>
            <div className="space-y-6">
              {/* Info cards */}
              {[
                {
                  icon: Phone,
                  title: "Teléfonos",
                  lines: ["(+57) 302-565-8351", "(+57) 315-480-5893"],
                  href: "tel:+573025658351",
                },
                {
                  icon: Mail,
                  title: "Correo Electrónico",
                  lines: ["construdotaciones2023@gmail.com"],
                  href: "mailto:construdotaciones2023@gmail.com",
                },
                {
                  icon: MapPin,
                  title: "Dirección",
                  lines: [
                    "Barrio Bella Vista,",
                    "Manzana J Lote 18",
                    "Cartagena, Bolívar – Colombia",
                  ],
                  href: "https://maps.google.com/?q=Cartagena+Bolivar+Colombia",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/30 hover:border-primary/30 transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                      {item.lines.map((line) => (
                        <p key={line} className="text-sm text-muted-foreground">
                          {line}
                        </p>
                      ))}
                    </div>
                  </a>
                );
              })}

              {/* Map embed */}
              <div className="relative rounded-2xl overflow-hidden border border-border/30 h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62813.70766089893!2d-75.55702344999999!3d10.3910489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef6257a4d3b0001%3A0x64dca09a64ca0997!2sCartagena%2C+Bol%C3%ADvar%2C+Colombia!5e0!3m2!1ses!2s!4v1700000000000!5m2!1ses!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) contrast(0.8) brightness(0.7)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación CONSTRUDOTACIONES"
                />
              </div>
            </div>
          </RevealSection>

          {/* Contact Form */}
          <RevealSection delay={0.2}>
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-card border border-border/30 space-y-5">
              <h3 className="text-xl font-bold mb-2">Envíenos un Mensaje</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Complete el formulario y nos pondremos en contacto con usted lo antes posible.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                    Nombre Completo
                  </label>
                  <Input
                    required
                    value={formState.nombre}
                    onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
                    placeholder="Su nombre"
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                    Teléfono
                  </label>
                  <Input
                    required
                    value={formState.telefono}
                    onChange={(e) => setFormState({ ...formState, telefono: e.target.value })}
                    placeholder="+57 XXX-XXX-XXXX"
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                    Correo Electrónico
                  </label>
                  <Input
                    required
                    type="email"
                    value={formState.correo}
                    onChange={(e) => setFormState({ ...formState, correo: e.target.value })}
                    placeholder="su@correo.com"
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                    Mensaje
                  </label>
                  <Textarea
                    required
                    rows={4}
                    value={formState.mensaje}
                    onChange={(e) => setFormState({ ...formState, mensaje: e.target.value })}
                    placeholder="Cuéntenos sobre su necesidad..."
                    className="bg-secondary/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
              >
                {sent ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-400" />
                    Mensaje Enviado
                  </span>
                ) : (
                  "Enviar Mensaje"
                )}
              </Button>
            </form>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Footer ──────────────────── */

function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center">
                <HardHat className="w-6 h-6 text-background" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                CONSTRU<span className="text-primary">DOTACIONES</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Trabajamos unidos por su seguridad, con más de 10 años de experiencia en dotaciones industriales y seguridad industrial.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Cartagena, Colombia
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a
                    href="#servicios"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p>(+57) 302-565-8351</p>
                  <p>(+57) 315-480-5893</p>
                </div>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:construdotaciones2023@gmail.com" className="hover:text-primary transition-colors break-all"><span className="break-all">construdotaciones2023@gmail.com</span></a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p>Cartagena, Bolívar – Colombia</p>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-6">
              <a
                href="https://www.instagram.com/construdotacionesas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-foreground transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @construdotacionesas
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CONSTRUDOTACIONES. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Diseñado con dedicación para su seguridad
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────── Scroll to top ──────────────────── */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
          aria-label="Ir arriba"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────── Promo Hook + WhatsApp ──────────────────── */

function PromoHook() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [closed, setClosed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-cycle images
  useEffect(() => {
    if (!expanded) return;
    const timer = setInterval(() => setImgIndex((i) => (i + 1) % 2), 3000);
    return () => clearInterval(timer);
  }, [expanded]);

  if (closed) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Expanded promo card */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 80, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="fixed bottom-6 left-6 z-50 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden border border-primary/30 shadow-2xl shadow-black/50"
                style={{ background: "linear-gradient(145deg, oklch(0.14 0.02 60), oklch(0.10 0.01 280))" }}
              >
                {/* Header bar */}
                <div className="relative px-4 pt-3 pb-2 flex items-center justify-between" style={{ background: "linear-gradient(90deg, oklch(0.75 0.18 65), oklch(0.65 0.15 45))" }}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔥</span>
                    <span className="text-xs font-black text-primary-foreground uppercase tracking-wider">Oferta Especial</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-primary-foreground/80 bg-primary-foreground/20 px-2 py-0.5 rounded-full">
                      ⏰ {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
                    </span>
                    <button
                      onClick={() => setExpanded(false)}
                      className="w-6 h-6 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/40 flex items-center justify-center transition-colors"
                      aria-label="Cerrar promo"
                    >
                      <X className="w-3 h-3 text-primary-foreground" />
                    </button>
                  </div>
                </div>

                {/* Image carousel */}
                <div className="relative h-48 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={imgIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('/images/promo-jean-${imgIndex + 1}.jpg')` }}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Price badge */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-red-600 shadow-lg">
                    <span className="text-[10px] font-bold text-white line-through block">$40.000</span>
                    <span className="text-base font-black text-white">$35.000</span>
                    <span className="text-[9px] text-red-100 block">c/u x2 unidades</span>
                  </div>
                  {/* Image dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {[0, 1].map((i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === imgIndex ? "bg-primary w-5" : "bg-white/40"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-base font-black text-foreground leading-tight">
                      JEAN STRETCH INDUSTRIAL 👖💪
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Diseñado para gente que trabaja duro de verdad 👷🏻‍♂️🛵🏗️
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {["Tela stretch flexible", "No talla entrepierna", "Triple costura", "Fresco al calor ☀️"].map((f) => (
                      <div key={f} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span className="w-3.5 h-3.5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                          <span className="text-green-400 text-[8px]">✓</span>
                        </span>
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Promo banner */}
                  <div className="relative px-3 py-2.5 rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.75 0.18 65), oklch(0.65 0.2 45))" }}>
                    <div className="absolute inset-0 animate-shimmer opacity-30" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-primary-foreground/80 block">PROMO 2x1</span>
                        <span className="text-lg font-black text-primary-foreground leading-none">$70.000</span>
                        <span className="text-[10px] text-primary-foreground/70 block">los 2 jeans</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl">🔥</span>
                        <span className="text-[10px] font-bold text-primary-foreground block">Ahorra $10.000</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href="https://wa.link/fyej5y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-600/30 active:scale-[0.98]"
                    aria-label="Pedir jean stretch por WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    ¡Lo quiero! Escríbenos
                  </a>

                  <p className="text-[9px] text-center text-muted-foreground/50">
                    📍 Cartagena · 🚚 Envíos a toda Colombia
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed hook button */}
          {!expanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setExpanded(true)}
              className="fixed bottom-6 left-6 z-40 group"
              aria-label="Ver oferta especial"
            >
              <div className="relative flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-green-600/30 overflow-hidden" style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}>
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-green-400/30 animate-pulse-ring" />
                {/* Shimmer */}
                <div className="absolute inset-0 animate-shimmer opacity-40" />
                <span className="relative text-xl">🔥</span>
                <div className="relative flex flex-col">
                  <span className="text-[10px] font-bold text-green-100 leading-none">JEAN STRETCH</span>
                  <span className="text-xs font-black text-white leading-tight">2x $70.000</span>
                </div>
                <span className="relative text-green-200 group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
              {/* Close button */}
              <button
                onClick={(e) => { e.stopPropagation(); setClosed(true); }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-destructive transition-colors"
                aria-label="Cerrar hook"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </motion.button>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────── FAQ Section ──────────────────── */

const FAQ_ITEMS = [
  {
    q: "¿Hacen envíos a toda Colombia?",
    a: "Sí, realizamos envíos a todos los departamentos de Colombia con servicio rápido y confiable. Contáctenos por WhatsApp para cotizar el envío a su ciudad.",
  },
  {
    q: "¿Cuál es el tiempo de entrega?",
    a: "El tiempo de entrega varía según la ciudad de destino. Para Cartagena y Barranquilla, el envío puede ser el mismo día o siguiente. Para otras ciudades, entre 2 y 5 días hábiles.",
  },
  {
    q: "¿Ofrecen precios por mayor?",
    a: "Sí, manejamos precios especiales para compras al por mayor. Contáctenos directamente por WhatsApp o teléfono para recibir una cotización personalizada.",
  },
  {
    q: "¿Los extintores incluyen certificación?",
    a: "Sí, todos nuestros extintores cuentan con las certificaciones vigentes requeridas por la normativa colombiana. Además ofrecemos servicio de mantenimiento y recarga.",
  },
  {
    q: "¿Pueden personalizar las dotaciones con bordado?",
    a: "Por supuesto. Ofrecemos servicio de bordado y estampado personalizado para todas nuestras prendas. Puede incluir el logo de su empresa, nombre del trabajador, etc.",
  },
  {
    q: "¿Cuáles son los métodos de pago?",
    a: "Aceptamos transferencias bancarias, consignaciones, efectivo y pago contra entrega en algunas ciudades. Contáctenos para conocer las opciones disponibles.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            Preguntas <span className="gradient-text-amber">Frecuentes</span>
          </h2>
        </RevealSection>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <RevealSection key={i} delay={i * 0.08}>
              <div className="rounded-2xl border border-border/30 bg-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors"
                  aria-expanded={openIndex === i}
                  aria-label={item.q}
                >
                  <span className="font-semibold text-sm pr-4">{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-primary"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Live Viewers Counter ──────────────── */

function LiveViewers() {
  const [viewers, setViewers] = useState(() => Math.floor(Math.random() * 190) + 50);
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    const update = () => {
      const change = Math.floor(Math.random() * 15) + 1;
      setDirection((prev) => (Math.random() > 0.4 ? prev : prev === "up" ? "down" : "up"));
      setViewers((prev) => {
        const next = direction === "up" ? prev + change : prev - change;
        return Math.max(50, Math.min(239, next));
      });
      const nextDelay = Math.floor(Math.random() * 10000) + 5000;
      timerRef = setTimeout(update, nextDelay);
    };

    let timerRef = setTimeout(update, Math.floor(Math.random() * 10000) + 5000);
    return () => clearTimeout(timerRef);
  }, [direction]);

  return (
    <div className="relative border-t border-border/30 bg-gradient-to-r from-background via-secondary/20 to-background py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
          </span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="w-4 h-4 text-red-500" />
            <span>
              <motion.span
                key={viewers}
                initial={{ opacity: 0, y: direction === "up" ? 8 : -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="inline-block font-bold text-foreground tabular-nums"
              >
                {viewers}
              </motion.span>
              {" "}personas están viendo este sitio ahora
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Exit Intent Popup ──────────────── */

function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const hasShown = useRef(false);
  const inactiveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActivity = useRef(Date.now());

  const resetInactivityTimer = useCallback(() => {
    lastActivity.current = Date.now();
    if (inactiveTimer.current) clearTimeout(inactiveTimer.current);
    if (hasShown.current) return;
    inactiveTimer.current = setTimeout(() => {
      hasShown.current = true;
      setShow(true);
    }, 240000); // 4 minutes
  }, []);

  useEffect(() => {
    if (hasShown.current) return;

    // Inactivity detection
    const events = ["mousemove", "keydown", "scroll", "touchstart"] as const;
    const handlers = events.map((event) => {
      const handler = () => resetInactivityTimer();
      window.addEventListener(event, handler, { passive: true });
      return { event, handler };
    });
    resetInactivityTimer();

    // Exit intent (mouse leaving top of viewport on desktop)
    const mouseHandler = (e: MouseEvent) => {
      if (hasShown.current) return;
      if (e.clientY <= 10 && e.clientX >= 0) {
        hasShown.current = true;
        setShow(true);
      }
    };
    window.addEventListener("mouseout", mouseHandler);

    return () => {
      handlers.forEach(({ event, handler }) => window.removeEventListener(event, handler));
      window.removeEventListener("mouseout", mouseHandler);
      if (inactiveTimer.current) clearTimeout(inactiveTimer.current);
    };
  }, [resetInactivityTimer]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShow(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md rounded-3xl overflow-hidden border border-border/30 shadow-2xl shadow-black/50"
          >
            {/* Glassmorphism card */}
            <div className="relative bg-card/90 backdrop-blur-2xl p-8 text-center">
              {/* Glow decoration */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-3">
                  ¿Necesita <span className="gradient-text-amber">asesoría</span>?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Nuestro equipo está listo para atenderle. ¡Contáctenos ahora por WhatsApp y reciba atención personalizada al instante!
                </p>

                <a
                  href="https://wa.link/fyej5y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Contáctenos por WhatsApp
                </a>

                <button
                  onClick={() => setShow(false)}
                  className="block mx-auto mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  No, gracias
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <CatalogSection />
      <ContactSection />
      <FAQSection />
      <LiveViewers />
      <Footer />
      <ScrollToTop />
      <PromoHook />
      <ExitIntentPopup />
    </main>
  );
}
