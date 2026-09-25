const dateFormatter = new Intl.DateTimeFormat("es-AR", { dateStyle: "long" });

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")} min`;
};

export const formatDate = (iso: string): string =>
  dateFormatter.format(new Date(iso));

export const formatCount = (
  count: number,
  singular: string,
  plural: string,
): string => `${count} ${count === 1 ? singular : plural}`;
