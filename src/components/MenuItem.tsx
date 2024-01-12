import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  Icon?: React.ElementType;
  title: string;
  path: string;
  onClick?: () => void;
};

const MenuItem = ({ Icon, title, path, onClick }: Props) => {
  const pathname = usePathname();

  // Highlight menu item based on currently displayed route
  const colorClass =
    pathname === path
      ? "text-white dark:text-gray-200"
      : "text-white/50 hover:text-white";

  return (
    <Link
      href={path}
      onClick={onClick}
      className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 ${colorClass}`}
    >
      {Icon ? <Icon className="text-xl flex [&>*]:mx-auto w-[30px]" /> : null}
      <p>{title}</p>
    </Link>
  );
};

export default MenuItem;
