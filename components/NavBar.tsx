import Link from "next/link";

interface NavBarProps {
  id: string;
}

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
