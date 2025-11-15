import { CheckCircle } from 'lucide-react';

export default function SuccessScreen() {
  return (
    <div className="bg-background-dark min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-secondary-blue-700 rounded-lg shadow-sm p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500/10 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-3">
            Registration Complete!
          </h1>

          <p className="text-gray-400 text-base leading-relaxed mb-6">
            Thank you for registering with us. Your membership application has
            been submitted successfully. We&apos;ll get in touch with you
            shortly.
          </p>

          <div className="pt-4 border-t border-white/10">
            <p className="text-sm text-gray-500">You can now close this page</p>
          </div>
        </div>
      </div>
    </div>
  );
}
