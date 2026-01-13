/**
 * Reusable Export Utilities for converting data to various formats
 */

export interface ExportOptions {
  filename?: string;
  headers?: Record<string, string>; // Map field names to display headers
  excludeFields?: string[]; // Fields to exclude from export
  includeFields?: string[]; // If provided, only include these fields (in order)
}

/**
 * Formats a camelCase or snake_case key to a readable header name
 */
export function formatHeaderName(key: string): string {
  return (
    key
      // Handle camelCase
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Handle snake_case
      .replace(/_/g, " ")
      // Capitalize first letter of each word
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

/**
 * Converts an array of objects to CSV format and triggers download
 *
 * @example Basic usage - auto-generates headers from keys
 * ```ts
 * exportToCSV(data, { filename: "my_export" });
 * ```
 *
 * @example With custom headers
 * ```ts
 * exportToCSV(data, {
 *   filename: "transactions",
 *   headers: {
 *     tranid: "Transaction ID",
 *     dr: "Debit",
 *     cr: "Credit"
 *   }
 * });
 * ```
 *
 * @example With specific fields in order
 * ```ts
 * exportToCSV(data, {
 *   filename: "report",
 *   includeFields: ["name", "email", "date"],
 *   headers: { name: "Full Name", email: "Email Address" }
 * });
 * ```
 */
export function exportToCSV<T extends object>(
  data: T[],
  options: ExportOptions = {}
): void {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  const {
    filename = `export_${new Date().toISOString().split("T")[0]}`,
    headers = {},
    excludeFields = [],
    includeFields,
  } = options;

  // Determine which keys to export
  let allKeys: string[];

  if (includeFields && includeFields.length > 0) {
    // Use only specified fields in the given order
    allKeys = includeFields;
  } else {
    // Get all unique keys from the data, excluding specified fields
    allKeys = Array.from(
      new Set(data.flatMap((item) => Object.keys(item)))
    ).filter((key) => !excludeFields.includes(key));
  }

  // Create header row - use custom headers if provided, otherwise format the key
  const headerRow = allKeys
    .map((key) => `"${headers[key] || formatHeaderName(key)}"`)
    .join(",");

  // Create data rows
  const dataRows = data.map((item) =>
    allKeys
      .map((key) => {
        const value = (item as Record<string, unknown>)[key];
        return formatCellValue(value);
      })
      .join(",")
  );

  // Combine header and data
  const csvContent = [headerRow, ...dataRows].join("\n");

  // Create blob and trigger download
  downloadFile(csvContent, `${filename}.csv`, "text/csv;charset=utf-8;");
}

/**
 * Formats a cell value for CSV export
 */
function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '""';
  }
  if (typeof value === "string") {
    // Escape quotes and wrap in quotes
    return `"${value.replace(/"/g, '""')}"`;
  }
  if (typeof value === "number") {
    return value.toString();
  }
  if (value instanceof Date) {
    return `"${value.toISOString()}"`;
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  // For objects/arrays, stringify
  return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
}

/**
 * Helper function to trigger file download
 */
function downloadFile(
  content: string,
  filename: string,
  mimeType: string
): void {
  // Add BOM for proper UTF-8 encoding in Excel
  const blob = new Blob(["\ufeff" + content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Common header mappings that can be reused across different exports
 * Import and spread these into your headers option as needed
 */
export const COMMON_HEADERS = {
  // Date/Time fields
  createdAt: "Created At",
  updatedAt: "Updated At",
  timestamp: "Timestamp",
  date: "Date",

  // User fields
  firstName: "First Name",
  lastName: "Last Name",
  fullName: "Full Name",
  email: "Email Address",
  phone: "Phone Number",

  // Transaction fields
  amount: "Amount",
  balance: "Balance",
  status: "Status",
  reference: "Reference",
  description: "Description",
};

/**
 * Bank statement specific headers - can be imported and used when exporting statements
 */
export const BANK_STATEMENT_HEADERS: Record<string, string> = {
  accountname: "Account Name",
  tranid: "Transaction ID",
  particulars: "Particulars",
  tranremarks: "Remarks",
  dr: "Debit",
  cr: "Credit",
  balance: "Balance",
  gL_DATE: "GL Date",
  valuE_DATE: "Value Date",
  traN_DATE: "Transaction Date",
  entrY_DATE: "Entry Date",
  parT_TRAN_SRL_NUM: "Serial Number",
  instrmnT_NUM: "Instrument Number",
};

/**
 * Fields commonly excluded from bank statement exports
 */
export const BANK_STATEMENT_EXCLUDE_FIELDS = [
  "rcrE_TIME",
  "lchG_TIME",
  "vfD_DATE",
  "pstD_DATE",
];
