import { useAllImagesOfUserHook } from "@/_hooks/images/images.hooks";
import React from "react";
import Image from "next/image";
import Loader from "../loader/loader";
import { imageTpye } from "@/_types/image.type";
import { ToastContainer, toast } from "react-toastify";
import { useDeleteImageHook } from "@/_hooks/images/images.hooks";
import { handleDownload } from "@/_config/image/image-download";

const Images = () => {
  const { data, isLoading } = useAllImagesOfUserHook();
  const deleteImageMutation = useDeleteImageHook();

  const handleDelete = async (url: string, id: string) => {
    try {
      const res = await fetch("/api/deleteBlob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error(result.error);
        toast.error("Failed to delete from storage.");
        return;
      }

      deleteImageMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Image deleted successfully.");
        },
        onError: () => {
          toast.error("Deleted from storage, but DB deletion failed.");
        },
      });
    } catch (error) {
      console.error("Error deleting blob:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-3 mx-5 gap-4">
        {data &&
          data.map((item: imageTpye, index: number) => (
            <div key={index} className="mx-5">
              <div className="relative w-full h-[300px]">
                <Image
                  src={item?.image}
                  alt="image"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex justify-center my-2">
                <button
                  className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleDelete(item.image, item._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full ml-2"
                  onClick={() =>
                    handleDownload(item.image, `image-${index}.jpg`)
                  }
                >
                  Download
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Images;
