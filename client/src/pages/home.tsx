import { FormEvent } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Seo, personSchema, sharedOrganizationSchema } from "@/components/seo";
import profilePic from "@assets/jordan-tonani.png";

const navLinks = [
  ["/", "Home"],
  ["/institutional-onchain-strategy-bd", "Institutional Strategy & BD"],
  ["/onchain-treasury-yield-strategy", "Treasury & Yield"],
  ["/advisor-wealth-platform-enablement", "Advisor Enablement"],
  ["/about-jordan", "About Jordan"],
  ["/seattle-pacific-northwest-digital-asset-strategy", "Seattle / PNW"],
  ["/insights", "Insights"],
  ["/contact", "Contact"],
] as const;

const serviceCards = [
  {
    title: "Institutional Onchain Strategy & BD",
    description: "For protocols, exchanges, custodians, issuers, and L1/L2 ecosystems that need institutional distribution.",
    points: [
      "Target account map and partner strategy",
      "DeFi business development operating cadence",
      "Message built for risk and investment teams",
    ],
    href: "/institutional-onchain-strategy-bd",
  },
  {
    title: "Onchain Treasury & Yield Strategy",
    description: "For fintech and treasury teams deploying stablecoins, tokenized treasuries, and digital cash rails.",
    points: [
      "Stablecoin and tokenized treasury strategy",
      "Onchain treasury policy and controls",
      "Onchain yield deployment roadmap",
    ],
    href: "/onchain-treasury-yield-strategy",
  },
  {
    title: "Advisor & Wealth Platform Enablement",
    description: "For advisor platforms, RIAs, and family offices entering institutional onchain markets.",
    points: [
      "Platform-level digital asset strategy",
      "Client and committee communication framework",
      "Distribution and rollout support",
    ],
    href: "/advisor-wealth-platform-enablement",
  },
];

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050B14]/90 backdrop-blur-xl">
      <div className="container-constrained flex items-center justify-between py-4">
        <Link href="/" className="font-heading text-lg font-semibold text-[#F8F5F0]">Northwest Onchain</Link>
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.slice(1, 7).map(([href, label]) => (
            <Link key={href} href={href} className="text-xs tracking-wide uppercase text-white/70 hover:text-white transition-colors">
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/contact"><Button className="btn-primary h-auto text-sm">Book a 30-minute discovery call</Button></Link>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#050B14] text-[#F8F5F0] pt-14 pb-10 border-t border-white/10">
      <div className="container-constrained grid gap-8 md:grid-cols-2">
        <div>
          <p className="font-heading text-xl mb-3">Northwest Onchain</p>
          <p className="text-white/65 text-sm max-w-md">Institutional onchain strategy for teams moving real capital through DeFi markets.</p>
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          {navLinks.map(([href, label]) => (
            <Link key={href} href={href} className="text-white/65 hover:text-white">{label}</Link>
          ))}
        </div>
      </div>
      <div className="container-constrained mt-10 pt-6 border-t border-white/10">
        <p className="text-xs text-white/50">Disclaimer: Strategic advisory only. No investment, legal, tax, or broker-dealer services.</p>
      </div>
    </footer>
  );
}

function HeroSignal() {
  return (
    <div className="hero-shell" aria-hidden="true">
      <div className="hero-grid" />
      <svg viewBox="0 0 580 380" className="hero-chart">
        <path d="M40 280 L130 230 L210 245 L300 170 L395 188 L500 125 L545 92" fill="none" stroke="#3AD0C3" strokeWidth="3" strokeLinecap="round" />
        <path d="M40 305 L130 270 L210 286 L300 222 L395 236 L500 204 L545 178" fill="none" stroke="#3AD0C3" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
        <g fill="#3AD0C3">
          <circle cx="40" cy="280" r="4" /><circle cx="130" cy="230" r="4" /><circle cx="300" cy="170" r="4" /><circle cx="500" cy="125" r="4" /><circle cx="545" cy="92" r="4" />
        </g>
      </svg>
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
    </div>
  );
}

function ContactForm() {
  const { toast } = useToast();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      organization: String(formData.get("organization") || ""),
      role: String(formData.get("role") || ""),
      type: String(formData.get("type") || ""),
      message: String(formData.get("message") || ""),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (response.ok) {
      toast({ title: "Message sent", description: result.message });
      e.currentTarget.reset();
      return;
    }

    toast({ title: "Submission failed", description: result.message || "Please try again.", variant: "destructive" });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <div><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
        <div><Label htmlFor="email">Work email</Label><Input id="email" type="email" name="email" required /></div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div><Label htmlFor="organization">Organization</Label><Input id="organization" name="organization" /></div>
        <div><Label htmlFor="role">Role</Label><Input id="role" name="role" /></div>
      </div>
      <div>
        <Label htmlFor="type">Audience type</Label>
        <select id="type" name="type" required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="">Select audience type</option>
          <option value="Crypto-native team">Crypto-native team</option>
          <option value="Fintech or treasury team">Fintech or treasury team</option>
          <option value="Advisor or wealth platform">Advisor or wealth platform</option>
          <option value="RIA or family office">RIA or family office</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div><Label htmlFor="message">What do you want help with?</Label><Textarea id="message" name="message" required rows={6} /></div>
      <Button type="submit" className="btn-primary h-auto">Book a 30-minute discovery call</Button>
      <p className="text-sm text-muted-foreground">Prefer email? <a className="underline" href="mailto:jordan@northwestonchain.com">jordan@northwestonchain.com</a></p>
    </form>
  );
}

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Seo
        title="Institutional Onchain Strategy for DeFi Markets"
        description="Northwest Onchain is a Seattle-based institutional onchain strategy firm helping teams design, distribute, and deploy products institutions can use."
        path="/"
        schema={[
          sharedOrganizationSchema,
          personSchema,
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Who is this for?", acceptedAnswer: { "@type": "Answer", text: "Crypto-native teams, fintech and treasury teams, advisor platforms, selective RIAs, and family offices." } },
              { "@type": "Question", name: "What does an engagement include?", acceptedAnswer: { "@type": "Answer", text: "Diagnostic, market map, execution priorities, and operator-level support to deployment." } },
            ],
          },
        ]}
      />
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#050B14] text-[#F8F5F0] py-18 md:py-24">
        <div className="container-constrained grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-[#F8F5F0] mb-6 text-4xl md:text-5xl lg:text-6xl leading-[1.05]">Institutional onchain strategy for DeFi markets, stablecoins, and serious capital</h1>
            <p className="text-white/80 mb-3 max-w-xl">Northwest Onchain helps crypto-native teams, fintechs, and wealth platforms design, distribute, and deploy onchain products that institutions can actually use.</p>
            <p className="text-[#3AD0C3] text-sm uppercase tracking-wide mb-6">Based in Seattle. Built for the Pacific Northwest. Connected across global onchain markets.</p>
            <ul className="space-y-2 text-white/85 text-sm mb-7">
              <li>Institutional BD for protocols, exchanges, custodians, issuers, and L1 / L2 ecosystems</li>
              <li>Onchain treasury and yield strategy for stablecoins, tokenized treasuries, and digital cash</li>
              <li>Advisor and wealth platform enablement for RIAs, family offices, and digital-asset distribution</li>
            </ul>
            <div className="flex flex-wrap gap-3 mb-5">
              <Link href="/contact"><Button className="btn-primary h-auto">Book a 30-minute discovery call</Button></Link>
              <Button variant="outline" className="h-auto border-white/20 text-white bg-transparent hover:bg-white/10">Download services overview</Button>
            </div>
            <p className="text-xs text-white/70">Former Morgan Stanley • Former institutional lead at Index Coop • Currently building in onchain credit • Deep EVM, DeFi, stablecoin, and market-structure expertise</p>
          </div>
          <HeroSignal />
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-constrained max-w-4xl">
          <h2 className="mb-4">This is where strategy becomes deployment</h2>
          <p className="text-muted-foreground">Most teams do strategy. Few teams ship. Northwest Onchain closes that gap between thesis, market structure, and real execution.</p>
        </div>
      </section>

      <section className="section-spacing pt-0">
        <div className="container-constrained grid md:grid-cols-[300px_1fr] gap-8 items-center rounded-3xl border border-border bg-white p-8">
          <img src={profilePic} alt="Jordan Tonani, founder of Northwest Onchain" className="rounded-2xl w-full" />
          <div>
            <h2 className="mb-4">About Jordan</h2>
            <p className="text-muted-foreground mb-4">TradFi-to-DeFi operator with institutional and onchain execution experience.</p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />Former Morgan Stanley</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />Former institutional lead at Index Coop</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />Currently building in onchain credit</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />Deep EVM DeFi & stablecoin expertise</li>
            </ul>
            <Link href="/about-jordan" className="inline-flex items-center mt-5 text-sm font-medium">Read full background <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white border-y border-border">
        <div className="container-constrained">
          <h2 className="mb-8">Three services</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {serviceCards.map((service) => (
              <Card key={service.title} className="rounded-2xl border-border bg-[#F8F5F0]">
                <CardHeader><CardTitle className="text-xl">{service.title}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-4 text-sm">{service.points.map((point) => <li key={point}>• {point}</li>)}</ul>
                  <Link href={service.href} className="text-sm inline-flex items-center font-medium">View service <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-constrained grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="mb-4">Who this is for</h2>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>Crypto-native teams with institutional ambitions</li>
              <li>Fintechs, treasury teams, and digital-asset product leaders</li>
              <li>Advisor and wealth platforms</li>
              <li>Selective RIAs and family offices</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4">How engagements work</h2>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li><span className="text-foreground font-medium">01</span> Diagnostic and institutional market map</li>
              <li><span className="text-foreground font-medium">02</span> Execution priorities and owner alignment</li>
              <li><span className="text-foreground font-medium">03</span> Operator-level deployment support</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section-spacing pt-0">
        <div className="container-constrained">
          <h2 className="mb-5">FAQ</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["Do you offer broad web3 consulting?", "No. The focus is institutional onchain strategy, treasury and yield deployment, and advisor enablement."],
              ["Is this generic crypto education?", "No. Work is execution-focused for teams with clear institutional goals."],
              ["Seattle only?", "Seattle-based with Pacific Northwest focus and global reach."],
            ].map(([q, a]) => (
              <Card key={q} className="rounded-xl"><CardContent className="pt-6"><h3 className="text-base mb-2">{q}</h3><p className="text-sm text-muted-foreground">{a}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing pt-0">
        <div className="container-constrained rounded-3xl bg-[#050B14] p-10 text-center text-[#F8F5F0]">
          <h2 className="text-[#F8F5F0] mb-3">Ready to deploy an institutional onchain strategy?</h2>
          <p className="text-white/70 mb-6">Start with a focused 30-minute discovery call.</p>
          <Link href="/contact"><Button className="btn-primary h-auto">Book a 30-minute discovery call</Button></Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ServicePage({ title, description, path, intro, outcomes }: { title: string; description: string; path: string; intro: string; outcomes: string[] }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Seo title={title} description={description} path={path} schema={sharedOrganizationSchema} />
      <SiteHeader />
      <main>
        <section className="bg-[#050B14] text-[#F8F5F0] py-18"><div className="container-constrained max-w-4xl"><h1 className="text-[#F8F5F0] mb-4">{title}</h1><p className="text-white/80 max-w-3xl">{intro}</p></div></section>
        <section className="section-spacing"><div className="container-constrained max-w-4xl"><h2 className="mb-5">What this engagement covers</h2><ul className="space-y-3 text-muted-foreground text-sm">{outcomes.map((item) => <li key={item}>• {item}</li>)}</ul><Link href="/contact" className="inline-flex items-center mt-8 font-medium">Start with a discovery call <ArrowRight className="h-4 w-4 ml-1" /></Link></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function InstitutionalStrategyPage() {
  return <ServicePage title="Institutional Onchain Strategy & BD" description="Institutional onchain strategy and DeFi business development for protocols, exchanges, and digital-asset infrastructure teams." path="/institutional-onchain-strategy-bd" intro="Design a credible institutional growth plan, align with risk and investment workflows, and build a partner pipeline that converts." outcomes={["Institutional account segmentation and target map", "DeFi business development cadence and KPI model", "Distribution strategy across exchanges, custodians, and issuers", "Messaging for market structure and controls"]} />;
}

export function TreasuryYieldPage() {
  return <ServicePage title="Onchain Treasury & Yield Strategy" description="Stablecoin strategy, tokenized treasury strategy, and onchain yield deployment frameworks for fintech and treasury leaders." path="/onchain-treasury-yield-strategy" intro="Build an onchain treasury strategy with clear controls, liquidity guardrails, and deployment standards." outcomes={["Stablecoin strategy and digital cash rails", "Tokenized treasury strategy and venue selection", "Onchain yield framework across lending and LP programs", "Pilot-to-scale deployment roadmap"]} />;
}

export function WealthEnablementPage() {
  return <ServicePage title="Advisor & Wealth Platform Enablement" description="Digital asset strategy and institutional DeFi enablement for advisor networks, RIAs, and wealth platforms." path="/advisor-wealth-platform-enablement" intro="Enable advisors and wealth platforms to evaluate and deploy institutional onchain products with confidence." outcomes={["Platform-level digital asset strategy", "Institutional DeFi product and diligence framework", "Advisor and committee communication templates", "Distribution rollout plan"]} />;
}

export function AboutJordanPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Seo title="About Jordan Tonani" description="Learn about Jordan Tonani's background from Morgan Stanley to Index Coop and onchain credit." path="/about-jordan" schema={[sharedOrganizationSchema, personSchema]} />
      <SiteHeader />
      <main>
        <section className="bg-[#050B14] text-[#F8F5F0] py-18"><div className="container-constrained max-w-4xl"><h1 className="text-[#F8F5F0] mb-4">About Jordan</h1><p className="text-white/80">TradFi-to-DeFi operator focused on institutional adoption and practical onchain deployment.</p></div></section>
        <section className="section-spacing"><div className="container-constrained grid md:grid-cols-[320px_1fr] gap-8 items-start"><img src={profilePic} alt="Jordan Tonani in Seattle" className="rounded-2xl" /><div className="space-y-4 text-muted-foreground"><p>Jordan started at Morgan Stanley, then moved full-time into DeFi and institutional distribution.</p><p>As former institutional lead at Index Coop, he worked directly with onchain products, liquidity, and distribution partners.</p><p>Today he is building in onchain credit while advising on EVM DeFi, stablecoins, lending markets, AMMs, incentives, and market structure.</p><p>Based in Seattle, he supports Pacific Northwest teams with global onchain ambitions.</p></div></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function SeattlePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Seo title="Seattle / Pacific Northwest Digital Asset Strategy" description="Seattle digital asset strategy and Pacific Northwest crypto advisory for institutions and fintech teams." path="/seattle-pacific-northwest-digital-asset-strategy" schema={sharedOrganizationSchema} />
      <SiteHeader />
      <main>
        <section className="bg-[#050B14] text-[#F8F5F0] py-18"><div className="container-constrained max-w-4xl"><h1 className="text-[#F8F5F0] mb-4">Seattle / Pacific Northwest Digital Asset Strategy</h1><p className="text-white/80">Pacific Northwest crypto advisory with institutional standards and global market connectivity.</p></div></section>
        <section className="section-spacing"><div className="container-constrained max-w-4xl space-y-4 text-muted-foreground"><p>Northwest Onchain supports Seattle and Pacific Northwest organizations that need precise digital asset strategy.</p><p>Work focuses on institutional onchain strategy, treasury policy, stablecoin deployment, and advisor platform readiness.</p><p>Engagements are practical, direct, and execution-focused.</p><Link href="/contact" className="font-medium text-foreground">Talk about your mandate →</Link></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function InsightsPage() {
  const posts = [
    { title: "Institutional onchain strategy in 2026: where teams still get stuck", summary: "Why initiatives stall between strategy, risk review, and distribution execution." },
    { title: "Stablecoin strategy vs tokenized treasury strategy: how to choose", summary: "A simple framework for selecting digital cash rails and yield venues." },
    { title: "What advisors need before offering institutional DeFi exposure", summary: "Operating model requirements for advisors entering onchain markets." },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Seo title="Insights" description="Northwest Onchain insights on institutional onchain strategy, stablecoins, and market structure deployment." path="/insights" schema={sharedOrganizationSchema} />
      <SiteHeader />
      <main>
        <section className="bg-[#050B14] text-[#F8F5F0] py-18"><div className="container-constrained max-w-4xl"><h1 className="text-[#F8F5F0] mb-4">Insights</h1><p className="text-white/80">Operator-level notes on institutional DeFi, onchain treasury, and distribution.</p></div></section>
        <section className="section-spacing"><div className="container-constrained grid md:grid-cols-3 gap-5">{posts.map((post) => <Card key={post.title} className="rounded-xl"><CardHeader><CardTitle className="text-xl">{post.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{post.summary}</p></CardContent></Card>)}</div></section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Seo title="Contact" description="Book a 30-minute discovery call with Northwest Onchain." path="/contact" schema={sharedOrganizationSchema} />
      <SiteHeader />
      <main>
        <section className="bg-[#050B14] text-[#F8F5F0] py-18"><div className="container-constrained max-w-4xl"><h1 className="text-[#F8F5F0] mb-4">Contact</h1><p className="text-white/80">Tell us what you are building and where decisions are blocked.</p></div></section>
        <section className="section-spacing"><div className="container-constrained max-w-3xl"><h2 className="mb-4">Book your discovery call</h2><p className="text-muted-foreground mb-8">Designed for institutional onchain strategy, treasury and yield deployment, and advisor enablement.</p><ContactForm /></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}
