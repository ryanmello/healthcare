"use client";

import { Item } from "./item";
import { HomeIcon } from "lucide-react";

const userMemberships = [
  {
    organization: {
      id: "1",
      name: "Organization 1",
      icon: HomeIcon,
    },
  },
  {
    organization: {
      id: "2",
      name: "Organization 2",
      icon: HomeIcon,
    },
  },
];

export const List = () => {
  return (
    <ul className="space-y-4">
      {userMemberships.map((mem) => (
        <Item
          key={mem.organization.id}
          name={mem.organization.name}
          icon="home"
        />
      ))}
    </ul>
  );
};
