"use client";

import Header from "@/components/header.component";
import { useEffect, useState, useTransition } from "react";
import { DefaultUserType } from "../../../next-auth";
import { updateProfileName } from "./_actions";

export default function Profile() {
  const [profileData, setprofileData] = useState<null | DefaultUserType>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    void fetch(`/api/profile/`, { next: { tags: ["profile"] } })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setprofileData(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Header />
      <section className="bg-ct-blue-600  min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div>
            <p className="mb-3 text-5xl text-center font-semibold">
              Profile Page
            </p>
            {!profileData ? (
              <p>Loading...</p>
            ) : (
              <div className="flex items-center gap-8">
                <div>
                  <img
                    src={
                      profileData.image
                        ? profileData.image
                        : "/images/default.png"
                    }
                    className="max-h-36"
                    alt={`profile photo of ${profileData.name}`}
                  />
                </div>
                <div className="mt-8">
                  <p className="mb-3">Name: {profileData.name}</p>
                  <p className="mb-3">Email: {profileData.email}</p>
                  <button
                    onClick={() =>
                      startTransition(() => {
                        updateProfileName("fathi");
                      })
                    }
                  >
                    Change name to {"Test"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
