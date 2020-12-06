export const userRoles = {
  admin: {
    access: ["*"],
  },
  user: {
    access: ["/", "/log-in"],
  },
};
