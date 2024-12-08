import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/src/components/ui/card";

interface CardItemDashboardProps {
  title: string;
  content: string;
  description: string;
}

export function CardItemDashboard({
  title,
  content,
  description,
}: CardItemDashboardProps) {
  return (
    <Card className="p-2 max-w-xs min-h-52">
      <CardHeader className="text-bas font-medium">{title}</CardHeader>
      <CardContent className="text-5xl  w-full text">{content}</CardContent>
      <CardDescription className="w-full text-center px-2">
        {description}
      </CardDescription>
    </Card>
  );
}
