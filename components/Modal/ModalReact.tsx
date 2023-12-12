import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";

interface ModalProps {
    children?: React.ReactNode;
    open: boolean;
    onClose?: () => void;
    className?: string;
    title?: string;
    style?: any;
}

export default function ModalReact({
    onClose,
    open,
    children,
    className,
    title,
    style,
    ...rest
}: ModalProps) {
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClick={onClose}
        >
            <Box
                onClick={(e) => e.stopPropagation()}
                className={`absolute top-1/2 left-1/2 max-h-[90%] overflow-auto -translate-x-2/4 -translate-y-2/4 w-96 bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white rounded ${className}`}
            >
                <div className="w-full bg-white dark:bg-black p-5 top-0 sticky z-1 h-[10%]">
                    <div className="font-bold text-black-2 dark:text-white w-full">
                        {title}
                    </div>
                    <button
                        className="absolute top-2 right-2 "
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <section
                    className={`relative flex flex-col h-[90%] overflow-auto`}
                    style={style}
                    {...rest}
                >
                    <div>{children}</div>
                </section>
            </Box>
        </Modal>
    );
}
