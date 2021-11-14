import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "react-toastify";

import { FormContextProvider } from "../../../../context/FormContext";
import { Container } from "./styles";
import { showErrors } from "../../../../helpers/GetErros";
import { useOffersApi } from "../../../../context/Offer";
import OfferForm from "../../../../component/Forms/OfferForm";

const AddOffer = () => {
  const { createOffer } = useOffersApi();
  const goTo = useNavigate();
  const handlerSubmit = useCallback(
    (value: any) => {
      const response = createOffer(value);
      response
        .then(() => {
          toast.success("Oferta criada com sucesso");
          goTo("/");
        })
        .catch((error) => {
          showErrors(error);
        });
    },
    [createOffer, goTo]
  );

  return (
    <Container>
      <h1>Cadastro de uma nova Oferta</h1>
      <FormContextProvider onSubmit={handlerSubmit}>
        <OfferForm />
      </FormContextProvider>
    </Container>
  );
};

export default AddOffer;
