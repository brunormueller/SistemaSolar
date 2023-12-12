import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import Modal from "./Modal";
import Image from "next/image";

const InputImg = () => {
  const [images, setImages] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [modal, setModal] = useState(false);
  const [hoveredImages, setHoveredImages] = useState(
    Array(images.length).fill(false)
  );

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          id: Date.now(),
          src: reader.result,
        };
        setImages([...images, newImage]);
        setHoveredImages([...hoveredImages, false]); // Add a new hover state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseEnter = (index: number) => {
    const newHoveredImages = [...hoveredImages];
    newHoveredImages[index] = true;
    setHoveredImages(newHoveredImages);
  };

  const handleMouseLeave = (index: number) => {
    const newHoveredImages = [...hoveredImages];
    newHoveredImages[index] = false;
    setHoveredImages(newHoveredImages);
  };

  const handleDeleteImage = (imageID: any) => {
    const updatedImages = images.filter((image) => image.id !== imageID);
    const updatedHoveredImages = hoveredImages.slice(0, updatedImages.length);
    setImages(updatedImages);
    setHoveredImages(updatedHoveredImages);
  };

  const handleZoomImage = (image: any) => {
    setSelectedImage(image);
    setModal(true);
  };

  async function handleClose() {
    setModal(false);
  }

  function dragFilesArea() {
    return (
      <div className="drag-file-area">
        <div className="flex justify-center">
          <UploadCloud height={60} className="w-9" />
        </div>
        <p className="dynamic-message text-lg">
          Arraste e solte qualquer arquivo aqui
        </p>
        <label className="label">
          ou{" "}
          <span className="browse-files">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="default-file-input"
            />
            <span className="browse-files-text">abra arquivos</span>
            <span>do computador</span>
          </span>
        </label>
      </div>
    );
  }

  return (
    <>
      {modal && (
        <Modal title="Teste" handleClose={handleClose}>
          <Image alt="" width={60} height={60} src={selectedImage.src} />
        </Modal>
      )}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {images[0] ? (
              <div className="flex items-center gap-5 justify-center w-full h-full">
                {images.map((image, index) => (
                  <figure
                    className="w-auto relative overflow-hidden"
                    key={image.id}
                  >
                    <img
                      src={image.src}
                      alt="Uploaded"
                      onClick={() => handleZoomImage(image)}
                      onMouseEnter={() => handleMouseEnter(index)} // Pass index here
                      onMouseLeave={() => handleMouseLeave(index)} // Pass index here
                      className={`w-50 h-50 ${
                        hoveredImages[index] ? "brightness-50" : ""
                      } rounded`}
                    />
                    {hoveredImages[index] && (
                      <BsTrash3Fill
                        className="absolute top-2 right-2 text-danger"
                        onClick={() => handleDeleteImage(image.id)}
                        onMouseEnter={() => handleMouseEnter(index)} // Pass index here
                        size={20}
                      />
                    )}
                  </figure>
                ))}
                {dragFilesArea()}
              </div>
            ) : (
              dragFilesArea()
            )}
          </div>
        </label>
      </div>
    </>
  );
};

export default InputImg;
