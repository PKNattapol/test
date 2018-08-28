import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        url: '/dashboard'
    },
    {
        id: 'showroom_id',
        title: 'Showroom ID',
        type: 'item',
        icon: 'chrome_reader_mode',
        url: '/showroom_id'
    },
    {
        id: 'logout',
        title: 'Logout',
        type: 'item',
        icon: 'exit_to_app',
        function: 'logout()'
    }
];