import Navigation from "./Navigation";
import TopMenu from "./TopMenu";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <TopMenu />
      <Navigation />
    </div>
  );
};

export default Navbar;
