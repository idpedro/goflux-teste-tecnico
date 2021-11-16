import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Remove } from "styled-icons/ionicons-outline";
import Pagination from "../../../../component/Pagination";
import Table, { TableActions, TableColumn } from "../../../../component/Table";
import { useAuth } from "../../../../context/Auth";
import {
  ProposalType,
  ProposlStatusEnum,
  useProposalApi,
} from "../../../../context/Proposal";
import { Formatter } from "../../../../helpers/Formatter";
import { showErrors } from "../../../../helpers/GetErros";

import { Container, Select, SelectArea, TitleArea } from "./styles";

const List = () => {
  const [proporsalState, setProporsalState] = useState<ProposlStatusEnum>(
    ProposlStatusEnum.WAITING
  );
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const [proposalsList, setProposalsList] = useState<ProposalType[]>();
  const { findProposal, deleteProposal } = useProposalApi();
  const { user } = useAuth();
  const TableColumns: TableColumn<ProposalType>[] = [
    { propriety: "id", title: "Id", isLink: true, linkPath: "edit" },
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
    findProposal(
      { user: user?.id, status: proporsalState },
      { page, itensPerPage: 10 }
    )
      .then(({ proposals, count }) => {
        console.log(proposals);
        setProposalsList(proposals);
        setCount(count);
      })
      .catch((error) => showErrors(error));
  }, [findProposal, page, proporsalState, user?.id]);

  const handlerDeleteProposal = useCallback(
    (proposals: ProposalType) => {
      return (e: any) => {
        const { id } = proposals;
        deleteProposal(id)
          .then(({ message }) => {
            toast.success(message);
            getProposal();
          })
          .catch((error) => showErrors(error));
      };
    },
    [deleteProposal, getProposal]
  );

  const actions: TableActions[] = [
    {
      icon: <Remove />,
      color: "red",
      callback: handlerDeleteProposal,
    },
  ];

  const handlerGetPage = useCallback((page: number) => {
    setPage(page);
  }, []);

  useEffect(
    () => getProposal(),

    [getProposal]
  );

  if (!proposalsList) return <h2>Caregando...</h2>;
  return (
    <Container>
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
      <Pagination
        total={count}
        getPageFunction={handlerGetPage}
        itensPerPage={10}
        page={page}
      />
    </Container>
  );
};

export { List };
