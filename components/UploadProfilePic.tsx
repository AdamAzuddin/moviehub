"use client";
import { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UploadProfilePic() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");
  const [preview, setPreview] = useState<string>("/images/default_profile_pic.jpg");

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file (jpg, png, etc.).");
        return;
      }

      setError(""); // Clear any previous errors

      // Update the preview with the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Handle the file upload logic here
      console.log('Selected file:', file);
    }
  };

  return (
    <Card className="w-full max-w-sm flex flex-col items-center border-none">
      <CardHeader>
        <CardTitle>Upload Picture</CardTitle>
        <CardDescription>Select a new picture</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="grid gap-0.5">
          <img
            src={preview}
            width={150}
            height={150}
            alt="Current profile picture"
            className="rounded-full"
            style={{ aspectRatio: "150/150", objectFit: "cover" }}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
          <Button size="sm" onClick={handleButtonClick}>Upload new picture</Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </CardContent>
    </Card>
  );
}
