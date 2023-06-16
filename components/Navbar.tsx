"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SessionProvider, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="fixed w-full px-4 sm:px-24 lg:px-48 bg-slate-950 bg-opacity-50 border-b-[1px] border-neutral-950 backdrop-blur-sm z-50">
      <nav className="flex justify-between items-center p-5">
        <div className="group flex flex-row gap-3 items-center">
          <Image
            src={"/logos/logo.svg"}
            width={40}
            height={40}
            alt="Sac Slippi Logo"
          />
          <span className="font-bold uppercase italic">
            Sacramento Slippi Leaderboard
          </span>
        </div>
        <ul className="flex flex-row gap-5 invisible sm:visible">
          <li>
            <Dialog>
              <DialogTrigger asChild>
                <Link className="hover:text-sky-300 transition-all" href="/">
                  Join the leaderboard
                </Link>
              </DialogTrigger>
              <DialogOverlay className="bg-black bg-opacity-50 backdrop-blur-sm">
                <DialogContent className="sm:max-w-[425px] bg-black border-[1px] border-white">
                  <DialogHeader>
                    <DialogTitle>Join the Leaderboard</DialogTitle>
                    <DialogDescription>
                      Please enter your info below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="name"
                        className="whitespace-nowrap col-span-1"
                      >
                        Player Tag
                      </Label>
                      <Input
                        id="name"
                        placeholder="mang0"
                        className="col-span-4"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="username"
                        className="whitespace-nowrap col-span-1"
                      >
                        Connect Code
                      </Label>
                      <Input
                        id="connectCode"
                        placeholder="MANG#0"
                        className="col-span-4"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      className="m-auto border-[1px] border-white hover:bg-neutral-800"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </DialogOverlay>
            </Dialog>
          </li>
          {session && (
            <li>
              <Link
                className="hover:text-sky-300 transition-all"
                href="/api/auth/signout"
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

const NavBarWithSession = () => {
  return (
    <SessionProvider refetchOnWindowFocus={true}>
      <NavBar />
    </SessionProvider>
  );
};

export default NavBarWithSession;
