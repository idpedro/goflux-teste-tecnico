import React, {
  useRef,
  MouseEvent,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Close } from "@styled-icons/evaicons-solid";

import { Wrapper, Controller } from "./styles";

export interface ModalHandlers {
  openModal: () => void;
}

interface ModalProps {
  children?: React.ReactNode;
}

const Modal: React.ForwardRefRenderFunction<ModalHandlers, ModalProps> = (
  props,
  ref
) => {
  const [isBeingShown, setIsbeingShown] = useState(true);

  const openModal = useCallback(() => {
    setIsbeingShown(true);
    console.log("aberto,modal");
  }, [setIsbeingShown]);

  const handlerCloseModal = useCallback(() => {
    setIsbeingShown(false);
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const mouseInfo = { initialX: 0, initialY: 0, isDragging: false };
  const getStartMove = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    mouseInfo.isDragging = true;
    mouseInfo.initialX = event.clientX;
    mouseInfo.initialY = event.clientY;

    //@ts-expect-error
    event.currentTarget.addEventListener("mousemove", moveModal);
    //@ts-expect-error
    event.currentTarget.addEventListener("mouseup", stopMovement);
  };

  const moveModal = function (event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();

    const x = mouseInfo.initialX - event.clientX;
    const y = mouseInfo.initialY - event.clientY;
    mouseInfo.initialX = event.clientX;
    mouseInfo.initialY = event.clientY;

    if (wrapperRef.current) {
      wrapperRef.current.style.left = wrapperRef.current.offsetLeft - x + "px";
      wrapperRef.current.style.top = wrapperRef.current.offsetTop - y + "px";
    }
  };

  const stopMovement = (event: MouseEvent<HTMLDivElement>) => {
    if (header.current) {
      //@ts-expect-error
      header.current.removeEventListener("mousemove", moveModal);
      //@ts-expect-error

      header.current.removeEventListener("mouseup", stopMovement);
    }
  };

  useImperativeHandle(ref, () => {
    return { openModal };
  });

  if (isBeingShown)
    return ReactDOM.createPortal(
      <Wrapper ref={wrapperRef}>
        <Controller ref={header} onMouseDown={getStartMove}>
          <button onClick={handlerCloseModal}>
            <Close />
          </button>
        </Controller>

        {props.children}
      </Wrapper>,
      document.getElementById("modal") as HTMLElement
    );

  return <></>;
};

export default forwardRef(Modal);
