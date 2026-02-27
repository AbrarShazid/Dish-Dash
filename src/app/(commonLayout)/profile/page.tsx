import Link from "next/link";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default async function MyProfile() {
  const { data, error } = await userService.getUserProfile();

  if (error || !data) {
    return (
      <div className="container mx-auto py-20 text-center text-red-500">
        {error?.message || "Failed to load profile"}
      </div>
    );
  }

  const getInitials = () => {
    return data.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container mx-auto py-16 px-4 max-w-3xl">
      <Card className="shadow-lg bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all">
        <CardHeader className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={data.image || ""} />
            <AvatarFallback className="bg-linear-to-r from-amber-500 to-orange-600 text-white text-lg">
              {getInitials()}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-3xl font-bold">{data.name}</h1>

          <div className="flex gap-3">
            <Badge variant="secondary">{data.role}</Badge>
            <Badge
              variant={data.status === "ACTIVATE" ? "default" : "destructive"}
            >
              {data.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 mt-6">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-lg font-medium">{data.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email Verified</p>
            <p className="text-lg font-medium">
              {data.emailVerified ? "Yes" : "No"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Member Since</p>
            <p className="text-lg font-medium">
              {new Date(data.createdAt).toLocaleDateString()}
            </p>
          </div>

          <Button asChild className="w-full mt-6">
            <Link href="/profile/update">Update Profile</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
