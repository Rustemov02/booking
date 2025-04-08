import SearchIcon from "../../assets/svg/Search";
import styles from "./search.module.css";

const Search = () => {
  return (
    <div className={styles.search}>
      <input type="text" placeholder="Search" />
      <span>
        <SearchIcon />
      </span>
    </div>
  );
};

export default Search;
