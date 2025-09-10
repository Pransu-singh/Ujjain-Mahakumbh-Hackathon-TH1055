import React from 'react';
import {
  HomeIcon,
  ChartPieIcon,
  UserGroupIcon,
  VideoCameraIcon,
  BellAlertIcon,
  Cog6ToothIcon,
  LightBulbIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  { name: 'Analytics', icon: ChartPieIcon, href: '/analytics' },
  { name: 'Crowd Monitoring', icon: UserGroupIcon, href: '/crowd-monitoring' },
  { name: 'Live Feeds', icon: VideoCameraIcon, href: '/live-feeds' },
  { name: 'Alerts', icon: BellAlertIcon, href: '/alerts' },
  { name: 'Lost & Found', icon: UserIcon, href: '/lost-and-found' },
  { name: 'Recommendations', icon: LightBulbIcon, href: '/recommendations' },
  { name: 'Social Sentiment', icon: ChatBubbleLeftRightIcon, href: '/social-sentiment' },
  { name: 'Settings', icon: Cog6ToothIcon, href: '/settings' },
];

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-primary">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="CrowdGuard AI"
              />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-primary-dark hover:bg-opacity-75 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;