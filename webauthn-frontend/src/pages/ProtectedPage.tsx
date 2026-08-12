import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { SubmitButton } from '../components/forms/styles/SubmitButton';
import { AlertMessage } from '../components/feedback/styles/AlertMessage';
import { apiGetText } from '../services/api/httpClient';
import styles from "./styles/ProtectedPage.module.css";

export default function ProtectedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callProtected = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const text = await apiGetText("/api/protected");
      setResult(text);
    } catch (e) {
      setError(e.message || "Erro ao chamar endpoint protegido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Área protegida
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Endpoint que só deve responder se você estiver autenticada com WebAuthn.
          </Typography>

          <SubmitButton loading={loading} onClick={callProtected}>
            Chamar /api/protected
          </SubmitButton>

          <AlertMessage severity="success" message={result} />
          <AlertMessage severity="error" message={error} />
        </CardContent>
      </Card>
    </div>
  );
}