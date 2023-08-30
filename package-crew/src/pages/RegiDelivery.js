import React, { useState } from "react";
import { cls } from "../libs/utils";
import Header from "../components/header";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilState } from "recoil";
import { workIdState } from "../atom/exampleState";
import { useNavigate } from "react-router-dom";

const RegiDelivery = () => {
  const [index, setIndex] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const [parcels, setParcels] = useState([]);
  const [workId, setWorkId] = useRecoilState(workIdState);

  const navigate = useNavigate();

  const onValid = (data) => {
    console.log(data);
    /* parcels.filter(parcel => {
      if (parcel.trackingNum === data.trackingNum){
        
      }

      return 
    }) */
    const parcel = {
      items: [
        {
          id: data.productNum,
        },
      ],
      trackingNum: data.invoiceNum,
    };
    setParcels([...parcels, parcel]);
    reset();
  };

  const onClickRegister = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/dangdol/work/1/${workId}`, {
        deliveryRequestDtos: parcels,
      })
      .then((res) => {
        console.log(res);
        navigate(`/detail/${workId}/dashboard`);
      })
      .catch((err) => console.log(err));
    //;
  };
  console.log(parcels);
  return (
    <div className=" w-full mx-auto lg:w-[1024px]">
      <Header />
      <div className="mx-2">
        <div className="flex items-center space-x-3 ">
          <span className="text-[25px] font-bold">배송 물품 등록</span>
          <div className="btn btn-outline btn-info text-sm btn-xs">
            CSV 파일로 등록하기
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onValid)}
          className="py-3 flex items-end  space-x-2"
        >
          <div className="flex-1 grid grid-cols-2 gap-3">
            <div className="flex flex-col space-y-2">
              <span>송장 번호</span>
              <input
                {...register("invoiceNum", { required: "" })}
                placeholder="송장 번호를 입력해주세요."
                className="pl-3 input input-bordered w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span>상품 번호</span>
              <input
                {...register("productNum", { required: "" })}
                placeholder="상품 번호를 입력해주세요."
                className="pl-3 input input-bordered w-full"
              />
            </div>
          </div>

          <button className=" btn btn-info bg-mainColor text-white">
            등록하기
          </button>
        </form>

        <div className=" h-[600px]">
          <div className="overflow-x-auto text-center h-[572px]">
            <table className="table ">
              <thead className="text-center text-gray-400">
                <tr className="bg-base-200 text-base">
                  <th>송장 번호</th>
                  <th>상품 번호</th>
                  <th>작업 상황</th>
                </tr>
              </thead>
              <tbody className="text-center text-black text-base">
                {parcels.slice(10 * index, 10 * index + 10).map((parcel, i) => (
                  <tr>
                    <td>{parcel.trackingNum}</td>
                    <td>
                      {parcel.items[0].id}{" "}
                      {parcel.items.length === 1
                        ? ""
                        : `외 ${parcel.items.length - 1}개`}
                    </td>

                    <td className="font-normal">진행 전</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center space-x-2 py-3 ">
            {Array(parseInt(parcels.length / 10) + 1)
              .fill(0)
              .map((n, i) => (
                <span
                  onClick={() => setIndex(i)}
                  className={cls(
                    i === index ? "text-mainColor" : "text-[#D9D9D9]",
                    "font-bold"
                  )}
                >
                  {i + 1}
                </span>
              ))}
          </div>
          <div className="space-x-5 text-right">
            <span className="font-bold">
              총 송장 번호 개수{" "}
              <span className="text-mainColor">{parcels.length}</span>개
            </span>
            <button
              onClick={onClickRegister}
              className="btn btn-info bg-mainColor text-white px-20 text-xl font-bold"
            >
              업무 등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegiDelivery;
