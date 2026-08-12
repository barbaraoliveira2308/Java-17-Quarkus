import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { UsernameField } from "../../components/forms/UsernameField";
import { SubmitButton } from  '../../components/forms/styles/SubmitButton'
import { AlertMessage } from '../../components/feedback/styles/AlertMessage';
import { loginWithPasskey } from '../../services/api/webauthnApi';
import styles from "./styles/LoginPage.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    setSuccess(null);
    try {
      setLoading(true);
      await loginWithPasskey(username.trim() || undefined);
      setSuccess("Login realizado com sucesso!");
    } catch (e) {
      setError(e.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login com passkey
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Autentique-se usando sua credencial FIDO2/WebAuthn.
          </Typography>

          <div className={styles.form}>
            <UsernameField
              label="Username (opcional)"
              value={username}
              onChange={setUsername}
              required={false}
              helperText="Dependendo da implementação, o username pode ser opcional."
            />

            <SubmitButton loading={loading} onClick={handleLogin} fullWidth>
              Entrar com passkey
            </SubmitButton>

            <AlertMessage severity="success" message={success} />
            <AlertMessage severity="error" message={error} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}