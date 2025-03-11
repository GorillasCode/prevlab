import React from 'react';

export default function ExamModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl max-h-full overflow-y-auto flex flex-col relative">
        <button
          className="absolute top-2 right-2 text-green-500 hover:text-green-800"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="grid grid-cols-2 gap-4">{children}</div>
      </div>
    </div>
  );
}
