import { Button } from "@/components/ui/button";
import { menuService } from "@/services/menu.service";
import Link from "next/link";

export default async function Home() {
  const { data, error } = await menuService.getAllMenuItem({
    limit: 5,
  });
  

  return (
    <div className=" flex gap-3">
      {data ? (
        data.data.map((item: any) => (
          <div key={item.id} className="bg-red-800 text-white p-3 rounded-xl">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.categoryName}</p>
            <p>Price: ${item.price}</p>
            <Link href={`/meals/${item.id}`} className="text-blue-500 underline">See Details</Link>
          </div>
        ))
      ) : (
        <p>{error?.message || "No menu items available!"}</p>
      )}
    </div>
  );
}
