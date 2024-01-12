interface Blog {
  id: number;
  title: string;
  body: string;
  user_id: string;
}

interface BlogComment {
  id: number;
  name: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface SideNavItem {
  title: string;
  path: string;
  Icon?: React.ElementType;
}
