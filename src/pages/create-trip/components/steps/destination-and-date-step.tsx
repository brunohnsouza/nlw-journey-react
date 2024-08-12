import { MapPin, Calendar, Settings2, ArrowRight } from "lucide-react";
import { Button } from "../../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Modal } from "../../../../components/modal";
import { getDisplayedRangeDate } from "../../../../components/date";
import { DestinationAndDate } from "../../../../components/destination-and-date";
import { ptBR } from "date-fns/locale/pt-BR";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  destination: string;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate = getDisplayedRangeDate(eventStartAndEndDates);

  return (
    <DestinationAndDate isInputActive={isInputActive}>
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400 shrink-0" />

        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none"
          onChange={(event) => setDestination(event.target.value)}
          onFocus={() => setIsInputActive(true)}
          onBlur={() => setIsInputActive(false)}
        />
      </div>

      <button
        disabled={isGuestsInputOpen}
        onClick={openDatePicker}
        className={`flex items-center gap-x-2 text-lg ${
          displayedDate ? "" : "text-zinc-400"
        }`}
      >
        <Calendar className="size-5 text-zinc-400 shrink-0" />

        {displayedDate || "Quando?"}
      </button>

      {isDatePickerOpen && (
        <Modal closeModal={closeDatePicker} titleModal="Selecione a data">
          <DayPicker
            locale={ptBR}
            mode="range"
            className="my-day-picker overflow-auto grid place-content-center capitalize"
            fromDate={new Date()}
            selected={eventStartAndEndDates}
            onSelect={setEventStartAndEndDates}
          />
        </Modal>
      )}

      <div className="w-px h-6 bg-zinc-800 hidden md:block" />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5 shrink-0" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5 shrink-0" />
        </Button>
      )}
    </DestinationAndDate>
  );
}
