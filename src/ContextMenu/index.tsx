import "./index.css";

const ContextMenu = (props: any) => {
  return props.open ? (
    <div
      className="ContextMenu"
      style={{ top: `${props.position.y}`, left: `${props.position.x}` }}
    >
      <div className="ContextMenu-item" onClick={() => props.copy("cell")}>
        Copy cell
      </div>
      <div className="ContextMenu-item" onClick={() => props.copyRow("row")}>
        Copy row
      </div>
      <div className="ContextMenu-item" onClick={props.paste}>
        Paste
      </div>
      <div className="ContextMenu-item" onClick={props.toggle}>
        x
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ContextMenu;
