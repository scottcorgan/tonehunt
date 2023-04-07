import { Analytics } from "@vercel/analytics/react";
import type { Profile } from "@prisma/client";
import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { Provider } from "jotai";
import { getSession } from "./auth.server";
import { getProfile } from "./services/profile";

import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  {
    rel: "shortcut icon",
    href: "/icons/favicon.png",
  },
  { rel: "icon", sizes: "192x192", href: "/icons/app-icon.png" },
  { rel: "apple-touch-icon", href: "icons/apple-icon.png" },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  description: "ToneHunt - Find amps, pedals, and other models for Neural Amp Modeler.",
  viewport: "width=device-width, initial-scale=1, user-scalable=no",
  keywords: "ToneHunt, Neural Amp Modeler, NAM, models, guitar, ToneX, guitar tone, plugin",

  "og:site_name": "ToneHunt",
  "og:type": "article",

  "msapplication-square310x310logo": "/icons/ms-icon.png",
});

export type RootLoaderData = {
  profile?: Profile;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { session } = await getSession(request);

  if (!session) {
    return json<RootLoaderData>({});
  }

  const profile = await getProfile(session);

  if (!profile) {
    return json<RootLoaderData>({});
  }

  return json<RootLoaderData>({ profile });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-[#141414] text-white min-h-screen">
        <Provider>
          <div className="absolute w-full top-0 left-0">
            <Outlet />
            <ScrollRestoration />

            <Analytics />

            <Scripts />
            <LiveReload />
          </div>
        </Provider>
      </body>
    </html>
  );
}
