import React from 'react';
import { 
  MoreVertical, 
  Filter, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Briefcase,
  UserCircle,
  Calendar,
  Download,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { cn, formatCurrency, formatDate } from '../lib/utils';
import { Lead, Client, Deal, Ticket, Employee, Task, Invoice } from '../types';

// --- Shared Components ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg glass-card p-8 rounded-3xl z-[101] shadow-2xl border border-white/10"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>
          {children}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const FormField = ({ label, type = "text", placeholder, value, onChange }: any) => (
  <div className="space-y-1.5 mb-4">
    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-white/5 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary transition-colors"
    />
  </div>
);

const FormSelect = ({ label, options, value, onChange }: any) => (
  <div className="space-y-1.5 mb-4">
    <label className="text-sm font-bold text-text-secondary uppercase tracking-wider">{label}</label>
    <select 
      value={value}
      onChange={onChange}
      className="w-full bg-white/5 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary transition-colors appearance-none"
    >
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

// --- Modules ---

export const LeadsModule = ({ leads, setLeads }: { leads: Lead[], setLeads: React.Dispatch<React.SetStateAction<Lead[]>> }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const [formData, setFormData] = React.useState({ name: '', company: '', budget: '', status: 'New' as Lead['status'] });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: `L-${100 + leads.length + 1}`,
      name: formData.name,
      company: formData.company,
      budget: Number(formData.budget),
      status: formData.status,
      assignedTo: 'Unassigned',
      lastActivity: new Date().toISOString().split('T')[0],
      email: `${formData.name.toLowerCase().replace(' ', '.')}@example.com`,
      phone: '+91 00000 00000',
      source: 'Manual Entry',
      score: 50
    };
    setLeads([...leads, newLead]);
    toast.success('Lead successfully added to pipeline!');
    setIsOpen(false);
    setFormData({ name: '', company: '', budget: '', status: 'New' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lead Management</h1>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          <span>Add New Lead</span>
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create New Lead">
        <form onSubmit={handleSave}>
          <FormField label="Full Name" placeholder="Raj Sharma" value={formData.name} onChange={(e: any) => setFormData({...formData, name: e.target.value})} />
          <FormField label="Company" placeholder="Startup Inc." value={formData.company} onChange={(e: any) => setFormData({...formData, company: e.target.value})} />
          <FormField label="Budget (₹)" type="number" placeholder="500000" value={formData.budget} onChange={(e: any) => setFormData({...formData, budget: e.target.value})} />
          <FormSelect label="Status" options={['New', 'Contacted', 'Qualified', 'Proposal']} value={formData.status} onChange={(e: any) => setFormData({...formData, status: e.target.value})} />
          
          <div className="flex gap-3 mt-8">
            <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-3 bg-white/5 border border-border rounded-xl font-bold hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity">Save Lead</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} title="Lead Details">
        {selectedLead && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                {selectedLead.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold">{selectedLead.name}</h3>
                <p className="text-text-secondary">{selectedLead.company}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Status</p>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  selectedLead.status === 'Qualified' ? "bg-emerald-500/10 text-emerald-500" :
                  selectedLead.status === 'Proposal' ? "bg-primary/10 text-primary" : "bg-white/10 text-text-secondary"
                )}>
                  {selectedLead.status}
                </span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Budget</p>
                <p className="text-sm font-bold">{formatCurrency(selectedLead.budget)}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Email</p>
                <p className="text-sm font-medium truncate">{selectedLead.email}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Phone</p>
                <p className="text-sm font-medium">{selectedLead.phone}</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-border">
              <p className="text-[10px] text-text-secondary font-bold uppercase mb-2">Lead Score</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${selectedLead.score}%` }} />
                </div>
                <span className="text-sm font-bold">{selectedLead.score}%</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Mail size={18} />
                <span>Email</span>
              </button>
              <button className="flex-1 py-3 bg-white/5 border border-border rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Phone size={18} />
                <span>Call</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

    <div className="glass-card p-4 rounded-2xl flex flex-wrap gap-4 items-center justify-between">
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold">All Leads</button>
        <button className="px-4 py-2 bg-white/5 text-text-secondary rounded-lg text-sm font-bold hover:text-text-primary">Qualified</button>
        <button className="px-4 py-2 bg-white/5 text-text-secondary rounded-lg text-sm font-bold hover:text-text-primary">New</button>
      </div>
      <div className="flex gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
          <input type="text" placeholder="Search leads..." className="bg-white/5 border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary" />
        </div>
        <button className="p-2 bg-white/5 border border-border rounded-lg text-text-secondary hover:text-text-primary">
          <Filter size={18} />
        </button>
      </div>
    </div>

    <div className="glass-card rounded-2xl overflow-hidden border border-border">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 border-b border-border">
            <th className="p-4 font-bold text-sm text-text-secondary">LEAD NAME</th>
            <th className="p-4 font-bold text-sm text-text-secondary">STATUS</th>
            <th className="p-4 font-bold text-sm text-text-secondary">BUDGET</th>
            <th className="p-4 font-bold text-sm text-text-secondary">ASSIGNED TO</th>
            <th className="p-4 font-bold text-sm text-text-secondary">SCORE</th>
            <th className="p-4 font-bold text-sm text-text-secondary text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr 
              key={lead.id} 
              className="border-b border-border hover:bg-white/5 transition-colors group cursor-pointer"
              onClick={() => setSelectedLead(lead)}
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{lead.name}</p>
                    <p className="text-xs text-text-secondary">{lead.company}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold",
                  lead.status === 'Qualified' ? "bg-emerald-500/10 text-emerald-500" :
                  lead.status === 'Proposal' ? "bg-primary/10 text-primary" : "bg-white/10 text-text-secondary"
                )}>
                  {lead.status}
                </span>
              </td>
              <td className="p-4 font-medium">{formatCurrency(lead.budget)}</td>
              <td className="p-4 text-sm text-text-secondary">{lead.assignedTo}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[60px]">
                    <div className="h-full bg-primary" style={{ width: `${lead.score}%` }} />
                  </div>
                  <span className="text-xs font-bold">{lead.score}%</span>
                </div>
              </td>
              <td className="p-4 text-right">
                <button className="p-2 hover:bg-white/10 rounded-lg text-text-secondary group-hover:text-text-primary">
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export const ClientsModule = ({ clients, setClients }: { clients: Client[], setClients: React.Dispatch<React.SetStateAction<Client[]>> }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null);
  const [formData, setFormData] = React.useState({ company: '', industry: '', contractValue: '' });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      id: `C-${200 + clients.length + 1}`,
      name: formData.company,
      company: formData.company,
      industry: formData.industry,
      totalRevenue: 0,
      status: 'Active',
      contractValue: Number(formData.contractValue),
      joinedDate: new Date().toISOString().split('T')[0],
      email: `contact@${formData.company.toLowerCase().replace(' ', '')}.com`
    };
    setClients([...clients, newClient]);
    toast.success('Client profile created successfully!');
    setIsOpen(false);
    setFormData({ company: '', industry: '', contractValue: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Client Directory</h1>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          <span>New Client</span>
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="New Client Profile">
        <form onSubmit={handleSave}>
          <FormField label="Company Name" placeholder="TechNova Pvt Ltd" value={formData.company} onChange={(e: any) => setFormData({...formData, company: e.target.value})} />
          <FormField label="Industry" placeholder="Software / E-commerce" value={formData.industry} onChange={(e: any) => setFormData({...formData, industry: e.target.value})} />
          <FormField label="Contract Value (₹)" type="number" placeholder="800000" value={formData.contractValue} onChange={(e: any) => setFormData({...formData, contractValue: e.target.value})} />
          
          <div className="flex gap-3 mt-8">
            <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-3 bg-white/5 border border-border rounded-xl font-bold hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity">Create Client</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!selectedClient} onClose={() => setSelectedClient(null)} title="Client Details">
        {selectedClient && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-border">
              <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-3xl">🏢</div>
              <div>
                <h3 className="text-xl font-bold">{selectedClient.company}</h3>
                <p className="text-text-secondary">{selectedClient.industry}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Status</p>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded uppercase tracking-wider">
                  {selectedClient.status}
                </span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Joined Date</p>
                <p className="text-sm font-bold">{formatDate(selectedClient.joinedDate)}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Contract Value</p>
                <p className="text-sm font-bold">{formatCurrency(selectedClient.contractValue)}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Total Revenue</p>
                <p className="text-sm font-bold">{formatCurrency(selectedClient.totalRevenue)}</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-border">
              <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Email</p>
              <p className="text-sm font-medium">{selectedClient.email}</p>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <ExternalLink size={18} />
                <span>Open Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client) => (
        <div 
          key={client.id} 
          className="glass-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-all group cursor-pointer"
          onClick={() => setSelectedClient(client)}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">🏢</div>
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded uppercase tracking-wider">
              {client.status}
            </span>
          </div>
          <h3 className="text-xl font-bold">{client.company}</h3>
          <p className="text-sm text-text-secondary mb-4">{client.industry} • Joined {formatDate(client.joinedDate)}</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Contract Value</span>
              <span className="font-bold">{formatCurrency(client.contractValue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total Revenue</span>
              <span className="font-bold">{formatCurrency(client.totalRevenue)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-border rounded-lg text-sm font-bold transition-colors">Profile</button>
            <button className="p-2 bg-white/5 hover:bg-white/10 border border-border rounded-lg text-text-secondary transition-colors">
              <Mail size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export const PipelineModule = ({ deals, setDeals }: { deals: Deal[], setDeals: React.Dispatch<React.SetStateAction<Deal[]>> }) => {
  const stages = ['Prospect', 'Negotiation', 'Closed Won', 'Closed Lost'];
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDeal, setSelectedDeal] = React.useState<Deal | null>(null);
  const [formData, setFormData] = React.useState({ title: '', client: '', value: '', stage: 'Prospect' as Deal['stage'] });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newDeal: Deal = {
      id: `D-${300 + deals.length + 1}`,
      title: formData.title,
      client: formData.client,
      value: Number(formData.value),
      stage: formData.stage,
      probability: formData.stage === 'Prospect' ? 20 : formData.stage === 'Negotiation' ? 60 : 100,
      expectedClose: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setDeals([...deals, newDeal]);
    toast.success('Deal added to pipeline!');
    setIsOpen(false);
    setFormData({ title: '', client: '', value: '', stage: 'Prospect' });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sales Pipeline</h1>
        <div className="flex gap-3">
          <div className="flex items-center bg-white/5 border border-border rounded-xl p-1">
            <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20">Kanban</button>
            <button className="px-4 py-1.5 text-text-secondary hover:text-text-primary rounded-lg text-sm font-bold">List</button>
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            <span>New Deal</span>
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create New Deal">
        <form onSubmit={handleSave}>
          <FormField label="Deal Title" placeholder="Cloud Migration" value={formData.title} onChange={(e: any) => setFormData({...formData, title: e.target.value})} />
          <FormField label="Client" placeholder="TechNova" value={formData.client} onChange={(e: any) => setFormData({...formData, client: e.target.value})} />
          <FormField label="Deal Value (₹)" type="number" placeholder="500000" value={formData.value} onChange={(e: any) => setFormData({...formData, value: e.target.value})} />
          <FormSelect label="Stage" options={stages} value={formData.stage} onChange={(e: any) => setFormData({...formData, stage: e.target.value})} />
          
          <div className="flex gap-3 mt-8">
            <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-3 bg-white/5 border border-border rounded-xl font-bold hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity">Add Deal</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!selectedDeal} onClose={() => setSelectedDeal(null)} title="Deal Details">
        {selectedDeal && (
          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-border">
              <h3 className="text-xl font-bold">{selectedDeal.title}</h3>
              <p className="text-text-secondary">{selectedDeal.client}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Value</p>
                <p className="text-sm font-bold">{formatCurrency(selectedDeal.value)}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Probability</p>
                <p className="text-sm font-bold">{selectedDeal.probability}%</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Stage</p>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  selectedDeal.stage === 'Closed Won' ? "bg-emerald-500/10 text-emerald-500" :
                  selectedDeal.stage === 'Closed Lost' ? "bg-rose-500/10 text-rose-500" : "bg-primary/10 text-primary"
                )}>
                  {selectedDeal.stage}
                </span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Expected Close</p>
                <p className="text-sm font-bold">{formatDate(selectedDeal.expectedClose)}</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-border">
              <p className="text-[10px] text-text-secondary font-bold uppercase mb-2">Deal Progress</p>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${selectedDeal.probability}%` }} />
              </div>
            </div>
          </div>
        )}
      </Modal>

      <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
        {stages.map((stage) => (
          <div key={stage} className="flex-1 min-w-[300px] space-y-4">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-bold flex items-center gap-2">
                {stage}
                <span className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-text-secondary">
                  {deals.filter(d => d.stage === stage).length}
                </span>
              </h3>
              <button className="p-1 hover:bg-white/5 rounded text-text-secondary"><MoreVertical size={16} /></button>
            </div>
            
            <div className="space-y-4">
              {deals.filter(d => d.stage === stage).map((deal) => (
                <div 
                  key={deal.id} 
                  className="glass-card p-4 rounded-xl border border-border hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => setSelectedDeal(deal)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm">{deal.title}</h4>
                    <span className="text-[10px] font-bold text-text-secondary">{deal.id}</span>
                  </div>
                  <p className="text-xs text-text-secondary mb-4">{deal.client}</p>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-text-secondary">Value</p>
                      <p className="text-sm font-bold text-primary">{formatCurrency(deal.value)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-text-secondary uppercase">Probability</p>
                      <p className="text-xs font-bold">{deal.probability}%</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-card flex items-center justify-center text-[10px] font-bold">VS</div>
                      <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-card flex items-center justify-center text-[10px] font-bold">AR</div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-text-secondary">
                      <Clock size={12} />
                      <span>{deal.expectedClose}</span>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 border border-dashed border-border rounded-xl text-text-secondary text-sm hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2">
                <Plus size={16} />
                <span>Add Deal</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SupportModule = ({ tickets, setTickets }: { tickets: Ticket[], setTickets: React.Dispatch<React.SetStateAction<Ticket[]>> }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | null>(null);
  const [formData, setFormData] = React.useState({ subject: '', client: '', priority: 'Medium' as Ticket['priority'] });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = {
      id: `TKT-${400 + tickets.length + 1}`,
      subject: formData.subject,
      client: formData.client,
      priority: formData.priority,
      status: 'Open',
      assignedTo: 'Support Queue',
      createdAt: new Date().toISOString().split('T')[0],
      slaDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setTickets([...tickets, newTicket]);
    toast.success('Support ticket raised successfully!');
    setIsOpen(false);
    setFormData({ subject: '', client: '', priority: 'Medium' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Support Center</h1>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          <span>New Ticket</span>
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Raise Support Ticket">
        <form onSubmit={handleSave}>
          <FormField label="Subject" placeholder="Website down issue" value={formData.subject} onChange={(e: any) => setFormData({...formData, subject: e.target.value})} />
          <FormField label="Client" placeholder="UrbanCart" value={formData.client} onChange={(e: any) => setFormData({...formData, client: e.target.value})} />
          <FormSelect label="Priority" options={['Low', 'Medium', 'High', 'Critical']} value={formData.priority} onChange={(e: any) => setFormData({...formData, priority: e.target.value})} />
          
          <div className="flex gap-3 mt-8">
            <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-3 bg-white/5 border border-border rounded-xl font-bold hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity">Raise Ticket</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!selectedTicket} onClose={() => setSelectedTicket(null)} title="Ticket Details">
        {selectedTicket && (
          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  selectedTicket.priority === 'Critical' ? "bg-rose-500/10 text-rose-500" :
                  selectedTicket.priority === 'High' ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary"
                )}>
                  {selectedTicket.priority} Priority
                </span>
                <span className="text-[10px] text-text-secondary font-bold uppercase">{selectedTicket.id}</span>
              </div>
              <h3 className="text-xl font-bold">{selectedTicket.subject}</h3>
              <p className="text-text-secondary">{selectedTicket.client}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Status</p>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  selectedTicket.status === 'Open' ? "bg-rose-500/10 text-rose-500" : "bg-amber-500/10 text-amber-500"
                )}>
                  {selectedTicket.status}
                </span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Assigned To</p>
                <p className="text-sm font-bold">{selectedTicket.assignedTo}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Created At</p>
                <p className="text-sm font-bold">{formatDate(selectedTicket.createdAt)}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">SLA Deadline</p>
                <p className="text-sm font-bold text-rose-500">{formatDate(selectedTicket.slaDeadline)}</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-border">
              <p className="text-[10px] text-text-secondary font-bold uppercase mb-2">Recent Activity</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <div>
                    <p className="text-xs font-bold">Ticket Created</p>
                    <p className="text-[10px] text-text-secondary">{formatDate(selectedTicket.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity">Assign to Me</button>
              <button className="flex-1 py-3 bg-white/5 border border-border rounded-xl font-bold hover:bg-white/10 transition-colors">Close Ticket</button>
            </div>
          </div>
        )}
      </Modal>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass-card p-6 rounded-2xl border border-border">
        <p className="text-text-secondary text-sm font-medium">Avg. Response Time</p>
        <h3 className="text-2xl font-bold mt-1">1h 24m</h3>
        <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
          <TrendingUp size={12} /> 12% faster than last week
        </p>
      </div>
      <div className="glass-card p-6 rounded-2xl border border-border">
        <p className="text-text-secondary text-sm font-medium">Resolution Rate</p>
        <h3 className="text-2xl font-bold mt-1">94.2%</h3>
        <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
          <TrendingUp size={12} /> 2.4% increase
        </p>
      </div>
      <div className="glass-card p-6 rounded-2xl border border-border">
        <p className="text-text-secondary text-sm font-medium">Customer Satisfaction</p>
        <h3 className="text-2xl font-bold mt-1">4.8/5.0</h3>
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-amber-500 text-xs">★</span>)}
        </div>
      </div>
    </div>

    <div className="glass-card rounded-2xl overflow-hidden border border-border">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-bold">Active Tickets</h3>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/5 rounded-lg text-text-secondary"><Filter size={18} /></button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-text-secondary"><Search size={18} /></button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {tickets.map((ticket) => (
          <div 
            key={ticket.id} 
            className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between group cursor-pointer"
            onClick={() => setSelectedTicket(ticket)}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-2 h-12 rounded-full",
                ticket.priority === 'Critical' ? "bg-rose-500" :
                ticket.priority === 'High' ? "bg-amber-500" : "bg-primary"
              )} />
              <div>
                <h4 className="font-bold group-hover:text-primary transition-colors">{ticket.subject}</h4>
                <p className="text-xs text-text-secondary mt-1">
                  {ticket.id} • {ticket.client} • Created {ticket.createdAt}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right hidden md:block">
                <p className="text-xs text-text-secondary">Assigned To</p>
                <p className="text-sm font-medium">{ticket.assignedTo}</p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-xs text-text-secondary">SLA Deadline</p>
                <p className="text-sm font-medium text-rose-500">{ticket.slaDeadline}</p>
              </div>
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                ticket.status === 'Open' ? "bg-rose-500/10 text-rose-500" : "bg-amber-500/10 text-amber-500"
              )}>
                {ticket.status}
              </span>
              <button className="p-2 hover:bg-white/10 rounded-lg text-text-secondary">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export const HRModule = ({ employees, setEmployees }: { employees: Employee[], setEmployees: React.Dispatch<React.SetStateAction<Employee[]>> }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
  const [formData, setFormData] = React.useState({ name: '', role: '', department: 'Engineering' });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee: Employee = {
      id: `EMP-${500 + employees.length + 1}`,
      name: formData.name,
      role: formData.role,
      department: formData.department,
      activeTasks: 0,
      leavesApproved: 0,
      performance: 100,
      status: 'Active',
      email: `${formData.name.toLowerCase().replace(' ', '.')}@nexus.com`
    };
    setEmployees([...employees, newEmployee]);
    toast.success('Employee added to directory!');
    setIsOpen(false);
    setFormData({ name: '', role: '', department: 'Engineering' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">HR Operations</h1>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          <span>Add Employee</span>
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Employee">
        <form onSubmit={handleSave}>
          <FormField label="Full Name" placeholder="Aman Verma" value={formData.name} onChange={(e: any) => setFormData({...formData, name: e.target.value})} />
          <FormField label="Role" placeholder="Frontend Developer" value={formData.role} onChange={(e: any) => setFormData({...formData, role: e.target.value})} />
          <FormSelect label="Department" options={['Engineering', 'HR', 'Sales', 'Marketing']} value={formData.department} onChange={(e: any) => setFormData({...formData, department: e.target.value})} />
          
          <div className="flex gap-3 mt-8">
            <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-3 bg-white/5 border border-border rounded-xl font-bold hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity">Add Employee</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!selectedEmployee} onClose={() => setSelectedEmployee(null)} title="Employee Profile">
        {selectedEmployee && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-border">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <UserCircle size={64} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{selectedEmployee.name}</h3>
                <p className="text-text-secondary text-lg">{selectedEmployee.role}</p>
                <span className={cn(
                  "mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                  selectedEmployee.status === 'Active' ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
                )}>
                  {selectedEmployee.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-border text-center">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Department</p>
                <p className="text-sm font-bold">{selectedEmployee.department}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border text-center">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Tasks</p>
                <p className="text-sm font-bold">{selectedEmployee.activeTasks}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border text-center">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Performance</p>
                <p className="text-sm font-bold text-primary">{selectedEmployee.performance}%</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-border">
              <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Contact Information</p>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={14} className="text-text-secondary" />
                  <span>{selectedEmployee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-text-secondary" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity">Edit Profile</button>
              <button className="flex-1 py-3 bg-white/5 border border-border rounded-xl font-bold hover:bg-white/10 transition-colors">Manage Leave</button>
            </div>
          </div>
        )}
      </Modal>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((emp) => (
        <div 
          key={emp.id} 
          className="glass-card p-6 rounded-2xl border border-border group hover:border-primary/50 transition-all cursor-pointer"
          onClick={() => setSelectedEmployee(emp)}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl overflow-hidden">
              <UserCircle size={48} className="text-text-secondary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{emp.name}</h3>
              <p className="text-sm text-text-secondary">{emp.role}</p>
              <span className={cn(
                "mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                emp.status === 'Active' ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
              )}>
                {emp.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-2 bg-white/5 rounded-xl">
              <p className="text-[10px] text-text-secondary font-bold uppercase">Tasks</p>
              <p className="text-lg font-bold">{emp.activeTasks}</p>
            </div>
            <div className="text-center p-2 bg-white/5 rounded-xl">
              <p className="text-[10px] text-text-secondary font-bold uppercase">Leaves</p>
              <p className="text-lg font-bold">{emp.leavesApproved}</p>
            </div>
            <div className="text-center p-2 bg-white/5 rounded-xl">
              <p className="text-[10px] text-text-secondary font-bold uppercase">Score</p>
              <p className="text-lg font-bold text-primary">{emp.performance}%</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-border rounded-lg text-sm font-bold transition-colors">View Profile</button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">Assign</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export const ProjectsModule = ({ tasks, setTasks }: { tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [formData, setFormData] = React.useState({ title: '', project: 'CRM Development', priority: 'Medium' as Task['priority'] });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: `TSK-${600 + tasks.length + 1}`,
      title: formData.title,
      project: formData.project,
      status: 'To Do',
      assignee: 'Unassigned',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: formData.priority
    };
    setTasks([...tasks, newTask]);
    toast.success('Task assigned successfully!');
    setIsOpen(false);
    setFormData({ title: '', project: 'CRM Development', priority: 'Medium' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects & Tasks</h1>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Assign New Task">
        <form onSubmit={handleSave}>
          <FormField label="Task Title" placeholder="API Integration" value={formData.title} onChange={(e: any) => setFormData({...formData, title: e.target.value})} />
          <FormField label="Project" placeholder="CRM Development" value={formData.project} onChange={(e: any) => setFormData({...formData, project: e.target.value})} />
          <FormSelect label="Priority" options={['Low', 'Medium', 'High']} value={formData.priority} onChange={(e: any) => setFormData({...formData, priority: e.target.value})} />
          
          <div className="flex gap-3 mt-8">
            <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-3 bg-white/5 border border-border rounded-xl font-bold hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity">Assign Task</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} title="Task Details">
        {selectedTask && (
          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  selectedTask.priority === 'High' ? "bg-rose-500/10 text-rose-500" :
                  selectedTask.priority === 'Medium' ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary"
                )}>
                  {selectedTask.priority} Priority
                </span>
                <span className="text-[10px] text-text-secondary font-bold uppercase">{selectedTask.id}</span>
              </div>
              <h3 className="text-xl font-bold">{selectedTask.title}</h3>
              <p className="text-text-secondary">{selectedTask.project}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Status</p>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  selectedTask.status === 'Done' ? "bg-emerald-500/10 text-emerald-500" :
                  selectedTask.status === 'In Progress' ? "bg-primary/10 text-primary" : "bg-white/10 text-text-secondary"
                )}>
                  {selectedTask.status}
                </span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Assignee</p>
                <p className="text-sm font-bold">{selectedTask.assignee}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Deadline</p>
                <p className="text-sm font-bold">{formatDate(selectedTask.deadline)}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity">Start Task</button>
              <button className="flex-1 py-3 bg-white/5 border border-border rounded-xl font-bold hover:bg-white/10 transition-colors">Mark as Done</button>
            </div>
          </div>
        )}
      </Modal>

    <div className="glass-card p-6 rounded-2xl border border-border mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">CRM Development</h3>
          <p className="text-sm text-text-secondary">Enterprise-grade solution for internal operations.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold">65% Complete</p>
          <div className="w-48 h-2 bg-white/5 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '65%' }} />
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-card flex items-center justify-center text-xs font-bold">
              {String.fromCharCode(64 + i)}
            </div>
          ))}
        </div>
        <div className="h-8 w-px bg-border mx-2" />
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <div className="flex items-center gap-1"><CheckCircle2 size={16} className="text-emerald-500" /> 12 Done</div>
          <div className="flex items-center gap-1"><Clock size={16} className="text-primary" /> 5 In Progress</div>
          <div className="flex items-center gap-1"><AlertCircle size={16} className="text-rose-500" /> 2 Overdue</div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {['To Do', 'In Progress', 'Done'].map(status => (
        <div key={status} className="space-y-4">
          <h3 className="font-bold flex items-center gap-2 px-2">
            {status}
            <span className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-text-secondary">
              {tasks.filter(t => t.status === status).length}
            </span>
          </h3>
          <div className="space-y-4">
            {tasks.filter(t => t.status === status).map(task => (
              <div key={task.id} className="glass-card p-4 rounded-xl border border-border hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    task.priority === 'High' ? "bg-rose-500/10 text-rose-500" : "bg-primary/10 text-primary"
                  )}>
                    {task.priority}
                  </span>
                  <button className="text-text-secondary hover:text-text-primary"><MoreVertical size={16} /></button>
                </div>
                <h4 className="font-bold text-sm mb-1">{task.title}</h4>
                <p className="text-xs text-text-secondary mb-4">{task.project}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">AV</div>
                    <span className="text-[10px] text-text-secondary">{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-text-secondary">
                    <Calendar size={12} />
                    <span>{task.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-2 border border-dashed border-border rounded-xl text-text-secondary text-xs hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2">
              <Plus size={14} />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export const BillingModule = ({ invoices, setInvoices }: { invoices: Invoice[], setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>> }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null);
  const [formData, setFormData] = React.useState({ client: '', amount: '', status: 'Pending' as Invoice['status'] });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvoice: Invoice = {
      id: `INV-${700 + invoices.length + 1}`,
      client: formData.client,
      amount: Number(formData.amount),
      status: formData.status,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      gst: Number(formData.amount) * 0.18
    };
    setInvoices([...invoices, newInvoice]);
    toast.success('Invoice generated successfully!');
    setIsOpen(false);
    setFormData({ client: '', amount: '', status: 'Pending' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Billing & Invoices</h1>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          <span>Create Invoice</span>
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Generate Invoice">
        <form onSubmit={handleSave}>
          <FormField label="Client Name" placeholder="TechNova Pvt Ltd" value={formData.client} onChange={(e: any) => setFormData({...formData, client: e.target.value})} />
          <FormField label="Amount (₹)" type="number" placeholder="120000" value={formData.amount} onChange={(e: any) => setFormData({...formData, amount: e.target.value})} />
          <FormSelect label="Status" options={['Pending', 'Paid', 'Overdue']} value={formData.status} onChange={(e: any) => setFormData({...formData, status: e.target.value})} />
          
          <div className="flex gap-3 mt-8">
            <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-3 bg-white/5 border border-border rounded-xl font-bold hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity">Generate Invoice</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} title="Invoice Details">
        {selectedInvoice && (
          <div className="space-y-6">
            <div className="p-6 bg-white/5 rounded-2xl border border-border text-center">
              <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Invoice Amount</p>
              <h3 className="text-3xl font-bold text-primary">{formatCurrency(selectedInvoice.amount)}</h3>
              <span className={cn(
                "mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                selectedInvoice.status === 'Paid' ? "bg-emerald-500/10 text-emerald-500" :
                selectedInvoice.status === 'Overdue' ? "bg-rose-500/10 text-rose-500" : "bg-amber-500/10 text-amber-500"
              )}>
                {selectedInvoice.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Invoice ID</p>
                <p className="text-sm font-bold">{selectedInvoice.id}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Client</p>
                <p className="text-sm font-bold">{selectedInvoice.client}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Issue Date</p>
                <p className="text-sm font-bold">{formatDate(selectedInvoice.date)}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-border">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Due Date</p>
                <p className="text-sm font-bold text-rose-500">{formatDate(selectedInvoice.dueDate)}</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[10px] text-text-secondary font-bold uppercase">Tax (GST 18%)</p>
                <p className="text-sm font-bold">{formatCurrency(selectedInvoice.gst)}</p>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold uppercase">Total Payable</p>
                <p className="text-lg font-bold text-primary">{formatCurrency(selectedInvoice.amount + selectedInvoice.gst)}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Download size={18} />
                <span>Download PDF</span>
              </button>
              <button className="flex-1 py-3 bg-white/5 border border-border rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Mail size={18} />
                <span>Send via Email</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="glass-card p-6 rounded-2xl border border-border">
        <p className="text-text-secondary text-sm font-medium">Total Billed</p>
        <h3 className="text-2xl font-bold mt-1">{formatCurrency(2450000)}</h3>
      </div>
      <div className="glass-card p-6 rounded-2xl border border-border">
        <p className="text-text-secondary text-sm font-medium">Pending Payments</p>
        <h3 className="text-2xl font-bold mt-1 text-amber-500">{formatCurrency(420000)}</h3>
      </div>
      <div className="glass-card p-6 rounded-2xl border border-border">
        <p className="text-text-secondary text-sm font-medium">Overdue</p>
        <h3 className="text-2xl font-bold mt-1 text-rose-500">{formatCurrency(120000)}</h3>
      </div>
      <div className="glass-card p-6 rounded-2xl border border-border">
        <p className="text-text-secondary text-sm font-medium">GST Collected</p>
        <h3 className="text-2xl font-bold mt-1 text-primary">{formatCurrency(441000)}</h3>
      </div>
    </div>

    <div className="glass-card rounded-2xl overflow-hidden border border-border">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 border-b border-border">
            <th className="p-4 font-bold text-sm text-text-secondary">INVOICE #</th>
            <th className="p-4 font-bold text-sm text-text-secondary">CLIENT</th>
            <th className="p-4 font-bold text-sm text-text-secondary">AMOUNT</th>
            <th className="p-4 font-bold text-sm text-text-secondary">GST (18%)</th>
            <th className="p-4 font-bold text-sm text-text-secondary">STATUS</th>
            <th className="p-4 font-bold text-sm text-text-secondary">DUE DATE</th>
            <th className="p-4 font-bold text-sm text-text-secondary text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr 
              key={inv.id} 
              className="border-b border-border hover:bg-white/5 transition-colors cursor-pointer group"
              onClick={() => setSelectedInvoice(inv)}
            >
              <td className="p-4 font-bold text-primary">{inv.id}</td>
              <td className="p-4 font-medium">{inv.client}</td>
              <td className="p-4 font-bold">{formatCurrency(inv.amount)}</td>
              <td className="p-4 text-text-secondary">{formatCurrency(inv.gst)}</td>
              <td className="p-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  inv.status === 'Paid' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                )}>
                  {inv.status}
                </span>
              </td>
              <td className="p-4 text-sm text-text-secondary">{inv.dueDate}</td>
              <td className="p-4 text-right">
                <button className="p-2 hover:bg-white/10 rounded-lg text-text-secondary">
                  <Download size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

const revenueData = [
  { name: 'Oct', value: 450000 },
  { name: 'Nov', value: 520000 },
  { name: 'Dec', value: 480000 },
  { name: 'Jan', value: 610000 },
  { name: 'Feb', value: 750000 },
  { name: 'Mar', value: 820000 },
];

const teamData = [
  { name: 'Sales', value: 85 },
  { name: 'HR', value: 72 },
  { name: 'Support', value: 94 },
  { name: 'Eng', value: 88 },
];

const clientShareData = [
  { name: 'TechNova', value: 45 },
  { name: 'UrbanCart', value: 25 },
  { name: 'Others', value: 30 },
];

const COLORS = ['#00A9FF', '#89CFF3', '#A0E9FF', '#334155'];

export const ReportsModule = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Analytics & Reports</h1>
      <div className="flex gap-3">
        <select className="bg-white/5 border border-border rounded-xl px-4 py-2 outline-none">
          <option>Q1 2024</option>
          <option>Q4 2023</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity">
          <Download size={18} />
          <span>Download PDF</span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="glass-card p-6 rounded-2xl border border-border">
        <h3 className="text-xl font-bold mb-6">Revenue Growth (₹)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
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
              <Area type="monotone" dataKey="value" stroke="#00A9FF" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card p-6 rounded-2xl border border-border">
        <h3 className="text-xl font-bold mb-6">Leads Conversion Funnel</h3>
        <div className="h-[300px] w-full flex flex-col justify-center space-y-4">
          {[
            { label: 'Total Leads', value: 145, color: 'bg-primary' },
            { label: 'Qualified', value: 92, color: 'bg-indigo-500' },
            { label: 'Proposal', value: 48, color: 'bg-amber-500' },
            { label: 'Closed Won', value: 32, color: 'bg-emerald-500' },
          ].map((item, idx) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-text-secondary">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / 145) * 100}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className={cn("h-full rounded-full", item.color)} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-border">
        <h3 className="text-xl font-bold mb-6">Team Performance Score</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={teamData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
              />
              <Bar dataKey="value" fill="#00A9FF" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card p-6 rounded-2xl border border-border">
        <h3 className="text-xl font-bold mb-6">Client Revenue Share</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={clientShareData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {clientShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {clientShareData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                <span className="text-xs text-text-secondary">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
