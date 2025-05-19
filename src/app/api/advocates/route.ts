import db from "@/db";
import { advocates } from "@/db/schema";
import { ilike, or, sql, type InferSelectModel } from "drizzle-orm";

export type Advocate = InferSelectModel<typeof advocates>;

export async function GET(request: Request) {
  // Extract query parameters from the request URL
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const query = searchParams.get("query") || "";

  // Query the database for advocates matching the search term
  const data = await db
    .select()
    .from(advocates)
    .where((advocate) =>
      or(
        ilike(advocate.firstName, `%${query}%`),
        ilike(advocate.lastName, `%${query}%`),
        ilike(advocate.city, `%${query}%`),
        ilike(advocate.degree, `%${query}%`),
        sql`${advocate.specialties}::text ILIKE ${`%${query}%`}`,
        sql`${advocate.yearsOfExperience}::text ILIKE ${`%${query}%`}`,
        sql`${advocate.phoneNumber}::text ILIKE ${`%${query}%`}`
      )
    );

  if (!data) {
    return Response.json({ error: "No data found" }, { status: 404 });
  }

  return Response.json({ data });
}
