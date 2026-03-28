import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  TrendingUp, 
  MessageSquare, 
  Ticket as TicketIcon, 
  UserCircle, 
  FolderKanban, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  LogOut,
  ChevronRight,
  Plus,
  Download,
  Mail,
  Phone,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Role } from './types';
import { cn, formatCurrency } from './lib/utils';

// Mock Data Imports
import { leads as initialLeads, clients as initialClients, deals as initialDeals, tickets as initialTickets, employees as initialEmployees, tasks as initialTasks, invoices as initialInvoices } from './data';
import { 
  LeadsModule, 
  ClientsModule, 
  PipelineModule, 
  SupportModule, 
  HRModule, 
  ProjectsModule, 
  BillingModule, 
  ReportsModule 
} from './components/Modules';
import { LandingPage } from './components/LandingPage';
import { Lead, Client, Deal, Ticket, Employee, Task, Invoice } from './types';

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick, 
  collapsed 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void,
  collapsed: boolean,
  key?: string
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full p-3 rounded-xl transition-all duration-200 group relative",
      active 
        ? "bg-primary text-white shadow-lg shadow-primary/30" 
        : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
    )}
  >
    <Icon size={20} className={cn("min-w-[20px]", active ? "" : "group-hover:scale-110 transition-transform")} />
    {!collapsed && (
      <span className="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all duration-300">
        {label}
      </span>
    )}
    {collapsed && (
      <div className="absolute left-full ml-4 px-2 py-1 bg-card border border-border rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
        {label}
      </div>
    )}
  </button>
);

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon size={24} className="text-white" />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
        change > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
      )}>
        {change > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {Math.abs(change)}%
      </div>
    </div>
    <div>
      <p className="text-text-secondary text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  </div>
);

// --- Modules ---

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const revenueData = [
  { name: 'Oct', value: 450000 },
  { name: 'Nov', value: 520000 },
  { name: 'Dec', value: 480000 },
  { name: 'Jan', value: 610000 },
  { name: 'Feb', value: 750000 },
  { name: 'Mar', value: 820000 },
];

const Dashboard = ({ role }: { role: Role }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {role}</h1>
          <p className="text-text-secondary mt-1">Here's what's happening in your organization today.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-border rounded-xl hover:bg-white/10 transition-colors">
            <Download size={18} />
            <span>Export Report</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity">
            <Plus size={18} />
            <span>New Action</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Monthly Revenue" 
          value={formatCurrency(1250000)} 
          change={12.5} 
          icon={TrendingUp} 
          color="bg-primary" 
        />
        <StatCard 
          title="Active Leads" 
          value="145" 
          change={8.2} 
          icon={Users} 
          color="bg-indigo-500" 
        />
        <StatCard 
          title="Conversion Rate" 
          value="32%" 
          change={-2.4} 
          icon={Zap} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Open Tickets" 
          value="23" 
          change={5.1} 
          icon={TicketIcon} 
          color="bg-rose-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Revenue Growth (₹)</h3>
            <select className="bg-white/5 border border-border rounded-lg px-3 py-1 text-sm outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValueDash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A9FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00A9FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#E2E8F0' }}
                />
                <Area type="monotone" dataKey="value" stroke="#00A9FF" fillOpacity={1} fill="url(#colorValueDash)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6">AI Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <div className="flex items-center gap-2 text-primary font-bold mb-1">
                <Zap size={16} />
                <span>Lead Scoring</span>
              </div>
              <p className="text-sm text-text-primary">Raj Sharma is 78% likely to convert. Recommend sending the proposal today.</p>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <div className="flex items-center gap-2 text-amber-500 font-bold mb-1">
                <AlertCircle size={16} />
                <span>SLA Warning</span>
              </div>
              <p className="text-sm text-text-primary">3 tickets for TechNova are nearing SLA deadline. Assign more resources.</p>
            </div>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-500 font-bold mb-1">
                <CheckCircle2 size={16} />
                <span>Performance</span>
              </div>
              <p className="text-sm text-text-primary">Sales team hit 95% of monthly target. 5 days remaining.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <button className="text-primary text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <UserCircle size={20} className="text-text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-bold">Vikram Singh</span> assigned a new lead <span className="text-primary font-medium">Amit Patel</span> to the pipeline.
                  </p>
                  <p className="text-xs text-text-secondary mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Upcoming Meetings</h3>
            <button className="text-primary text-sm font-medium hover:underline">Schedule</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="text-center px-3 py-1 bg-primary/20 text-primary rounded-lg">
                  <p className="text-xs font-bold">MAR</p>
                  <p className="text-lg font-black">28</p>
                </div>
                <div>
                  <p className="font-bold">Proposal Review</p>
                  <p className="text-xs text-text-secondary">with Priya Mehta • 02:00 PM</p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="text-center px-3 py-1 bg-indigo-500/20 text-indigo-500 rounded-lg">
                  <p className="text-xs font-bold">MAR</p>
                  <p className="text-lg font-black">29</p>
                </div>
                <div>
                  <p className="font-bold">Sprint Planning</p>
                  <p className="text-xs text-text-secondary">Internal Team • 10:00 AM</p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Toaster, toast } from 'sonner';

// --- Main App ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<Role>('Admin');
  const [activeModule, setActiveModule] = useState('Dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // CRM State
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

  const modules = [
    { id: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Sales', 'HR', 'Support'] },
    { id: 'Leads', icon: Users, roles: ['Admin', 'Sales'] },
    { id: 'Clients', icon: Briefcase, roles: ['Admin', 'Sales'] },
    { id: 'Sales Pipeline', icon: TrendingUp, roles: ['Admin', 'Sales'] },
    { id: 'Communication', icon: MessageSquare, roles: ['Admin', 'Sales', 'Support'] },
    { id: 'Support', icon: TicketIcon, roles: ['Admin', 'Support'] },
    { id: 'HR Ops', icon: UserCircle, roles: ['Admin', 'HR'] },
    { id: 'Projects', icon: FolderKanban, roles: ['Admin', 'HR', 'Sales'] },
    { id: 'Billing', icon: CreditCard, roles: ['Admin'] },
    { id: 'Reports', icon: BarChart3, roles: ['Admin', 'Sales', 'HR'] },
  ];

  const filteredModules = modules.filter(m => m.roles.includes(role));

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className={cn("min-h-screen flex transition-colors duration-300", isDarkMode ? "dark bg-background text-text-primary" : "bg-slate-50 text-slate-900")}>
      <Toaster position="top-right" theme={isDarkMode ? 'dark' : 'light'} />
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 glass-card border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl">R</div>
            {!collapsed && <span className="text-xl font-black tracking-tighter">requinOpx 2.0 CRM</span>}
          </div>
          {!collapsed && (
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-primary transition-colors"
              title="Back to Landing Page"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 custom-scrollbar overflow-y-auto">
          {filteredModules.map((m) => (
            <SidebarItem 
              key={m.id}
              icon={m.icon}
              label={m.id}
              active={activeModule === m.id}
              onClick={() => {
                setActiveModule(m.id);
                setIsMobileMenuOpen(false);
              }}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className={cn("flex items-center gap-3 p-3 rounded-xl bg-white/5", collapsed ? "justify-center" : "")}>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">VK</div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Venkatesh K.</p>
                <p className="text-xs text-text-secondary truncate">{role}</p>
              </div>
            )}
            {!collapsed && (
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="p-2 hover:bg-white/10 rounded-lg text-text-secondary hover:text-rose-500 transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        collapsed ? "lg:ml-20" : "lg:ml-64"
      )}>
        {/* Topbar */}
        <header className="h-20 glass-card border-b border-border flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-white/5 rounded-lg hidden lg:block"
            >
              <Menu size={20} />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-white/5 rounded-lg lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-white/5 border border-border rounded-xl pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/5 border border-border rounded-xl p-1">
              {(['Admin', 'Sales', 'HR', 'Support'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "px-3 py-1 text-xs font-bold rounded-lg transition-all",
                    role === r ? "bg-primary text-white" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-white/5 rounded-xl text-text-secondary"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="relative">
              <button className="p-2 hover:bg-white/5 rounded-xl text-text-secondary">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-background"></span>
              </button>
            </div>

            <div className="w-10 h-10 rounded-xl bg-white/5 border border-border flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
              <Settings size={20} />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeModule === 'Dashboard' && <Dashboard role={role} />}
              {activeModule === 'Leads' && <LeadsModule leads={leads} setLeads={setLeads} />}
              {activeModule === 'Clients' && <ClientsModule clients={clients} setClients={setClients} />}
              {activeModule === 'Sales Pipeline' && <PipelineModule deals={deals} setDeals={setDeals} />}
              {activeModule === 'Support' && <SupportModule tickets={tickets} setTickets={setTickets} />}
              {activeModule === 'HR Ops' && <HRModule employees={employees} setEmployees={setEmployees} />}
              {activeModule === 'Projects' && <ProjectsModule tasks={tasks} setTasks={setTasks} />}
              {activeModule === 'Billing' && <BillingModule invoices={invoices} setInvoices={setInvoices} />}
              {activeModule === 'Reports' && <ReportsModule />}
              
              {activeModule === 'Communication' && (
                <div className="flex flex-col items-center justify-center py-20 glass-card rounded-3xl border-dashed">
                  <div className="p-6 bg-primary/10 rounded-full mb-4">
                    <MessageSquare size={48} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Communication Hub</h2>
                  <p className="text-text-secondary mt-2">Omnichannel communication (Email, WhatsApp, Calls) simulation.</p>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                    <button className="p-4 bg-white/5 border border-border rounded-xl hover:border-primary transition-all text-center">
                      <Mail className="mx-auto mb-2 text-primary" />
                      <p className="font-bold">Email</p>
                    </button>
                    <button className="p-4 bg-white/5 border border-border rounded-xl hover:border-primary transition-all text-center">
                      <MessageSquare className="mx-auto mb-2 text-emerald-500" />
                      <p className="font-bold">WhatsApp</p>
                    </button>
                    <button className="p-4 bg-white/5 border border-border rounded-xl hover:border-primary transition-all text-center">
                      <Phone className="mx-auto mb-2 text-indigo-500" />
                      <p className="font-bold">Call Logs</p>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
