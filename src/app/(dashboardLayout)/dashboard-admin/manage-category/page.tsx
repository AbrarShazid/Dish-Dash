
import { AddCategoryForm } from '@/components/modules/adminDashboard/addCategoryForm';
import { CategoryList } from '@/components/modules/adminDashboard/categoryList';
import { categoryService } from '@/services/category.service';


export default async function ManageCategory() {
  const { data, error } = await categoryService.getAllCategory();

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Failed to load categories</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:mx-6 mx-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Categories
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Total {data?.length || 0} categories
        </p>
      </div>

      {/* Add Category Form */}
     <AddCategoryForm></AddCategoryForm>

      {/* Categories List */}
      <CategoryList categories={data || []} />
    </div>
  );
}