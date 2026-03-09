
import { Card } from "@/components/ui/card";
import { MenuSquare } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message?: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4 ">
      <Card className="w-full max-w-md p-12 text-center bg-gray-100 dark:bg-gray-800">
        <MenuSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h2>
        {message && (
          <p className="text-gray-500 dark:text-gray-400">{message}</p>
        )}
      </Card>
    </div>
  );
}