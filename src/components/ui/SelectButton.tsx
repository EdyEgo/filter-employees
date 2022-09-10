import Button from "@mui/material/Button";

export default function BasicButtons({
  setNewButtonState,
  newState,
  buttonState,
  buttonName,
  buttoncontainerClassStyles,
}: {
  buttoncontainerClassStyles?: string;
  buttonName: string;
  buttonState: boolean;
  newState: string | boolean;
  setNewButtonState: (newState: boolean | string) => void;
}) {
  return (
    <div
      className={`select-button-container ${
        buttoncontainerClassStyles != null ? buttoncontainerClassStyles : ""
      }`}
      onClick={() => {
        setNewButtonState(newState);
      }}
    >
      {buttonState && <Button variant="contained">{buttonName}</Button>}
      {!buttonState && <Button variant="outlined">{buttonName}</Button>}
    </div>
  );
}
