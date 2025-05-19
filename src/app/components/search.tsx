"use client";

import { type GetProps, Input } from "antd";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function AdvocatesSearch({
  placeholder = "Search by name, city, specialty, etc",
  allowClear = true,
  ...props
}: GetProps<typeof Input.Search>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultValue = searchParams.get("query") || "";

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Input.Search
      size="large"
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      defaultValue={defaultValue}
      {...props}
    />
  );
}
