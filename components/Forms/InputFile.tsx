import React, { useState, useEffect } from "react";
// import urlBase from "@/adapters/url";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// const backendURL = urlBase();

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface InputFileProps {
  label?: string;
  onChange: (selectedFiles: File[]) => void;
}

const InputFileComponent: React.FC<InputFileProps> = ({ label, onChange }) => {
  const [files, setFiles] = useState([]);
  const [serverResponse, setServerResponse] = useState(null);

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file));
    setServerResponse(null);
  };

  useEffect(() => {
    // Notify the parent component when files are updated
    onChange(files);
  }, [files, onChange]);

  return (
    <div className="w-full">
      <FilePond
        // ref={(ref) => (this?.pond = ref)}
        files={files}
        onupdatefiles={handleUpdateFiles}
        server={{
          process: {
            url: `/recebeImagem.php`,
            method: "POST",
          },
          // onload: (response) => {
          //     // Handle server response, for example, log it to the console
          //     console.log("Server response:", response);
          // },
          // onerror: (error) => {
          //     // Handle upload error, if needed
          //     console.error("Upload error:", error);
          // }
        }}
        className="w-full"
        name="files"
        labelIdle='Arraste seus arquivos ou <span class="filepond--label-action">Selecione</span>'
        allowMultiple={true}
        maxFiles={3}
      />
    </div>
  );
};

export default InputFileComponent;
