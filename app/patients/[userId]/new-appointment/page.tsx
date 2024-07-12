import PatientForms from "@/components/forms/PatientForms";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import * as Sentry from "@sentry/nextjs";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId);
  console.log(userId);
  Sentry.metrics.set("user_view_new-appointment", patient.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm
            userId={userId}
            patientId={patient.$id}
            type="create"
          />
          <p className="copyright mt-12 py-12">© 2024 CarePlus</p>

          <Link href="/?admin=true" className="text-green-500 xl:text-right">
            Admin
          </Link>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="patients"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
