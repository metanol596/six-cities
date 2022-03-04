type PropsType = {
  className?: string;
}

function Map({className}: PropsType): JSX.Element {
  return (
    <section className={`${className} map`} />
  );
}

export default Map;
