export const getMenuItems = () => [
  {
    name: 'General',
    child: [
      {
        name: "Dashboard",
        link: "/dashboard/",
        enabled: true,
        icon: 'home',
      },

      {
        name: "Customer Management",
        enabled: true,
        link: "/dashboard/customers/",
        icon: 'groups',
        child: [
          {
            name: "Customer Details",
            enabled: true,
            link: "/dashboard/customers/customer-details",
            icon: 'add',
          },
          {
            name: "Existing Customers",
            enabled: true,
            link: "/dashboard/customers/all",
            icon: 'groups',
          },
          {
            name: "Approve New Customers",
            enabled: true,
            link: "/dashboard/customers/new-customers",
            icon: 'verified_user',
          },
          {
            name: "Approve Updated Customers",
            enabled: true,
            link: "/dashboard/customers/edited-customers",
            icon: 'edit',
          },
          {
            name: "Approve Customer Accounts",
            enabled: true,
            link: "/dashboard/customers/accounts-approval",
            icon: 'edit',
          },
        ],
      },
      {
        name: "User Management",
        link: "/dashboard/users",
        enabled: true,
        icon: 'group',
        child: [
          {
            name: "Existing Users",
            enabled: true,
            link: "/dashboard/users/",
            icon: 'people',
          },
          {
            name: "New Users List",
            enabled: true,
            link: "/dashboard/users/unapproved-users",
            icon: 'verified_user',
          },
          {
            name: "Updated Users List",
            enabled: true,
            link: "/dashboard/users/edited-users",
            icon: 'verified_user',
          },
          {
            name: "Password Resets",
            enabled: true,
            link: "/dashboard/users/password-resets",
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
        link: "/dashboard/reports/",
        icon: 'book',
        child: [
          {
            name: "All Transactions",
            enabled: true,
            link: "/dashboard/reports/transactions",
            icon: 'receipt_long',
          },
          {
            name: "B2C",
            enabled: true,
            link: "/dashboard/reports/transactions/b2c",
            icon: 'add',
          },
          {
            name: "Pesa Link",
            enabled: true,
            link: "/dashboard/reports/transactions/pesa-link",
            icon: 'link',
          },
          {
            name: "Airtime Purchase",
            enabled: true,
            link: "/dashboard/reports/transactions/airtime-purchase",
            icon: 'shop_two',
          },
          {
            name: "Bill Payments",
            enabled: true,
            link: "/dashboard/reports/transactions/bill-payments",
            icon: 'payments',
          },
        ],
      },
      {
        name: "System Reports",
        enabled: true,
        link: "/dashboard/reports/system-reports",
        icon: 'book',
        child:[
          {
            name: "Registered Customers",
            enabled: true,
            link: "/dashboard/rports/system-reports",
            icon: 'how_to_reg',
          },
          {
            name: "Active Customers",
            enabled: true,
            link: "/dashboard/reports/system-reports/active-customers",
            icon: 'people',
          },
          {
            name: "Inactive Customers",
            enabled: true,
            link: "/dashboard/reports/system-reports/inactive-customers",
            icon: 'block',
          },
          {
            name: "Failed NewCustomers",
            enabled: true,
            link: "/dashboard/reports/system-reports/failed-registration",
            icon: 'feedback',
          },
          {
            name: "Dormant Customers",
            enabled: true,
            link: "/dashboard/reports/system-reports/dormant-customers",
            icon: 'do_not_disturb_on',
          },
          {
            name: "System Users",
            enabled: true,
            link: "/dashboard/reports/system-reports/system-users",
            icon: 'people',
          },
          {
            name: "Audit Trail",
            enabled: true,
            link: "/dashboard/reports/system-reports/audit-trail",
            icon: 'receipt_long',
          },
          {
            name: "OTP Sms",
            enabled: true,
            link: "/dashboard/reports/system-reports/otp-sms",
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
        link: "/dashboard/parameters/",
        enabled: true,
        icon: 'smartphone',
        child: [
          {
            name: "Global Limits",
            enabled: true,
            link: "/dashboard/parameters/global-limits",
            icon: 'smartphone',
          },
          {
            name: "Personalized Limits",
            enabled: true,
            link: "/dashboard/parameters/personalized-limits",
            icon: 'verified_user',
          },
        ],
      },
    ],
  }
];
