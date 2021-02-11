import { ChangeEvent, SyntheticEvent, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { categoriesFetcher } from "../../axios/categoryApi";
import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { CategoryI } from "../../intefaces";

const Navigation: React.FC = () => {
  const router = useRouter();
  const { data, error } = useSWR<CategoryI[]>(
    "/categories",
    categoriesFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    const modifiedQuery = searchQuery.trim().split(" ").join("_");
    router.push(`/search?_q=${modifiedQuery}`);
    setSearchQuery("");
  };

  return (
    <IconContext.Provider value={{ className: "icon" }}>
      <div className="navbar__navigation">
        <div className="navbar__navigation__logo">
          <Link href="/">
            <h1>JULY</h1>
          </Link>
        </div>
        <ul className="navbar__navigation__links">
          <li>
            <Link href="/about">
              <a className="navbar__navigation__links__link">about</a>
            </Link>
          </li>
          <li className="navbar__navigation__links__dropdown">
            <button
              className="navbar__navigation__links__dropdown__btn"
              disabled
            >
              categories <FaCaretDown />
            </button>
            <div className="navbar__navigation__links__dropdown__content">
              {data &&
                data.map((category) => (
                  <Link href={`/categories/${category.url}`} key={category.id}>
                    <a className="navbar__navigation__links__dropdown__content__link">
                      {category.title}
                    </a>
                  </Link>
                ))}
            </div>
          </li>
          <li>
            <Link href="/books">
              <a className="navbar__navigation__links__link">store</a>
            </Link>
          </li>
        </ul>
        <div className="navbar__navigation__searchbar">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(event.target.value)
              }
              value={searchQuery || " "}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Navigation;
