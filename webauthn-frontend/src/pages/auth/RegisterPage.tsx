import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { UsernameField } from "../../components/forms/UsernameField";
import { SubmitButton } from "../../components/forms/styles/SubmitButton";
import { AlertMessage } from '../../components/feedback/styles/AlertMessage';
import { registerPasskey } from '../../services/api/webauthnApi';
import styles from "./styles/RegisterPage.module.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);
    setSuccess(null);
    if (!username.trim()) {
      setError("Digite um username.");
      return;
    }
    try {
      setLoading(true);
      await registerPasskey(username.trim());
      setSuccess("Passkey registrada com sucesso.");
    } catch (e) {
      setError(e.message || "Erro ao registrar passkey.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Registrar passkey
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Crie uma credencial FIDO2/WebAuthn vinculada ao seu usuário.
          </Typography>

          <div className={styles.form}>
            <UsernameField value={username} onChange={setUsername} />

            <SubmitButton loading={loading} onClick={handleRegister} fullWidth>
              Registrar passkey
            </SubmitButton>

            <AlertMessage severity="success" message={success} />
            <AlertMessage severity="error" message={error} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}