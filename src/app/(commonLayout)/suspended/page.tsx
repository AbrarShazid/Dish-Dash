// app/suspended/page.tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SuspendedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <Card className="w-full max-w-md p-8 text-center bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden rounded-xl">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Account Suspended
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your account has been suspended. Please contact support for assistance.
        </p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </Card>
    </div>
  );
}