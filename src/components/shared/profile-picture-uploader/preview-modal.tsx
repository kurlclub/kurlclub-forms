import KDialog from '@/components/shared/form/k-dialog';
import { Button } from '@/components/ui/button';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string | null;
  onDelete: () => void;
  onReupload: () => void;
}

export default function PreviewModal({
  isOpen,
  onClose,
  src,
  onDelete,
  onReupload,
}: PreviewModalProps) {
  return (
    <KDialog
      footer={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onDelete}>
            Delete
          </Button>
          <Button onClick={onReupload}>Re-upload</Button>
        </div>
      }
      open={isOpen}
      onOpenChange={onClose}
      title="Profile Picture Preview"
      className="max-w-[500px]"
    >
      {src && (
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt="Profile picture"
            className="rounded-full w-[250px] h-[250px] object-cover"
          />
        </div>
      )}
    </KDialog>
  );
}
