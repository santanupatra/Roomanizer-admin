export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
  
    {
      name: 'Manage User',
      url: '/user',
      icon: 'fa fa-users',
      children: [
        {
          name: 'Add',
          url: '/user/add',
          icon: 'fa fa-user-plus',
        },
        {
          name: 'List',
          url: '/user/list',
          icon: 'fa fa-list-alt',
        }
      ]
    },
    {
      name: 'Manage Room',
      url: '/room',
      icon: 'fa fa-users',
      children: [
        {
          name: 'Add',
          url: '/room/add',
          icon: 'fa fa-user-plus',
        },
        {
          name: 'List',
          url: '/room/list',
          icon: 'fa fa-list-alt',
        }
      ]
    },
    {
      name: 'Manage Setting',
      url: '/setting',
      icon: 'fa fa-cogs',
      // children: [
      //   {
      //     name: 'Add',
      //     url: '/user/add',
      //     icon: 'fa fa-user-plus',
      //   },
      //   {
      //     name: 'List',
      //     url: '/user/list',
      //     icon: 'fa fa-list-alt',
      //   }
      // ]
    },
    
  ],
};
