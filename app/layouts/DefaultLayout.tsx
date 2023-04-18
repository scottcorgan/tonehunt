import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Sidebar from "~/components/Sidebar";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@prisma/client";
import type { PropsWithChildren } from "react";
import { getSampleTags } from "~/services/tags";
import { Form, Link, NavLink } from "@remix-run/react";
import { twMerge } from "tailwind-merge";
import {
  ListBulletIcon,
  StarIcon,
  QueueListIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UserIcon,
  EllipsisVerticalIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Button from "~/components/ui/Button";
import RelatedDropdown from "~/components/RelatedDropdown";

interface DefaultLayoutType {
  user?: User | null | undefined;
  profile?: Profile | null | undefined;
  className?: string | null;
}

const nav1 = [
  {
    title: "Following",
    href: "/",
    icon: HomeIcon,
    requiresAuth: false,
  },
  {
    title: "Favorites",
    href: "/account/my-favorites",
    icon: StarIcon,
    requiresAuth: true,
  },
  {
    title: "My Models",
    href: "/account/my-models",
    requiresAuth: true,
    icon: QueueListIcon,
  },
];

const nav2 = [
  { title: "Newest", href: "/newest", icon: ClockIcon },
  { title: "Trending", href: "/trending", icon: ArrowTrendingUpIcon },
  { title: "Popular", href: "/popular", icon: ChartBarIcon },
];

const DefaultLayout = (props: PropsWithChildren<DefaultLayoutType>) => {
  const { user, profile } = props;
  console.log("profile", profile);

  return (
    <div className="">
      <Header user={user} profile={profile} />
      <div className="flex p-3">
        <nav className="flex-1 flex justify-end mr-5 sticky top-2 h-fit pb-[84px] overflow-auto">
          <ul
            className="list-none p-0 m-0 w-[240px] pt-5 font-satoshi-medium flex flex-col"
            style={{ height: "calc(100vh - 130px)" }}
          >
            {nav1
              .filter((item) => {
                if (item.requiresAuth && !user) {
                  return false;
                }

                return true;
              })
              .map((item) => {
                return (
                  <li key={item.href} className="my-1">
                    <NavLink
                      to={item.href}
                      prefetch="intent"
                      className={({ isActive }) => {
                        return twMerge(
                          "block px-5 py-2 rounded-full text-lg",
                          isActive
                            ? "text-tonehunt-purple"
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
                <li key={item.href} className="my-1">
                  <NavLink
                    to={item.href}
                    prefetch="intent"
                    className={({ isActive }) => {
                      return twMerge(
                        "block px-5 py-2 rounded-full text-lg",
                        isActive
                          ? "text-tonehunt-purple"
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
                      <UserIcon className="block w-8 h-8 rounded-full p-2 bg-tonehunt-green mr-4" />
                    </div>
                    <div className="flex-grow truncate max-w-[120px]">@{profile.username}</div>
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
        <div className="w-full max-w-3xl mb-8 mt-8 lg:mb-16 lg:mt-5 xl:mb-16 px-3">{props.children}</div>

        <nav className="flex-1 ml-5"></nav>
      </div>

      <Footer />
    </div>
  );
};

export default DefaultLayout;
