import ApplyForm from "@/components/pages/apply";
import { jobPositionData } from "@/services/globalServices";

export const dynamic = "force-dynamic";

const Apply = async () => {
  const positions = await jobPositionData();
  return <ApplyForm positions={positions} />;
};

export default Apply;
