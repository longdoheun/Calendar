export default function Header(props) {
  const { navLeft, navRight, CLASSNAME } = props;
  return (
    <header className={`header ${CLASSNAME} no-drag` }>
        {navLeft}
        {navRight}
    </header>
  );
};