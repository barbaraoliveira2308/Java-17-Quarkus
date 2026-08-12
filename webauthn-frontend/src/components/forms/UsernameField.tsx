import { TextField } from '@mui/material';
import styles from './styles/UsernameField.module.css';

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  helperText?: string;
};

export function UsernameField({
  label = 'Username',
  value,
  onChange,
  required = true,
  helperText,
}: Props) {
  return (
    <div className={styles.root}>
      <TextField
        fullWidth
        label={label}
        margin="normal"
        value={value}
        required={required}
        helperText={helperText}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}