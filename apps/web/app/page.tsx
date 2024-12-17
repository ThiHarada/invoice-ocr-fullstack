import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import Navbar from "./components/navbar";
import { getSession } from "./lib/session";

export default async function Home() {
  const session = await getSession()
  
  console.log(session)
  return (
    <div className="flex flex-col flex-1 items-center">
      <h1 className="text-5xl font-bold">Paggo Case - <span className="bg-gradient-to-tr from-cyan-400 to-violet-400 text-transparent bg-clip-text drop-shadow-md">Invoice upload tool</span></h1>
      <h2 className="text-xl">Easily upload and comment over invoice images</h2>
      <div className=" w-full py-4 flex flex-1">
        <div className="flex-1 pr-8 flex flex-col">
          <h2 className="text-2xl font-bold">Features</h2>
          <ul className="list-disc flex-1 flex flex-col justify-around">
            <li className="text-lg">
                <h1 className="font-bold text-xl">Storing invoice images for you</h1> 
                <p> Upload and store invoice images with our OCR tool that makes use of tesseract-ocr, turning it all into text for a super efficient storage for your documents! </p> 
            </li>
            <li className="text-lg">
              <h1 className="font-bold text-xl"> Secure login and sign up authentication </h1> 
              <p> Logging in is secure for both the front and back-end with encrypted session and access tokens making use of argon2 and JWT. No one can see your data apart from you! </p>  
            </li>
            <li className="text-lg"> 
              <h1 className="font-bold text-xl"> Commenting over your invoices  </h1>
              <p> Make comments over your invoices to make reminders. </p>
            </li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col pl-8 border-l-2 border-gray-200">
          <h2 className="text-2xl font-bold">Future features</h2>
          <ul className="list-disc flex-1 flex flex-col justify-around">
            <li className="text-lg">
              <h1 className="font-bold text-xl">
              LLM integration 
              </h1>
              <p>Make things even easier for you! It will respond to your comments and give context to your initial invoice upload</p>
            </li>
            <li className="text-lg">
              <h1 className="font-bold text-xl">
                Uploaded invoices download with comments 
              </h1>
              <p> Sometimes it is so much easier to just download your invoices, and with your comments AND explanations from the LLM. We're working on it! </p>
            </li>
          </ul>

        </div>

      </div>
    </div>
  );
}
