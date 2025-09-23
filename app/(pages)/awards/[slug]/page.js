import InnerSlider from "@/components/slider-component/inner-slider";
import {
  getProductDetail,
  getAwardDetail,
  getPublicationDetail,
} from "@/services/projectServices";
import {
  DESCRIPTION_METADATA,
  NEXT_PUBLIC_WEBSITE_BASE_URL,
  TITLE_METADATA,
  WEBSITE_MAIN_LOGO,
} from "@/utils/constant";
import { notFound } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let data;

  try {
    data = await getAwardDetail(slug);
  } catch (error) {
    console.log(error);
  }

  const TITLE = data?.data?.award_meta_title || TITLE_METADATA;
  const DESCRIPTION =
    data?.data?.award_meta_description || DESCRIPTION_METADATA;
  const IMAGE = data?.data?.award_feature_image || WEBSITE_MAIN_LOGO;
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
      canonical: `${NEXT_PUBLIC_WEBSITE_BASE_URL}/awards/${slug}`,
    },
  };
}

const Page = async ({ params }) => {
  const { slug } = await params;
  let data;

  try {
    data = await getAwardDetail(slug);
  } catch (error) {
    console.log(error);
  }

  if (!data || !data?.data || data?.data?.length === 0) {
    notFound();
  }

  return (
    <>
      <InnerSlider projectDetail={data?.data} />
    </>
  );
};

export default Page;
