// components/modules/allMealsPage/mealsClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Search, X, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import MenuItemCard from "../homePage/itemCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface Category {
  id: string;
  name: string;
}

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "createdAt-desc", label: "Newest First" },
  { value: "createdAt-asc", label: "Oldest First" },
];

export default function MealsClient({ initialData, error, searchParams, categories }: any) {
  const router = useRouter();
  const pathname = usePathname();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.search || "");
  const [categoryId, setCategoryId] = useState(searchParams.categoryId || "");
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || "");
  const [sortBy, setSortBy] = useState(
    sortOptions.find(
      (opt) => opt.value === `${searchParams.sortBy}-${searchParams.sortOrder}`,
    )?.value || "createdAt-desc",
  );
  const [currentPage, setCurrentPage] = useState(searchParams.page || 1);

  // Update URL when filters change
  const updateFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (categoryId) params.set("categoryId", categoryId);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sortBy) {
      const [sortByField, sortOrder] = sortBy.split("-");
      params.set("sortBy", sortByField);
      params.set("sortOrder", sortOrder);
    }
    if (currentPage !== 1) params.set("page", String(currentPage));

    router.push(`${pathname}?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("createdAt-desc");
    setCurrentPage(1);
    router.push(pathname);
  };

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Handle other filters
  useEffect(() => {
    updateFilters();
  }, [categoryId, minPrice, maxPrice, sortBy, currentPage]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <div className="max-w-7xl mx-auto text-center py-12">
          <p className="text-red-600 dark:text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

  const meals = initialData?.data || [];
  const meta = initialData?.meta || { total: 0, page: 1, limit: 9 };
  const totalPages = Math.ceil(meta.total / meta.limit);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-700 dark:text-gray-300"
          >
            <Filter className="w-5 h-5" />
            Filter & Sort
          </button>
        </div>

        {/* Main Content */}
        <div className="flex gap-4">
          {/* Desktop Sidebar - Sticky */}
          <div className="hidden lg:block w-80 shrink-0 ">
            <div className="sticky top-24">
              <FilterSidebar
                search={search}
                setSearch={setSearch}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sortBy={sortBy}
                setSortBy={setSortBy}
                categories={categories}
                sortOptions={sortOptions}
                clearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {isFilterOpen && (
            <MobileFilterDrawer
              onClose={() => setIsFilterOpen(false)}
              search={search}
              setSearch={setSearch}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categories={categories}
              sortOptions={sortOptions}
              clearFilters={clearFilters}
            />
          )}

          {/* Meals Grid - 3/4 width */}
          <div className="flex-1">
            {/* Search Bar - Top of the grid area */}
            <div className="mb-6 lg:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search meals..."
                  className="w-full pl-9 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Meals Display */}
            {meals.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400">
                  No meals found
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-orange-600 dark:text-orange-400 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search meals..."
                      className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {meals.map((item: any) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-medium transition ${
                            currentPage === page
                              ? "bg-black dark:bg-white text-white dark:text-black"
                              : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-center my-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {meals.length} of {meta.total} meals
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Desktop Filter Sidebar
function FilterSidebar({
  search,
  setSearch,
  categoryId,
  setCategoryId,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  categories,
  sortOptions,
  clearFilters,
}: any) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-white">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Clear all
        </button>
      </div>

      {/* Sort with shadcn dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sort by
        </label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectValue placeholder="Select sorting" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option: any) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories - Dynamic from backend */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded">
            <input
              type="radio"
              name="category"
              checked={categoryId === ""}
              onChange={() => setCategoryId("")}
              className="text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              All Categories
            </span>
          </label>
          {categories.map((category: any) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={categoryId === category.id}
                onChange={(e) => setCategoryId(e.target.value)}
                className="text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>
    </div>
  );
}

// Mobile Filter Drawer
function MobileFilterDrawer({ onClose, ...props }: any) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Filters
            </h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <FilterSidebar {...props} />
        </div>
      </div>
    </div>
  );
}