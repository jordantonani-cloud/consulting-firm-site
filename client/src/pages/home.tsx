import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Menu, X, Shield, MessageSquare, Target, Users, Building2, Briefcase, Rocket, GraduationCap, Lightbulb, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import profilePic from "@assets/jordan-tonani.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      organization: formData.get('organization') as string || undefined,
      role: formData.get('role') as string || undefined,
      type: formData.get('type') as string,
      message: formData.get('message') as string,
    };
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        toast({ title: "Message sent!", description: result.message });
        e.currentTarget.reset();
      } else {
        toast({ title: "Error", description: result.message || "Failed to send message. Please try again.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to send message. Please check your connection and try again.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border py-3 shadow-sm" : "bg-[#050B14] py-5 border-b border-white/10"}`}>
        <div className="container-constrained flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="navbar-brand">
              <img src="/nw-logo.png" alt="Northwest Onchain" className={`navbar-logo transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`} />
            </a>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["About", "Services", "Process", "Contact"].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? 'text-muted-foreground' : 'text-white/80 hover:text-white'}`}>
                {item}
              </button>
            ))}
            <Button onClick={() => scrollToSection('contact')} className="btn-primary h-auto text-sm">
              Book a discovery call
            </Button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden bg-background border-b border-border px-4 py-4 shadow-lg">
            <div className="flex flex-col gap-4">
              {["About", "Services", "Process", "Contact"].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left text-sm font-medium text-foreground hover:text-primary py-2">{item}</button>
              ))}
              <Button onClick={() => scrollToSection('contact')} className="w-full btn-primary">Book a discovery call</Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden bg-[#050B14] text-white">
        <div className="container-constrained relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-xl">
              <motion.h1 variants={fadeInUp} className="mb-6 text-white text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1]">
                Bridging DeFi and serious capital in the Pacific Northwest
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-white/70 mb-8 text-lg leading-relaxed">
                Onchain BD, crypto education, and web3 strategy for teams that want real outcomes — not hype.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-10">
                {["DeFi BD", "RIA Education", "Enterprise Strategy"].map((tag, i) => (
                  <span key={i} className={`px-4 py-1.5 rounded-full text-sm font-medium border ${i === 0 ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white/5 text-white/70 border-white/10'}`}>{tag}</span>
                ))}
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => scrollToSection('contact')} className="btn-primary text-base">
                  Book a discovery call <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-full px-6 py-3 h-auto text-sm">
                  Download services overview
                </Button>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden md:flex justify-center items-center">
              <div className="hero-graphic">
                <svg className="hero-svg" viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="24" y="24" width="312" height="192" rx="32" fill="#050B14" stroke="#3AD0C3" strokeWidth="1.4" />
                  <path d="M60 90 H300 M60 130 H300 M60 170 H300" stroke="#3AD0C3" strokeWidth="0.8" opacity="0.15" />
                  <motion.path d="M60 160 L110 120 L150 135 L190 90 L240 105 L300 70" fill="none" stroke="#3AD0C3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
                  <path d="M60 175 L110 140 L150 150 L190 110 L240 120 L300 95" fill="none" stroke="#3AD0C3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
                  <motion.circle cx="60" cy="160" r="4" fill="#3AD0C3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
                  <motion.circle cx="110" cy="120" r="4" fill="#3AD0C3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
                  <motion.circle cx="150" cy="135" r="4" fill="#3AD0C3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} />
                  <motion.circle cx="190" cy="90" r="4" fill="#3AD0C3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 }} />
                  <motion.circle cx="240" cy="105" r="4" fill="#3AD0C3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 }} />
                  <motion.circle cx="300" cy="70" r="4" fill="#3AD0C3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 }} />
                  <text x="40" y="60" fill="#E5F7F5" fontSize="10" fontFamily="Inter, system-ui, sans-serif" opacity="0.8">Onchain signals, clarified.</text>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container-constrained">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative order-2 md:order-1">
               <div className="absolute -inset-4 bg-muted/30 rounded-2xl -rotate-2 -z-10"></div>
               <img src={profilePic} alt="Photo of Jordan Tonani, founder of Northwest Onchain" className="w-full h-auto rounded-xl shadow-lg object-cover aspect-[4/5]" />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="order-1 md:order-2">
              <motion.p variants={fadeInUp} className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">About</motion.p>
              <motion.h2 variants={fadeInUp} className="mb-6">Wall Street roots,<br/>DeFi fluency.</motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground text-lg leading-relaxed mb-8">
                I'm Jordan Tonani. I started at Morgan Stanley, then went full-time into crypto BD — working with onchain lending platforms, structured products, and trading firms. Based in Seattle, I help serious teams build real strategies around onchain finance.
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4">
                {[
                  { icon: MessageSquare, bold: "Bilingual.", rest: "I translate between crypto-native teams and regulated institutions." },
                  { icon: Target, bold: "Outcome-driven.", rest: "Clear strategies that move the needle — not buzzwords." },
                  { icon: Shield, bold: "Selective.", rest: "I work with teams building durable, compliant onchain businesses." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 text-primary"><item.icon size={18} /></div>
                    <p className="text-sm"><span className="font-semibold text-foreground">{item.bold}</span> <span className="text-muted-foreground">{item.rest}</span></p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-16 md:py-24 bg-white border-y border-border/40">
        <div className="container-constrained">
          <div className="max-w-2xl mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Services</p>
            <h2 className="mb-3">Three ways to work together</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Rocket,
                title: "Onchain BD Sprint",
                tag: "For DeFi & crypto teams",
                desc: "A 6-week sprint to build a real partner pipeline — wallets, custodians, exchanges, RIAs — with refined messaging and targeted outreach.",
                points: ["Partner & account map for your vertical", "30–50 prioritized targets with intro paths", "Institutional messaging templates", "Live pipeline of BD conversations"],
                footer: "Fixed-fee with optional upside-aligned milestones."
              },
              {
                icon: GraduationCap,
                title: "Crypto Strategy & Education",
                tag: "For RIAs & family offices",
                desc: "Help your firm decide how to engage with crypto and give advisors the language to discuss it with clients.",
                points: ["12–24 month digital asset strategy", "Client-ready talking points & FAQs", "Team training sessions"],
                footer: "Education only. Not investment, legal, or tax advice."
              },
              {
                icon: Lightbulb,
                title: "Web3 Opportunity Lab",
                tag: "For fintechs & enterprises",
                desc: "A 4-week engagement to identify where web3 actually makes sense for your business — and where it doesn't.",
                points: ["1–2 prioritized use cases for your model", "Vendor & protocol shortlist", "Implementation roadmap (or a clear 'not now')"],
                footer: null
              }
            ].map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
                <Card className="h-full card-base border-border hover:border-primary/30 transition-all flex flex-col p-0 overflow-hidden bg-[#F8F5F0]/30">
                  <div className="h-1 w-full bg-primary/0 group-hover:bg-primary transition-all duration-300"></div>
                  <CardHeader className="pb-3 pt-7 px-7">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                      <service.icon size={20} />
                    </div>
                    <CardTitle className="text-lg mb-1">{service.title}</CardTitle>
                    <CardDescription className="text-xs font-medium text-primary">{service.tag}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-7 pb-7 flex-grow flex flex-col">
                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{service.desc}</p>
                    <ul className="space-y-2 text-muted-foreground text-sm flex-grow mb-4">
                      {service.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    {service.footer && (
                      <p className="text-xs text-muted-foreground italic border-t border-border pt-3">{service.footer}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-16 md:py-24 bg-[#050B14] text-white relative overflow-hidden">
        <div className="container-constrained relative z-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Process</p>
            <h2 className="text-white">How we work together</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-white/10 -z-10" />
            {[
              { step: "01", title: "Discovery", desc: "30-minute call to understand your goals and constraints." },
              { step: "02", title: "Diagnosis", desc: "Map your strategy, partners, and capabilities." },
              { step: "03", title: "Plan", desc: "Clear 4–12 week roadmap with priorities and owners." },
              { step: "04", title: "Execute", desc: "BD outreach, education, or opportunity mapping with regular check-ins." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative text-center md:text-left">
                <div className="w-20 h-20 bg-[#050B14] border-2 border-primary rounded-full flex items-center justify-center text-xl font-bold text-primary mb-5 mx-auto md:mx-0 shadow-[0_0_20px_rgba(58,208,195,0.15)] z-10">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-white/40 text-sm">Low base fees plus upside aligned to real business outcomes.</p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 md:py-24 bg-background">
        <div className="container-constrained">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Contact</p>
              <h2 className="mb-5 leading-tight">Let's see if there's a fit</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Tell me about your team and goals. I'll respond within 1–2 business days with next steps.
              </p>
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Prefer email?</p>
                  <a href="mailto:hello@northwestonchain.com" className="text-foreground hover:text-primary font-medium transition-colors text-sm">hello@northwestonchain.com</a>
                </div>
              </div>
            </div>

            <Card className="card-base bg-white border-border shadow-lg">
              <CardContent className="p-0">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm">Name</Label>
                      <Input id="name" name="name" placeholder="Jane Doe" required className="bg-background border-border h-11 focus:ring-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="jane@company.com" required className="bg-background border-border h-11 focus:ring-primary" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="org" className="text-sm">Organization</Label>
                      <Input id="org" name="organization" placeholder="Company" className="bg-background border-border h-11 focus:ring-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="role" className="text-sm">Role</Label>
                      <Input id="role" name="role" placeholder="Founder, CIO..." className="bg-background border-border h-11 focus:ring-primary" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="type" className="text-sm">Which best describes you?</Label>
                    <Select name="type" required>
                      <SelectTrigger className="bg-background border-border h-11 focus:ring-primary">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="defi">DeFi / crypto team</SelectItem>
                        <SelectItem value="ria">RIA / wealth firm</SelectItem>
                        <SelectItem value="family">Family office</SelectItem>
                        <SelectItem value="fintech">Fintech / enterprise</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm">How can I help?</Label>
                    <Textarea id="message" name="message" placeholder="Tell me about your team and goals..." required className="min-h-[100px] bg-background border-border resize-none focus:ring-primary" />
                  </div>
                  <Button type="submit" className="w-full btn-primary h-11 text-sm">Book a discovery call</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-[#050B14] text-white border-t border-white/10">
        <div className="container-constrained">
          <div className="flex flex-col items-center gap-4 mb-6">
            <img src="/nw-logo.png" alt="Northwest Onchain" className="h-14 w-auto brightness-0 invert" />
            <p className="text-white/50 text-sm">Based in Seattle, working with clients globally.</p>
          </div>
          <div className="text-center mb-6">
            <Button onClick={() => scrollToSection('contact')} className="btn-primary text-sm">Book a discovery call</Button>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-white/35 mb-2">© {new Date().getFullYear()} Northwest Onchain. All rights reserved.</p>
            <p className="text-xs text-white/25 max-w-xl mx-auto">
              Northwest Onchain provides education and consulting services only. Nothing on this site is individualized investment, legal, or tax advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
