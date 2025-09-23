import Slider from "@/components/slider-component/Slider";
import { getAllProductService } from "@/services/projectServices";
import { DESCRIPTION_METADATA, NEXT_PUBLIC_WEBSITE_BASE_URL, TITLE_METADATA, WEBSITE_MAIN_LOGO } from "@/utils/constant";

export const dynamic = "force-dynamic";

export async function generateMetadata() {

  const TITLE = `AAA`;
  const DESCRIPTION = 'Innovative architectural firm specializing in product design, master planning, landscape architecture, interior design, and cutting-edge architectural solutions to shape inspiring environments.';
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
      canonical: `${NEXT_PUBLIC_WEBSITE_BASE_URL}`,
    },
  };
}

export default async function Home() {
  const data = await getAllProductService({filter:{ is_featured: true }});
  
  return (
    <>
      <Slider projectDetail={data?.data} />
    </>
  );
}
