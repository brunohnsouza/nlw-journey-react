import { CheckCircle2, CircleDashed } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      {participants.length > 0 ? (
        participants.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index + 1}`}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed ? (
              <CheckCircle2 className="size-5 text-lime-300" />
            ) : (
              <CircleDashed className="size-5 text-zinc-400" />
            )}
          </div>
        ))
      ) : (
        <p className="text-zinc-500 text-sm">
          Nenhum convidado cadastrado nessa viagem.
        </p>
      )}
    </div>
  );
}
