import Slider from "@/components/slider-component/Slider";
import { getAllAwardService } from "@/services/projectServices";
import { DESCRIPTION_METADATA, NEXT_PUBLIC_WEBSITE_BASE_URL, TITLE_METADATA, WEBSITE_MAIN_LOGO } from "@/utils/constant";
import { notFound, redirect } from "next/navigation";
import GlobalSplashWrapper from "@/components/pages/splash/GlobalSplashWrapper";

export const dynamic = "force-dynamic";

export async function generateMetadata() {

  const TITLE = "Awards - AAA";
  const DESCRIPTION = "Explore the prestigious awards and recognitions earned by AAA for excellence in architecture, interior design, master planning, and innovation in the built environment.";
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
      canonical: `${NEXT_PUBLIC_WEBSITE_BASE_URL}/awards`,
    },
  };
}

const Award = async () => {  
  const data = await getAllAwardService();

  if (!data || !data?.data || data?.data?.length === 0) {
    notFound();
  }

  return (
    <GlobalSplashWrapper category="awards">
      <Slider projectDetail={data?.data}/>
    </GlobalSplashWrapper>
  );
}

export default Award;

