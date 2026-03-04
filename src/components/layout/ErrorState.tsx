
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 text-center bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 rounded-xl">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{message}</p>
        <Button asChild>
          <Link href="/">Go Back</Link>
        </Button>
      </Card>
    </div>
  );
}