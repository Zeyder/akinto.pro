import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Personal from './pages/Personal';
import PersonalItem from './pages/PersonalItem';
import Videos from './pages/Videos';
import NotFound from './pages/NotFound';
import Commercial from './pages/Commercial';

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
        path: '/commercial',
        name: 'Commercial',
        component: Commercial
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
        component: NotFound
    }
];

export default routes;