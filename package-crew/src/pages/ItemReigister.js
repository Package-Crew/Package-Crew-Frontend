import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Header from "../components/header";
import { cls } from "../libs/utils";
import { useForm } from "react-hook-form";
import axios from "axios";

const Circle = tw.div`
    h-3 w-3 bg-[#D9D9D9] rounded-full 
`;

const ItemReigister = () => {
  const [index, setIndex] = useState(0);
  const [file, setFile] = useState();
  const [previewImg, setPreviewImg] = useState();
  const [isClickNewItem, setIsClickNewItem] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [items, setItems] = useState([]);

  const onValid = (data) => {
    const formData = new FormData();

    formData.append("image", file);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/dangdol/item/1/${data.itemName}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
          transformRequest: (data, headers) => {
            return data;
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const insertImg = (e) => {
    const file = e.target.files[0];
    setFile(file);
    let reader = new FileReader();
    reader.onload = () => {
      const fileURL = reader.result;
      setPreviewImg(fileURL);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/dangdol/item/all/1`)
      .then((res) => {
        console.log(res);
        setItems(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="text-base pb-10 h-screen w-full mx-auto lg:w-[1024px]">
      <Header />
      <div className="space-y-2 flex flex-col justify-center items-center">
        <AnimatePresence initial={false}>
          <div className="bg-gray-300 w-full h-80 rounded-2xl"></div>
        </AnimatePresence>
        <div className="flex space-x-4">
          <Circle />
          <Circle />
          <Circle />
        </div>
      </div>
      <div>
        <div className="flex justify-between py-5">
          <span className="font-bold">나의 상품</span>
          <div>
            <button
              onClick={() => {
                setIsClickNewItem(true);
              }}
              className="flex items-center btn btn-info bg-mainColor text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              상품 추가하기
            </button>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {items.map((item, i) => (
            <div className="space-y-2" key={i}>
              <img src={item.imageUrl} className="h-40 w-40 rounded-xl" />
              <div className="flex font-bold justify-between">
                <div className="flex flex-col">
                  <span>{item.itemName}</span>
                  <span className="text-[#9E9E9E]">{item.id}</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="space-x-2 flex justify-center py-3">
            {Array(parseInt(items.length / 24) + 1)
              .fill(0)
              .map((n, i) => (
                <span
                  onClick={() => {
                    setIndex(i);
                  }}
                  className={cls(
                    i === index ? "text-mainColor" : "text-[#D9D9D9]",
                    "font-bold cursor-pointer"
                  )}
                >
                  {i + 1}
                </span>
              ))}
          </div>
        </div>
      </div>
      {isClickNewItem ? (
        <div className="flex justify-center">
          <div
            className="fixed top-0 right-0 w-screen h-screen bg-black opacity-20"
            onClick={() => setIsClickNewItem(false)}
          />
          <div className="fixed top-40  bg-white rounded-xl p-5 w-1/3">
            <div className="flex justify-between items-center">
              <span className="text-[25px] font-bold">상품 추가</span>
              <div
                className="hover:bg-gray-300 transition-all rounded-full p-2"
                onClick={() => setIsClickNewItem(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <form onSubmit={handleSubmit(onValid)} className="py-4 pl-1">
              <div className="py-3 flex flex-col space-y-2">
                <span className="text-xl font-bold">
                  상품 이름 <span className="text-[#FF5724]">*</span>
                </span>
                <input
                  placeholder="상품 이름을 작성해주세요."
                  {...register("itemName", {
                    required: "상품 이름을 입력해주세요",
                  })}
                  className=" input input-bordered w-full border border-[#9E9E9E] rounded-md "
                />
              </div>
              <div className="flex justify-between py-2">
                <div className="flex flex-col space-y-2">
                  <span className="text-xl font-bold">
                    상품 사진 <span className="text-[#FF5724]">*</span>
                  </span>
                  <span className="text-xs text-gray-400">
                    카메라를 클릭하여 사진을 설정해주세요.
                    <br /> 정방형의 사진을 올려주세요.(예: 1024X1024)
                  </span>
                </div>
                <label for="itemImg">
                  <div className="flex justify-center items-center bg-gray-400 text-gray-600 rounded-md">
                    {previewImg !== undefined ? (
                      <img
                        src={previewImg}
                        className="object-cover w-40 h-40 rounded-md"
                      />
                    ) : (
                      <span className="p-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="itemImg"
                  {...register("img")}
                  className="hidden"
                  onChange={(e) => insertImg(e)}
                />
              </div>

              <div className="flex justify-end">
                <button className="btn btn-info bg-mainColor text-white ">
                  상품 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ItemReigister;
