import Image from 'next/image';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

import { Upload, X } from 'lucide-react';

import { FormControl } from '@/components/ui/form';

interface KFileUploadProps<T extends FieldValues> {
  field: ControllerRenderProps<T, FieldPath<T>>;
  name: string;
  label?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  disabled?: boolean;
}

export function KFileUpload<T extends FieldValues>({
  field,
  name,
  label,
  type,
  disabled,
}: KFileUploadProps<T>) {
  return (
    <FormControl>
      <div className="space-y-2">
        {!field.value ? (
          <>
            <input
              type="file"
              id={name}
              accept={
                type === 'image'
                  ? 'image/*'
                  : type === 'document'
                    ? '.pdf'
                    : '.pdf,.jpg,.jpeg,.png'
              }
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                field.onChange(file);
              }}
              disabled={disabled}
              className="hidden"
            />
            <label
              htmlFor={name}
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-secondary-blue-600 hover:bg-secondary-blue-500 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="mb-1 text-sm text-gray-300">
                  <span className="font-semibold">
                    {label || 'Upload file'}
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  {type === 'image'
                    ? 'JPG, PNG (Max 5MB)'
                    : type === 'document'
                      ? 'PDF only (Max 4MB)'
                      : 'PDF, JPG, PNG (Max 4MB)'}
                </p>
              </div>
            </label>
          </>
        ) : (
          <div className="relative w-full h-32 border-2 border-gray-600 rounded-lg overflow-hidden bg-secondary-blue-600">
            {type === 'image' && (field.value as unknown) instanceof File ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={URL.createObjectURL(field.value)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col justify-center h-full gap-3 px-3">
                <span className="mx-auto">
                  <Image
                    alt="pdf"
                    height={40}
                    width={40}
                    src={'/assets/svg/pdf_icon.svg'}
                  />
                </span>
                <p
                  className="text-[10px] sm:text-xs text-wrap text-gray-300 w-full text-center"
                  title={field.value.name}
                >
                  {field.value.name}
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => field.onChange(null)}
              className="absolute top-2 right-2 bg-red-500/50 hover:bg-red-500/70 cursor-pointer text-white rounded-full p-1.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </FormControl>
  );
}
