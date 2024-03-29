// "use client";

import React, { useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  // onClose?: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  // onClose,
  footer,
  header,
}: ModalProps) => {
  return (
    <div className="overflow-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen">
      <div
        // onClick={onClose}
        className="overflow-hidden fixed top-0 right-0 left-0 flex justify-center items-center w-full h-screen bg-black opacity-80"
      />
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {header && (
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              {header}
            </div>
          )}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
          {footer && (
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
