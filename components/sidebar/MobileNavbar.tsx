import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MOBILE_NAV_LINKS } from "@/config";
import Link from "next/link";
import { Separator } from "../ui/separator";

const MobileSidebar = () => {
  return (
    <div className="block md:hidden cursor-pointer">
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <div className="pt-10 space-y-4">
            {MOBILE_NAV_LINKS.map((link) => (
              <div key={link.href}>
                <SheetClose asChild>
                  <Link href={link.href}>
                    <p className="text-xl font-semibold hover:underline">
                      {link.label}
                    </p>
                  </Link>
                </SheetClose>
              </div>
            ))}
            <Separator />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;