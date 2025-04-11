"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Modal({
  isOpen = false,
  onClose = () => {},
  title = "",
  description = "",
  icon = null,
  actionButton = null,
  children,
  className,
}) {
  const [isVisible, setIsVisible] = useState(isOpen);
  const modalRef = useRef(null);
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center px-5 font-[manrope] justify-center bg-black/50 backdrop-blur-xs">
      <div
        ref={modalRef}
        className={`relative w-full border border-[#CCD8D3] max-w-md ${className} rounded-[32px] bg-white text-center shadow-lg`}
      >
        <div className="flex flex-col items-center justify-center">
          {icon && <Image src={icon} alt="icon" />}
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
          <p>{children}</p>
          {actionButton}
        </div>
      </div>
    </div>
  );
}
