export const getMenuItems = (t) => [
  {
    //name: 'Dashboard',
    child: [
      {
        name: "Dashboard",
        link: "/popote/",
        enabled: true,
        icon: 'home',
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
        name: "Transaction Reports",
        enabled: true,
        link: "/popote/reports/",
        icon: 'groups',
        child: [
          {
            name: "All Transactions",
            enabled: true,
            link: "/popote/reports/transactions",
            icon: 'groups',
          },
          {
            name: "B2C",
            enabled: true,
            link: "/popote/reports/transactions/b2c",
            icon: 'add',
          },
          {
            name: "Pesa Link",
            enabled: true,
            link: "/popote/reports/transactions/pesa-link",
            icon: 'add',
          },
          {
            name: "Airtime Purchase",
            enabled: true,
            link: "/popote/reports/transactions/airtime-purchase",
            icon: 'add',
          },
          {
            name: "Bill Payments",
            enabled: true,
            link: "/popote/reports/transactions/bill-payments",
            icon: 'add',
          },
        ],
      },
      {
        name: "System Reports",
        enabled: true,
        link: "/popote/reports/system-reports",
        icon: 'add',
        child:[
          {
            name: "Registered Customers",
            enabled: true,
            link: "/popote/reports/system-reports",
            icon: 'add',
          },
          {
            name: "Active Customers",
            enabled: true,
            link: "/popote/reports/system-reports/active-customers",
            icon: 'add',
          },
          {
            name: "Inactive Customers",
            enabled: true,
            link: "/popote/reports/system-reports/inactive-customers",
            icon: 'add',
          },
          {
            name: "Failed Registrations",
            enabled: true,
            link: "/popote/reports/system-reports/failed-registration",
            icon: 'add',
          },
          {
            name: "Dormant Customers",
            enabled: true,
            link: "/popote/reports/system-reports/dormant-customers",
            icon: 'add',
          },
          {
            name: "System Users",
            enabled: true,
            link: "/popote/reports/system-reports/system-users",
            icon: 'add',
          },
          {
            name: "Audit Trail",
            enabled: true,
            link: "/popote/reports/system-reports/audit-trail",
            icon: 'add',
          },
          {
            name: "OTP Sms",
            enabled: true,
            link: "/popote/reports/system-reports/otp-sms",
            icon: 'add',
          },
        ]
      },
      {
        name: "Parameters Mgt",
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
