import { FormEvent, RefObject, useCallback, useContext, useMemo } from "react";
import { createContext } from "react";

type inputElementsTypes =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

type FildsRef = RefObject<inputElementsTypes>;

interface FormContextProps {
  register: (name: string, ref: FildsRef) => void;
}

export const FormContext = createContext({} as FormContextProps);

interface FormContextProviderProps {
  children: React.ReactNode;
  onSubmit: (formData: { [key: string]: any }) => void;
}
export function FormContextProvider({
  onSubmit,
  children,
}: FormContextProviderProps) {
  const filds = useMemo(() => {
    return new Map() as Map<string, FildsRef>;
  }, []);

  const register = useCallback(
    (name, ref: FildsRef) => {
      filds.set(name, ref);
    },
    [filds]
  );

  const handlerFormSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const data: { [key: string]: any } = {};
      filds.forEach((value, key) => {
        if (value) {
          if (value.current?.type === "checkbox")
            data[key] = (value.current as HTMLInputElement)?.checked;
          else data[key] = value.current?.value;
        }
      });
      onSubmit(data);
    },
    [filds, onSubmit]
  );

  return (
    <FormContext.Provider value={{ register }}>
      <form onSubmit={handlerFormSubmit}>{children}</form>
    </FormContext.Provider>
  );
}

export function useForm() {
  const { register } = useContext(FormContext);
  return { register };
}
