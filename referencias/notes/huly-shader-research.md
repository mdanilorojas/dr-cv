# Huly.io Shader Effects — Implementation Research

**Date:** 2026-05-08
**Scope:** Four signature visual effects from huly.io adapted for a dark-dominant personal landing with orange `#FF8964` accent. Target: vanilla CSS + minimal JS, no framework, no WebGL, ≤ 8 KB JS gzipped total.

---

## 1. Vertical Light-Beam Hero with Ascending Particles

**Technique chosen:** Single `<canvas>` 2D particle system for particles + layered CSS `radial-gradient` / `linear-gradient` pseudo-elements for the beam core and bloom. Canvas handles 30–60 rising dust motes at ~60fps with negligible cost; CSS gives the crisp cone-of-light without per-frame paint.

**Why not pure CSS:** You can fake particles with dozens of `@keyframes` delays, but 40+ DOM nodes animating `translateY` + `opacity` thrash the compositor and are painful to randomize. Canvas is ~1.5 KB of JS and avoids layout entirely.

**Why not SVG `<feTurbulence>`:** Looks gaseous/noisy, not particulate. Heavy on Safari.

```html
<div class="beam-hero">
  <canvas class="beam-particles"></canvas>
</div>
<style>
.beam-hero{
  position:relative;width:100%;height:520px;overflow:hidden;
  background:radial-gradient(ellipse 60% 80% at 50% 100%, #0b1220 0%, #05070d 70%);
}
.beam-hero::before,.beam-hero::after{
  content:"";position:absolute;left:50%;bottom:0;transform:translateX(-50%);
  pointer-events:none;
}
/* Core beam: narrow, bright, slight blur */
.beam-hero::before{
  width:90px;height:100%;
  background:linear-gradient(to top,
    rgba(200,225,255,.55) 0%,
    rgba(160,200,255,.25) 35%,
    rgba(120,170,255,.05) 70%,
    transparent 100%);
  filter:blur(6px);
  mix-blend-mode:screen;
}
/* Bloom halo */
.beam-hero::after{
  width:420px;height:90%;
  background:radial-gradient(ellipse 40% 60% at 50% 100%,
    rgba(255,200,170,.18) 0%,
    rgba(140,180,255,.10) 35%,
    transparent 70%);
  filter:blur(30px);
  mix-blend-mode:screen;
}
.beam-particles{position:absolute;inset:0;width:100%;height:100%;}
@media (prefers-reduced-motion:reduce){.beam-particles{display:none}}
</style>
<script>
(()=>{
  const c=document.querySelector('.beam-particles');
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const ctx=c.getContext('2d');let W,H,parts=[];
  const resize=()=>{W=c.width=c.offsetWidth*devicePixelRatio;H=c.height=c.offsetHeight*devicePixelRatio;};
  resize();addEventListener('resize',resize);
  const spawn=()=>({
    x:W/2+(Math.random()-.5)*90*devicePixelRatio,
    y:H+Math.random()*40,
    vy:-(0.3+Math.random()*0.9)*devicePixelRatio,
    r:(0.4+Math.random()*1.4)*devicePixelRatio,
    life:0,max:200+Math.random()*300
  });
  for(let i=0;i<45;i++){const p=spawn();p.y=Math.random()*H;parts.push(p);}
  const tick=()=>{
    ctx.clearRect(0,0,W,H);
    for(const p of parts){
      p.y+=p.vy;p.life++;
      p.x+=Math.sin(p.life*0.02)*0.2*devicePixelRatio;
      const a=Math.min(1,p.life/40)*Math.max(0,1-p.life/p.max);
      ctx.fillStyle=`rgba(220,230,255,${a*0.8})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill();
      if(p.life>p.max||p.y<0)Object.assign(p,spawn());
    }
    requestAnimationFrame(tick);
  };tick();
})();
</script>
```

**Accessibility:** `prefers-reduced-motion` hides the canvas entirely; the static CSS beam remains as a tasteful still image.
**Gotchas:** Always set `canvas.width = offsetWidth * devicePixelRatio` or it looks blurry on HiDPI. `mix-blend-mode:screen` requires a dark background to read as light. Do not stack more than 2 `filter:blur()` layers — Safari paints these on CPU.

---

## 2. Iridescent Chromatic Ring / Prismatic Aura

**Technique chosen (live CSS):** `conic-gradient` for the hue wheel + `radial-gradient` mask for the ring band + `filter: blur()` for the chromatic bleed. One element, no JS.

**Recommendation:** Use live CSS. Static SVG matches quality but costs ~4–8 KB per icon and can't respond to theme changes.

```html
<div class="aura"><span class="aura__icon">🔔</span></div>
<style>
@property --a{syntax:"<angle>";inherits:false;initial-value:0deg;}
.aura{
  --size:160px;
  position:relative;width:var(--size);height:var(--size);
  display:grid;place-items:center;isolation:isolate;
}
.aura::before,.aura::after{
  content:"";position:absolute;inset:-20%;border-radius:50%;
  background:conic-gradient(from var(--a),
    #FF8964, #ff5eae, #a855f7, #3b82f6, #22d3ee, #FF8964);
  -webkit-mask:radial-gradient(circle,transparent 38%,#000 44%,#000 58%,transparent 66%);
          mask:radial-gradient(circle,transparent 38%,#000 44%,#000 58%,transparent 66%);
  animation:aura-spin 14s linear infinite;
}
.aura::before{filter:blur(6px);opacity:.95;}
.aura::after{filter:blur(22px);opacity:.6;}
.aura__icon{
  position:relative;z-index:1;width:56%;height:56%;border-radius:50%;
  background:radial-gradient(circle at 30% 25%,#1a1f2e,#07090f);
  box-shadow:0 0 0 1px rgba(255,255,255,.06),0 10px 40px rgba(0,0,0,.6);
  display:grid;place-items:center;font-size:2rem;
}
@keyframes aura-spin{to{--a:360deg;}}
@media (prefers-reduced-motion:reduce){
  .aura::before,.aura::after{animation:none;}
}
@supports not (background: conic-gradient(from 0deg, red, blue)){
  .aura::before,.aura::after{background:radial-gradient(circle,#FF8964,#a855f7,#22d3ee);}
}
</style>
```

**Gotchas:** `@property` unsupported in Firefox < 128 — gradient still renders, animation dies. Ring thickness controlled by the two inner mask stops (`44% → 58%`); narrower = laser-like, wider = soft aura.

---

## 3. Subtle Grid / Lattice Mesh on Dark Cards

```css
/* A) Pure CSS — 1px square grid. Cheapest, pixel-crisp. */
.mesh-grid{
  background-color:#0b0f17;
  background-image:
    linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);
  background-size:24px 24px;
}

/* B) SVG pattern — anti-aliased. Use for hero backdrops. */
.mesh-svg{
  background-color:#0b0f17;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><path d='M32 0H0v32' fill='none' stroke='%23ffffff' stroke-opacity='.045' stroke-width='1'/></svg>");
}

/* C) Dotted lattice — Vercel-dashboard style. Softest. */
.mesh-dots{
  background-color:#0b0f17;
  background-image:radial-gradient(circle,rgba(255,255,255,.08) 1px,transparent 1px);
  background-size:18px 18px;
}

/* Optional radial fade — Huly trademark die-off at edges */
.mesh-grid,.mesh-svg,.mesh-dots{
  -webkit-mask-image:radial-gradient(ellipse at center,#000 40%,transparent 85%);
          mask-image:radial-gradient(ellipse at center,#000 40%,transparent 85%);
}
```

**Tradeoffs:** A = 0 bytes + pixel-crisp but shimmers on non-integer zoom. B = ~180 bytes, smooth at any zoom. C = softest, no moiré, matches Vercel / Resend / Cal.com.

---

## 4. Cursor-Following Radial Glow on CTA Button

```html
<button class="cta-glow"><span>Start now</span></button>
<style>
.cta-glow{
  --mx:50%;--my:50%;
  position:relative;isolation:isolate;
  padding:14px 28px;border:1px solid rgba(255,137,100,.35);border-radius:12px;
  background:#14151c;color:#fff;font:600 15px/1 system-ui;cursor:pointer;
  overflow:hidden;transition:border-color .2s,transform .2s;
}
.cta-glow::before{
  content:"";position:absolute;inset:0;z-index:-1;
  background:radial-gradient(240px circle at var(--mx) var(--my),
    rgba(255,137,100,.45),transparent 60%);
  opacity:0;transition:opacity .25s;
}
.cta-glow:hover{border-color:#FF8964;transform:translateY(-1px);}
.cta-glow:hover::before,.cta-glow:focus-visible::before{opacity:1;}
.cta-glow:focus-visible{outline:2px solid #FF8964;outline-offset:3px;--mx:50%;--my:50%;}
@media (prefers-reduced-motion:reduce){
  .cta-glow,.cta-glow::before{transition:none;}
}
</style>
<script>
document.querySelectorAll('.cta-glow').forEach(btn=>{
  btn.addEventListener('pointermove',e=>{
    const r=btn.getBoundingClientRect();
    btn.style.setProperty('--mx',(e.clientX-r.left)+'px');
    btn.style.setProperty('--my',(e.clientY-r.top)+'px');
  });
});
</script>
```

**Gotchas:** Use `pointermove` (unified touch/mouse) not `mousemove`. Scope listeners to the button, not `document`. Inside a `transform`ed ancestor, `getBoundingClientRect` still works — `offsetX/offsetY` would not.

---

### JS budget
- Effect 1: ~1.3 KB gzipped · Effect 2: 0 · Effect 3: 0 · Effect 4: ~0.3 KB. **Total ≈ 1.6 KB gzipped**, well under 8 KB ceiling.
