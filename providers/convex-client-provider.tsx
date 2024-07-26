"use client";

import { Button } from "@/components/ui/button";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
} from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import Image from "next/image";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <SignedOut>
          <main className='m-5'>
            <div className='flex flex-col items-center justify-center mx-auto h-[calc(100vh-50px)] max-w-[1700px] bg-left-panel border-4'>
              <div className='fixed top-0 left-0 w-full h-36 bg-green-primary dark:bg-transparent -z-30' />
              <Image
                src={"/desktop-hero.png"}
                alt='Hero'
                width={320}
                height={188}
              />
              <p className='text-3xl font-extralight mt-5 mb-2'>
                WhatsApp Clone
              </p>
              <SignInButton>
                <Button className='rounded-full my-5 bg-green-primary hover:bg-green-secondary'>
                  Sign In to continue
                </Button>
              </SignInButton>
            </div>
          </main>
        </SignedOut>
        <SignedIn>{children}</SignedIn>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
