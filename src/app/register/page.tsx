import Header from "@/components/header.component";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "./form";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.email) redirect("/profile");

  return (
    <>
      <Header />
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <RegisterForm />
          </div>
        </div>
      </section>
    </>
  );
}
