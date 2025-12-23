'use client';

import { useCallback, useState } from 'react';
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CropModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string | null;
  onCrop: (croppedFile: File) => void;
}

export default function CropModal({
  isOpen,
  onClose,
  src,
  onCrop,
}: CropModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      setImageRef(e.currentTarget);
      const initialCrop = centerCrop(
        makeAspectCrop({ unit: '%', width: 90 }, 1, width, height),
        width,
        height
      );
      setCrop(initialCrop);
    },
    []
  );

  const getCroppedImg = useCallback(
    async (image: HTMLImageElement, crop: PixelCrop): Promise<File> => {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Failed to get canvas context');

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], 'profile.jpg', { type: 'image/jpeg' }));
            }
          },
          'image/jpeg',
          0.9
        );
      });
    },
    []
  );

  const handleCropComplete = useCallback(async () => {
    if (completedCrop && imageRef) {
      const croppedFile = await getCroppedImg(imageRef, completedCrop);
      onCrop(croppedFile);
      onClose();
    }
  }, [completedCrop, imageRef, getCroppedImg, onCrop, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-secondary-blue-700 border-primary-blue-400">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-auto">
          {src && (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                onLoad={onImageLoad}
                alt="Crop"
                className="max-w-full"
              />
            </ReactCrop>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCropComplete}>Crop & Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
