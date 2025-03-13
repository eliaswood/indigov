import { Constituents } from "@prisma/client";

/**
 * Exports constituent data to a CSV file and triggers a download
 * @param constituents - Array of constituent data
 * @returns An object indicating success and the count of exported records
 */
export const exportConstituentsToCSV = (constituents: Constituents[]) => {
  if (!constituents.length) {
    return { success: false, message: "No data to export" };
  }

  // CSV header row
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Address",
    "City",
    "State",
    "ZIP",
    "County",
    "Party Affiliation",
    "Active Status",
    "Voter Status",
  ].join(",");

  // Convert constituent data to CSV rows
  const csvRows = constituents
    .slice()
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .map((constituent) => {
      // Clean and escape data for CSV format
      const escapeCsvValue = (value: any) => {
        if (value === null || value === undefined) return "";
        const stringValue = String(value);
        // If the value contains commas, quotes, or newlines, wrap it in quotes and escape any quotes
        if (
          stringValue.includes(",") ||
          stringValue.includes('"') ||
          stringValue.includes("\n")
        ) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      };

      const values = [
        escapeCsvValue(constituent.name),
        escapeCsvValue(constituent.email),
        escapeCsvValue(constituent.phone),
        escapeCsvValue(constituent.address),
        escapeCsvValue(constituent.city),
        escapeCsvValue(constituent.state),
        escapeCsvValue(constituent.zip),
        escapeCsvValue(constituent.county),
        escapeCsvValue(constituent.partyAffiliation),
        escapeCsvValue(constituent.isActive),
        escapeCsvValue(constituent.isVoter),
      ];
      return values.join(",");
    });

  // Combine header and data rows
  const csvContent = [headers, ...csvRows].join("\n");

  // Create a Blob containing the CSV data
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // Create a link to download the CSV and trigger download
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `constituents-${new Date().toISOString().split("T")[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { 
    success: true, 
    count: constituents.length,
    message: `${constituents.length} constituents exported to CSV` 
  };
}; 