import { Box, Modal } from "@mui/material";
import React, { Fragment } from "react";

interface ModalProps {
    opened: boolean;
    onClose: any;
    children: React.ReactNode;
}

const BasicModal: React.FC<ModalProps> = ({
    onClose,
    opened = false,
    children,
}) => {
    const modalClasses = `fixed z-9999 top-0 left-0 w-full h-full flex items-center justify-center ${
        opened ? "opacity-100" : "opacity-0 pointer-events-none"
    } transition-opacity`;
    const backdropClasses = `absolute w-full h-full bg-black opacity-50 ${
        opened ? "block" : "hidden"
    }`;
    return (
        <Fragment>
            <Modal
                style={{ zIndex: 9999 }}
                open={opened}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    className={`absolute  top-1/2 left-1/2 max-h-[100%] w-[1200px] -translate-x-2/4 -translate-y-2/4 p-8 rounded-md `}
                >
                    <div className="modal-container items-center justify-center  flex ">
                        {children}
                    </div>
                    {/* </div> */}
                </Box>
            </Modal>
        </Fragment>
    );
};

export default BasicModal;
