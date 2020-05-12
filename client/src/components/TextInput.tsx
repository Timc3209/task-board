import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

interface MyProps {
  name: string;
  label: string;
  type: any;
  value: string;
  onChange: (event: any) => void;
  showError?: boolean;
  errorMessage?: string;
}

const TextInput = ({
  label,
  type,
  name,
  value,
  onChange,
  showError,
  errorMessage,
}: MyProps) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      invalid={showError}
    />
    <FormFeedback>{errorMessage}</FormFeedback>
  </FormGroup>
);

export default TextInput;
