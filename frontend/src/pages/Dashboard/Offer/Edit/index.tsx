import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import OfferForm from "../../../../component/Forms/OfferForm";
import { FormContextProvider } from "../../../../context/FormContext";
import { TypeOffer, useOffersApi } from "../../../../context/Offer";
import { showErrors } from "../../../../helpers/GetErros";

import { Container } from "./styles";

const Edit: React.FC = () => {
  const { id } = useParams();
  const [offer, getOffer] = useState<TypeOffer>();
  const { getOfferById, updateOffer } = useOffersApi();
  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      const response = getOfferById(Number(id));
      response
        .then((data) => {
          return getOffer(data);
        })
        .catch((error) => {
          showErrors(error);
        });
    }
  }, [getOfferById, id]);

  const handlerFormSubmit = useCallback(
    (data) => {
      updateOffer(Number(id), data)
        .then((data) => toast.success("Oferta Atualizada"))
        .catch((error) => showErrors(error));
    },
    [id, updateOffer]
  );
  return (
    <Container>
      <h1>Editando Oferta</h1>
      <FormContextProvider onSubmit={handlerFormSubmit}>
        <OfferForm offer={offer} />
      </FormContextProvider>
    </Container>
  );
};

export default Edit;
