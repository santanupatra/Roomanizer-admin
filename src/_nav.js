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
      name: 'Manage Landlord',
      url: '/landlord',
      icon: 'fa fa-users',
      children: [
        {
          name: 'Add',
          url: '/landlord/add',
          icon: 'fa fa-user-plus',
        },
        {
          name: 'List',
          url: '/landlord/list',
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
      name: 'Manage CMS',
      url: '/cms',
      icon: 'fa fa-cog',
      children: [
        {
          name: 'Add',
          url: '/cms/add',
          icon: 'fa fa-user-plus',
        },
        {
          name: 'List',
          url: '/cms/list',
          icon: 'fa fa-list-alt',
        }
      ]
    },
    // {
    //   name: 'Manage Food Category',
    //   url: '/food',
    //   icon: 'fa fa-cutlery',
    //   children: [
    //     {
    //       name: 'Add',
    //       url: '/food/add',
    //       icon: 'fa fa-user-plus',
    //     },
    //     {
    //       name: 'List',
    //       url: '/food/list',
    //       icon: 'fa fa-list-alt',
    //     }
    //   ]
    // },
    // {
    //   name: 'Manage Service',
    //   url: '/service',
    //   icon: 'fa fa-black-tie',
    //   children: [
    //     {
    //       name: 'Add',
    //       url: '/service/add',
    //       icon: '	fa fa-black-tie'
    //     },
    //     {
    //         name: 'List',
    //         url: '/service/list',
    //         icon: '	fa fa-black-tie',
    //     }
    //   ]
    // },
     {
      name: 'Manage City',
      url: '/city',
      icon: 'fa fa-map-marker',
      children: [
        {
          name: 'Add',
          url: '/city/add',
          icon: 'fa fa-user-plus',
        },
        {
          name: 'List',
          url: '/city/list',
          icon: 'fa fa-list-alt',
        }
      ]
    },
    // {
    //   name: 'Manage Province',
    //   url: '/province',
    //   icon: 'fa fa-map-marker',
    //   children: [
    //     {
    //       name: 'Add',
    //       url: '/province/add',
    //       icon: 'fa fa-user-plus',
    //     },
    //     {
    //       name: 'List',
    //       url: '/province/list',
    //       icon: 'fa fa-list-alt',
    //     }
    //   ]
    // },
    {
      name: 'Email Template',
      url: '/email',
      icon: 'fa fa-envelope',
      children: [
        {
          name: 'Add',
          url: '/email/add',
          icon: 'fa fa-user-plus',
        },
        {
          name: 'List',
          url: '/email/list',
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