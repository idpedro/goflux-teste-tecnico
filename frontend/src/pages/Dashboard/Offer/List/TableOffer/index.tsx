import TableComponent, {
  TableActions,
  TableColumn,
} from "../../../../../component/Table";
import { useAuth } from "../../../../../context/Auth";
import { TypeOffer } from "../../../../../context/Offer";
import { Add } from "@styled-icons/fluentui-system-filled";

import { Formatter } from "../../../../../helpers/Formatter";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const TableOffer = ({ offers }: { offers: TypeOffer[] }) => {
  const { user } = useAuth();
  const navigateTo = useNavigate();
  const handlerCreateProposal = useCallback(
    (offer: TypeOffer) => {
      return (e: any) => {
        const { id } = offer;
        navigateTo(`/dashboard/proposals/new/${id}`);
      };
    },
    [navigateTo]
  );
  let columns: TableColumn<TypeOffer>[] = [
    {
      propriety: "id",
      title: "Id",
      isLink: user?.type === "customer",
      linkPath: user?.type === "provider" ? "provider" : "",
    },
    {
      propriety: "status",
      title: "Status",
      formater: Formatter.offerStatus,
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
      keyReference: "id",
    },
  ];

  let actions: TableActions[] = [
    {
      icon: <Add />,
      callback: handlerCreateProposal,
    },
  ];
  return (
    <TableComponent
      columnsDefinition={columns}
      items={offers}
      actions={user?.type === "provider" ? actions : []}
    />
  );
};

export default TableOffer;
