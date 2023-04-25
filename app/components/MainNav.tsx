import type { User } from "@supabase/supabase-js";
import type { Profile } from "@prisma/client";
import { Form, Link, NavLink } from "@remix-run/react";
import { twMerge } from "tailwind-merge";
import {
  StarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UserIcon,
  HomeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Button from "~/components/ui/Button";
import RelatedDropdown from "~/components/RelatedDropdown";
import Avatar from "./Avatar";

const nav1 = [
  {
    title: "Following",
    href: (profile?: Profile | null) => "/",
    icon: HomeIcon,
    requiresAuth: true,
  },
  {
    title: "Favorites",
    href: (profile?: Profile | null) => "favorites",
    icon: StarIcon,
    requiresAuth: true,
  },
  {
    title: "My Profile",
    href: (profile?: Profile | null) => `/${profile?.username}`,
    requiresAuth: true,
    icon: UserIcon,
  },
];

const nav2 = [
  { title: "All Models", href: (profile?: Profile | null) => "/all", icon: GlobeAltIcon },
  { title: "Trending", href: (profile?: Profile | null) => "/trending", icon: ArrowTrendingUpIcon },
  { title: "Popular", href: (profile?: Profile | null) => "/popular", icon: ChartBarIcon },
];

type MainNavProps = {
  user?: User | null;
  profile?: Profile | null;
};

export default function MainNav({ user, profile }: MainNavProps) {
  return (
    <nav className="flex-1 flex-grow flex justify-end mr-10 sticky top-2 h-fit pb-[84px] overflow-auto">
      <ul className="list-none p-0 m-0 w-[220px] pt-5 font-satoshi-medium flex flex-col">
        {nav1
          .filter((item) => {
            if (item.requiresAuth && !user) {
              return false;
            }

            return true;
          })
          .map((item) => {
            return (
              <li key={item.href(profile)} className="my-1">
                <NavLink
                  to={item.href(profile)}
                  prefetch="intent"
                  className={({ isActive }) => {
                    return twMerge(
                      "block px-5 py-2 rounded-full text-lg",
                      isActive
                        ? "text-tonehunt-purple bg-tonehunt-gray-medium"
                        : "hover:text-white text-white/80 hover:bg-tonehunt-gray-medium"
                    );
                  }}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" /> {item.title}
                  </span>
                </NavLink>
              </li>
            );
          })}

        {!user ? <></> : <li className="pt-5" />}

        {nav2.map((item) => {
          return (
            <li key={item.href(profile)} className="my-1">
              <NavLink
                to={item.href(profile)}
                prefetch="intent"
                className={({ isActive }) => {
                  return twMerge(
                    "block px-5 py-2 rounded-full text-lg",
                    isActive
                      ? "text-tonehunt-purple bg-tonehunt-gray-medium"
                      : "hover:text-white text-white/80 hover:bg-tonehunt-gray-medium"
                  );
                }}
              >
                <span className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" /> {item.title}
                </span>
              </NavLink>
            </li>
          );
        })}

        {user && profile ? (
          <li className="fixed bottom-0 pb-10 px-5 cursor-pointer bg-[#141414]">
            <div className="flex items-center">
              <Link
                to={`/${profile?.username}`}
                className="flex items-center hover:bg-tonehunt-gray-medium rounded-full pr-2 pl-2 relative -left-2 py-2"
              >
                <div>
                  <Avatar src={profile.avatar} size={8} className="w-8 mr-4 bg-tonehunt-purple" />
                </div>
                <div className="flex-grow truncate max-w-[120px] pr-2">@{profile.username}</div>
              </Link>

              <RelatedDropdown className="cursor-default">
                <ul className="list-none p-0 m-0 flex flex-col gap-2">
                  <li>
                    <Link to="/account/profile" prefetch="intent" className="hover:underline">
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/change-password" prefetch="intent" className="hover:underline">
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <Form method="post" action="/logout">
                      <Button variant="link" className="hover:underline">
                        Logout
                      </Button>
                    </Form>
                  </li>
                </ul>
              </RelatedDropdown>
            </div>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
