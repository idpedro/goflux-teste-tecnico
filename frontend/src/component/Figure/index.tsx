import React, { ImgHTMLAttributes } from "react";

import { Container } from "./styles";

interface FigureProps extends ImgHTMLAttributes<HTMLImageElement> {
  description?: string;
}

const Figure = ({ src, alt, description, ...rest }: FigureProps) => {
  return (
    <Container>
      <img src={src} alt={alt} {...rest} />
      {description ?? <figcaption>{description}</figcaption>}
    </Container>
  );
};

export { Figure };
