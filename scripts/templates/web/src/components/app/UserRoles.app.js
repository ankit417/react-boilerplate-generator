// USER ROLES
export const userRoles = {
  user: {
    access: ["/", "/log-in", "/sign-in", "/dashboard/*"], // /dashboard/* FOR ALL SUB ROUTES OF dashboard
  },
  admin: {
    access: ["*"], // ACESS ALL ROUTES
  },
};
