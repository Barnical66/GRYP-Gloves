/// <reference path="./vite-env.d.ts" />
import { useState, useEffect, useRef } from "react";
import type React from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Check, Shield, Activity, Sparkles, Cpu, Droplets, Leaf, Gauge, TrendingUp, Github, Mail, SlidersHorizontal, Pointer, HeartPulse, BarChart3, Users, Image as ImageIcon } from "lucide-react";

/* ——— 3D viewer (model-viewer) with graceful fallback ——— */
function ModelViewer3D() {
  const [ready, setReady] = useState(false); // model-viewer script loaded
  const [hasModel, setHasModel] = useState<boolean | null>(null); // null = checking
  const mvRef = useRef<HTMLElement | null>(null);
  // When deploying to a subpath (GitHub Pages) use Vite's BASE_URL so public/ assets resolve correctly
  const modelSrc = import.meta.env.BASE_URL + "assets/model.glb"; // expected model location
  const posterSrc = import.meta.env.BASE_URL + "assets/gltf_embedded_0.jpeg"; // optional preview

  // Load the web component script once
  useEffect(() => {
    const id = "model-viewer-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.type = "module";
      s.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
      s.onload = () => setReady(true);
      s.onerror = () => setReady(false);
      document.head.appendChild(s);
    } else {
      setReady(true);
    }
  }, []);

  // Verify the model file exists to avoid 404 error spam
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(modelSrc, { method: "HEAD" });
        if (!cancelled) setHasModel(res.ok);
      } catch (_) {
        if (!cancelled) setHasModel(false);
      }
    })();
    return () => { cancelled = true; };
  }, [modelSrc]);

  // Fallback UI if model missing
  if (hasModel === false || !ready) {
    return (
      <div className="relative w-full h-[420px] rounded-2xl border border-white/10 bg-slate-900 grid place-items-center text-center p-6">
        {posterSrc ? (
          // Poster preview (if available)
          <img src={posterSrc} alt="GRYP Gloves Poster" className="absolute inset-0 w-full h-full object-cover opacity-40 rounded-2xl" />
        ) : null}
        <div className="relative z-10 max-w-md text-slate-300">
          <div className="mx-auto mb-3 h-10 w-10 grid place-items-center rounded-xl bg-white/10 border border-white/15">
            <ImageIcon className="h-5 w-5" />
          </div>
          <p className="font-semibold text-slate-100">3D model not found</p>
          <p className="mt-1 text-sm">Place your file at <code className="text-slate-200">public/assets/model.glb</code> (or update the code to the correct path). A poster image is optional at <code className="text-slate-200">public/assets/gltf_embedded_0.jpeg</code>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <model-viewer
        ref={mvRef as any}
        src={modelSrc}
        poster={posterSrc}
        alt="GRYP Gloves 3D Model"
        camera-controls
        min-camera-orbit="auto 20deg auto"
        max-camera-orbit="auto 95deg auto"
        field-of-view="20deg"
        auto-rotate
        auto-rotate-delay="0"
        rotation-per-second="15deg"
        exposure="0.8"
        environment-image="neutral"
        shadow-intensity="0.6"
        interaction-prompt="none"
        reveal="auto"
        style={{ width: "100%", height: "420px", background: "transparent" }}
      >
        {/* Hotspots (placeholder coordinates; adjust after GLB import) */}
        
      </model-viewer>

      <style>{`
        .hotspot {
          background: rgba(17, 24, 39, 0.8);
          color: #e5e7eb;
          border: 1px solid rgba(255,255,255,0.12);
          padding: 6px 10px;
          border-radius: 12px;
          font-size: 11px;
          backdrop-filter: blur(4px);
          pointer-events: auto;
        }
        .hotspot::before { display: none; }
      `}</style>
    </div>
  );
}

/* ——— Page ——— */
export default function GrypGlovesLanding() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Global mono logo styles for light/dark */}
      <style>{`
        @media (prefers-color-scheme: dark) {
          .logo-mono { filter: brightness(0) invert(1) contrast(1.05); }
        }
        @media (prefers-color-scheme: light) {
          .logo-mono { filter: brightness(0) contrast(1.1); }
        }
      `}</style>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 border-b border-white/10">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={import.meta.env.BASE_URL + "assets/1.png"} alt="GRYP Gloves wordmark" className="hidden sm:block h-10" />
            <span className="sm:hidden text-lg font-semibold tracking-tight">GRYP Gloves</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#tech" className="hover:text-violet-300">Technology</a>
            <a href="#companion" className="hover:text-violet-300">Companion app</a>
            <a href="#features" className="hover:text-violet-300">Features</a>
            <a href="#team" className="hover:text-violet-300">Meet the team</a>
            <a href="#faq" className="hover:text-violet-300">FAQ</a>
            <Button className="bg-violet-600 hover:bg-violet-500 rounded-2xl">Join Waitlist</Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-24 left-[-10%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-white/10 text-violet-200 border border-white/20">AI sports wellness</Badge>
            <img src={import.meta.env.BASE_URL + "assets/1.png"} alt="GRYP Gloves" className="mb-4 h-20 opacity-90" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Smart goalkeeper gloves
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400"> that learn from your hands</span>
            </h1>
            <p className="mt-5 text-slate-300 max-w-xl">
              GRYP GLOVES protects your fingers, tracks impact, and turns training into insight. Built for safety, speed, and progress.
            </p>
            <div className="mt-6">
              <Button size="lg" className="w-full sm:w-auto sm:min-w-[260px] px-8 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500">Get early access</Button>
            </div>
            </div>

          {/* 3D product card */}
          <Card className="bg-white/5 border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-slate-200">GRYP GLOVES Prototype (3D)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full rounded-2xl border border-white/10 bg-slate-900">
                <ModelViewer3D />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-6 border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center md:flex-row md:flex-wrap md:items-center md:justify-center gap-2 md:gap-8 text-slate-400 text-sm text-center md:text-left">
          <span>FIFA Law 4 compliant design</span>
          <span className="hidden md:inline h-1 w-1 rounded-full bg-slate-600" />
          <span>Adaptive Spine System</span>
          <span className="hidden md:inline h-1 w-1 rounded-full bg-slate-600" />
          <span>Designed for youth and adult sizes</span>
        </div>
      </section>

      {/* Technology */}
      <section id="tech" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold">Technology that adapts to you</h2>
            <p className="mt-3 text-slate-300">We combine materials and on‑device analytics to protect and guide performance.</p>
          </div>
          {/* Unified 6-tile grid */}
          <div className="mt-8 grid md:grid-cols-3 gap-3 md:gap-4">
            {[
              { icon: 'Cpu', title: 'Adaptive fingersave', body: 'LCP spine system tunes stiffness in real time for catch, punch, and dive.' },
              { icon: 'Gauge', title: 'Impact tracking', body: 'Sensor array estimates force and location to guide safer technique.' },
              { icon: 'TrendingUp', title: 'Coaching insights', body: 'Session summaries and goals motivate progress across weeks.' },
              { icon: 'Sparkles', title: 'Smarter Glove Technology', body: 'Smart goalkeeper gloves with adaptive spine stiffness and built‑in impact tracking.' },
              { icon: 'Shield', title: 'Injury Prevention + Performance', body: 'Prevents finger injuries, improves grip control, and supports high‑performance movements.' },
              { icon: 'SlidersHorizontal', title: 'Full Control Through App', body: 'Companion app allows users to personalise finger stiffness settings and monitor training data in real‑time.' },
            ].map((c, i) => (
              <Card key={i} className="rounded-3xl bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-lg font-semibold flex items-center gap-2">
                    {c.icon === 'Cpu' && <Cpu className="h-5 w-5" />} 
                    {c.icon === 'Gauge' && <Gauge className="h-5 w-5" />} 
                    {c.icon === 'TrendingUp' && <TrendingUp className="h-5 w-5" />} 
                    {c.icon === 'Sparkles' && <Sparkles className="h-5 w-5" />} 
                    {c.icon === 'Shield' && <Shield className="h-5 w-5" />} 
                    {c.icon === 'SlidersHorizontal' && <SlidersHorizontal className="h-5 w-5" />} 
                    <span>{c.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 text-sm leading-6 pt-0 pb-5">
                  {c.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      {/* Companion App */}
      <section id="companion" className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold">Companion app</h2>
          <p className="mt-2 text-slate-300">Personalised finger control, tracking, analytics, and coach tools.</p>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-3xl bg-white/5 border-white/10"><CardHeader><CardTitle className="text-slate-100"><span className="flex items-center gap-2"><Pointer className="h-5 w-5" /> Personalised Finger Control</span></CardTitle></CardHeader><CardContent className="text-slate-300 text-sm leading-6">Adjust stiffness per finger for personalised grip and movement.</CardContent></Card>
            <Card className="rounded-3xl bg-white/5 border-white/10"><CardHeader><CardTitle className="text-slate-100"><span className="flex items-center gap-2"><HeartPulse className="h-5 w-5" /> Impact & Fatigue Tracking</span></CardTitle></CardHeader><CardContent className="text-slate-300 text-sm leading-6">View impact heatmaps and monitor fatigue risk based on pressure data.</CardContent></Card>
            <Card className="rounded-3xl bg-white/5 border-white/10"><CardHeader><CardTitle className="text-slate-100"><span className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Performance Analytics</span></CardTitle></CardHeader><CardContent className="text-slate-300 text-sm leading-6">Get session summaries and performance insights to improve training.</CardContent></Card>
            <Card className="rounded-3xl bg-white/5 border-white/10"><CardHeader><CardTitle className="text-slate-100"><span className="flex items-center gap-2"><Users className="h-5 w-5" /> Team & Coach Dashboard</span></CardTitle></CardHeader><CardContent className="text-slate-300 text-sm leading-6">Access coach‑specific features for monitoring multiple players (B2B integration).</CardContent></Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold">Features</h2>
          <p className="mt-2 text-slate-300">What makes GRYP Gloves different.</p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <ul className="grid md:grid-cols-2 gap-4 md:gap-5 text-slate-200 text-base">
              {[
                "Adaptive Spine System (MR fluid/LCP‑based)",
                "Customisable per‑finger stiffness",
                "Smart impact tracking and fatigue alerts",
                "Bluetooth sync with app (iOS/Android)",
                "FIFA Law 4 compliant design",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-600/80"><Check className="h-3.5 w-3.5" /></span>
                  <span className="leading-6">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Meet the team</h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-8 md:gap-10 lg:gap-12 place-items-center">
            {[
              { name: "Alexandros Trakakis", title: "Co‑Founder", img: "/assets/team-alex.jpeg", initials: "AT" },
              { name: "Arnav Bhavnani", title: "Co‑Founder", img: "/assets/team-arnav.jpeg", initials: "AB" },
            ].map((m) => (
              <div key={m.name} className="text-center">
                <div className="relative h-40 w-40 rounded-full ring-2 ring-white/20 shadow-xl overflow-hidden mx-auto bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-2xl font-semibold">
                  <span className="text-slate-200 select-none">{m.initials}</span>
                  {/* Replace the srcs below with real photos; they'll mask to a perfect circle */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={import.meta.env.BASE_URL + m.img.replace(/^\//, "")}
                    alt={m.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="mt-4">
                  <div className="text-lg font-semibold text-slate-100 leading-tight">{m.name}</div>
                  <div className="text-slate-400 text-sm">{m.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-2xl font-bold">Be first to try GRYP Gloves</h3>
                <p className="mt-2 text-slate-200">Join the waitlist. We will share updates and early tester invites.</p>
              </div>
              <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
                <Input
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-2xl bg-slate-950/60 border-white/20 text-slate-200 placeholder:text-slate-400"
                />
                <Button className="rounded-2xl bg-violet-600 hover:bg-violet-500">Notify me</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Questions</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {[
              {q: "Is this a functional product?", a: "This is a design demo. It shows the layout for the landing page and app preview without live backend."},
              {q: "What sizes will you offer?", a: "Youth small to adult large with adjustable strap lengths."},
              {q: "How do you handle privacy?", a: "Data can stay on device by default. Sharing is optional."},
              {q: "When can I try it?", a: "Sign up for the waitlist. We will invite testers as soon as prototypes are ready."},
            ].map((f, i)=> (
              <Card key={i} className="rounded-2xl bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">{f.q}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 text-sm leading-6">{f.a}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <span className="text-center">© {new Date().getFullYear()} GRYP Gloves</span>
        </div>
      </footer>
    </div>
  );
}
