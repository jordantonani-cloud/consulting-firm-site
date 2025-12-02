import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Menu, X, ChevronRight, ExternalLink, Network, Shield, BarChart3, GraduationCap, Briefcase, Building2, Users, Mountain, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@assets/generated_images/misty_pacific_northwest_forest_landscape_with_subtle_digital_overlay.png";
import profilePic from "@assets/generated_images/professional_headshot_of_a_consultant_in_a_modern_setting.png";
import logo from "@assets/logoNOH_1764694906737.png";

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thanks for reaching out. I'll get back to you within 1-2 business days.",
    });
    // Reset form logic would go here
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5 py-3 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Northwest Onchain Hub" className="h-12 w-auto" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Services", "Who I Work With", "Process", "Contact"].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
            <Button onClick={() => scrollToSection('contact')} className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
              Book a call
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-foreground p-2">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-background border-b border-border px-4 py-4"
          >
            <div className="flex flex-col gap-4">
              {["About", "Services", "Who I Work With", "Process", "Contact"].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-primary py-2"
                >
                  {item}
                </button>
              ))}
              <Button onClick={() => scrollToSection('contact')} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Book a call
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40 z-10" />
          <img 
            src={heroBg} 
            alt="Misty Forest Background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide border border-primary/20">
                ONCHAIN / DEFI BD
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide border border-white/5">
                CORPORATE STRATEGY & EDUCATION
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6 text-foreground">
              Onchain Strategy from the <span className="text-primary">Pacific Northwest</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Helping protocols, enterprises, and family offices navigate the digital asset frontier with clarity, integrity, and strategic foresight.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollToSection('contact')} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base h-12 px-8">
                Book a call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5 text-foreground text-base h-12 px-8">
                Download services overview
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-background relative border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative"
            >
               <div className="absolute -inset-4 bg-primary/5 rounded-2xl rotate-3 blur-sm -z-10"></div>
               <img 
                  src={profilePic} 
                  alt="Jordan Tonani" 
                  className="w-full h-auto rounded-xl border border-white/10 shadow-2xl object-cover aspect-[4/5]"
                />
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Bridging Wall Street and DeFi</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
                <p>
                  I’m Jordan Tonani. I started my career as a financial advisor at Morgan Stanley before going full-time into crypto and DeFi.
                </p>
                <p>
                  Based in the Pacific Northwest, I bring a grounded, long-term perspective to a fast-moving industry. My expertise lies in onchain structured products, DeFi lending markets, and building bridges between traditional finance and the new digital economy.
                </p>
                <p>
                  Whether you're a protocol looking to grow or a traditional firm looking to understand, I speak both languages fluently.
                </p>
              </div>

              <div className="bg-card border border-white/5 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6 text-foreground">What this means for you</h3>
                <ul className="space-y-4">
                  {[
                    { icon: Shield, text: "Practical, compliance-aware frameworks — not hype." },
                    { icon: Network, text: "Warm access to real onchain and institutional players." },
                    { icon: Compass, text: "Clear roadmaps your team can execute immediately." }
                  ].map((item, i) => (
                    <motion.li key={i} variants={fadeInUp} className="flex items-start gap-4">
                      <div className="mt-1 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary border border-primary/20">
                        <item.icon size={16} />
                      </div>
                      <span className="text-base text-card-foreground pt-1">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
            <p className="text-muted-foreground text-lg">Strategic guidance for three distinct worlds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Service Card A */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group hover:border-primary/50 transition-colors duration-300"
            >
              <Card className="h-full bg-card border-white/5 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Network size={100} />
                </div>
                <CardHeader className="pb-4 relative z-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 border border-primary/20">
                    <Briefcase />
                  </div>
                  <CardTitle className="text-xl md:text-2xl mb-2">Onchain / DeFi BD</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">
                    For protocols & crypto-native products
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 space-y-6 flex-grow">
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    {[
                      "Fractional Head of BD",
                      "Partnership & integration strategy",
                      "Go-to-market for new products",
                      "Institutional narrative refinement"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto border-t border-white/5 relative z-10">
                    <p className="text-card-foreground font-medium italic text-sm mt-4">
                      "Turn scattered conversations into a focused pipeline."
                    </p>
                </div>
              </Card>
            </motion.div>

            {/* Service Card B */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group hover:border-primary/50 transition-colors duration-300"
            >
              <Card className="h-full bg-card border-white/5 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap size={100} />
                </div>
                <CardHeader className="pb-4 relative z-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 border border-primary/20">
                    <Building2 />
                  </div>
                  <CardTitle className="text-xl md:text-2xl mb-2">RIA & Family Office Education</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">
                    For wealth managers & CIOs
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 space-y-6 flex-grow">
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    {[
                      "Client-ready workshops (101 → 201)",
                      "Risk & due diligence frameworks",
                      "Client communication strategy",
                      "Integration roadmaps (12–24 mo)"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                 <div className="p-6 pt-0 mt-auto border-t border-white/5 relative z-10">
                    <p className="text-xs text-muted-foreground opacity-70 mt-4">
                      Education only. Not investment advice.
                    </p>
                </div>
              </Card>
            </motion.div>

             {/* Service Card C */}
             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group hover:border-primary/50 transition-colors duration-300"
            >
              <Card className="h-full bg-card border-white/5 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BarChart3 size={100} />
                </div>
                <CardHeader className="pb-4 relative z-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 border border-primary/20">
                    <Compass />
                  </div>
                  <CardTitle className="text-xl md:text-2xl mb-2">Corporate Onchain Strategy</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">
                    For traditional enterprises
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 space-y-6 flex-grow">
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    {[
                      "Identify high-impact onchain use cases",
                      "Tokenization strategy & vendor selection",
                      "Stablecoin settlement integration",
                      "Competitive landscape analysis"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto border-t border-white/5 relative z-10">
                    <p className="text-card-foreground font-medium italic text-sm mt-4">
                      "Move from 'exploring' to 'executing' with confidence."
                    </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who I Work With */}
      <section id="who-i-work-with" className="py-20 md:py-32 bg-background border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Who This Is For</h2>
            <p className="text-muted-foreground text-lg">
              If you sit between TradFi and DeFi and need someone who understands both worlds, we should talk.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Crypto & DeFi Teams",
                desc: "Lending protocols, structured product issuers, L1s/L2s, infra and data providers.",
                icon: Users
              },
              {
                title: "Wealth & Advisory Firms",
                desc: "RIAs, independent advisors, multi-family offices, CIOs looking to educate their teams.",
                icon: Building2
              },
              {
                title: "Traditional Enterprises",
                desc: "Corporations looking to leverage stablecoins, tokenization, or onchain loyalty.",
                icon: Briefcase
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-muted/20 border border-white/5 p-8 rounded-xl text-center hover:bg-muted/30 transition-colors"
              >
                <div className="w-16 h-16 mx-auto bg-background rounded-full flex items-center justify-center mb-6 text-primary shadow-sm border border-white/5">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Simple, no-nonsense process</h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />
            
            {[
              { step: "01", title: "Discovery", desc: "30–45 minute working session to understand your goals, constraints, and timelines." },
              { step: "02", title: "Diagnosis", desc: "Map your current positioning, relationships, and opportunities across DeFi / advisor channels." },
              { step: "03", title: "Plan", desc: "Co-create a 60–90 day roadmap with clear priorities and responsibilities." },
              { step: "04", title: "Execute", desc: "Hands-on BD, intros, and education — with weekly check-ins and measurable outcomes." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-background md:bg-transparent p-6 md:p-0 rounded-xl border border-white/5 md:border-none"
              >
                <div className="w-24 h-24 bg-background border border-primary/20 rounded-full flex items-center justify-center text-2xl font-bold text-primary mb-6 mx-auto md:mx-0 shadow-[0_0_30px_-10px_rgba(var(--primary),0.3)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
             <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                Available for project-based scope or fractional retainer
             </span>
          </div>
        </div>
      </section>

      {/* Testimonials (Placeholder) */}
      <section className="py-20 bg-background border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Results that actually matter</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { role: "Head of BD, DeFi Protocol", quote: "Jordan bridged the gap between our technical team and institutional partners perfectly. He speaks both languages fluently." },
              { role: "Founder, Crypto Infra Startup", quote: "Within 60 days, we had a clear GTM strategy and warm intros to three major custodians. Highly recommended." },
              { role: "CIO, Multi-Family Office", quote: "The educational workshops cut through the noise. Finally, we have a framework for understanding digital assets without the hype." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-card border-white/5">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(star => (
                        <svg key={star} className="w-4 h-4 text-primary fill-primary" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-muted-foreground italic mb-6">"{item.quote}"</p>
                    <p className="text-sm font-semibold text-foreground">{item.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-muted/30 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Let's see if there's a <span className="text-primary">fit</span></h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Share a bit about your team and what you’re building or solving for. I’ll respond within 1–2 business days with next steps or a link to schedule a call.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center text-primary">
                    <Network size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Social</p>
                    <a href="#" className="text-foreground hover:text-primary font-medium">LinkedIn / Twitter</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center text-primary">
                    <ExternalLink size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:hello@northwestonchain.com" className="text-foreground hover:text-primary font-medium">hello@[placeholder].com</a>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-card border-white/5 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Jane Doe" required className="bg-background border-white/10 h-12" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jane@company.com" required className="bg-background border-white/10 h-12" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="org">Organization</Label>
                      <Input id="org" placeholder="Company Ltd." className="bg-background border-white/10 h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" placeholder="Founder, CIO..." className="bg-background border-white/10 h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Which best describes you?</Label>
                    <Select>
                      <SelectTrigger className="bg-background border-white/10 h-12">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crypto">Crypto / DeFi team</SelectItem>
                        <SelectItem value="ria">RIA / Wealth firm</SelectItem>
                        <SelectItem value="corporate">Traditional Enterprise</SelectItem>
                        <SelectItem value="family">Family office</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">What do you want help with?</Label>
                    <Textarea id="message" placeholder="Briefly describe your goals..." className="min-h-[120px] bg-background border-white/10 resize-none" />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-background text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Northwest Onchain Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
