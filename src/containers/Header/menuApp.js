export const adminMenu = [
  {
    //* Quản lý người dùng
    name: 'menu.admin.manage-user',
    menus: [
      {
        name: 'menu.admin.crud',
        link: '/system/user-manage',
        // subMenus: [
        //   {
        //     name: 'menu.system.system-administrator.user-manage',
        //     link: '/system/user-manage',
        //   },
        //   {
        //     name: 'menu.system.system-administrator.user-redux',
        //     link: '/system/user-redux',
        //   },
        // ],
      },
      {
        name: 'menu.admin.crud-redux',
        link: '/system/user-redux',
      },
      {
        name: 'menu.admin.manage-doctor',
        link: '/system/manage-doctor',
      },
      {
        name: 'menu.admin.manage-admin',
        link: '/system/user-admin',
      },
      {
        name: 'menu.doctor.schedule',
        link: '/doctor/user-schedule',
      },
    ],
  },

  {
    //* Quản lý phòng khám
    name: 'menu.admin.clinic',
    menus: [
      {
        name: 'menu.admin.manage-clinic',
        link: '/system/user-clinic',
      },
    ],
  },
  {
    //* Quản lý chuyên khoa
    name: 'menu.admin.specialty',
    menus: [
      {
        name: 'menu.admin.manage-specialty',
        link: '/system/user-specialty',
      },
    ],
  },
  {
    //* Quản lý cẩm nang
    name: 'menu.admin.handbook',
    menus: [
      {
        name: 'menu.admin.manage-handbook',
        link: '/system/user-handbook',
      },
    ],
  },
];
export const doctorMenu = [
  {
    //* Quản lý kế hoạch khám bệnh bác sĩ
    name: 'menu.doctor.manage-schedule',
    menus: [
      {
        name: 'menu.doctor.schedule',
        link: '/doctor/user-schedule',
      },
    ],
  },
];
