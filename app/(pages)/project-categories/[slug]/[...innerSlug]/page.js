import InnerSlider from "@/components/slider-component/inner-slider";
import {
  getProductDetail,
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

export async function generateMetadata({ params, searchParams }) {
  const { innerSlug, slug } = await params;
  let data;

  if (innerSlug.length > 1) {
    data = await getProductDetail(innerSlug[1]);
  } else {

    data = await getProductDetail(innerSlug[0]);
  }

  const TITLE = data?.data?.project_meta_title || TITLE_METADATA;
  const DESCRIPTION =
    data?.data?.project_meta_description || DESCRIPTION_METADATA;
  const IMAGE = data?.data?.project_feature_image || WEBSITE_MAIN_LOGO;
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
      canonical: `${NEXT_PUBLIC_WEBSITE_BASE_URL}/project-categories/${slug}/${innerSlug.join("/")}`,
    },
  };
}

const page = async ({ params }) => {
  const { innerSlug, slug } = await params;
  let data;

  if (innerSlug.length > 1) {
    data = await getProductDetail(innerSlug[1]);
  } else {
    data = await getProductDetail(innerSlug[0]);
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

export default page;
