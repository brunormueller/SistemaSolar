import GraficoFunil from "./graficoFunil";

const DashboardFunil = ({ listas }: any) => {
  return (
    <div className="mt-4">
      <GraficoFunil listas={listas} />
    </div>
  );
};

export default DashboardFunil;
