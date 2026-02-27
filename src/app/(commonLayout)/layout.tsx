import { Footer } from "@/components/layout/footer";
import NavbarServer from "@/components/layout/navbarServer";
export const dynamic = "force-dynamic";
export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarServer></NavbarServer>

      <main className="flex-1">
        <div className="container mx-auto sm:px-4  py-8">
          <div className="bg-linear-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl sm:p-6 p-3">
            {children}
          </div>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}
