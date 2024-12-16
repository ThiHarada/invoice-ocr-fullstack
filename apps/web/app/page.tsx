import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import Navbar from "./components/navbar";
import { getSession } from "./lib/session";

export default async function Home() {
  const session = await getSession()
  
  console.log(session)
  return (
    <>
    </>
  );
}
