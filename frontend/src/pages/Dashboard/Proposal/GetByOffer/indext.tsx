import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TypeOffer, useOffersApi } from "../../../../context/Offer";
import { ProposalType, useProposalApi } from "../../../../context/Proposal";
import { Formatter } from "../../../../helpers/Formatter";
import { showErrors } from "../../../../helpers/GetErros";

import { Container, OffertInfo } from "./styles";

const GetByOffer = () => {
  const [offer, setOffer] = useState<TypeOffer | null>(null);
  const [proposals, setProposals] = useState<ProposalType[] | null>(null);

  const { getOfferById } = useOffersApi();
  const { getProposalPerOffer } = useProposalApi();
  const { id } = useParams();

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      getOfferById(Number(id))
        .then((data) => {
          console.log(data);
          return setOffer(data);
        })
        .catch((error) => showErrors(error));
      getProposalPerOffer(id)
        .then((data) => setProposals(data))
        .catch((error) => showErrors(error));
    }
  }, [getOfferById, getProposalPerOffer, id]);

  if (!offer) return <h2>Caregando...</h2>;
  return (
    <Container>
      <h1>Proposta pra a oferta {offer.id}</h1>
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
    </Container>
  );
};

export { GetByOffer };
