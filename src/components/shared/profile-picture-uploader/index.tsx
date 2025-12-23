'use client';

import { useRef, useState } from 'react';

import { User, X } from 'lucide-react';

import CropModal from './crop-modal';
import PreviewModal from './preview-modal';

interface ProfilePictureUploaderProps {
  files: File | null;
  onChange: (file: File | null) => void;
}

export default function ProfilePictureUploader({
  files,
  onChange,
}: ProfilePictureUploaderProps) {
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const image = files ? URL.createObjectURL(files) : null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempImage(e.target?.result as string);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = (croppedFile: File) => {
    setCropModalOpen(false);
    onChange(croppedFile);
  };

  const handleDelete = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
    setPreviewModalOpen(false);
  };

  const handleReupload = () => {
    setPreviewModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      {!image ? (
        <>
          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
            id="profile-picture-upload"
          />
          <label
            htmlFor="profile-picture-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-secondary-blue-600 hover:bg-secondary-blue-500 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <User className="w-8 h-8 mb-2 text-gray-400" />
              <p className="mb-1 text-sm text-gray-300">
                <span className="font-semibold">Photo (Optional)</span>
              </p>
              <p className="text-xs text-gray-400">JPG, PNG (Max 5MB)</p>
            </div>
          </label>
        </>
      ) : (
        <div
          className="relative w-full h-32 border-2 border-gray-600 rounded-lg overflow-hidden bg-secondary-blue-600 cursor-pointer"
          onClick={() => setPreviewModalOpen(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="Preview"
            className="w-full h-full object-contain"
          />
          <button
            type="button"
            onClick={handleDelete}
            className="absolute top-2 right-2 bg-red-500/50 hover:bg-red-500/70 cursor-pointer text-white rounded-full p-1.5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <CropModal
        isOpen={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        src={tempImage}
        onCrop={handleCrop}
      />
      <PreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        src={image}
        onDelete={handleDelete}
        onReupload={handleReupload}
      />
    </div>
  );
}
