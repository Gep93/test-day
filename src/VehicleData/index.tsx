import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import ReactPaginate from "react-paginate";
import TableRow from "../TableRow/index";
import ContextMenu from "../ContextMenu";
import BounceLoader from "react-spinners/BounceLoader";
import paginate, { paginationItemIndex } from "../utils/paginate";
import useToggleState from "../hooks/useToggleState";
import { data, delay } from "../fakeAPI";
import "./index.css";

interface IVehicleData {
  [key: string]: any;
  VehicleID: number;
  InhouseSellerID: number;
  BuyerID: number;
  ModelID: number;
  SaleDate: string;
  BuyDate: string;
  Note?: string;
}

function VehicleData(props: { numPages: number }) {
  const [vehicleData, setVehicleData] = useState<Array<IVehicleData>>([]);
  const [dispVehicles, setDispVehicles] = useState<Array<IVehicleData>>([]);
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [position, setPosition] = useState({ x: "0px", y: "0px" });
  const [loading, setLoading] = useState(true);
  const [cell, setCell] = useState({ rowIndex: 0, property: "" });
  const [contextMenu, toggle] = useToggleState(false);

  useEffect(() => {
    const getData = async () => {
      await delay();
      setVehicleData(data);
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    setDispVehicles(paginate(vehicleData, selectedPage, props.numPages));
  }, [vehicleData]);

  const handlePageClick = (e: { selected: number }) => {
    const selectedPage = e.selected;
    setDispVehicles(paginate(vehicleData, selectedPage, 10));
    setSelectedPage(e.selected);
  };

  const updateCell = (value: string, index: number) => {
    const newVehicleData = [...vehicleData];
    let obj: { [key: string]: any } = {};
    if (typeof JSON.parse(value) === "object") obj = JSON.parse(value);
    else obj = { [cell.property]: value };
    newVehicleData[index] = {
      ...newVehicleData[index],
      ...obj,
    };
    setVehicleData(newVehicleData);
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    const property = e.target.getAttribute("data-cell");
    const rowIndex: number = e.target.parentElement.getAttribute("data-index");
    const { x, y, width, height } = e.target.getBoundingClientRect();
    setPosition({ x: x + width / 2 + "px", y: y + height + "px" });
    console.log(property);
    setCell({ rowIndex, property });
    toggle(true);
  };

  const copyToClipboard = (val: string) => {
    if (val === "cell") {
      navigator.clipboard.writeText(vehicleData[cell.rowIndex][cell.property]);
    } else {
      navigator.clipboard.writeText(JSON.stringify(vehicleData[cell.rowIndex]));
    }
    toggle();
  };

  const pasteToCell = async () => {
    const value = await navigator.clipboard.readText();
    console.log(value);
    updateCell(value, cell.rowIndex);
    toggle();
  };

  const handleToggle = () => {
    toggle();
  };

  return !loading ? (
    <div className="VehicleData">
      <Table>
        <thead>
          <tr>
            <th>Note</th>
            <th>VehicleID</th>
            <th>InhouseSellerID</th>
            <th>BuyerID</th>
            <th>ModelID</th>
            <th>SaleDate</th>
            <th>BuyDate</th>
          </tr>
        </thead>
        <tbody onContextMenu={handleContextMenu}>
          {dispVehicles &&
            dispVehicles.map((r, i) => {
              return (
                <TableRow
                  key={paginationItemIndex(i, selectedPage)}
                  index={paginationItemIndex(i, selectedPage)}
                  r={r}
                  updateCell={updateCell}
                />
              );
            })}
        </tbody>
      </Table>
      <ContextMenu
        open={contextMenu}
        position={position}
        copy={copyToClipboard}
        copyRow={copyToClipboard}
        paste={pasteToCell}
        toggle={handleToggle}
      />
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(vehicleData.length / props.numPages)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  ) : (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BounceLoader loading={true} size={60} />
    </div>
  );
}

export default VehicleData;
