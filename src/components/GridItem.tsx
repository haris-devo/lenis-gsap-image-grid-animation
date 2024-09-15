import React from "react";

interface GridItemProps {
  row: number;
  col: number;
  image: string; // Add the image prop here
}

const GridItem: React.FC<GridItemProps> = ({ row, col, image }) => {
  return (
    <div
      className="col-span-1 row-span-1 elem relative overflow-hidden rounded-lg shadow-lg"
      style={
        {
          "--r": row,
          "--c": col,
        } as React.CSSProperties
      }
    >
      <img
        src={image}
        alt={`Grid item at row ${row}, col ${col}`}
        className="w-full h-52 object-cover transform transition-transform duration-500 hover:scale-110"
      />
    </div>
  );
};

export default GridItem;
