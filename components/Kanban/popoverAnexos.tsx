import { GetForm } from "@/utils";
import { Fragment, useState } from "react";
import * as yup from "yup";
import Button from "@/components/Forms/Button";

const PopoverAnexo = ({}: any) => {
  const [yupSchema, setYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

  return (
    <Fragment>
      <header className="text-sm text-center mb-4 font-semibold">Anexos</header>

      <form className="form-container">
        <div className="upload-files-container">
          <div className="drag-file-area">
            <p className="dynamic-message text-lg">
              {" "}
              Arraste e solte qualquer arquivo aqui{" "}
            </p>
            <label className="label">
              {" "}
              ou{" "}
              <span className="browse-files">
                {" "}
                <input
                  type="file"
                  multiple
                  className="default-file-input"
                />{" "}
                <span className="browse-files-text">abra arquivos</span>{" "}
                <span>do computador</span>{" "}
              </span>{" "}
            </label>
          </div>
          <span className="cannot-upload-message">
            {" "}
            <span className="material-icons-outlined">error</span> Please select
            a file first{" "}
            <span className="material-icons-outlined cancel-alert-button">
              cancel
            </span>{" "}
          </span>
          <div className="file-block">
            <div className="file-info">
              {" "}
              <span className="material-icons-outlined file-icon">
                description
              </span>{" "}
              <span className="file-name"> </span> |{" "}
              <span className="file-size"> </span>{" "}
            </div>
            <span className="material-icons remove-file-icon">delete</span>
            <div className="progress-bar"> </div>
          </div>
          <button type="button" className="upload-button">
            {" "}
            Upload{" "}
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default PopoverAnexo;
