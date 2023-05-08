import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

export const PlayerCard = () => {
  return (
    <Card>
      <CardHeader className="border-b border-border">
        <PlayerMeta />
      </CardHeader>
      <CardContent className="flex flex-col gap-5 p-6">
        <PlayerMains />
        <PlayerRoles />
      </CardContent>
      <CardFooter className="flex flex-col gap-3 p-6 border-t border-border">
        <div>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <PlayerMetaFooter />
      </CardFooter>
    </Card>
  );
};

const PlayerMeta = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div>
          <Avatar size="lg">
            <AvatarFallback>Pl</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <CardTitle>Niceu</CardTitle>
          <CardDescription>Estonia, 17</CardDescription>
        </div>
      </div>

      <div className="w-fit">
        <Image
          src="/assets/ranks/dia/Diamond_2_Rank.png"
          alt="diamond 2"
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};

const PlayerMains = () => {
  return (
    <div className="flex flex-col gap-3">
      <span className="flex gap-1 text-sm font-medium leading-none">
        <p>Main</p>
        <p className="text-muted-foreground">+ fills</p>
      </span>
      <div className="flex gap-2">
        <div className="pr-2 border-r border-border">
          <Avatar size="lg">
            <AvatarImage src="/assets/agents/jett.webp" />
          </Avatar>
        </div>

        <div className="flex gap-2">
          <Avatar size="lg">
            <AvatarImage src="/assets/agents/raze.webp" />
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src="/assets/agents/sova.webp" />
          </Avatar>
        </div>
      </div>
    </div>
  );
};

const PlayerRoles = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-1 p-1 rounded-sm bg-muted text-muted-foreground">
      <PlayerRoleItem role="IGL" />
      <PlayerRoleItem role="Leader" active />
      <PlayerRoleItem role="Support" active />
      <PlayerRoleItem role="Entry" active />
      <PlayerRoleItem role="Operator" />
      <PlayerRoleItem role="Passive" />
    </div>
  );
};

const PlayerRoleItem = ({
  active,
  role,
}: {
  active?: boolean;
  role: string;
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-background text-foreground shadow-sm": !!active,
        }
      )}
    >
      {role}
    </div>
  );
};

const PlayerMetaFooter = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-xs leading-none text-muted-foreground">1 hour ago</p>
      <div className="flex items-center gap-1">
        <p className="text-xs leading-none text-muted-foreground">Member of</p>
        <Avatar>
          <AvatarImage
            src="/assets/ranks/iron/Iron_1_Rank.png"
            alt="some team"
          />
        </Avatar>
      </div>
    </div>
  );
};
