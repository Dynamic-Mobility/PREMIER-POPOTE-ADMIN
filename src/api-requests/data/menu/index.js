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
        pageName: "Dashboard",
        route: "/dashboard",
        enabled: true,
        icon: 'dashboard',
      },
      {
        pageName: "Users",
        route: "/dashboard/users",
        enabled: true,
        icon: 'group',
        child: [
          {
            pageName: "All Users",
            enabled: true,
            route: "/dashboard/users/all-users",
            icon: 'people',
          },
          {
            pageName: "Approve Users",
            enabled: true,
            route: "/dashboard/users/approve-users",
            icon: 'verified_user',
          },
          {
            pageName: "Profiles",
            enabled: true,
            route: "/dashboard/users/profiles",
            icon: 'account_circle',
          },
        ],
      },
      {
        pageName: "API Users",
        enabled: true,
        route: "/dashboard/api-users",
        icon: 'group',
        child: [
          {
            pageName: "API User",
            enabled: true,
            route: "/dashboard/api-users/api-user",
            icon: 'home',
          },
          {
            pageName: "All API Users",
            enabled: true,
            route: "/dashboard/api-users/all-api-users",
            icon: 'home',
          },
        ],
      },
      {
        pageName: "Transactions",
        enabled: true,
        route: "/dashboard/transactions",
        icon: 'receipt_long',
        child: [
          {
            pageName: "Pesa Link Transactions",
            enabled: true,
            route: "/dashboard/transactions/pesa-link-transactions",
            icon: 'receipt_long',
          },
          {
            pageName: "All Transactions",
            enabled: true,
            route: "/dashboard/transactions/all-transactions",
            icon: 'receipt_long',
          },
          {
            pageName: "Mpesa",
            enabled: true,
            route: "/dashboard/transactions/mpesa-transactions",
            icon: 'receipt_long',
          },
          {
            pageName: "ESB Report",
            enabled: true,
            route: "/dashboard/transactions/esb-report",
            icon: 'receipt_long',
          },
          {
            pageName: "Requests",
            enabled: true,
            route: "/dashboard/transactions/request",
            icon: 'request_page',
          },
        ],
      },
      {
        pageName: "Customers",
        enabled: true,
        route: "/dashboard/customers",
        icon: 'groups',
        child: [
          {
            pageName: "Add Customers",
            enabled: true,
            route: "/dashboard/customers/add-customers",
            icon: 'add',
          },
          {
            pageName: "All Customers",
            enabled: true,
            route: "/dashboard/customers/all-customers",
            icon: 'groups',
          },
          {
            pageName: "Approve Customers",
            enabled: true,
            route: "/dashboard/customers/approve-customers",
            icon: 'verified_user',
          },
          {
            pageName: "Bulk Upload",
            enabled: true,
            route: "/dashboard/customers/bulk-upload",
            icon: 'upload',
          },
          {
            pageName: "Batch Approve",
            enabled: true,
            route: "/dashboard/customers/batch-approve",
            icon: 'verified_user',
          },
          {
            pageName: "Batch Reports",
            enabled: true,
            route: "/dashboard/customers/batch-reports",
            icon: 'mark_email_unread',
          },
        ],
      },
      {
        pageName: "Settings",
        route: "/dashboard/settings",
        enabled: true,
        icon: 'settings',
        child: [
          {
            pageName: "Mobile Trn Code",
            enabled: true,
            route: "/dashboard/settings/mobile-trn",
            icon: 'smartphone',
          },
          {
            pageName: "Channel Users",
            enabled: true,
            route: "/dashboard/settings/channel-users",
            icon: 'verified_user',
          },
        ],
      },
    ],
  },
];
