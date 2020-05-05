import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

interface MyProps {
  name: string;
  label: string;
  value: string;
  selectLabel: string;
  options: any;
  onChange: (event: any) => void;
}

const SelectInput = ({
  label,
  name,
  value,
  selectLabel,
  options,
  onChange,
}: MyProps) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input type="select" name={name} value={value} onChange={onChange}>
      <option value="0">{selectLabel}</option>
      {options.map((row: any, index: any) => {
        return <option value={row.id}>{row.name}</option>;
      })}
    </Input>
  </FormGroup>
);

export default SelectInput;
