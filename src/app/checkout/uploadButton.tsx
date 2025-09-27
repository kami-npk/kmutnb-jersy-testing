"use client";

import { useState } from "react";

type UploadButtonProps = {
  onSelect: (file: File) => void; // callback ส่งไฟล์กลับไป
};

export default function UploadButton({ onSelect }: UploadButtonProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // สร้าง preview จาก file blob
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);

    // ส่ง file กลับไปที่ parent
    onSelect(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <label className="cursor-pointer border-2 border-[#E53535] text-[#E53535] px-4 py-2 rounded hover:bg-[#f8e3e3]">
        Choose Slip
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      {imageUrl && (
        <div className="mt-3">
          <p className="text-sm text-gray-600">Selected Image:</p>
          <img
            src={imageUrl}
            alt="Preview"
            className="w-60 h-auto object-cover rounded-[3px]"
          />
        </div>
      )}
    </div>
  );
}
