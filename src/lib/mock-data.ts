/**
 * Mock Data for Irukei Design System
 * Realistic student profiles, companies, org structures, offers, and content
 */

/* ===== STUDENTS ===== */
export const mockStudents = [
  {
    id: "st_001",
    name: "Nguyễn Thái Anh",
    email: "anh.nguyen@example.com",
    city: "Hà Nội",
    avatar: "NTA",
    profileCompletion: 70,
    skills: ["JavaScript", "React", "TypeScript", "Node.js"],
    level: "intermediate",
    roadmapCount: 2,
    offersReceived: 3,
    creditsBalance: 250,
  },
  {
    id: "st_002",
    name: "Trần Minh Khôi",
    email: "khoi.tran@example.com",
    city: "TP. Hồ Chí Minh",
    avatar: "TMK",
    profileCompletion: 45,
    skills: ["Python", "Data Analysis"],
    level: "beginner",
    roadmapCount: 1,
    offersReceived: 0,
    creditsBalance: 100,
  },
  {
    id: "st_003",
    name: "Lê Hương Giang",
    email: "giang.le@example.com",
    city: "Đà Nẵng",
    avatar: "LHG",
    profileCompletion: 90,
    skills: ["UI/UX Design", "Figma", "Web Design", "CSS"],
    level: "advanced",
    roadmapCount: 3,
    offersReceived: 5,
    creditsBalance: 500,
  },
];

/* ===== COMPANIES ===== */
export const mockCompanies = [
  {
    id: "co_001",
    name: "Tech Innovate Vietnam",
    domain: "techinnovate.vn",
    avatar: "TIV",
    city: "Hà Nội",
    rating: 4.8,
    leadsCount: 24,
    offersCount: 12,
    status: "active",
  },
  {
    id: "co_002",
    name: "Creative Studio HCM",
    domain: "creativestudio.com",
    avatar: "CSH",
    city: "TP. Hồ Chí Minh",
    rating: 4.5,
    leadsCount: 18,
    offersCount: 8,
    status: "active",
  },
  {
    id: "co_003",
    name: "DataFlow Analytics",
    domain: "dataflow.io",
    avatar: "DFA",
    city: "Hà Nội",
    rating: 4.9,
    leadsCount: 42,
    offersCount: 19,
    status: "active",
  },
];

/* ===== ORG STRUCTURES ===== */
export const mockRootOrg = {
  id: "org_root",
  name: "Irukei Learning Marketplace",
  type: "root",
  parentId: null,
  childOrgIds: ["org_vn", "org_sg"],
  memberCount: 450,
};

export const mockChildOrgs = [
  {
    id: "org_vn",
    name: "Vietnam Region",
    type: "region",
    parentId: "org_root",
    childOrgIds: ["org_vn_north", "org_vn_south"],
    memberCount: 280,
  },
  {
    id: "org_sg",
    name: "Singapore Region",
    type: "region",
    parentId: "org_root",
    childOrgIds: [],
    memberCount: 170,
  },
  {
    id: "org_vn_north",
    name: "Vietnam North — Hà Nội",
    type: "office",
    parentId: "org_vn",
    childOrgIds: ["org_vn_north_eng"],
    memberCount: 180,
  },
  {
    id: "org_vn_south",
    name: "Vietnam South — TP. Hồ Chí Minh",
    type: "office",
    parentId: "org_vn",
    childOrgIds: [],
    memberCount: 100,
  },
  {
    id: "org_vn_north_eng",
    name: "Engineering Team",
    type: "team",
    parentId: "org_vn_north",
    childOrgIds: [],
    memberCount: 45,
  },
];

/* ===== ROLES & PERMISSIONS ===== */
export const mockRoles = [
  {
    id: "role_admin",
    name: "Admin",
    description: "Full access to org",
    permissionIds: [
      "perm_manage_users",
      "perm_manage_roles",
      "perm_view_billing",
      "perm_delete_org",
      "perm_manage_orgs",
    ],
  },
  {
    id: "role_manager",
    name: "Manager",
    description: "Manage team members and view analytics",
    permissionIds: ["perm_manage_users", "perm_view_billing"],
  },
  {
    id: "role_recruiter",
    name: "Recruiter",
    description: "Post offers and manage leads",
    permissionIds: ["perm_post_offers", "perm_view_leads"],
  },
  {
    id: "role_guest",
    name: "Guest",
    description: "View-only access",
    permissionIds: ["perm_view_dashboard"],
  },
];

export const mockPermissions = [
  { id: "perm_view_dashboard", name: "View Dashboard", riskLevel: "low" },
  { id: "perm_view_billing", name: "View Billing", riskLevel: "medium" },
  { id: "perm_post_offers", name: "Post Offers", riskLevel: "medium" },
  { id: "perm_view_leads", name: "View Leads", riskLevel: "medium" },
  { id: "perm_manage_users", name: "Manage Users", riskLevel: "high" },
  { id: "perm_manage_roles", name: "Manage Roles", riskLevel: "high" },
  { id: "perm_delete_org", name: "Delete Org", riskLevel: "critical" },
  { id: "perm_manage_orgs", name: "Manage Orgs", riskLevel: "high" },
];

/* ===== MARKETPLACE POSTS ===== */
export const mockMarketplacePosts = [
  {
    id: "post_001",
    studentId: "st_001",
    studentName: "Nguyễn Thái Anh",
    title: "Looking for React.js mentorship",
    description:
      "I want to master React and TypeScript. Have 3 years of JavaScript experience.",
    skills: ["React", "TypeScript"],
    status: "published",
    offersReceived: 3,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    budget: 5000000, // VND
  },
  {
    id: "post_002",
    studentId: "st_003",
    studentName: "Lê Hương Giang",
    title: "Seeking UI/UX design collaboration",
    description: "Open to design internship or part-time contract work.",
    skills: ["UI/UX Design", "Figma", "Web Design"],
    status: "published",
    offersReceived: 5,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    budget: 8000000,
  },
  {
    id: "post_003",
    studentId: "st_002",
    studentName: "Trần Minh Khôi",
    title: "Data science learning path",
    description: "Want to transition from Python basics to ML engineering.",
    skills: ["Python", "Data Science"],
    status: "draft",
    offersReceived: 0,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    budget: 3000000,
  },
];

/* ===== OFFERS ===== */
export const mockOffers = [
  {
    id: "offer_001",
    companyId: "co_001",
    companyName: "Tech Innovate Vietnam",
    studentId: "st_001",
    studentName: "Nguyễn Thái Anh",
    title: "React.js Mentorship — 12 weeks",
    amount: 4500000,
    duration: "12 weeks",
    status: "sent",
    matchScore: 0.92,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "offer_002",
    companyId: "co_003",
    companyName: "DataFlow Analytics",
    studentId: "st_001",
    studentName: "Nguyễn Thái Anh",
    title: "Full Stack Internship",
    amount: 5000000,
    duration: "3 months",
    status: "viewed",
    matchScore: 0.88,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "offer_003",
    companyId: "co_002",
    companyName: "Creative Studio HCM",
    studentId: "st_003",
    studentName: "Lê Hương Giang",
    title: "Design Contract — Website Redesign",
    amount: 7500000,
    duration: "4 weeks",
    status: "accepted",
    matchScore: 0.95,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
];

/* ===== ROADMAPS ===== */
export const mockRoadmaps = [
  {
    id: "roadmap_001",
    studentId: "st_001",
    title: "React to Full Stack Engineer",
    status: "ready",
    aiGenerated: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    stepCount: 12,
    completedSteps: 5,
  },
  {
    id: "roadmap_002",
    studentId: "st_003",
    title: "Product Design Specialization",
    status: "ready",
    aiGenerated: true,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    stepCount: 15,
    completedSteps: 12,
  },
];

/* ===== TRIALS ===== */
export const mockTrials = [
  {
    id: "trial_001",
    companyId: "co_001",
    studentId: "st_001",
    status: "active",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
    daysRemaining: 23,
  },
  {
    id: "trial_002",
    companyId: "co_002",
    studentId: "st_003",
    status: "completed",
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    daysRemaining: 0,
  },
];

/* ===== STATUS CHIPS ===== */
export const statusChipConfig = {
  published: { color: "ok", label: "Published" },
  draft: { color: "ink-soft", label: "Draft" },
  queued: { color: "info", label: "Queued" },
  running: { color: "info", label: "Running" },
  ready: { color: "ok", label: "Ready" },
  failed: { color: "danger", label: "Failed" },
  sent: { color: "brand", label: "Sent" },
  viewed: { color: "accent", label: "Viewed" },
  accepted: { color: "ok", label: "Accepted" },
  rejected: { color: "danger", label: "Rejected" },
  active: { color: "ok", label: "Active" },
  completed: { color: "ok", label: "Completed" },
  expired: { color: "danger", label: "Expired" },
};

/* ===== ASYNC JOB STATES ===== */
export const jobStateInfo = {
  queued: {
    label: "Queued",
    color: "info",
    description: "Waiting in generation queue",
  },
  running: {
    label: "Running",
    color: "info",
    description: "Model is building your roadmap",
  },
  ready: {
    label: "Ready",
    color: "ok",
    description: "Roadmap ready to review",
  },
  failed: {
    label: "Failed",
    color: "danger",
    description: "Generation stopped with an error",
  },
};
