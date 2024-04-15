import EditProfileForm from "./components/EditProfileForm";
import { getUser } from "../actions/get-user";
import { auth } from "@clerk/nextjs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Profile = async () => {
  const { userId } = auth();
  const user = await getUser({ userId });

  return (
    <MaxWidthWrapper className="mt-4">
      {user && (
        <div>
          <div className="w-1/2">
            <p className="text-lg font-semibold mb-2">Edit Profile</p>
            <EditProfileForm user={user} />
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default Profile;
