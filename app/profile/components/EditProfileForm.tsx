"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/uploadthing";
import Image from 'next/image'
import { UploadDropzone } from "@/lib/uploadthing";

interface EditProfileFormProps {
  user: User;
}

const formSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  role: z.string().min(1, "Role is required"),
  image: z.string().min(1, "Profile image is required"),
});

const roles = [
  { label: "Doctor", value: "Doctor" },
  { label: "Physician Assistant", value: "Physician Assistant" },
  { label: "Nurse", value: "Nurse" },
  { label: "Nurse Practitioner", value: "Nurse Practitioner" },
  { label: "Other", value: "user" },
] as const;

type FormValues = z.infer<typeof formSchema>;

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user }) => {
  const [image, setImage] = useState<string>('');
  const [imageDelete, setImageIsDeleting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user.id,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email,
      phone: user.phone ?? "",
      role: user.role,
      image: user.image ?? "",
    },
  });

  const handleImageDelete = (image: string) => {
      setImageIsDeleting(true);
      const imageKey = image.substring(image.lastIndexOf("/") + 1);
      
      axios.post("/api/uploadthing/delete", {imageKey}).then((res) => {
        if(res.data.success) {
          setImage("");
          toast.success("Profile image deleted");
        }
      }).catch(() => {
        toast.error("Something went wrong");
      }).finally(() => {
        setImageIsDeleting(false);
      })
  }

  const onSubmit = async (values: FormValues) => {
    try {
      await axios.post("/api/user/update", {
        userId: user.id,
        ...values,
      });
      toast.success("User name updated successfully");
    } catch (error) {
      console.error(error);
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                {image ? <>
                  <div className="relative max-w-[200px] min-w-[200px] max-h-[200px] min-h-[200px] mt-4">    
                    <Image fill src={image} alt="Profile Image" className="object-cover w-full h-full" />
                    <Button onClick = {() => handleImageDelete(image)} type='button' size='icon' variant='ghost' className='absolute right-[0px] top-0'>
                      {imageDelete ? <Loader2/> : <XCircle className="h-12 w-12"/>}
                    </Button>
                  </div>
                </> : <>
                  <div className="flex flex-col items-center max-w[400px] p-12 border-2 border-dashed border-primary/50 rounded mt-4">
                    <UploadDropzone
                      endpoint="profileImage"
                      onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        const imageUrl = res[0].url;
                        setImage(imageUrl);
                        toast.success("Profile image uploaded successfully");

                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                </>}
              </FormControl>
            </FormItem>
          )}
        />



        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Number</FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Role</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox">
                      {field.value
                        ? roles.find((role) => role.value === field.value)
                            ?.label
                        : "Select role"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search roles..." />
                    <CommandEmpty>No role found.</CommandEmpty>
                    <CommandGroup>
                      {roles.map((role) => (
                        <CommandItem
                          value={role.label}
                          key={role.value}
                          onSelect={() => {
                            form.setValue("role", role.value);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              role.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {role.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
