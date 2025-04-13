"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

function Info() {
  const { userDetail } = useContext(UserDetailContext);

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl text-primary">
          Hello, {userDetail?.name}
        </h2>
        <div className="flex items-center gap-2">
          <Image src={"/coin.png"} alt="coin" width={30} height={30} />
          <h2 className="font-bold text-2xl">
            {userDetail?.credits} Credit left
          </h2>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <Link href="/create">
          <Button>+ Create New Logo</Button>
        </Link>
      </div>
    </div>
  );
}

export default Info;
