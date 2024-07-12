import { getRecentAppointmentsList } from "@/lib/actions/appointment.actions";
import Admin from "@/components/Admin";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentsList();
  return <Admin initialAppointments={appointments} />;
};

export default AdminPage;
