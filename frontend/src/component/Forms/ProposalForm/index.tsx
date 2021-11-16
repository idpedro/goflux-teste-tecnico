import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FormContextProvider } from "../../../context/FormContext";
import { TypeOffer } from "../../../context/Offer";
import { ProposalType } from "../../../context/Proposal";
import { Formatter } from "../../../helpers/Formatter";
import Button from "../../Button";
import { Input } from "../Input";
import {
  Container,
  ButtonArea,
  InputArea,
  OfferInfoArea,
  SaveIcon,
} from "./styles";

interface ProposalFormProps {
  proposal?: ProposalType;
  offer?: TypeOffer;
  onSubmit: (any: any) => void;
}
const ProviderForm = ({ proposal, offer, onSubmit }: ProposalFormProps) => {
  const goTo = useNavigate();

  const handlerCancel = useCallback(() => {
    goTo(-1);
  }, [goTo]);
  return (
    <Container>
      {offer && (
        <OfferInfoArea>
          <h3>Dados da Oferta</h3>
          <ul>
            <li>
              Id: <strong>{offer.id}</strong>
            </li>
            <li>
              Valor Inicial:
              <strong>{Formatter.currency(offer.initial_value)}</strong>
            </li>
            <li>
              Peso:
              <strong>
                {(offer as TypeOffer).amount}
                <span>{offer.amount_type.toLocaleLowerCase()}</span>
              </strong>
            </li>
            <li>
              Origem: <strong>{offer.to}</strong>
            </li>
            <li>
              Destino: <strong>{offer.from}</strong>
            </li>
          </ul>
        </OfferInfoArea>
      )}
      <h1>Proposta</h1>
      <FormContextProvider onSubmit={onSubmit}>
        <InputArea>
          <Input
            type="number"
            name="value"
            title="Valor"
            step="any"
            placeholder="...digite o valor"
            defaultValue={proposal ? proposal.value : 0}
          />
          <Input
            type="number"
            name="amount"
            title="Carga"
            step="any"
            placeholder="...digite a carga"
            defaultValue={proposal ? proposal.amount : 0}
          />
        </InputArea>
        <ButtonArea>
          <Button
            title="Salvar"
            type="submit"
            color="green"
            icon={<SaveIcon />}
          />
          <Button
            title="Cancelar"
            type="button"
            color="yellow"
            onClick={handlerCancel}
          />
        </ButtonArea>
      </FormContextProvider>
    </Container>
  );
};

export { ProviderForm };
