export interface FormatDateOptions {
  locale?: string;
  includeDay?: boolean;
  monthFormat?: "long" | "short" | "narrow" | "numeric" | "2-digit";
}

export function formatDate(
  dateString: string,
  options: FormatDateOptions = {}
): string {
  const { locale = "fr-FR", includeDay = true, monthFormat = "long" } = options;

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: monthFormat,
  };

  if (includeDay) {
    dateOptions.day = "numeric";
  }

  return new Date(dateString).toLocaleDateString(locale, dateOptions);
}

export function formatDateShort(dateString: string): string {
  return formatDate(dateString, { includeDay: false, monthFormat: "short" });
}
