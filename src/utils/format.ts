const dateFormatter = new Intl.DateTimeFormat("es-AR", { dateStyle: "long" });
const shortDateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")} min`;
};

export const formatDate = (iso: string): string =>
  dateFormatter.format(new Date(iso));

export const formatShortDate = (iso: string): string =>
  shortDateFormatter.format(new Date(iso));

export const formatCount = (
  count: number,
  singular: string,
  plural: string,
): string => `${count} ${count === 1 ? singular : plural}`;
