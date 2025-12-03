import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Menu, X, ExternalLink, Network, Shield, MessageSquare, Target, Users, Building2, Briefcase, Rocket, GraduationCap, Lightbulb, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import profilePic from "@assets/generated_images/professional_headshot_of_a_consultant_in_a_modern_setting.png";
import heroIllustration from "@assets/generated_images/minimalist_abstract_mountain_and_network_illustration_for_hero_section.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: result.message,
        });
        e.currentTarget.reset();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      {/* NAVIGATION */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border py-3 shadow-sm" : "bg-[#050B14] py-6 border-b border-white/10"
        }`}
      >
        <div className="container-constrained flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Northwest Onchain Hub" className="h-12 w-auto" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Services", "Who I Work With", "Process", "Contact"].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? 'text-muted-foreground' : 'text-white/80 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
            <Button onClick={() => scrollToSection('contact')} className="btn-primary h-auto text-sm">
              Book a 30-minute discovery call
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-background border-b border-border px-4 py-4 shadow-lg"
          >
            <div className="flex flex-col gap-4">
              {["About", "Services", "Who I Work With", "Process", "Contact"].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                  className="text-left text-sm font-medium text-foreground hover:text-primary py-2"
                >
                  {item}
                </button>
              ))}
              <Button onClick={() => scrollToSection('contact')} className="w-full btn-primary">
                Book a 30-minute discovery call
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#050B14] text-white">
        <div className="container-constrained relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.h1 variants={fadeInUp} className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Bridging DeFi and serious capital in the Pacific Northwest
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-white/80 mb-8 text-lg md:text-xl leading-relaxed">
                Northwest Onchain Hub helps DeFi teams, RIAs, family offices, and forward-looking businesses turn onchain finance into real clients, partners, and defensible strategy.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  Onchain BD for DeFi & crypto teams
                </span>
                <span className="px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm font-medium border border-white/10">
                  Crypto strategy & education for RIAs & family offices
                </span>
                <span className="px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm font-medium border border-white/10">
                  Web3 opportunity mapping for fintechs & enterprises
                </span>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => scrollToSection('contact')} className="btn-primary text-base">
                  Book a 30-minute discovery call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-full px-6 py-3 h-auto">
                  Download services overview
                </Button>
              </motion.div>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-square bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 p-12">
                 <img 
                   src={heroIllustration} 
                   alt="Northwest Onchain Hub Illustration" 
                   className="w-full h-auto opacity-90 drop-shadow-[0_0_30px_rgba(58,208,195,0.3)]"
                 />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section-spacing bg-background">
        <div className="container-constrained">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-4">About Northwest Onchain Hub</h2>
            <p className="text-primary text-lg font-medium">A bridge between Wall Street, DeFi, and the Pacific Northwest</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative order-2 md:order-1"
            >
               <div className="absolute -inset-4 bg-muted/30 rounded-2xl -rotate-2 -z-10"></div>
               <img 
                  src={profilePic} 
                  alt="Photo of Jordan Tonani, founder of Northwest Onchain Hub" 
                  className="w-full h-auto rounded-xl shadow-lg object-cover aspect-[4/5]"
                />
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 md:order-2"
            >
              <div className="space-y-5 text-muted-foreground text-lg leading-relaxed mb-10">
                <p>
                  I'm Jordan Tonani, the founder of Northwest Onchain Hub.
                </p>
                <p>
                  I started my career as a financial advisor at Morgan Stanley, then moved full-time into crypto and DeFi business development. I've worked with onchain lending platforms, structured products, and trading firms, and I'm deeply plugged into EVM-native DeFi, market makers, and the broader crypto ecosystem.
                </p>
                <p>
                  Based in Seattle, I help DeFi teams, RIAs, family offices, and fintechs in the Pacific Northwest and beyond build real strategies around onchain finance—without the hype or the degen risk.
                </p>
              </div>

              <div className="card-base bg-white">
                <h3 className="text-lg font-semibold mb-5 text-foreground">What this means for you</h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 text-primary">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">I speak both languages.</span>
                      <span className="text-muted-foreground"> I can translate between crypto-native teams and regulated, risk-aware institutions.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 text-primary">
                      <Target size={20} />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">I focus on outcomes, not noise.</span>
                      <span className="text-muted-foreground"> Fewer buzzwords, more clear strategies, integrations, and conversations that move the needle.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 text-primary">
                      <Shield size={20} />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">I'm selective.</span>
                      <span className="text-muted-foreground"> I work with teams and firms that want to build durable, compliant, long-term onchain businesses.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="section-spacing bg-white border-y border-border/40">
        <div className="container-constrained">
          <div className="max-w-2xl mb-16">
            <h2 className="mb-4">Services</h2>
            <p className="text-muted-foreground text-lg">Productized ways to work together</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Service Card 1: Onchain BD Sprint */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <Card className="h-full card-base border-border hover:border-primary/30 transition-all flex flex-col p-0 overflow-hidden bg-[#F8F5F0]/30">
                <div className="h-1 w-full bg-primary/0 group-hover:bg-primary transition-all duration-300"></div>
                <CardHeader className="pb-4 pt-8 px-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                    <Rocket size={24} />
                  </div>
                  <CardTitle className="text-xl mb-2">Onchain BD Sprint</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">
                    For DeFi, crypto, and onchain infra teams
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex-grow flex flex-col">
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    A 6-week, focused business development sprint to turn scattered conversations into a real pipeline of partners and integrations. We map your ideal partners (wallets, custodians, exchanges, prop shops, RIAs, FOs), refine your institutional narrative, and run targeted outreach so you end up with actual meetings, not just a Discord funnel.
                  </p>
                  
                  <p className="text-sm font-semibold text-foreground mb-3">You'll leave with:</p>
                  <ul className="space-y-2 text-muted-foreground text-sm flex-grow mb-6">
                    {[
                      "A clear partner and account map for your vertical",
                      "A prioritized list of 30–50 targets and intro paths",
                      "Refined institutional messaging and outreach templates",
                      "A live pipeline of qualified BD conversations"
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground italic border-t border-border pt-4">
                    Pricing: fixed-fee sprint with optional upside-aligned milestones.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service Card 2: Crypto Strategy & Education */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <Card className="h-full card-base border-border hover:border-primary/30 transition-all flex flex-col p-0 overflow-hidden bg-[#F8F5F0]/30">
                <div className="h-1 w-full bg-primary/0 group-hover:bg-primary transition-all duration-300"></div>
                <CardHeader className="pb-4 pt-8 px-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                    <GraduationCap size={24} />
                  </div>
                  <CardTitle className="text-xl mb-2">Crypto Strategy & Education Program</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">
                    For RIAs, wealth firms, and family offices
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex-grow flex flex-col">
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    A firm-level program to help RIAs and family offices decide how they will (and won't) engage with crypto and onchain finance—and to give advisors the language to talk about it with clients. We combine a strategy intensive, advisor education sessions, and client-ready materials so your partners have a clear, defensible stance.
                  </p>
                  
                  <p className="text-sm font-semibold text-foreground mb-3">You'll leave with:</p>
                  <ul className="space-y-2 text-muted-foreground text-sm flex-grow mb-6">
                    {[
                      "A written 12–24 month digital asset / onchain strategy tailored to your firm",
                      "Simple talking points and FAQs advisors can use with clients",
                      "Training sessions that raise the floor of crypto literacy across the team"
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground italic border-t border-border pt-4">
                    Education only. Nothing here is individualized investment, legal, or tax advice.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service Card 3: Web3 Opportunity Lab */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <Card className="h-full card-base border-border hover:border-primary/30 transition-all flex flex-col p-0 overflow-hidden bg-[#F8F5F0]/30">
                <div className="h-1 w-full bg-primary/0 group-hover:bg-primary transition-all duration-300"></div>
                <CardHeader className="pb-4 pt-8 px-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                    <Lightbulb size={24} />
                  </div>
                  <CardTitle className="text-xl mb-2">Web3 Opportunity Lab</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">
                    For fintechs and forward-looking enterprises
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex-grow flex flex-col">
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    A 4-week lab-style engagement to identify where (if anywhere) web3 and onchain finance actually make sense for your business. We explore concrete use cases—tokenization, onchain settlement, loyalty, data—and pressure-test them for business value, feasibility, and regulatory sanity.
                  </p>
                  
                  <p className="text-sm font-semibold text-foreground mb-3">You'll leave with:</p>
                  <ul className="space-y-2 text-muted-foreground text-sm flex-grow mb-6">
                    {[
                      "1–2 prioritized web3 / onchain use cases mapped to your business model",
                      "A short list of vendors, protocols, and partners worth talking to",
                      "A 6–12 month implementation roadmap—or a clear \"not now\" if it doesn't pencil out"
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <Button onClick={() => scrollToSection('contact')} className="btn-primary">
              Book a 30-minute discovery call
            </Button>
          </div>
        </div>
      </section>

      {/* WHO I WORK WITH SECTION */}
      <section id="who-i-work-with" className="section-spacing bg-background">
        <div className="container-constrained">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-6">Who this is for</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-base text-center hover:shadow-md transition-shadow bg-white"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Users size={28} />
              </div>
              <h3 className="text-lg font-bold mb-3">DeFi & crypto teams</h3>
              <p className="text-muted-foreground text-sm">
                Onchain lending, structured products, DeFi protocols, infrastructure providers, and data platforms that need institutional-grade BD.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-base text-center hover:shadow-md transition-shadow bg-white"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Building2 size={28} />
              </div>
              <h3 className="text-lg font-bold mb-3">RIAs & family offices</h3>
              <p className="text-muted-foreground text-sm">
                Wealth managers who want a sane, defensible way to talk about crypto and onchain finance with clients.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card-base text-center hover:shadow-md transition-shadow bg-white"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Briefcase size={28} />
              </div>
              <h3 className="text-lg font-bold mb-3">Fintechs & enterprises</h3>
              <p className="text-muted-foreground text-sm">
                Teams exploring tokenization, stablecoins, or web3 features and looking for a clear decision on what's worth building.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="section-spacing bg-[#050B14] text-white relative overflow-hidden">
        <div className="container-constrained relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-white mb-6">How we work together</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-white/10 -z-10" />
            
            {[
              { step: "01", title: "Discovery", desc: "A 30–45 minute call to understand your goals, constraints, and what 'success' looks like." },
              { step: "02", title: "Diagnosis", desc: "We map your current situation across strategy, partners, and internal capabilities." },
              { step: "03", title: "Plan", desc: "You get a clear 4–12 week roadmap: priorities, owners, and how we'll measure progress." },
              { step: "04", title: "Execute", desc: "We run the sprint: BD outreach, education, or opportunity mapping—with regular check-ins and concrete deliverables." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center md:text-left"
              >
                <div className="w-24 h-24 bg-[#050B14] border-2 border-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary mb-6 mx-auto md:mx-0 shadow-[0_0_20px_rgba(58,208,195,0.2)] z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-white/60 text-sm max-w-2xl mx-auto">
              Most engagements are designed as low base fees plus upside aligned to adoption and real business outcomes, not hype.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section-spacing bg-background">
        <div className="container-constrained">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="mb-6 leading-tight">Let's see if there's a fit</h2>
              <div className="space-y-5 text-muted-foreground text-lg leading-relaxed mb-8">
                <p>
                  If you're a DeFi team, RIA, family office, or business in the Pacific Northwest (or beyond) trying to get serious about onchain finance, I'd love to hear what you're working on.
                </p>
                <p>
                  Share a bit about your team and goals, and I'll respond with next steps or a link to schedule a 30-minute discovery call.
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-8 p-4 bg-white rounded-lg border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prefer email?</p>
                  <a href="mailto:hello@northwestonchainhub.com" className="text-foreground hover:text-primary font-medium transition-colors">
                    hello@northwestonchainhub.com
                  </a>
                </div>
              </div>
            </div>

            <Card className="card-base bg-white border-border shadow-lg">
              <CardContent className="p-0">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Jane Doe" required className="bg-background border-border h-12 focus:ring-primary" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="jane@company.com" required className="bg-background border-border h-12 focus:ring-primary" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="org">Organization</Label>
                      <Input id="org" name="organization" placeholder="Company Ltd." className="bg-background border-border h-12 focus:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" name="role" placeholder="Founder, CIO..." className="bg-background border-border h-12 focus:ring-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Which best describes you?</Label>
                    <Select name="type" required>
                      <SelectTrigger className="bg-background border-border h-12 focus:ring-primary">
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

                  <div className="space-y-2">
                    <Label htmlFor="message">What do you want help with?</Label>
                    <Textarea id="message" name="message" placeholder="Tell me about your team and goals..." required className="min-h-[120px] bg-background border-border resize-none focus:ring-primary" />
                  </div>

                  <Button type="submit" className="w-full btn-primary h-12 text-base">
                    Book a 30-minute discovery call
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#050B14] text-white border-t border-white/10">
        <div className="container-constrained">
          <div className="flex flex-col items-center gap-6 mb-8">
             <div className="flex items-center">
                <img src="/logo.svg" alt="Northwest Onchain Hub" className="h-16 w-auto" />
              </div>
              <p className="text-white/60 max-w-md mx-auto text-center">
                Based in Seattle, working with clients globally.
              </p>
          </div>
          <div className="text-center mb-8">
            <Button onClick={() => scrollToSection('contact')} className="btn-primary">
               Book a 30-minute discovery call
            </Button>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-white/40 mb-4">© {new Date().getFullYear()} Northwest Onchain Hub. All rights reserved.</p>
            <p className="text-xs text-white/30 max-w-2xl mx-auto leading-relaxed">
              Northwest Onchain Hub provides education and consulting services only. Nothing on this site or in our engagements is individualized investment, legal, or tax advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
