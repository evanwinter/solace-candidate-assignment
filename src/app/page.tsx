import { Space } from "antd";
import { AdvocatesSearch } from "./components/search";
import { AdvocatesTable } from "./components/table";

export default async function Home() {
  return (
    <main className="max-w-full box-border mx-auto p-4 lg:p-8">
      <Space direction="vertical" size="large">
        <header className="grid gap-4 max-w-4xl">
          <h1 className="text-4xl tracking-tight text-pretty">
            Solace Advocates
          </h1>
          <p className="text-base text-gray-700 text-balance">
            Solace Advocates is a platform that connects individuals with
            advocates who can provide support and guidance. Our mission is to
            empower individuals by providing access to a network of qualified
            advocates who can help them navigate the complexities of their
            situations.
          </p>
        </header>
        <div className="max-w-md">
          <AdvocatesSearch />
        </div>
      </Space>
      <div className="w-full mt-8">
        <AdvocatesTable />
      </div>
    </main>
  );
}
