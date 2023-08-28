import { FoodBank, Home, People, Settings } from "@mui/icons-material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { Diagram } from "devextreme-react";
import { USER_ROLES } from "../../../utils/constants";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

export const getMenuItems = (t) => [
  {
    child: [
      {
        name: "Dashboard",
        link: "/dashboard",
        enabled: true,
        icon: 'dashboard',
      },
      {
        name: "Users",
        link: "/dashboard/users",
        enabled: true,
        icon: 'group',
        child: [
          {
            name: "All Users",
            enabled: true,
            link: "/dashboard/users/all-users",
            icon: 'people',
          },
          {
            name: "Approve Users",
            enabled: true,
            link: "/dashboard/users/approve-users",
            icon: 'verified_user',
          },
          {
            name: "Profiles",
            enabled: true,
            link: "/dashboard/users/profiles",
            icon: 'account_circle',
          },
        ],
      },
      {
        name: "API Users",
        enabled: true,
        link: "/dashboard/api-users",
        icon: 'group',
        child: [
          {
            name: "API User",
            enabled: true,
            link: "/dashboard/api-users/api-user",
            icon: 'home',
          },
          {
            name: "All API Users",
            enabled: true,
            link: "/dashboard/api-users/all-api-users",
            icon: 'home',
          },
        ],
      },
      {
        name: "Transactions",
        enabled: true,
        link: "/dashboard/transactions",
        icon: 'receipt_long',
        child: [
          {
            name: "Pesa Link Transactions",
            enabled: true,
            link: "/dashboard/transactions/pesa-link-transactions",
            icon: 'receipt_long',
          },
          {
            name: "All Transactions",
            enabled: true,
            link: "/dashboard/transactions/all-transactions",
            icon: 'receipt_long',
          },
          {
            name: "Mpesa",
            enabled: true,
            link: "/dashboard/transactions/mpesa-transactions",
            icon: 'receipt_long',
          },
          {
            name: "ESB Report",
            enabled: true,
            link: "/dashboard/transactions/esb-report",
            icon: 'receipt_long',
          },
          {
            name: "Requests",
            enabled: true,
            link: "/dashboard/transactions/request",
            icon: 'request_page',
          },
        ],
      },
      {
        name: "Customers",
        enabled: true,
        link: "/dashboard/customers",
        icon: 'groups',
        child: [
          {
            name: "Add Customers",
            enabled: true,
            link: "/dashboard/customers/add-customers",
            icon: 'add',
          },
          {
            name: "All Customers",
            enabled: true,
            link: "/dashboard/customers/all-customers",
            icon: 'groups',
          },
          {
            name: "Approve Customers",
            enabled: true,
            link: "/dashboard/customers/approve-customers",
            icon: 'verified_user',
          },
          {
            name: "Bulk Upload",
            enabled: true,
            link: "/dashboard/customers/bulk-upload",
            icon: 'upload',
          },
          {
            name: "Batch Approve",
            enabled: true,
            link: "/dashboard/customers/batch-approve",
            icon: 'verified_user',
          },
          {
            name: "Batch Reports",
            enabled: true,
            link: "/dashboard/customers/batch-reports",
            icon: 'mark_email_unread',
          },
        ],
      },
      {
        name: "Settings",
        link: "/dashboard/settings",
        enabled: true,
        icon: 'settings',
        child: [
          {
            name: "Mobile Trn Code",
            enabled: true,
            link: "/dashboard/settings/mobile-trn",
            icon: 'smartphone',
          },
          {
            name: "Channel Users",
            enabled: true,
            link: "/dashboard/settings/channel-users",
            icon: 'verified_user',
          },
        ],
      },
    ],
  },
];
