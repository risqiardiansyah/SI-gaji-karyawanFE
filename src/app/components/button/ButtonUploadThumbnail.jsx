import { Button, Icon } from "@material-ui/core";
import React, { Component } from "react";
import { Fragment } from "react";
import Swal from "sweetalert2";

const ButtonUploadThumbnail = ({ uploadFoto, handleDelFile, value }) => {
  let fileInput = React.createRef();

  const handleUpload = () => {
    fileInput.current.click();
  };

  const getExtension = (filename) => {
    var parts = filename.split(".");
    return parts[parts.length - 1];
  };

  const isImage = (filename) => {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case "jpg":
      case "png":
      case "jpeg":
        return true;
    }
    return false;
  };

  const handleImageChange = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    if (isImage(e.target.files[0].name)) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      const initFile = URL.createObjectURL(e.target.files[0]);
      reader.onloadend = () => {
        uploadFoto(reader, initFile);
      };
    } else {
      Swal.fire({
        icon: "warning",
        title: "Invalid File Format",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <Fragment>
      <Button className="container-btn-file" onClick={handleUpload}>
        <Icon>panorama</Icon>
      </Button>
      <input
        type="file"
        name="foto"
        onChange={handleImageChange}
        className="hidden"
        ref={fileInput}
        accept="image/png, image/jpeg, image/jpg"
      />
      {value && (
        <Button className="container-btn-del-file" onClick={handleDelFile}>
          <Icon className="text-white" fontSize="small">
            delete
          </Icon>
        </Button>
      )}
    </Fragment>
  );
};

export default ButtonUploadThumbnail;
