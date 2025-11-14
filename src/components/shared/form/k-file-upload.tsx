import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

import { FileText, Upload, X } from 'lucide-react';

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
                      ? 'PDF only (Max 10MB)'
                      : 'PDF, JPG, PNG (Max 10MB)'}
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
              <div className="flex flex-col justify-center h-full px-3">
                <FileText className="w-12 h-12 text-gray-400 mb-2 shrink-0 mx-auto" />
                <p
                  className="text-xs text-gray-300 w-full truncate overflow-hidden text-ellipsis text-center"
                  title={field.value.name}
                >
                  {field.value.name}
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => field.onChange(null)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </FormControl>
  );
}
