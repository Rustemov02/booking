const Close = (size : number) => {
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
        <path d="M17 42.4561L42.4558 17.0002" stroke="black" stroke-width="4" />
        <path
          d="M17.2725 17.272L42.7283 42.7278"
          stroke="black"
          stroke-width="4"
        />
        <path d="M17 17L42.4558 42.4558" stroke="black" stroke-width="4" />
      </svg>
    </>
  );
};


export default Close;