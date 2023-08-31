export const getMenuItems = (t) => [
  {
    child: [
      {
        name: "Dashboard",
        link: "/popote/",
        enabled: true,
        icon: 'dashboard',
      },
      {
        name: "User Management",
        link: "/popote/users",
        enabled: true,
        icon: 'group',
        child: [
          {
            name: "Existing Users",
            enabled: true,
            link: "/popote/users/",
            icon: 'people',
          },
          {
            name: "Approve New Users",
            enabled: true,
            link: "/popote/users/unapproved-users",
            icon: 'verified_user',
          },
          {
            name: "Approve Edited Users",
            enabled: true,
            link: "/popote/users/edited-users",
            icon: 'account_circle',
          },
          {
            name: "Approve Password Resets",
            enabled: true,
            link: "/popote/users/password-resets",
            icon: 'account_circle',
          },
        ],
      },
      {
        name: "Customer Management",
        enabled: true,
        link: "/popote/customers/",
        icon: 'groups',
        child: [
          {
            name: "Existing Customers",
            enabled: true,
            link: "/popote/customers/",
            icon: 'groups',
          },
          {
            name: "Add Customer",
            enabled: true,
            link: "/popote/customers/add-new-customer",
            icon: 'add',
          },
          {
            name: "Approve Registrations",
            enabled: true,
            link: "/popote/customers/registrations",
            icon: 'verified_user',
          },
        ],
      },
      {
        name: "Parameters Management",
        link: "/popote/parameters/",
        enabled: true,
        icon: 'settings',
        child: [
          {
            name: "Transaction Limits",
            enabled: true,
            link: "/popote/parameters/transactions",
            icon: 'smartphone',
          },
          {
            name: "System Parameters",
            enabled: true,
            link: "/popote/parameters/system",
            icon: 'verified_user',
          },
        ],
      },
    ],
  },
];
