import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MovieProvider } from "@/context/MovieContext";
import { UserProvider } from "@/context/userContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer position="top-right" autoClose={3000} />
        <MovieProvider>
          <UserProvider>
            <Navbar />
            {children}
            <Footer />
          </UserProvider>
        </MovieProvider>
      </body>
    </html>
  );
}
