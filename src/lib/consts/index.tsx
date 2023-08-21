import {

	HiUser,
    HiMap,

} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Charts & Maps',
		path: '/',
		icon: <HiMap />
	},
	{
		key: 'contact',
		label: 'Contact',
		path: '/contact',
		icon: <HiUser/>
	},
]
