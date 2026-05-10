"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductActions({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete product");
      }
    } catch (err) {
      alert("Error deleting product");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link href={`/admin/products/${id}/edit`}>
        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
      </Link>
      <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "..." : "Delete"}
      </Button>
    </>
  );
}
