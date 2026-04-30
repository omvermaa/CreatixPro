"use client";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  return (
    <CldUploadWidget 
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} 
      onSuccess={(result: any) => {
        if (result.info && result.info.secure_url) {
          onUpload(result.info.secure_url);
        }
      }}
    >
      {({ open }) => (
        <Button type="button" variant="outline" onClick={() => open()} className="w-full">
          Upload Image
        </Button>
      )}
    </CldUploadWidget>
  );
}
