import { Lead, Client, Deal, Ticket, Employee, Task, Invoice } from './types';

export const leads: Lead[] = [
  {
    id: 'L-101',
    name: 'Raj Sharma',
    company: 'Startup Founder',
    budget: 500000,
    status: 'Qualified',
    assignedTo: 'Vikram Singh',
    lastActivity: '2024-03-25',
    email: 'raj@startup.com',
    phone: '+91 98765 43210',
    source: 'Web Form',
    score: 78
  },
  {
    id: 'L-102',
    name: 'Priya Mehta',
    company: 'Retail Owner',
    budget: 200000,
    status: 'Proposal',
    assignedTo: 'Anjali Rao',
    lastActivity: '2024-03-26',
    email: 'priya@retail.in',
    phone: '+91 98765 12345',
    source: 'LinkedIn',
    score: 85
  },
  {
    id: 'L-103',
    name: 'Amit Patel',
    company: 'FinTech Solutions',
    budget: 1200000,
    status: 'New',
    assignedTo: 'Vikram Singh',
    lastActivity: '2024-03-27',
    email: 'amit@fintech.com',
    phone: '+91 98222 33344',
    source: 'Referral',
    score: 92
  }
];

export const clients: Client[] = [
  {
    id: 'C-201',
    name: 'TechNova Pvt Ltd',
    company: 'TechNova',
    industry: 'Software',
    totalRevenue: 800000,
    status: 'Active',
    contractValue: 800000,
    joinedDate: '2023-01-15',
    email: 'contact@technova.com'
  },
  {
    id: 'C-202',
    name: 'UrbanCart',
    company: 'UrbanCart',
    industry: 'E-commerce',
    totalRevenue: 600000,
    status: 'Active',
    contractValue: 50000,
    joinedDate: '2023-06-20',
    email: 'billing@urbancart.in'
  }
];

export const deals: Deal[] = [
  {
    id: 'D-301',
    title: 'Cloud Migration',
    client: 'TechNova',
    value: 500000,
    stage: 'Negotiation',
    probability: 60,
    expectedClose: '2024-04-15'
  },
  {
    id: 'D-302',
    title: 'Mobile App Dev',
    client: 'UrbanCart',
    value: 300000,
    stage: 'Prospect',
    probability: 30,
    expectedClose: '2024-05-01'
  },
  {
    id: 'D-303',
    title: 'ERP Implementation',
    client: 'Global Logistics',
    value: 1500000,
    stage: 'Closed Won',
    probability: 100,
    expectedClose: '2024-03-10'
  }
];

export const tickets: Ticket[] = [
  {
    id: 'T-401',
    subject: 'Website down issue',
    client: 'TechNova',
    priority: 'High',
    status: 'Open',
    assignedTo: 'Aman Verma',
    createdAt: '2024-03-27 10:00',
    slaDeadline: '2024-03-27 14:00'
  },
  {
    id: 'T-402',
    subject: 'Billing discrepancy',
    client: 'UrbanCart',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Neha Singh',
    createdAt: '2024-03-27 11:30',
    slaDeadline: '2024-03-28 11:30'
  }
];

export const employees: Employee[] = [
  {
    id: 'E-501',
    name: 'Aman Verma',
    role: 'Frontend Dev',
    department: 'Engineering',
    activeTasks: 3,
    leavesApproved: 2,
    performance: 92,
    status: 'Active',
    email: 'aman@nexus.com'
  },
  {
    id: 'E-502',
    name: 'Neha Singh',
    role: 'HR Manager',
    department: 'HR',
    activeTasks: 5,
    leavesApproved: 0,
    performance: 88,
    status: 'Active',
    email: 'neha@nexus.com'
  },
  {
    id: 'E-503',
    name: 'Vikram Singh',
    role: 'Sales Executive',
    department: 'Sales',
    activeTasks: 12,
    leavesApproved: 1,
    performance: 95,
    status: 'Remote',
    email: 'vikram@nexus.com'
  }
];

export const tasks: Task[] = [
  {
    id: 'TK-601',
    title: 'API Integration',
    project: 'CRM Development',
    status: 'In Progress',
    assignee: 'Aman Verma',
    deadline: '2024-03-30',
    priority: 'High'
  },
  {
    id: 'TK-602',
    title: 'UI Dashboard',
    project: 'CRM Development',
    status: 'Done',
    assignee: 'Aman Verma',
    deadline: '2024-03-25',
    priority: 'Medium'
  }
];

export const invoices: Invoice[] = [
  {
    id: 'INV-1023',
    client: 'TechNova Pvt Ltd',
    amount: 120000,
    status: 'Paid',
    date: '2024-03-01',
    dueDate: '2024-03-15',
    gst: 21600
  },
  {
    id: 'INV-1024',
    client: 'UrbanCart',
    amount: 80000,
    status: 'Pending',
    date: '2024-03-20',
    dueDate: '2024-04-05',
    gst: 14400
  }
];
