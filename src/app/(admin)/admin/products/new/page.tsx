"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm as useRHForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";

const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description needs to be longer"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().optional(),
  minOrderQty: z.coerce.number().min(1),
  customizationOptions: z.string().optional(),
});

export default function NewProductPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  const { register, handleSubmit, watch, formState: { errors } } = useRHForm({
    resolver: zodResolver(productSchema),
  });

  const selectedCategory = watch("category");

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.data);
        }
      })
      .catch(err => console.error("Failed to fetch categories:", err));
  }, []);

  const onSubmit = async (data: any) => {
    if (!imageUrl) {
      setError("Please upload an image first.");
      return;
    }
    
    setLoading(true);
    setError("");

    const formattedData = {
      ...data,
      imageUrl,
      customizationOptions: data.customizationOptions ? data.customizationOptions.split(',').map((s: string) => s.trim()) : [],
    };

    // Prevent Mongoose from trying to cast empty string to ObjectId
    if (!formattedData.subcategory) {
      delete formattedData.subcategory;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData)
      });
      
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Failed to create product");
      }
      
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const activeCategoryObj = categories.find(c => c._id === selectedCategory);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h1>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <Input {...register("name")} placeholder="Executive Gift Box" />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message as string}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select {...register("category")} className="w-full h-10 px-3 py-2 rounded-md border border-input bg-transparent text-sm">
              <option value="">Select Category...</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subcategory (Optional)</label>
            <select {...register("subcategory")} className="w-full h-10 px-3 py-2 rounded-md border border-input bg-transparent text-sm" disabled={!selectedCategory || !activeCategoryObj?.subcategories?.length}>
              <option value="">Select Subcategory...</option>
              {activeCategoryObj?.subcategories?.map((s: any) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea {...register("description")} rows={4} placeholder="Premium quality..." />
          {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message as string}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Min. Order Qty</label>
            <Input type="number" {...register("minOrderQty")} defaultValue={50} />
            {errors.minOrderQty && <p className="text-sm text-red-500 mt-1">{errors.minOrderQty.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Customizations (comma separated)</label>
            <Input {...register("customizationOptions")} placeholder="Logo Engraving, Custom Box" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Product Image (Cloudinary)</label>
          <ImageUpload onUpload={(url) => setImageUrl(url)} />
          {imageUrl && (
            <div className="mt-4 border p-2">
              <img src={imageUrl} alt="Uploaded preview" className="h-32 object-contain" />
            </div>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-[#0A0A0A] hover:bg-[#0A0A0A]/90 text-white">
          {loading ? "Creating..." : "Save Product"}
        </Button>
      </form>
    </div>
  );
}
