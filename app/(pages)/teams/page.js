import TeamsForm from "@/components/pages/teams";
import { getAllEmployee } from "@/services/projectServices";
export const dynamic = "force-dynamic";

const TeamsPage = async () => {
  const employeeData = await getAllEmployee();

  return <TeamsForm EmployeeData={employeeData} />;
};

export default TeamsPage;
