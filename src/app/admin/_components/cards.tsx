import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
interface cardProps{
    quantity:number;
    label:string;
    icon:LucideIcon;
}
export function AdminCard(Props:cardProps){
    return(
        <Card className="shadow-sm flex p-3 flex-col justify-between h-fit gap-3">
            <div className="flex justify-between items-end w-full">
                <h2 className="text-3xl ">{Props.quantity}</h2>
                <div className="rounded-full bg-muted-foreground size-10 flex items-center justify-center">
                    <Props.icon size={20} color="white" />
                </div>
            </div>
            <div>
                <h2 className="text-lg text-muted-foreground">{Props.label}</h2>
            </div>
        </Card>
    );
}