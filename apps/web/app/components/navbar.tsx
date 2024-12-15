import Link from "next/link";
import React from "react";
import NavButton from "./NavButton";

const AppBar = () => {
  return (
    <div className="flex gap-2">
      <Link href={"/"}>Home</Link>
      <Link href={"/upload"}>Upload files</Link>
      <Link href={"/invoices"}>Uploaded files</Link>
      <NavButton />
    </div>
  );
};

export default AppBar;