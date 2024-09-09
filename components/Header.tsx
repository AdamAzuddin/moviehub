"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import SearchButton from "./SearchButton";
import React, { useState } from "react";
import { ProfileAvatar } from "./ProfileAvatar";
import useStore from "@/store/store";
import MenuIcon from "./icons/MenuIcon";

export default function Header() {
  const user = useStore((state) => state.user);
  const profilePic = useStore((state) => state.profilePic);
  const username = useStore((state) => state.username);
  const [isSheetOpen, setSheetOpen] = useState(false);

  const closeSheet = () => {
    setSheetOpen(false);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        {/* Mobile menu */}
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild >
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setSheetOpen(true)}
            >
              <MenuIcon className="h-6 w-6 cypress-menu" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="cypress-close-menu">
            <Link href="/" prefetch={false} onClick={closeSheet}>
              <span className="sr-only">ShadCN</span>
            </Link>
            <Link href="/profile" onClick={closeSheet} className="cypress-avatar-mobile">
              <ProfileAvatar
                profilePicUrl={
                  profilePic ? profilePic : "/images/default_profile_pic.jpg"
                }
              />
            </Link>
            <p className="mt-6 text-sm">@{username}</p>
            <div className="grid gap-2 py-6">
              <Link
                href="/"
                className="flex w-full items-center py-2 text-lg font-semibold cypress-menu-item"
                prefetch={false}
                onClick={closeSheet}
              >
                Home
              </Link>
              <Link
                href="/movies"
                className="flex w-full items-center py-2 text-lg font-semibold cypress-menu-item"
                prefetch={false}
                onClick={closeSheet}
              >
                Movies
              </Link>
              <Link
                href="/series"
                className="flex w-full items-center py-2 text-lg font-semibold cypress-menu-item"
                prefetch={false}
                onClick={closeSheet}
              >
                TV Series
              </Link>
              <Link
                href="/watchlist"
                className="flex w-full items-center py-2 text-lg font-semibold cypress-menu-item"
                prefetch={false}
                onClick={closeSheet}
              >
                Watchlist
              </Link>
              <Link
                href="/favourites"
                className="flex w-full items-center py-2 text-lg font-semibold cypress-menu-item"
                prefetch={false}
                onClick={closeSheet}
              >
                Favourites
              </Link>
              {!user ? (
                <Link href="/auth" onClick={closeSheet}>
                  <Button variant="outline" className="cypress-menu-item">Sign In</Button>
                </Link>
              ) : null}
            </div>
          </SheetContent>
        </Sheet>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm lg:text-xl font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
              >
                Home
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/movies"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm lg:text-xl font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
              >
                Movies
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/series"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm lg:text-xl font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
              >
                TV Series
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/watchlist"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm lg:text-xl font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
              >
                Watchlist
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/favourites"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm lg:text-xl font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
              >
                Favourites
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto lg:justify-end flex items-center lg:cypress-search-button">
          <SearchButton/>
          {!user ? (
            <Link href={"/auth"}>
              <Button variant="outline">Sign In</Button>
            </Link>
          ) : (
            <Link href={"/profile"} className="cypress-avatar-desktop">
              <ProfileAvatar
                profilePicUrl={
                  profilePic ? profilePic : "/images/default_profile_pic.jpg"
                }
              />
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}
