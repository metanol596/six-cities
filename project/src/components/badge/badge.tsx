type PropsType = {
  text: string;
  className: string;
}

function Badge({text, className}: PropsType): JSX.Element {
  return (
    <div className={`${className}__mark`}>
      <span>{text}</span>
    </div>
  );
}

export default Badge;
