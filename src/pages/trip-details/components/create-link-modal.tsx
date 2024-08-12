import { Link2, Tag } from "lucide-react";
import { Modal } from "../../../components/modal";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void;
  createLink: (event: React.FormEvent<HTMLFormElement>) => void;
  setLinkTitle: (linkTitle: string) => void;
  setUrl: (url: string) => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
  createLink,
  setLinkTitle,
  setUrl,
}: CreateLinkModalProps) {
  return (
    <Modal
      closeModal={closeCreateLinkModal}
      titleModal="Cadastrar link"
      descriptionModal="Todos convidados podem visualizar os links importantes."
    >
      <form onSubmit={createLink} className="space-y-3">
        <div className="space-y-2">
          <Input>
            <Tag className="text-zinc-400 size-5 shrink-0" />
            <input
              type="text"
              name="link-title"
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setLinkTitle(event.target.value)}
            />
          </Input>

          <Input>
            <Link2 className="text-zinc-400 size-5 shrink-0" />
            <input
              type="text"
              name="url"
              placeholder="URL"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setUrl(event.target.value)}
            />
          </Input>
        </div>

        <Button type="submit" size="full">
          Salvar link
        </Button>
      </form>
    </Modal>
  );
}
