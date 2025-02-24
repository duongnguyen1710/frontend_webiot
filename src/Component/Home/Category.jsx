"use client";

import { useEffect, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  Dialog,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../State/Category/Action";
import Carousel from "./Carousel";
import CategoryCarousel from "./CategoryCarousel";
import { useNavigate, useParams } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Category() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  // Lấy danh mục từ Redux store
  const { category } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategory({ id: 1 })); // Fetch danh mục với ID giả định
  }, [dispatch]);

  const handleProductByCategory = (categoryId, restaurantId) => {
    navigate(`/product/${categoryId}/1`);
  };

  return (
    <div className="bg-white mt-0 pt-0">
      {/* Mobile filter dialog */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <div className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto w-full max-w-xs bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-md bg-white p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <form className="mt-4 border-t border-gray-200">
              <ul role="list" className="px-2 py-3 text-gray-900 font-medium">
                {category.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`/category/${item.id}`}
                      className="block px-2 py-3"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            DANH MỤC SẢN PHẨM
          </h1>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>
              <ul role="list" className="space-y-4 text-gray-900 font-medium">
                {category.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="hover:underline"
                      onClick={() => handleProductByCategory(item.id)}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </form>

            {/* Product grid */}
            <div className="lg:col-span-3 space-y-10">
              {/* Carousel */}
              <div className="w-full">
                <Carousel />
              </div>
            </div>
          </div>
        </section>

        {/* Category Carousel */}
        <div>
          <CategoryCarousel />
        </div>
      </main>
    </div>
  );
}
