import React from "react";
import EditNameForm from "./components/EditNameForm";
import { getUser } from "../actions/get-user";
import { auth } from "@clerk/nextjs";

const Profile = async () => {
  const { userId } = auth();
  const user = await getUser({ userId });
  return (
    <div>
      <p>Edit</p>
      {user != null && <EditNameForm user={user} />}
    </div>
  );
};

export default Profile;
