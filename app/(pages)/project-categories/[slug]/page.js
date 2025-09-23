import React from "react";
import { getAllProductService } from "@/services/projectServices";
import Slider from "@/components/slider-component/Slider";
import {
  DESCRIPTION_METADATA,
  NEXT_PUBLIC_WEBSITE_BASE_URL,
  TITLE_METADATA,
  WEBSITE_MAIN_LOGO,
} from "@/utils/constant";
import { notFound } from "next/navigation";
import GlobalSplashWrapper from "@/components/pages/splash/GlobalSplashWrapper";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const TITLE = `${slug} - AAA` || TITLE_METADATA;
  const DESCRIPTION = DESCRIPTION_METADATA;
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
      canonical: `${NEXT_PUBLIC_WEBSITE_BASE_URL}/project-categories/${slug}`,
    },
  };
}

const page = async ({ params }) => {
  const { slug } = await params;

  const data = await getAllProductService({
    filter: {
      category_slug: [slug],
    },
  });

  if (!data || !data?.data || data?.data?.length === 0) {
    notFound();
  }

  const content = <Slider projectDetail={data?.data} baseRoute={slug} />;

  const validCategories = ['architecture', 'interior', 'landscape', 'masterplan', 'product'];

  if (validCategories.includes(slug)) {
    return <GlobalSplashWrapper category={slug}>{content}</GlobalSplashWrapper>;
  }

  return content;
};

export default page;
