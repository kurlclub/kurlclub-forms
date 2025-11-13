'use client';

import React, { useMemo, useRef, useState } from 'react';

import { CircleUser, Plus, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import CropModal from './crop-modal';
import PreviewModal from './preview-modal';

interface ProfilePictureUploaderProps {
  files: File | null;
  onChange: (file: File | null) => void;
  isSmall?: boolean;
  existingImageUrl?: string | null;
}

export default function ProfilePictureUploader({
  files,
  onChange,
  isSmall,
  existingImageUrl,
}: ProfilePictureUploaderProps) {
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const image = useMemo(() => {
    if (croppedImage) return croppedImage;
    if (files) return URL.createObjectURL(files);
    if (existingImageUrl) return existingImageUrl;
    return null;
  }, [files, existingImageUrl, croppedImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCurrentFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempImage(e.target?.result as string);
        setCroppedImage(null);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = (croppedImageData: string) => {
    if (currentFile) {
      const croppedFile = new File([currentFile], currentFile.name, {
        type: currentFile.type,
      });
      setCroppedImage(croppedImageData);
      setCropModalOpen(false);
      onChange(croppedFile);
    }
  };

  const handleDelete = () => {
    setCroppedImage(null);
    setPreviewModalOpen(false);
    setCurrentFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
  };

  const handleReupload = () => {
    setPreviewModalOpen(false);
    setCroppedImage(null);
    setTempImage(null);
    setCurrentFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col">
      {image ? (
        <Avatar
          className={`${isSmall ? 'size-16' : 'size-[92px]'} cursor-pointer`}
          onClick={() => setPreviewModalOpen(true)}
        >
          <AvatarImage src={image} alt="Profile picture" />
          <AvatarFallback>
            <User className="w-16 h-16" />
          </AvatarFallback>
        </Avatar>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className={`${isSmall ? 'size-16' : 'size-[92px]'} bg-secondary-blue-400 rounded-[60px] hover:bg-secondary-blue-500 relative`}
          onClick={() => fileInputRef.current?.click()}
        >
          <CircleUser
            className={`${isSmall ? 'size-8!' : 'size-11!'} text-secondary-blue-100`}
          />
          <span
            className={`absolute bottom-0 right-0 ${isSmall ? 'size-5' : 'size-6'} p-1 bg-primary-green-500 flex justify-center items-center rounded-[60px]`}
          >
            <Plus
              className={` ${isSmall ? 'size-2!' : 'size-3!'} text-secondary-blue-500`}
            />
          </span>
        </Button>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
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
