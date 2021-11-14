import TableComponent, { TableColumn } from "../../../../../component/Table";
import { useAuth } from "../../../../../context/Auth";
import { OfferStatusPTBR, TypeOffer } from "../../../../../context/Offer";

import { Formatter } from "../../../../../helpers/Formatter";

const TableOffer = ({ offers }: { offers: TypeOffer[] }) => {
  const { user } = useAuth();

  let columns: TableColumn<TypeOffer>[] = [
    {
      propriety: "id",
      title: "Id",
      isLink: true,
      linkPath: user?.type === "provider" ? "provider" : "",
    },
    {
      propriety: "status",
      title: "Status",
      formater: (value) => {
        return OfferStatusPTBR[
          value.toUpperCase() as keyof typeof OfferStatusPTBR
        ];
      },
    },
    {
      propriety: "initial_value",
      title: "Valor Inicial",
      formater: (value) => {
        return Formatter.currency(value);
      },
    },
    {
      propriety: "from",
      title: "Origem",
    },
    {
      propriety: "to",
      title: "Destino",
    },
    {
      propriety: "proposals",
      title: "Propostas",
      isLink: user?.type === "customer",
      linkPath: "/dashboard/proposals/offer",
    },
  ];

  return <TableComponent columnsDefinition={columns} items={offers} />;
};

export default TableOffer;
