import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Menu, X, ExternalLink, Network, Shield, BarChart3, GraduationCap, Briefcase, Building2, Users, Mountain, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@assets/generated_images/misty_pacific_northwest_forest_landscape_with_subtle_digital_overlay.png";
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
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#050B14] text-white">
        <div className="container-constrained relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide border border-primary/20 uppercase">
                  Seattle-based Advisory
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="mb-6 text-white">
                Onchain BD & crypto education for RIAs, family offices, and DeFi teams in the Pacific Northwest.
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-white/80 mb-10 max-w-lg leading-relaxed">
                A Seattle-based advisory helping DeFi teams, RIAs, and family offices bridge TradFi and onchain finance with clarity, integrity, and strategic foresight.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => scrollToSection('contact')} className="btn-primary text-base">
                  Book a 30-minute discovery call
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
                 {/* Placeholder for the abstract mountain/network illustration */}
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

      {/* About Section */}
      <section id="about" className="section-spacing bg-background">
        <div className="container-constrained">
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
                  alt="Jordan Tonani" 
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
              <h2 className="mb-6 text-foreground">Bridging Wall Street and DeFi</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
                <p>
                  I’m Jordan, a former Morgan Stanley advisor now working full-time in crypto and DeFi BD. Northwest Onchain Hub is my small advisory focused on onchain BD and crypto education for serious institutions in the Pacific Northwest and beyond.
                </p>
                <p>
                  Based in Seattle, I bring a grounded, long-term perspective to a fast-moving industry. My expertise lies in onchain structured products, DeFi lending markets, and building bridges between traditional finance and the new digital economy.
                </p>
              </div>

              <div className="card-base bg-white">
                <h3 className="text-lg font-semibold mb-4 text-foreground">What this means for you</h3>
                <ul className="space-y-4">
                  {[
                    { icon: Shield, text: "Practical, compliance-aware frameworks — not hype." },
                    { icon: Network, text: "Warm access to real onchain and institutional players." },
                    { icon: Compass, text: "Clear roadmaps your team can execute immediately." }
                  ].map((item, i) => (
                    <motion.li key={i} variants={fadeInUp} className="flex items-start gap-4">
                      <div className="mt-1 text-primary">
                        <item.icon size={20} />
                      </div>
                      <span className="text-base text-foreground pt-0.5">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8">
                <Button onClick={() => scrollToSection('contact')} className="btn-primary">
                  Book a 30-minute discovery call
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-spacing bg-white border-y border-border/40">
        <div className="container-constrained">
          <div className="max-w-2xl mb-16">
            <h2 className="mb-4">Services</h2>
            <p className="text-muted-foreground">Strategic guidance for three distinct worlds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Onchain / DeFi BD",
                sub: "For protocols & crypto-native products",
                icon: Briefcase,
                points: [
                  "Fractional Head of BD",
                  "Partnership & integration strategy",
                  "Go-to-market for new products",
                  "Institutional narrative refinement"
                ],
                quote: "Turn scattered conversations into a focused pipeline."
              },
              {
                title: "RIA & Family Office Education",
                sub: "For wealth managers & CIOs",
                icon: GraduationCap,
                points: [
                  "Client-ready workshops (101 → 201)",
                  "Risk & due diligence frameworks",
                  "Client communication strategy",
                  "Integration roadmaps (12–24 mo)"
                ],
                quote: "Education only. Not investment advice."
              },
              {
                title: "Corporate Onchain Strategy",
                sub: "For traditional enterprises",
                icon: BarChart3,
                points: [
                  "Identify high-impact onchain use cases",
                  "Tokenization strategy & vendor selection",
                  "Stablecoin settlement integration",
                  "Competitive landscape analysis"
                ],
                quote: "Move from 'exploring' to 'executing' with confidence."
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Card className="h-full card-base border-border hover:border-primary/30 transition-all flex flex-col p-0 overflow-hidden bg-[#F8F5F0]/30">
                  <div className="h-1 w-full bg-primary/0 group-hover:bg-primary transition-all duration-300"></div>
                  <CardHeader className="pb-4 pt-8 px-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                      <service.icon />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-sm font-medium text-primary">
                      {service.sub}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 flex-grow flex flex-col">
                    <ul className="space-y-3 text-muted-foreground text-sm flex-grow mb-6">
                      {service.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-muted-foreground italic border-t border-border pt-4">
                      "{service.quote}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button onClick={() => scrollToSection('contact')} className="btn-primary">
              Book a 30-minute discovery call
            </Button>
          </div>
        </div>
      </section>

      {/* Who I Work With */}
      <section id="who-i-work-with" className="section-spacing bg-background">
        <div className="container-constrained">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-6">Who This Is For</h2>
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
                className="card-base text-center hover:shadow-md transition-shadow bg-white"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <item.icon size={28} />
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section-spacing bg-[#050B14] text-white relative overflow-hidden">
        <div className="container-constrained relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-white mb-6">Simple, no-nonsense process</h2>
            <p className="text-white/70">Clear steps to results.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-white/10 -z-10" />
            
            {[
              { step: "01", title: "Discovery", desc: "30–45 minute working session to understand your goals." },
              { step: "02", title: "Diagnosis", desc: "Map your current positioning and opportunities." },
              { step: "03", title: "Plan", desc: "Co-create a 60–90 day roadmap with clear priorities." },
              { step: "04", title: "Execute", desc: "Hands-on BD and education with measurable outcomes." },
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-spacing bg-background">
        <div className="container-constrained">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="mb-6 leading-tight">Let's see if there's a <span className="text-primary">fit</span></h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Share a bit about your team and what you’re building or solving for. I’ll respond within 1–2 business days with next steps.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-primary shadow-sm">
                    <Network size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Social</p>
                    <a href="#" className="text-foreground hover:text-primary font-medium transition-colors">LinkedIn / Twitter</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-primary shadow-sm">
                    <ExternalLink size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:hello@northwestonchain.com" className="text-foreground hover:text-primary font-medium transition-colors">hello@[placeholder].com</a>
                  </div>
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
                    <Textarea id="message" name="message" placeholder="Briefly describe your goals..." required className="min-h-[120px] bg-background border-border resize-none focus:ring-primary" />
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

      {/* Footer */}
      <footer className="py-12 bg-[#050B14] text-white text-center border-t border-white/10">
        <div className="container-constrained">
          <div className="flex flex-col items-center gap-6 mb-8">
             <div className="flex items-center">
                <img src="/logo.svg" alt="Northwest Onchain Hub" className="h-16 w-auto" />
              </div>
              <p className="text-white/60 max-w-md mx-auto">
                Bridging TradFi and onchain finance in the Pacific Northwest.
              </p>
          </div>
          <Button onClick={() => scrollToSection('contact')} className="btn-primary mb-8">
             Book a 30-minute discovery call
          </Button>
          <p className="text-sm text-white/40">© {new Date().getFullYear()} Northwest Onchain Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
