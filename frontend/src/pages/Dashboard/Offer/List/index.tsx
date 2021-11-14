import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Pagination from "../../../../component/Pagination";
import Header from "./Header";
import { Container } from "./styles";
import TableOffer from "./TableOffer";
import { TypeOffer, useOffersApi } from "../../../../context/Offer";
import { showErrors } from "../../../../helpers/GetErros";

const OfferList = () => {
  const navigateTo = useNavigate();
  const [offers, setOffers] = useState<TypeOffer[]>([]);
  const [count, setCount] = useState<number>(0);
  const [itensPerPage, setItensPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { getOffer } = useOffersApi();

  const handlerGetPage = useCallback((page: number) => {
    setPage(page);
  }, []);

  useEffect(() => {
    const response = getOffer(page, itensPerPage);
    response
      .then((offersResponse) => {
        const { count, offers } = offersResponse;
        setOffers(offers);
        setCount(count);
      })
      .catch((error: any) => {
        showErrors(error);
        navigateTo("/login");
      });
  }, [getOffer, itensPerPage, navigateTo, page]);
  return (
    <Container>
      <Header />
      <TableOffer offers={offers} />
      <Pagination
        total={count}
        getPageFunction={handlerGetPage}
        itensPerPage={itensPerPage}
        page={page}
      />
    </Container>
  );
};

export { OfferList };
