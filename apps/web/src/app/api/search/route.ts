import { searchContent } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  if (!query.trim()) {
    return NextResponse.json({
      videos: [],
      podcasts: [],
      newsletters: [],
      articles: [],
      columns: [],
      rubricaLinks: [],
      pagination: {
        page: 1,
        pageSize: 12,
        pageCount: 1,
        total: 0,
      },
    });
  }

  try {
    const results = await searchContent(query, page, 12);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      {
        videos: [],
        podcasts: [],
        newsletters: [],
        articles: [],
        columns: [],
        rubricaLinks: [],
        pagination: {
          page: 1,
          pageSize: 12,
          pageCount: 1,
          total: 0,
        },
      },
      { status: 500 }
    );
  }
}

