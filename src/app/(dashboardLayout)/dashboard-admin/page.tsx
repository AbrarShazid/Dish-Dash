import { SectionCardAdminDash } from "@/components/modules/adminDashboard/section-card-adminDash";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col  md:mx-6 mx-4 ">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <h1 className="text-4xl">Admin Dashboard</h1>

          <SectionCardAdminDash />
        </div>
      </div>
    </div>
  );
}
