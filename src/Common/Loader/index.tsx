import MoonLoader from "react-spinners/MoonLoader";

const Loader = (props: any) => {
  return (
    <div className="Loader">
      <MoonLoader loading={props.loading} size={60} />
      props.value ? <div>{props.value}</div> : Loading...
    </div>
  );
};

export default Loader;
