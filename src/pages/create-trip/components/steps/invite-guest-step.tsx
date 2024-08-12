import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../../components/button";

interface InviteGuestStepProps {
  openGuestsModal: () => void;
  openConfirmTripModal: () => void;
  emailsToInvite: string[];
}

export function InviteGuestStep({
  emailsToInvite,
  openConfirmTripModal,
  openGuestsModal,
}: InviteGuestStepProps) {
  return (
    <div
      className={`bg-zinc-900 rounded-xl p-4 gap-y-5 flex flex-col shadow-shape md:h-16 md:px-4 md:flex-row md:items-center md:gap-x-5`}
    >
      <button
        onClick={openGuestsModal}
        className="flex items-center gap-2 flex-1 text-left"
      >
        <UserRoundPlus className="size-5 text-zinc-400 shrink-0" />

        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100 text-lg flex-1">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-zinc-400 text-lg flex-1">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <Button onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className="size-5 shrink-0" />
      </Button>
    </div>
  );
}
