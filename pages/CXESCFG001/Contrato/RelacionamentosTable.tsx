import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCheck } from "react-icons/md";
import { TbCopy } from "react-icons/tb";
import { toast } from "react-toastify";

const RelacionamentosTable = ({ relacionamento, index }: any) => {
    const [checked, setChecked] = useState(false);

    return (
        <tr
            className={
                index % 2 == 1
                    ? `bg-black-2 bg-opacity-[.1] dark:bg-white dark:bg-opacity-10`
                    : ""
            }
        >
            <td
                className="font-bold cursor-pointer select-none dark:hover:text-white hover:text-black-2"
                onClick={(e: any) => {
                    // document.execCommand('copy', false, e.target.textContent);
                    navigator.clipboard
                        .writeText(e.target.textContent)
                        .then(() => {
                            toast.success("Copiado");
                            setChecked(true);
                            setTimeout(() => {
                                setChecked(false);
                            }, 2000);
                        });
                }}
            >
                <div className="flex flex-row justify-between items-center">
                    <div>{`{${relacionamento.name}}`}</div>
                    {checked ? <MdCheck /> : <TbCopy />}
                </div>
            </td>
            <td>{relacionamento.text}</td>
        </tr>
    );
};

export default RelacionamentosTable;
