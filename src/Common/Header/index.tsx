import "./index.css";

function Header(props: { children: string }) {
  return (
    <div className="Header">
      <h1>{props.children}</h1>
    </div>
  );
}

export default Header;
