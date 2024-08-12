import { AtSign, Plus, X } from "lucide-react";
import { Button } from "../../../components/button";
import { Modal } from "../../../components/modal";

interface InviteGuestsModalProps {
  emailsToInvite: string[];
  removeEmailFromInvites: (email: string) => void;
  addNewEmailToInvite: (event: React.FormEvent<HTMLFormElement>) => void;
  closeGuestsModal: () => void;
}

export function InviteGuestsModal({
  addNewEmailToInvite,
  closeGuestsModal,
  emailsToInvite,
  removeEmailFromInvites,
}: InviteGuestsModalProps) {
  return (
    <Modal
      closeModal={closeGuestsModal}
      titleModal="Selecionar convidados"
      descriptionModal="Os convidados irão receber e-mails para confirmar a participação na
    viagem."
    >
      <div className="flex flex-wrap gap-2">
        {emailsToInvite.map((email) => {
          return (
            <div
              key={email}
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
            >
              <span className="text-zinc-300">{email}</span>

              <button
                type="button"
                onClick={() => removeEmailFromInvites(email)}
              >
                <X className="size-4 text-zinc-400 shrink-0" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="w-full h-px bg-zinc-800 my-4" />

      <form onSubmit={addNewEmailToInvite} className="space-y-3">
        <div className="p-4 md:p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
          <div className="flex flex-1 w-full items-center gap-2">
            <AtSign className="text-zinc-400 size-5 shrink-0" />

            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent w-full outline-none text-lg placeholder-zinc-400"
            />
          </div>

          <div className="hidden md:block">
            <Button type="submit">
              Convidar
              <Plus className="size-5 shrink-0" />
            </Button>
          </div>
        </div>

        <div className="w-full block md:hidden">
          <Button type="submit" size="full">
            Convidar
            <Plus className="size-5 shrink-0" />
          </Button>
        </div>
      </form>
    </Modal>
  );
}
