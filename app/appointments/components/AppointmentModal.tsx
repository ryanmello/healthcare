"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AppointmentModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Button onClick={() => router.push("/appointments/create")}>
      <p className="font-semibold pr-1">Create appointment</p>
      <PlusIcon size={16} />
    </Button>
  );
};

export default AppointmentModal;
