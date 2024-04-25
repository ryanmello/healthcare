"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import PatientCombobox from "../../components/PatientCombobox";
import { Patient, User } from "@prisma/client";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { TimePicker } from "@/components/time-picker/TimePicker";
import { FullAppointment } from "@/config";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  patientId: z.string().min(2),
  userId: z.string().min(2),
  unformattedDate: z.date({
    required_error: "A date is required.",
  }),
  description: z.string().min(2),
  unformattedDuration: z.string().min(2),
});

const EditAppointmentForm = ({
  patients,
  users,
  currentAppointment,
  setCurrentAppointment,
}: {
  patients: Patient[];
  users: User[];
  currentAppointment: FullAppointment;
  setCurrentAppointment: Dispatch<SetStateAction<FullAppointment>>;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: currentAppointment.patientId,
      unformattedDate: new Date(currentAppointment.date),
      userId: currentAppointment.userId,
      description: currentAppointment.description,
      unformattedDuration: currentAppointment.duration.toString(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const {
        patientId,
        userId,
        unformattedDate,
        description,
        unformattedDuration,
      } = values;
      const utcDateString = unformattedDate;
      const utcDate = new Date(utcDateString);
      const date = utcDate.toLocaleString();
      const duration = parseInt(unformattedDuration);

      await axios.post("/api/appointment/update", {
        appointmentId: currentAppointment.id,
        patientId,
        userId,
        date,
        description,
        duration,
      });

      const updatedAppointment = {
        ...currentAppointment,
        patientId,
        userId,
        date,
        description,
      };

      setCurrentAppointment(updatedAppointment);
      toast.success("Appointment updated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="patientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient</FormLabel>
              <FormControl>
                {patients && (
                  <PatientCombobox
                    patients={patients}
                    onChange={field.onChange}
                    passedValue={field.value}
                    name={field.name}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    ref={field.ref}
                  />
                )}
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <FormControl>
                {users && (
                  <PatientCombobox
                    patients={users}
                    onChange={field.onChange}
                    passedValue={field.value}
                    name={field.name}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    ref={field.ref}
                  />
                )}
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center">
          <div className="w-2/3 mt-[10px] pr-2">
            <FormField
              control={form.control}
              name="unformattedDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-left">Date</FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP HH:mm:ss")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className="w-full p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                      <div className="p-3 border-t border-border">
                        <TimePicker
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="unformattedDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={currentAppointment.duration.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="20">20 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="40">40 minutes</SelectItem>
                      <SelectItem value="50">50 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditAppointmentForm;
