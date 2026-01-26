"use client";

type SidebarProps = {
  isMobile?: boolean;
};

export default function Sidebar({ isMobile = false }: SidebarProps) {
  return (
    <nav
      className={`${
        isMobile ? "block" : "w-60 flex-shrink-0"
      } bg-gray-100 p-4 rounded-md`}
    >
      <ul className="space-y-4">
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Fanart
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Posts
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Jeux (tour par tour)
          </a>
        </li>
      </ul>
    </nav>
  );
}
