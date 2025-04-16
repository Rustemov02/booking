
const HamburgerMenu = ({ size}: {size : number}) => {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="4" fill="white" />
        <path d="M12 18H48" stroke="black" stroke-width="4" />
        <path d="M12 30H48" stroke="black" stroke-width="4" />
        <path d="M12 42H48" stroke="black" stroke-width="4" />
      </svg>
    </>
  );
};

export default HamburgerMenu;
