import React from "react";
import Page from "@/components/layout/page";
import { getPageBySlug } from "@/services/globalServices";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const page = async ({ params }) => {
  const { slug } = await params;
  const data = await getPageBySlug(slug);

  if (!data || !data?.data || data?.data?.length === 0) {
    notFound();
  }

  if(!data?.data?.page_is_published){
    notFound();
  }

  return <Page pageDetail={data?.data} />;
};

export default page;
