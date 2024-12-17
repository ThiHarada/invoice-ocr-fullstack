import Link from "next/link";
import React from "react";
import NavButton from "./NavButton";

const AppBar = () => {
  return (
    <div className="flex min-h-10 bg-white shadow-lg px-5 sticky top-0">
      <Link href={"/"} className=" px-4 flex items-center transition hover:bg-gray-300">Home</Link>
      <Link href={"/upload"} className=" px-4 flex items-center transition hover:bg-gray-300">Upload files</Link>
      <Link href={"/invoices"} className=" px-4 flex items-center transition hover:bg-gray-300">Uploaded files</Link>
      <NavButton />
    </div>
  );
};

export default AppBar;