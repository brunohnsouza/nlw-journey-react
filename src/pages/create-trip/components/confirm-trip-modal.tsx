import { Mail, User } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../../components/button";
import { DateRange } from "react-day-picker";
import { Modal } from "../../../components/modal";
import { getDisplayedRangeDateFull } from "../../../components/date";
import { Input } from "../../../components/input";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  destination: string;
  eventStartAndEndDates: DateRange | undefined;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
  destination,
  eventStartAndEndDates,
}: ConfirmTripModalProps) {
  const displayedDate = getDisplayedRangeDateFull(eventStartAndEndDates);

  return (
    <Modal
      closeModal={closeConfirmTripModal}
      titleModal="Confirmar criação de viagem"
      descriptionModal={
        <>
          Para concluir a criação da viagem para{" "}
          <span className="font-semibold text-zinc-100">{destination}</span> nas
          datas de{" "}
          <span className="font-semibold text-zinc-100">{displayedDate}</span>{" "}
          preencha seus dados abaixo:
        </>
      }
    >
      <form onSubmit={createTrip} className="space-y-3">
        <div className="space-y-2">
          <Input>
            <User className="text-zinc-400 size-5 shrink-0" />

            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </Input>

          <Input>
            <Mail className="text-zinc-400 size-5 shrink-0" />

            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </Input>
        </div>

        <Button type="submit" size="full">
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  );
}
