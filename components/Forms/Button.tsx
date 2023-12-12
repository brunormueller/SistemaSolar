import { ButtonHTMLAttributes } from "react";
import LoaderGif from "../../public/images/loaders/loader2.gif";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
const Button = ({
  children,
  disabled,
  loading,
  className,
  ...rest
}: // }: ButtonHTMLAttributes<HTMLButtonElement>) => {
any) => {
  const classButton = twMerge(
    `flex w-fit justify-center items-end rounded bg-success p-2 px-4 font-medium text-gray ${
      (loading || disabled) && "opacity-80 cursor-not-allowed"
    }`,
    className
  );
  return (
    // <div className="justify-center flex">
    <button className={classButton} disabled={loading || disabled} {...rest}>
      {loading ? (
        <Image width={32} height={32} src={LoaderGif} alt="Logo" />
      ) : (
        children
      )}
    </button>
    // </div>
  );
};

export default Button;
