import React from "react";

export const DashboardUsersContext = React.createContext([false, () => {}]);

export const DashboardUsersProvider = ({ children }) => {
  const [state, setState] = React.useState({ app: "Dashboard", email: "" });

  return (
    <DashboardUsersContext.Provider value={[state, setState]}>
      {children}
    </DashboardUsersContext.Provider>
  );
};
