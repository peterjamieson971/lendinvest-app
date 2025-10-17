import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, LayoutDashboard, UserCircle, Key, LogOut, ChevronDown } from 'lucide-react';

export const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const menuItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard', onClick: () => { navigate('/dashboard'); setIsOpen(false); } },
    { icon: <UserCircle className="w-4 h-4" />, label: 'Profile', onClick: () => { setIsOpen(false); /* Navigate to profile */ } },
    { icon: <Key className="w-4 h-4" />, label: 'Change Password', onClick: () => { setIsOpen(false); /* Navigate to change password */ } },
    { icon: <LogOut className="w-4 h-4" />, label: 'Log Out', onClick: handleLogout, danger: true }
  ];

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFB800] to-[#FF8C00] flex items-center justify-center text-white font-semibold text-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:inline text-sm font-medium text-[#0A1628]">{user.name}</span>
        <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-[#E2E8F0] py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-[#E2E8F0]">
            <p className="text-sm font-semibold text-[#0A1628]">{user.name}</p>
            <p className="text-xs text-[#64748B] mt-0.5">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full px-4 py-2 text-left flex items-center gap-3 transition-colors ${
                  item.danger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-[#0A1628] hover:bg-[#F8FAFC]'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
