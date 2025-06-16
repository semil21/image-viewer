"use client";
import FileUpload from "@/_components/file-upload/fileUpload";
import Images from "@/_components/images/images";
import ProtectedRoute from "@/_config/protected-route";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute>
      {/* <div>dashboard page</div> */}
      <FileUpload />
      <Images />
    </ProtectedRoute>
  );
};

export default page;
