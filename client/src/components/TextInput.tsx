import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

interface MyProps {
  name: string;
  label: string;
  type: any;
  value: string;
  onChange: (event: any) => void;
}

const TextInput = ({ label, type, name, value, onChange }: MyProps) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input type={type} name={name} value={value} onChange={onChange} />
  </FormGroup>
);

export default TextInput;
