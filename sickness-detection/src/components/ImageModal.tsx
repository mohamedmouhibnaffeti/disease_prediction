import React from "react";
import Image, { ImageProps } from "next/image";

interface ModalProps {
  selectedImage: string | null;
  onClose: () => void;
}

export default function ModalComponent({
  selectedImage,
  onClose,
}: ModalProps){
  return (
    selectedImage && (
      <div className="fixed w-screen h-screen inset-0 flex justify-center items-center z-[100] bg-black bg-opacity-25">
        <div className="max-w-screen-lg mx-4">
          <div className="bg-white px-4 pb-4">
            <div className="flex flex-row justify-between text-center items-center py-3">
              <span className="text-lg font-semibold">LightBox</span>
              <button
                className=" bg-gray-600 bg-opacity-50 py-1 px-2.5 hover:bg-gray-400
                  hover:bg-opacity-70 transition-all rounded-full text-xl text-white font-bold"
                onClick={onClose}
              >
                &#10005;
              </button>
            </div>
              <Image src={selectedImage} alt="Selected Image" width={660} height={660} />
            </div>
          </div>
      </div>
    )
  );
};