import Case2 from "views/Case2.js";
import Case3 from "views/Case3.js";

var routes = [
  {
    path: "/index",
    name: "Risk Analytics",
    icon: "ni ni-chart-bar-32 text-orange",
    component: <Case2 />,
    layout: "/case2",
  },
  {
    path: "/index",
    name: "Upload Excel",
    icon: "ni ni-cloud-upload-96 text-green",
    component: <Case3 />,
    layout: "/case3",
  },
];
export default routes;
