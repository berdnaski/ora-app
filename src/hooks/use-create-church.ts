import { useState } from "react";
import { Church, CreateChurchInput } from "../@types/church.type";
import { http } from "../api/http";
import { useAuthStore } from "../state/auth";

export function useCreateChurch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createChurch = async (data: CreateChurchInput): Promise<Church | null> => {
    setLoading(true);
    setError(null);

    try {
      // Pega token do Zustand
      const { accessToken } = useAuthStore.getState();

      if (!accessToken) throw new Error("Usuário não autenticado");

      const church = await http<Church>("/church", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        auth: true, // seu http wrapper vai tentar refresh se 401
      });

      setLoading(false);
      return church;
    } catch (err: any) {
      console.error("❌ Erro ao criar igreja:", err);
      setError(err.message || "Falha ao criar igreja");
      setLoading(false);
      return null;
    }
  };

  return { createChurch, loading, error };
}
