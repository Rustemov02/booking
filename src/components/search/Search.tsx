import SearchIcon from "../../assets/svg/Search";
import styles from "./search.module.css";

const Search = () => {
  return (
    <div className={`${styles.search} py-2 px-4 h-[32px] min-w-fit`}>
      <input type="text" placeholder="Search"/>
      <span>
        <SearchIcon />
      </span>
    </div>
  );
};

export default Search;
