import Close from "../../assets/svg/Close";

const MiniBar = () => {
  return (
    <div className="fixed flex items-center justify-center opacity-100 right-10 lg:opacity-0 lg:right-0  top-70 transition-all duration-300 bg-amber-500 rounded-full w-32 h-32">
      <span onClick={() => {}}>
        <Close size={32} />
      </span>
    </div>
  );
};

export default MiniBar;
