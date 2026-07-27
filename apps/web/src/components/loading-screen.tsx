import { Spinner } from "@/components/ui/spinner";

interface LoadingScreenProps {
  label?: string;
}

export const LoadingScreen = ({ label = "Loading..." }: LoadingScreenProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <Spinner className="size-8" />
      <p className="leading-7 mt-3">{label}</p>
    </div>
  );
};
