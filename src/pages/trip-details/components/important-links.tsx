import { Link2, Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";

interface ImportantLinksProps {
  openCreateLinkModal: () => void;
}

interface Link {
  id: string;
  title: string;
  url: string;
}

export function ImportantLinks({ openCreateLinkModal }: ImportantLinksProps) {
  const { tripId } = useParams();
  const linkRef = useRef<HTMLButtonElement>(null);
  const [links, setLinks] = useState<Link[]>([]);

  function copyToClipboard() {
    if (linkRef.current) {
      const textToCopy = linkRef.current.textContent;

      if (textToCopy) {
        toast.success("Link copiado para a área de transferência");
        navigator.clipboard.writeText(textToCopy);
      }
    }
  }

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>

      <div className="space-y-5">
        {links.length > 0 ? (
          links.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <span
                  ref={linkRef}
                  className="block text-xs text-zinc-400 truncate"
                >
                  {link.url}
                </span>
              </div>

              <button
                onClick={copyToClipboard}
                className="text-zinc-400 hover:text-zinc-500"
              >
                <Link2 className="size-5 shrink-0" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-zinc-500 text-sm">Nenhum link cadastrado.</p>
        )}
      </div>

      <Button onClick={openCreateLinkModal} variant="secondary" size="full">
        <Plus className="size-5 shrink-0" />
        Cadastrar novo link
      </Button>

      <Toaster richColors theme="dark" />
    </div>
  );
}
