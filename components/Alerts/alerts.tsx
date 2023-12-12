import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface IToast {
  title: string;
  tipo: string;
}

const ToastComponent: React.FC<IToast> = ({ title, tipo }) => {
  let Toast: any;
  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: tipo === "error",
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [icon, setIcon] = useState("error");
  useEffect(() => {
    setIcon(tipo === "success" ? "success" : "error");
  }, [tipo]);
  Toast.fire({
    icon,
    title,
  });

  // Retorna null ou um elemento JSX vazio se não houver nada para renderizar
  return null;
};

export default ToastComponent;
