// front-end\src\components\Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, AcademicCapIcon, ShoppingCartIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const links = [
    { path: '/home', icon: HomeIcon, label: 'Home' },
    { path: '/courses', icon: AcademicCapIcon, label: 'Courses' },
    { path: '/cart', icon: ShoppingCartIcon, label: 'Cart' },
    // { path: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
    // { path: '/help', icon: QuestionMarkCircleIcon, label: 'Help' },
  ];

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-8 space-y-8 pt-20">
      {links.map(({ path, icon: Icon, label }) => (
        <Link
          key={path}
          to={path}
          className={`p-2 rounded-lg ${
            isActive(path) ? 'bg-tseep-blue text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
          title={label}
        >
          <Icon className="w-6 h-6" />
        </Link>
      ))}
    </div>
  );
}