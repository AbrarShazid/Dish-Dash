import { SectionCards } from "@/components/layout/section-cards";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />

          <h1 className="text-9xl">Admin Dashboard</h1>
        </div>
      </div>
    </div>
  );
}
