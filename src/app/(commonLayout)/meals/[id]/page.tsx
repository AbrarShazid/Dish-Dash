import { menuService } from "@/services/menu.service";

export default async function ItemDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await menuService.getMenuById(id);

  return (
    <div className="bg-gray-400 text-black rounded-2xl p-4">
      <h1>{data?.data.name}</h1>
      <p>{data?.data.description}</p>

      <img
        src={data?.data.imageUrl || "https://surl.li/swgyfr"}
        alt={data?.data.name || "Meal Image"}
      />

      <p>Price: ${data?.data.price}</p>
      <p>Category: {data?.data.categoryName}</p>
      <p>Provider: {data?.data.providerName}</p>
    </div>
  );
}
