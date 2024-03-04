import Sidebar from "@/components/Sidebar";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton />
      <p>HEY</p>
    </div>
  );
}
