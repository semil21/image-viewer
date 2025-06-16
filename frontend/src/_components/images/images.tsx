import { useAllImagesOfUserHook } from "@/_hooks/images/images.hooks";
import React from "react";
import Image from "next/image";
import Loader from "../loader/loader";
import { imageTpye } from "@/_types/image.type";

const Images = () => {
  const { data, isLoading, isError } = useAllImagesOfUserHook();

  return (
    <>
      {isLoading && <Loader />}

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
            </div>
          ))}
      </div>
    </>
  );
};

export default Images;
