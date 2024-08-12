import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";
import { Button } from "../../../components/button";
import { formatDateRange } from "../../../components/date";
import { DestinationAndDate } from "../../../components/destination-and-date";
import { Modal } from "../../../components/modal";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

interface DestinationAndDateHeaderProps {
  trip: Trip | undefined;
  onUpdateDestinationAndDate: (
    newDestination: string,
    newEventStartAndEndDates: DateRange | undefined,
    resetNewEventStartAndEndDates: () => void
  ) => void;
}

export function DestinationAndDateHeader({
  onUpdateDestinationAndDate,
  trip,
}: DestinationAndDateHeaderProps) {
  const [isDestinationAndDateEditable, setIsDestinationAndDateEditable] =
    useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const [newDestination, setNewDestination] = useState(trip?.destination || "");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [newEventStartAndEndDates, setNewEventStartAndEndDates] = useState<
    DateRange | undefined
  >();
  const [displayedDate, setDisplayedDate] = useState<string | null>(null);
  const [displayedNewDate, setDisplayedNewDate] = useState<string | null>(null);

  useEffect(() => {
    if (trip) {
      setDisplayedDate(formatDateRange(trip.starts_at, trip.ends_at));
    }
  }, [trip]);

  useEffect(() => {
    if (newEventStartAndEndDates?.from && newEventStartAndEndDates?.to) {
      setDisplayedNewDate(
        formatDateRange(
          newEventStartAndEndDates.from,
          newEventStartAndEndDates.to
        )
      );
    } else {
      setDisplayedNewDate(null);
    }
  }, [newEventStartAndEndDates]);

  function openDestinationAndDateEdition() {
    setIsDestinationAndDateEditable(true);
  }

  function closeDestinationAndDateEdition() {
    setIsDestinationAndDateEditable(false);
  }

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  function resetNewEventStartAndEndDates() {
    setNewEventStartAndEndDates(undefined);
  }

  function handleUpdateDestinationAndDate() {
    onUpdateDestinationAndDate(
      newDestination,
      newEventStartAndEndDates,
      resetNewEventStartAndEndDates
    );
    closeDestinationAndDateEdition();
  }

  return (
    <DestinationAndDate isInputActive={isInputActive}>
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400 shrink-0" />

        {isDestinationAndDateEditable ? (
          <input
            type="text"
            placeholder="Para onde você vai?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none"
            onChange={(event) => setNewDestination(event.target.value)}
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
          />
        ) : (
          <span className="text-zinc-100 text-lg">{trip?.destination}</span>
        )}
      </div>

      <div className="flex items-center gap-x-2">
        <Calendar className="size-5 text-zinc-400 shrink-0 " />

        {isDestinationAndDateEditable ? (
          <button
            onClick={openDatePicker}
            className={`flex items-center text-lg ${
              displayedNewDate ? "" : "text-zinc-400"
            }`}
          >
            {displayedNewDate || "Quando?"}
          </button>
        ) : (
          <span className="text-zinc-100 text-lg">{displayedDate}</span>
        )}

        {isDatePickerOpen && (
          <Modal closeModal={closeDatePicker} titleModal="Selecione a data">
            <DayPicker
              locale={ptBR}
              mode="range"
              className="my-day-picker overflow-auto grid place-content-center capitalize"
              fromDate={new Date()}
              selected={newEventStartAndEndDates}
              onSelect={setNewEventStartAndEndDates}
            />
          </Modal>
        )}
      </div>

      <div className="w-px h-6 bg-zinc-800 hidden md:block" />

      {isDestinationAndDateEditable ? (
        <Button onClick={handleUpdateDestinationAndDate} variant="primary">
          Confirmar alterações
          <ArrowRight className="size-5 shrink-0" />
        </Button>
      ) : (
        <Button onClick={openDestinationAndDateEdition} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5 shrink-0" />
        </Button>
      )}
    </DestinationAndDate>
  );
}
