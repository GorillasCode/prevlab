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
          <span className="sr-only">Close</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}
