import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

interface DeleteDialogProps {
  id: string;
  directive: string;
  type: "text" | "icon";
  message?: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  id,
  directive,
  type,
  message,
}) => {
  const handleDelete = async () => {
    try {
      await axios.post(`/api/${directive}/delete`, { id: id });
      toast.success("Deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        {type == "icon" ? (
          <TrashIcon size={16} />
        ) : (
          <div className="w-28 flex items-center p-2 cursor-pointer">
            <p className="text-sm">Delete {directive}</p>
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <p className="font-semibold text-lg">Are you sure?</p>
        <p className="text-sm">{message}</p>
        <DialogTrigger>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex ml-auto"
          >
            Delete
          </Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
