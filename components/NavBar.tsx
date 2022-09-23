import Link from "next/link";

interface NavBarProps {
  id: string;
}

// TODO add styles
// make text some shade of gray
// change link appearance?
const NavBar = ({ id }: NavBarProps) => {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>{" "}
      / Record [{id}]
    </div>
  );
};

export default NavBar;
