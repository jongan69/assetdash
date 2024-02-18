import ECommerce from "@/components/Dashboard/E-commerce";
import Loader from "@/components/common/Loader";
import { Session, createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Metadata } from "next";
import { AppProps } from "next/app";
import { Suspense, useState } from "react";

const metadata: Metadata = {
  title: "Asset Dashboard",
  description: "Manage all of your assets in one place and deploy your own trading bots",
  // other metadata
};

export default function Home() {
  // const [supabase] = useState(() => createPagesBrowserClient())

  return (
    <Suspense fallback={<Loader />}>
      <ECommerce />
    </Suspense>
  );
}
