import { SquareCheckBig, SquareUser, UsersRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface CardGuestInfoProps {
  nameGuest: string;
  listCompanions: string[];
  description?: string;
}

export function CardGuestInfo({
  nameGuest,
  listCompanions,
  description,
}: CardGuestInfoProps) {
  return (
    <div className="p-1 max-w-md w-full min-h-10 rounded-md bg-white">
      <div className="flex w-full justify-between p-2 max-sm:flex-col max-sm: gap-2">
        <div className="text-lg font-medium px-1 flex gap-2 items-center">
          <Avatar>
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${nameGuest}`}
              alt="avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {nameGuest}
        </div>
        <Button className="bg-background hover:bg-slate-900">
          <SquareCheckBig size={48} />
          check
        </Button>
      </div>

      <div className="flex flex-col px-4 mt-4">
        <p className="text-slate-800 w-full text-xs font-semibold p-2 flex gap-2">
          <UsersRound strokeWidth={2} size={15} />
          Acompanhantes:
        </p>
      </div>
      <div className="w-full flex flex-col px-5 gap-2 mb-2">
        {listCompanions.map((name) => (
          <div key={name} className="border rounded-md p-1">
            <div className="flex w-full justify-between">
              <span className="text-slate-600 w-full text-sm flex gap-1 items-center p-1">
                <SquareUser strokeWidth={0.5} /> {name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
