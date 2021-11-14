import { useCallback } from "react";
import PageButton from "./PageButton";
import { Container, Dots } from "./styles";

interface PaginationProps {
  itensPerPage: number;
  page: number;
  total: number;
  getPageFunction: (page: number) => void;
}

const Pagination = ({
  getPageFunction,
  page,
  total,
  itensPerPage,
}: PaginationProps) => {
  const handlerPage = useCallback(
    (page: number) => {
      getPageFunction(page);
    },
    [getPageFunction]
  );

  const pages = Math.round(total / itensPerPage);

  return (
    <Container>
      <div>
        De
        <span>{(page - 1) * itensPerPage + 1}</span>-
        <span>{(page - 1) * itensPerPage + itensPerPage}</span>
        de
        <strong>{total}</strong>
      </div>
      <div>
        {Array.from({ length: pages }).map((_, index) => {
          if (index < 2 || index > pages - 3) {
            return (
              <PageButton
                key={`page_${index + 1}`}
                page={index + 1}
                goTo={handlerPage}
                isAtualPage={index + 1 === page}
              />
            );
          } else if (index > page + 2) return <Dots />;
          return "";
        })}
      </div>
    </Container>
  );
};

export default Pagination;
