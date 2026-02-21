import { menuService } from "@/services/menu.service";
import Link from "next/link";

export default async function AllMealsPage() {
  const { data, error } = await menuService.getAllMenuItem();

  return (
    <div className=" flex gap-3">
      {data ? (
        data.data.map((item: any) => (
          <div key={item.id} className="bg-red-800 text-white p-3 rounded-xl">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.categoryName}</p>
            <p>Price: ${item.price}</p>
            <Link href={`/meals/${item.id}`} className="bg-gray-700 p-2 rounded-lg mt-2">See Details</Link>
          </div>
        ))
      ) : (
        <p>{error?.message || "No menu items available!"}</p>
      )}
    </div>
  );
}
