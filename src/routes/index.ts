export const ROUTES = {
  home: "/",
  features: "/features",
  about: "/about",
  contact: "/contact",
  login: "/login",
  signUp: "/sign-up",

  //dashboard
  dashboard: "/dashboard",
  dashboardDevice: "/dashboard/devices",
  dashboardAnalytics: "/dashboard/analytics",
  dashboardEncryption: "/dashboard/encryption",
  dashboardSecurityLogs: "/dashboard/security-logs",
  dashboardSettings: "/dashboard/settings",
  dashboardSimulator: "/dashboard/simulator",
};

export const mainNav = [
  {
    name: "Home",
    path: ROUTES.home,
  },
  {
    name: "Features",
    path: ROUTES.features,
  },
  {
    name: "About",
    path: ROUTES.about,
  },
  {
    name: "Contact",
    path: ROUTES.contact,
  },
];
