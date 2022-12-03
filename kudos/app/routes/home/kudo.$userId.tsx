import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Modal } from "~/components/modal";
import { getUserById } from "~/utils/users.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { userId } = params;
  if (typeof userId !== "string") {
    return redirect("/home");
  }
  const user = await getUserById(userId);
  return json({ user });
};

export default function KudoModal() {
  const { user } = useLoaderData();
  return (
    <Modal isOpen={true} className='w-2/3 p-10'>
      <h2> {user.profile.firstName} </h2>
    </Modal>
  );
}
