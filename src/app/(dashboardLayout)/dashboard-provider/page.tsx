import { SectionCardProviderDash } from "@/components/modules/providerDashboard/section-card-providerDash";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col  md:mx-6 mx-4 ">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4  md:gap-6 ">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics
          </h1>
          <SectionCardProviderDash />
        </div>
      </div>
    </div>
  );
}
