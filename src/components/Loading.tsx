import React from "react";
import { createPortal } from "react-dom";

type LoadingModalProps = {
  open: boolean;
};

const LoadingModal: React.FC<LoadingModalProps> = ({ open }) => {
  if (!open) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  //using Create Portal to say that this componnet will render in modalRoot-not main root
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-6 shadow-xl">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>,
    modalRoot,
  );
};

export default LoadingModal;
