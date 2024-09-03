"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UploadProfilePicProps {
  onFileSelect: (file: File | null) => void;
}

export default function UploadProfilePic({ onFileSelect }: UploadProfilePicProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [preview, setPreview] = useState<string>("/images/default_profile_pic.jpg");

  const handleButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file (jpg, png, etc.).");
        return;
      }

      setSelectedFile(file);
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Pass the selected file to the parent component
      onFileSelect(file);
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
            id="fileInput"
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
