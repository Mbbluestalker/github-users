import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserCard = ({ name, img, profile_link }) => {
  return (
    <div className="h-40 bg-white flex items-center gap-5 shadow-2xl w-full p-5 rounded-lg">
      <Image
        src={img}
        width={50}
        height={50}
        className="rounded-full"
        alt="Name"
      />

      <div>
        <h3 className="text-gray-700">{name}</h3>
        <p className="text-gray-400 text-sm">
          <Link href={profile_link}>View Profile</Link>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
