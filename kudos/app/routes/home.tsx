import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Layout } from "~/components/layout";
import { UserPanel } from "~/components/user-panel";
import { requireUserId } from "~/utils/auth.server";
import { GetOtherUsers } from "~/utils/users.server";
import { useLoaderData, Outlet } from "@remix-run/react";
import { getFilteredKudos } from "~/utils/kudo.server";
import { Kudo } from "~/components/kudo";
import type { Kudo as IKudo, Profile } from "@prisma/client";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const users = await GetOtherUsers(userId);
  const kudos = await getFilteredKudos(userId, {}, {});
  return json({ users, kudos });
};

interface KudoWithAuthor extends IKudo {
  author: {
    profile: Profile;
  };
}

export default function Home() {
  const { users, kudos } = useLoaderData();
  return (
    <Layout>
      <Outlet />
      <div className='h-full flex'>
        <UserPanel users={users} />
        <div className='flex-1 flex flex-col'>
          {/* SearchBar */}
          <div className='flex-1 flex'>
            <div className='w-full p-10 flex flex-col gap-y-4'>
              {kudos.map((kudo: KudoWithAuthor) => (
                <Kudo key={kudo.id} kudo={kudo} profile={kudo.author.profile} />
              ))}
            </div>
            {/* RecentKudos */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
