import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/routes";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  const onNavigate = (route: string) => navigate(route);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
          <CardDescription>
            Replace and edit an Instructions document
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            <Button
              className="bg-blue-600 rounded-xl text-white"
              onClick={() => onNavigate(routes.instructions)}
            >
              GO!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
