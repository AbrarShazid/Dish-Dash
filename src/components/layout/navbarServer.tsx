import { userService } from "@/services/user.service";
import { Navbar } from "./navbar1";
export default async function NavbarServer() {
  const { data } = await userService.getSession();

  const user = data
    ? {
        name: data.user.name,
        role: data.user.role,
        email: data.user.email,
        image: data.user.image,
      }
    : null;

  return <Navbar user={user} />;
}
