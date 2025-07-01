import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({ titleLabel, atores, valor, onChange }) {
    return (
      <Autocomplete
        disablePortal
        options={atores}
        getOptionLabel={(option) => option.nome}
        value={valor}
        onChange={(event, newValue) => onChange(newValue)}
        renderInput={(params) => <TextField {...params} label={titleLabel} />}
      />
    );
  }