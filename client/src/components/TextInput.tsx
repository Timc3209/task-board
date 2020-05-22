import React from "react";
import { FormGroup, Label, Input, FormFeedback, InputProps } from "reactstrap";

const TextInput = ({
  label,
  type,
  name,
  value,
  onChange,
  showError,
  errorMessage,
  rows,
  maxLength,
}: InputProps) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      invalid={showError}
      rows={rows}
      maxLength={maxLength}
    />
    <FormFeedback>{errorMessage}</FormFeedback>
  </FormGroup>
);

export default TextInput;
