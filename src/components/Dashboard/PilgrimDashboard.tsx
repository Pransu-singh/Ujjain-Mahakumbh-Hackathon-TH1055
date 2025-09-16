import React from 'react';
import { Link } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, MagnifyingGlassIcon, HeartIcon, PhoneIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const PilgrimDashboard: React.FC = () => (
  <div className="max-w-3xl mx-auto p-6">
    <div className="flex items-center mb-6">
      <HeartIcon className="h-10 w-10 text-primary mr-3 animate-pulse" />
      <h1 className="text-4xl font-extrabold dark:text-gray-100 text-primary">Welcome to CrowdGuard AI</h1>
    </div>
    <p className="mb-8 text-lg dark:text-gray-200 text-gray-700">
      We hope you have a safe and blessed visit. Explore the features below to make your experience smoother and more enjoyable!
    </p>

    <div className="grid gap-8 md:grid-cols-2">
      <Link
        to="/lost-and-found"
        className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white font-semibold text-center shadow-lg hover:scale-105 transition-transform"
      >
        <MagnifyingGlassIcon className="h-8 w-8 mb-2" />
        <span className="text-xl">Lost &amp; Found</span>
        <span className="text-sm mt-2 opacity-80">Report or search for lost items easily.</span>
      </Link>
      <Link
        to="/social-sentiment"
        className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold text-center shadow-lg hover:scale-105 transition-transform"
      >
        <ChatBubbleLeftRightIcon className="h-8 w-8 mb-2" />
        <span className="text-xl">Share Your Experience</span>
        <span className="text-sm mt-2 opacity-80">Share your thoughts and see what others are saying.</span>
      </Link>
      <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-r from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700 text-blue-900 dark:text-blue-100 shadow-lg">
        <InformationCircleIcon className="h-8 w-8 mb-2" />
        <h2 className="font-bold text-lg mb-2">Helpful Tips</h2>
        <ul className="list-disc ml-5 text-base">
          <li>Follow instructions from volunteers and security staff.</li>
          <li>Keep your belongings safe and report anything lost immediately.</li>
          <li>Stay hydrated and take care of your health.</li>
          <li>Use the Lost & Found feature for quick help.</li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-300 dark:from-yellow-900 dark:to-yellow-700 text-yellow-900 dark:text-yellow-100 shadow-lg">
        <PhoneIcon className="h-8 w-8 mb-2" />
        <h2 className="font-bold text-lg mb-2">Emergency Contacts</h2>
        <ul className="text-base">
          <li>
            Help Desk: <a href="tel:1234567890" className="underline">123-456-7890</a>
          </li>
          <li>
            Medical: <a href="tel:0987654321" className="underline">098-765-4321</a>
          </li>
        </ul>
        <span className="text-xs mt-2 opacity-80">Tap to call for immediate assistance.</span>
      </div>
    </div>

    <div className="mt-10 text-center">
      <span className="inline-block px-4 py-2 rounded-full bg-primary text-white font-semibold shadow-lg animate-bounce">
        Enjoy your visit and let us know if you need any help!
      </span>
    </div>
  </div>
);

export default PilgrimDashboard;