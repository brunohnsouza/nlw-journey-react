import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";

/* --------------------------------------------------------- */
/**
 * Funções para formatar a data de um range de datas.
 *
 * @param eventStartAndEndDates - O intervalo de datas a ser formatado.
 * @param formatString - A string de formatação opcional.
 * @returns A string formatada ou null se o range não estiver completo.
 */

export function getDisplayedRangeDateFull(
  eventStartAndEndDates: DateRange | undefined,
  formatString: string = "d' de 'MMMM' de 'yyyy"
): string | null {
  if (
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
  ) {
    return format(eventStartAndEndDates.from, "d")
      .concat(" a ")
      .concat(format(eventStartAndEndDates.to, formatString, { locale: ptBR }));
  }

  return null;
}

export function getDisplayedRangeDate(
  eventStartAndEndDates: DateRange | undefined,
  formatString: string = "d' de 'MMMM"
): string | null {
  if (
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
  ) {
    return format(eventStartAndEndDates.from, "d")
      .concat(" a ")
      .concat(format(eventStartAndEndDates.to, formatString, { locale: ptBR }));
  }

  return null;
}
/* --------------------------------------------------------- */
/**
 * Função para formatar uma data de início e fim.
 *
 * @param startDate - A data de início.
 * @param endDate - A data de fim.
 * @param formatString - A string de formatação opcional.
 * @returns A string formatada da data de início e fim.
 */
export function formatDateRange(
  startDate: string | Date,
  endDate: string | Date,
  formatString: string = "d' de 'MMMM"
): string | null {
  if (startDate && endDate) {
    return format(startDate, "d")
      .concat(" a ")
      .concat(format(endDate, formatString, { locale: ptBR }));
  }

  return null;
}
/* --------------------------------------------------------- */
/**
 * Função para formatar uma única data.
 *
 * @param selectedDate - Data selecionada.
 * @param formatString - A string de formatação opcional.
 * @returns A string formatada da data de início e fim.
 */
export function formatSelectedDate(
  selectedDate: string | Date,
  formatString: string = "d' de 'MMMM"
): string | null {
  if (selectedDate) {
    return format(selectedDate, formatString, { locale: ptBR });
  }

  return null;
}
