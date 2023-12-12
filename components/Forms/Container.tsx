import { ReactNode } from "react";
import { twMerge } from 'tailwind-merge'
interface ContainerProps {
    children: ReactNode;
    className?: string;
}
const Container = ({ children, className }: ContainerProps) => {
    const containerClassName = twMerge("gap-9 sm:grid-cols-2", className)
    return (
        <div className={containerClassName}>
            <div className="">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="p-6.5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Container;