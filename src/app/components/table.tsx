"use client";

import { Table, GetProp, TableProps } from "antd";
import { Advocate } from "@/app/api/advocates/route";
import { useAdvocates } from "@/app/hooks/useAdvocates";

type ColumnsType<T extends object> = GetProp<TableProps<T>, "columns">;

export function AdvocatesTable() {
  const { data, status } = useAdvocates();

  // Error handling should be improved.
  if (status === "error") {
    return <div>Error loading advocates</div>;
  }
  if (!data) {
    return;
  }

  const columns: ColumnsType<Advocate> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Degree",
      dataIndex: "degree",
      key: "degree",
      sorter: (a, b) => a.degree.localeCompare(b.degree),
    },
    {
      title: "Specialties",
      dataIndex: "specialties",
      key: "specialties",
      render: (specialties: string[]) =>
        specialties.map((text, i) => (
          <span key={`${text} ${i}`}>
            {text}
            {i < specialties.length - 1 ? ", " : ""}
          </span>
        )),
    },
    {
      title: "Years of Experience",
      dataIndex: "yearsOfExperience",
      key: "yearsOfExperience",
      sorter: (a, b) => a.yearsOfExperience - b.yearsOfExperience,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];

  return (
    <Table<Advocate>
      loading={status === "loading"}
      dataSource={data}
      columns={columns}
      rowKey={(record: Advocate) => record.id.toString()}
      style={{
        width: "100%",
        overflowX: "auto",
      }}
    />
  );
}
