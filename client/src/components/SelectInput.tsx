import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

interface OptionTypes {
  id: string;
  name: string;
}

interface MyProps {
  name: string;
  label: string;
  value: string;
  selectLabel: string;
  options: Array<OptionTypes>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
      {options.map((row: OptionTypes, index: number) => {
        return (
          <option value={row.id} key={index}>
            {row.name}
          </option>
        );
      })}
    </Input>
  </FormGroup>
);

export default SelectInput;
