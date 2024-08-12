import { Calendar, Tag } from "lucide-react";
import { Button } from "../../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { Modal } from "../../../components/modal";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { formatSelectedDate } from "../../../components/date";
import { Input } from "../../../components/input";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
  trip: Trip | undefined;
}

export function CreateActivityModal({
  closeCreateActivityModal,
  trip,
}: CreateActivityModalProps) {
  const { tripId } = useParams();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");

  async function createActivity(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;

    if (!title) {
      toast.error("O título da atividade é obrigatório.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error("A data e hora da atividade são obrigatórias.");
      return;
    }

    const occursAtDate = new Date(
      `${selectedDate.toISOString().split("T")[0]}T${selectedTime}`
    );

    const occurs_at = occursAtDate.toISOString();

    try {
      await api.post(`/trips/${tripId}/activities`, {
        title,
        occurs_at,
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar a atividade.");
    }
  }

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate = selectedDate
    ? formatSelectedDate(selectedDate)
    : "Quando?";

  return (
    <>
      <Modal
        closeModal={closeCreateActivityModal}
        titleModal="Cadastrar atividade"
        descriptionModal="Todos convidados podem visualizar as atividades."
      >
        <form onSubmit={createActivity} className="space-y-3">
          <div className="space-y-2">
            <Input>
              <Tag className="text-zinc-400 size-5 shrink-0" />

              <input
                name="title"
                placeholder="Qual a atividade?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </Input>

            <div className="flex items-center gap-2">
              <Input size="full">
                <button
                  onClick={openDatePicker}
                  type="button"
                  className="flex items-center gap-2 text-left"
                >
                  <Calendar className="size-5 text-zinc-400 shrink-0" />
                  <span
                    className={`text-lg ${selectedDate ? "" : "text-zinc-400"}`}
                  >
                    {displayedDate}
                  </span>
                </button>
                {isDatePickerOpen && (
                  <Modal
                    closeModal={closeDatePicker}
                    titleModal="Selecione a data"
                  >
                    <DayPicker
                      locale={ptBR}
                      mode="single"
                      className="my-day-picker overflow-auto grid place-content-center capitalize"
                      fromDate={
                        trip?.starts_at ? new Date(trip.starts_at) : undefined
                      }
                      toDate={
                        trip?.ends_at ? new Date(trip.ends_at) : undefined
                      }
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date || undefined);
                      }}
                    />
                  </Modal>
                )}
              </Input>
              <Input>
                <input
                  type="time"
                  className={`bg-transparent text-lg outline-none ${
                    selectedTime ? "text-zinc-50" : "text-zinc-400"
                  }`}
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </Input>
            </div>
          </div>
          <Button type="submit" size="full">
            Salvar atividade
          </Button>
        </form>
      </Modal>
      <Toaster richColors theme="dark" />
    </>
  );
}
