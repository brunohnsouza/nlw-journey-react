import { X } from "lucide-react";

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
  titleModal: string;
  descriptionModal?: React.ReactNode;
}

export function Modal({
  closeModal,
  children,
  descriptionModal,
  titleModal,
}: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/60 flex items-end justify-center sm:items-center">
      <div className="w-full sm:max-w-[540px] sm:rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5 ">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-x-5">
            <h2 className="text-lg font-semibold">{titleModal}</h2>

            <button type="button" onClick={closeModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          {descriptionModal && (
            <p className="text-sm text-zinc-400">{descriptionModal}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
