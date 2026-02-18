import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar1";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl p-6">
            {children}
          </div>
        </div>
      </main>
      
     <Footer></Footer>
    </div>
  );
}