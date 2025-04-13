"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/configs/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

function LogoList() {
  const { userDetail } = useContext(UserDetailContext);
  const [logoList, setLogoList] = useState([]);

  useEffect(() => {
    userDetail && GetUserLogos();
  }, [userDetail]);

  const GetUserLogos = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userDetail?.email, "logos")
    );
    setLogoList([]);
    querySnapshot.forEach((doc) => {
      setLogoList((prev) => [...prev, doc.data()]);
    });
  };

  const ViewLogo = (image) => {
    const imageWindow = window.open();
    imageWindow.document.write(`<img src="${image}" alt="Base" />`);
  };
  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {logoList?.length > 0
          ? logoList?.map((logo, index) => (
              <div
                key={index}
                className="hover:scale-105 transition-all cursor-pointer"
                onClick={() => ViewLogo(logo?.image)}
              >
                <Image
                  src={logo?.image}
                  width={400}
                  height={200}
                  className="w-full rounded-xl"
                  alt="logo"
                />
                <h2 className="text-center text-lg font-medium mt-2 capitalize">
                  {logo?.title}
                </h2>
                <p className="text-sm text-gray-500 text-center">
                  {logo?.desc}
                </p>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 animate-pull rounded-xl w-full h-[200px]"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default LogoList;
