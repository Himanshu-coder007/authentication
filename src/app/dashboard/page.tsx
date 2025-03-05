import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96">
        <Alert className="border-l-4 border-red-500">
          <Info className="h-5 w-5 text-blue-500" />
          <AlertTitle>Heads Up!</AlertTitle>
          <AlertDescription>
            This is an alert component from ShadCN UI.
          </AlertDescription>
        </Alert>
      </div>
    </main>
  );
}
