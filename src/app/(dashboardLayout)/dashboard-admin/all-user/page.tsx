import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, CalendarDays } from "lucide-react";
import Link from "next/link";
import { UserStatusToggle } from "@/components/modules/adminDashboard/userStatusToggle";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getUserInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function AllUser() {
  const { data, error } = await userService.getAlluser();

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 text-center bg-linear-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 rounded-xl">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {error.message}
          </p>
          <Button asChild>
            <Link href="/dashboard/admin">Go Back</Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-12 text-center">
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            No users found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Users will appear here once they register
          </p>
        </Card>
      </div>
    );
  }

  // Stats
  const totalUsers = data.length;
  const activeUsers = data.filter((u: any) => u.status === "ACTIVATE").length;
  const suspendedUsers = data.filter((u: any) => u.status === "SUSPEND").length;

  return (
    <div className="space-y-6 px-4 md:px-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          All Users
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage all users across the platform
        </p>
      </div>

      {/* Stats Cards - Simplified for mobile */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
          <CardContent className="p-3 sm:p-4 text-center">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
              Total
            </p>
            <p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-50">
              {totalUsers}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
          <CardContent className="p-3 sm:p-4 text-center">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
              Active
            </p>
            <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
              {activeUsers}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
          <CardContent className="p-3 sm:p-4 text-center">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
              Suspended
            </p>
            <p className="text-lg sm:text-2xl font-bold text-red-600 dark:text-red-400">
              {suspendedUsers}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Table - Hidden on mobile */}
      <div className="hidden xl:block">
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-semibold">
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                  <TableRow>
                    <TableHead className="w-75">User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((user: any) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={user.image || ""}
                              alt={user.name}
                            />
                            <AvatarFallback className="bg-linear-to-r from-amber-600 to-orange-600 text-white">
                              {getUserInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-gray-300 dark:border-gray-600"
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.status === "ACTIVATE"
                              ? "border-green-300 text-green-700 dark:border-green-800 dark:text-green-400"
                              : "border-red-300 text-red-700 dark:border-red-800 dark:text-red-400"
                          }
                        >
                          {user.status === "ACTIVATE" ? "Active" : "Suspended"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CalendarDays className="w-4 h-4" />
                          {formatDate(user.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <UserStatusToggle
                          userId={user.id}
                          currentStatus={user.status}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Cards - Visible only on mobile */}
      <div className="xl:hidden space-y-3">
        {data.map((user: any) => (
          <Card
            key={user.id}
            className="border shadow-sm bg-white dark:bg-gray-900"
          >
            <CardContent className="p-4">
              {/* User Info */}
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.image || ""} alt={user.name} />
                  <AvatarFallback className="bg-linear-to-r from-amber-600 to-orange-600 text-white">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Role
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-1 border-gray-300 dark:border-gray-600"
                  >
                    {user.role}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <Badge
                    variant="outline"
                    className={`mt-1 ${
                      user.status === "ACTIVATE"
                        ? "border-green-300 text-green-700 dark:border-green-800 dark:text-green-400"
                        : "border-red-300 text-red-700 dark:border-red-800 dark:text-red-400"
                    }`}
                  >
                    {user.status === "ACTIVATE" ? "Active" : "Suspended"}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Joined
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <CalendarDays className="w-4 h-4" />
                    {formatDate(user.createdAt)}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-gray-800">
                <UserStatusToggle
                  userId={user.id}
                  currentStatus={user.status}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
