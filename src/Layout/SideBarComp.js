// import React, { useState, useEffect} from "react";
// import styled from "styled-components";
// import { Link, useLocation } from "react-router-dom";
// import SubMenuComp from "./SubNavComp";
// import { IconContext } from "react-icons/lib";
// import { quotationSidebar, adminSidebar } from "../components/SidebarData";
// import { FaAngleRight, FaAngleLeft, FaAngleDown } from "react-icons/fa";

// const NavIcon = styled.div`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const SidebarWrap = styled.div`
//   width: 100%;
//   background-color: #263159;
// `;

// const SidebarComp = () => {
//   const location = useLocation();

//   console.log('LOCAL STORAGE DATA' , JSON.parse(localStorage.getItem("LazerUser")))

//   const [newSideBarData, setNewSideBarData] = useState(quotationSidebar)
//  // const [newSideBarDataScheduleListProfile, setNewSideBarDataScheduleListProfile] = useState(quotationSidebar)
//   //const [newSideBarDataScheduleListService, setNewSideBarDataScheduleListService] = useState(quotationSidebar)
//   const [accessSideBarData, setAccessSideBarData] = useState([])



//   let [lazerUser, setLazerUser] = useState(
//     JSON.parse(localStorage.getItem("LazerUser"))
//   );



//   const [sidebar, setSidebar] = useState(true);

//   const newAccessSideBarData = []

//   function showSidebar() {
//     setSidebar(!sidebar);
//   }
//   //access information is present in laser user 
//   //modify the array in newSideBarData based on laserUserdata
//   useEffect(() => {
//     const tempArray = [...accessSideBarData] //creating a copy of the accessSideBar
//     //console.log(lazerUser.data.access , 'lazer user access state')
//     console.log(newSideBarData, 'NEW SIDE BAR DATA')

//    // console.log(newSideBarData[0].subNav[0].path , 'first pATH')



//     //remove /production from the access array
//     for(let i = 0; i<lazerUser.data.access.length;i++) {
//       if(lazerUser.data.access[i] === "/quotation") {
//         lazerUser.data.access.splice(i, 1);


//         //Setup Machine
//         for(let j =0; j<lazerUser.data.access.length;j++) {
//           if(newSideBarData[0].subNav[0].path.includes(lazerUser.data.access[j])) {
//             tempArray.push(newSideBarData[0])
//         } 

//         //Shift Planner - Shift Editor
//         if(newSideBarData[2].subNav[0].path.includes(lazerUser.data.access[j])) {
//           tempArray.push(newSideBarData[2])
//         }

//         //Reports - Daily Reports
//         if(newSideBarData[3].path.includes(lazerUser.data.access[j])) {
//           tempArray.push(newSideBarData[3])
//         }
//         }
//         }
//     }

//     for(let b =0;b<lazerUser.data.access.length;b++) {

//       if(lazerUser.data.access[b].includes("/quotation/quotation/")) {
//         console.log("PRODUCTION MODULE IS PRESENT")
//         const quotationMenuObject = {...newSideBarData[1]}
//         const quotationMainObject = {...newSideBarData[1].subNav[0]}
//         const serviceMainObject = {...newSideBarData[1].subNav[0]}
//         const fabricationMainObject = {...newSideBarData[1].subNav[2]}

//         delete quotationMenuObject.subNav;
//         const subNavMain = []

//       //For Schedule List
//       for(let a = 0; a<lazerUser.data.access.length;a++) {
//         if(lazerUser.data.access[a].includes("quotation")) {
//           console.log('SCHEDULE LIST IS PRESENT' , newSideBarData[1].subNav[0])
//           const quotationObject = {...newSideBarData[1].subNav[0]}
//           const newquotationObject = {...newSideBarData[1].subNav[0].subNav[0]}
//           const findquotationObject = {...newSideBarData[1].subNav[0].subNav[2]}
//           const quotationListObject = {...newSideBarData[1].subNav[0].subNav[1]}
//           console.log('quotationObject', quotationObject)


//           console.log('quotationObject', quotationObject)
//           delete quotationObject.subNav;
//           const subNav = []

//           console.log('QUOTATION IS PRESENT new' , quotationObject)

//           //tempArray.push(newSideBarData[1].subNav[0])
//           for(let b = 0; b<lazerUser.data.access.length;b++) {
//             if(lazerUser.data.access[b].includes("quotation/CreateNewQuotation")) {
//               console.log("Schedule List Profile is present")
//               subNav.push(newquotationObject)
//             }
//             if(lazerUser.data.access[b].includes("quotation/searchquote")) {
//               console.log("Search Quote is present")
//               subNav.push(findquotationObject)
//             }
//             if(lazerUser.data.access[b].includes("quotation/quotelist")) {
//               console.log("Quote List is present")
//               subNav.push(quotationListObject)
//             }
//           }
//           console.log('subnav', subNav)
//           quotationObject.subNav = subNav;
//           console.log('final quote  object ', quotationObject)
//           //tempArray.push(scheduleListObject)
//           subNavMain.push(quotationObject)
//           break

//         }
//       }

//       //For Machine Allotment
//     for(let a = 0; a<lazerUser.data.access.length;a++) {
//       if(lazerUser.data.access[a].includes("machineallotment")) {
//         console.log('MACHINE ALLOTMENT IS PRESENT' , newSideBarData[1].subNav[1])
//         const machineAllotmentObject = {...newSideBarData[1].subNav[1]}
//         const machineAllotmentProfileObject = {...newSideBarData[1].subNav[1].subNav[0]}
//         const machineAllotmentServiceObject = {...newSideBarData[1].subNav[1].subNav[1]}

//         console.log('machineAllotmentProfileObject', machineAllotmentProfileObject)


//         console.log('machineAllotmentObject', machineAllotmentObject)
//         delete machineAllotmentObject.subNav;
//         const subNav = []

//         console.log('machineAllotment IS PRESENT new' , machineAllotmentObject)

//         //tempArray.push(newSideBarData[1].subNav[0])
//         for(let b = 0; b<lazerUser.data.access.length;b++) {
//           if(lazerUser.data.access[b].includes("machineallotment/profile")) {
//             console.log("machineAllotment Profile is present")
//             subNav.push(machineAllotmentProfileObject)
//           }
//           if(lazerUser.data.access[b].includes("machineallotment/service")) {
//             console.log("machineAllotment Service is present")
//             subNav.push(machineAllotmentServiceObject)
//           }

//         }
//         console.log('subNav', subNav)
//         machineAllotmentObject.subNav = subNav;
//         console.log('final machineAllotment object ', machineAllotmentObject)
//         //tempArray.push(machineAllotmentObject)
//         subNavMain.push(machineAllotmentObject)
//         break
//       }
//     }

//     //For Shift Manager
//     for(let a = 0; a<lazerUser.data.access.length;a++) {
//       if(lazerUser.data.access[a].includes("shiftmanager")) {
//         console.log('SHIFT MANAGER IS PRESENT' , newSideBarData[1].subNav[2])
//         const shiftManagerObject = {...newSideBarData[1].subNav[2]}
//         const shiftManagerProfileObject = {...newSideBarData[1].subNav[2].subNav[0]}
//         const shiftManagerServiceObject = {...newSideBarData[1].subNav[2].subNav[2]}
//         const shiftManagerFabricationObject = {...newSideBarData[1].subNav[2].subNav[1]}
//         console.log('shiftManagerProfileObject', shiftManagerProfileObject)


//         console.log('shiftManagerObject', shiftManagerObject)
//         delete shiftManagerObject.subNav;
//         const subNav = []

//         console.log('shiftManager IS PRESENT new' , shiftManagerObject)

//         //tempArray.push(newSideBarData[1].subNav[0])
//         for(let b = 0; b<lazerUser.data.access.length;b++) {
//           if(lazerUser.data.access[b].includes("shiftmanager/profile")) {
//             console.log("shiftManager Profile is present")
//             subNav.push(shiftManagerProfileObject)
//           }
//           if(lazerUser.data.access[b].includes("shiftmanager/service")) {
//             console.log("shiftManager Service is present")
//             subNav.push(shiftManagerServiceObject)
//           }
//           if(lazerUser.data.access[b].includes("shiftmanager/fabrication")) {
//             console.log("shiftManager Fabriation is present")
//             subNav.push(shiftManagerFabricationObject)
//           }
//         }
//         console.log('subNav', subNav)
//         shiftManagerObject.subNav = subNav;
//         console.log('final shiftManager object ', shiftManagerObject)
//         //tempArray.push(shiftManagerObject)
//         subNavMain.push(shiftManagerObject)
//         break
//       }
//     }


//         console.log('SUBNAV MAIN', subNavMain)
//         quotationMenuObject.subNav = subNavMain;
//         console.log('final production object ', quotationMenuObject)
//         tempArray.push(quotationMenuObject)
//         break;
//       }
//     }

//     ///////////////////////////////////////////////////////////////////////////////////////////////////////



//     setAccessSideBarData(tempArray)

//   }, []);
//   console.log(accessSideBarData , 'Access Side Bar Data')
//   //console.log(newAccessSideBarData, 'newAccessSideBarData')
//   return (
//     <>
//       <nav className={sidebar ? "side-nav" : '"side-nav '}>
//         <SidebarWrap>
//           <div className="admin-title ">
//             {/* {sidebar && 'M A G O D'} */}
//             <img className="logo" src={require("../ML-LOGO1.png")} />
//             {sidebar ? (
//               <FaAngleRight
//                 className="toggle-icon"
//                 onClick={() => showSidebar()}
//               />
//             ) : (
//               <FaAngleLeft
//                 className="toggle-icon"
//                 onClick={() => showSidebar()}
//               />
//             )}
//           </div>

//           {(location.pathname.startsWith("/admin")
//             ? adminSidebar
//             : accessSideBarData
//           ).map((item, index) => {
//             return <SubMenuComp item={item} key={index} sidebar={sidebar} />;
//           })}
//         </SidebarWrap>
//       </nav>
//     </>
//   );
// };

// export default SidebarComp;


/////////////////////////// - Old Code - /////////////////////////////////
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SubMenuComp from "../Layout/SubNavComp";
//"./SubNavComp";

import { IconContext } from "react-icons/lib";
import {quotationSidebar, adminSidebar} from "../components/SidebarData";
  // customerSidebar,
  // adminSidebar,
  // MaterialSidebar,
  //quotationSidebar,
  // orderSidebar,
  // accountsSidebar,
  // sigmancSidebar,
//} from "../components/SidebarData";
import { FaAngleRight, FaAngleLeft, FaAngleDown } from "react-icons/fa";
//import SubNavComp from "./SubNavComp";

const NavIcon = styled.div`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarWrap = styled.div`
  width: 100%;
  background-color: #263159;
`;

const SidebarComp = () => {
  const location = useLocation();
 // let [lazerUser, setLazerUser] = useState(
  //  JSON.parse(localStorage.getItem("LazerUser"))
  //);

  const [sidebar, setSidebar] = useState(true);
  const [newSideBarData, setNewSideBarData] = useState(quotationSidebar);
  const [accessSideBarData, setAccessSideBarData] = useState([]);

  function showSidebar() {
    setSidebar(!sidebar);
  }

  let [lazerUser, setLazerUser] = useState(
   JSON.parse(localStorage.getItem("LazerUser"))
  );

   // console.log(lazerUser.data.access);
   useEffect(() => {
    function filterSidebarData(data, accessPaths) {
      // console.log("first", data);
      // console.log("second", accessPaths);
      const filterSidebar = [];
      let previousMenu = null;

      data.forEach((element) => {
        if (element.subNav) {
          const subNavFiltered = filterSidebarData(element.subNav, accessPaths);
          element.subNav = subNavFiltered;
          if (subNavFiltered.length > 0 || accessPaths.includes(element.path)) {
            // if(element.path)
            //   element.path = element.path.toLowerCase();
            filterSidebar.push(element);
          }
        } else {
          if (element.title === "Previous Menu") {
            previousMenu = element;
          } else if (accessPaths.includes(element.path)) {
            // if(element.path)
            //   element.path = element.path.toLowerCase();
            filterSidebar.push(element);
          }
        }
      });
      if (previousMenu) {
        filterSidebar.push(previousMenu);
      }
      return filterSidebar;
    }

    const filterSidebar = filterSidebarData(
      newSideBarData,
      lazerUser.data.access
    );
    // console.log(filterSidebar);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    setAccessSideBarData(filterSidebar);
    // setAccessSideBarData(quotationSidebar)
  }, []);


  return (
    <>
      <nav className={sidebar ? "side-nav" : '"side-nav '}>
        <SidebarWrap>
          <div className="admin-title ">
            {/* {sidebar && 'M A G O D'} */}
            {/* <img className="logo" src={require("../ML-LOGO1.png")} /> */}
            <img
              className="logo"
              src={require("../Magod-Laser-Logo - White.png")}
            />
            {sidebar ? (
              <FaAngleRight
                className="toggle-icon"
                onClick={() => showSidebar()}
              />
            ) : (
              <FaAngleLeft
                className="toggle-icon"
                onClick={() => showSidebar()}
              />
            )}
          </div>

          {(location.pathname.startsWith("/admin")
            ? adminSidebar : accessSideBarData
            // : (location.pathname.startsWith("/customer")
            //   ? customerSidebar

            //   : (location.pathname.startsWith("/quotation")
            //     ? quotationSidebar
            //     : (location.pathname.startsWith("/order")
            //       ? orderSidebar
            //       : (location.pathname.startsWith("/accounts")
            //         ? accountsSidebar
            //         : (location.pathname.startsWith("/sigmanc")
            //           ? sigmancSidebar
            //           : sigmancSidebar
            //   )))))
              //  : QuotationSidebar
            ).map((item, index) => {
              return <SubMenuComp item={item} key={index} sidebar={sidebar} />;
            })}

          {/* {(lazerUser.data.access.includes("/admin") ? adminSidebar : null).map(
            (item, index) => {
              return <SubNavComp item={item} key={index} sidebar={sidebar} />;
            }
          )}
          {(lazerUser.data.access.includes("/customer")
            ? adminSidebar
            : adminSidebar
          ).map((item, index) => {
            return <SubNavComp item={item} key={index} sidebar={sidebar} />;
          })} */}
        </SidebarWrap>
      </nav>
    </>
  );
};

export default SidebarComp;
