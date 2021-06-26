import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  text: string;
  link: string;
  icon?: IconDefinition;
}

const SidebarLink = ({ text, link, icon }: IProps): JSX.Element => (
  <Link href={link} passHref>
    <a
      href="replace"
      className="flex items-center px-2 py-2 font-light text-white leading-6 rounded-md group hover:bg-gray-600"
    >
      {icon ? (
        <span className="w-6 h-4 mr-4 text-xs text-center">
          <FontAwesomeIcon icon={icon} size="lg" />
        </span>
      ) : (
        ''
      )}
      {text}
    </a>
  </Link>
);

export default SidebarLink;