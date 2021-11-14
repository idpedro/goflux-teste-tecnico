import { AnchorHTMLAttributes, MouseEvent, useCallback } from "react";
import { Button } from "./styles";

interface PageButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  page: number;
  goTo: (page: number) => void;
  isAtualPage: boolean;
}

const PageButton = ({
  page,
  goTo,
  type,
  isAtualPage,
  ...rest
}: PageButtonProps) => {
  const handlerOnClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      goTo(page);
    },
    [goTo, page]
  );
  return (
    <Button
      type="button"
      isActive={isAtualPage}
      onClick={handlerOnClick}
      {...rest}
    >
      {page}
    </Button>
  );
};

export default PageButton;
