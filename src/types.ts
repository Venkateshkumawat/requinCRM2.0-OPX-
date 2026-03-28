export type Role = 'Admin' | 'Sales' | 'HR' | 'Support';

export interface Lead {
  id: string;
  name: string;
  company: string;
  budget: number;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';
  assignedTo: string;
  lastActivity: string;
  email: string;
  phone: string;
  source: string;
  score: number;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  industry: string;
  totalRevenue: number;
  status: 'Active' | 'Inactive';
  contractValue: number;
  joinedDate: string;
  email: string;
}

export interface Deal {
  id: string;
  title: string;
  client: string;
  value: number;
  stage: 'Prospect' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: number;
  expectedClose: string;
}

export interface Ticket {
  id: string;
  subject: string;
  client: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved';
  assignedTo: string;
  createdAt: string;
  slaDeadline: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  activeTasks: number;
  leavesApproved: number;
  performance: number;
  status: 'Active' | 'On Leave' | 'Remote';
  email: string;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignee: string;
  deadline: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  date: string;
  dueDate: string;
  gst: number;
}
