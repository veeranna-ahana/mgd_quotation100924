import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as FaIcon from "react-icons/fa";
import * as MdIcon from "react-icons/md";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { BiFoodMenu } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { BsPersonFill, BsFillGearFill, BsScrewdriver } from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";
import { DiOpenshift } from "react-icons/di";
import { MdReport } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { BsListCheck } from "react-icons/bs";
import { BiGitMerge } from "react-icons/bi";
import { SiGoogletagmanager, SiRedhatopenshift } from "react-icons/si";
import { BsServer } from "react-icons/bs";
import { FiCpu } from "react-icons/fi";
import { VscServerProcess } from "react-icons/vsc";
import { FiGitPullRequest } from "react-icons/fi";
import { AiOutlineOrderedList } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaDropbox } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { AiOutlineSchedule } from "react-icons/ai";
import { GiLaserPrecision } from "react-icons/gi";
import { HiCubeTransparent } from "react-icons/hi";
import { AiFillSchedule } from "react-icons/ai";


// export const customerSidebar = [
//   {
//     title: "Orders",
//     // path: "/customer/orders",
//     icon: <BsIcon.BsListTask />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
//       {
//         title: "Created",
//         // path: "/customer/orders?ordstat=Created",
//         path: "/Customer/Orders/OrdersCreated?ordstat=Created",
//         icon: <AiIcons.AiOutlineArrowRight />,
//       },
//       {
//         title: "Recorded",
//         path: "/Customer/Orders/OrdersRecorded?ordstat=Recorded",
//         icon: <AiIcons.AiOutlineArrowRight />,
//       },
//       {
//         title: "Processing",
//         path: "/Customer/Orders/OrdersProcessing?ordstat=Processing",
//         icon: <AiIcons.AiOutlineArrowRight />,
//       },
//       {
//         title: "Produced",
//         path: "/Customer/Orders/OrdersProduced?ordstat=Produced",
//         icon: <AiIcons.AiOutlineArrowRight />,
//       },
//       {
//         title: "Ready",
//         path: "/Customer/Orders/OrdersReady?ordstat=Ready",
//         icon: <AiIcons.AiOutlineArrowRight />,
//       },
//       {
//         title: "Dispatched",
//         path: "/Customer/Orders/OrdersDispatched?ordstat=Dispatched",
//         icon: <AiIcons.AiOutlineArrowRight />,
//       },
//       {
//         title: "All",
//         path: "/Customer/Orders/OrdersAll?ordstat=All",
//         icon: <AiIcons.AiOutlineArrowRight />,
//       },
//     ],
//   },

//   {
//     title: "Commercial",
//     // path: "/customer/outstandings",
//     icon: <MdIcon.MdOutlineSummarize />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
//       {
//         title: "Inv. & Payments",
//         path: "/Customer/CustomerInvoiceAndPayments",
//         icon: <IoIcons.IoIosPaper />,
//       },
//       {
//         title: "O/S Summary",
//         path: "/Customer/Outstandings",
//         icon: <IoIcons.IoIosPaper />,
//       },
//     ],
//   },
//   {
//     title: "Material",
//     path: "Customer/Material",
//     icon: <SiIcon.SiMaterialdesignicons />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//   },
//   {
//     title: "Customers",
//     // path: "/customer",
//     icon: <BsIcon.BsFillPeopleFill />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,

//     subNav: [
//       {
//         title: "Customer Info",
//         path: "/Customer/ExistedCustomerInfo",
//         icon: <AiIcons.AiOutlineArrowRight />,
//       },
//       {
//         title: "Customer New",
//         path: "/Customer/CustomerNew",
//         icon: <AiIcons.AiOutlineArrowRight />,
//       },
//     ],
//   },
//   {
//     title: "Part List",
//     path: "/Customer/PartList",
//     icon: <AiIcons.AiOutlinePartition />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//   },
//   {
//     title: "Drawing List",
//     path: "/Customer/DrawingList",
//     icon: <MdIcon.MdDraw />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//   },

//   // {
//   //   title: "Packing Invoice",
//   //   // path: "/customer",
//   //   icon: <MdIcon.MdOutlineSummarize />,
//   //   iconClosed: <RiIcons.RiArrowDownSFill />,
//   //   iconOpened: <RiIcons.RiArrowUpSFill />,

//   //   subNav: [
//   //     {
//   //       title: "Inspection",
//   //       // path: "/materialmanagement/receipt/customerjobwork",
//   //       icon: <AiIcons.AiFillCustomerService />,
//   //       subNav: [
//   //         {
//   //           title: "Profile",
//   //           icon: <AiIcons.AiOutlinePartition />,
//   //           subNav: [
//   //             {
//   //               title: "ScheduleList",
//   //               path: "/PackingAndInvoices/Profile/ScheduleList",
//   //               icon: <AiIcons.AiOutlineArrowRight />,
//   //             },
//   //             {
//   //               title: "FindSchedule",
//   //               path: "/PackingAndInvoices/Profile/FindSchedule",
//   //               icon: <AiIcons.AiOutlineArrowRight />,
//   //             },
//   //           ],
//   //         },
//   //         {
//   //           title: "Fabrication",
//   //           icon: <AiIcons.AiOutlineDeploymentUnit />,
//   //           subNav: [
//   //             {
//   //               title: "ScheduleList",
//   //               path: "/PackingAndInvoices/fabrication/ScheduleList",

//   //               icon: <AiIcons.AiOutlineArrowRight />,
//   //             },
//   //             {
//   //               title: "FindSchedule",
//   //               path: "/PackingAndInvoices/fabrication/FindSchedule",

//   //               icon: <AiIcons.AiOutlineArrowRight />,
//   //             },
//   //           ],
//   //         },
//   //         {
//   //           title: "Services",
//   //           icon: <MdIcon.MdOutlineOtherHouses />,

//   //           subNav: [
//   //             {
//   //               title: "ScheduleList",
//   //               path: "/PackingAndInvoices/service/ScheduleList",

//   //               icon: <AiIcons.AiOutlineArrowRight />,
//   //             },
//   //             {
//   //               title: "FindSchedule",
//   //               path: "/PackingAndInvoices/service/FindSchedule",

//   //               icon: <AiIcons.AiOutlineArrowRight />,
//   //             },
//   //           ],
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       title: "Packing Note",
//   //       icon: <AiIcons.AiOutlineInfoCircle />,
//   //       // icon: <BiIcons.BiPurchaseTag />,
//   //     },
//   //     {
//   //       title: "Invoice",
//   //       // path: "/materialmanagement/receipt/branchtransfer",
//   //       icon: <AiIcons.AiOutlineBranches />,
//   //     },
//   //     {
//   //       title: "SetUp",
//   //       // path: "/materialmanagement/receipt/branchtransfer",
//   //       icon: <AiIcons.AiOutlineBranches />,
//   //     },
//   //     {
//   //       title: "ReturnableDC",
//   //       // path: "/materialmanagement/receipt/branchtransfer",
//   //       icon: <AiIcons.AiOutlineBranches />,
//   //     },
//   //   ],
//   // },
//   {
//     title: "Previous Menu",
//     path: "/salesHome",
//     icon: <MdIcon.MdPreview />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//   },
// ];

// export const orderSidebar = [
//   {
//     title: "Profile",
//     // path: "/customer/orders",
//     icon: <BsIcon.BsListTask />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
//       {
//         title: "New Order",
//         // path: "/customer/orders?ordstat=Created",
//         path: "/Order/NewOrder?ordformat=Profile",
//         icon: <IoIcons.IoIosPaper />,
//       },
//       {
//         title: "Find Order",
//         path: "/Order/Orders/FindOrder/GetOrderForm?ordformat=Profile",
//         icon: <IoIcons.IoIosPaper />,
//       },
//       {
//         title: "Find Schedule",
//         path: "/Order/Orders/FindSchedule/GetScheduleForm?ordformat=Profile",
//         icon: <IoIcons.IoIosPaper />,
//       },
//       {
//         title: "Order List",
//         icon: <BsIcon.BsListTask />,
//         iconClosed: <RiIcons.RiArrowDownSFill />,
//         iconOpened: <RiIcons.RiArrowUpSFill />,
//         subNav: [
//           {
//             title: "Created",
//             path: "/Order/Orders/OrderList/GetOrderList?ordstatus=Created",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Recorded",
//             path: "/Order/Orders/OrderList/GetOrderList?ordstatus=Recorded",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Processing",
//             path: "/Order/Orders/OrderList/GetOrderList?ordstatus=Processing",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Completed",
//             path: "/Order/Orders/OrderList/GetOrderList?ordstatus=Completed",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Produced",
//             path: "/Order/Orders/OrderList/GetOrderList?ordstatus=Produced",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Packed",
//             path: "/Order/Orders/OrderList/GetOrderList?ordstatus=Packed",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Dispatched",
//             path: "/Order/Orders/OrderList/GetOrderList?ordstatus=Dispatched",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "All",
//             path: "/Order/Orders/OrderList/GetOrderList?ordstatus=All",
//             icon: <IoIcons.IoIosPaper />,
//           },
//         ],
//       },
//       {
//         title: "Fixtures OrderList",
//         icon: <BsIcon.BsListTask />,
//         iconClosed: <RiIcons.RiArrowDownSFill />,
//         iconOpened: <RiIcons.RiArrowUpSFill />,
//         subNav: [
//           {
//             title: "Recorded",
//             path: "/Order/Orders/FixturesOrderList/GetFixturesOrderList?ordstatus=Recorded",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Processing",
//             path: "/Order/Orders/FixturesOrderList/GetFixturesOrderList?ordstatus=Processing",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Completed",
//             path: "/Order/Orders/FixturesOrderList/GetFixturesOrderList?ordstatus=Completed",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Ready",
//             path: "/Order/Orders/FixturesOrderList/GetFixturesOrderList?ordstatus=Ready",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Handed Over",
//             path: "/Order/Orders/FixturesOrderList/GetFixturesOrderList?ordstatus=HandedOver",
//             icon: <IoIcons.IoIosPaper />,
//           },
//         ],
//       },
//       {
//         title: "Internal OrderList",
//         icon: <BsIcon.BsListTask />,
//         iconClosed: <RiIcons.RiArrowDownSFill />,
//         iconOpened: <RiIcons.RiArrowUpSFill />,
//         subNav: [
//           {
//             title: "Recorded",
//             path: "/Order/Orders/InternalOrderList/GetInternalOrderList?ordstatus=Recorded",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Processing",
//             path: "/Order/Orders/InternalOrderList/GetInternalOrderList?ordstatus=Processing",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Completed",
//             path: "/Order/Orders/InternalOrderList/GetInternalOrderList?ordstatus=Completed",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Ready",
//             path: "/Order/Orders/InternalOrderList/GetInternalOrderList?ordstatus=Ready",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Handed Over",
//             path: "/Order/Orders/InternalOrderList/GetInternalOrderList?ordstatus=HandedOver",
//             icon: <IoIcons.IoIosPaper />,
//           },
//         ],
//       },
//       {
//         title: "Combined Schedules",
//         icon: <BsIcon.BsListTask />,
//         iconClosed: <RiIcons.RiArrowDownSFill />,
//         iconOpened: <RiIcons.RiArrowUpSFill />,
//         subNav: [
//           {
//             title: "JobWork",
//             icon: <BsIcon.BsListTask />,
//             iconClosed: <RiIcons.RiArrowDownSFill />,
//             iconOpened: <RiIcons.RiArrowUpSFill />,
//             subNav: [
//               {
//                 title: "Create",
//                 path: "/Order/Orders/CombinedSchedules/JobWork/CreateJobWorkSchedule",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Open",
//                 path: "/Order/Orders/CombinedSchedules/JobWork/GetJobWorkScheduleList?ordstatus=Open",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Schedule List",
//                 icon: <BsIcon.BsListTask />,
//                 iconClosed: <RiIcons.RiArrowDownSFill />,
//                 iconOpened: <RiIcons.RiArrowUpSFill />,
//                 subNav: [
//                   {
//                     title: "Order",
//                     path: "/Order/Orders/CombinedSchedules/JobWork/GetJobWorkScheduleList?ordstatus=Order",
//                     icon: <IoIcons.IoIosPaper />,
//                   },
//                   {
//                     title: "Closed",
//                     path: "/Order/Orders/CombinedSchedules/JobWork/GetJobWorkScheduleList?ordstatus=Closed",
//                     icon: <IoIcons.IoIosPaper />,
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             title: "Sales",
//             icon: <BsIcon.BsListTask />,
//             iconClosed: <RiIcons.RiArrowDownSFill />,
//             iconOpened: <RiIcons.RiArrowUpSFill />,
//             subNav: [
//               {
//                 title: "Create",
//                 path: "/Order/Orders/CombinedSchedules/Sales/CreateSalesSchedule",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Open",
//                 path: "/Order/Orders/CombinedSchedules/Sales/GetSalesScheduleList?ordstatus=Open",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Schedule List",
//                 icon: <BsIcon.BsListTask />,
//                 iconClosed: <RiIcons.RiArrowDownSFill />,
//                 iconOpened: <RiIcons.RiArrowUpSFill />,
//                 subNav: [
//                   {
//                     title: "Order",
//                     path: "/Order/Orders/CombinedSchedules/Sales/GetSalesScheduleList?ordstatus=Order",
//                     icon: <IoIcons.IoIosPaper />,
//                   },
//                   {
//                     title: "Closed",
//                     path: "/Order/Orders/CombinedSchedules/Sales/GetSalesScheduleList?ordstatus=Closed",
//                     icon: <IoIcons.IoIosPaper />,
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: "Service",
//         icon: <BsIcon.BsListTask />,
//         iconClosed: <RiIcons.RiArrowDownSFill />,
//         iconOpened: <RiIcons.RiArrowUpSFill />,
//         subNav: [
//           {
//             title: "New Order",
//             path: "/Order/Orders/ServiceOrderList/GetServiceOrderList?ordstatus=Created",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Find Order",
//             path: "/Order/Orders/ServiceOrderList/GetServiceOrderList?ordstatus=Created",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Order List",
//             icon: <BsIcon.BsListTask />,
//             iconClosed: <RiIcons.RiArrowDownSFill />,
//             iconOpened: <RiIcons.RiArrowUpSFill />,
//             subNav: [
//               {
//                 title: "Created",
//                 path: "/Order/Orders/ServiceOrderList/GetServiceOrderList?ordstatus=Created",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Recorded",
//                 path: "/Order/Orders/ServiceOrderList/GetServiceOrderList?ordstatus=Recorded",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Processing",
//                 path: "/Order/Orders/ServiceOrderList/GetServiceOrderList?ordstatus=Processing",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Completed",
//                 path: "/Order/Orders/ServiceOrderList/GetServiceOrderList?ordstatus=Completed",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Produced",
//                 path: "/Order/Orders/ServiceOrderList/GetServiceOrderList?ordstatus=Produced",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Packed",
//                 path: "/Order/Orders/ServiceOrderList/GetServiceOrderList?ordstatus=Packed",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Dispatched",
//                 path: "/Order/Orders/ServiceOrderList/GetServiceOrderList?ordstatus=Dispatched",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "All",
//                 path: "/Order/Orders/ServiceOrderList/GetServiceOrderList?ordstatus=All",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: "Fabrication",
//         icon: <BsIcon.BsListTask />,
//         iconClosed: <RiIcons.RiArrowDownSFill />,
//         iconOpened: <RiIcons.RiArrowUpSFill />,
//         subNav: [
//           {
//             title: "New Order",
//             path: "/Order/Orders/FabricationOrderList/GetFabricationOrderList?ordstatus=Created",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Find Order",
//             path: "/Order/Orders/FabricationOrderList/GetFabricationOrderList?ordstatus=Created",
//             icon: <IoIcons.IoIosPaper />,
//           },
//           {
//             title: "Order List",
//             icon: <BsIcon.BsListTask />,
//             iconClosed: <RiIcons.RiArrowDownSFill />,
//             iconOpened: <RiIcons.RiArrowUpSFill />,
//             subNav: [
//               {
//                 title: "Created",
//                 path: "/Order/Orders/FabricationOrderList/GetFabricationOrderList?ordstatus=Created",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Recorded",
//                 path: "/Order/Orders/FabricationOrderList/GetFabricationOrderList?ordstatus=Recorded",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Processing",
//                 path: "/Order/Orders/FabricationOrderList/GetFabricationOrderList?ordstatus=Processing",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Completed",
//                 path: "/Order/Orders/FabricationOrderList/GetFabricationOrderList?ordstatus=Completed",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Produced",
//                 path: "/Order/Orders/FabricationOrderList/GetFabricationOrderList?ordstatus=Produced",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Packed",
//                 path: "/Order/Orders/FabricationOrderList/GetFabricationOrderList?ordstatus=Packed",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Dispatched",
//                 path: "/Order/Orders/FabricationOrderList/GetFabricationOrderList?ordstatus=Dispatched",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "All",
//                 path: "/Order/Orders/FabricationOrderList/GetFabricationOrderList?ordstatus=All",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//             ],
//           },

//         ]
//       },
//     ],
//   },
//   {
//     title: "Previous Menu",
//     path: "/salesHome",
//     icon: <MdIcon.MdPreview />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//   }
// ];


export const quotationSidebar = [
  {
    title: "Quotation",
    icon: <SiRedhatopenshift/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "New Quote",
        // path: "/customer/orders?ordstat=Created",
        path: "/Quotation/CreateNewQuotation?qtnformat=Profile",
        icon: <BsServer />,
      },
      {
        title: "Find Quote",
        // path: "/Quotation/Quotations/FindQuote/GetQuotationForm?qtnformat=Profile",
        path: "/Quotation/GetQuotationForm?qtnformat=Profile",
        icon: <VscServerProcess />,
      },
      {
        title: "Quote List",
        // path: "/Quotation/SearchQuote?qtnformat=Profile",
        icon: <FiCpu />,
        subNav: [
          {
            title: "To Send",
            path: "/Quotation/QuoteList?qtnliststat=To Send&qtnstatus=Created&qtnformat=Profile",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Sent",
            path: "/Quotation/QuoteList?qtnliststat=Sent&qtnstatus=Qtn Sent&qtnformat=Profile",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "No Order",
            path: "/Quotation/QuoteList?qtnliststat=No Order&qtnstatus=No Order&qtnformat=Profile",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Order",
            path: "/Quotation/QuoteList?qtnliststat=Order&qtnstatus=Order Received&qtnformat=Profile",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Closed",
            path: "/Quotation/QuoteList?qtnliststat=Closed&qtnstatus=Closed&qtnformat=Profile",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
        ],
      },
    ],
  },
  {
    title: "Service",
    // path: "/customer/orders",
    icon: <FiCpu />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "New Quote",
        path: "/Quotation/CreateNewQuotation?qtnformat=Service",
        icon: <BsServer />,
        // icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Find Quote",
        path: "/Quotation/GetQuotationForm?qtnformat=Service",
        icon: <VscServerProcess />,
        // icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Quote List",
        //  path: "/Customer/Orders/OrdersProcessing?ordstat=Processing",
        icon: <FiCpu />,
        subNav: [
          {
            title: "To Send",
            path: "/Quotation/QuoteList?qtnliststat=ToSend&qtnstatus=Created&qtnformat=Service",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Sent",
            path: "/Quotation/QuoteList?qtnliststat=Sent&qtnstatus=Qtn Sent&qtnformat=Service",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "No Order",
            path: "/Quotation/QuoteList?qtnliststat=No Order&qtnstatus=No Order&qtnformat=Service",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Order",
            path: "/Quotation/QuoteList?qtnliststat=Order&qtnstatus=Order Received&qtnformat=Service",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Closed",
            path: '/Quotation/Quotelist?qtnliststat=Closed&qtnstatus=Closed&qtnformat=Service',
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
        ],
      },
    ]
  },
  {
    title: "Fabrication",
    // path: "/customer/orders",
    icon: <FiCpu />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "New Quote",
        path: "/Quotation/CreateNewQuotation?qtnformat=Fabrication",
        icon: <BsServer />,
        // icon: <IoIcons.IoIosPaper />,
      },
      // {
      //   title: "Find Quote",
      //   path: "/Quotation/GetQuotationForm?qtnformat=Fabrication",
      //   icon: <IoIcons.IoIosPaper />,
      // },
      {
        title: "Quote List",
        //  path: "/Customer/Orders/OrdersProcessing?ordstat=Processing",
        icon: <FiCpu />,
        subNav: [
          {
            title: "To Send",
            path: "/Quotation/QuoteList?qtnstatus=Created&qtnformat=Fabrication",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Sent",
            path: "/Quotation/QuoteList?qtnstatus=Qtn Sent&qtnformat=Fabrication",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "No Order",
            path: "/Quotation/QuoteList?qtnstatus=No Order&qtnformat=Fabrication",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Order",
            path: "/Quotation/QuoteList?qtnstatus=Order Received&qtnformat=Fabrication",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Closed",
            path: "/Quotation/QuoteList?qtnstatus=Closed&qtnformat=Fabrication",
            // icon: <AiIcons.AiOutlineArrowRight />,
          },
        ],
      },
    ]
  },
  {
    title: "Previous Menu",
    path: "/salesHome",
    icon: <MdIcon.MdPreview />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  }
];


///////////////////////////////////////////////////////////////////////////
// export const sigmancSidebar = [

//   {
//     title: "SigmaNC",
//     icon: <DiOpenshift />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
//       {
//         title: "Program Manager",
//         icon: <DiOpenshift />,
//         iconClosed: <RiIcons.RiArrowDownSFill />,
//         iconOpened: <RiIcons.RiArrowUpSFill />,
//         // icon: <FiEdit />,
//         subNav: [


//           {
//             title: "To_Program",
//              path: "/sigmaNc/ToProgram?schstatus=To_Program",
//             //path: "/sigmaNc/ScheduleListForm?schstatus=To_Program",
//             // icon: <FiEdit />,
//           },
//           {
//             title: "Processing",
//             path: "/sigmaNc/Process?schstatus=Process",
//             // icon: <FiEdit />,
//           },
//           {
//             title: "Tasked",
//             path: "/sigmaNc/Task?schstatus=Tasked",
//             // icon: <FiEdit />,
//           },
//           {
//             title: "Under_Production",
//             path: "/sigmaNc/UnderProduction?schstatus=Production",
//             // icon: <FiEdit />,
//           },
//           {
//             title: "Closed",
//             path: "/sigmaNc/Close?schstatus=Closed",
//             // icon: <FiEdit />,
//           }
//         ]
//       },
//       {
//         title: "Previous Menu",
//         path: "/Home",
//         icon: <MdIcon.MdPreview />,
//         iconClosed: <RiIcons.RiArrowDownSFill />,
//         iconOpened: <RiIcons.RiArrowUpSFill />,
//       }
      

//     ]
//   }

// ];


///////////////////////////////////////////////////////////////////////////////////

// Accounts Menu

// export const accountsSidebar = [
//   {
//     title: "Accounts",
//     // path: "/customer/orders",
//     icon: <BsIcon.BsListTask />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
//       {
//         title: "Unit Accounts",
//         //  path: "/Customer/Orders/OrdersProcessing?ordstat=Processing",
//         icon: <AiIcons.AiOutlineArrowRight />,
//         subNav: [
//           {
//             title: "Setup",
//             // path: "",
//             icon: <AiIcons.AiOutlineArrowRight />,
//             subNav: [
//               {
//                 title: "Unit List",
//                 path: "/accounts/unitdetails",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//               {
//                 title: "Sync",
//                 //  path: "/accounts/UnitAccounts/Sync/",
//                 icon: <IoIcons.IoIosPaper />,
//               },
//             ]
//           },
//         ]
//       }
//     ],
//   },
//   {
//     title: "Unit Details",
//     // path: "/customer/orders",
//     icon: <BsIcon.BsListTask />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
//       {
//         title: "New Quote",
//         path: "/Quotation/CreateNewQuotation?qtnformat=Service",
//         icon: <IoIcons.IoIosPaper />,
//       },
//       {
//         title: "Find Quote",
//         path: "/Quotation/SearchQuote?qtnformat=Service",
//         icon: <IoIcons.IoIosPaper />,
//       },
//       {
//         title: "Quote List",
//         //  path: "/Customer/Orders/OrdersProcessing?ordstat=Processing",
//         icon: <AiIcons.AiOutlineArrowRight />,
//         subNav: [
//           {
//             title: "To Send",
//             path: "",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Sent",
//             path: "",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "No Order",
//             path: "",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Order",
//             path: "",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Closed",
//             path: "",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//         ],
//       },
//     ]
//   },
//   {
//     title: "Fabrication",
//     // path: "/customer/orders",
//     icon: <BsIcon.BsListTask />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
//       {
//         title: "New Quote",
//         path: "/Quotation/CreateNewQuotation?qtnformat=Fabrication",
//         icon: <IoIcons.IoIosPaper />,
//       },
//       {
//         title: "Find Quote",
//         path: "/Quotation/SearchQuote",
//         icon: <IoIcons.IoIosPaper />,
//       },
//       {
//         title: "Quote List",
//         //  path: "/Customer/Orders/OrdersProcessing?ordstat=Processing",
//         icon: <AiIcons.AiOutlineArrowRight />,
//         subNav: [
//           {
//             title: "To Send",
//             path: "",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Sent",
//             path: "",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "No Order",
//             path: "",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Order",
//             path: "",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Closed",
//             path: "",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//         ],
//       },

//       {
//         title: "Previous Menu",
//         path: "/salesHome",
//         icon: <MdIcon.MdPreview />,
//         iconClosed: <RiIcons.RiArrowDownSFill />,
//         iconOpened: <RiIcons.RiArrowUpSFill />,
//       },
//     ]
//   }


//   // {
//   //   title: "Quotation",
//   //   // path: "/customer/outstandings",
//   //   icon: <MdIcon.MdOutlineSummarize />,
//   //   iconClosed: <RiIcons.RiArrowDownSFill />,
//   //   iconOpened: <RiIcons.RiArrowUpSFill />,
//   //   subNav: [
//   //     {
//   //       title: "New Quote",
//   //       path: "/Quotation/Quotation",
//   //       icon: <IoIcons.IoIosPaper />,
//   //     },
//   //     {
//   //       title: "Find Quote",
//   //       path: "/Quotation/SearchQuote",
//   //       icon: <IoIcons.IoIosPaper />,
//   //     },
//   //     {
//   //       title: "Quote List",
//   //       path: "/Quotation/QuotationList",
//   //       icon: <IoIcons.IoIosPaper />,

//   //       subNav: [
//   //         {
//   //           title: "To Send",
//   //           path: "/Customer/CustomerInvoiceAndPayments",
//   //           icon: <IoIcons.IoIosPaper />,
//   //         },
//   //         {
//   //           title: "Sent",
//   //           path: "/Customer/Outstandings",
//   //           icon: <IoIcons.IoIosPaper />,
//   //         },
//   //         {
//   //           title: "No Order",
//   //           path: "/Customer/CustomerInvoiceAndPayments",
//   //           icon: <IoIcons.IoIosPaper />,
//   //         },
//   //         {
//   //           title: "Order",
//   //           path: "/Customer/Outstandings",
//   //           icon: <IoIcons.IoIosPaper />,
//   //         },
//   //         {
//   //           title: "Closed",
//   //           path: "/Customer/Outstandings",
//   //           icon: <IoIcons.IoIosPaper />,
//   //         },
//   //       ],
//   //     },
//   //   ],
//   // },
// ];

// export const MaterialSidebar = [
//   /* {
//     title: "Setup",
//     // path: "/customer",
//     icon: <BsIcon.BsListTask />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
 
//     subNav: [
//       {
//         title: "Server",
//         path: "/materialmanagement/server",
//         icon: <AiIcons.AiOutlineInfoCircle />,
//       },
      
//     ],
//   },*/

//   {
//     title: "Receipt",
//     // path: "/customer",
//     icon: <MdIcon.MdOutlineSummarize />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,

//     subNav: [
//       {
//         title: "Customer Job Work",
//         // path: "/materialmanagement/receipt/customerjobwork",
//         icon: <AiIcons.AiFillCustomerService />,
//         subNav: [
//           {
//             title: "Parts",
//             icon: <AiIcons.AiOutlinePartition />,
//             subNav: [
//               {
//                 title: "New",
//                 path: "/materialmanagement/receipt/customerjobwork/parts/new",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Draft RV List",
//                 path: "/materialmanagement/receipt/customerjobwork/parts/draftrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Open RV List",
//                 path: "/materialmanagement/receipt/customerjobwork/parts/openrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Closed RV List",
//                 path: "/materialmanagement/receipt/customerjobwork/parts/closedrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//             ],
//           },
//           {
//             title: "Units",
//             icon: <AiIcons.AiOutlineDeploymentUnit />,
//             subNav: [
//               {
//                 title: "New",
//                 path: "/materialmanagement/receipt/customerjobwork/units/new",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Draft RV List",
//                 path: "/materialmanagement/receipt/customerjobwork/units/draftrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Open RV List",
//                 path: "/materialmanagement/receipt/customerjobwork/units/openrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Closed RV List",
//                 path: "/materialmanagement/receipt/customerjobwork/units/closedrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//             ],
//           },
//           {
//             title: "Sheets and Others",
//             icon: <MdIcon.MdOutlineOtherHouses />,

//             subNav: [
//               {
//                 title: "New",
//                 path: "/materialmanagement/receipt/customerjobwork/sheetsandothers/new",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Draft RV List",
//                 path: "/materialmanagement/receipt/customerjobwork/sheetsandothers/draftrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Open RV List",
//                 path: "/materialmanagement/receipt/customerjobwork/sheetsandothers/openrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Closed RV List",
//                 path: "/materialmanagement/receipt/customerjobwork/sheetsandothers/closedrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: "Purchase",
//         // icon: <AiIcons.AiOutlineInfoCircle />,
//         icon: <BiIcons.BiPurchaseTag />,
//         subNav: [
//           {
//             title: "Parts",

//             icon: <AiIcons.AiOutlinePartition />,

//             subNav: [
//               {
//                 title: "New",
//                 path: "/materialmanagement/receipt/purchase/parts/new",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Draft RV List",
//                 path: "/materialmanagement/receipt/purchase/parts/draftrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Open RV List",
//                 path: "/materialmanagement/receipt/purchase/parts/openrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Closed RV List",
//                 path: "/materialmanagement/receipt/purchase/parts/closedrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//             ],
//           },
//           {
//             title: "Units",
//             icon: <AiIcons.AiOutlineDeploymentUnit />,
//             subNav: [
//               {
//                 title: "New",
//                 path: "/materialmanagement/receipt/purchase/units/new",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Draft RV List",
//                 path: "/materialmanagement/receipt/purchase/units/draftrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Open RV List",
//                 path: "/materialmanagement/receipt/purchase/units/openrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Closed RV List",
//                 path: "/materialmanagement/receipt/purchase/units/closedrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//             ],
//           },
//           {
//             title: "Others",
//             icon: <MdIcon.MdOutlineOtherHouses />,

//             subNav: [
//               {
//                 title: "New",
//                 path: "/materialmanagement/receipt/purchase/others/new",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Draft RV List",
//                 path: "/materialmanagement/receipt/purchase/others/draftrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Open RV List",
//                 path: "/materialmanagement/receipt/purchase/others/openrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//               {
//                 title: "Closed RV List",
//                 path: "/materialmanagement/receipt/purchase/others/closedrvlist",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//             ],
//           },
//           {
//             title: "Gas",
//             icon: <BiIcons.BiGasPump />,
//             subNav: [
//               {
//                 title: "New",
//                 path: "/materialmanagement/receipt/purchase/gas/new",
//                 icon: <AiIcons.AiOutlineArrowRight />,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: "Branch Transfer",
//         path: "/materialmanagement/receipt/branchtransfer",
//         icon: <AiIcons.AiOutlineBranches />,
//       },
//     ],
//   },
//   {
//     title: "Return",
//     // path: "/customer",
//     icon: <SiIcon.SiMaterialdesignicons />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,

//     subNav: [
//       {
//         title: "Customer Job Work",
//         // path: "/materialmanagement/return/customerjobwork",
//         icon: <AiIcons.AiFillCustomerService />,
//         subNav: [
//           {
//             title: "New",
//             path: "/materialmanagement/return/customerjobwork/new",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Pending Dispatch List",
//             path: "/materialmanagement/return/customerjobwork/pendingdispatchlist",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Customer IV List",
//             path: "/materialmanagement/return/customerjobwork/customerivlist",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Sales IV List",
//             path: "/materialmanagement/return/customerjobwork/salesivlist",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Cancelled",
//             path: "/materialmanagement/return/customerjobwork/cancelled",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//         ],
//       },
//       {
//         title: "Purchase  Planned for future",
//         path: "/materialmanagement/return/purchaseplannedforfuture",
//         icon: <BiIcons.BiPurchaseTag />,
//       },
//     ],
//   },
//   {
//     title: "Shop Floor Issue",
//     // path: "/customer",
//     icon: <BsIcon.BsListTask />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,

//     subNav: [
//       {
//         title: "Service",
//         // path: "/materialmanagement/shopfloorissue/service",
//         icon: <MdIcon.MdMiscellaneousServices />,
//         subNav: [
//           {
//             title: "Parts",
//             path: "/MaterialManagement/ShopFloorIssue/Service/Parts",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Units",
//             path: "/MaterialManagement/ShopFloorIssue/Service/Units",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//         ],
//       },
//       {
//         title: "ProfileCutting",
//         path: "/MaterialManagement/ShopFloorIssue/ProfileCutting",
//         icon: <BiIcons.BiCut />,
//       },
//       {
//         title: "IV List Service",
//         icon: <MdIcon.MdMiscellaneousServices />,
//         subNav: [
//           {
//             title: "Issued",
//             path: "/MaterialManagement/ShopFloorIssue/IVListService/Issued",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Closed",
//             path: "/MaterialManagement/ShopFloorIssue/IVListService/Closed",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//         ],
//       },
//       {
//         title: "IV List Profile Cutting",
//         icon: <BiIcons.BiCut />,
//         subNav: [
//           {
//             title: "Current",
//             path: "/MaterialManagement/ShopFloorIssue/IVListProfileCutting/Current",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Closed",
//             path: "/MaterialManagement/ShopFloorIssue/IVListProfileCutting/Closed",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Shop Floor Returns",
//     // path: "/customer",
//     icon: <BsIcon.BsListTask />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,

//     subNav: [
//       {
//         title: "Pending IV List",
//         path: "/MaterialManagement/ShoopFloorReturns/PendingList",
//         icon: <AiIcons.AiOutlineArrowRight />,
//       },
//     ],
//   },
//   {
//     title: "Reports",
//     // path: "/customer",
//     icon: <BsIcon.BsListTask />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,

//     subNav: [
//       {
//         title: "Customer",
//         icon: <AiIcons.AiFillCustomerService />,
//         subNav: [
//           {
//             title: "Stock Report",
//             path: "/MaterialManagement/Reports/Customer/StockList",
//             icon: <MdIcon.MdOutlineSummarize />,
//           },
//           {
//             title: "Parts Reports",
//             path: "/MaterialManagement/Reports/Customer/PartList",

//             icon: <MdIcon.MdOutlineSummarize />,
//           },
//         ],
//       },
//       {
//         title: "Daily Report",
//         path: "/MaterialManagement/Reports/DailyReports",
//         icon: <MdIcon.MdOutlineSummarize />,
//       },
//       {
//         title: " Monthly Report",
//         path: "/MaterialManagement/Reports/MonthlyReports",
//         icon: <MdIcon.MdOutlineSummarize />,
//       },
//     ],
//   },
//   {
//     title: "Store Managemen",
//     // path: "/customer",
//     icon: <SiIcon.SiMaterialdesignicons />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,

//     subNav: [
//       {
//         title: "Resize Sheets        ",
//         path: "/MaterialManagement/StoreManagement/ResizeSheets",
//         icon: <MdIcon.MdOutlineOtherHouses />,
//       },
//       {
//         title: "Move Store",
//         // path: "/materialmanagement/storemanagement/movestore",
//         icon: <MdIcon.MdOutlineOtherHouses />,
//         subNav: [
//           {
//             title: "Customer",
//             path: "/MaterialManagement/StoreManagement/MoveStore/Customer",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Change Location",
//             path: "/MaterialManagement/StoreManagement/MoveStore/ChangeLocation",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "All",
//             path: "/MaterialManagement/StoreManagement/MoveStore/All",

//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//         ],
//       },
//       {
//         title: " Location List",
//         path: "/MaterialManagement/StoreManagement/LocationList",
//         icon: <BiIcons.BiPurchaseTag />,
//       },
//       {
//         title: " Stock",
//         icon: <BiIcons.BiPurchaseTag />,
//         subNav: [
//           {
//             title: "Stock List",
//             path: "/MaterialManagement/StoreManagement/Stock/StockList",
//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Stock Arrival",
//             path: "/MaterialManagement/StoreManagement/Stock/StockArrival",

//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Stock Dispatch",
//             path: "/MaterialManagement/StoreManagement/Stock/StockDispatch",

//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Stock Ledger",
//             path: "/MaterialManagement/StoreManagement/Stock/StockLedger",

//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//           {
//             title: "Opening Stock",
//             path: "/MaterialManagement/StoreManagement/Stock/OpeningStock",

//             icon: <AiIcons.AiOutlineArrowRight />,
//           },
//         ],
//       },
//       {
//         title: " Location Stock        ",
//         path: "/MaterialManagement/StoreManagement/LocationStock",
//         icon: <BiIcons.BiPurchaseTag />,
//       },
//     ],
//   },
// ];

// export const adminSidebar = [
//   {
//     title: "Users",
//     icon: <FaIcon.FaUsers />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
//       {
//         title: "Roles",
//         path: "/admin/CreateRoles",
//         icon: <VscTypeHierarchySub />,
//       },

//       {
//         title: "Users",
//         path: "/admin/CreateUsers",
//         icon: <HiUsers />,
//       },
//     ],
//   },
//   {
//     title: "Access",
//     icon: <MdIcon.MdOutlineSecurity />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
//       {
//         title: "Menu Roles",
//         path: "/admin/menuRoles",
//         icon: <AiIcons.AiOutlineMenuFold />,
//       },
//       {
//         title: "Mapping",
//         path: "/admin/menuRoles",
//         icon: <AiIcons.AiOutlineMenuFold />,
//       },
//     ],
//   },
//   {
//     title: "Previous Menu",
//     path: "/Home",
//     icon: <MdIcon.MdPreview />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//   },
// ];

export const adminSidebar = [
  {
    title: "Access",
    // path: "/customer",
    icon: <FaIcon.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Roles",
        path: "/admin/roles",
        icon: <VscTypeHierarchySub />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <HiUsers />,
      },
    ],
  },
  {
    title: "Users",
    // path: "/customer",
    icon: <FaIcon.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Menu Role Mapping",
        path: "/admin/mapping",
        icon: <VscTypeHierarchySub />,
      },
    ],
  },
  {
    title: "Previous Menu",
    path: "/home",
    icon: <MdIcon.MdPreview />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];
