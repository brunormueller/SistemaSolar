import React from "react";
const NavItem = ({ selected, children, index, arrayLength, ...rest }: any) => {
  const isFirst = index === 0;
  const isLast = index === arrayLength - 1;

  return (
    <div
      className={` ${
        isFirst ? "rounded-lg rounded-tr-none rounded-br-none" : ""
      }
        ${isLast ? "rounded-lg rounded-tl-none rounded-bl-none" : ""}
         h-14 bg-black cursor-pointer  bg-opacity-10 font-bold  select-none items-center flex text-center w-full justify-center whitespace-nowrap px-2`}
    >
      <li
        className={`h-fit w-full p-2 py-2 transition-all ease-linear cursor-pointer rounded-lg ${
          selected
            ? "bg-white text-black-2 dark:text-white dark:bg-black"
            : "bg-transparent"
        } `}
        {...rest}
      >
        {children}
      </li>
    </div>
  );
};

export default NavItem;
