import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./components/invite-guests-modal";
import { ConfirmTripModal } from "./components/confirm-trip-modal";
import { DestinationAndDateStep } from "./components/steps/destination-and-date-step";
import { InviteGuestStep } from "./components/steps/invite-guest-step";
import { api } from "../../lib/axios";
import { Toaster, toast } from "sonner";
import { z } from "zod";
import { DateRange } from "react-day-picker";

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState([] as string[]);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    const emailSchema = z.object({
      email: z.string().email("E-mail inválido"),
    });

    const validationResult = emailSchema.safeParse({ email });

    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      errors.forEach((error) => toast.error(error.message));
      return;
    }

    if (email && emailsToInvite.includes(email)) {
      toast.error("Este e-mail já foi convidado.");
      return;
    }

    if (email) {
      setEmailsToInvite([...emailsToInvite, email]);
      event.currentTarget.reset();
    }
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );

    setEmailsToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const tripSchema = z.object({
      destination: z
        .string()
        .min(4, "O destino deve ter no mínimo 4 caracteres."),
      eventStartAndEndDates: z.custom<DateRange>((value) => {
        if (!value || !value.error) {
          return value;
        }
        return { error: value.error };
      }, "Informe a data de início e fim da viagem."),
      ownerName: z.string().min(2, "Nome do organizador inválido."),
      ownerEmail: z.string().email("E-mail do organizador inválido."),
    });

    const validationResult = tripSchema.safeParse({
      eventStartAndEndDates,
      destination,
      ownerName,
      ownerEmail,
    });

    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      errors.forEach((error) => toast.error(error.message));
      return;
    }

    try {
      if (eventStartAndEndDates) {
        const response = await api.post("/trips", {
          destination,
          starts_at: eventStartAndEndDates.from,
          ends_at: eventStartAndEndDates.to,
          emails_to_invite: emailsToInvite,
          owner_name: ownerName,
          owner_email: ownerEmail,
        });

        const { tripId } = response.data;

        toast.success("Viagem criada com sucesso!");

        setTimeout(() => {
          navigate(`/trips/${tripId}`);
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar a viagem.");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-5 py-5 md:py-10 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            destination={destination}
            setEventStartAndEndDates={setEventStartAndEndDates}
            eventStartAndEndDates={eventStartAndEndDates}
          />

          {isGuestsInputOpen && (
            <InviteGuestStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br />
          com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      <Toaster richColors expand visibleToasts={4} theme="dark" />

      {isGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          destination={destination}
          eventStartAndEndDates={eventStartAndEndDates}
        />
      )}
    </div>
  );
}
