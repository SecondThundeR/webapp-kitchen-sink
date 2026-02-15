import { Link } from "react-router";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const ROUTES_MAPPING = [
  {
    link: "/inspector",
    title: "WebApp Data Inspector",
  },
  {
    link: "/theme-params",
    title: "Theme Params Playground",
  },
  {
    link: "/haptic-feedback",
    title: "Haptic Feedback Playground",
  },
  {
    link: "/biometric-manager",
    title: "Biometric Manager Playground",
  },
];

export const RootPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Telegram Mini Apps Kitchen Sink
        </h1>
        {import.meta.env.VITE_GIT_SHA && (
          <p className="text-sm text-muted-foreground">
            Commit hash: {import.meta.env.VITE_GIT_SHA}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {ROUTES_MAPPING.map(({ link, title }) => (
          <Link key={link} to={link}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
