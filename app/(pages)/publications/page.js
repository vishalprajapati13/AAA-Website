import Slider from "@/components/slider-component/Slider";
import { getAllPublicationService } from "@/services/projectServices";
import { NEXT_PUBLIC_WEBSITE_BASE_URL, WEBSITE_MAIN_LOGO } from "@/utils/constant";
import { notFound } from "next/navigation";
import GlobalSplashWrapper from "@/components/pages/splash/GlobalSplashWrapper";

export const dynamic = "force-dynamic";

export async function generateMetadata() {

  const TITLE = "Publications - AAA";
  const DESCRIPTION = "Explore AAA’s publications highlighting design excellence, industry insights, and architectural innovation.";
  const IMAGE = WEBSITE_MAIN_LOGO;
  return {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
      type: "website",
      title: TITLE,
      description: DESCRIPTION,
      images: [
        {
          width: "1200",
          height: "630",
          url: IMAGE,
        },
      ],
    },
    alternates: {
      canonical: `${NEXT_PUBLIC_WEBSITE_BASE_URL}/publications`,
    },
  };
}

const Publications = async() => {
  const data = await getAllPublicationService();

  if (!data || !data?.data || data?.data?.length === 0) {
    notFound();
  }

  return (
    <GlobalSplashWrapper category="publication">
      <Slider projectDetail={data.data} />
    </GlobalSplashWrapper>
  );
}

export default Publications
