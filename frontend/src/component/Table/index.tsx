import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { MouseEvent } from "react";

import RouterLink from "../RouterLink";
import { Table, THead, Tbody, ActionButton, colorsNames } from "./styles";

export type TableItem = { [key: string]: any };

export type TableColumn<T> = {
  propriety: keyof T;
  title: string;
  isLink?: boolean;
  linkPath?: string;
  type?: "curreny" | "decimal" | "date";
  keyReference?: keyof T;
  formater?: (data: any) => any;
};

export type TableActions = {
  name?: string;
  icon: React.ReactNode;
  color?: colorsNames;
  callback: (any: any) => (e: MouseEvent<HTMLButtonElement>) => void;
};
interface TableProps {
  columnsDefinition: TableColumn<any>[];
  items?: TableItem[];
  actions?: TableActions[];
}

const TableComponent = ({ columnsDefinition, actions, items }: TableProps) => {
  const [columns, setColumns] = useState<TableColumn<TableItem>[]>();
  const [data, setData] = useState<TableItem[]>();

  useEffect(() => {
    setColumns(columnsDefinition);
    setData(items);
  }, [columnsDefinition, items]);

  return (
    <Table>
      <THead>
        <tr>
          {columns &&
            columns.map((column) => (
              <th key={column.propriety}>{column.title}</th>
            ))}
        </tr>
      </THead>
      <Tbody>
        {data &&
          data.map((d, index) => (
            <tr key={d.id ?? uuid()}>
              {columns &&
                columns.map((column) => {
                  const data = !column.formater
                    ? d?.[column.propriety as string]
                    : column.formater(d?.[column.propriety as string]);
                  // const index = column.propriety;
                  return (
                    <td
                      key={`${column.propriety}__${d.id ?? uuid()}`}
                      className={column.isLink ? "link" : ""}
                    >
                      {column.isLink ? (
                        <RouterLink
                          to={`${column.linkPath ? column.linkPath + "/" : ""}${
                            column.keyReference
                              ? d?.[column.keyReference]
                              : data
                          }`}
                        >
                          {data}
                        </RouterLink>
                      ) : (
                        data
                      )}
                    </td>
                  );
                })}
              {actions &&
                actions.map((action) => (
                  <td key={uuid()} className="action">
                    <ActionButton
                      key={uuid()}
                      color={action.color ?? "purple"}
                      onClick={action.callback(d)}
                    >
                      {action.name && <span>{action.name}</span>}
                      {action.icon}
                    </ActionButton>
                  </td>
                ))}
            </tr>
          ))}
      </Tbody>
    </Table>
  );
};

export default TableComponent;
