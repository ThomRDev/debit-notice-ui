export const getStatusColor = (status: string) => {
  const statusMap = {
    borrador: "bg-yellow-100 text-yellow-800",
    pendiente: "bg-yellow-100 text-yellow-800",
    migrado: "bg-green-100 text-green-800",
    anulado: "bg-red-100 text-red-800",
    cancelado: "bg-red-100 text-red-800",
  } as const;
  return (
    statusMap[status.toLowerCase() as keyof typeof statusMap] ||
    "bg-gray-100 text-gray-800"
  );
};
