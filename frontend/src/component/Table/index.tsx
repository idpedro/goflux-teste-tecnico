import React, { useEffect, useState } from "react";
import RouterLink from "../RouterLink";

import { Table, THead, Tbody } from "./styles";

export type TableItem = { [key: string]: any };

export type TableColumn<T> = {
  propriety: keyof T;
  title: string;
  isLink?: boolean;
  linkPath?: string;
  type?: "curreny" | "decimal" | "date";
  formater?: (data: any) => any;
};

interface TableProps {
  columnsDefinition: TableColumn<any>[];
  items?: TableItem[];
}

const TableComponent = ({ columnsDefinition, items }: TableProps) => {
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
            <tr key={index}>
              {columns &&
                columns.map((column) => {
                  const data = !column.formater
                    ? d?.[column.propriety as string]
                    : column.formater(d?.[column.propriety as string]);
                  const index = column.propriety;
                  return (
                    <td
                      key={`${column.propriety}__${index}`}
                      className={column.isLink ? "link" : ""}
                    >
                      {column.isLink ? (
                        <RouterLink
                          to={`${
                            column.linkPath ? column.linkPath + "/" : ""
                          }${data}`}
                        >
                          {data}
                        </RouterLink>
                      ) : (
                        data
                      )}
                    </td>
                  );
                })}
            </tr>
          ))}
      </Tbody>
    </Table>
  );
};

export default TableComponent;
