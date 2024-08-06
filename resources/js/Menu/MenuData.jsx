import {
    RiBarChart2Line,
    RiMailLine,
    RiPagesLine,
    RiUserSettingsLine,
} from 'react-icons/ri';
import {MdOutlineDashboard, MdOutlineSchool} from 'react-icons/md';

const MenuData = [
    {
        id: 'pages',
        name: 'pages',
        url: '/dashboard/pages/',
        icon: <RiPagesLine/>,
        permission: 'view dashboard'
    },
    {
        id: 'creator_center_link',
        name: 'creator center',
        url: '/creator-center',
        icon: <MdOutlineDashboard />,
        permission: 'view creator center'
    },
    {
        id: 'stats',
        name: 'stats',
        url: '/stats',
        icon: <RiBarChart2Line/>,
        permission: 'view stats'
    },
    {
        id: 'courses',
        name: 'courses',
        url: '/courses',
        icon: <MdOutlineSchool/>,
        permission: 'view courses'
    },
    {
        id: 'pre_register',
        name: 'pages',
        url: '/pre-register-link-pro',
        icon: <RiPagesLine/>,
        permission: 'view courses'
    },
    {
        id: 'settings',
        name: 'settings',
        url: '/edit-account',
        icon: <RiUserSettingsLine />,
        permission: 'has permission'
    },
    {
        id: 'contact_us',
        name: 'contact us',
        url: '/contact',
        icon: <RiMailLine/>,
        permission: 'all'
    },

]

export default MenuData;
