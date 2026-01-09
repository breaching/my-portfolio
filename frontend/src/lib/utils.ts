const CONFIG = {
  yOffset: 4,
  mOffset: 4,
  dOffset: 15,
};

export function getYearsOfExperience(): number {
  const now = new Date();
  const refYear = 2000 + CONFIG.yOffset;
  const refDate = new Date(refYear, CONFIG.mOffset, CONFIG.dOffset);

  let years = now.getFullYear() - refDate.getFullYear();
  const monthDiff = now.getMonth() - refDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < refDate.getDate())) {
    years--;
  }

  return years;
}

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
