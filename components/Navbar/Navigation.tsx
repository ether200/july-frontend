import useSWR from "swr";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { categoriesFetcher } from "../../axios/categoryApi";
import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { CategoryI } from "../../intefaces";

const Navigation: React.FC = () => {
  const router = useRouter();
  // initialize categories
  const { data: categories } = useSWR<CategoryI[]>(
    "/categories",
    categoriesFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?_q=${searchQuery.trim()}`);
    setSearchQuery("");
  };

  return (
    <IconContext.Provider value={{ className: "icon" }}>
      <div className="navigation">
        <div className="navigation__grid">
          <div className="navigation__grid__logo">
            <Link href="/">
              <h1>JULY</h1>
            </Link>
          </div>
          <ul className="navigation__grid__links">
            <li>
              <Link href="/about">
                <a className="navigation__grid__links__link">about</a>
              </Link>
            </li>
            <li className="navigation__grid__links__dropdown">
              <button
                className="navigation__grid__links__dropdown__btn"
                disabled
              >
                categories <FaCaretDown />
              </button>
              <div className="navigation__grid__links__dropdown__content">
                {!categories ? (
                  <p>Loading...</p>
                ) : (
                  categories.map((category) => (
                    <Link
                      href={`/categories/${category.url}`}
                      key={category.id}
                    >
                      <a className="navigation__grid__links__dropdown__content__link">
                        {category.title}
                      </a>
                    </Link>
                  ))
                )}
              </div>
            </li>
            <li>
              <Link href="/books">
                <a className="navigation__grid__links__link">store</a>
              </Link>
            </li>
          </ul>
          <div className="navigation__grid__searchbar">
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
      </div>
    </IconContext.Provider>
  );
};

export default Navigation;
