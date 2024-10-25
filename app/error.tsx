"use client";

import { BiErrorCircle } from "react-icons/bi";

const error = () => {
  return (
    <main className="min-h-[84vh] flex flex-col justify-center items-center mx-auto">
      <BiErrorCircle size={65} />
      <h1 className="mt-4 text-3xl">Un expected error</h1>
    </main>
  );
};

export default error;
