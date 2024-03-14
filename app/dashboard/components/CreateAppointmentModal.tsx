"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

const CreateAppointmentModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm">
          <PlusIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <p>HELLO</p>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppointmentModal;
