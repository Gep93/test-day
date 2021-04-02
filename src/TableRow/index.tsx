import React, { useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const TableRow = (props: any) => {
  const [value, setValue] = useState<string | undefined>(props.r.Note);
  const [isEditing, setIsEditing] = useState(false);

  const showForm = () => {
    setIsEditing(true);
  };

  const editInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(value);
  };

  const submit = (e: any) => {
    e.preventDefault();
    const property: string = e.target.parentElement.getAttribute("data-cell");
    const rowIndex: number = e.target.parentElement.parentElement.getAttribute(
      "data-index"
    );
    setIsEditing(false);
    const jsonVal = JSON.stringify({ [property]: value });
    props.updateCell(jsonVal, rowIndex);
  };

  const cancel = () => {
    setIsEditing(false);
  };

  return (
    <tr data-index={props.index}>
      <td data-cell="Note" onClick={showForm} style={{ cursor: "pointer" }}>
        {isEditing ? (
          <form onSubmit={submit}>
            <input
              autoFocus
              onChange={editInput}
              type="text"
              value={value}
              style={{ border: "none", outline: "none" }}
            />
            <button
              className="btn m-0 p-0 text-primary"
              type="submit"
              onClick={cancel}
            >
              <CheckBoxIcon />
            </button>
            <button className="btn m-0 p-0 text-primary" onClick={cancel}>
              <CancelIcon />
            </button>
          </form>
        ) : (
          props.r.Note
        )}
      </td>
      <td data-cell="VehicleID">{props.r.VehicleID}</td>
      <td data-cell="InhouseSellerID"> {props.r.InhouseSellerID}</td>
      <td data-cell="BuyerID"> {props.r.BuyerID}</td>
      <td data-cell="ModelID"> {props.r.ModelID}</td>
      <td data-cell="SaleDate"> {props.r.SaleDate}</td>
      <td data-cell="BuyDate"> {props.r.BuyDate}</td>
    </tr>
  );
};

export default TableRow;
