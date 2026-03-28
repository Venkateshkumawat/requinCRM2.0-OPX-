import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  MessageSquare,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage = ({ onLogin }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/20">R</div>
            <span className="text-2xl font-black tracking-tighter">requinOpx 2.0 CRM</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <button 
            onClick={onLogin}
            className="px-6 py-2.5 bg-white text-black rounded-full font-bold text-sm hover:bg-white/90 transition-all flex items-center gap-2 group"
          >
            <span>Demo Login</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-indigo-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-primary mb-6 inline-block">
              Next Generation CRM Platform
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              UNLEASH THE POWER OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-primary bg-[length:200%_auto] animate-gradient">INTELLIGENT SALES</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary mb-12 leading-relaxed">
              requinOpx 2.0 CRM combines AI-driven insights with a seamless user experience to help your team close deals faster and build lasting relationships.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onLogin}
                className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 hover:scale-105 transition-transform flex items-center justify-center gap-3"
              >
                Get Started Free
                <ArrowRight size={20} />
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 transition-colors">
                Book a Demo
              </button>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-24 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-white/5 rounded-lg text-[10px] text-text-secondary font-mono">nexus-crm.io/dashboard</div>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" 
                alt="requinOpx 2.0 CRM Dashboard Preview" 
                className="w-full opacity-80 grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">BUILT FOR SCALE</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Everything you need to manage your entire business lifecycle in one unified platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Zap, 
                title: "AI Lead Scoring", 
                desc: "Automatically prioritize leads based on behavior and conversion probability using our proprietary ML models.",
                color: "text-amber-500",
                bg: "bg-amber-500/10"
              },
              { 
                icon: BarChart3, 
                title: "Real-time Analytics", 
                desc: "Deep dive into your sales performance with interactive charts and custom reporting tools updated in real-time.",
                color: "text-primary",
                bg: "bg-primary/10"
              },
              { 
                icon: Shield, 
                title: "Enterprise Security", 
                desc: "Bank-grade encryption and role-based access control ensure your sensitive customer data stays protected.",
                color: "text-emerald-500",
                bg: "bg-emerald-500/10"
              },
              { 
                icon: Users, 
                title: "Team Collaboration", 
                desc: "Seamless communication hub with shared task management and internal messaging for high-velocity teams.",
                color: "text-indigo-500",
                bg: "bg-indigo-500/10"
              },
              { 
                icon: Globe, 
                title: "Omnichannel Sync", 
                desc: "Connect with customers across Email, WhatsApp, and Phone from a single unified interface.",
                color: "text-rose-500",
                bg: "bg-rose-500/10"
              },
              { 
                icon: LayoutDashboard, 
                title: "Custom Workflows", 
                desc: "Build and automate complex business processes with our intuitive drag-and-drop workflow engine.",
                color: "text-violet-500",
                bg: "bg-violet-500/10"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:border-primary/50 transition-all group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", feature.bg, feature.color)}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-bold text-text-secondary uppercase tracking-[0.3em] mb-12">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale">
            <span className="text-3xl font-black tracking-tighter">TECHNOVA</span>
            <span className="text-3xl font-black tracking-tighter">URBANCART</span>
            <span className="text-3xl font-black tracking-tighter">GLOBALCORP</span>
            <span className="text-3xl font-black tracking-tighter">NEXUS.AI</span>
            <span className="text-3xl font-black tracking-tighter">FINFLOW</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary/20 to-indigo-500/20 border border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,169,255,0.1)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">READY TO TRANSFORM <br /> YOUR SALES?</h2>
            <p className="text-xl text-text-secondary mb-12 max-w-xl mx-auto">Join over 10,000+ companies scaling their operations with requinOpx 2.0 CRM.</p>
            <button 
              onClick={onLogin}
              className="px-12 py-5 bg-white text-black rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-white/10"
            >
              Start Your Free Trial
            </button>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-text-secondary font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> No credit card required</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> 14-day free trial</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl">R</div>
              <span className="text-xl font-black tracking-tighter">requinOpx 2.0 CRM</span>
            </div>
            <p className="text-text-secondary max-w-sm leading-relaxed">
              The world's most advanced CRM platform for high-growth teams. Built with speed, intelligence, and security at its core.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Product</h4>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Solutions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-secondary text-xs">© 2024 requinOpx 2.0 CRM Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <MessageSquare size={20} className="text-text-secondary hover:text-white cursor-pointer transition-colors" />
            <Globe size={20} className="text-text-secondary hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};
