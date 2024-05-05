import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { PlusIcon } from "lucide-react";

const formSchema = z.object({
  text: z.string().min(2, {
    message: "Note must be at least 2 characters.",
  }),
});

interface AddNoteDialogProps {
  patientId?: string;
  appointmentId?: string;
  isTable: boolean;
}

const AddNoteDialog: React.FC<AddNoteDialogProps> = ({
  patientId,
  appointmentId,
  isTable,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { text } = values;
      await axios.post("/api/note/create", {
        text,
        patientId,
        appointmentId,
      });

      toast.success("Note added");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        {isTable ? (
          <div className="w-28 flex items-center p-2 cursor-pointer">
            <p className="text-sm">Add Note</p>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="border-[1px] border-slate-700 rounded-md space-x-2"
          >
            <PlusIcon size={14} />
            <p className="font-semibold">Add Note</p>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Note</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;
