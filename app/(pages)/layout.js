import Header from "@/components/layout/header";
import SplashWrapper from "@/components/pages/splash/SplashWrapper";

export default function PagesLayout({ children }) {
  return (
    <div>
      <main>  
        <SplashWrapper>
          <Header />
          {children}
        </SplashWrapper>
      </main>
    </div>
  );
}
