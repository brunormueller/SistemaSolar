const Modal = ({ title, children, handleClose }: any) => {
  return (
    <>
      <section
        onClick={handleClose}
        style={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
          top: 0,
          left: 0,
          zIndex: 9999,
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: "5px",
            minWidth: "300px",
            maxWidth: "90vw",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h2>{title}</h2>
            <span onClick={handleClose}>X</span>
          </div>
          <div>{children}</div>
        </div>
      </section>
    </>
  );
};

export default Modal;
