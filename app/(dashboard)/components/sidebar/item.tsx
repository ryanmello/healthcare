"use client";

import { Hint } from "@/components/hint";
import { HomeIcon } from "lucide-react";

interface ItemProps {
  name: string;
  icon: string;
}

interface Icons {
  [key: string]: React.ComponentType<any>;
}

const icons: Icons = {
  home: HomeIcon,
};

export const Item = ({ name, icon }: ItemProps) => {
  const Icon = icons[icon];
  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <div className="aspect-square">
          <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
            <Icon className="text-white" />
          </button>
        </div>
      </Hint>
    </div>
  );
};
