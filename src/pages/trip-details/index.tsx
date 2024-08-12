import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateActivityModal } from "./components/create-activity-modal";
import { ImportantLinks } from "./components/important-links";
import { Guests } from "./components/guests";
import { Activities } from "./components/activities";
import { DestinationAndDateHeader } from "./components/destination-and-date-header";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { api } from "../../lib/axios";
import { DateRange } from "react-day-picker";
import { CreateLinkModal } from "./components/create-link-modal";
import { z } from "zod";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function TripDatailsPage() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);
  const [linkTitle, setlinkTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }

  async function updateDestinationAndDate(
    newDestination: string,
    newEventStartAndEndDates: DateRange | undefined,
    resetNewEventStartAndEndDates: () => void
  ) {
    if (
      !newDestination ||
      !newEventStartAndEndDates?.from ||
      !newEventStartAndEndDates?.to
    ) {
      toast.error("Por favor, preencha todos os campos.");
      resetNewEventStartAndEndDates();
      return;
    }

    if (
      newEventStartAndEndDates.from.getTime() ===
      newEventStartAndEndDates.to.getTime()
    ) {
      toast.error("A data de início e a data de término não podem ser iguais.");
      resetNewEventStartAndEndDates();
      return;
    }

    if (
      newDestination &&
      newEventStartAndEndDates?.from &&
      newEventStartAndEndDates?.to
    ) {
      try {
        await api.delete(`/trips/${tripId}/activities`);

        await api
          .put(`/trips/${tripId}`, {
            destination: newDestination,
            starts_at: newEventStartAndEndDates.from,
            ends_at: newEventStartAndEndDates.to,
          })
          .then((response) => setTrip(response.data.trip));

        window.location.reload();
      } catch (error) {
        console.error(error);
        toast.error("Erro ao atualizar dados.");
      }
    }
  }

  async function createLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const linkSchema = z.object({
      title: z.string().min(4, "O título deve ter no mínimo 4 caracteres."),
      url: z.string().url("Por favor, insira uma URL válida."),
    });

    const validationResult = linkSchema.safeParse({ title: linkTitle, url });

    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      errors.forEach((error) => toast.error(error.message));
      return;
    }

    try {
      await api.post(`/trips/${tripId}/links`, {
        title: linkTitle,
        url,
      });

      closeCreateLinkModal();
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar link.");
    }
  }

  return (
    <div className="max-w-6xl px-5 py-5 md:py-10 mx-auto space-y-5 md:space-y-8">
      <DestinationAndDateHeader
        trip={trip}
        onUpdateDestinationAndDate={updateDestinationAndDate}
      />
      <main className="flex flex-col lg:flex-row gap-16 p-0 md:px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">Atividades</h2>

            <Button onClick={openCreateActivityModal}>
              <Plus className="size-5 shrink-0" />
              <span className="hidden md:block">Cadastrar atividade</span>
            </Button>
          </div>

          <Activities />
        </div>

        <div className="max-w-full w-80 space-y-6">
          <ImportantLinks openCreateLinkModal={openCreateLinkModal} />

          <div className="w-full h-px bg-zinc-800" />

          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
          trip={trip}
        />
      )}

      {isCreateLinkModalOpen && (
        <CreateLinkModal
          closeCreateLinkModal={closeCreateLinkModal}
          createLink={createLink}
          setLinkTitle={setlinkTitle}
          setUrl={setUrl}
        />
      )}

      <Toaster richColors theme="dark" />
    </div>
  );
}
