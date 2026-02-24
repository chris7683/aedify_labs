const { useState, useEffect, useRef } = React;

/* ─────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{cursor:none}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:#0a0a0a}
::-webkit-scrollbar-thumb{background:#333;border-radius:3px}

/* Keyframes */
@keyframes floatA{0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-22px) rotate(2deg)}66%{transform:translateY(-10px) rotate(-1deg)}}
@keyframes floatB{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-16px) rotate(-3deg)}}
@keyframes floatC{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-12px) scale(1.03)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes spinR{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
@keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes marqL{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes marqR{from{transform:translateX(-50%)}to{transform:translateX(0)}}
@keyframes gradMove{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes morphBlob{
  0%,100%{border-radius:60% 40% 70% 30% / 50% 60% 40% 70%}
  25%{border-radius:40% 60% 30% 70% / 60% 40% 70% 30%}
  50%{border-radius:70% 30% 50% 50% / 30% 70% 50% 60%}
  75%{border-radius:30% 70% 60% 40% / 70% 30% 60% 40%}
}
@keyframes slideInUp{from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:translateY(0)}}
@keyframes popIn{from{opacity:0;transform:scale(0.7) rotate(-8deg)}to{opacity:1;transform:scale(1) rotate(0deg)}}
@keyframes introBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes curtainUp{from{transform:translateY(0)}to{transform:translateY(-100%)}}
@keyframes curtainDown{from{transform:translateY(0)}to{transform:translateY(100%)}}
@keyframes fadeLogoIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
@keyframes tagUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes wiggle{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-4deg)}75%{transform:rotate(4deg)}}
@keyframes bounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-14px)}60%{transform:translateY(-7px)}}
@keyframes countUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes glowPop{0%,100%{box-shadow:0 0 0 rgba(255,255,255,0)}50%{box-shadow:0 0 40px rgba(255,255,255,.12)}}
@keyframes introSpin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}

/* Nav */
.nav-link{font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;letter-spacing:.05em;color:rgba(255,255,255,.5);background:none;border:none;cursor:none;padding:6px 0;position:relative;transition:color .25s}
.nav-link::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1.5px;background:#fff;transition:width .3s cubic-bezier(.16,1,.3,1)}
.nav-link:hover{color:#fff}
.nav-link:hover::after{width:100%}

/* Buttons */
.btn-white{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;background:#fff;color:#0a0a0a;border:none;border-radius:50px;padding:15px 34px;cursor:none;position:relative;overflow:hidden;transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s}
.btn-white::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0),rgba(255,255,255,.3));transform:translateX(-110%) skewX(-20deg);transition:transform .55s cubic-bezier(.16,1,.3,1)}
.btn-white:hover{transform:scale(1.05) translateY(-2px);box-shadow:0 12px 40px rgba(255,255,255,.25)}
.btn-white:hover::after{transform:translateX(110%) skewX(-20deg)}

.btn-outline{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.2);border-radius:50px;padding:14px 34px;cursor:none;transition:border-color .3s,background .3s,transform .3s}
.btn-outline:hover{border-color:rgba(255,255,255,.7);background:rgba(255,255,255,.06);transform:scale(1.04)}

.btn-dark{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;background:#0a0a0a;color:#fff;border:none;border-radius:50px;padding:15px 34px;cursor:none;position:relative;overflow:hidden;transition:transform .3s,box-shadow .3s}
.btn-dark:hover{transform:scale(1.04);box-shadow:0 10px 36px rgba(0,0,0,.35)}

/* Cards */
.service-card{border-radius:24px;padding:40px 36px;position:relative;overflow:hidden;cursor:none;transition:transform .5s cubic-bezier(.16,1,.3,1),box-shadow .5s}
.service-card:hover{transform:translateY(-10px) scale(1.02);box-shadow:0 32px 72px rgba(0,0,0,.35)}
.service-card::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,0);transition:background .3s}
.service-card:hover::after{background:rgba(255,255,255,.03)}

.proj-card{border-radius:24px;overflow:hidden;cursor:none;position:relative;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.proj-card:hover{transform:scale(1.03) translateY(-4px)}
.proj-card:hover .proj-overlay{opacity:1;transform:none}
.proj-overlay{position:absolute;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.96);transition:all .4s cubic-bezier(.16,1,.3,1)}

.price-card{border-radius:24px;padding:48px 36px;position:relative;overflow:hidden;cursor:none;border:1px solid rgba(255,255,255,.08);transition:transform .5s cubic-bezier(.16,1,.3,1),border-color .3s}
.price-card:hover{transform:translateY(-10px);border-color:rgba(255,255,255,.22)}
.price-card.hot{border-color:rgba(255,255,255,.2);background:linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.02))}

/* Input */
.inp{width:100%;padding:16px 20px;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);border-radius:14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;color:#fff;outline:none;transition:border-color .25s,background .25s}
.inp::placeholder{color:rgba(255,255,255,.2)}
.inp:focus{border-color:rgba(255,255,255,.5);background:rgba(255,255,255,.08)}

/* Tags */
.chip{display:inline-block;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em;padding:5px 13px;border-radius:20px;text-transform:uppercase}

/* Misc */
.eyebrow{font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;display:inline-flex;align-items:center;gap:10px}
.dot-pulse{width:6px;height:6px;border-radius:50%;background:#4ade80;animation:pulse 1.8s ease-in-out infinite;display:inline-block}
.cursor-ring{position:fixed;pointer-events:none;z-index:99999;border-radius:50%;transform:translate(-50%,-50%);will-change:left,top}

/* ─── HAMBURGER ─── */
.hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;width:40px;height:40px;background:none;border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px;cursor:pointer;transition:border-color .3s}
.hamburger:hover{border-color:rgba(255,255,255,.3)}
.hamburger span{display:block;width:100%;height:1.5px;background:#fff;border-radius:2px;transition:transform .35s cubic-bezier(.16,1,.3,1),opacity .25s}
.hamburger.open span:nth-child(1){transform:rotate(45deg) translate(4px,4px)}
.hamburger.open span:nth-child(2){opacity:0}
.hamburger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}

/* Mobile nav overlay */
.mobile-nav{position:fixed;inset:0;z-index:999;background:rgba(8,8,8,.97);backdrop-filter:blur(32px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;opacity:0;pointer-events:none;transition:opacity .4s cubic-bezier(.16,1,.3,1)}
.mobile-nav.open{opacity:1;pointer-events:auto}
.mobile-nav-link{font-family:'Syne',sans-serif;font-size:32px;font-weight:700;letter-spacing:-.02em;color:rgba(255,255,255,.5);background:none;border:none;padding:18px 0;cursor:pointer;transition:color .25s,transform .3s;position:relative}
.mobile-nav-link:hover,.mobile-nav-link:active{color:#fff;transform:translateX(8px)}
.mobile-nav-link::before{content:'';position:absolute;left:-20px;top:50%;width:0;height:1.5px;background:linear-gradient(90deg,#a855f7,#3b82f6);transition:width .3s cubic-bezier(.16,1,.3,1);transform:translateY(-50%)}
.mobile-nav-link:hover::before,.mobile-nav-link:active::before{width:14px}

/* ─── RESPONSIVE ─── */
@media (max-width: 768px) {
  /* Hide custom cursor on touch devices */
  html,body{overflow-x:hidden!important;cursor:auto!important}
  *{cursor:auto!important}
  .cursor-ring{display:none!important}

  /* Nav */
  .nav-bar{padding:0 20px!important;height:60px!important}
  .nav-links{display:none!important}
  .nav-cta{display:none!important}
  .hamburger{display:flex!important}

  /* Sections */
  .s-hero{padding:90px 24px 48px!important;min-height:100vh!important;min-height:100dvh!important}
  .s-services,.s-pricing,.s-testimonials{padding:72px 24px!important}
  .s-portfolio{padding:0 24px 72px!important}
  .s-about{padding:0 24px 72px!important}
  .s-contact{padding:0 24px 72px!important}

  /* Hero */
  .hero-headline{font-size:clamp(40px,12vw,60px)!important;line-height:.88!important}
  .hero-badges{display:none!important;visibility:hidden!important;width:0!important;height:0!important;overflow:hidden!important;position:absolute!important}
  .hero-ctas{flex-direction:column!important;width:100%!important;gap:12px!important}
  .hero-ctas .btn-white,.hero-ctas .btn-outline{width:100%!important;text-align:center!important;display:block!important;padding:16px 28px!important;font-size:15px!important}
  .hero-sub-row{flex-direction:column!important;align-items:flex-start!important;gap:28px!important}
  .hero-sub-text{font-size:15px!important;line-height:1.7!important}
  .hero-eyebrow{margin-bottom:24px!important}
  .hero-divider{margin-top:28px!important;margin-bottom:28px!important}
  .hero-scroll{display:none!important}

  /* Stats */
  .grid-stats{grid-template-columns:repeat(2,1fr)!important;padding:0 24px!important}
  .stat-item{border-right:none!important;padding-left:0!important;padding:28px 0!important}
  .stat-item:nth-child(odd){border-right:1px solid rgba(255,255,255,.06)!important;padding-right:20px!important}
  .stat-item:nth-child(even){padding-left:20px!important}
  .stat-val{font-size:clamp(32px,9vw,48px)!important}

  /* Services */
  .grid-services{grid-template-columns:1fr!important}
  .service-card{padding:32px 28px!important}

  /* Portfolio */
  .grid-projects{grid-template-columns:1fr!important}
  .proj-img{height:240px!important}

  /* Pricing */
  .grid-pricing{grid-template-columns:1fr!important}
  .price-card{padding:36px 28px!important}

  /* Testimonials */
  .testimonial-card{padding:32px 24px!important;border-radius:20px!important}
  .testimonial-quote-mark{font-size:72px!important;top:12px!important;right:16px!important}
  .testimonial-body{min-height:260px!important}

  /* About */
  .grid-about{grid-template-columns:1fr!important;gap:48px!important}

  /* Contact */
  .contact-box{padding:36px 24px!important;border-radius:24px!important}
  .grid-contact{grid-template-columns:1fr!important;gap:36px!important}
  .grid-contact-inputs{grid-template-columns:1fr!important}

  /* Footer */
  .site-footer{padding:48px 24px 36px!important}
  .footer-cols{gap:36px!important;flex-direction:column!important}
  .footer-nav{gap:48px!important}

  /* Modal */
  .modal-overlay{padding:12px!important}
  .modal-img{height:220px!important}
  .modal-content{padding:0 24px 24px!important;margin-top:-40px!important}
  .modal-title{font-size:24px!important}
  .modal-btns{flex-direction:column!important}
  .modal-btns .btn-white,.modal-btns .btn-outline{width:100%!important;text-align:center!important}

  /* Marquee sizing */
  .marq-lg span{font-size:32px!important;padding:0 20px!important}
}

@media (max-width: 480px) {
  .hero-headline{font-size:clamp(36px,11vw,48px)!important}
  .stat-val{font-size:clamp(26px,8vw,38px)!important}
  .testimonial-body{min-height:300px!important}
  .mobile-nav-link{font-size:28px}
}
`;

/* ─────────────────────────────────────────────────────────
   CURSOR
───────────────────────────────────────────────────────── */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const smooth = useRef({ x: -200, y: -200 });
  const hover = useRef(false);

  useEffect(() => {
    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onOver = e => { hover.current = !!e.target.closest("[data-h]"); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    let raf;
    const loop = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.11;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.11;
      if (dot.current) {
        dot.current.style.left = pos.current.x + "px";
        dot.current.style.top = pos.current.y + "px";
        dot.current.style.width = hover.current ? "52px" : "8px";
        dot.current.style.height = hover.current ? "52px" : "8px";
        dot.current.style.background = hover.current ? "rgba(255,255,255,.1)" : "#fff";
        dot.current.style.border = hover.current ? "1.5px solid rgba(255,255,255,.4)" : "none";
      }
      if (ring.current) {
        ring.current.style.left = smooth.current.x + "px";
        ring.current.style.top = smooth.current.y + "px";
        ring.current.style.opacity = hover.current ? "0" : "0.4";
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseover", onOver); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-ring" style={{ width: 8, height: 8, background: "#fff", transition: "width .3s,height .3s,background .3s,border .3s" }} />
      <div ref={ring} className="cursor-ring" style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,.4)", transition: "opacity .25s" }} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   INTRO SPLASH
───────────────────────────────────────────────────────── */
function Intro({ onDone }) {
  const [logoVis, setLogoVis] = useState(false);
  const [tagVis, setTagVis] = useState(false);
  const [prog, setProg] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    setTimeout(() => setLogoVis(true), 250);
    setTimeout(() => setTagVis(true), 700);
    let start, raf;
    const dur = 2000;
    const tick = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setProg(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => { setExit(true); setTimeout(onDone, 900); }, 250);
    };
    setTimeout(() => { raf = requestAnimationFrame(tick); }, 500);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "#080808", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", pointerEvents: exit ? "none" : "all" }}>
      {/* Grain */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity: 0.04, pointerEvents: "none" }} />
      {/* Ambient blob */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,.09) 0%, rgba(59,130,246,.06) 50%, transparent 70%)", animation: "morphBlob 8s ease-in-out infinite", opacity: logoVis ? 1 : 0, transition: "opacity 1s", pointerEvents: "none" }} />
      {/* Spin ring */}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 220, height: 220, animation: "introSpin 14s linear infinite", opacity: logoVis ? 0.3 : 0, transition: "opacity 1s .3s", pointerEvents: "none" }}>
        <svg viewBox="0 0 220 220" width="220" height="220"><circle cx="110" cy="110" r="100" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1" strokeDasharray="5 12" /></svg>
      </div>

      {/* Curtains */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "#080808", zIndex: 2, transform: exit ? "translateY(-100%)" : "none", transition: exit ? "transform .85s cubic-bezier(.76,0,.24,1)" : "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "#080808", zIndex: 2, transform: exit ? "translateY(100%)" : "none", transition: exit ? "transform .85s cubic-bezier(.76,0,.24,1)" : "none" }} />

      {/* Logo block */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, position: "relative", zIndex: 1, opacity: exit ? 0 : 1, transform: exit ? "scale(.94)" : "scale(1)", transition: exit ? "opacity .4s, transform .4s" : "none" }}>
        {/* Icon */}
        <div style={{ width: 80, height: 80, borderRadius: 24, background: "linear-gradient(135deg,rgba(139,92,246,.3),rgba(59,130,246,.2))", border: "1px solid rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 8, animation: logoVis ? "fadeLogoIn .8s cubic-bezier(.16,1,.3,1) both" : "none", boxShadow: "0 0 60px rgba(139,92,246,.2)" }}>✦</div>
        {/* Wordmark */}
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(56px,8vw,100px)", letterSpacing: "-.04em", lineHeight: 1, color: "#fff", textAlign: "center", animation: logoVis ? "fadeLogoIn .9s cubic-bezier(.16,1,.3,1) .1s both" : "none" }}>Adefiy</div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 400, fontSize: "clamp(56px,8vw,100px)", letterSpacing: "-.04em", lineHeight: 1, color: "rgba(255,255,255,.2)", fontStyle: "italic", textAlign: "center", animation: logoVis ? "fadeLogoIn .9s cubic-bezier(.16,1,.3,1) .18s both" : "none" }}>Labs</div>
        {/* Tagline */}
        <div style={{ overflow: "hidden", marginTop: 6 }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", transform: tagVis ? "translateY(0)" : "translateY(120%)", transition: "transform .7s cubic-bezier(.16,1,.3,1)", textAlign: "center" }}>We Build Websites That Win</p>
        </div>
      </div>

      {/* Progress */}
      <div style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)", width: 180, zIndex: 3, opacity: exit ? 0 : logoVis ? 1 : 0, transition: "opacity .4s" }}>
        <div style={{ height: 2, background: "rgba(255,255,255,.08)", borderRadius: 2 }}>
          <div style={{ height: "100%", width: `${prog * 100}%`, background: "linear-gradient(90deg,rgba(139,92,246,.8),rgba(255,255,255,.9))", borderRadius: 2, transition: "width .05s linear", boxShadow: "0 0 10px rgba(139,92,246,.6)" }} />
        </div>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".2em", color: "rgba(255,255,255,.2)", textAlign: "center", marginTop: 10 }}>{Math.round(prog * 100)}%</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, dir = "up", style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVis(true);
      return;
    }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const t = { up: "translateY(56px)", left: "translateX(-48px)", right: "translateX(48px)", scale: "scale(0.88)", down: "translateY(-40px)" };
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : t[dir], transition: `opacity 1s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1s cubic-bezier(.16,1,.3,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   WORD REVEAL
───────────────────────────────────────────────────────── */
function Words({ text, delay = 0, style = {}, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVis(true);
      return;
    }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={style}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
          <span style={{ display: "inline-block", transform: vis ? "none" : "translateY(110%) rotate(4deg)", opacity: vis ? 1 : 0, transition: `transform .95s cubic-bezier(.16,1,.3,1) ${delay + i * 0.07}s, opacity .6s ease ${delay + i * 0.07}s` }}>{w}</span>
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   3D TILT
───────────────────────────────────────────────────────── */
function Tilt({ children, style = {}, strength = 10 }) {
  const r = useRef(null);
  const move = e => {
    const b = r.current.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;
    r.current.style.transform = `perspective(800px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) scale(1.02)`;
    r.current.style.boxShadow = `${-x * 28}px ${-y * 28}px 60px rgba(0,0,0,.45)`;
  };
  const leave = () => { r.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)"; r.current.style.boxShadow = "none"; };
  return <div ref={r} onMouseMove={move} onMouseLeave={leave} style={{ transition: "transform .6s cubic-bezier(.16,1,.3,1),box-shadow .6s", willChange: "transform", ...style }}>{children}</div>;
}

/* ─────────────────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────────────────── */
function Marquee({ items, reverse, speed = 35, size = "sm" }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ display: "flex", animation: `${reverse ? "marqR" : "marqL"} ${speed}s linear infinite`, whiteSpace: "nowrap" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 0, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: size === "lg" ? 48 : 13, letterSpacing: size === "lg" ? "-.02em" : ".1em", textTransform: size === "lg" ? "none" : "uppercase", color: "rgba(255,255,255,.6)", padding: size === "lg" ? "0 32px" : "0 24px", borderRight: "1px solid rgba(255,255,255,.08)" }}>
            {size !== "lg" && <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,.3)", display: "inline-block", marginRight: 20 }} />}
            {item}
            {size === "lg" && <span style={{ color: "rgba(255,255,255,.15)", marginLeft: 28, fontSize: 32 }}>✦</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   COUNTER
───────────────────────────────────────────────────────── */
function Counter({ raw, trigger }) {
  const [n, setN] = useState(0);
  const num = parseInt(raw);
  useEffect(() => {
    if (!trigger || isNaN(num)) return;
    let c = 0; const id = setInterval(() => { c += Math.ceil(num / 55); if (c >= num) { setN(num); clearInterval(id); } else setN(c); }, 16);
    return () => clearInterval(id);
  }, [trigger]);
  return <span>{isNaN(num) ? raw : n + raw.replace(/[0-9]/g, "")}</span>;
}

/* ─────────────────────────────────────────────────────────
   FLOATING BADGE
───────────────────────────────────────────────────────── */
function Badge({ children, style = {}, anim = "floatA" }) {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, borderRadius: 16, padding: "14px 22px", boxShadow: "0 20px 60px rgba(0,0,0,.4)", animation: `${anim} 5s ease-in-out infinite`, backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,.1)", ...style }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const SERVICES = [
  { id: "01", emoji: "🎨", title: "Web Design", sub: "Interfaces that sell", desc: "Pixel-perfect UIs engineered for conversion. Every micro-interaction purposeful.", tags: ["UI/UX", "Figma", "Systems"], bg: "linear-gradient(135deg,#1e0a3c,#2d1458)", accent: "#a855f7" },
  { id: "02", emoji: "⚡", title: "Development", sub: "Code that performs", desc: "React, Next.js, Node. Clean architecture, delivered on time, every time.", tags: ["React", "Next.js", "Node"], bg: "linear-gradient(135deg,#0a1e3c,#0d2d5a)", accent: "#3b82f6" },
  { id: "03", emoji: "🛒", title: "E-Commerce", sub: "Stores that convert", desc: "Revenue-optimized storefronts. Every step of the funnel refined for sales.", tags: ["Shopify", "Custom", "WooCommerce"], bg: "linear-gradient(135deg,#0a2e1e,#0d4530)", accent: "#10b981" },
  { id: "04", emoji: "🚀", title: "Performance", sub: "Speed as strategy", desc: "Sub-second loads, perfect Core Web Vitals. Speed is your competitive edge.", tags: ["Core Web Vitals", "SEO", "Analytics"], bg: "linear-gradient(135deg,#2e1a0a,#4a2c0d)", accent: "#f59e0b" },
];

const PROJECTS = [
  { title: "Luminary Finance", cat: "Web App", year: "2024", bg: "#0d2818", accent: "#4ade80", initials: "LF", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=90",
    desc: "A comprehensive financial web app featuring real-time portfolio tracking, interactive charts, and AI-powered investment insights. Built with React and Node.js.",
    tech: ["React", "Node.js", "D3.js", "PostgreSQL"] },
  { title: "Verd Studio", cat: "Portfolio", year: "2024", bg: "#1a1208", accent: "#fbbf24", initials: "VS", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    preview: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1400&q=90",
    desc: "A stunning portfolio site for a creative design studio with immersive scroll animations, 3D project showcases, and a custom CMS for easy content updates.",
    tech: ["Next.js", "Three.js", "Framer Motion", "Sanity CMS"] },
  { title: "Nova Commerce", cat: "E-Commerce", year: "2023", bg: "#0d1228", accent: "#60a5fa", initials: "NC", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    preview: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=90",
    desc: "A high-converting e-commerce platform with smart product recommendations, one-click checkout, and real-time inventory management across multiple warehouses.",
    tech: ["Shopify Plus", "React", "Stripe", "Algolia"] },
  { title: "Meridian SaaS", cat: "Dashboard", year: "2023", bg: "#1a0d28", accent: "#c084fc", initials: "MS", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=90",
    desc: "An enterprise SaaS dashboard with real-time analytics, team collaboration tools, customizable widgets, and automated reporting for data-driven decisions.",
    tech: ["React", "TypeScript", "GraphQL", "AWS"] },
];

const STATS = [["50+", "Projects Shipped"], ["98%", "Happy Clients"], ["<1s", "Avg Load Time"], ["8", "Countries Served"]];

const PRICING = [
  { plan: "Starter Kit", desc: "Everything you need to get online.", features: ["5-page site", "Mobile responsive", "Basic SEO", "Contact form", "2 revision rounds"], accent: "#a855f7", hot: false },
  { plan: "Growth Engine", desc: "Scale your digital presence.", features: ["Up to 15 pages", "Custom animations", "CMS integration", "Performance optimization", "Analytics setup", "3-month support"], accent: "#3b82f6", hot: true },
  { plan: "Elite Partnership", desc: "Full-service digital transformation.", features: ["Unlimited pages", "Design system", "Custom integrations", "Dedicated developer", "Priority support", "Strategy sessions", "Ongoing optimization"], accent: "#10b981", hot: false },
];

const TESTIMONIALS = [
  { q: "Adefiy didn't just build us a website — they built a sales machine. Inquiries tripled in month one.", name: "Sarah M.", role: "CEO, Luminary Finance", color: "#4ade80" },
  { q: "The attention to detail is unlike anything I've seen. They anticipated every problem before it happened.", name: "James K.", role: "Founder, Verd Studio", color: "#fbbf24" },
  { q: "Professional, fast, genuinely invested in our success. Our site loads in under a second. Incredible.", name: "Priya R.", role: "Director, Nova Commerce", color: "#60a5fa" },
];

/* ─────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────── */
function AdefiyLabs() {
  const [intro, setIntro] = useState(true);
  const [heroOn, setHeroOn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTest, setActiveTest] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", project: "", budget: "" });
  const [sent, setSent] = useState(false);
  const [previewProject, setPreviewProject] = useState(null);
  const [statsRef, statsVis] = [useRef(null), useRef(false)];
  const [statsVisible, setStatsVisible] = useState(false);
  const orbRef = useRef(null);
  const testimonialsGlowRef = useRef(null);

  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }); if (statsRef.current) o.observe(statsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { if (!intro) setTimeout(() => setHeroOn(true), 150); }, [intro]);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { const t = setInterval(() => setActiveTest(p => (p + 1) % TESTIMONIALS.length), 5000); return () => clearInterval(t); }, []);
  useEffect(() => { const fn = e => { if (e.key === "Escape") { setPreviewProject(null); setMenuOpen(false); } }; window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, []);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  useEffect(() => {
    const fn = e => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 70;
      const y = (e.clientY / window.innerHeight - 0.5) * 70;
      orbRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (testimonialsGlowRef.current) {
        testimonialsGlowRef.current.style.transform = `translate(-50%, calc(-50% + ${y * 0.04}px))`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", background: "#080808", color: "#fff", overflowX: "hidden", cursor: "none", maxWidth: "100vw" }}>
      <style>{CSS}</style>

      {intro && <Intro onDone={() => setIntro(false)} />}
      <Cursor />

      {/* ══ PROJECT PREVIEW MODAL ══ */}
      {previewProject && (
        <div className="modal-overlay" onClick={() => setPreviewProject(null)} style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,.85)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "none", padding: 40, animation: "slideInUp .5s cubic-bezier(.16,1,.3,1)" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#111", borderRadius: 28, overflow: "hidden", maxWidth: 960, width: "100%", maxHeight: "90vh", overflowY: "auto", border: "1px solid rgba(255,255,255,.1)", position: "relative" }}>
            {/* Close button */}
            <button data-h onClick={() => setPreviewProject(null)} style={{ position: "absolute", top: 20, right: 20, zIndex: 2, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", cursor: "none", transition: "background .2s" }} onMouseEnter={e => e.target.style.background = "rgba(255,255,255,.2)"} onMouseLeave={e => e.target.style.background = "rgba(255,255,255,.1)"}>✕</button>
            {/* Preview image */}
            <div className="modal-img" style={{ position: "relative", width: "100%", height: 440, overflow: "hidden" }}>
              <img src={previewProject.preview} alt={previewProject.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, #111 0%, transparent 50%)` }} />
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 60%, ${previewProject.accent}15, transparent 65%)` }} />
            </div>
            {/* Content */}
            <div className="modal-content" style={{ padding: "0 48px 48px", marginTop: -60, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: previewProject.accent, background: `${previewProject.accent}20`, padding: "5px 14px", borderRadius: 20 }}>{previewProject.cat}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.3)", fontWeight: 600 }}>{previewProject.year}</span>
              </div>
              <h2 className="modal-title" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 36, letterSpacing: "-.03em", marginBottom: 16 }}>{previewProject.title}</h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,.5)", lineHeight: 1.8, fontWeight: 300, marginBottom: 32, maxWidth: 640 }}>{previewProject.desc}</p>
              <div style={{ marginBottom: 36 }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.25)", marginBottom: 14 }}>Tech Stack</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {previewProject.tech.map(t => (
                    <span key={t} style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".04em", padding: "8px 18px", borderRadius: 50, background: `${previewProject.accent}12`, color: previewProject.accent, border: `1px solid ${previewProject.accent}25` }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="modal-btns" style={{ display: "flex", gap: 14 }}>
                <button className="btn-white" data-h onClick={() => { setPreviewProject(null); go("contact"); }} style={{ fontSize: 13, padding: "13px 28px" }}>Start Similar Project →</button>
                <button className="btn-outline" data-h onClick={() => setPreviewProject(null)} style={{ fontSize: 13, padding: "12px 28px" }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed grid */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)", backgroundSize: "72px 72px", opacity: 0.8 }} />

      {/* ══ NAV ══════════════════════════════════════════════ */}
      <nav className="nav-bar" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 68, padding: "0 52px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled || menuOpen ? "rgba(8,8,8,.95)" : "transparent", backdropFilter: scrolled || menuOpen ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "1px solid transparent", transition: "all .5s cubic-bezier(.16,1,.3,1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-.02em", position: "relative", zIndex: 1001 }}>
          <span className="dot-pulse" />
          Adefiy<span style={{ color: "rgba(255,255,255,.25)", fontWeight: 400 }}> Labs</span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Services", "Work", "Pricing", "About"].map(l => (
            <button key={l} className="nav-link" data-h onClick={() => go(l.toLowerCase())}>{l}</button>
          ))}
        </div>
        <button className="btn-white nav-cta" style={{ padding: "11px 26px", fontSize: 13 }} data-h onClick={() => go("contact")}>Start Project →</button>
        <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{ position: "relative", zIndex: 1001 }}>
          <span /><span /><span />
        </button>
      </nav>

      {/* ══ MOBILE NAV OVERLAY ════════════════════════════════ */}
      <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          {["Services", "Work", "Pricing", "About", "Contact"].map((l, i) => (
            <button key={l} className="mobile-nav-link" style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? "none" : "translateY(20px)", transition: `opacity .4s ${.1 + i * .06}s, transform .5s cubic-bezier(.16,1,.3,1) ${.1 + i * .06}s` }} onClick={() => { setMenuOpen(false); go(l.toLowerCase()); }}>{l}</button>
          ))}
        </div>
        <button className="btn-white" style={{ marginTop: 40, padding: "16px 44px", fontSize: 15, opacity: menuOpen ? 1 : 0, transform: menuOpen ? "none" : "translateY(16px)", transition: "opacity .4s .45s, transform .5s cubic-bezier(.16,1,.3,1) .45s" }} onClick={() => { setMenuOpen(false); go("contact"); }}>Start Project →</button>
        {/* Decorative gradient */}
        <div style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,.08),rgba(59,130,246,.05),transparent 70%)", pointerEvents: "none" }} />
      </div>

      {/* ══ HERO ═════════════════════════════════════════════ */}
      <section className="s-hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 52px 80px", position: "relative", overflow: "hidden" }}>
        {/* Gradient orb */}
        <div ref={orbRef} style={{ position: "absolute", left: "58%", top: "42%", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,.11) 0%,rgba(59,130,246,.07) 45%,transparent 70%)", filter: "blur(30px)", pointerEvents: "none", transition: "transform .9s cubic-bezier(.16,1,.3,1)", zIndex: 0 }} />
        {/* Morph accent */}
        <div style={{ position: "absolute", right: "-5%", bottom: "5%", width: 340, height: 340, background: "radial-gradient(circle,rgba(16,185,129,.08),transparent 70%)", animation: "morphBlob 9s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />

        {/* Floating badges */}
        <div className="hero-badges" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
          <Badge style={{ position: "absolute", top: "22%", right: "6%", background: "rgba(139,92,246,.15)", color: "#c4b5fd", fontSize: 13, animationDelay: "0s" }} anim="floatA">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>✦ Design Systems</div>
          </Badge>
          <Badge style={{ position: "absolute", bottom: "25%", right: "12%", background: "rgba(16,185,129,.12)", color: "#6ee7b7", fontSize: 13, animationDelay: "1.2s" }} anim="floatB">
            ⚡ 50+ Projects
          </Badge>
          <Badge style={{ position: "absolute", top: "55%", left: "3%", background: "rgba(59,130,246,.12)", color: "#93c5fd", fontSize: 12, animationDelay: ".6s" }} anim="floatC">
            🚀 Sub-1s Load Time
          </Badge>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Eyebrow */}
          <div className="hero-eyebrow" style={{ opacity: heroOn ? 1 : 0, transform: heroOn ? "none" : "translateY(16px)", transition: "all .7s .1s", marginBottom: 36 }}>
            <span className="eyebrow" style={{ color: "rgba(255,255,255,.35)" }}>
              <span style={{ width: 24, height: 1.5, background: "rgba(255,255,255,.2)", display: "block" }} />
              Web Development Agency
            </span>
          </div>

          {/* Giant headline */}
          {["We Build", "Websites", "That Win."].map((line, i) => (
            <div key={line} style={{ overflow: "hidden" }}>
              <div className="hero-headline" style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 800,
                fontSize: "clamp(60px,10vw,140px)", lineHeight: .9, letterSpacing: "-.04em",
                color: i === 1 ? "transparent" : "#fff",
                fontStyle: i === 1 ? "italic" : "normal",
                background: i === 1 ? "linear-gradient(90deg,#a855f7,#3b82f6,#10b981)" : "none",
                WebkitBackgroundClip: i === 1 ? "text" : "unset",
                backgroundClip: i === 1 ? "text" : "unset",
                backgroundSize: i === 1 ? "200% auto" : "unset",
                animation: i === 1 ? "gradMove 4s ease infinite" : "none",
                transform: heroOn ? "translateY(0)" : "translateY(115%)",
                transition: `transform 1.1s cubic-bezier(.16,1,.3,1) ${.2 + i * .14}s`,
              }}>{line}</div>
            </div>
          ))}

          {/* Divider line */}
          <div className="hero-divider" style={{ height: 2, background: "linear-gradient(90deg,rgba(139,92,246,.6),rgba(59,130,246,.4),transparent)", marginTop: 36, marginBottom: 36, transformOrigin: "left", transform: heroOn ? "scaleX(1)" : "scaleX(0)", transition: "transform .9s cubic-bezier(.16,1,.3,1) .8s", maxWidth: 240 }} />

          {/* Sub + CTAs */}
          <div className="hero-sub-row" style={{ opacity: heroOn ? 1 : 0, transform: heroOn ? "none" : "translateY(20px)", transition: "all .8s .7s", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 36 }}>
            <p className="hero-sub-text" style={{ fontSize: 17, color: "rgba(255,255,255,.45)", maxWidth: 420, lineHeight: 1.78, fontWeight: 300 }}>
              Adefiy Labs builds high-performance web experiences that attract visitors, build trust, and convert them into loyal customers.
            </p>
            <div className="hero-ctas" style={{ display: "flex", gap: 14 }}>
              <button className="btn-white" data-h onClick={() => go("contact")}>Get Free Proposal →</button>
              <button className="btn-outline" data-h onClick={() => go("work")}>View Our Work</button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll" style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: heroOn ? 1 : 0, transition: "opacity 1s 1.4s" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.2)" }}>Scroll</p>
          <div style={{ width: 1, height: 44, background: "linear-gradient(#fff,transparent)", opacity: .3, animation: "floatC 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════ */}
      <div ref={statsRef} style={{ borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div className="grid-stats" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", padding: "0 52px" }}>
          {STATS.map(([val, label], i) => (
            <div key={label} className="stat-item" style={{ padding: "44px 0", borderRight: i < 3 ? "1px solid rgba(255,255,255,.06)" : "none", paddingLeft: i > 0 ? 48 : 0 }}>
              <div className="stat-val" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(38px,4vw,60px)", letterSpacing: "-.04em", lineHeight: 1, marginBottom: 8 }}>
                <Counter raw={val} trigger={statsVisible} />
              </div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", color: "rgba(255,255,255,.3)", textTransform: "uppercase" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ MARQUEES ═════════════════════════════════════════ */}
      <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,.04)", overflow: "hidden" }}>
        <Marquee items={["Web Design", "Development", "E-Commerce", "Performance", "UI/UX", "React", "Next.js", "SEO", "Branding", "Motion"]} speed={36} />
      </div>
      {/* Big type marquee */}
      <div className="marq-lg" style={{ padding: "28px 0 0", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
        <Marquee items={["Adefiy Labs", "We Build", "Sites That Win", "Fast & Clean", "Since 2021"]} reverse speed={55} size="lg" />
      </div>
      <div style={{ padding: "0 0 20px", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
        <Marquee items={["React", "Next.js", "Node.js", "Framer", "Figma", "Shopify", "Tailwind", "TypeScript"]} speed={40} />
      </div>

      {/* ══ SERVICES ═════════════════════════════════════════ */}
      <section id="services" className="s-services" style={{ padding: "140px 52px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72, flexWrap: "wrap", gap: 24 }}>
            <div>
              <Reveal><span className="eyebrow" style={{ color: "rgba(255,255,255,.3)", marginBottom: 18, display: "flex" }}>What We Do</span></Reveal>
              <Words text="Services built" delay={0} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(40px,5vw,72px)", lineHeight: 1, letterSpacing: "-.03em" }} />
              <Words text="for results." delay={0.06} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(40px,5vw,72px)", lineHeight: 1, letterSpacing: "-.03em", color: "rgba(255,255,255,.2)", fontStyle: "italic" }} />
            </div>
            <Reveal delay={.2}><p style={{ fontSize: 15, color: "rgba(255,255,255,.35)", maxWidth: 320, lineHeight: 1.78, fontWeight: 300 }}>Full-stack agency that handles everything from concept to launch — and beyond.</p></Reveal>
          </div>

          <div className="grid-services" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * .12} dir="up">
                <Tilt strength={12}>
                  <div className="service-card" data-h style={{ background: s.bg }}>
                    {/* Glow accent */}
                    <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: s.accent, opacity: .12, filter: "blur(40px)", pointerEvents: "none" }} />
                    <div style={{ fontSize: 36, marginBottom: 20, animation: `wiggle 3s ease-in-out infinite ${i * .4}s`, display: "inline-block" }}>{s.emoji}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", color: s.accent, opacity: .7, marginBottom: 12, textTransform: "uppercase" }}>{s.id}</div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 6, letterSpacing: "-.02em" }}>{s.title}</h3>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: "rgba(255,255,255,.35)", textTransform: "uppercase", marginBottom: 16 }}>{s.sub}</p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.75, fontWeight: 300, marginBottom: 24 }}>{s.desc}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {s.tags.map(t => <span key={t} className="chip" style={{ background: `${s.accent}18`, color: s.accent, border: `1px solid ${s.accent}30` }}>{t}</span>)}
                    </div>
                    {/* Bottom shimmer line */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${s.accent},transparent)`, opacity: .4 }} />
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PORTFOLIO ════════════════════════════════════════ */}
      <section id="work" className="s-portfolio" style={{ padding: "0 52px 140px", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "72px 0 60px", flexWrap: "wrap", gap: 24 }}>
            <div>
              <Reveal><span className="eyebrow" style={{ color: "rgba(255,255,255,.3)", marginBottom: 18, display: "flex" }}>Portfolio</span></Reveal>
              <Words text="Selected work." delay={0} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(40px,5vw,72px)", lineHeight: 1, letterSpacing: "-.03em" }} />
            </div>
            <Reveal delay={.2}><span style={{ fontSize: 13, color: "rgba(255,255,255,.25)", fontWeight: 600, letterSpacing: ".06em" }}>2023 — 2024</span></Reveal>
          </div>

          <div className="grid-projects" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * .1} dir={i % 2 === 0 ? "left" : "right"}>
                <Tilt strength={7} style={{ borderRadius: 24 }}>
                  <div className="proj-card" data-h onClick={() => setPreviewProject(p)}>
                    <div className="proj-img" style={{ height: i < 2 ? 360 : 260, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                      {/* Project photo */}
                      <img src={p.img} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }} />
                      {/* Accent glow */}
                      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 60%, ${p.accent}20, transparent 65%)` }} />
                      {/* Shimmer */}
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,transparent 38%,rgba(255,255,255,.06) 50%,transparent 62%)", backgroundSize: "200% 100%", animation: "shimmer 3.5s infinite" }} />
                      {/* Accent dot */}
                      <div style={{ position: "absolute", top: 24, left: 24, width: 10, height: 10, borderRadius: "50%", background: p.accent, boxShadow: `0 0 24px ${p.accent}` }} />
                      {/* Year tag */}
                      <div style={{ position: "absolute", top: 24, right: 24, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", color: "rgba(255,255,255,.3)", background: "rgba(255,255,255,.06)", padding: "5px 12px", borderRadius: 20 }}>{p.year}</div>
                    </div>
                    <div className="proj-overlay">
                      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, background: "rgba(255,255,255,.9)", color: "#0a0a0a", padding: "12px 26px", borderRadius: 50, fontSize: 13, letterSpacing: ".04em" }}>View Project →</div>
                    </div>
                    <div style={{ padding: "22px 24px 26px", background: "rgba(255,255,255,.02)", borderTop: "1px solid rgba(255,255,255,.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: "-.01em", marginBottom: 4 }}>{p.title}</h3>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>{p.cat}</p>
                      </div>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${p.accent}22`, border: `1px solid ${p.accent}40`, display: "flex", alignItems: "center", justifyContent: "center", color: p.accent, fontSize: 16 }}>→</div>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══════════════════════════════════════════ */}
      <section id="pricing" className="s-pricing" style={{ padding: "140px 52px", background: "rgba(255,255,255,.015)", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <Reveal><span className="eyebrow" style={{ color: "rgba(255,255,255,.3)", justifyContent: "center", marginBottom: 20, display: "flex" }}>Packages</span></Reveal>
            <Words text="Choose your plan." delay={0} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(40px,5vw,72px)", lineHeight: 1, letterSpacing: "-.03em", justifyContent: "center" }} />
            <Reveal delay={.2}><p style={{ fontSize: 16, color: "rgba(255,255,255,.3)", marginTop: 24, fontWeight: 300 }}>Three tiers. One standard: exceptional work.</p></Reveal>
          </div>

          <div className="grid-pricing" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {PRICING.map((p, i) => (
              <Reveal key={p.plan} delay={i * .15} dir="up">
                <Tilt strength={8} style={{ borderRadius: 24, height: "100%" }}>
                  <div className={`price-card${p.hot ? " hot" : ""}`} data-h style={{ background: p.hot ? `linear-gradient(145deg,${p.accent}15,rgba(255,255,255,.02))` : "rgba(255,255,255,.02)" }}>
                    {p.hot && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${p.accent},transparent)` }} />}
                    {/* Glow */}
                    <div style={{ position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%", background: p.accent, opacity: .06, filter: "blur(50px)", pointerEvents: "none" }} />
                    <div style={{ position: "relative" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: 28, minHeight: 24 }}>
                        {p.hot && <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".08em", color: p.accent, background: `${p.accent}20`, padding: "4px 12px", borderRadius: 20 }}>★ Popular</span>}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 800,
                          fontSize: "clamp(28px,2.5vw,38px)",
                          letterSpacing: "-.03em",
                          marginBottom: 8,
                        }}
                      >
                        {p.plan}
                      </div>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,.3)", marginBottom: 32, lineHeight: 1.6 }}>{p.desc}</p>
                      <div style={{ height: 1, background: "rgba(255,255,255,.07)", marginBottom: 28 }} />
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                        {p.features.map(f => (
                          <li key={f} style={{ display: "flex", alignItems: "center", fontSize: 14, color: "rgba(255,255,255,.6)" }}>
                            <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${p.accent}20`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginRight: 12, fontSize: 9, color: p.accent, border: `1px solid ${p.accent}30`, flexShrink: 0 }}>✓</span>{f}
                          </li>
                        ))}
                      </ul>
                      <button data-h onClick={() => go("contact")} style={{ width: "100%", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, border: "none", borderRadius: 50, padding: "15px", cursor: "none", background: p.hot ? p.accent : "rgba(255,255,255,.08)", color: p.hot ? "#fff" : "rgba(255,255,255,.8)", transition: "transform .3s,opacity .3s" }}
                        onMouseEnter={e => e.target.style.opacity = ".85"}
                        onMouseLeave={e => e.target.style.opacity = "1"}>
                        Get Started →
                      </button>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════ */}
      <section className="s-testimonials" style={{ padding: "140px 52px", position: "relative", overflow: "hidden" }}>
        {/* BG glow */}
        <div ref={testimonialsGlowRef} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: `radial-gradient(ellipse, ${TESTIMONIALS[activeTest].color}08, transparent 65%)`, transition: "background 1s ease", pointerEvents: "none", borderRadius: "50%" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal><span className="eyebrow" style={{ color: "rgba(255,255,255,.3)", marginBottom: 56, display: "flex", justifyContent: "center" }}>Client Stories</span></Reveal>

          {/* Testimonial card */}
          <div className="testimonial-card" style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 28, padding: "64px 72px", position: "relative", overflow: "hidden" }}>
            <div className="testimonial-quote-mark" style={{ position: "absolute", top: 32, right: 44, fontFamily: "Georgia,serif", fontSize: 120, color: `${TESTIMONIALS[activeTest].color}15`, lineHeight: 1, transition: "color 1s", userSelect: "none", pointerEvents: "none" }}>"</div>
            <div className="testimonial-body" style={{ position: "relative", minHeight: 220 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ position: "absolute", inset: 0, opacity: activeTest === i ? 1 : 0, transform: activeTest === i ? "none" : "translateY(24px)", transition: "all .9s cubic-bezier(.16,1,.3,1)", pointerEvents: activeTest === i ? "auto" : "none" }}>
                  <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(20px,3vw,34px)", lineHeight: 1.35, letterSpacing: "-.02em", color: "#fff", marginBottom: 48, fontStyle: "italic" }}>"{t.q}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg,${t.color}60,${t.color}20)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, boxShadow: `0 0 28px ${t.color}40` }}>{t.name.split(" ").map(w => w[0]).join("")}</div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 700 }}>{t.name}</p>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Dots */}
            <Reveal delay={.2}>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActiveTest(i)} data-h style={{ width: activeTest === i ? 32 : 8, height: 8, borderRadius: 4, background: activeTest === i ? "#fff" : "rgba(255,255,255,.15)", border: "none", cursor: "none", transition: "all .4s cubic-bezier(.16,1,.3,1)" }} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════════ */}
      <section id="about" className="s-about" style={{ padding: "0 52px 140px" }}>
        <div className="grid-about" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }}>
          <div>
            <Reveal><span className="eyebrow" style={{ color: "rgba(255,255,255,.3)", marginBottom: 22, display: "flex" }}>About Us</span></Reveal>
            <Words text="A studio obsessed" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(34px,3.8vw,54px)", lineHeight: 1.05, letterSpacing: "-.03em" }} />
            <Words text="with quality." delay={.06} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(34px,3.8vw,54px)", lineHeight: 1.05, letterSpacing: "-.03em", color: "rgba(255,255,255,.2)", fontStyle: "italic" }} />
            <Reveal delay={.2}>
              <p style={{ fontSize: 15.5, color: "rgba(255,255,255,.4)", lineHeight: 1.82, fontWeight: 300, marginTop: 32, marginBottom: 18 }}>Adefiy Labs is a modern web development agency focused on building digital products that drive real business outcomes.</p>
              <p style={{ fontSize: 15.5, color: "rgba(255,255,255,.4)", lineHeight: 1.82, fontWeight: 300, marginBottom: 44 }}>From startups launching their first product to established brands ready for a digital transformation — we've helped businesses across 8 countries build a presence they're proud of.</p>
              <button className="btn-white" data-h onClick={() => go("contact")}>Work With Us →</button>
            </Reveal>
          </div>

          <Reveal dir="right" delay={.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["2021", "Founded", "#a855f7", 0], ["40+", "Clients", "#3b82f6", 1], ["8", "Countries", "#10b981", 2], ["5.0★", "Rating", "#f59e0b", 3]].map(([v, l, c, idx]) => (
                <Tilt key={l} strength={14}>
                  <div data-h style={{ background: `linear-gradient(145deg,${c}18,${c}08)`, border: `1px solid ${c}25`, borderRadius: 20, padding: "36px 28px", textAlign: "center", animation: `floatA ${4 + idx * .7}s ${idx * .5}s ease-in-out infinite`, cursor: "none" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 42, letterSpacing: "-.04em", marginBottom: 8, color: "#fff" }}>{v}</div>
                    <p style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: c, opacity: .8, fontWeight: 700 }}>{l}</p>
                  </div>
                </Tilt>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════════ */}
      <section id="contact" className="s-contact" style={{ padding: "0 52px 140px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="contact-box" style={{ borderRadius: 32, background: "linear-gradient(135deg,rgba(139,92,246,.08),rgba(59,130,246,.05),rgba(16,185,129,.04))", border: "1px solid rgba(255,255,255,.08)", padding: "80px", position: "relative", overflow: "hidden", animation: "glowPop 4s ease-in-out infinite" }}>
            {/* Corner blobs */}
            <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,.1),transparent)", filter: "blur(40px)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,rgba(16,185,129,.08),transparent)", filter: "blur(40px)", pointerEvents: "none" }} />

            <div className="grid-contact" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", position: "relative" }}>
              <div>
                <Reveal><span className="eyebrow" style={{ color: "rgba(255,255,255,.3)", marginBottom: 22, display: "flex" }}>Let's Work Together</span></Reveal>
                <Words text="Start your" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,62px)", lineHeight: 1, letterSpacing: "-.03em" }} />
                <Words text="project." delay={.06} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(36px,4vw,62px)", lineHeight: 1, letterSpacing: "-.03em", color: "rgba(255,255,255,.2)", fontStyle: "italic" }} />
                <Reveal delay={.2}>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,.35)", marginTop: 28, lineHeight: 1.78, fontWeight: 300, marginBottom: 40 }}>Tell us about your project and we'll get back to you within 24 hours with a tailored proposal.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[["✦", "Free consultation"], ["⚡", "24hr response"], ["◎", "No commitment"]].map(([icon, label]) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "rgba(255,255,255,.45)", fontWeight: 500 }}>
                        <span style={{ fontSize: 16, color: "rgba(255,255,255,.2)" }}>{icon}</span>{label}
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {sent ? (
                <Reveal>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", minHeight: 360 }}>
                    <div style={{ fontSize: 64, marginBottom: 24, animation: "bounce 2s ease-in-out infinite" }}>✦</div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 30, marginBottom: 14 }}>Message received!</h3>
                    <p style={{ color: "rgba(255,255,255,.35)", fontWeight: 300 }}>We'll be in touch within 24 hours.</p>
                  </div>
                </Reveal>
              ) : (
                <Reveal delay={.15}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div className="grid-contact-inputs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      {[["Your Name", "name", "text", "Alex Johnson"], ["Email", "email", "email", "alex@company.com"]].map(([l, k, t, ph]) => (
                        <div key={k}>
                          <label style={{ display: "block", fontSize: 10.5, fontWeight: 800, letterSpacing: ".14em", color: "rgba(255,255,255,.25)", textTransform: "uppercase", marginBottom: 10 }}>{l}</label>
                          <input className="inp" type={t} placeholder={ph} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 10.5, fontWeight: 800, letterSpacing: ".14em", color: "rgba(255,255,255,.25)", textTransform: "uppercase", marginBottom: 10 }}>Project Details</label>
                      <textarea className="inp" rows={4} placeholder="Tell us about your project, goals and timeline..." style={{ resize: "vertical" }} value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 10.5, fontWeight: 800, letterSpacing: ".14em", color: "rgba(255,255,255,.25)", textTransform: "uppercase", marginBottom: 10 }}>Budget Range</label>
                      <select className="inp" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} style={{ appearance: "none", cursor: "none" }}>
                        <option value="">Select a range</option>
                        <option>Under $1,500</option>
                        <option>$1,500 – $5,000</option>
                        <option>$5,000 – $15,000</option>
                        <option>$15,000+</option>
                      </select>
                    </div>
                    <button className="btn-white" style={{ alignSelf: "flex-start", marginTop: 8 }} data-h onClick={() => { if (form.name && form.email) setSent(true); }}>Send Message →</button>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════ */}
      <footer className="site-footer" style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "64px 52px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-cols" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 60 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-.02em", marginBottom: 16 }}>
                <span className="dot-pulse" /> Adefiy<span style={{ color: "rgba(255,255,255,.2)", fontWeight: 400 }}> Labs</span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.3)", maxWidth: 270, lineHeight: 1.8, fontWeight: 300 }}>Building digital experiences that matter, for businesses that mean it.</p>
            </div>
            <div className="footer-nav" style={{ display: "flex", gap: 72 }}>
              {[["Navigate", ["Services", "Work", "Pricing", "About", "Contact"]], ["Connect", ["hello@adefiy.com", "Instagram", "LinkedIn", "Twitter"]]].map(([title, items]) => (
                <div key={title}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.18)", marginBottom: 22 }}>{title}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {items.map(item => (
                      <span key={item} data-h onClick={() => go(item.toLowerCase())} style={{ fontSize: 13, color: "rgba(255,255,255,.35)", cursor: "none", transition: "color .22s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.35)"}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: 28, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.2)" }}>© 2025 Adefiy Labs. All rights reserved.</p>
            <p style={{ fontSize: 12, fontWeight: 700, background: "linear-gradient(90deg,rgba(139,92,246,.8),rgba(59,130,246,.8),rgba(16,185,129,.8))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundSize: "200% auto", animation: "gradMove 3s ease infinite" }}>Crafted with obsession ✦</p>
          </div>
        </div>
      </footer>
    </div>
  );
}