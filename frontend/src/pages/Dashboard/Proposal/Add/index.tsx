import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ProviderForm } from "../../../../component/Forms/ProposalForm";
import { TypeOffer, useOffersApi } from "../../../../context/Offer";
import { ProposalType, useProposalApi } from "../../../../context/Proposal";
import { showErrors } from "../../../../helpers/GetErros";

// import { Container } from './styles';

const AddProposal: React.FC = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState<TypeOffer>();
  const navigateTo = useNavigate();
  const { createProposal } = useProposalApi();
  const { getOfferById } = useOffersApi();

  const handlerSubmit = useCallback(
    ({ amount, value }: ProposalType) => {
      createProposal({ offer: Number(id), amount, value } as ProposalType)
        .then((data) => {
          toast.success("Proposta criada com sucesso");
          navigateTo(-1);
        })
        .catch((error) => showErrors(error));
    },
    [createProposal, id, navigateTo]
  );

  useEffect(() => {
    if (!isNaN(Number(id)))
      getOfferById(Number(id))
        .then((data) => {
          setOffer(data);
        })
        .catch((error) => {
          showErrors(error);
        });
  }, [id, getOfferById]);

  return <ProviderForm offer={offer} onSubmit={handlerSubmit} />;
};

export default AddProposal;
