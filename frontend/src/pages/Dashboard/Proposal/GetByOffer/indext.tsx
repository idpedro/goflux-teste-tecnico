import { Add } from "@styled-icons/fluentui-system-filled";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Remove } from "styled-icons/ionicons-outline";
import Table, { TableActions, TableColumn } from "../../../../component/Table";
import { TypeOffer, useOffersApi } from "../../../../context/Offer";
import {
  ProposalType,
  ProposlStatusEnum,
  useProposalApi,
} from "../../../../context/Proposal";
import { Formatter } from "../../../../helpers/Formatter";
import { showErrors } from "../../../../helpers/GetErros";

import { Container, OffertInfo, Select, SelectArea, TitleArea } from "./styles";

const GetByOffer = () => {
  const [offer, setOffer] = useState<TypeOffer | null>(null);
  const [proporsalState, setProporsalState] = useState<ProposlStatusEnum>(
    ProposlStatusEnum.WAITING
  );
  const [proposalsList, setProposalsList] = useState<ProposalType[]>();

  const { getOfferById } = useOffersApi();
  const { findProposal, updateProposal } = useProposalApi();
  const { id } = useParams();

  const TableColumns: TableColumn<ProposalType>[] = [
    { propriety: "id", title: "Id" },
    {
      propriety: "status",
      title: "Status",
      formater: Formatter.proposalStatus,
    },
    { propriety: "value", title: "Valor", formater: Formatter.currency },
    { propriety: "amount", title: "Peso" },
    {
      propriety: "created_at",
      title: "Criada Em",
      formater: (value) => Formatter.data(value),
    },
  ];

  const getProposal = useCallback(() => {
    findProposal({ offer: Number(id), status: proporsalState })
      .then(({ proposals, count }) => {
        console.log(proposals);
        setProposalsList(proposals);
      })
      .catch((error) => showErrors(error));
  }, [findProposal, id, proporsalState]);

  const handlerAcceptProposal = useCallback(
    (proposals: ProposalType) => {
      return (e: any) => {
        const { id } = proposals;
        updateProposal({ id, status: ProposlStatusEnum.ACCEPTED })
          .then((data) => {
            toast.success("Proposta alterada para aceita ");
            getProposal();
          })
          .catch((error) => showErrors(error));
      };
    },
    [getProposal, updateProposal]
  );

  const handlerRejectProposal = useCallback(
    (proposals: ProposalType) => {
      return (e: any) => {
        const { id } = proposals;
        updateProposal({ id, status: ProposlStatusEnum.RECUSED })
          .then((data) => {
            toast.success("Proposta alterada para recusada ");
            getProposal();
          })
          .catch((error) => showErrors(error));
      };
    },
    [getProposal, updateProposal]
  );

  let actions: TableActions[] = [
    {
      icon: <Add />,
      callback: handlerAcceptProposal,
    },
  ];

  if (proporsalState === ProposlStatusEnum.ACCEPTED)
    actions = [
      {
        icon: <Remove />,
        color: "red",
        callback: handlerRejectProposal,
      },
    ];

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      getOfferById(Number(id))
        .then((data) => {
          console.log(data);
          return setOffer(data);
        })
        .catch((error) => showErrors(error));
      getProposal();
    }
  }, [getOfferById, id, proporsalState, getProposal]);

  if (!offer) return <h2>Caregando...</h2>;
  return (
    <Container>
      <OffertInfo>
        <h3>Dados da Oferta</h3>
        <ul>
          <li>
            Origem: <strong> {offer.from}</strong>
          </li>
          <li>
            Destino: <strong> {offer.to}</strong>
          </li>
          <li>
            Valor Inicial:
            <strong>${Formatter.currency(offer.initial_value)}</strong>
          </li>
          <li>
            Peso:
            <strong>
              {offer.amount} <span>{offer.amount_type.toLowerCase()}</span>
            </strong>
          </li>
        </ul>
      </OffertInfo>
      <TitleArea>
        <h1>Propostas </h1>
        <SelectArea>
          <label htmlFor="Select__State">Status das Propostas</label>
          <Select
            id="Select__State"
            onChange={(e) =>
              setProporsalState(e.currentTarget.value as ProposlStatusEnum)
            }
            defaultValue={ProposlStatusEnum.WAITING}
          >
            <option value={ProposlStatusEnum.ACCEPTED}>Aceitas</option>
            <option value={ProposlStatusEnum.WAITING}>Aguardando</option>
            <option value={ProposlStatusEnum.RECUSED}>Recusadas</option>
          </Select>
        </SelectArea>
      </TitleArea>
      <Table
        columnsDefinition={TableColumns}
        items={proposalsList}
        actions={actions}
      ></Table>
    </Container>
  );
};

export { GetByOffer };
