import { NextRequest, NextResponse } from "next/server";
import { getColumns } from "@/lib/api";

// Helper function to extract author data from different possible structures
function extractAuthorData(authorData: any): any {
  if (!authorData) return undefined;
  return authorData?.data?.attributes || authorData?.attributes || authorData;
}

// Helper function to escape CSV fields
function escapeCSVField(field: string): string {
  if (!field) return "";
  // If field contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (field.includes(',') || field.includes('"') || field.includes('\n') || field.includes('\r')) {
    return '"' + field.replace(/"/g, '""') + '"';
  }
  return field;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const format = searchParams.get("format") || "csv"; // Default to CSV
  const filterColumn = searchParams.get("filterColumn");
  const filterAuthor = searchParams.get("filterAuthor");
  const filterDate = searchParams.get("filterDate");
  const searchQuery = searchParams.get("search");

  try {
    // Get all columns with their links
    const columns = await getColumns();

    // Extract and filter rubric links (same logic as in newsroom page)
    let allRubricLinks = columns
      .flatMap(column => (column.links || []).map((link: any) => ({
        ...link,
        column,
        author: column.author,
        publishDate: link.publishDate ? new Date(link.publishDate) : null
      })))
      .filter((link: any) => !link.publishDate || link.publishDate <= new Date());

    // Apply filters
    if (filterColumn) {
      allRubricLinks = allRubricLinks.filter((link: any) => link.column.slug === filterColumn);
    }

    if (filterAuthor) {
      allRubricLinks = allRubricLinks.filter((link: any) => {
        const author = extractAuthorData(link.author);
        return author?.name === filterAuthor;
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      allRubricLinks = allRubricLinks.filter((link: any) => {
        const title = link.label?.toLowerCase() || "";
        const description = link.description?.toLowerCase() || "";
        const authorName = extractAuthorData(link.author)?.name?.toLowerCase() || "";
        const columnTitle = link.column?.title?.toLowerCase() || "";
        return title.includes(query) || description.includes(query) || authorName.includes(query) || columnTitle.includes(query);
      });
    }

    if (filterDate && filterDate !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      let cutoffDate: Date;

      switch (filterDate) {
        case "today":
          cutoffDate = today;
          break;
        case "7days":
          cutoffDate = new Date(today);
          cutoffDate.setDate(cutoffDate.getDate() - 7);
          break;
        case "30days":
          cutoffDate = new Date(today);
          cutoffDate.setDate(cutoffDate.getDate() - 30);
          break;
        case "90days":
          cutoffDate = new Date(today);
          cutoffDate.setDate(cutoffDate.getDate() - 90);
          break;
        case "6months":
          cutoffDate = new Date(today);
          cutoffDate.setMonth(cutoffDate.getMonth() - 6);
          break;
        default:
          cutoffDate = new Date(0); // No filter
      }

      if (filterDate === "today") {
        // For "today", filter: publishDate >= today and < tomorrow
        allRubricLinks = allRubricLinks.filter((link: any) => {
          if (!link.publishDate) return false;
          return link.publishDate >= cutoffDate && link.publishDate < tomorrow;
        });
      } else if (cutoffDate.getTime() > 0) {
        // For other periods, filter: publishDate >= cutoffDate
        allRubricLinks = allRubricLinks.filter((link: any) => {
          if (!link.publishDate) return false;
          return link.publishDate >= cutoffDate;
        });
      }
    }

    // Sort by publish date (newest first)
    allRubricLinks.sort((a, b) => {
      if (!a.publishDate && !b.publishDate) return 0;
      if (!a.publishDate) return 1;
      if (!b.publishDate) return -1;
      return b.publishDate.getTime() - a.publishDate.getTime();
    });

    // Prepare data for export
    const exportData = allRubricLinks.map(link => {
      const author = extractAuthorData(link.author);
      return {
        titolo: link.label || "",
        descrizione: link.description || "",
        url: link.url || "",
        rubrica: link.column?.title || "",
        autore: author?.name || "",
        data_pubblicazione: link.publishDate ? link.publishDate.toISOString().split('T')[0] : "",
        data_pubblicazione_formattata: link.publishDate ? link.publishDate.toLocaleDateString('it-IT') : "",
      };
    });

    if (format === "json") {
      // Return JSON response
      const response = NextResponse.json({
        success: true,
        count: exportData.length,
        data: exportData,
        filters: {
          colonna: filterColumn,
          autore: filterAuthor,
          periodo: filterDate,
          ricerca: searchQuery,
        },
        exported_at: new Date().toISOString(),
      });

      response.headers.set('Content-Disposition', 'attachment; filename="capibara-rubriche.json"');
      return response;

    } else {
      // Return CSV response
      const csvHeaders = ["Titolo", "Descrizione", "URL", "Rubrica", "Autore", "Data Pubblicazione", "Data Pubblicazione Formattata"];

      const csvRows = [
        csvHeaders.join(","),
        ...exportData.map(row =>
          [
            escapeCSVField(row.titolo),
            escapeCSVField(row.descrizione),
            escapeCSVField(row.url),
            escapeCSVField(row.rubrica),
            escapeCSVField(row.autore),
            escapeCSVField(row.data_pubblicazione),
            escapeCSVField(row.data_pubblicazione_formattata),
          ].join(",")
        )
      ];

      const csvContent = csvRows.join("\n");

      const response = new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="capibara-rubriche.csv"',
        },
      });

      return response;
    }

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Errore durante l'esportazione dei dati",
      },
      { status: 500 }
    );
  }
}
