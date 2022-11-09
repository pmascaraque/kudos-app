import { json, LoaderFunction } from "@remix-run/node";
import { Layout } from "~/components/layout";
import { UserPanel } from "~/components/user-panel";
import { requireUserId } from "~/utils/auth.server";
import { GetOtherUsers } from "~/utils/users.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const users = await GetOtherUsers(userId);
  return json({ users });
};

export default function Home() {
  const { users } = useLoaderData();
  return (
    <Layout>
      <div className='h-full flex'>
        <UserPanel users={users} />
      </div>
    </Layout>
  );
}
