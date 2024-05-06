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
import { PencilIcon, PlusIcon } from "lucide-react";
import { FullNote } from "@/config";

const formSchema = z.object({
  text: z.string().min(2, {
    message: "Note must be at least 2 characters.",
  }),
});

interface EditNoteDialogProps {
  note: FullNote;
}

const EditNoteDialog: React.FC<EditNoteDialogProps> = ({ note }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: note.text,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { text } = values;

      await axios.post("/api/note/update", {
        noteId: note.id,
        text,
      });

      toast.success("Note updated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <PencilIcon size={16} />
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edit Note</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogTrigger>
              <Button type="submit">Submit</Button>
            </DialogTrigger>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditNoteDialog;
