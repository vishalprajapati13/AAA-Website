import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import { Providers } from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "AAA",
  description: "AAA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children} <ToastContainer autoClose={1000} limit={1} />
        </Providers>
      </body>
    </html>
  );
}
