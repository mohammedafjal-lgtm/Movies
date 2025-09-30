"use client";
import React from "react";

const error = ({ error }) => {
  return (
    <>
      <div>Something went wrong</div>
      <p>{error.message}</p>
    </>
  );
};

export default error;
