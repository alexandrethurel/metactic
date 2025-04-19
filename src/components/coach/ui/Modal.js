// components/ui/Modal.jsx
import { X } from "lucide-react";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
