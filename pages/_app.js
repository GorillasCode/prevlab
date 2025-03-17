import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { DashboardUsersProvider } from "../context/userContext";
function MyApp({ Component, pageProps }) {
  return (
    <DashboardUsersProvider>
      <Component {...pageProps} />;
    </DashboardUsersProvider>
  )
}

export default MyApp;
