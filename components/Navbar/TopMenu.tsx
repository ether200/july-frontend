import Link from "next/link";
import useSWR from "swr";
import { fetchWithToken } from "../../axios/userApi";
import { IconContext } from "react-icons";
import {
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiHeart,
  FiClipboard,
} from "react-icons/fi";
import { parseCookies, destroyCookie } from "nookies";
import { UserI } from "../../intefaces";

const TopMenu = () => {
  const { jwt } = parseCookies();
  const { data: user, isValidating } = useSWR<UserI>(
    jwt ? ["/users/me", jwt] : null,
    fetchWithToken,
    {
      revalidateOnFocus: false,
    }
  );
  return (
    <IconContext.Provider value={{ size: "1.6rem" }}>
      <div className="navbar__topmenu">
        <div className="navbar__topmenu__account">
          {!user && !isValidating ? (
            <ul className="navbar__topmenu__account__list">
              <li>
                <Link href="/cart">
                  <a className="navbar__topmenu__account__list__link">
                    <FiShoppingCart /> Cart
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <a className="navbar__topmenu__account__list__link">
                    <FiUser /> Sign up
                  </a>
                </Link>
              </li>
            </ul>
          ) : (
            <LoggedMenu />
          )}
        </div>
      </div>
    </IconContext.Provider>
  );
};

function LoggedMenu() {
  return (
    <ul className="navbar__topmenu__account__list">
      <li>
        <Link href="/my-account">
          <a className="navbar__topmenu__account__list__link">
            <FiUser />{" "}
            <span className="navbar__topmenu__account__list__link__text">
              My account
            </span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/orders">
          <a className="navbar__topmenu__account__list__link">
            <FiClipboard />{" "}
            <span className="navbar__topmenu__account__list__link__text">
              Orders
            </span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/wishlist">
          <a className="navbar__topmenu__account__list__link">
            <FiHeart />{" "}
            <span className="navbar__topmenu__account__list__link__text">
              Wish list
            </span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/cart">
          <a className="navbar__topmenu__account__list__link">
            {" "}
            <FiShoppingCart />{" "}
            <span className="navbar__topmenu__account__list__link__text">
              Cart
            </span>
          </a>
        </Link>
      </li>
      <li>
        <Link href={"/"} replace>
          <a
            className="navbar__topmenu__account__list__link"
            onClick={() => {
              destroyCookie(null, "jwt");
            }}
          >
            <FiLogOut />{" "}
            <span className="navbar__topmenu__account__list__link__text">
              Log out
            </span>
          </a>
        </Link>
      </li>
    </ul>
  );
}

export default TopMenu;
