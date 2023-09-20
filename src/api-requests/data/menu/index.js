export const getMenuItems = (t) => [
  {
    name: 'General',
    child: [
      {
        name: "Dashboard",
        link: "/popote/",
        enabled: true,
        icon: 'home',
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
          {
            name: "Approve Edited Customers",
            enabled: true,
            link: "/popote/customers/edited-customers",
            icon: 'edit',
          },
        ],
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
            icon: 'verified_user',
          },
          {
            name: "Approve Password Resets",
            enabled: true,
            link: "/popote/users/password-resets",
            icon: 'verified_user',
          },
        ],
      },
    ],
  },
  {
    name: 'Reports',
    child:[
      {
        name: "Transaction Reports",
        enabled: true,
        link: "/popote/reports/",
        icon: 'book',
        child: [
          {
            name: "All Transactions",
            enabled: true,
            link: "/popote/reports/transactions",
            icon: 'receipt_long',
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
            icon: 'link',
          },
          {
            name: "Airtime Purchase",
            enabled: true,
            link: "/popote/reports/transactions/airtime-purchase",
            icon: 'shop_two',
          },
          {
            name: "Bill Payments",
            enabled: true,
            link: "/popote/reports/transactions/bill-payments",
            icon: 'payments',
          },
        ],
      },
      {
        name: "System Reports",
        enabled: true,
        link: "/popote/reports/system-reports",
        icon: 'book',
        child:[
          {
            name: "Registered Customers",
            enabled: true,
            link: "/popote/rports/system-reports",
            icon: 'how_to_reg',
          },
          {
            name: "Active Customers",
            enabled: true,
            link: "/popote/reports/system-reports/active-customers",
            icon: 'people',
          },
          {
            name: "Inactive Customers",
            enabled: true,
            link: "/popote/reports/system-reports/inactive-customers",
            icon: 'block',
          },
          {
            name: "Failed Registrations",
            enabled: true,
            link: "/popote/reports/system-reports/failed-registration",
            icon: 'feedback',
          },
          {
            name: "Dormant Customers",
            enabled: true,
            link: "/popote/reports/system-reports/dormant-customers",
            icon: 'do_not_disturb_on',
          },
          {
            name: "System Users",
            enabled: true,
            link: "/popote/reports/system-reports/system-users",
            icon: 'people',
          },
          {
            name: "Audit Trail",
            enabled: true,
            link: "/popote/reports/system-reports/audit-trail",
            icon: 'receipt_long',
          },
          {
            name: "OTP Sms",
            enabled: true,
            link: "/popote/reports/system-reports/otp-sms",
            icon: 'sms',
          },
        ]
      },
    ]
  },
  {
    name: 'Parameters Management',
    child: [
      {
        name: "Transaction Limits",
        link: "/popote/parameters/",
        enabled: true,
        icon: 'smartphone',
        child: [
          {
            name: "Global Limits",
            enabled: true,
            link: "/popote/parameters/global-limits",
            icon: 'smartphone',
          },
          {
            name: "Personalized Limits",
            enabled: true,
            link: "/popote/parameters/personalized-limits",
            icon: 'verified_user',
          },
        ],
      },
    ],
  }
];
