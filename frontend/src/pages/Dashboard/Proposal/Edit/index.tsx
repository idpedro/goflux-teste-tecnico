import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ProviderForm } from "../../../../component/Forms/ProposalForm";
import { TypeOffer } from "../../../../context/Offer";
import { ProposalType, useProposalApi } from "../../../../context/Proposal";
import { showErrors } from "../../../../helpers/GetErros";

const Edit: React.FC = () => {
  const { id } = useParams();
  const [proposal, setProposal] = useState<ProposalType>();
  const navigateTo = useNavigate();
  const { getProposalById, updateProposal } = useProposalApi();

  const handlerSubmit = useCallback(
    ({ amount, value }: ProposalType) => {
      updateProposal({ id: Number(id), amount, value })
        .then((data) => {
          toast.success("Proposta alterada com sucesso");
          navigateTo(-1);
        })
        .catch((error) => showErrors(error));
    },
    [id, navigateTo, updateProposal]
  );

  useEffect(() => {
    if (!isNaN(Number(id)))
      getProposalById(Number(id))
        .then((data) => {
          setProposal(data);
        })
        .catch((error) => {
          showErrors(error);
        });
  }, [getProposalById, setProposal, id]);
  if (!proposal) return <h2>...Carregando</h2>;
  return (
    <ProviderForm
      proposal={proposal}
      offer={proposal.offer as TypeOffer}
      onSubmit={handlerSubmit}
    />
  );
};

export default Edit;
