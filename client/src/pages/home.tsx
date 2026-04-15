import { FormEvent } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Seo, personSchema, sharedOrganizationSchema } from "@/components/seo";
import profilePic from "@assets/jordan-tonani.png";

const navLinks = [
  ["/", "Home"],
  ["/institutional-onchain-strategy-bd", "Institutional Onchain Strategy & BD"],
  ["/onchain-treasury-yield-strategy", "Onchain Treasury & Yield Strategy"],
  ["/advisor-wealth-platform-enablement", "Advisor & Wealth Platform Enablement"],
  ["/about-jordan", "About Jordan"],
  ["/seattle-pacific-northwest-digital-asset-strategy", "Seattle / Pacific Northwest"],
  ["/insights", "Insights"],
  ["/contact", "Contact"],
] as const;

const serviceCards = [
  {
    title: "Institutional Onchain Strategy & BD",
    description:
      "Go-to-market strategy and institutional DeFi business development for protocols, exchanges, custodians, and token issuers.",
    points: [
      "Segmented institutional account mapping",
      "Partner and distribution strategy for EVM DeFi products",
      "Message architecture for committees, risk teams, and operators",
    ],
    href: "/institutional-onchain-strategy-bd",
  },
  {
    title: "Onchain Treasury & Yield Strategy",
    description:
      "Stablecoin strategy, tokenized treasury strategy, and practical onchain yield deployment frameworks for operating capital.",
    points: [
      "Treasury policy design with risk and liquidity guardrails",
      "Venue and product selection across lending, AMMs, and structured products",
      "Execution roadmap from pilot to scaled deployment",
    ],
    href: "/onchain-treasury-yield-strategy",
  },
  {
    title: "Advisor & Wealth Platform Enablement",
    description:
      "Digital asset strategy support for advisor platforms, RIAs, and selective family offices entering institutional onchain markets.",
    points: [
      "Platform-level operating model for institutional DeFi exposure",
      "Client communication and policy language",
      "Distribution strategy for digital-asset offerings",
    ],
    href: "/advisor-wealth-platform-enablement",
  },
];

function SiteHeader() {
  return (
    <header className="bg-[#050B14] border-b border-white/10">
      <div className="container-constrained py-5 flex items-center justify-between gap-6">
        <Link href="/" className="text-[#F8F5F0] font-heading font-semibold text-xl tracking-wide">Northwest Onchain</Link>
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.slice(1, 7).map(([href, label]) => (
            <Link key={href} href={href} className="text-sm text-white/80 hover:text-white transition-colors">{label}</Link>
          ))}
        </nav>
        <Link href="/contact"><Button className="btn-primary h-auto text-sm">Book a 30-minute discovery call</Button></Link>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#050B14] text-[#F8F5F0] border-t border-white/10 py-10">
      <div className="container-constrained grid gap-8 md:grid-cols-2">
        <div>
          <p className="font-heading text-xl mb-2">Northwest Onchain</p>
          <p className="text-white/70 text-sm max-w-md">
            Seattle-based institutional onchain strategy partner for crypto-native teams, fintechs, and wealth platforms.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {navLinks.map(([href, label]) => (
            <Link key={href} href={href} className="text-white/70 hover:text-white">{label}</Link>
          ))}
        </div>
      </div>
      <div className="container-constrained mt-8 pt-6 border-t border-white/10">
        <p className="text-xs text-white/60">
          Disclaimer: Northwest Onchain provides strategic advisory services only and does not provide investment, legal, tax, or broker-dealer services.
        </p>
      </div>
    </footer>
  );
}

function SignalGraphic() {
  return (
    <svg viewBox="0 0 420 260" className="w-full max-w-[480px] h-auto" role="img" aria-label="Abstract signal line chart motif">
      <rect x="12" y="12" width="396" height="236" rx="28" fill="#050B14" stroke="#3AD0C3" opacity="0.7" />
      <path d="M48 190 L98 152 L144 164 L196 108 L250 124 L308 86 L368 74" fill="none" stroke="#3AD0C3" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 212 L98 188 L144 198 L196 158 L250 170 L308 144 L368 132" fill="none" stroke="#3AD0C3" opacity="0.4" strokeWidth="2" />
      <g fill="#3AD0C3">
        <circle cx="48" cy="190" r="4" /><circle cx="98" cy="152" r="4" /><circle cx="196" cy="108" r="4" />
        <circle cx="308" cy="86" r="4" /><circle cx="368" cy="74" r="4" />
      </g>
      <text x="42" y="56" fill="#F8F5F0" opacity="0.8" fontSize="13" fontFamily="Inter, sans-serif">Institutional signal, onchain execution.</text>
    </svg>
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
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" name="email" required />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="organization">Organization</Label>
          <Input id="organization" name="organization" />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input id="role" name="role" />
        </div>
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
      <div>
        <Label htmlFor="message">What do you want help with?</Label>
        <Textarea id="message" name="message" required rows={6} />
      </div>
      <Button type="submit" className="btn-primary h-auto">Book a 30-minute discovery call</Button>
      <p className="text-sm text-muted-foreground">Prefer email? Reach Jordan directly at <a className="text-[#050B14] underline" href="mailto:jordan@northwestonchain.com">jordan@northwestonchain.com</a>.</p>
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
              {
                "@type": "Question",
                name: "Who is this advisory built for?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Northwest Onchain works with crypto-native teams, fintech and treasury teams, advisor platforms, selective RIAs, and family offices.",
                },
              },
              {
                "@type": "Question",
                name: "What does a typical engagement include?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Engagements include strategy diagnostics, market and partner mapping, execution priorities, and operating support through deployment milestones.",
                },
              },
            ],
          },
        ]}
      />
      <SiteHeader />

      <section className="bg-[#050B14] text-[#F8F5F0] py-16 md:py-24">
        <div className="container-constrained grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-[#F8F5F0] mb-6 text-4xl lg:text-6xl leading-tight">Institutional onchain strategy for DeFi markets, stablecoins, and serious capital</h1>
            <p className="text-white/80 mb-4">Northwest Onchain helps crypto-native teams, fintechs, and wealth platforms design, distribute, and deploy onchain products that institutions can actually use.</p>
            <p className="text-[#3AD0C3] text-base mb-6">Based in Seattle. Built for the Pacific Northwest. Connected across global onchain markets.</p>
            <ul className="space-y-3 mb-8 text-white/85">
              <li>• Institutional BD for protocols, exchanges, custodians, issuers, and L1 / L2 ecosystems</li>
              <li>• Onchain treasury and yield strategy for stablecoins, tokenized treasuries, and digital cash</li>
              <li>• Advisor and wealth platform enablement for RIAs, family offices, and digital-asset distribution</li>
            </ul>
            <div className="flex flex-wrap gap-3 mb-7">
              <Link href="/contact"><Button className="btn-primary h-auto">Book a 30-minute discovery call</Button></Link>
              <Button variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/10 h-auto">Download services overview</Button>
            </div>
            <p className="text-sm text-white/70">Former Morgan Stanley • Former institutional lead at Index Coop • Currently building in onchain credit • Deep EVM, DeFi, stablecoin, and market-structure expertise</p>
          </div>
          <div className="flex justify-center"><SignalGraphic /></div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-constrained max-w-4xl">
          <h2 className="mb-5">This is where strategy becomes deployment</h2>
          <p className="text-muted-foreground">Institutional onchain strategy fails when it stays in decks. Northwest Onchain sits in the messy middle between product, market structure, risk, and distribution so teams can move from concept to execution.</p>
        </div>
      </section>

      <section className="section-spacing bg-white border-y border-border">
        <div className="container-constrained grid md:grid-cols-2 gap-8 items-center">
          <img src={profilePic} className="rounded-2xl w-full max-w-md" alt="Jordan Tonani, founder of Northwest Onchain" />
          <div>
            <h2 className="mb-4">About Jordan</h2>
            <p className="text-muted-foreground mb-4">Jordan Tonani is a TradFi-to-DeFi operator with experience across institutional sales, onchain product strategy, and market-structure execution.</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 className="text-primary mt-0.5 h-4" />Former Morgan Stanley</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="text-primary mt-0.5 h-4" />Former institutional lead at Index Coop</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="text-primary mt-0.5 h-4" />Currently building in onchain credit</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="text-primary mt-0.5 h-4" />Expertise in EVM DeFi, AMMs, incentives, lending markets, and stablecoin rails</li>
            </ul>
            <Link href="/about-jordan" className="inline-flex items-center mt-5 text-sm font-medium">Read full background <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-constrained">
          <h2 className="mb-8">Three services</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {serviceCards.map((service) => (
              <Card key={service.title} className="rounded-2xl bg-[#F8F5F0] border-border">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-4 text-sm">
                    {service.points.map((point) => <li key={point}>• {point}</li>)}
                  </ul>
                  <Link href={service.href} className="text-sm font-medium inline-flex items-center">View service <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white border-y border-border">
        <div className="container-constrained max-w-5xl">
          <h2 className="mb-6">Who this is for</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              "Crypto-native teams with institutional ambitions",
              "Fintechs, treasury teams, and digital-asset product leaders",
              "Advisor and wealth platforms building institutional DeFi capabilities",
              "Selective RIAs and family offices requiring clear onchain operating models",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-border p-5 bg-[#F8F5F0] text-sm">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-constrained max-w-5xl">
          <h2 className="mb-6">How engagements work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Diagnostic and market map", "Execution plan with clear priorities", "Ongoing operator-level support"].map((item, idx) => (
              <div key={item} className="rounded-xl border border-border p-6">
                <p className="text-xs text-primary mb-2">0{idx + 1}</p>
                <h3 className="text-lg mb-2">{item}</h3>
                <p className="text-sm text-muted-foreground">Short cycles, clear owners, and practical recommendations designed to get deployed.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white border-y border-border">
        <div className="container-constrained max-w-4xl">
          <h2 className="mb-6">FAQ</h2>
          <div className="space-y-4">
            {[
              ["Do you provide generic crypto education?", "No. Engagements are strategic and execution-oriented for teams with specific institutional objectives."],
              ["Do you take on broad web3 consulting projects?", "No. The core focus is institutional onchain strategy, DeFi business development, onchain treasury and yield deployment, and advisor enablement."],
              ["Can you support Pacific Northwest teams with global ambitions?", "Yes. Northwest Onchain is based in Seattle with a Pacific Northwest focus and global onchain market connectivity."],
            ].map(([q, a]) => (
              <Card key={q} className="rounded-xl"><CardContent className="pt-6"><h3 className="text-lg mb-2">{q}</h3><p className="text-sm text-muted-foreground">{a}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-constrained rounded-2xl bg-[#050B14] text-[#F8F5F0] p-10 text-center">
          <h2 className="text-[#F8F5F0] mb-3">Ready to turn institutional interest into deployed onchain strategy?</h2>
          <p className="text-white/70 mb-6">If you are building for serious capital, start with a focused discovery call.</p>
          <Link href="/contact"><Button className="btn-primary h-auto">Book a 30-minute discovery call</Button></Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ServicePage({
  title,
  description,
  path,
  intro,
  outcomes,
}: {
  title: string;
  description: string;
  path: string;
  intro: string;
  outcomes: string[];
}) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Seo title={title} description={description} path={path} schema={sharedOrganizationSchema} />
      <SiteHeader />
      <main>
        <section className="bg-[#050B14] text-[#F8F5F0] py-16">
          <div className="container-constrained max-w-4xl">
            <h1 className="text-[#F8F5F0] mb-4">{title}</h1>
            <p className="text-white/80">{intro}</p>
          </div>
        </section>
        <section className="section-spacing">
          <div className="container-constrained max-w-4xl">
            <h2 className="mb-5">What this engagement covers</h2>
            <ul className="space-y-3 text-muted-foreground">
              {outcomes.map((item) => <li key={item}>• {item}</li>)}
            </ul>
            <Link href="/contact" className="inline-flex items-center mt-8 font-medium">Start with a discovery call <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function InstitutionalStrategyPage() {
  return <ServicePage
    title="Institutional Onchain Strategy & BD"
    description="Institutional onchain strategy and DeFi business development for protocols, exchanges, and digital-asset infrastructure teams."
    path="/institutional-onchain-strategy-bd"
    intro="Design a credible institutional DeFi growth plan, align message to risk and investment committees, and build a disciplined partner pipeline that converts."
    outcomes={[
      "Institutional segmentation and target-account strategy",
      "DeFi business development operating cadence and KPI framework",
      "Distribution partnerships across exchanges, custodians, and issuers",
      "Messaging for market structure, controls, and compliance workflows",
    ]}
  />;
}

export function TreasuryYieldPage() {
  return <ServicePage
    title="Onchain Treasury & Yield Strategy"
    description="Stablecoin strategy, tokenized treasury strategy, and onchain yield deployment frameworks for fintech and treasury leaders."
    path="/onchain-treasury-yield-strategy"
    intro="Build an onchain treasury strategy that balances liquidity, risk, and return while keeping policy, controls, and execution standards clear."
    outcomes={[
      "Stablecoin strategy and digital cash rails design",
      "Tokenized treasury strategy and venue selection",
      "Onchain yield framework across lending, LP programs, and structured products",
      "Pilot-to-scale deployment roadmap with reporting structure",
    ]}
  />;
}

export function WealthEnablementPage() {
  return <ServicePage
    title="Advisor & Wealth Platform Enablement"
    description="Digital asset strategy and institutional DeFi enablement for advisor networks, RIAs, and wealth platforms."
    path="/advisor-wealth-platform-enablement"
    intro="Enable advisors and wealth operators to evaluate and deploy institutional onchain products with a framework that clients and compliance teams can trust."
    outcomes={[
      "Digital asset strategy aligned to client profile and platform controls",
      "Institutional DeFi product map and due-diligence framework",
      "Communication templates for advisors and investment committees",
      "Rollout plan for advisor enablement and distribution",
    ]}
  />;
}

export function AboutJordanPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Seo title="About Jordan Tonani" description="Learn about Jordan Tonani's background from Morgan Stanley to Index Coop and onchain credit." path="/about-jordan" schema={[sharedOrganizationSchema, personSchema]} />
      <SiteHeader />
      <main>
        <section className="bg-[#050B14] text-[#F8F5F0] py-16">
          <div className="container-constrained max-w-4xl">
            <h1 className="text-[#F8F5F0] mb-4">About Jordan</h1>
            <p className="text-white/80">Jordan Tonani is a TradFi-to-DeFi operator focused on the gap between institutional expectations and onchain market reality.</p>
          </div>
        </section>
        <section className="section-spacing">
          <div className="container-constrained grid md:grid-cols-2 gap-8 items-start">
            <img src={profilePic} alt="Jordan Tonani in Seattle" className="rounded-2xl" />
            <div className="space-y-4">
              <p>Jordan started his career at Morgan Stanley, where he learned institutional process, governance, and capital markets discipline.</p>
              <p>He later served as institutional lead at Index Coop, working directly with onchain products, liquidity design, and market participants across the DeFi ecosystem.</p>
              <p>Today, he is building in onchain credit while advising teams on EVM DeFi, stablecoin strategy, lending markets, AMMs, incentives, and market structure execution.</p>
              <p>Based in Seattle, Jordan supports Pacific Northwest teams and global clients that need senior judgment and practical deployment plans.</p>
            </div>
          </div>
        </section>
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
        <section className="bg-[#050B14] text-[#F8F5F0] py-16">
          <div className="container-constrained max-w-4xl">
            <h1 className="text-[#F8F5F0] mb-4">Seattle / Pacific Northwest Digital Asset Strategy</h1>
            <p className="text-white/80">A Pacific Northwest crypto advisory with institutional standards and global onchain market reach.</p>
          </div>
        </section>
        <section className="section-spacing">
          <div className="container-constrained max-w-4xl space-y-4 text-muted-foreground">
            <p>Northwest Onchain supports Seattle and Pacific Northwest organizations that need precise digital asset strategy, not broad web3 consulting.</p>
            <p>Engagements are built for teams navigating treasury policy, stablecoin deployment, DeFi partner strategy, and advisor platform readiness.</p>
            <p>From Seattle, the firm operates across global onchain markets with a practical understanding of institutional operating constraints.</p>
            <Link href="/contact" className="font-medium text-foreground">Talk about your Pacific Northwest mandate →</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function InsightsPage() {
  const posts = [
    {
      title: "Institutional onchain strategy in 2026: where teams still get stuck",
      summary: "A practical breakdown of why institutional DeFi initiatives stall between strategy, risk review, and distribution execution.",
    },
    {
      title: "Stablecoin strategy vs tokenized treasury strategy: how to choose",
      summary: "A plain-English decision framework for treasury teams selecting digital cash rails and yield venues.",
    },
    {
      title: "What advisors need before offering institutional DeFi exposure",
      summary: "Operating model requirements for advisor platforms, RIAs, and family offices entering onchain markets.",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Seo title="Insights" description="Northwest Onchain insights on institutional onchain strategy, stablecoins, and market structure deployment." path="/insights" schema={sharedOrganizationSchema} />
      <SiteHeader />
      <main>
        <section className="bg-[#050B14] text-[#F8F5F0] py-16">
          <div className="container-constrained max-w-4xl">
            <h1 className="text-[#F8F5F0] mb-4">Insights</h1>
            <p className="text-white/80">Short, operator-level perspectives on institutional DeFi, onchain treasury, and distribution strategy.</p>
          </div>
        </section>
        <section className="section-spacing">
          <div className="container-constrained grid md:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Card key={post.title} className="rounded-xl">
                <CardHeader><CardTitle className="text-xl">{post.title}</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">{post.summary}</p></CardContent>
              </Card>
            ))}
          </div>
        </section>
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
        <section className="bg-[#050B14] text-[#F8F5F0] py-16">
          <div className="container-constrained max-w-4xl">
            <h1 className="text-[#F8F5F0] mb-4">Contact</h1>
            <p className="text-white/80">Tell us what you are building, where decisions are blocked, and what success looks like.</p>
          </div>
        </section>
        <section className="section-spacing">
          <div className="container-constrained max-w-3xl">
            <h2 className="mb-4">Book your discovery call</h2>
            <p className="text-muted-foreground mb-8">This form is designed for institutional onchain strategy, onchain treasury and yield work, and advisor or wealth platform enablement engagements.</p>
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
