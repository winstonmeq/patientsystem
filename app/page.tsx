import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {


  const session = await auth.api.getSession({
    headers: await headers()    
  });

 

  if (!session) {
    return redirect('/sign-in')
  } else {
    return redirect('/records')
  }



  return (
    <div className="h-screen bg-green-900 flex flex-col">
  

      {/* Centered Welcome Text */}
      <div className="flex flex-col items-center justify-center gap-4 flex-grow">
        <h1 className="text-white text-3xl">Welcome Back</h1>
        <Link href={"/records"}><Button>Continue</Button></Link>
      </div>
    </div>
  );
}
