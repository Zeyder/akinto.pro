import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Personal from './pages/Personal';
import PersonalItem from './pages/PersonalItem';
import Videos from './pages/Videos';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/personal',
        name: 'Pesonal',
        component: Personal,
        children: [
            {
                path: '/personal/:id',
                name: 'PersonalItem',
                component: PersonalItem
            }
        ]
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts
    },
    {
        path: '/videos',
        name: 'Videos',
        component: Videos
    },
    {
        path: '*',
        name: 'NotFound',
        redirect: '/'
    }
];

export default routes;