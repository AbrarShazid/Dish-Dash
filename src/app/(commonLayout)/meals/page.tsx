// app/meals/page.tsx
import MealsClient from "@/components/modules/allMealsPage/mealsClient";
import { categoryService } from "@/services/category.service";
import { menuService } from "@/services/menu.service";

interface SearchParams {
  search?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
}

export default async function AllMealsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  
  const { data, error } = await menuService.getAllMenuItem({
    search: params.search,
    categoryId: params.categoryId,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    sortBy: params.sortBy || "createdAt",
    sortOrder: params.sortOrder || "desc",
    page: params.page ? Number(params.page) : 1,
    limit: 9,
  });

  const { data: categoryData, error: categoryError } = await categoryService.getAllCategory();

  return (
    <MealsClient 
      initialData={data} 
      error={error} 
      searchParams={params} 
      categories={categoryData?.data || []} 
    />
  );
}