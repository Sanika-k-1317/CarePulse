import PatientForms from "@/components/forms/PatientForms";
import { Button } from "@/components/ui/button";
import PasskeyModel from "@/components/ui/PasskeyModel";
import Link from "next/link";
import Image from "next/image";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModel />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <PatientForms />
          <div className="text-14-regular mt-20 justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePlus
            </p>
          </div>
          <Link href="/?admin=true" className="text-green-500 xl:text-right">
            Admin
          </Link>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patients"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
