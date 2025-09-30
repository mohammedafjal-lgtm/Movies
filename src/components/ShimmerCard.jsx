"use client";
import React from "react";

const ShimmerCard = () => {
  return (
    <div className="animate-pulse bg-gray-800 rounded-lg w-full h-64 flex flex-col overflow-hidden">
      <div className="bg-gray-700 h-40 w-full"></div>
      <div className="flex-1 p-3 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
