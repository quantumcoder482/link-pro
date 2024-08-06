import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { useState, useRef, createRef, useEffect, forwardRef, useLayoutEffect, createContext, useContext, useReducer, useCallback, useMemo, Fragment as Fragment$1 } from "react";
import { Link as Link$1, usePage, Head, useForm, router, createInertiaApp } from "@inertiajs/react";
import { IoIosPlayCircle, IoIosCloseCircleOutline, IoMdAlert } from "react-icons/io/index.esm.js";
import _, { isEmpty, toUpper, capitalize, toLower } from "lodash";
import { RiPagesLine, RiBarChart2Line, RiUserSettingsLine, RiMailLine, RiLogoutBoxRLine, RiInstagramLine, RiCloseCircleFill } from "react-icons/ri/index.esm.js";
import { MdOutlineDashboard, MdOutlineSchool, MdCheckCircle, MdCancel, MdEdit, MdDragHandle, MdKeyboardArrowDown, MdAddCircleOutline, MdDeleteForever, MdKeyboardArrowUp, MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md/index.esm.js";
import axios$1 from "axios";
import { BiMailSend, BiHelpCircle, BiChevronLeft, BiChevronsLeft, BiLock, BiRefresh } from "react-icons/bi/index.esm.js";
import { ImPlus } from "react-icons/im/index.esm.js";
import { FormControl, InputLabel as InputLabel$1, Select } from "@mui/material";
import { SketchPicker } from "react-color";
import ReactCrop$1, { centerCrop, makeAspectCrop } from "react-image-crop";
import { HiMinus, HiPlus, HiMinusSm, HiOutlinePlusSm } from "react-icons/hi/index.esm.js";
import { FiThumbsUp, FiThumbsDown, FiChevronDown } from "react-icons/Fi";
import CurrencyInput from "react-currency-input-field";
import validator from "validator/es/index.js";
import { Editor } from "@tinymce/tinymce-react";
import { ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import isJSON from "validator/es/lib/isJSON.js";
import DOMPurify from "dompurify";
import { FaCirclePlay } from "react-icons/fa6/index.esm.js";
import { IoWarningOutline } from "react-icons/io5/index.esm.js";
import FormControl$1 from "@mui/material/FormControl/index.js";
import FormLabel from "@mui/material/FormLabel/index.js";
import RadioGroup from "@mui/material/RadioGroup/index.js";
import FormControlLabel from "@mui/material/FormControlLabel/index.js";
import Radio from "@mui/material/Radio/index.js";
import Slider from "@mui/material/Slider/index.js";
import { styled } from "@mui/material/styles/index.js";
import Switch from "@mui/material/Switch/index.js";
import { useSortable, sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS as CSS$1 } from "@dnd-kit/utilities";
import { VscTriangleDown } from "react-icons/vsc/index.esm.js";
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { FaPlus, FaExclamationTriangle, FaRegCalendarAlt, FaSortDown, FaSortUp, FaSort } from "react-icons/fa/index.esm.js";
import { ErrorBoundary } from "react-error-boundary";
import ReactPaginate from "react-paginate";
import { Transition, Dialog } from "@headlessui/react";
import DatePicker from "react-datepicker";
import { useTable, useSortBy } from "react-table";
import $$1 from "jquery";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import Vapor$1 from "laravel-vapor";
const ColumnComponent$1 = ({ course, type }) => {
  const { intro_video, video_link, username, slug, title, logo } = course;
  const [hovered, setHovered] = useState(null);
  const columnRef = useRef();
  const videoLink = intro_video || video_link;
  const getImageUrl = (videoLink2) => {
    let imageUrl2 = null;
    if (videoLink2 == null ? void 0 : videoLink2.includes("youtube")) {
      const videoCode = videoLink2.split("embed/");
      imageUrl2 = "https://img.youtube.com/vi/" + videoCode[1] + "/mqdefault.jpg";
    } else if (videoLink2 == null ? void 0 : videoLink2.includes("vimeo")) {
      const videoCode = videoLink2.split("video/");
      imageUrl2 = "https://vumbnail.com/" + videoCode[1] + ".jpg";
    } else {
      imageUrl2 = logo;
    }
    return imageUrl2;
  };
  const imageUrl = getImageUrl(videoLink);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: columnRef,
      className: `column ${hovered === columnRef && "active"}`,
      onMouseOver: () => setHovered(columnRef),
      onMouseLeave: () => setHovered(null),
      children: /* @__PURE__ */ jsxs(Link$1, { href: username + "/course/" + slug, children: [
        /* @__PURE__ */ jsxs("div", { className: "column_image relative", children: [
          /* @__PURE__ */ jsx("img", { src: imageUrl, alt: title }),
          /* @__PURE__ */ jsx("div", { className: "icon_box", children: type === "purchased" ? /* @__PURE__ */ jsx(IoIosPlayCircle, {}) : /* @__PURE__ */ jsx(Link$1, { className: "button blue", href: username + "/course-page/" + slug, children: "Learn More" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "column_title", children: [
          /* @__PURE__ */ jsx("h3", { children: title }),
          /* @__PURE__ */ jsx("p", { children: username })
        ] })
      ] })
    }
  );
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ColumnComponent$1
}, Symbol.toStringTag, { value: "Module" }));
function ApplicationLogo(props) {
  return /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/logo.png"), alt: "LinkPro" });
}
const ProfileMenu = () => {
  var _a, _b, _c, _d;
  const { auth } = usePage().props;
  const userRoles = auth.user.roles;
  return /* @__PURE__ */ jsx("div", { className: "nav_links_wrap", children: /* @__PURE__ */ jsxs("ul", { className: "ml-auto", children: [
    !isEmpty(userRoles) ? (userRoles.includes("admin") || userRoles.includes("lp.user")) && isEmpty(auth.user.subscription) || auth.user.subscription.name && auth.user.subscription.name !== "premier" && !auth.user.subscription.ends_at || auth.user.subscription.ends_at && auth.user.subscription.ends_at < Date(Date.now()) ? /* @__PURE__ */ jsx("li", { className: "upgrade_link", children: /* @__PURE__ */ jsx(Link$1, { className: "button blue", href: route("plans.get"), children: "Upgrade" }) }) : "" : "",
    /* @__PURE__ */ jsx("li", { className: "nav-item", children: !isEmpty(userRoles) ? /* @__PURE__ */ jsxs(Link$1, { className: "nav-link", href: route("user.edit"), role: "button", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          id: "user_image",
          src: ((_a = auth.user.userInfo) == null ? void 0 : _a.avatar.includes("default")) ? Vapor.asset("images/profile-placeholder-img.png") : (_b = auth.user.userInfo) == null ? void 0 : _b.avatar,
          alt: "User Profile"
        }
      ),
      /* @__PURE__ */ jsx("span", { id: "username", children: (_c = auth.user.userInfo) == null ? void 0 : _c.username })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("img", { id: "user_image", src: Vapor.asset("images/profile-placeholder-img.png"), alt: "User Profile" }),
      /* @__PURE__ */ jsx("span", { id: "username", children: (_d = auth.user.userInfo) == null ? void 0 : _d.username })
    ] }) })
  ] }) });
};
const HoverText = ({ text: text2 }) => {
  const hoverText2 = createRef();
  useEffect(() => {
    const width = hoverText2.current.clientWidth;
    hoverText2.current.style.right = "-" + width + "px";
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "hover_text", ref: hoverText2, children: /* @__PURE__ */ jsx("p", { children: toUpper(text2) }) });
};
const MenuData = [
  {
    id: "pages",
    name: "pages",
    url: "/dashboard/pages/",
    icon: /* @__PURE__ */ jsx(RiPagesLine, {}),
    permission: "view dashboard"
  },
  {
    id: "creator_center_link",
    name: "creator center",
    url: "/creator-center",
    icon: /* @__PURE__ */ jsx(MdOutlineDashboard, {}),
    permission: "view creator center"
  },
  {
    id: "stats",
    name: "stats",
    url: "/stats",
    icon: /* @__PURE__ */ jsx(RiBarChart2Line, {}),
    permission: "view stats"
  },
  {
    id: "courses",
    name: "courses",
    url: "/courses",
    icon: /* @__PURE__ */ jsx(MdOutlineSchool, {}),
    permission: "view courses"
  },
  {
    id: "pre_register",
    name: "pages",
    url: "/pre-register-link-pro",
    icon: /* @__PURE__ */ jsx(RiPagesLine, {}),
    permission: "view courses"
  },
  {
    id: "settings",
    name: "settings",
    url: "/edit-account",
    icon: /* @__PURE__ */ jsx(RiUserSettingsLine, {}),
    permission: "has permission"
  },
  {
    id: "contact_us",
    name: "contact us",
    url: "/contact",
    icon: /* @__PURE__ */ jsx(RiMailLine, {}),
    permission: "all"
  }
];
const MenuItem = ({
  item,
  userPermissions,
  isHovering,
  isOpen,
  handleMouseOver,
  handleMouseOut,
  courseData
}) => {
  const { id, name: name2, url, icon, permission } = item;
  return ((userPermissions == null ? void 0 : userPermissions.includes(permission)) || permission === "all") && id !== "pre_register" || id === "pre_register" && !(userPermissions == null ? void 0 : userPermissions.includes("view dashboard")) || id === "settings" && !isEmpty(userPermissions) ? /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsxs(
      Link$1,
      {
        id,
        style: courseData && { color: courseData["header_text_color"] },
        href: url,
        onMouseOver: () => handleMouseOver(name2),
        onMouseOut: handleMouseOut,
        children: [
          /* @__PURE__ */ jsx("span", { className: "menu_icon", style: courseData && { color: courseData["header_text_color"] }, children: icon }),
          /* @__PURE__ */ jsx("span", { className: "text", children: toUpper(name2) })
        ]
      }
    ),
    !isOpen && isHovering.status && isHovering.section === name2 ? /* @__PURE__ */ jsx(HoverText, { text: name2 }) : ""
  ] }) : "";
};
function Menu() {
  var _a;
  const { auth } = usePage().props;
  const creator = (_a = auth.user.userInfo) == null ? void 0 : _a.username;
  const courseData = auth.user.courseData;
  const userPermissions = auth.user.permissions;
  const [isHovering, setIsHovering] = useState({
    status: false,
    section: null
  });
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    const pageWrapper = document.getElementById("off_canvas_menu");
    if (!!isOpen) {
      pageWrapper.classList.remove("open");
    } else {
      pageWrapper.classList.add("open");
    }
  };
  const handleMouseOver = (section2) => {
    setIsHovering({
      status: true,
      section: section2
    });
  };
  const handleMouseOut = () => {
    setIsHovering({
      status: false,
      section: null
    });
  };
  const logout = async (e) => {
    e.preventDefault();
    const url = courseData ? "/logout?course=" + courseData["slug"] : "/logout";
    const res = await axios.post(url, {
      headers: {
        // 'application/json' is the modern content-type for JSON, but some
        // older servers may use 'text/json'.
        // See: http://bit.ly/text-json
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
      }
    });
    window.location = res.data.path;
  };
  return /* @__PURE__ */ jsx("div", { id: "off_canvas_menu", children: /* @__PURE__ */ jsxs("div", { className: "menu_wrap", style: courseData && { background: courseData["header_color"] }, children: [
    /* @__PURE__ */ jsxs("div", { className: "menu_top", style: courseData && { borderColor: courseData["header_text_color"] }, children: [
      /* @__PURE__ */ jsx("div", { className: "logo", children: courseData ? /* @__PURE__ */ jsx("img", { src: courseData["logo"] || Vapor.asset("images/logo.png"), alt: "" }) : /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/logo-white.png"), alt: "" }) }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          className: "icon_wrap mobile_menu_icon",
          href: "#",
          onClick: (e) => handleOnClick(e),
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                style: courseData && { background: courseData["header_text_color"] }
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                style: courseData && { background: courseData["header_text_color"] }
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                style: courseData && { background: courseData["header_text_color"] }
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "menu", children: /* @__PURE__ */ jsxs("ul", { children: [
      MenuData.map((item, index2) => {
        return /* @__PURE__ */ jsx(
          MenuItem,
          {
            item,
            userPermissions,
            isHovering,
            isOpen,
            handleMouseOver,
            handleMouseOut,
            courseData
          },
          item["id"]
        );
      }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            style: { color: courseData && courseData["header_text_color"] },
            id: "logout",
            href: "#",
            onClick: (e) => logout(e),
            onMouseOver: () => handleMouseOver("logout"),
            onMouseOut: handleMouseOut,
            children: [
              /* @__PURE__ */ jsx("span", { className: "menu_icon", style: courseData && { color: courseData["header_text_color"] }, children: /* @__PURE__ */ jsx(RiLogoutBoxRLine, {}) }),
              /* @__PURE__ */ jsx("span", { className: "text", children: "LOGOUT" })
            ]
          }
        ),
        !isOpen && isHovering.status && isHovering.section === "logout" ? /* @__PURE__ */ jsx(HoverText, { text: "logout" }) : ""
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "menu_bottom", children: /* @__PURE__ */ jsx("div", { className: "menu", children: /* @__PURE__ */ jsx("ul", { children: auth.user.courseData ? /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: `${window.location.origin}/${creator}`,
          style: courseData && { color: courseData["header_text_color"] },
          target: "_blank",
          onMouseOver: () => handleMouseOver("contact " + creator),
          onMouseOut: handleMouseOut,
          children: [
            /* @__PURE__ */ jsx("span", { className: "menu_icon", style: courseData && { color: courseData["header_text_color"] }, children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 15.82 15.82", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxs("g", { fill: "currentColor", transform: "translate(-.1 -.12)", children: [
              /* @__PURE__ */ jsx("path", { d: "m8 15.94a7.91 7.91 0 1 1 7.92-7.94 7.92 7.92 0 0 1 -7.92 7.94zm0-14.11a6.2 6.2 0 1 0 6.21 6.17 6.21 6.21 0 0 0 -6.21-6.17z" }),
              /* @__PURE__ */ jsx("path", { d: "m12.93 6.6a3.28 3.28 0 0 0 -.27-.38 2.66 2.66 0 0 0 -2.16-.9 2.52 2.52 0 0 0 -2 1.26.21.21 0 0 0 0 .1.26.26 0 0 0 .08.13 2.82 2.82 0 0 0 .8.66 1.44 1.44 0 0 0 1.15 0l-.64-.58a.47.47 0 0 1 -.06-.09.15.15 0 0 1 .09-.14 1.44 1.44 0 0 1 1.56-.05 1.51 1.51 0 0 1 .24 2.28 1.4 1.4 0 0 1 -1.84.11c-.96-1-1.94-1.89-2.83-2.89a2.55 2.55 0 1 0 -1.29 4.22 2.44 2.44 0 0 0 1.68-1.33c-.89-.93-1.1-1-2.09-.82l.65.57c.11.1.15.19 0 .3a1.54 1.54 0 0 1 -1.81-.19 1.5 1.5 0 0 1 0-2.09 1.46 1.46 0 0 1 2 .06c.23.22.45.46.68.69.79.79 1.53 1.63 2.38 2.35a2.49 2.49 0 0 0 3.68-3.27z" })
            ] }) }) }),
            /* @__PURE__ */ jsxs("span", { className: "text", children: [
              "CONTACT ",
              toUpper(creator)
            ] })
          ]
        }
      ),
      !isOpen && isHovering.status && isHovering.section === "follow us" ? /* @__PURE__ */ jsx(HoverText, { text: "follow us" }) : ""
    ] }) : /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "https://www.instagram.com/link.pro.official/",
          target: "_blank",
          onMouseOver: () => handleMouseOver(
            "follow us"
          ),
          onMouseOut: handleMouseOut,
          children: [
            /* @__PURE__ */ jsx("span", { className: "menu_icon", style: courseData && { color: courseData["header_text_color"] }, children: /* @__PURE__ */ jsx(RiInstagramLine, {}) }),
            /* @__PURE__ */ jsx("span", { className: "text", children: "FOLLOW US" })
          ]
        }
      ),
      !isOpen && isHovering.status && isHovering.section === "follow us" ? /* @__PURE__ */ jsx(HoverText, { text: "follow us" }) : ""
    ] }) }) }) })
  ] }) });
}
const AuthenticatedFooter = () => {
  return /* @__PURE__ */ jsxs("footer", { children: [
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link$1, { className: "text-sm", href: route("contact"), children: "Contact Us" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link$1, { className: "text-sm", href: route("user.edit"), children: "Settings" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link$1, { className: "text-sm", href: route("how-it-works"), children: "How It Works" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link$1, { className: "text-sm", href: route("setup.page"), children: "Setup" }) })
    ] }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("small", { children: [
      /* @__PURE__ */ jsx(Link$1, { href: route("terms"), children: "Terms And Conditions" }),
      " | ",
      /* @__PURE__ */ jsx(Link$1, { href: route("privacy"), children: "Privacy Policy" })
    ] }) }),
    /* @__PURE__ */ jsx("small", { children: "© Copyright LinkPro LLC | All Rights Reserved " })
  ] });
};
const HandleFocus$1 = (element) => {
  return element.classList.add("active");
};
const HandleBlur = (element) => {
  if (element.value === "") {
    return element.classList.remove("active");
  }
};
const InputAnimations = () => {
  useEffect(() => {
    const inputs = document.querySelectorAll("input.animate");
    if (inputs.length > 0) {
      inputs.forEach((inputEl) => {
        if (document.activeElement === inputEl) {
          inputEl.classList.add("active");
        }
        inputEl.addEventListener("focus", () => {
          inputEl.classList.add("active");
        });
        inputEl.addEventListener("blur", () => {
          if (inputEl.value === "") {
            inputEl.classList.remove("active");
          }
        });
        if (inputEl.value !== "") {
          inputEl.classList.add("active");
        }
      });
    }
    const textAreas = document.querySelectorAll("textarea.animate");
    if (textAreas.length > 0) {
      textAreas.forEach((inputEl) => {
        if (document.activeElement === inputEl) {
          inputEl.classList.add("active");
        }
        inputEl.addEventListener("focus", () => {
          inputEl.classList.add("active");
        });
        inputEl.addEventListener("blur", () => {
          if (inputEl.value === "") {
            inputEl.classList.remove("active");
          }
        });
        if (inputEl.value !== "") {
          inputEl.classList.add("active");
        }
      });
    }
  }, []);
  return /* @__PURE__ */ jsx(Fragment, {});
};
function Authenticated({ children }) {
  return /* @__PURE__ */ jsxs("div", { id: "app_wrap", className: "member", children: [
    /* @__PURE__ */ jsx(InputAnimations, {}),
    /* @__PURE__ */ jsxs("div", { className: "my_row", children: [
      /* @__PURE__ */ jsx(Menu, {}),
      /* @__PURE__ */ jsx("header", { className: "my_row nav_row", children: /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "content_wrap", children: [
        /* @__PURE__ */ jsx("div", { className: "left_column", children: /* @__PURE__ */ jsx(Link$1, { className: "logo", href: route("dashboard"), children: /* @__PURE__ */ jsx("h1", { children: /* @__PURE__ */ jsx(ApplicationLogo, {}) }) }) }),
        /* @__PURE__ */ jsx("div", { className: "right_column", children: /* @__PURE__ */ jsx(ProfileMenu, {}) })
      ] }) }) }) }),
      /* @__PURE__ */ jsx("main", { children }),
      /* @__PURE__ */ jsx(AuthenticatedFooter, {})
    ] })
  ] });
}
const Courses = ({ purchasedCourses, unPurchasedCourses }) => {
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Courses" }),
    /* @__PURE__ */ jsx("div", { className: "creator course_creator", children: /* @__PURE__ */ jsx("div", { id: "links_page", className: "live_page course", children: /* @__PURE__ */ jsx("div", { className: "my_row courses_grid all_courses", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      !isEmpty(purchasedCourses) && /* @__PURE__ */ jsxs("section", { className: "section_wrap my_row", children: [
        /* @__PURE__ */ jsx("h2", { className: "page_title", children: "Your Courses" }),
        /* @__PURE__ */ jsx("div", { className: "sections", children: purchasedCourses.map((course) => {
          return /* @__PURE__ */ jsx(
            ColumnComponent$1,
            {
              course,
              type: "purchased"
            },
            course.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "section_wrap my_row", children: [
        /* @__PURE__ */ jsx("h2", { className: "page_title", children: "Available Courses" }),
        /* @__PURE__ */ jsx("div", { className: "sections", children: unPurchasedCourses.map((course) => {
          return /* @__PURE__ */ jsx(
            ColumnComponent$1,
            {
              course,
              type: "available"
            },
            course.id
          );
        }) })
      ] })
    ] }) }) }) })
  ] });
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Courses
}, Symbol.toStringTag, { value: "Module" }));
const GuestFooter = () => {
  return /* @__PURE__ */ jsxs("footer", { children: [
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link$1, { className: "text-sm", href: route("how-it-works"), children: "How It Works" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link$1, { className: "text-sm", href: route("login"), children: "Login" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link$1, { className: "text-sm", href: route("register"), children: "Sign Up" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link$1, { className: "text-sm", href: route("contact"), children: "Contact Us" }) })
    ] }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("small", { children: [
      /* @__PURE__ */ jsx(Link$1, { href: route("terms"), children: "Terms And Conditions" }),
      " | ",
      /* @__PURE__ */ jsx(Link$1, { href: route("privacy"), children: "Privacy Policy" })
    ] }) }),
    /* @__PURE__ */ jsx("small", { children: "© Copyright LinkPro LLC | All Rights Reserved " })
  ] });
};
function Guest({ children, ...props }) {
  const { course } = props;
  const loginUrl = course ? "/" + course.slug : "";
  return /* @__PURE__ */ jsxs("div", { className: "guest min-h-screen flex flex-col items-center", children: [
    /* @__PURE__ */ jsx(InputAnimations, {}),
    /* @__PURE__ */ jsxs("header", { className: "guest_header w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "column left", children: /* @__PURE__ */ jsx("h1", { children: /* @__PURE__ */ jsx(Link$1, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, {}) }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "column right", children: [
        /* @__PURE__ */ jsx(Link$1, { href: loginUrl + "/login", children: "Log In" }),
        /* @__PURE__ */ jsx(Link$1, { href: route("contact"), children: "Contact Us" }),
        /* @__PURE__ */ jsx(Link$1, { className: "button transparent", href: route("register"), children: "Sign Up" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "w-full !py-20", children }),
    /* @__PURE__ */ jsx(GuestFooter, {})
  ] });
}
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx("p", { ...props, className: "text-sm text-red-600 " + className, children: message }) : null;
}
function InputLabel({ value, className = "", children, ...props }) {
  return /* @__PURE__ */ jsx("label", { ...props, className: `block ` + className, children: value ? value : children });
}
function PrimaryButton({ className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `font-bold inline-flex items-center px-4 py-2 rounded-md tracking-widest transition ease-in-out duration-150 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, ...props }, ref) {
  const input = ref ? ref : useRef();
  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type,
      className: "rounded-md " + className,
      ref: input
    }
  );
});
function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "This is a secure area of the application. Please confirm your password before continuing." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ml-4", disabled: processing, children: "Confirm" }) })
    ] })
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data.email,
          className: "mt-1 block w-full",
          isFocused: true,
          onChange: (e) => setData("email", e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ml-4", disabled: processing, children: "Email Password Reset Link" }) })
    ] })
  ] });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
    }
  );
}
function Login({ status, canResetPassword, course = null }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    identity: "",
    password: "",
    remember: false
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    let parameter = course ? "?course=" + course.id : "";
    post(route("login") + parameter);
  };
  return /* @__PURE__ */ jsxs(Guest, { course, children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsxs("div", { className: "container", children: [
      status && /* @__PURE__ */ jsx("div", { className: "mb-4", children: status }),
      /* @__PURE__ */ jsx("div", { className: "my_row form_page", children: /* @__PURE__ */ jsxs("div", { className: "card bg-white guest login_form", children: [
        /* @__PURE__ */ jsx("div", { className: `${course ? "mb-0" : "mb-4"}`, children: /* @__PURE__ */ jsx("h3", { children: "Log in to LinkPro" }) }),
        course && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { className: "text-center", children: "to Access" }),
          /* @__PURE__ */ jsxs("div", { className: "course_heading", style: { background: course.header_color }, children: [
            /* @__PURE__ */ jsx("img", { className: "mx-auto", src: course.logo, alt: course.title }),
            /* @__PURE__ */ jsx("h3", { style: { color: course.header_text_color }, children: course.title })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { className: "form-group relative p-0 mb-5", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "identity",
                type: "text",
                name: "identity",
                value: data.identity,
                className: "block w-full animate",
                autoComplete: "username",
                isFocused: true,
                onChange: (e) => setData("identity", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "identity", value: "E-mail or UserName" }),
            /* @__PURE__ */ jsx(InputError, { message: errors.identity, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group relative p-0 ", children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "password",
                type: "password",
                name: "password",
                value: data.password,
                className: "block w-full animate",
                autoComplete: "current-password",
                onChange: (e) => setData("password", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
            /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "block mt-4", children: /* @__PURE__ */ jsx("label", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "form-check", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                className: "form-check-input",
                name: "remember",
                checked: data.remember,
                onChange: (e) => setData("remember", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600 form-check-label", children: "Remember me" })
          ] }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-center mt-4", children: [
            /* @__PURE__ */ jsx(PrimaryButton, { className: "button blue mb-4", disabled: processing, children: "Sign in" }),
            canResetPassword && /* @__PURE__ */ jsx(
              Link$1,
              {
                href: route("password.request"),
                className: "text-sm text-blue-600 underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                children: "Need your password reset?"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "form-group text-center mt-2", children: /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
            "Not on LinkPro?",
            /* @__PURE__ */ jsx(Link$1, { className: "text-blue-600 font-bold text-sm", href: route("register"), children: " Start Now Free!" })
          ] }) })
        ] })
      ] }) })
    ] })
  ] });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("register"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "my_row form_page", children: /* @__PURE__ */ jsxs("div", { className: "card guest", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("h3", { children: "Take control of your social sharing!" }),
        /* @__PURE__ */ jsx("h4", { className: "text-center", children: "Create your free account below to get started." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsxs("div", { className: "form-group relative", children: [
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "email",
              type: "email",
              name: "email",
              value: data.email,
              className: "mt-1 block w-full animate",
              autoComplete: "username",
              onChange: (e) => setData("email", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 form-group relative", children: [
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password",
              type: "password",
              name: "password",
              value: data.password,
              className: "mt-1 block w-full animate",
              autoComplete: "new-password",
              onChange: (e) => setData("password", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 form-group relative", children: [
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password_confirmation",
              type: "password",
              name: "password_confirmation",
              value: data.password_confirmation,
              className: "mt-1 block w-full animate",
              autoComplete: "new-password",
              onChange: (e) => setData("password_confirmation", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group form-check mt-2 flex align-center", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              className: "form-check-input",
              name: "terms",
              checked: data.remember,
              onChange: (e) => setData("terms", e.target.checked),
              required: true
            }
          ),
          /* @__PURE__ */ jsxs("label", { className: "form-check-label", htmlFor: "terms", children: [
            "Check here to agree to LinkPro's",
            /* @__PURE__ */ jsx(Link$1, { target: "_blank", href: route("terms"), children: "Terms and Conditions" }),
            " and",
            /* @__PURE__ */ jsx(Link$1, { target: "_blank", href: route("privacy"), children: " Privacy Policy" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "block mt-4 text-center", children: [
          /* @__PURE__ */ jsx(PrimaryButton, { className: "button blue text-uppercase mb-4", disabled: processing, children: "Let's Do This" }),
          /* @__PURE__ */ jsx(
            Link$1,
            {
              href: route("login"),
              className: "text-blue-600 font-bold text-sm hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              children: "Already on LinkPro? Login Now"
            }
          )
        ] })
      ] }) })
    ] }) }) })
  ] });
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ml-4", disabled: processing, children: "Reset Password" }) })
    ] })
  ] });
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Email Verification" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another." }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Resend Verification Email" }),
      /* @__PURE__ */ jsx(
        Link$1,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          children: "Log Out"
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
const LoginModal = ({ setShowLogin }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    identity: "",
    password: ""
  });
  const [active, setActive] = useState("");
  useEffect(() => {
    setActive("active");
  }, []);
  const handleClose = (e) => {
    e.preventDefault();
    setActive("");
    setTimeout(() => {
      setShowLogin(false);
    }, 300);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/custom-login", {
      preserveScroll: true,
      onSuccess: () => window.location.reload()
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: `modal fade form_page ${active}`, id: "loginModal", tabIndex: "-1", role: "dialog", "aria-labelledby": "loginModal", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx(InputAnimations, {}),
    /* @__PURE__ */ jsxs("div", { className: "modal-content card guest login_form bg-white", children: [
      /* @__PURE__ */ jsx("div", { className: "standard_heading", children: /* @__PURE__ */ jsx("h3", { className: "modal-title text-center", id: "loginModal", children: "Log In" }) }),
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "close",
          "aria-label": "Close",
          href: "#",
          onClick: (e) => handleClose(e),
          children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-x-circle", viewBox: "0 0 16 16", children: [
            /* @__PURE__ */ jsx("path", { d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" }),
            /* @__PURE__ */ jsx("path", { d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "modal-body", children: /* @__PURE__ */ jsxs("form", { id: "custom_login_form", method: "POST", onSubmit: (e) => handleSubmit(e), children: [
        /* @__PURE__ */ jsx("div", { className: "w-full mx-auto mb-3", children: /* @__PURE__ */ jsx("span", { className: "invalid-feedback", role: "alert" }) }),
        /* @__PURE__ */ jsxs("div", { className: "w-full mx-auto relative p-0 mb-4", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "identity",
              type: "text",
              className: "w-full animate",
              name: "identity",
              value: data.identity,
              required: true,
              autoFocus: true,
              onChange: (e) => setData("identity", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "identity", children: "E-mail or UserName" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.identity, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full mx-auto relative p-0 mb-4", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "password",
              type: "password",
              className: "form-control animate w-full",
              name: "password",
              value: data.password,
              required: true,
              autoComplete: "current-password",
              onChange: (e) => setData("password", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full mx-auto p-0", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "button blue text-uppercase", children: "Log In" }) })
      ] }) })
    ] })
  ] });
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LoginModal
}, Symbol.toStringTag, { value: "Module" }));
const EventBus = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  }
};
const checkSubStatus = (userSub) => {
  if (userSub) {
    const { braintree_status, ends_at, braintree_id } = { ...userSub };
    if (braintree_id === "bypass") {
      return true;
    } else {
      if (braintree_status === "active" || braintree_status === "pending") {
        return true;
      }
      if (ends_at) {
        const currentDate = (/* @__PURE__ */ new Date()).valueOf();
        let t = ends_at.split(/[- :]/);
        let d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
        const endsAt = new Date(d);
        if (endsAt > currentDate) {
          return true;
        }
      }
    }
  }
  return false;
};
const checkIcon = (icon, type, subStatus) => {
  let asset;
  if (type === "preview") {
    asset = Vapor.asset("images/icon-placeholder-preview.png");
  } else {
    asset = Vapor.asset("images/icon-placeholder.png");
  }
  if (icon && icon.toString().includes("custom")) {
    return subStatus ? icon : asset;
  } else {
    return icon;
  }
};
const getMailchimpLists = () => {
  return axios$1.get("/mailchimp/list").then(
    (response) => {
      const lists = response.data.lists;
      return {
        success: true,
        lists
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors) {
        EventBus.dispatch("error", { message: error.response.data.errors });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const removeMailchimpConnection = () => {
  return axios$1.put("/mailchimp/remove-connection").then(
    (response) => {
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors) {
        EventBus.dispatch("error", { message: error.response.data.errors });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const getAllProducts = (storeId) => {
  return axios$1.get("/shopify/get-products/" + storeId).then(
    (response) => {
      const products = response.data.products;
      return {
        success: true,
        products: !isEmpty(products) ? products : null
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors) {
        EventBus.dispatch("error", { message: error.response.data.errors });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const getStores = () => {
  return axios$1.get("/shopify/get-stores").then(
    (response) => {
      const stores = response.data.stores;
      return {
        success: true,
        stores: !isEmpty(stores) ? stores : null
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors) {
        EventBus.dispatch("error", { message: error.response.data.errors });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const acceptTerms = () => {
  return axios$1.post("/store-affiliate").then(
    (response) => {
      console.log(JSON.stringify(response.data.success));
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors) {
        EventBus.dispatch("error", { message: error.response.data.errors });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updateUserInfo = (packets, userId) => {
  return axios$1.put("/update-account/" + userId, packets).then(
    (response) => {
      const messageData = response.data.message;
      let message = "";
      if (messageData.email && messageData.password) {
        message = "Your email and password have been updated";
      } else if (messageData.email) {
        message = "Your email has been updated";
      } else {
        message = "Your password has been updated";
      }
      EventBus.dispatch("success", { message });
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response) {
      EventBus.dispatch("error", { message: "there was a problem updating your info" });
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const getUserPages = () => {
  return axios$1.get("/get-user-pages").then(
    (response) => {
      const pages = response.data.pages;
      return {
        success: true,
        pages
      };
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const registerUser = (packets) => {
  return axios$1.post("/course-register", packets).then(
    (response) => {
      const success = response.data.success;
      const user2 = response.data.user;
      const errors = response.data.errors;
      if (success) {
        return {
          success: true,
          user: user2
        };
      } else {
        return {
          success: false,
          errors
        };
      }
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const purchaseCourse = (packets) => {
  return axios$1.post("/checkout/purchase", packets).then(
    (response) => {
      const success = response.data.success;
      const url = response.data.url;
      const message = response.data.message;
      return {
        success,
        message,
        url
      };
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const Flash = ({ msg, type, removeFlash }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeFlash();
    }, 4e3);
    return () => clearTimeout(timeout);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "message_wrap", children: /* @__PURE__ */ jsxs("div", { className: "display_message alert", children: [
    /* @__PURE__ */ jsx("div", { className: "icon_wrap", children: type === "success" ? /* @__PURE__ */ jsx(MdCheckCircle, {}) : /* @__PURE__ */ jsx("div", { className: "error", children: /* @__PURE__ */ jsx(MdCancel, {}) }) }),
    /* @__PURE__ */ jsx("p", { children: msg })
  ] }) });
};
const SetFlash = () => {
  const [flash, setFlash] = useState({
    show: false,
    type: "",
    msg: ""
  });
  useEffect(() => {
    EventBus.on("success", (data) => {
      if (data.message) {
        showFlash(true, "success", data.message.replace(/"/g, ""));
      }
    });
    return () => EventBus.remove("success");
  }, []);
  useEffect(() => {
    EventBus.on("error", (data) => {
      if (data.message) {
        showFlash(true, "error", data.message.replace(/"/g, ""));
      }
    });
    return () => EventBus.remove("error");
  }, []);
  const showFlash = (show = false, type = "", msg = "") => {
    setFlash({ show, type, msg });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: flash.show && /* @__PURE__ */ jsx(
    Flash,
    {
      ...flash,
      removeFlash: showFlash
    }
  ) });
};
const Loader = ({ showLoader }) => {
  return /* @__PURE__ */ jsx("div", { className: "loader_popup", style: { position: `${showLoader.position}` }, children: /* @__PURE__ */ jsx("div", { className: "loader_wrap", children: showLoader.icon === "upload" ? /* @__PURE__ */ jsx("span", { className: "loader", children: " " }) : /* @__PURE__ */ jsx("div", { id: "loading_spinner", className: "active", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/spinner.svg"), alt: "" }) }) }) });
};
const CheckoutLayout = ({
  auth,
  token,
  offer,
  course,
  creator,
  affRef,
  clickId
}) => {
  const [showLoader, setShowLoader] = useState({
    show: false,
    icon: "",
    position: ""
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [showLogin, setShowLogin] = useState(false);
  const [braintreeInstance, setBraintreeInstance] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showRegisterForm, setShowRegisterForm] = useState(true);
  const loadRef = useRef(true);
  useEffect(() => {
    const firstRender = loadRef.current;
    if (firstRender) {
      loadRef.current = false;
      braintree.dropin.create({
        authorization: token,
        selector: "#bt-dropin",
        paypal: {
          flow: "vault"
        },
        googlePay: {
          googlePayVersion: 2,
          merchantId: "0764-6991-5982",
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPrice: offer.price,
            currencyCode: "USD"
          }
        },
        venmo: {
          allowDesktop: true,
          paymentMethodUsage: "multi_use"
        },
        applePay: {
          displayName: "LinkPro",
          paymentRequest: {
            total: {
              label: "LinkPro",
              amount: offer.price
            },
            // We recommend collecting billing address information, at minimum
            // billing postal code, and passing that billing postal code with all
            // Apple Pay transactions as a best practice.
            requiredBillingContactFields: ["postalAddress"]
          }
        }
      }, function(createErr, instance) {
        if (createErr) {
          console.log("Create Error", createErr);
          return;
        }
        setBraintreeInstance(instance);
      });
    } else {
      console.log("Not a first Render");
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader({
      show: true,
      position: "absolute",
      icon: ""
    });
    setFormErrors({});
    if (!auth.user.userInfo) {
      const packets = {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
        password_confirmation: registerData.password_confirmation,
        course_creator: creator,
        course_id: course.id
      };
      registerUser(packets).then((response) => {
        if (response.success) {
          readyForPurchase(response.user);
        } else {
          if (response.errors.username) {
            setFormErrors((prev) => ({
              ...prev,
              username: response.errors.username[0]
            }));
          }
          if (response.errors.email) {
            setFormErrors((prev) => ({
              ...prev,
              email: response.errors.email[0]
            }));
          }
          if (response.errors.password) {
            setFormErrors((prev) => ({
              ...prev,
              password: response.errors.password[0]
            }));
          }
          setShowLoader({
            show: false,
            position: "",
            icon: ""
          });
        }
      });
    } else {
      readyForPurchase();
    }
  };
  const readyForPurchase = (user2 = null) => {
    braintreeInstance.requestPaymentMethod(
      function(err, payload) {
        if (err) {
          console.log("Request Payment Method Error", err);
          EventBus.dispatch("error", { message: "Request Payment Method Error" });
          setShowRegisterForm(false);
          setShowLoader({
            show: false,
            position: "",
            icon: ""
          });
          return;
        }
        const packets = {
          payment_method_nonce: payload.nonce,
          offer: offer.id,
          user: user2,
          clickId,
          affRef
        };
        purchaseCourse(packets).then((response) => {
          if (response.success) {
            router.get(response.url, { message: JSON.stringify(response.message) });
          } else {
            EventBus.dispatch("error", { message: JSON.stringify(response.message) });
            setShowLoader({
              show: false,
              position: "",
              icon: ""
            });
          }
        });
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx(InputAnimations, {}),
    /* @__PURE__ */ jsx(SetFlash, {}),
    /* @__PURE__ */ jsxs("div", { className: "my_row form_page checkout course_purchase text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "page_title text-center !mb-10", children: "Checkout Now" }),
      /* @__PURE__ */ jsx("div", { className: `card w-full inline-block my-auto ${isEmpty(auth.user.userInfo) && "guest"}`, children: /* @__PURE__ */ jsxs("div", { className: "card-body text-left w-full inline-block", children: [
        /* @__PURE__ */ jsx("div", { className: "course_banner", style: { background: course.header_color }, children: /* @__PURE__ */ jsx("div", { className: "image_wrap w-50 mx-auto", children: /* @__PURE__ */ jsx("img", { src: course.logo, alt: "" }) }) }),
        /* @__PURE__ */ jsxs(
          "form",
          {
            method: "post",
            action: "",
            className: "my_row !min-w-full",
            id: "payment-form",
            children: [
              /* @__PURE__ */ jsx("div", { className: "text_wrap text-center", children: /* @__PURE__ */ jsxs("h3", { children: [
                "You are purchasing ",
                course.title,
                " course for $",
                offer.price
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: `column_wrap ${isEmpty(auth.user.userInfo) ? "columns-1 md:columns-2" : "columns-1"} `, children: [
                isEmpty(auth.user.userInfo) && showRegisterForm && /* @__PURE__ */ jsxs("section", { id: "account_register", className: "w-full inline-block", children: [
                  /* @__PURE__ */ jsx("h4", { children: "Register for an account" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative mb-5", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "username",
                        type: "text",
                        className: `animate w-full ${formErrors.username && "error"} ${registerData.username && " active"}`,
                        name: "username",
                        value: registerData.username,
                        required: true,
                        autoComplete: "username",
                        onChange: (e) => setRegisterData(
                          (prev) => ({
                            ...prev,
                            username: e.target.value
                          })
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx("label", { htmlFor: "username", children: "Username" }),
                    formErrors.username && /* @__PURE__ */ jsx("span", { id: "username_error", className: "invalid-feedback", role: "alert", children: formErrors.username })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "relative mb-5", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "email",
                        type: "email",
                        className: `animate w-full ${formErrors.email && "error"} ${registerData.username && " active"}`,
                        name: "email",
                        value: registerData.email,
                        required: true,
                        autoComplete: "email",
                        onChange: (e) => setRegisterData(
                          (prev) => ({
                            ...prev,
                            email: e.target.value
                          })
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "E-mail Address" }),
                    formErrors.email && /* @__PURE__ */ jsx("span", { id: "email_error", className: "invalid-feedback", role: "alert", children: formErrors.email })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "relative mb-5", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "password",
                        type: "password",
                        value: registerData.password,
                        className: `animate w-full ${formErrors.password && "error"} ${registerData.username && " active"}`,
                        name: "password",
                        required: true,
                        autoComplete: "new-password",
                        onChange: (e) => setRegisterData(
                          (prev) => ({
                            ...prev,
                            password: e.target.value
                          })
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password" }),
                    formErrors.password && /* @__PURE__ */ jsx("span", { id: "password_error", className: "invalid-feedback", role: "alert", children: formErrors.password })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-5 relative", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "password-confirm",
                        value: registerData.password_confirmation,
                        type: "password",
                        className: "animate w-full",
                        name: "password_confirmation",
                        required: true,
                        autoComplete: "new-password",
                        onChange: (e) => setRegisterData(
                          (prev) => ({
                            ...prev,
                            password_confirmation: e.target.value
                          })
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx("label", { htmlFor: "password-confirm", children: "Confirm Password" })
                  ] }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    "Already have an account?",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        style: { cursor: "pointer" },
                        href: "#",
                        onClick: (e) => {
                          e.preventDefault();
                          setShowLogin(true);
                        },
                        children: "Click Here To Login"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("section", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "drop_in_wrap", children: /* @__PURE__ */ jsx("div", { className: "bt-drop-in-wrapper", children: /* @__PURE__ */ jsx("div", { id: "bt-dropin" }) }) }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "button_wrap my_row", children: /* @__PURE__ */ jsx(
                "a",
                {
                  className: "button blue",
                  href: "#",
                  onClick: (e) => handleSubmit(e),
                  children: "Submit"
                }
              ) })
            ]
          }
        ),
        showLoader.show && /* @__PURE__ */ jsx(
          Loader,
          {
            showLoader
          }
        )
      ] }) })
    ] }),
    showLogin && /* @__PURE__ */ jsx(
      LoginModal,
      {
        setShowLogin
      }
    )
  ] });
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CheckoutLayout
}, Symbol.toStringTag, { value: "Module" }));
function Checkout({
  auth,
  token,
  offer,
  course,
  creator,
  affRef,
  clickId
}) {
  return /* @__PURE__ */ jsx(Fragment, { children: isEmpty(auth.user.userInfo) ? /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Checkout" }),
    /* @__PURE__ */ jsx(
      CheckoutLayout,
      {
        auth,
        token,
        offer,
        course,
        creator,
        affRef,
        clickId
      }
    )
  ] }) : /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Checkout" }),
    /* @__PURE__ */ jsx(
      CheckoutLayout,
      {
        auth,
        token,
        offer,
        course,
        creator,
        affRef,
        clickId
      }
    )
  ] }) });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Checkout
}, Symbol.toStringTag, { value: "Module" }));
const ContactForm = () => {
  const { data, setData, post, processing, errors, wasSuccessful } = useForm({
    name: "",
    email: "",
    reason: "general",
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("contact.send"));
  };
  return /* @__PURE__ */ jsx(Fragment, { children: wasSuccessful ? /* @__PURE__ */ jsxs("div", { className: "success_message", children: [
    /* @__PURE__ */ jsx(BiMailSend, {}),
    /* @__PURE__ */ jsx("h3", { children: "Your Inquiry Has Been Sent." }),
    /* @__PURE__ */ jsx("p", { children: "We will get back to you soon!" })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { className: "form_text mb-5 px-5", children: "Got questions? Need Support? Want to inquire about business opportunities? Send us a message and we'll respond as soon as possible" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "form-group relative p-0 mb-5", children: [
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            type: "text",
            name: "name",
            value: data.name,
            className: "block w-full animate",
            isFocused: true,
            onChange: (e) => setData("name", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2 text-left" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-group relative p-0 mb-5", children: [
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "block w-full animate",
            isFocused: true,
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "E-mail Address" }),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2 text-left" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-group relative p-0 mb-5", children: [
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "active",
            name: "reason",
            id: "reason",
            onChange: (e) => setData("reason", e.target.value),
            value: data.reason,
            children: [
              /* @__PURE__ */ jsx("option", { value: "general", children: "General" }),
              /* @__PURE__ */ jsx("option", { value: "support", children: "Account Support" }),
              /* @__PURE__ */ jsx("option", { value: "business", children: "Business Inquiries" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("label", { htmlFor: "reason", children: "Reason For Contact" }),
        /* @__PURE__ */ jsx(InputError, { message: errors.reason, className: "mt-2 text-left" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-group row relative", children: [
        /* @__PURE__ */ jsx(
          "textarea",
          {
            className: "animate",
            name: "message",
            rows: "10",
            value: data.message,
            onChange: (e) => setData("message", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx("label", { htmlFor: "message", children: "Message" }),
        /* @__PURE__ */ jsx(InputError, { message: errors.message, className: "mt-2 text-left" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "form-group row", children: /* @__PURE__ */ jsx("div", { className: "col-sm-10 mx-auto", children: /* @__PURE__ */ jsx("button", { className: "button blue", type: "submit", disabled: processing, children: "Submit" }) }) })
    ] })
  ] }) });
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContactForm
}, Symbol.toStringTag, { value: "Module" }));
const ContactLayout = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Contact Us" }),
    /* @__PURE__ */ jsx("div", { className: "container", id: "contact_page", children: /* @__PURE__ */ jsx("div", { className: "my_row form_page", children: /* @__PURE__ */ jsxs("div", { className: "card guest", children: [
      /* @__PURE__ */ jsx("h2", { className: "page_title text-center !mb-2", children: "Contact Us" }),
      /* @__PURE__ */ jsx("div", { id: "contact_form", className: "card-body text-center", children: /* @__PURE__ */ jsx(ContactForm, {}) })
    ] }) }) })
  ] });
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContactLayout
}, Symbol.toStringTag, { value: "Module" }));
function Contact$1({ auth }) {
  return /* @__PURE__ */ jsx(Fragment, { children: isEmpty(auth.user.userInfo) ? /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Contact Us" }),
    /* @__PURE__ */ jsx(ContactLayout, {})
  ] }) : /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Contact Us" }),
    /* @__PURE__ */ jsx(ContactLayout, {})
  ] }) });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Contact$1
}, Symbol.toStringTag, { value: "Module" }));
const updateImage$1 = (packets, id) => {
  return axios$1.patch("/creator-center/course/save-image/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      return {
        success: true,
        imagePath: response.data.imagePath
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      EventBus.dispatch(
        "error",
        { message: "There was an error saving your image." }
      );
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updateData$1 = (packets, id, elementName) => {
  return axios$1.patch("/creator-center/course/save-data/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      const slug = response.data.slug;
      if (!returnMessage.includes("color")) {
        EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      }
      return {
        success: true,
        slug
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      if (error.response.data.errors[elementName] !== void 0) {
        EventBus.dispatch(
          "error",
          { message: error.response.data.errors[elementName][0] }
        );
      }
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const addSection$1 = (packets, id, elementName) => {
  return axios$1.post("/creator-center/course/add-section/" + id, packets).then(
    (response) => {
      return {
        success: true,
        section: response.data.section
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      if (error.response.data.errors[elementName] !== void 0) {
        EventBus.dispatch(
          "error",
          { message: error.response.data.errors[elementName][0] }
        );
      }
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updateSectionData$1 = (packets, id, elementName) => {
  return axios$1.patch("/creator-center/course/update-section-data/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      if (!returnMessage.includes("color") && !returnMessage.includes("button")) {
        EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      }
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      if (error.response.data.errors[elementName] !== void 0) {
        EventBus.dispatch(
          "error",
          { message: error.response.data.errors[elementName][0] }
        );
      }
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const deleteSection$1 = (id, packets) => {
  return axios$1.put("/creator-center/course/delete-section/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      EventBus.dispatch(
        "error",
        { message: "There was an error deleting the section." }
      );
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const getCourseCategories = () => {
  return axios$1.get("/get-course-categories").then(
    (response) => {
      const categories2 = response.data.categories;
      return {
        success: true,
        categories: categories2
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updateSectionsPositions$1 = (packets) => {
  return axios$1.patch("/creator-center/course/update-sections-positions", packets).then(
    (response) => {
      const returnedResponse = response.data.message;
      console.log(returnedResponse);
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const AddSectionLink$1 = ({
  sections,
  setSections,
  courseID,
  setOpenIndex,
  type
}) => {
  const handleOnClick = (e) => {
    e.preventDefault();
    const packets = {
      type
    };
    addSection$1(packets, courseID).then((response) => {
      if (response.success) {
        setSections([
          ...sections,
          response.section
        ]);
        const newIndex = sections.length;
        setOpenIndex((prev) => [
          ...prev,
          newIndex
        ]);
        setTimeout(function() {
          document.querySelector(".sections_wrap .section_row:last-child").scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
        }, 800);
      }
    });
  };
  return /* @__PURE__ */ jsxs("a", { className: "icon_wrap", href: "#", onClick: (e) => handleOnClick(e), children: [
    /* @__PURE__ */ jsx(ImPlus, {}),
    /* @__PURE__ */ jsxs("h3", { children: [
      "Add ",
      capitalize(type),
      " Section"
    ] })
  ] });
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AddSectionLink$1
}, Symbol.toStringTag, { value: "Module" }));
const categories = user.categories;
const CategoryComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  return /* @__PURE__ */ jsx("div", { className: "edit_form", children: /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, children: [
    /* @__PURE__ */ jsx(InputLabel$1, { id: "category_select_label", children: "Select Category" }),
    /* @__PURE__ */ jsxs(
      Select,
      {
        native: true,
        labelId: "category_select_label",
        id: "category_select",
        label: "Select Category",
        defaultValue: selectedCategory,
        onChange: (e) => handleChange(e),
        children: [
          /* @__PURE__ */ jsx("option", { value: "" }),
          categories == null ? void 0 : categories.map((category) => {
            const { id, name: name2, children } = category;
            return children.length > 0 ? /* @__PURE__ */ jsxs("optgroup", { label: name2, children: [
              children.map((child) => {
                const { id: id2, name: name22 } = child;
                return /* @__PURE__ */ jsx("option", { value: id2, children: name22 }, id2);
              }),
              /* @__PURE__ */ jsxs("option", { value: id, children: [
                "Other ",
                name2
              ] }, children.length)
            ] }, id) : /* @__PURE__ */ jsx("option", { value: id, children: name2 }, id);
          })
        ]
      }
    )
  ] }) });
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CategoryComponent
}, Symbol.toStringTag, { value: "Module" }));
const LP_ACTIONS$1 = {
  UPDATE_PAGE_DATA: "update-page-data"
};
function reducer$2(data, action) {
  switch (action.type) {
    case LP_ACTIONS$1.UPDATE_PAGE_DATA:
      return {
        ...data,
        [`${action.payload.name}`]: action.payload.value
      };
  }
}
const OFFER_ACTIONS = {
  UPDATE_OFFER_DATA: "update-offer-data"
};
function offerDataReducer(data, action) {
  switch (action.type) {
    case OFFER_ACTIONS.UPDATE_OFFER_DATA:
      return {
        ...data,
        [`${action.payload.name}`]: action.payload.value
      };
  }
}
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LP_ACTIONS: LP_ACTIONS$1,
  OFFER_ACTIONS,
  offerDataReducer,
  reducer: reducer$2
}, Symbol.toStringTag, { value: "Module" }));
const ColorPicker$1 = ({
  label,
  elementName,
  courseData = null,
  dispatch = null,
  sections = null,
  setSections = null,
  currentSection = null
}) => {
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "",
    g: "",
    b: "",
    a: "0"
  });
  const { r, g, b, a } = sketchPickerColor;
  const [showPicker, setShowPicker] = useState(false);
  const [pickerBg, setPickerBg] = useState({});
  const [colorValues, setColorValues] = useState({
    previous: null,
    current: null
  });
  useEffect(() => {
    setPickerBg({ background: `rgba(${r} , ${g} , ${b} , ${a})` });
  }, [sketchPickerColor]);
  useEffect(() => {
    if (currentSection) {
      let element = elementName.split(/(\d+)/);
      element = element[2].replace("_", "");
      let color;
      if (element === "text_color" && !currentSection[element]) {
        color = "rgba(0,0,0,1)";
      } else if (element === "bg_color" && !currentSection[element]) {
        color = "rgba(255,255,255,1)";
      } else {
        color = currentSection[element];
      }
      setPickerBg({ background: color });
      setColorValues((prev) => ({
        ...prev,
        previous: color
      }));
    } else {
      setPickerBg({ background: courseData[elementName] });
      setColorValues((prev) => ({
        ...prev,
        previous: courseData[elementName]
      }));
    }
  }, []);
  const handleOnChange = (color) => {
    setSketchPickerColor(color);
    const value = `rgba(${color.r} , ${color.g} , ${color.b} , ${color.a})`;
    if (sections) {
      let element = elementName.split(/(\d+)/);
      element = element[2].replace("_", "");
      setSections(sections.map((section2) => {
        if (section2.id === currentSection.id) {
          return {
            ...section2,
            [`${element}`]: value
          };
        }
        return section2;
      }));
    } else {
      dispatch({
        type: LP_ACTIONS$1.UPDATE_PAGE_DATA,
        payload: {
          value,
          name: elementName
        }
      });
    }
    setColorValues((prev) => ({
      ...prev,
      current: value
    }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (sections) {
      let element = elementName.split(/(\d+)/);
      element = element[2].replace("_", "");
      const packets = {
        [`${element}`]: colorValues.current
      };
      updateSectionData$1(packets, currentSection.id).then((response) => {
        if (response.success) {
          setColorValues({
            previous: colorValues.current,
            current: colorValues.current
          });
          setShowPicker(false);
        }
      });
    } else {
      const packets = {
        [`${elementName}`]: colorValues.current
      };
      updateData$1(packets, courseData["id"], elementName).then((response) => {
        if (response.success) {
          setShowPicker(false);
          setColorValues({
            previous: colorValues.current,
            current: colorValues.current
          });
        }
      });
    }
  };
  const handleClose = (e) => {
    e.preventDefault();
    if (sections) {
      let element = elementName.split(/(\d+)/);
      element = element[2].replace("_", "");
      setSections(sections.map((section2) => {
        if (section2.id === currentSection.id) {
          return {
            ...section2,
            [`${element}`]: colorValues.previous
          };
        }
        return section2;
      }));
    } else {
      dispatch({
        type: LP_ACTIONS$1.UPDATE_PAGE_DATA,
        payload: {
          value: colorValues.previous,
          name: elementName
        }
      });
    }
    setColorValues({
      previous: colorValues.previous,
      current: colorValues.previous
    });
    setPickerBg({ background: colorValues.previous });
    setShowPicker(false);
  };
  return /* @__PURE__ */ jsxs("article", { className: "my_row page_settings border_wrap", children: [
    /* @__PURE__ */ jsx("h4", { children: label }),
    /* @__PURE__ */ jsxs("div", { className: "icon_wrap", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#",
          onClick: (e) => {
            e.preventDefault();
            setShowPicker(!showPicker);
          },
          children: [
            /* @__PURE__ */ jsx("span", { className: "color_wrap", children: /* @__PURE__ */ jsx(
              "span",
              {
                className: "color_box",
                style: pickerBg
              }
            ) }),
            "Edit"
          ]
        }
      ),
      showPicker && /* @__PURE__ */ jsxs("div", { className: "picker_wrapper", children: [
        /* @__PURE__ */ jsx("div", { className: "close_icon icon_wrap", children: /* @__PURE__ */ jsx("a", { href: "#", onClick: (e) => {
          handleClose(e);
        }, children: /* @__PURE__ */ jsx(RiCloseCircleFill, {}) }) }),
        /* @__PURE__ */ jsx(
          SketchPicker,
          {
            onChange: (color) => {
              handleOnChange(color.rgb);
            },
            color: sketchPickerColor,
            width: 300
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "button blue",
            href: "#",
            onClick: (e) => {
              handleSave(e);
            },
            children: "Save"
          }
        )
      ] })
    ] })
  ] });
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ColorPicker$1
}, Symbol.toStringTag, { value: "Module" }));
const DeleteSection$1 = ({ id, sections, setSections, setOpenIndex }) => {
  const handleDeleteClick = (e) => {
    e.preventDefault();
    setOpenIndex([]);
    const newSectionsArray = sections.filter((section2) => {
      return section2.id !== id;
    });
    const packets = {
      sections: newSectionsArray
    };
    deleteSection$1(id, packets).then((response) => {
      if (response.success) {
        setSections(newSectionsArray);
      }
    });
  };
  return /* @__PURE__ */ jsx(
    "a",
    {
      className: "button red ml-auto",
      href: "#",
      onClick: (e) => handleDeleteClick(e),
      children: "Delete Section"
    }
  );
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteSection$1
}, Symbol.toStringTag, { value: "Module" }));
const DropdownComponent$2 = ({
  id,
  dispatch,
  value,
  categories: categories2
}) => {
  const [selectedCategory, setSelectedCategory] = useState(value);
  const handleChange = (e) => {
    const value2 = e.target.value;
    const packets = {
      category: value2
    };
    updateData$1(packets, id).then((response) => {
      if (response.success) {
        dispatch({
          type: LP_ACTIONS$1.UPDATE_PAGE_DATA,
          payload: {
            value: value2,
            name: "category"
          }
        });
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "edit_form", children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        className: selectedCategory !== "" ? "active" : "",
        id: "category_select",
        defaultValue: selectedCategory,
        onChange: (e) => handleChange(e),
        onBlur: (e) => HandleBlur(e.target),
        onFocus: (e) => HandleFocus$1(e.target),
        children: [
          /* @__PURE__ */ jsx("option", { value: "" }),
          categories2 == null ? void 0 : categories2.map((category) => {
            const { id: id2, name: name2, children, parent_id } = category;
            return children.length > 0 ? /* @__PURE__ */ jsxs("optgroup", { label: name2, "data-parent": parent_id, children: [
              children.map((child) => {
                const { id: id3, name: name22 } = child;
                return /* @__PURE__ */ jsx("option", { value: id3, children: name22 }, id3);
              }),
              /* @__PURE__ */ jsxs("option", { value: id2, children: [
                "Other ",
                name2
              ] }, children.length)
            ] }, id2) : /* @__PURE__ */ jsx("option", { value: id2, children: name2 }, id2);
          })
        ]
      }
    ),
    /* @__PURE__ */ jsx("label", { id: "category_select_label", children: "Select Category" })
  ] });
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DropdownComponent$2
}, Symbol.toStringTag, { value: "Module" }));
const ReactCrop = "";
const socialArray = [
  "facebook",
  "instagram",
  "twitter",
  "tiktok",
  "snapchat",
  "youtube",
  "onlyfans",
  "email",
  "google mail",
  "phone",
  "slack",
  "telegram",
  "skype"
];
const TO_RADIANS = Math.PI / 180;
async function canvasPreview(image, canvas, crop, scale = 1, rotate = 0) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;
  ctx.save();
  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateRads);
  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );
  ctx.restore();
}
const createImage = (file, setUpImg) => {
  let reader = new FileReader();
  reader.addEventListener("load", (e) => {
    setUpImg(e.target.result);
  });
  reader.readAsDataURL(file);
};
const getIconPaths = (iconPaths) => {
  let iconArray = [];
  iconPaths.map((iconPath) => {
    const end = iconPath.lastIndexOf("/");
    const newPath = iconPath.slice(end);
    const newArray = newPath.split(".");
    const iconName = newArray[0].replace("/", "");
    const tmp = { "name": iconName.replace("-", " "), "path": iconPath };
    iconArray.push(tmp);
  });
  let count = 0;
  socialArray.map((name2, index2) => {
    const iconIndex = iconArray.findIndex((object) => {
      return toLower(object.name) === name2;
    });
    move(iconArray, iconIndex, count);
    ++count;
  });
  return iconArray;
};
function useDebounceEffect(fn, waitTime, deps) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(void 0, deps);
    }, waitTime);
    return () => {
      clearTimeout(t);
    };
  }, deps);
}
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
function onImageLoad(e, aspect, setCrop) {
  if (aspect) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  }
}
const getFileToUpload = async (ref) => {
  return await new Promise(function(resolve, reject) {
    ref.toBlob(
      (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(dataURLtoFile(reader.result, "cropped.jpg"));
        };
      },
      "image/png",
      1
    );
  });
};
const handleScaleChange = (e, scale, setScale, action) => {
  e.preventDefault();
  let result = null;
  if (action === "increase") {
    result = Math.round((scale + 0.1) * 10) / 10;
  }
  if (action === "decrease") {
    result = Math.round((scale - 0.1) * 10) / 10;
  }
  setScale(result);
};
const handleRotateChange = (e, rotate, setRotate, action) => {
  e.preventDefault();
  let result = null;
  if (action === "increase") {
    result = Math.min(180, Math.max(-180, Number(rotate + 1)));
  }
  if (action === "decrease") {
    result = Math.min(180, Math.max(-180, Number(rotate - 1)));
  }
  setRotate(result);
};
const dataURLtoFile = (dataurl, fileName) => {
  let arr = dataurl.split(","), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};
function move(arr, old_index, new_index) {
  while (old_index < 0) {
    old_index += arr.length;
  }
  while (new_index < 0) {
    new_index += arr.length;
  }
  if (new_index >= arr.length) {
    let k = new_index - arr.length;
    while (k-- + 1) {
      arr.push(void 0);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}
const updateIcon = (packets, id) => {
  return axios$1.patch("/creator-center/offer/update-icon/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      return {
        success: true,
        imagePath: response.data.imagePath
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      EventBus.dispatch(
        "error",
        { message: "There was an error saving your image." }
      );
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updateOfferData = (packets, id) => {
  return axios$1.patch("/creator-center/offer/update-data/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      EventBus.dispatch(
        "error",
        { message: "There was an error saving offer data." }
      );
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const publishOffer = (packets, id) => {
  return axios$1.patch("/creator-center/offer/publish/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      const status = JSON.stringify(response.data.success);
      EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      return {
        success: status
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      if (error.response.data.code == 400) {
        EventBus.dispatch(
          "error",
          { message: error.response.data.message }
        );
      } else {
        EventBus.dispatch(
          "error",
          { message: "There was an error saving offer data." }
        );
      }
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const CropTools = ({
  rotate,
  setRotate,
  scale,
  setScale
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "crop_tools", children: [
    /* @__PURE__ */ jsxs("div", { className: "column", children: [
      /* @__PURE__ */ jsx("a", { href: "#", className: "number_control", onClick: (e) => handleScaleChange(e, scale, setScale, "decrease"), children: /* @__PURE__ */ jsx(HiMinus, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "active animate",
            id: "scale-input",
            type: "text",
            step: "0.1",
            value: scale,
            onChange: (e) => setScale(Number(e.target.value))
          }
        ),
        /* @__PURE__ */ jsx("label", { htmlFor: "scale-input", children: "Scale" })
      ] }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "number_control", onClick: (e) => handleScaleChange(e, scale, setScale, "increase"), children: /* @__PURE__ */ jsx(HiPlus, {}) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "column", children: [
      /* @__PURE__ */ jsx("a", { href: "#", className: "number_control", onClick: (e) => handleRotateChange(e, rotate, setRotate, "decrease"), children: /* @__PURE__ */ jsx(HiMinus, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "active animate",
            id: "rotate-input",
            type: "text",
            value: rotate,
            onChange: (e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
          }
        ),
        /* @__PURE__ */ jsx("label", { htmlFor: "rotate-input", children: "Rotate" })
      ] }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "number_control", onClick: (e) => handleRotateChange(e, rotate, setRotate, "increase"), children: /* @__PURE__ */ jsx(HiPlus, {}) })
    ] })
  ] });
};
const ImageComponent$1 = forwardRef(function ImageComponent2(props, ref) {
  var _a, _b, _c, _d, _e;
  const {
    placeholder,
    completedCrop,
    setCompletedCrop,
    setShowLoader,
    elementName,
    cropArray,
    data,
    dispatch = null,
    type
  } = props;
  const [disableButton, setDisableButton] = useState(true);
  const [elementLabel, setElementLabel] = useState(elementName);
  const [upImg, setUpImg] = useState("");
  const imgRef = useRef(null);
  const previewCanvasRef = ref;
  const [crop, setCrop] = useState(cropArray);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(cropArray["aspect"] || 16 / 9);
  useDebounceEffect(
    async () => {
      var _a2, _b2, _c2;
      if (((_a2 = completedCrop[elementName]) == null ? void 0 : _a2.isCompleted.width) && ((_b2 = completedCrop[elementName]) == null ? void 0 : _b2.isCompleted.height) && imgRef.current && (previewCanvasRef == null ? void 0 : previewCanvasRef.current[elementName])) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef == null ? void 0 : previewCanvasRef.current[elementName],
          (_c2 = completedCrop[elementName]) == null ? void 0 : _c2.isCompleted,
          scale,
          rotate
        );
      }
    },
    100,
    [(_a = completedCrop[elementName]) == null ? void 0 : _a.isCompleted, scale, rotate]
  );
  useEffect(() => {
    const words = elementName.split("_");
    setElementLabel(words.join(" "));
  }, [elementName]);
  const onSelectFile = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }
    setCrop(void 0);
    setDisableButton(false);
    document.querySelector("." + CSS.escape(elementName) + "_form .bottom_section").classList.remove("hidden");
    if (window.innerWidth < 993) {
      document.querySelector("." + CSS.escape(elementName) + "_form").scrollIntoView({
        behavior: "smooth"
      });
    }
    createImage(files[0], setUpImg);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableButton(true);
    const image = getFileToUpload(previewCanvasRef == null ? void 0 : previewCanvasRef.current[elementName]);
    image.then((value) => {
      fileUpload(value);
    }).catch((error) => {
      console.error(error);
      setDisableButton(false);
    });
  };
  const fileUpload = (image) => {
    setShowLoader({
      show: true,
      icon: "upload",
      position: "fixed"
    });
    window.Vapor.store(
      image,
      {
        visibility: "public-read"
      },
      {
        progress: (progress) => {
          this.uploadProgress = Math.round(progress * 100);
        }
      }
    ).then((response) => {
      const packets = {
        [`${elementName}`]: response.key,
        ext: response.extension
      };
      if (elementName.includes("icon")) {
        updateIcon(packets, data["id"]).then((data2) => {
          if (data2.success) {
            dispatch({
              type: OFFER_ACTIONS.UPDATE_OFFER_DATA,
              payload: {
                value: data2.imagePath,
                name: elementName
              }
            });
            setShowLoader({
              show: false,
              icon: "",
              position: ""
            });
            setUpImg(null);
            delete completedCrop[elementName];
            setCompletedCrop(completedCrop);
            document.querySelector("." + CSS.escape(elementName) + "_form .bottom_section").classList.add("hidden");
          } else {
            setShowLoader({
              show: false,
              icon: "",
              position: ""
            });
          }
        });
      } else {
        updateImage$1(packets, data["id"]).then((data2) => {
          if (data2.success) {
            dispatch({
              type: LP_ACTIONS$1.UPDATE_PAGE_DATA,
              payload: {
                value: data2.imagePath,
                name: elementName
              }
            });
            setShowLoader({
              show: false,
              icon: "",
              position: ""
            });
            setUpImg(null);
            delete completedCrop[elementName];
            setCompletedCrop(completedCrop);
            document.querySelector("." + CSS.escape(elementName) + "_form .bottom_section").classList.add("hidden");
          } else {
            setShowLoader({
              show: false,
              icon: "",
              position: ""
            });
          }
        });
      }
    }).catch((error) => {
      console.error(error);
      setDisableButton(false);
    });
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setUpImg(null);
    const copy = { ...completedCrop };
    delete copy[elementName];
    setCompletedCrop(copy);
    document.querySelector("." + CSS.escape(elementName) + "_form .bottom_section").classList.add("hidden");
  };
  return /* @__PURE__ */ jsx("article", { className: "my_row page_settings", children: /* @__PURE__ */ jsx("div", { className: "column_wrap", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: `${elementName}_form`, children: [
    !((_b = completedCrop[elementName]) == null ? void 0 : _b.isCompleted) && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "top_section", children: [
        /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: `${elementName}_file_upload`,
            className: "custom",
            children: [
              data["icon"] ? /* @__PURE__ */ jsx("img", { src: data["icon"], alt: "" }) : "",
              type === "extPreview" && placeholder,
              /* @__PURE__ */ jsxs("span", { className: "edit_icon", children: [
                /* @__PURE__ */ jsx(MdEdit, {}),
                /* @__PURE__ */ jsx("div", { className: "hover_text edit_image", children: /* @__PURE__ */ jsxs("p", { children: [
                  "Edit ",
                  elementLabel
                ] }) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            className: `custom ${data["icon"] ? "active" : ""}`,
            id: `${elementName}_file_upload`,
            type: "file",
            accept: "image/png, image/jpeg, image/jpg, image/gif",
            onChange: onSelectFile
          }
        ),
        type === "inlinePreview" && /* @__PURE__ */ jsx("label", { children: placeholder })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "my_row info_text file_types", children: /* @__PURE__ */ jsxs("p", { className: "m-0 char_count w-100 ", children: [
        "Allowed File Types:",
        /* @__PURE__ */ jsx("span", { children: "png, jpg, jpeg, gif" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bottom_section hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "crop_section", children: [
        /* @__PURE__ */ jsx(
          CropTools,
          {
            rotate,
            setRotate,
            scale,
            setScale
          }
        ),
        /* @__PURE__ */ jsx(
          ReactCrop$1,
          {
            crop,
            onChange: (_2, percentCrop) => setCrop(percentCrop),
            onComplete: (c) => setCompletedCrop({
              ...completedCrop,
              [`${elementName}`]: {
                isCompleted: c
              }
            }),
            aspect,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                onLoad: (e) => onImageLoad(e, aspect, setCrop),
                src: upImg,
                ref: imgRef,
                style: { transform: `scale(${scale}) rotate(${rotate}deg)` },
                alt: "Crop me"
              }
            )
          }
        ),
        type === "inlinePreview" && ((_c = completedCrop[elementName]) == null ? void 0 : _c.isCompleted) && /* @__PURE__ */ jsxs("div", { className: "icon_col", children: [
          /* @__PURE__ */ jsx("p", { children: "Icon Preview" }),
          /* @__PURE__ */ jsx(
            "canvas",
            {
              ref: (ref2) => previewCanvasRef.current[elementName] = ref2,
              style: {
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
                width: ((_d = completedCrop[elementName]) == null ? void 0 : _d.isCompleted) ? `100%` : 0,
                height: ((_e = completedCrop[elementName]) == null ? void 0 : _e.isCompleted) ? `100%` : 0,
                borderRadius: `20px`
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bottom_row", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "button green",
            disabled: disableButton,
            children: "Save"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "button transparent gray",
            href: "#",
            onClick: (e) => {
              handleCancel(e);
            },
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "help_link",
            href: "mailto:help@link.pro",
            children: "Need Help?"
          }
        )
      ] })
    ] })
  ] }) }) });
});
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ImageComponent$1
}, Symbol.toStringTag, { value: "Module" }));
const LP_ACTIONS = {
  UPDATE_PAGE_DATA: "update-page-data"
};
function reducer$1(pageData, action) {
  switch (action.type) {
    case LP_ACTIONS.UPDATE_PAGE_DATA:
      return {
        ...pageData,
        [`${action.payload.name}`]: action.payload.value
      };
  }
}
const __vite_glob_0_101 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LP_ACTIONS,
  reducer: reducer$1
}, Symbol.toStringTag, { value: "Module" }));
const updateImage = (packets, id) => {
  return axios$1.patch("/creator-center/landing-page/save-image/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      return {
        success: true,
        imagePath: response.data.imagePath
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      EventBus.dispatch(
        "error",
        { message: "There was an error saving your image." }
      );
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updateData = (packets, id, elementName) => {
  return axios$1.patch("/creator-center/landing-page/save-data/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      const slug = response.data.slug;
      if (!returnMessage.includes("color")) {
        EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      }
      return {
        success: true,
        slug
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      if (error.response.data.errors[elementName] !== void 0) {
        EventBus.dispatch(
          "error",
          { message: error.response.data.errors[elementName][0] }
        );
      }
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const addSection = (packets, id, elementName) => {
  return axios$1.post("/creator-center/landing-page/add-section/" + id, packets).then(
    (response) => {
      return {
        success: true,
        section: response.data.section
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      if (error.response.data.errors[elementName] !== void 0) {
        EventBus.dispatch(
          "error",
          { message: error.response.data.errors[elementName][0] }
        );
      }
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updateSectionData = (packets, id, elementName) => {
  return axios$1.patch("/creator-center/landing-page/update-section-data/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      if (!returnMessage.includes("color") && !returnMessage.includes("button")) {
        EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      }
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      if (error.response.data.errors[elementName] !== void 0) {
        EventBus.dispatch(
          "error",
          { message: error.response.data.errors[elementName][0] }
        );
      }
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updateSectionImage = (packets, id) => {
  return axios$1.patch("/creator-center/landing-page/update-section-image/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      return {
        success: true,
        imagePath: response.data.imagePath
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      EventBus.dispatch(
        "error",
        { message: "There was an error saving your image." }
      );
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const deleteSection = (id, packets) => {
  return axios$1.put("/creator-center/landing-page/delete-section/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      EventBus.dispatch(
        "error",
        { message: "There was an error deleting the section." }
      );
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const publishPage = (packets, id) => {
  return axios$1.patch("/creator-center/landing-page/publish/" + id, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      const status = JSON.stringify(response.data.success);
      EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      return {
        success: status
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      if (error.response.data.code == 400) {
        EventBus.dispatch(
          "error",
          { message: error.response.data.message }
        );
      } else {
        EventBus.dispatch(
          "error",
          { message: "There was an error saving page data." }
        );
      }
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const activatePage = (id) => {
  return axios$1.patch("/creator-center/landing-page/activate/" + id).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      const status = JSON.stringify(response.data.success);
      EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      return {
        success: status
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      if (error.response.data.code == 400) {
        EventBus.dispatch(
          "error",
          { message: error.response.data.message }
        );
      } else {
        EventBus.dispatch(
          "error",
          { message: "There was an error saving page data." }
        );
      }
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updateSectionsPositions = (packets) => {
  return axios$1.patch("/creator-center/landing-page/update-sections-positions", packets).then(
    (response) => {
      const returnedResponse = response.data.message;
      console.log(returnedResponse);
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const EditorComponent = ({
  dispatch,
  sections = null,
  setSections,
  currentSection = null,
  elementName,
  data,
  isValid,
  setIsValid,
  showTiny = null,
  setShowTiny = null
}) => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState("");
  const [editorValue, setEditorValue] = useState("");
  useEffect(() => {
    if (currentSection) {
      if (currentSection["text"] && isJSON(currentSection["text"])) {
        const allContent = JSON.parse(currentSection["text"]);
        allContent["blocks"] = allContent["blocks"].map((block) => {
          if (!block.text) {
            block.text = "";
          }
          return block;
        });
        setEditorState(draftToHtml(allContent));
      }
    } else {
      if (data["intro_text"] && isJSON(data["intro_text"])) {
        const allContent = JSON.parse(data["intro_text"]);
        allContent["blocks"] = allContent["blocks"].map((block) => {
          if (!block.text) {
            block.text = "";
          }
          return block;
        });
        setEditorState(draftToHtml(allContent));
      }
    }
  }, []);
  useEffect(() => {
    if (currentSection) {
      if (currentSection["text"] && isJSON(currentSection["text"]) && JSON.parse(currentSection["text"])["blocks"][0]["text"] !== "") {
        setIsValid(true);
      }
    } else {
      if (data["intro_text"] && isJSON(data["intro_text"]) && JSON.parse(data["intro_text"])["blocks"][0]["text"] !== "") {
        setIsValid(true);
      }
    }
  }, []);
  useEffect(() => {
    if (setShowTiny) {
      setShowTiny(true);
    }
  }, []);
  const handleEditorChange = () => {
    const value = editorRef.current.getContent();
    setEditorValue(value);
    if (value !== "") {
      setIsValid(true);
      if (sections) {
        let element = elementName.split(/(\d+)/);
        element = element[2].replace("_", "");
        setSections(sections.map((section2) => {
          if (section2.id === currentSection.id) {
            return {
              ...section2,
              [`${element}`]: value
            };
          }
          return section2;
        }));
      } else {
        dispatch({
          type: LP_ACTIONS.UPDATE_PAGE_DATA,
          payload: {
            value,
            name: elementName
          }
        });
      }
    } else {
      setIsValid(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const blocksFromHTML = htmlToDraft(editorValue);
      const { contentBlocks, entityMap } = blocksFromHTML;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const finalValue = convertToRaw(contentState);
      if (sections) {
        let element = elementName.split(/(\d+)/);
        element = element[2].replace("_", "");
        const packets = {
          [`${element}`]: finalValue
        };
        updateSectionData(packets, currentSection.id);
      } else {
        const packets = {
          [`${elementName}`]: finalValue
        };
        updateData$1(packets, data["id"], elementName).then((response) => {
          if (response.success && response.slug) {
            dispatch({
              type: LP_ACTIONS.UPDATE_PAGE_DATA,
              payload: {
                value: response.slug,
                name: "slug"
              }
            });
          }
        });
      }
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "page_settings border_wrap wysiwyg", children: showTiny && /* @__PURE__ */ jsx(
    Editor,
    {
      apiKey: "h3695sldkjcjhvyl34syvczmxxely99ind71gtafhpnxy8zj",
      onInit: (evt, editor) => editorRef.current = editor,
      initialValue: editorState,
      value: editorValue,
      onEditorChange: handleEditorChange,
      onBlur: (e) => handleSubmit(e),
      onSubmit: (e) => handleSubmit(e),
      init: {
        height: 500,
        width: "100%",
        menubar: false,
        menu: {
          file: {
            title: "File",
            items: ""
          },
          edit: {
            title: "Edit",
            items: "undo redo | cut copy paste pastetext | selectall | searchreplace"
          },
          view: {
            title: "View",
            items: "visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments"
          },
          insert: {
            title: "Insert",
            items: "link | emoticons hr | pagebreak "
          },
          format: {
            title: "Format",
            items: "bold italic underline strikethrough superscript subscript | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat"
          },
          tools: {
            title: "Tools",
            items: "spellchecker spellcheckerlanguage | a11ycheck wordcount"
          }
        },
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "fullscreen",
          "wordcount"
        ],
        toolbar: "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | forecolor backcolor",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
      }
    },
    currentSection ? currentSection.id : data.id
  ) });
};
const __vite_glob_0_89 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditorComponent
}, Symbol.toStringTag, { value: "Module" }));
const InputComponent$2 = ({
  placeholder,
  type,
  maxChar = null,
  hoverText: hoverText2,
  elementName,
  value,
  courseData = null,
  offerData = null,
  dispatch = null,
  dispatchOffer = null,
  sections = null,
  setSections = null,
  currentSection = null,
  showTiny = null,
  setShowTiny = null
}) => {
  const [charactersLeft, setCharactersLeft] = useState(maxChar);
  const [isValid, setIsValid] = useState(false);
  const limit = 1e3;
  const prefix = "$";
  useEffect(() => {
    if (maxChar) {
      if (value) {
        setCharactersLeft(maxChar - value.length);
        if (maxChar - value.length >= 0) {
          setIsValid(true);
        }
      } else {
        setCharactersLeft(maxChar);
      }
    }
  }, []);
  useEffect(() => {
    if ((type === "url" && checkValidity(value, "url") || type === "textarea") && value) {
      setIsValid(true);
    }
  }, []);
  useEffect(() => {
    if (type === "currency" && value) {
      setIsValid(true);
    }
  }, []);
  const handleCurrencyChange = (value2, _2) => {
    if (Number.isNaN(Number(value2)) || Number(value2) > limit) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    dispatchOffer({
      type: OFFER_ACTIONS.UPDATE_OFFER_DATA,
      payload: {
        value: value2,
        name: elementName
      }
    });
  };
  const handleChange = (e) => {
    let value2 = e.target.value;
    let check;
    if (maxChar) {
      check = checkValidity(value2, "maxChar");
      setCharactersLeft(maxChar - value2.length);
    }
    if (type === "url") {
      check = checkValidity(value2, "url");
      if (check) {
        value2 = checkEmbedLink(value2);
        e.target.value = value2;
      }
    }
    if (check || type === "textarea" || type === "text") {
      if (elementName === "title" && value2 === "") {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
      if (sections) {
        let element = elementName.split(/(\d+)/);
        if (elementName.includes("video")) {
          element = element[0] + element[2].replace("_", "");
        } else {
          element = element[2].replace("_", "");
        }
        setSections(sections.map((section2) => {
          if (section2.id === currentSection.id) {
            return {
              ...section2,
              [`${element}`]: value2
            };
          }
          return section2;
        }));
      } else {
        dispatch({
          type: LP_ACTIONS$1.UPDATE_PAGE_DATA,
          payload: {
            value: value2,
            name: elementName
          }
        });
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      e.target.classList.remove("active");
    }
    if (isValid) {
      if (sections) {
        let element = elementName.split(/(\d+)/);
        if (elementName.includes("video")) {
          element = element[0] + element[2].replace("_", "");
        } else {
          element = element[2].replace("_", "");
        }
        const packets = {
          [`${element}`]: e.target.value
        };
        updateSectionData$1(packets, currentSection.id);
      } else if (offerData) {
        const packets = {
          [`${elementName}`]: offerData[elementName]
        };
        updateOfferData(packets, offerData["id"]);
      } else {
        const packets = {
          [`${elementName}`]: courseData[elementName]
        };
        updateData$1(packets, courseData["id"], elementName).then((response) => {
          if (response.success && response.slug) {
            dispatch({
              type: LP_ACTIONS$1.UPDATE_PAGE_DATA,
              payload: {
                value: response.slug,
                name: "slug"
              }
            });
          }
        });
      }
    }
  };
  const checkValidity = (value2, checkType) => {
    if (checkType === "url") {
      if (validator.isURL(value2)) {
        setIsValid(true);
        return true;
      } else {
        setIsValid(false);
        return false;
      }
    } else if (checkType === "maxChar") {
      if (maxChar - value2.length >= 0 && value2.length > 0) {
        setIsValid(true);
        return true;
      } else {
        setIsValid(false);
        return false;
      }
    }
  };
  const checkEmbedLink = (link) => {
    if (link.includes("embed")) {
      return link;
    } else if (link.includes("youtube") && link.includes("v=")) {
      const split = link.split("v=");
      return "https://www.youtube.com/embed/" + split[1];
    } else if (link.includes("youtu.be")) {
      const split = link.split("youtu.be/");
      return "https://www.youtube.com/embed/" + split[1];
    } else if (link.includes("vimeo") && !link.includes("player.vimeo")) {
      const split = link.split("vimeo.com/");
      return "https://player.vimeo.com/video/" + split[1];
    }
    return link;
  };
  const switchStatement = () => {
    switch (type) {
      case "text":
      case "url":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: `animate ${value && "active"} `,
              maxLength: maxChar,
              name: elementName,
              type,
              defaultValue: value || "",
              onChange: (e) => handleChange(e),
              onKeyDown: (event) => {
                if (event.key === "Enter") {
                  handleSubmit(event);
                }
              },
              onBlur: (e) => handleSubmit(e),
              onFocus: (e) => HandleFocus$1(e.target),
              onPaste: (e) => handleChange(e)
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: elementName, children: placeholder })
        ] });
      case "textarea":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "animate",
              name: elementName,
              defaultValue: value || "",
              rows: 5,
              onChange: (e) => handleChange(e),
              onKeyDown: (event) => {
                if (event.key === "Enter") {
                  handleSubmit(event);
                }
              },
              onBlur: (e) => handleSubmit(e),
              onFocus: (e) => HandleFocus$1(e.target),
              onPaste: (e) => handleChange(e)
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: elementName, children: placeholder })
        ] });
      case "wysiwyg":
        return /* @__PURE__ */ jsx(
          EditorComponent,
          {
            dispatch,
            sections,
            setSections,
            currentSection,
            elementName,
            data: courseData,
            isValid,
            setIsValid,
            showTiny,
            setShowTiny
          }
        );
      case "currency":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            CurrencyInput,
            {
              className: `animate`,
              decimalsLimit: 2,
              defaultValue: offerData[elementName] || "",
              onValueChange: handleCurrencyChange,
              onKeyDown: (event) => {
                if (event.key === "Enter") {
                  handleSubmit(event);
                }
              },
              onBlur: (e) => handleSubmit(e),
              prefix,
              step: 0.1
            }
          ),
          /* @__PURE__ */ jsx("label", { children: placeholder })
        ] });
      default:
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "animate",
              maxLength: maxChar,
              name: elementName,
              type,
              defaultValue: value || "",
              onChange: (e) => handleChange(e),
              onKeyDown: (event) => {
                if (event.key === "Enter") {
                  handleSubmit(event);
                }
              },
              onBlur: (e) => handleSubmit(e),
              onFocus: (e) => HandleFocus$1(e.target)
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: elementName, children: placeholder })
        ] });
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "edit_form", children: /* @__PURE__ */ jsxs("form", { children: [
    switchStatement(),
    isValid ? /* @__PURE__ */ jsxs(
      "a",
      {
        className: `submit_circle ${type === "textarea" || type === "wysiwyg" ? "textarea" : ""}`,
        href: "#",
        onClick: (e) => handleSubmit(e),
        children: [
          /* @__PURE__ */ jsx(FiThumbsUp, {}),
          /* @__PURE__ */ jsx("div", { className: "hover_text submit_button", children: /* @__PURE__ */ jsx("p", { children: hoverText2 }) })
        ]
      }
    ) : /* @__PURE__ */ jsx("span", { className: `cancel_icon ${type === "textarea" || type === "wysiwyg" ? "textarea" : ""}`, children: /* @__PURE__ */ jsx(FiThumbsDown, {}) }),
    maxChar && /* @__PURE__ */ jsxs("div", { className: "my_row info_text title", children: [
      /* @__PURE__ */ jsxs("p", { className: "char_max", children: [
        "Max ",
        maxChar,
        " Characters"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "char_count", children: charactersLeft < 0 ? /* @__PURE__ */ jsx("span", { className: "over", children: "Over Character Limit" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        "Characters Left: ",
        /* @__PURE__ */ jsxs("span", { className: "count", children: [
          " ",
          charactersLeft,
          " "
        ] })
      ] }) })
    ] })
  ] }) });
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: InputComponent$2
}, Symbol.toStringTag, { value: "Module" }));
const Hero$1 = ({ courseData }) => {
  const [textValue, setTextValue] = useState(courseData["intro_text"]);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (courseData["intro_text"] !== "") {
      if (firstUpdate.current && courseData["intro_text"] && isJSON(courseData["intro_text"])) {
        const allContent = JSON.parse(courseData["intro_text"]);
        allContent["blocks"] = allContent["blocks"].map((block) => {
          if (!block.text) {
            block.text = "";
          }
          return block;
        });
        setTextValue(draftToHtml(allContent));
        firstUpdate.current = false;
      } else {
        setTextValue(courseData["intro_text"]);
      }
    }
  }, [courseData["intro_text"]]);
  const createMarkup = (text2) => {
    return {
      __html: DOMPurify.sanitize(text2)
    };
  };
  return /* @__PURE__ */ jsxs("div", { className: "hero_section", children: [
    courseData["intro_video"] && /* @__PURE__ */ jsx("div", { className: "video_wrapper", id: "preview_intro_video_section", children: /* @__PURE__ */ jsx("iframe", { src: courseData["intro_video"], allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;", allowFullScreen: true }) }),
    courseData["intro_text"] && /* @__PURE__ */ jsx(
      "article",
      {
        id: "preview_intro_text_section",
        className: "intro_text my_row",
        style: {
          background: courseData["intro_background_color"] || "rgba(255,255,255,1)"
        },
        children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: createMarkup(textValue) })
      }
    )
  ] });
};
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hero$1
}, Symbol.toStringTag, { value: "Module" }));
const TopBar$1 = ({
  courseData,
  completedCrop,
  nodesRef
}) => {
  var _a, _b;
  return /* @__PURE__ */ jsxs("div", { className: "top_section", style: {
    background: courseData["header_color"]
  }, children: [
    /* @__PURE__ */ jsx("div", { className: "logo", children: (completedCrop == null ? void 0 : completedCrop.logo) ? /* @__PURE__ */ jsx(
      "canvas",
      {
        ref: (ref) => nodesRef.current["logo"] = ref,
        style: {
          width: ((_a = completedCrop["logo"]) == null ? void 0 : _a.isCompleted) ? `100%` : 0,
          height: ((_b = completedCrop["logo"]) == null ? void 0 : _b.isCompleted) ? `auto` : 0,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`
        }
      }
    ) : /* @__PURE__ */ jsx("img", { src: courseData["logo"] || Vapor.asset("images/logo.png"), alt: "" }) }),
    courseData["title"] && /* @__PURE__ */ jsx("h2", { id: "preview_title_section", className: "title", style: {
      color: courseData["header_text_color"]
    }, children: courseData["title"] })
  ] });
};
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TopBar$1
}, Symbol.toStringTag, { value: "Module" }));
const SectionVideo = ({
  title,
  link,
  text: text2,
  textColor,
  index: index2
}) => {
  const [imagePlaceholder, setImagePlaceholder] = useState("");
  const [indexValue, setIndexValue] = useState(null);
  useEffect(() => {
    if (link) {
      let split;
      if (link.includes("youtube")) {
        let embedCode = "";
        split = link.split("/embed/")[1];
        if (split.includes("?")) {
          embedCode = split.split("?")[0];
        } else {
          embedCode = split;
        }
        setImagePlaceholder("https://img.youtube.com/vi/" + embedCode + "/mqdefault.jpg");
      } else {
        split = link.split("/video/")[1];
        setImagePlaceholder("https://vumbnail.com/" + split + ".jpg");
      }
    }
  }, [link]);
  const handleOnClick = (e) => {
    e.preventDefault();
    setIndexValue(e.currentTarget.dataset.index);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    link ? /* @__PURE__ */ jsx("div", { className: "video_content", children: indexValue == index2 ? /* @__PURE__ */ jsx("div", { className: "video_row my_row", children: /* @__PURE__ */ jsx("div", { className: "video_wrapper", children: /* @__PURE__ */ jsx("iframe", { src: link, allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;", allowFullScreen: true }) }) }) : /* @__PURE__ */ jsxs("a", { href: "#", "data-index": index2, onClick: (e) => handleOnClick(e), children: [
      /* @__PURE__ */ jsx("img", { src: imagePlaceholder, alt: "" }),
      /* @__PURE__ */ jsx("span", { className: "play_icon", children: /* @__PURE__ */ jsx(FaCirclePlay, {}) })
    ] }) }) : /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/image-placeholder.jpg"), alt: "" }),
    /* @__PURE__ */ jsxs("div", { className: "text_wrap", children: [
      /* @__PURE__ */ jsx("h3", { style: { color: textColor || "rgba(0,0,0,1)" }, children: title || "Video Title" }),
      text2 && /* @__PURE__ */ jsx("p", { style: { color: textColor || "rgba(0,0,0,1)" }, children: text2 })
    ] })
  ] });
};
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SectionVideo
}, Symbol.toStringTag, { value: "Module" }));
const PreviewSection$2 = ({
  currentSection,
  index: index2,
  url
}) => {
  const {
    type,
    background_color,
    text_color,
    text: text2,
    video_title,
    video_link,
    button,
    button_position,
    button_color,
    button_text_color,
    button_text,
    button_size
  } = currentSection;
  const [buttonStyle, setButtonStyle] = useState(null);
  useEffect(() => {
    setButtonStyle({
      background: button_color,
      color: button_text_color,
      width: button_size + "%"
    });
  }, [button_color, button_text_color, button_size]);
  const Button = ({ buttonText }) => {
    return /* @__PURE__ */ jsx("div", { className: `button_wrap ${button_position ? button_position : "above"}`, children: /* @__PURE__ */ jsx(
      "a",
      {
        href: `${url}/checkout`,
        target: "_blank",
        className: "button",
        style: buttonStyle,
        children: buttonText || "Get Course"
      }
    ) });
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: `preview_section_${index2 + 1}`,
      className: type,
      style: { background: background_color || "rgba(255,255,255,1)" },
      children: [
        !!button && button_position === "above" && /* @__PURE__ */ jsx(
          Button,
          {
            buttonText: button_text
          }
        ),
        {
          "text": /* @__PURE__ */ jsx(
            "p",
            {
              style: { color: text_color || "rgba(0,0,0,1)" },
              children: text2 || ""
            }
          ),
          "video": /* @__PURE__ */ jsx(
            SectionVideo,
            {
              title: video_title,
              link: video_link,
              text: text2,
              textColor: text_color,
              index: index2
            }
          )
        }[type],
        !!button && button_position === "below" && /* @__PURE__ */ jsx(
          Button,
          {
            buttonText: button_text
          }
        )
      ]
    }
  );
};
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PreviewSection$2
}, Symbol.toStringTag, { value: "Module" }));
function UseLoadPreviewHeight(altPxToMinus = null) {
  let [previewHeight, setPreviewHeight] = useState(null);
  useLayoutEffect(() => {
    setPreviewHeight(resizePreviewHeight(altPxToMinus));
  }, []);
  return previewHeight;
}
function UseResizePreviewHeight(altPxToMinus = null) {
  let [previewHeight, setPreviewHeight] = useState(null);
  useLayoutEffect(() => {
    function handlePreviewHeight() {
      setPreviewHeight(resizePreviewHeight(altPxToMinus));
    }
    window.addEventListener("resize", handlePreviewHeight);
    return () => {
      window.removeEventListener("resize", handlePreviewHeight);
    };
  }, []);
  return previewHeight;
}
function resizePreviewHeight(altPxToMinus) {
  const windowWidth = window.outerWidth;
  const innerContent = document.getElementById("preview_wrap");
  let pixelsToMinus;
  if (windowWidth > 551) {
    if (altPxToMinus) {
      pixelsToMinus = altPxToMinus;
    } else {
      pixelsToMinus = 30;
    }
  } else {
    pixelsToMinus = 20;
  }
  return innerContent.offsetHeight - pixelsToMinus;
}
const Preview$3 = ({
  courseData,
  sections,
  setShowPreview,
  url,
  hoverSection,
  nodesRef,
  imgRef,
  completedCrop
}) => {
  const loadPreviewHeight = UseLoadPreviewHeight();
  const resizePreviewHeight2 = UseResizePreviewHeight();
  useEffect(() => {
    if (hoverSection) {
      const target = document.getElementById("preview_" + hoverSection);
      if (target) {
        if (hoverSection.includes("header")) {
          target.parentNode.scrollTop = target.offsetTop;
        } else if (hoverSection.includes("intro")) {
          target.parentNode.parentNode.parentNode.scrollTop = target.offsetTop - 100;
        } else {
          target.parentNode.parentNode.scrollTop = target.offsetTop - 100;
        }
      }
    }
  }, [hoverSection]);
  const ClosePreview = () => {
    document.querySelector("body").classList.remove("fixed");
    setShowPreview(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "close_preview", onClick: ClosePreview, children: /* @__PURE__ */ jsx(IoIosCloseCircleOutline, {}) }),
    /* @__PURE__ */ jsx("div", { className: "links_wrap preview", children: /* @__PURE__ */ jsx("div", { className: "inner_content", id: "preview_wrap", children: /* @__PURE__ */ jsxs("div", { className: "inner_content_wrap", style: { maxHeight: resizePreviewHeight2 ? resizePreviewHeight2 + "px" : loadPreviewHeight + "px" }, children: [
      /* @__PURE__ */ jsx("section", { className: "header", id: "preview_header_section", children: /* @__PURE__ */ jsx(
        TopBar$1,
        {
          courseData,
          nodesRef,
          completedCrop,
          imgRef
        }
      ) }),
      /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(
        Hero$1,
        {
          courseData
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "sections my_row", children: !isEmpty(sections) && sections.map((section2, index2) => {
        return /* @__PURE__ */ jsx(
          PreviewSection$2,
          {
            currentSection: section2,
            index: index2,
            url
          },
          section2.id
        );
      }) })
    ] }) }) })
  ] });
};
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Preview$3
}, Symbol.toStringTag, { value: "Module" }));
const SectionImage$1 = ({
  nodesRef,
  completedCrop,
  elementName,
  imgUrl
}) => {
  var _a, _b, _c;
  const [sectionImageStyle, setSectionImageStyle] = useState(null);
  useEffect(() => {
    var _a2, _b2, _c2;
    setSectionImageStyle(
      ((_a2 = completedCrop[elementName]) == null ? void 0 : _a2.isCompleted) ? {
        width: ((_b2 = completedCrop[elementName]) == null ? void 0 : _b2.isCompleted) ? `100%` : 0,
        height: ((_c2 = completedCrop[elementName]) == null ? void 0 : _c2.isCompleted) ? `auto` : 0,
        maxHeight: "232px",
        overflow: "hidden"
      } : {
        background: "url(" + imgUrl + ") center 25% no-repeat",
        backgroundSize: "cover",
        padding: "29%"
      }
    );
  }, [completedCrop[elementName]]);
  return /* @__PURE__ */ jsx("div", { style: sectionImageStyle, children: ((_a = completedCrop[elementName]) == null ? void 0 : _a.isCompleted) ? /* @__PURE__ */ jsx(
    "canvas",
    {
      className: `${elementName}_bg_image`,
      ref: (ref) => nodesRef.current[elementName] = ref,
      style: {
        /*backgroundImage: nodesRef.current[elementName],*/
        /*width: Math.round(completedCrop?.width ?? 0),
        height: Math.round(completedCrop?.height ?? 0)*/
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
        width: ((_b = completedCrop[elementName]) == null ? void 0 : _b.isCompleted) ? `100%` : 0,
        height: ((_c = completedCrop[elementName]) == null ? void 0 : _c.isCompleted) ? `auto` : 0
      }
    }
  ) : "" });
};
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SectionImage$1
}, Symbol.toStringTag, { value: "Module" }));
const PublishButton$1 = ({ offerData, dispatchOffer, courseTitle }) => {
  const handleOnClick = (e) => {
    e.preventDefault();
    const packets = {
      published: true
    };
    publishOffer(packets, offerData["id"]).then((response) => {
      if (response.success) {
        dispatchOffer({
          type: OFFER_ACTIONS.UPDATE_OFFER_DATA,
          payload: {
            value: true,
            name: "published"
          }
        });
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "my_row button_wrap", children: [
    /* @__PURE__ */ jsx("button", { type: "submit", disabled: !offerData["price"] || !offerData["icon"] || !courseTitle ? "disabled" : "", className: !offerData["price"] || !offerData["icon"] ? "button blue disabled" : "button blue", onClick: (e) => handleOnClick(e), children: "Publish" }),
    !offerData["price"] || !offerData["icon"] ? /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx(IoWarningOutline, {}),
      " Course requires an Icon, Price and Title before being published"
    ] }) : ""
  ] });
};
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PublishButton$1
}, Symbol.toStringTag, { value: "Module" }));
const IOSSwitch = styled((props) => /* @__PURE__ */ jsx(Switch, { ...props }))(({ theme }) => ({
  width: 58,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "800ms",
    "&.Mui-checked": {
      transform: "translateX(34px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#424fcf",
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5
      }
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#ffffff",
      border: "6px solid #ffffff"
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "#ffffff"
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3
    }
  },
  "& .MuiSwitch-thumb": {
    color: "#ffffff",
    boxSizing: "border-box",
    width: 20,
    height: 20
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "rgb(136, 136, 136)" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500
    })
  }
}));
const SectionButtonOptions$1 = ({
  position,
  sections,
  setSections,
  currentSection,
  id
}) => {
  const {
    button_position,
    button,
    button_text,
    button_size
  } = currentSection;
  const [includeButtonValue, setIncludeButtonValue] = useState(false);
  const [buttonPositionValue, setButtonPositionValue] = useState("above");
  const [buttonSizeState, setButtonSizeState] = useState(button_size);
  useEffect(() => {
    setIncludeButtonValue(button);
  }, []);
  useEffect(() => {
    setButtonPositionValue(button_position);
  }, []);
  const handleSwitchChange = () => {
    setIncludeButtonValue(!includeButtonValue);
    const packets = {
      button: !includeButtonValue
    };
    updateSectionData$1(packets, id).then((response) => {
      if (response.success) {
        setSections(
          sections.map((section2) => {
            if (section2.id === id) {
              section2.button = !includeButtonValue;
            }
            return section2;
          })
        );
      }
    });
  };
  const handleRadioChange = (value) => {
    setButtonPositionValue(value);
    const packets = {
      button_position: value
    };
    updateSectionData$1(packets, id).then((response) => {
      if (response.success) {
        setSections(
          sections.map((section2) => {
            if (section2.id === id) {
              section2.button_position = value;
            }
            return section2;
          })
        );
      }
    });
  };
  const handleRangeChange = (value) => {
    setButtonSizeState(value);
  };
  const submitButtonSize = () => {
    const packets = {
      button_size: buttonSizeState
    };
    updateSectionData$1(packets, id).then((response) => {
      if (response.success) {
        setSections(
          sections.map((section2) => {
            if (section2.id === id) {
              section2.button_size = buttonSizeState;
            }
            return section2;
          })
        );
      }
    });
  };
  const rangePercent = (value) => {
    return value + "%";
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: `switch_wrap page_settings border_wrap ${!button ? "mb-4" : ""}`, children: [
      /* @__PURE__ */ jsx("h3", { children: "Include Button" }),
      /* @__PURE__ */ jsx(
        IOSSwitch,
        {
          onChange: handleSwitchChange,
          checked: Boolean(includeButtonValue)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `button_options ${includeButtonValue ? "open" : ""}`, children: [
      /* @__PURE__ */ jsx("article", { className: "page_settings border_wrap", children: /* @__PURE__ */ jsx("div", { className: "radios_wrap", children: /* @__PURE__ */ jsxs(FormControl$1, { children: [
        /* @__PURE__ */ jsx(
          FormLabel,
          {
            id: `section_${position}_above`,
            sx: {
              color: "#000"
            },
            children: /* @__PURE__ */ jsx("h3", { children: "Button Location" })
          }
        ),
        /* @__PURE__ */ jsxs(
          RadioGroup,
          {
            row: true,
            "aria-labelledby": `section_${position}_above`,
            name: `section_${position}_above`,
            onChange: (e) => {
              handleRadioChange(e.target.value);
            },
            children: [
              /* @__PURE__ */ jsx(
                FormControlLabel,
                {
                  value: "above",
                  control: /* @__PURE__ */ jsx(
                    Radio,
                    {
                      checked: (buttonPositionValue === "above" || !buttonPositionValue) && true
                    }
                  ),
                  label: "Above"
                }
              ),
              /* @__PURE__ */ jsx(
                FormControlLabel,
                {
                  value: "below",
                  control: /* @__PURE__ */ jsx(
                    Radio,
                    {
                      checked: buttonPositionValue === "below" && true
                    }
                  ),
                  label: "Below"
                }
              )
            ]
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsxs("article", { className: "my_row page_settings border_wrap", children: [
        /* @__PURE__ */ jsx("h3", { children: "Button Size" }),
        /* @__PURE__ */ jsx("div", { className: "slider_wrap", children: /* @__PURE__ */ jsx(
          Slider,
          {
            value: buttonSizeState,
            "aria-label": "Default",
            valueLabelDisplay: "auto",
            valueLabelFormat: rangePercent,
            color: "primary",
            step: 1,
            min: 25,
            max: 100,
            sx: {
              color: "#424fcf"
            },
            onChange: (e) => handleRangeChange(e.target.value),
            onChangeCommitted: submitButtonSize
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(
        ColorPicker$1,
        {
          label: "Button Text Color",
          sections,
          setSections,
          currentSection,
          elementName: `section_${position}_button_text_color`
        }
      ),
      /* @__PURE__ */ jsx(
        ColorPicker$1,
        {
          label: "Button Color",
          sections,
          setSections,
          currentSection,
          elementName: `section_${position}_button_color`
        }
      ),
      /* @__PURE__ */ jsx(
        InputComponent$2,
        {
          placeholder: "Update Button Text (optional)",
          type: "text",
          maxChar: 15,
          hoverText: "Submit Button Text",
          elementName: `section_${position}_button_text`,
          sections,
          setSections,
          currentSection,
          value: button_text
        }
      )
    ] })
  ] });
};
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SectionButtonOptions$1
}, Symbol.toStringTag, { value: "Module" }));
const ToolTipContext = createContext();
const ToolTipContextProvider = ToolTipContext.Provider;
const hoverText = [
  {
    section: "name",
    text: [
      {
        description: "The text in this field is the name of your page and is appended to “link.pro/” to create the URL for a user’s Page (e.g. link.pro/SETUP). You are free to change this at any time if the name is not already taken by another user.",
        subTitle: "Pro Tip!",
        tip: "Choosing a simple Page Name that reflects your content makes your LinkPro URL more informative for your audience."
      }
    ]
  },
  {
    section: "password",
    text: [
      {
        description: "This option allows PRO and PREMIER users to restrict access to their Page/s for those with the access code. Selecting this option means that only people with an access code can view your LinkPro Page. The access code is required to have a minimum of 4 alpha-numeric characters/symbols.",
        subTitle: "Pro Tip!",
        tip: "Password protecting a page is useful for promotional offers, exclusive content, and companies with internal information accessible to employees and not the general public."
      }
    ]
  },
  {
    section: "header",
    text: [
      {
        description: " Here you can upload a background header image to your Page. After selecting a file (.jpg, .jpeg, .png, .gif) to upload, you can resize the image to perfection using the built-in cropping functionality."
      }
    ]
  },
  {
    section: "profile",
    text: [
      {
        description: "Here you can upload a profile image to your Page. After selecting a file (.jpg, .jpeg, .png, .gif) to upload, you can resize the image to perfection using the built-in cropping functionality.",
        subTitle: "Pro Tip!",
        tip: "A square profile image will be cropped to a circular shape on your page. Choose an image that will appropriately fit a circular shape!"
      }
    ]
  },
  {
    section: "title",
    text: [
      {
        description: "Add a brief title to your Page (30 character max). The text is bold and displayed directly below the header image to provide viewers with a title for the content you add to your Page.",
        subTitle: "Pro Tip!",
        tip: "A shorter Page-Title allows viewers to see more icons quicker!"
      }
    ]
  },
  {
    section: "bio",
    text: [
      {
        description: "Description text displayed directly below the Page Title to provide your followers a brief bio or slogan for your Page. (60 character max).",
        subTitle: "Pro Tip!",
        tip: "A shorter Page-Bio allows viewers to see more icons quicker!"
      }
    ]
  },
  {
    section: "layout",
    text: [
      {
        description: "Choose between 3 different layouts to display your profile content that includes your profile image, title and bio.",
        subTitle: "Pro Tip!",
        tip: "A longer title and/or bio may look best on Layout 3."
      }
    ]
  },
  {
    section: "creator_active",
    text: [
      {
        description: "Active course to make it available to be promoted across LinkPro pages.",
        subTitle: "Note:",
        tip: "Course must be Published before activating."
      }
    ]
  },
  {
    section: "creator_public",
    text: [
      {
        description: "Making course public makes it available to any LinkPro user to add the course icon to their page and sell it as an affiliate.",
        subTitle: "Note:",
        tip: "Course must be Published before being made public."
      }
    ]
  },
  {
    section: "creator_prp",
    text: [
      {
        title: "Personal Referral Payout",
        description: "Your payout will be 80% of the price you set when you personally refer someone to your course"
      }
    ]
  },
  {
    section: "creator_arp",
    text: [
      {
        title: "Affiliate Referral Payout",
        description: "Your payout will be 40% of the price you set when someone adds your course to their Link Pro page."
      }
    ]
  },
  {
    section: "creator_lp",
    text: [
      {
        description: "A Landing Page is your exclusive page and link you build to help market the Courses you create below. You can add all of the Courses you create to this page!",
        subTitle: "Note:",
        tip: "A Landing Page is not required, but may be used to market multiple Courses in one place."
      }
    ]
  },
  {
    section: "creator_course",
    text: [
      {
        description: "Create an unlimited number of Courses to add in different Sections of your Landing Page. Each Course will also have its own Course Page for your customers to preview before a purchase or to market any of your Courses individually.",
        subTitle: "Note:",
        tip: "All Courses are NOT required to be included on your Landing Page."
      }
    ]
  },
  {
    section: "course_header_color",
    text: [
      {
        description: "NOTE: This color will also be used as the internal menu background color"
      }
    ]
  },
  {
    section: "course_header_text_color",
    text: [
      {
        description: "NOTE: This color will also be used as the internal menu text color."
      }
    ]
  },
  {
    section: "active_course",
    text: [
      {
        description: "After your course is published you can Deactivate or Active it at anytime."
      }
    ]
  },
  {
    section: "public_course",
    text: [
      {
        description: "After your course is published you can make it public so anyone can promote it, or make it private so only you have access to it."
      }
    ]
  },
  {
    section: "course_lock_video",
    text: [
      {
        description: "You can choose to unlock a video to give users access to watch a video before purchasing the full course."
      }
    ]
  }
];
const ToolTipIcon = ({ section: section2 }) => {
  const {
    setInfoText,
    setInfoTextOpen,
    setInfoLocation,
    infoClicked,
    setInfoClicked,
    triangleRef
  } = useContext(ToolTipContext);
  useEffect(() => {
    function handleScroll() {
      setInfoTextOpen(false);
      setInfoClicked(null);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  useEffect(() => {
    function handleResize() {
      setInfoTextOpen(false);
      setInfoClicked(null);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const handleMouseOver = (e) => {
    const name2 = e.target.dataset.section;
    const dataText = hoverText.find((text2) => text2.section === name2);
    setInfoText(dataText);
    setInfoTextOpen(true);
    const rect = e.target.getBoundingClientRect();
    const center = (rect.left + rect.right) / 2;
    const top = rect.top - 2;
    setInfoLocation({ center, top });
    const triangleTop = rect.top - 20;
    const triangleLeft = rect.left - 1;
    triangleRef.style.top = `${triangleTop}px`;
    triangleRef.style.bottom = `${rect.bottom}px`;
    triangleRef.style.left = `${triangleLeft}px`;
    triangleRef.style.right = `${rect.right}px`;
  };
  const handleClick = (e) => {
    if (!infoClicked) {
      setInfoClicked(e.target);
    } else {
      setInfoClicked(null);
      setInfoTextOpen(false);
      return;
    }
    const name2 = e.target.dataset.section;
    const dataText = hoverText.find((text2) => text2.section === name2);
    setInfoText(dataText);
    setInfoTextOpen(true);
    const rect = e.target.getBoundingClientRect();
    const center = (rect.left + rect.right) / 2;
    const top = rect.top - 2;
    setInfoLocation({ center, top });
    if (infoClicked === false) {
      setInfoClicked(null);
    }
  };
  const handleMouseLeave = () => {
    if (!infoClicked) {
      setInfoTextOpen(false);
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "tooltip_icon",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "icon_wrap",
          onMouseLeave: () => {
            handleMouseLeave();
          },
          onClick: (e) => {
            handleClick(e);
          },
          onMouseOver: (e) => handleMouseOver(e),
          "data-section": section2,
          children: /* @__PURE__ */ jsx(BiHelpCircle, {})
        }
      )
    }
  );
};
const Section$1 = ({
  section: section2,
  index: index2,
  sections,
  setSections,
  openIndex,
  setOpenIndex,
  videoCount,
  textCount,
  setHoverSection
}) => {
  const [lockVideo, setLockVideo] = useState(true);
  const {
    id,
    type,
    text: text2,
    video_title,
    video_link,
    lock_video
  } = section2;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: section2.id });
  const style = {
    transform: CSS$1.Transform.toString(transform),
    transition
  };
  useEffect(() => {
    setLockVideo(lock_video ? lock_video : true);
  }, []);
  const handleSectionOpen = (rowIndex) => {
    if (openIndex.includes(rowIndex)) {
      const newArrayIndex = openIndex.filter((element) => element !== rowIndex);
      setOpenIndex(newArrayIndex);
    } else {
      const newArrayIndex = openIndex.concat(rowIndex);
      setOpenIndex(newArrayIndex);
    }
  };
  const handleChange = () => {
    const newLockVideoValue = !lockVideo;
    setLockVideo(newLockVideoValue);
    const packets = {
      lock_video: newLockVideoValue
    };
    updateSectionData$1(packets, section2.id).then((response) => {
      if (response.success) {
        setSections(
          sections.map((section22) => {
            if (section22.id === id) {
              section22.lock_video = newLockVideoValue;
            }
            return section22;
          })
        );
      }
    });
  };
  const handleMouseDown = () => {
    setOpenIndex([]);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: setNodeRef,
      id: `section_${index2 + 1}`,
      style,
      className: "section_row",
      onMouseEnter: (e) => setHoverSection(e.target.id),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "section_title",
            onClick: (e) => handleSectionOpen(index2),
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "drag_handle creator_section",
                  onMouseDown: handleMouseDown,
                  ...attributes,
                  ...listeners,
                  children: /* @__PURE__ */ jsx(MdDragHandle, {})
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "title_column", children: /* @__PURE__ */ jsxs("h4", { children: [
                type,
                " ",
                type === "video" ? videoCount : textCount
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: `icon_wrap ${openIndex.includes(index2) ? "open" : ""}`, children: /* @__PURE__ */ jsx(MdKeyboardArrowDown, {}) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: `section_content my_row ${openIndex.includes(index2) ? "open" : ""}`, children: [
          type === "text" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              InputComponent$2,
              {
                placeholder: "Add Text",
                type: "textarea",
                hoverText: "Add Text to Section",
                elementName: `section_${index2 + 1}_text`,
                value: text2,
                currentSection: section2,
                sections,
                setSections
              }
            ),
            /* @__PURE__ */ jsx(
              ColorPicker$1,
              {
                label: "Background Color",
                currentSection: section2,
                sections,
                setSections,
                elementName: `section_${index2 + 1}_background_color`
              }
            ),
            /* @__PURE__ */ jsx(
              ColorPicker$1,
              {
                label: "Text Color",
                currentSection: section2,
                sections,
                setSections,
                elementName: `section_${index2 + 1}_text_color`
              }
            ),
            /* @__PURE__ */ jsx(
              SectionButtonOptions$1,
              {
                position: index2 + 1,
                sections,
                setSections,
                currentSection: section2,
                id
              }
            )
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              InputComponent$2,
              {
                placeholder: "Video Title",
                type: "text",
                maxChar: 65,
                hoverText: "Add Video Title",
                elementName: `video_${index2 + 1}_title`,
                value: video_title || "",
                currentSection: section2,
                sections,
                setSections
              }
            ),
            /* @__PURE__ */ jsx(
              InputComponent$2,
              {
                placeholder: "YouTube or Vimeo Link",
                type: "url",
                hoverText: "Add Embed Link",
                elementName: `video_${index2 + 1}_link`,
                value: video_link || "",
                currentSection: section2,
                sections,
                setSections
              }
            ),
            /* @__PURE__ */ jsx(
              InputComponent$2,
              {
                placeholder: "Video Text Blurb (optional)",
                type: "textarea",
                hoverText: `Submit Text Blurb`,
                elementName: `section_${index2 + 1}_text`,
                value: text2 || "",
                currentSection: section2,
                sections,
                setSections
              }
            ),
            /* @__PURE__ */ jsx(
              ColorPicker$1,
              {
                label: "Background Color",
                currentSection: section2,
                sections,
                setSections,
                elementName: `section_${index2 + 1}_background_color`
              }
            ),
            /* @__PURE__ */ jsx(
              ColorPicker$1,
              {
                label: "Text Color",
                currentSection: section2,
                sections,
                setSections,
                elementName: `section_${index2 + 1}_text_color`
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "switch_wrap two_columns", children: [
              /* @__PURE__ */ jsxs("div", { className: `page_settings border_wrap`, children: [
                /* @__PURE__ */ jsx("h3", { children: "Lock Video" }),
                /* @__PURE__ */ jsx(
                  IOSSwitch,
                  {
                    onChange: handleChange,
                    checked: lockVideo !== null ? Boolean(lockVideo) : true
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(ToolTipIcon, { section: "course_lock_video" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            DeleteSection$1,
            {
              id,
              sections,
              setSections,
              setOpenIndex
            }
          )
        ] })
      ]
    }
  );
};
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Section$1
}, Symbol.toStringTag, { value: "Module" }));
const SwitchOptions$1 = ({ offerData, dispatchOffer }) => {
  const handleChange = (type) => {
    const value = !offerData[type];
    const packets = {
      [`${type}`]: value
    };
    updateOfferData(packets, offerData["id"]).then((response) => {
      if (response.success) {
        dispatchOffer({
          type: OFFER_ACTIONS.UPDATE_OFFER_DATA,
          payload: {
            value,
            name: type
          }
        });
      }
    });
  };
  const IOSSwitch2 = styled((props) => /* @__PURE__ */ jsx(Switch, { ...props }))(({ theme }) => ({
    width: 62,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "800ms",
      "&.Mui-checked": {
        transform: "translateX(35px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#424fcf",
          opacity: 1,
          border: 0
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5
        }
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#ffffff",
        border: "6px solid #ffffff"
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: "#ffffff"
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3
      }
    },
    "& .MuiSwitch-thumb": {
      color: "#ffffff",
      boxSizing: "border-box",
      width: 22,
      height: 22
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "rgb(136, 136, 136)" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500
      })
    }
  }));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "switch_wrap two_columns", children: [
      /* @__PURE__ */ jsxs("div", { className: "page_settings border_wrap my_row", children: [
        /* @__PURE__ */ jsx("h3", { children: "Public" }),
        /* @__PURE__ */ jsx(
          IOSSwitch2,
          {
            onChange: () => handleChange("public"),
            checked: Boolean(offerData["public"]),
            disabled: !Boolean(offerData["published"])
          }
        )
      ] }),
      /* @__PURE__ */ jsx(ToolTipIcon, { section: "public_course" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "switch_wrap two_columns", children: [
      /* @__PURE__ */ jsxs("div", { className: "page_settings border_wrap my_row", children: [
        /* @__PURE__ */ jsx("h3", { children: "Active" }),
        /* @__PURE__ */ jsx(
          IOSSwitch2,
          {
            onChange: () => handleChange("active"),
            checked: Boolean(offerData["active"]),
            disabled: !Boolean(offerData["published"])
          }
        )
      ] }),
      /* @__PURE__ */ jsx(ToolTipIcon, { section: "active_course" })
    ] })
  ] });
};
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SwitchOptions$1
}, Symbol.toStringTag, { value: "Module" }));
const VideoComponent$1 = ({ sections, setSections }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    InputComponent$2,
    {
      placeholder: "Video Title",
      type: "text",
      maxChar: 65,
      hoverText: "Add A Video Title",
      elementName: `video_${index + 1}_text`,
      value: text,
      currentSection: section,
      sections,
      setSections
    }
  ) });
};
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VideoComponent$1
}, Symbol.toStringTag, { value: "Module" }));
const PreviewButton = ({ setShowPreview }) => {
  const ShowPreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
    document.querySelector("body").classList.add("fixed");
  };
  return /* @__PURE__ */ jsx("div", { className: "preview_button_wrap my_row", children: /* @__PURE__ */ jsx("a", { href: "#", className: "button blue", onClick: (e) => ShowPreview(e), children: "Show Live Preview" }) });
};
const __vite_glob_0_78 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PreviewButton
}, Symbol.toStringTag, { value: "Module" }));
const addPage = (packets) => {
  return axios$1.post("/dashboard/page/new", packets).then(
    (response) => {
      const page_id = JSON.stringify(response.data.page_id);
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
      return {
        success: true,
        page_id
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors.name) {
        EventBus.dispatch("error", { message: error.response.data.errors.name[0] });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updatePageName = (packets, pageID) => {
  return axios$1.patch(
    "/dashboard/page/update-name/" + pageID,
    packets
  ).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors) {
        EventBus.dispatch("error", { message: error.response.data.errors.name[0] });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const headerImage = (packets, pageID) => {
  return axios$1.patch("/dashboard/page/update-header-image/" + pageID, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
      const imgPath = response.data.imgPath;
      return {
        success: true,
        imgPath
      };
    }
  ).catch((error) => {
    if (error.response) {
      EventBus.dispatch("error", { message: error.response.data.errors.header_img[0] });
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const profileImage = (packets, pageID, pageDefault) => {
  return axios$1.patch("/dashboard/page/update-profile-image/" + pageID, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      const imgPath = response.data.imgPath;
      EventBus.dispatch("success", { message: returnMessage });
      if (pageDefault) {
        document.querySelector("#user_image").src = imgPath;
      }
      return {
        success: true,
        imgPath
      };
    }
  ).catch((error) => {
    if (error.response.data.errors.profile_img !== void 0) {
      EventBus.dispatch("error", { message: error.response.data.errors.profile_img[0] });
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const pageTitle = (packets, pageID) => {
  return axios$1.patch(
    "/dashboard/page/update-title/" + pageID,
    packets
  ).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
    }
  ).catch((error) => {
    if (error.response) {
      EventBus.dispatch("error", { message: error.response.data.errors.title[0] });
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
  });
};
const pageBio = (packets, pageID) => {
  return axios$1.patch(
    "/dashboard/page/update-bio/" + pageID,
    packets
  ).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
    }
  ).catch((error) => {
    if (error.response) {
      EventBus.dispatch("error", { message: error.response.data.errors.bio[0] });
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
  });
};
const updateProfileLayout = (packets, pageID) => {
  return axios$1.patch(
    "/dashboard/page/update-profile-layout/" + pageID,
    packets
  ).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      return {
        message: returnMessage
      };
    }
  ).catch((error) => {
    if (error.response) {
      EventBus.dispatch("error", { message: "Something went wrong" });
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
  });
};
const previewButtonRequest = (setShowPreviewButton) => {
  if (window.innerWidth < 993) {
    setShowPreviewButton(true);
  } else {
    setShowPreviewButton(false);
  }
};
const InfoText = ({ divRef }) => {
  var _a;
  const infoDiv = useRef();
  const {
    infoText,
    infoLocation,
    infoTextOpen,
    setTriangleRef
  } = useContext(ToolTipContext);
  useEffect(() => {
    const infoBox = infoDiv.current;
    const windowWidth = window.innerWidth;
    setTimeout(() => {
      const { center, top } = infoLocation;
      const vert = top - infoBox.offsetHeight - 10;
      let horz = center - infoBox.offsetWidth + 15;
      if (horz < 80 && windowWidth > 768) {
        horz = 80;
      }
      if (horz < 0 && windowWidth < 769) {
        horz = 20;
      }
      infoBox.style.left = ` ${horz}px`;
      infoBox.style.top = `${vert}px`;
    });
    if ((infoText == null ? void 0 : infoText.section.includes("creator")) || (infoText == null ? void 0 : infoText.section.includes("course"))) {
      if (windowWidth < 600) {
        infoBox.style.maxWidth = "80%";
      } else {
        infoBox.style.maxWidth = `${divRef.current.offsetWidth * 0.62}px`;
      }
    } else {
      infoBox.style.maxWidth = `${divRef.current.offsetWidth * 0.92}px`;
    }
  }, [infoLocation, infoText]);
  useEffect(() => {
    function handleResize() {
      const infoBox = infoDiv.current;
      const { center, top } = infoLocation;
      const windowWidth = window.innerWidth;
      let wrapWidth;
      if (infoText.section.includes("creator")) {
        if (windowWidth < 600) {
          infoBox.style.maxWidth = "80%";
        } else {
          wrapWidth = divRef.current.offsetWidth * 0.62;
        }
      } else {
        wrapWidth = divRef.current.offsetWidth * 0.92;
      }
      const vert = top - infoDiv.current.offsetHeight - 10;
      let horz = center - infoDiv.current.offsetWidth + 15;
      if (horz < 80 && windowWidth > 768) {
        horz = 80;
      }
      if (horz < 0 && windowWidth < 769) {
        horz = 20;
      }
      infoBox.style.left = `${horz}px`;
      infoBox.style.top = `${vert}px`;
      infoBox.style.maxWidth = `${wrapWidth}px`;
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { ref: infoDiv, className: `${infoTextOpen ? "hover_text help open" : "hover_text help"}`, children: [
    (_a = infoText == null ? void 0 : infoText.text) == null ? void 0 : _a.map((text2, index2) => {
      return /* @__PURE__ */ jsxs(React.Fragment, { children: [
        text2.title && /* @__PURE__ */ jsx("h3", { children: text2.title }),
        /* @__PURE__ */ jsx("p", { children: text2.description }),
        text2.subTitle && /* @__PURE__ */ jsx("h5", { children: text2.subTitle }),
        text2.tip && /* @__PURE__ */ jsx("p", { children: text2.tip })
      ] }, index2);
    }),
    /* @__PURE__ */ jsx("div", { ref: (newRef) => setTriangleRef(newRef), className: "info_text_triangle", children: /* @__PURE__ */ jsx(VscTriangleDown, {}) })
  ] });
};
function CourseCreator({ courseArray, offerArray, categories: categories2 }) {
  const { auth } = usePage().props;
  const username = auth.user.userInfo.username;
  const [showTiny, setShowTiny] = useState(false);
  const [openIndex, setOpenIndex] = useState([0]);
  const [hoverSection, setHoverSection] = useState(null);
  const [courseData, dispatch] = useReducer(reducer$2, courseArray);
  const [sections, setSections] = useState(courseArray["sections"]);
  const [offerData, dispatchOfferData] = useReducer(offerDataReducer, offerArray);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [infoText, setInfoText] = useState({ section: "", text: [] });
  const [infoTextOpen, setInfoTextOpen] = useState(false);
  const [infoLocation, setInfoLocation] = useState({});
  const [infoClicked, setInfoClicked] = useState(null);
  const [triangleRef, setTriangleRef] = useState(null);
  const initialRender = useRef(true);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const [completedCrop, setCompletedCrop] = useState({});
  const nodesRef = useRef({});
  const divRef = useRef(null);
  const columnRef = useRef(null);
  const [showLoader, setShowLoader] = useState({
    show: false,
    icon: "",
    position: ""
  });
  const [flash, setFlash] = useState({
    show: false,
    type: "",
    msg: ""
  });
  useEffect(() => {
    previewButtonRequest(setShowPreviewButton);
  }, []);
  useEffect(() => {
    function setPreviewButton() {
      previewButtonRequest(setShowPreviewButton);
    }
    window.addEventListener("resize", setPreviewButton);
    return () => {
      window.removeEventListener("resize", setPreviewButton);
    };
  }, []);
  useEffect(() => {
    function setPreview() {
      if (window.innerWidth > 992) {
        setShowPreview(false);
        document.querySelector("body").classList.remove("fixed");
      }
    }
    window.addEventListener("resize", setPreview);
    return () => {
      window.removeEventListener("resize", setPreview);
    };
  }, []);
  const showFlash = (show = false, type = "", msg = "") => {
    setFlash({ show, type, msg });
  };
  useEffect(() => {
    EventBus.on("success", (data) => {
      showFlash(true, "success", data.message.replace(/"/g, ""));
      return () => EventBus.remove("success");
    });
  }, []);
  useEffect(() => {
    EventBus.on("error", (data) => {
      showFlash(true, "error", data.message.replace(/"/g, ""));
      return () => EventBus.remove("error");
    });
  }, []);
  useEffect(() => {
    const firstRender = initialRender.current;
    if (!firstRender) {
      document.querySelector(".menu_wrap").style.background = courseData["header_color"];
    } else {
      initialRender.current = false;
    }
  }, [courseData["header_color"]]);
  useEffect(() => {
    const firstRender = initialRender.current;
    if (!firstRender) {
      document.querySelectorAll(".menu_wrap a .menu_icon").forEach((div) => {
        div.style.color = courseData["header_text_color"];
      });
      document.querySelector(".menu_top").style.borderColor = courseData["header_text_color"];
      document.querySelectorAll(".menu_top a span").forEach((div) => {
        div.style.background = courseData["header_text_color"];
      });
    } else {
      initialRender.current = false;
    }
  }, [courseData["header_text_color"]]);
  const handleMouseHover = (e) => {
    setHoverSection(e.target.id);
  };
  const landerUrl = window.location.protocol + "//" + window.location.host + "/" + username + "/course-page/" + courseData["slug"];
  const liveUrl = window.location.protocol + "//" + window.location.host + "/" + username + "/course/" + courseData["slug"];
  let videoCount = 0;
  let textCount = 0;
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      let newArray;
      setSections((sections2) => {
        const oldIndex = sections2.map(function(e) {
          return e.id;
        }).indexOf(active.id);
        const newIndex = sections2.map(function(e) {
          return e.id;
        }).indexOf(over.id);
        newArray = arrayMove(sections2, oldIndex, newIndex);
        return newArray;
      });
      const packets = {
        sections: newArray
      };
      updateSectionsPositions$1(packets).then(() => {
        setShowTiny(false);
        setShowTiny(true);
      });
    }
  };
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Course Creator" }),
    /* @__PURE__ */ jsx(ToolTipContextProvider, { value: {
      infoText,
      setInfoText,
      infoTextOpen,
      setInfoTextOpen,
      infoLocation,
      setInfoLocation,
      infoClicked,
      setInfoClicked,
      setTriangleRef,
      triangleRef
    }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "page_title", children: "Course Creator" }),
      /* @__PURE__ */ jsx("section", { className: "card edit_page creator course_creator", children: /* @__PURE__ */ jsx("div", { id: "links_page", children: /* @__PURE__ */ jsx("div", { id: "edit_course", className: "my_row creator_wrap", children: /* @__PURE__ */ jsxs("div", { className: "my_row page_wrap", children: [
        showLoader.show && /* @__PURE__ */ jsx(
          Loader,
          {
            showLoader
          }
        ),
        flash.show && /* @__PURE__ */ jsx(
          Flash,
          {
            ...flash,
            setFlash,
            removeFlash: showFlash
          }
        ),
        showPreviewButton && /* @__PURE__ */ jsx(PreviewButton, { setShowPreview }),
        /* @__PURE__ */ jsxs("div", { className: "left_column", ref: columnRef, children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 card_title", children: "Create Your Course" }),
          /* @__PURE__ */ jsxs("div", { className: "content_wrap my_row creator", id: "left_col_wrap", children: [
            /* @__PURE__ */ jsxs(
              "section",
              {
                id: "header_section",
                className: "my_row section_row",
                onMouseEnter: (e) => handleMouseHover(e),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "section_title", children: /* @__PURE__ */ jsx("h4", { children: "Header" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "section_content my_row", ref: divRef, children: [
                    /* @__PURE__ */ jsx(
                      InputComponent$2,
                      {
                        placeholder: "Course Title",
                        type: "text",
                        maxChar: 60,
                        hoverText: "Submit Course Title",
                        elementName: "title",
                        courseData,
                        dispatch,
                        value: courseData["title"]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ImageComponent$1,
                      {
                        ref: nodesRef,
                        completedCrop,
                        setCompletedCrop,
                        setShowLoader,
                        data: courseData,
                        dispatch,
                        elementName: "logo",
                        placeholder: "Logo",
                        type: "extPreview",
                        cropArray: {
                          unit: "%",
                          width: 60,
                          height: 30,
                          x: 25,
                          y: 25
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "picker_wrap", children: [
                      /* @__PURE__ */ jsx(
                        ColorPicker$1,
                        {
                          label: "Header Background Color",
                          courseData,
                          dispatch,
                          elementName: "header_color"
                        }
                      ),
                      /* @__PURE__ */ jsx(ToolTipIcon, { section: "course_header_color" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "picker_wrap", children: [
                      /* @__PURE__ */ jsx(
                        ColorPicker$1,
                        {
                          label: "Course Title Color",
                          courseData,
                          dispatch,
                          elementName: "header_text_color"
                        }
                      ),
                      /* @__PURE__ */ jsx(ToolTipIcon, { section: "course_header_text_color" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      DropdownComponent$2,
                      {
                        id: courseData["id"],
                        dispatch,
                        value: courseData["category"] || "",
                        categories: categories2
                      }
                    ),
                    courseData["slug"] && offerData["published"] ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsxs("div", { className: "url_wrap mb-4", children: [
                        /* @__PURE__ */ jsx("p", { children: "Landing Page:" }),
                        /* @__PURE__ */ jsx("a", { target: "_blank", href: landerUrl, children: landerUrl })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "url_wrap", children: [
                        /* @__PURE__ */ jsx("p", { children: "Live Page:" }),
                        /* @__PURE__ */ jsx("a", { target: "_blank", href: liveUrl, children: liveUrl })
                      ] })
                    ] }) : ""
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "section",
              {
                id: "intro_video_section",
                className: "my_row section_row",
                onMouseEnter: (e) => setHoverSection(e.target.id),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "section_title", children: /* @__PURE__ */ jsx("h4", { children: "Intro Video" }) }),
                  /* @__PURE__ */ jsx("div", { className: "section_content my_row", children: /* @__PURE__ */ jsx(
                    InputComponent$2,
                    {
                      placeholder: "YouTube or Vimeo Link",
                      type: "url",
                      hoverText: "Add Embed Link",
                      elementName: "intro_video",
                      value: courseData["intro_video"] || "",
                      courseData,
                      dispatch
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "section",
              {
                id: "intro_text_section",
                className: "my_row section_row",
                onMouseEnter: (e) => setHoverSection(e.target.id),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "section_title", children: /* @__PURE__ */ jsx("h4", { children: "Intro Text" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "section_content my_row", children: [
                    /* @__PURE__ */ jsx(
                      InputComponent$2,
                      {
                        placeholder: "Intro Text",
                        type: "wysiwyg",
                        hoverText: "Submit Intro Text",
                        elementName: "intro_text",
                        courseData,
                        dispatch,
                        value: courseData["intro_text"],
                        showTiny,
                        setShowTiny
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ColorPicker$1,
                      {
                        label: "Background Color",
                        courseData,
                        dispatch,
                        elementName: "intro_background_color"
                      }
                    )
                  ] })
                ]
              }
            ),
            !isEmpty(sections) && /* @__PURE__ */ jsx(
              DndContext,
              {
                sensors,
                collisionDetection: closestCenter,
                onDragEnd: handleDragEnd,
                children: /* @__PURE__ */ jsx("section", { className: "sections_wrap my_row mb-5", children: /* @__PURE__ */ jsx(
                  SortableContext,
                  {
                    items: sections,
                    strategy: verticalListSortingStrategy,
                    children: sections.map((section2, index2) => {
                      {
                        section2.type === "video" ? ++videoCount : ++textCount;
                      }
                      return /* @__PURE__ */ jsx(
                        Section$1,
                        {
                          section: section2,
                          index: index2,
                          sections,
                          setSections,
                          openIndex,
                          setOpenIndex,
                          videoCount,
                          textCount,
                          setHoverSection,
                          showTiny,
                          setShowTiny
                        },
                        section2.id
                      );
                    })
                  }
                ) })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "link_row my-5", children: [
              /* @__PURE__ */ jsx(
                AddSectionLink$1,
                {
                  sections,
                  setSections,
                  courseID: courseData["id"],
                  setOpenIndex,
                  type: "text"
                }
              ),
              /* @__PURE__ */ jsx(
                AddSectionLink$1,
                {
                  sections,
                  setSections,
                  courseID: courseData["id"],
                  setOpenIndex,
                  type: "video"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "my_row section_row", children: [
              /* @__PURE__ */ jsx("div", { className: "section_title", children: /* @__PURE__ */ jsx("h4", { children: "Nitty Gritty" }) }),
              /* @__PURE__ */ jsxs("div", { className: "section_content my_row", children: [
                /* @__PURE__ */ jsx(
                  ImageComponent$1,
                  {
                    placeholder: "Course Icon",
                    ref: nodesRef,
                    completedCrop,
                    setCompletedCrop,
                    setShowLoader,
                    elementName: `icon`,
                    dispatch: dispatchOfferData,
                    data: offerData,
                    type: "inlinePreview",
                    cropArray: {
                      unit: "%",
                      width: 30,
                      aspect: 1
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  InputComponent$2,
                  {
                    placeholder: "$ Course price in USD",
                    type: "currency",
                    hoverText: "Submit Course Price",
                    elementName: "price",
                    offerData,
                    dispatchOffer: dispatchOfferData,
                    value: offerData["price"]
                  }
                ),
                /* @__PURE__ */ jsx(
                  SwitchOptions$1,
                  {
                    dispatchOffer: dispatchOfferData,
                    offerData
                  }
                )
              ] })
            ] }),
            !offerData["published"] && /* @__PURE__ */ jsx(
              PublishButton$1,
              {
                offerData,
                dispatchOffer: dispatchOfferData,
                courseTitle: courseData["title"]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            InfoText,
            {
              divRef: columnRef
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: `right_column links_col preview${showPreview ? " show" : ""}`, children: /* @__PURE__ */ jsx(
          Preview$3,
          {
            sections,
            courseData,
            setShowPreview,
            url: landerUrl,
            hoverSection,
            nodesRef,
            completedCrop
          }
        ) })
      ] }) }) }) })
    ] }) })
  ] });
}
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CourseCreator
}, Symbol.toStringTag, { value: "Module" }));
const PreviewSection$1 = ({ section: section2 }) => {
  const firstUpdate = useRef(true);
  const [buttonStyle, setButtonStyle] = useState(null);
  const {
    type,
    bg_color,
    text: text2,
    image,
    button,
    button_position,
    button_link,
    button_size,
    button_text,
    button_text_color,
    button_color
  } = section2;
  const [textValue, setTextValue] = useState(text2);
  useEffect(() => {
    setButtonStyle({
      background: button_color,
      color: button_text_color,
      width: button_size + "%"
    });
  }, []);
  useEffect(() => {
    if (firstUpdate.current && text2) {
      const allContent = JSON.parse(text2);
      allContent["blocks"] = allContent["blocks"].map((block) => {
        if (!block.text) {
          block.text = "";
        }
        return block;
      });
      setTextValue(draftToHtml(allContent));
      firstUpdate.current = false;
    } else if (text2) {
      setTextValue(text2);
    }
  }, [text2]);
  const createMarkup = (text22) => {
    return {
      __html: DOMPurify.sanitize(text22)
    };
  };
  const Button = ({ buttonText }) => {
    return /* @__PURE__ */ jsx("div", { className: `button_wrap my_row ${button_position ? button_position : "above"}`, children: /* @__PURE__ */ jsx(
      "a",
      {
        href: button_link,
        target: "_blank",
        className: "button",
        style: buttonStyle,
        children: buttonText || "Get Course"
      }
    ) });
  };
  return /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsxs("div", { className: type, style: { background: bg_color || "rgba(255,255,255,1)" }, children: [
    !!button && button_position === "above" && /* @__PURE__ */ jsx(
      Button,
      {
        buttonText: button_text
      }
    ),
    {
      "text": /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: createMarkup(textValue) }),
      "image": /* @__PURE__ */ jsx(
        "div",
        {
          className: "image_bg",
          style: {
            background: "url(" + image + ") center no-repeat",
            backgroundSize: "cover",
            minHeight: "95px"
          }
        }
      )
    }[type],
    !!button && button_position === "below" && /* @__PURE__ */ jsx(
      Button,
      {
        buttonText: button_text
      }
    )
  ] }) });
};
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PreviewSection$1
}, Symbol.toStringTag, { value: "Module" }));
const Preview$2 = ({ landingPage }) => {
  const loadPreviewHeight = UseLoadPreviewHeight(20);
  const resizePreviewHeight2 = UseResizePreviewHeight(20);
  const { header_color, header_text_color, hero, logo, sections, slogan } = landingPage;
  return /* @__PURE__ */ jsx("div", { className: "links_wrap preview lp_creator", children: /* @__PURE__ */ jsx("div", { className: "inner_content", id: "preview_wrap", children: /* @__PURE__ */ jsxs("div", { className: "inner_content_wrap", style: { maxHeight: resizePreviewHeight2 ? resizePreviewHeight2 + "px" : loadPreviewHeight + "px" }, children: [
    /* @__PURE__ */ jsxs("section", { className: "header my_row", id: "preview_header_section", children: [
      /* @__PURE__ */ jsxs("div", { className: "top_section", style: {
        background: header_color || "#ffffff"
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "logo", children: /* @__PURE__ */ jsx("img", { src: logo || Vapor.asset("images/logo.png"), alt: "" }) }),
        /* @__PURE__ */ jsx("div", { className: "text_wrap", children: /* @__PURE__ */ jsx("p", { style: { color: header_text_color || "#ffffff" }, children: slogan }) })
      ] }),
      hero && /* @__PURE__ */ jsx(
        "div",
        {
          className: "header_image my_row",
          style: {
            background: "url(" + hero + ") center 25% / cover no-repeat",
            minHeight: "75px"
          }
        }
      )
    ] }),
    !isEmpty(sections) && /* @__PURE__ */ jsx("div", { className: "sections", children: sections.map((section2, index2) => {
      return /* @__PURE__ */ jsx(
        PreviewSection$1,
        {
          section: section2
        },
        section2["id"]
      );
    }) })
  ] }) }) });
};
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Preview$2
}, Symbol.toStringTag, { value: "Module" }));
const SwitchOptions = ({ offer }) => {
  const [currentOffer, setCurrentOffer] = useState(offer);
  const { id, title, price, active, public_offer, published, slug, course_id } = currentOffer;
  const handleChange = (type) => {
    const value = !currentOffer[type];
    let key = type;
    if (type.includes("_")) {
      key = type.split("_")[0];
    }
    const packets = {
      [`${key}`]: value
    };
    updateOfferData(packets, id).then((response) => {
      if (response.success) {
        setCurrentOffer((prev) => ({
          ...prev,
          [`${type}`]: value
        }));
      }
    });
  };
  return /* @__PURE__ */ jsxs("tr", { children: [
    /* @__PURE__ */ jsxs("td", { children: [
      /* @__PURE__ */ jsx(Link$1, { className: "blue", href: `/creator-center/course/${course_id}`, children: " Edit" }),
      /* @__PURE__ */ jsx("p", { children: title })
    ] }),
    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
      IOSSwitch,
      {
        onChange: () => handleChange("active"),
        checked: Boolean(active),
        disabled: !Boolean(published)
      }
    ) }),
    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
      IOSSwitch,
      {
        onChange: () => handleChange("public_offer"),
        checked: Boolean(public_offer),
        disabled: !Boolean(published)
      }
    ) }),
    /* @__PURE__ */ jsxs("td", { children: [
      "$",
      price || "0.00"
    ] }),
    /* @__PURE__ */ jsxs("td", { children: [
      "$",
      (Math.round(price * 0.8 * 100) / 100).toFixed(2)
    ] }),
    /* @__PURE__ */ jsxs("td", { children: [
      "$",
      (Math.round(price * 0.4 * 100) / 100).toFixed(2)
    ] })
  ] }, id);
};
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SwitchOptions
}, Symbol.toStringTag, { value: "Module" }));
const TableComponent = ({ offers }) => {
  const table_wrap = useRef(null);
  return /* @__PURE__ */ jsxs("div", { className: "my_row", children: [
    /* @__PURE__ */ jsx("div", { className: "table_wrap my_row table-responsive", ref: table_wrap, children: /* @__PURE__ */ jsxs("table", { className: "table table-borderless", role: "table", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { scope: "col", children: /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx("span", { children: "Courses" }) }) }),
        /* @__PURE__ */ jsx("th", { scope: "col", children: /* @__PURE__ */ jsxs("h5", { children: [
          /* @__PURE__ */ jsx("span", { children: "Active" }),
          /* @__PURE__ */ jsx(ToolTipIcon, { section: "creator_active" })
        ] }) }),
        /* @__PURE__ */ jsx("th", { scope: "col", children: /* @__PURE__ */ jsxs("h5", { children: [
          /* @__PURE__ */ jsx("span", { children: "Public" }),
          /* @__PURE__ */ jsx(ToolTipIcon, { section: "creator_public" })
        ] }) }),
        /* @__PURE__ */ jsx("th", { scope: "col", children: /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx("span", { children: "Price" }) }) }),
        /* @__PURE__ */ jsx("th", { scope: "col", children: /* @__PURE__ */ jsxs("h5", { children: [
          /* @__PURE__ */ jsx("span", { children: "PRP" }),
          /* @__PURE__ */ jsx(ToolTipIcon, { section: "creator_prp" })
        ] }) }),
        /* @__PURE__ */ jsx("th", { scope: "col", children: /* @__PURE__ */ jsxs("h5", { children: [
          /* @__PURE__ */ jsx("span", { children: "ARP" }),
          /* @__PURE__ */ jsx(ToolTipIcon, { section: "creator_arp" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: offers == null ? void 0 : offers.map((offer) => {
        return /* @__PURE__ */ jsx(
          SwitchOptions,
          {
            offer
          },
          offer.id
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      InfoText,
      {
        divRef: table_wrap
      }
    )
  ] });
};
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TableComponent
}, Symbol.toStringTag, { value: "Module" }));
function CreatorCenter({ offers, landingPage }) {
  const [infoText, setInfoText] = useState({ section: "", text: [] });
  const [infoTextOpen, setInfoTextOpen] = useState(false);
  const [infoLocation, setInfoLocation] = useState({});
  const [infoClicked, setInfoClicked] = useState(null);
  const [triangleRef, setTriangleRef] = useState(null);
  const [lpActive, setLpActive] = useState(landingPage ? Boolean(landingPage["active"]) : Boolean(0));
  const handleChange = () => {
    activatePage(landingPage["id"]).then((response) => {
      if (response.success) {
        setLpActive(!lpActive);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Creator Center" }),
    /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "page_title", children: "Creator Center" }),
      /* @__PURE__ */ jsx("section", { id: "creator_center", className: "card edit_page", children: /* @__PURE__ */ jsx(ToolTipContextProvider, { value: {
        infoText,
        setInfoText,
        infoTextOpen,
        setInfoTextOpen,
        infoLocation,
        setInfoLocation,
        infoClicked,
        setInfoClicked,
        setTriangleRef,
        triangleRef
      }, children: (offers == null ? void 0 : offers.length) === 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h3", { children: "Become a LinkPro Course Creator to generate revenue from your social following and beyond!" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "number", children: "1" }),
            /* @__PURE__ */ jsxs("div", { className: "text_wrap", children: [
              /* @__PURE__ */ jsx("h4", { children: "Add A Course" }),
              /* @__PURE__ */ jsx("p", { children: "Create and upload your proprietary Course videos and charge for customers to access your content." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "number", children: "2" }),
            /* @__PURE__ */ jsxs("div", { className: "text_wrap", children: [
              /* @__PURE__ */ jsx("h4", { children: "Create A Landing Page" }),
              /* @__PURE__ */ jsx("p", { children: "A Landing Page is your exclusive page and link you build to help market the Courses you create." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "number", children: "3" }),
            /* @__PURE__ */ jsxs("div", { className: "text_wrap", children: [
              /* @__PURE__ */ jsx("h4", { children: "Promote your Course link and get paid!" }),
              /* @__PURE__ */ jsx("p", { children: "Publish and market your Course to generate income. Recruit others to sell your Course to earn shared profits!" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("a", { className: "button blue", href: "/creator-center/add-course", children: "Get Started!" })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "grid_columns", children: [
        /* @__PURE__ */ jsxs("div", { className: "column", children: [
          /* @__PURE__ */ jsx("div", { className: "column_title", children: /* @__PURE__ */ jsxs("h3", { children: [
            /* @__PURE__ */ jsx("span", { children: "Landing Page" }),
            /* @__PURE__ */ jsx(ToolTipIcon, { section: "creator_lp" })
          ] }) }),
          landingPage ? /* @__PURE__ */ jsx(
            Preview$2,
            {
              landingPage
            }
          ) : /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/blank-lp.png"), alt: "" }) }),
          /* @__PURE__ */ jsxs("div", { className: "buttons_wrap my_row", children: [
            /* @__PURE__ */ jsx("div", { className: "button_wrap", children: /* @__PURE__ */ jsx(
              Link$1,
              {
                className: "button blue",
                href: landingPage ? `/creator-center/landing-page/${landingPage["id"]}` : "/creator-center/add-landing-page",
                children: landingPage ? "Edit" : "Create"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "switch_wrap", children: [
              /* @__PURE__ */ jsx("h5", { children: "Active" }),
              /* @__PURE__ */ jsx(
                IOSSwitch,
                {
                  onChange: handleChange,
                  disabled: landingPage && landingPage["published"] ? Boolean(0) : Boolean(1),
                  checked: lpActive
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "column", children: [
          /* @__PURE__ */ jsx("div", { className: "column_title", children: /* @__PURE__ */ jsxs("h3", { children: [
            "Courses",
            /* @__PURE__ */ jsx(ToolTipIcon, { section: "creator_course" })
          ] }) }),
          /* @__PURE__ */ jsx(TableComponent, { offers }),
          /* @__PURE__ */ jsx("div", { className: "link_wrap my_row", children: /* @__PURE__ */ jsxs(Link$1, { className: "blue", href: route("add.course"), children: [
            /* @__PURE__ */ jsx(FaPlus, {}),
            "Add New Course"
          ] }) })
        ] })
      ] }) }) })
    ] })
  ] });
}
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreatorCenter
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard$1({ auth }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: "You're logged in!" }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard$1
}, Symbol.toStringTag, { value: "Module" }));
const addFolder = (packets) => {
  return axios$1.post("/folder/new", packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
      const folder_id = response.data.id;
      const position = response.data.position;
      return {
        success: true,
        id: folder_id,
        position
      };
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const deleteFolder = (packets, folderID) => {
  return axios$1.put("/dashboard/folder/delete/" + folderID, packets).then(
    (response) => {
      const links = response.data.links;
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
      return {
        links,
        success: true
      };
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updateFolderName = (folderID, packets) => {
  return axios$1.patch("/dashboard/folder/update-name/" + folderID, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const TrackFolderClick = (folderID) => {
  axios$1.post("/folder-click/" + folderID).then(
    (response) => {
      console.log(JSON.stringify(response.data.message));
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
  });
};
const TrackIconClick = (linkID) => {
  axios$1.post("/link-click/" + linkID).then(
    (response) => {
      console.log("Success");
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
  });
};
const AccordionLinks = ({ icons: icons2, subStatus }) => {
  const { id, name: name2, email, phone, icon, url, active_status } = icons2;
  let source;
  if (email) {
    source = "mailto:" + email;
  } else if (phone) {
    source = "tel:" + phone;
    if (icon.includes("Facetime")) {
      source = "facetime:" + phone;
    }
  } else {
    source = url;
  }
  return /* @__PURE__ */ jsx("div", { className: "icon_col", children: active_status ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("a", { href: source, target: "_blank", onClick: (e) => TrackIconClick(id), children: /* @__PURE__ */ jsx("img", { src: checkIcon(icon, "preview", subStatus), alt: name2, title: name2 }) }),
    /* @__PURE__ */ jsx("p", { children: (name2 == null ? void 0 : name2.length) > 11 ? name2.substring(
      0,
      11
    ) + "..." : name2 || "Link Name" })
  ] }) : "" });
};
const Header = ({
  nodesRef,
  completedCrop
}) => {
  var _a, _b, _c, _d, _e, _f;
  const { pageSettings } = useContext(PageContext);
  const myStyle = {
    backgroundImage: "url(" + pageSettings["header_img"] + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !pageSettings["header_img"] && !((_a = completedCrop["header_img"]) == null ? void 0 : _a.isCompleted) ? /* @__PURE__ */ jsx("div", { className: "page_header default", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/default-img.png"), alt: "" }) }) : "",
    pageSettings["header_img"] && !((_b = completedCrop["header_img"]) == null ? void 0 : _b.isCompleted) ? /* @__PURE__ */ jsx("div", { className: "page_header", style: myStyle }) : /* @__PURE__ */ jsx(
      "div",
      {
        className: "page_header canvas",
        style: {
          width: ((_c = completedCrop["header_img"]) == null ? void 0 : _c.isCompleted) ? `100%` : 0,
          height: ((_d = completedCrop["header_img"]) == null ? void 0 : _d.isCompleted) ? `auto` : 0
        },
        children: /* @__PURE__ */ jsx(
          "canvas",
          {
            ref: (ref) => nodesRef.current["header_img"] = ref,
            style: {
              objectFit: `cover`,
              width: ((_e = completedCrop["header_img"]) == null ? void 0 : _e.isCompleted) ? `100%` : 0,
              height: ((_f = completedCrop["header_img"]) == null ? void 0 : _f.isCompleted) ? `auto` : 0,
              borderTopRightRadius: `12%`,
              borderTopLeftRadius: `12%`
            }
          }
        )
      }
    )
  ] });
};
const __vite_glob_0_76 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Header
}, Symbol.toStringTag, { value: "Module" }));
const ProfileImage = ({
  completedCrop,
  nodesRef
}) => {
  var _a, _b, _c, _d, _e;
  const { pageSettings } = useContext(PageContext);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `
            ${pageSettings["profile_img"] && !((_a = completedCrop.profile_img) == null ? void 0 : _a.isCompleted) || ((_b = completedCrop.profile_img) == null ? void 0 : _b.isCompleted) ? "profile_img_column" : "profile_img_column default"} `,
      children: !((_c = completedCrop.profile_img) == null ? void 0 : _c.isCompleted) ? /* @__PURE__ */ jsx("div", { className: "profile_image", children: /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsx("img", { src: pageSettings["profile_img"] || Vapor.asset("images/default-img.png"), alt: "" }) }) }) : /* @__PURE__ */ jsx("div", { className: "profile_image", children: /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsx(
        "canvas",
        {
          ref: (ref) => nodesRef.current.profile_img = ref,
          style: {
            objectFit: `cover`,
            width: ((_d = completedCrop.profile_img) == null ? void 0 : _d.isCompleted) ? `100%` : 0,
            height: ((_e = completedCrop.profile_img) == null ? void 0 : _e.isCompleted) ? `100%` : 0,
            borderRadius: `50px`
          }
        }
      ) }) })
    }
  ) });
};
const __vite_glob_0_79 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProfileImage
}, Symbol.toStringTag, { value: "Module" }));
const ProfileText = () => {
  const { pageSettings } = useContext(PageContext);
  return /* @__PURE__ */ jsxs("div", { className: "profile_text", children: [
    /* @__PURE__ */ jsx("h2", { children: pageSettings["title"] || "Add Title" }),
    /* @__PURE__ */ jsx("p", { children: pageSettings["bio"] || "Add Bio or Slogan" })
  ] });
};
const __vite_glob_0_80 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProfileText
}, Symbol.toStringTag, { value: "Module" }));
const FolderLinks$1 = ({ icons: icons2, subStatus }) => {
  const { name: name2, icon, active_status } = icons2;
  return /* @__PURE__ */ jsx("div", { className: "image_col", children: active_status ? /* @__PURE__ */ jsx("img", { src: checkIcon(icon, "preview", subStatus), alt: name2, title: name2 }) : "" });
};
const Folder = ({
  id,
  colClasses,
  mainIndex,
  links,
  setRow,
  value,
  setValue,
  dataRow,
  name: name2,
  clickType,
  setClickType,
  subStatus
}) => {
  const folderClick = (e, index2) => {
    e.preventDefault();
    const clickedDiv = e.currentTarget.parentNode;
    if (clickedDiv.classList.contains("open")) {
      setRow(null);
      setValue(null);
    } else {
      setRow(clickedDiv.firstChild.dataset.row);
      setValue(index2);
      setClickType("folder");
      setTimeout(function() {
        document.querySelector(".icons_wrap.inner .icon_col:last-child").scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }, 300);
      TrackFolderClick(id);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: ` ${colClasses} ${mainIndex == value && clickType === "folder" ? " open" : ""} `, children: [
    /* @__PURE__ */ jsxs("a", { className: "inner_icon_wrap", href: "#", "data-row": dataRow, onClick: (e) => {
      folderClick(e, mainIndex);
    }, children: [
      /* @__PURE__ */ jsx("img", { className: "bg_image", src: Vapor.asset("images/blank-folder-square.jpg"), alt: "" }),
      /* @__PURE__ */ jsx("div", { className: "folder_icons preview", children: links.slice(0, 9).map((innerLinkIcons, index2) => {
        return /* @__PURE__ */ jsx(
          FolderLinks$1,
          {
            icons: innerLinkIcons,
            subStatus
          },
          index2
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx("p", { children: name2 && name2.length > 11 ? name2.substring(
      0,
      11
    ) + "..." : name2 || "Folder Name" })
  ] });
};
const FormIcon = ({
  colClasses,
  displayIcon,
  name: name2,
  active_status,
  dataRow,
  setRow,
  value,
  setValue,
  mainIndex,
  index: index2,
  clickType,
  setClickType,
  type
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    const clickedDiv = e.currentTarget;
    if (clickedDiv.classList.contains("open")) {
      setRow(null);
      setValue(null);
    } else {
      setRow(clickedDiv.dataset.row);
      setValue(index2);
      setClickType(type);
      setTimeout(function() {
        document.querySelector(".form.open .form_wrap").scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }, 300);
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: ` ${colClasses} ${mainIndex == value && clickType === type ? " open" : ""}`,
      "data-row": dataRow,
      onClick: (e) => {
        handleClick(e);
      },
      children: active_status ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            className: !displayIcon ? "default" : "",
            href: "#",
            children: /* @__PURE__ */ jsx("img", { src: displayIcon, alt: "" })
          }
        ),
        /* @__PURE__ */ jsx("p", { children: name2 && name2.length > 11 ? name2.substring(
          0,
          11
        ) + "..." : name2 || "Link Name" })
      ] }) : ""
    }
  );
};
const SubscribeForm = ({
  dataRow,
  row,
  mailchimpListId,
  clickType,
  userId
}) => {
  const [formValue, setFormValue] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const packets = {
      email: formValue,
      listId: mailchimpListId,
      user: userId
    };
    axios$1.post("/mailchimp/subscribe", packets).then(
      (response) => {
        const mcResponse = response.data.mcResponse;
        console.log(mcResponse);
        setSuccessful(true);
      }
    ).catch((error2) => {
      const errorDiv = document.querySelector("#subscribe_error");
      if (error2.response !== void 0) {
        const mcResponse = error2.response.data.message.split("response:");
        setError(mcResponse[1]);
        errorDiv.innerHTML = "<p>" + mcResponse[1] + "</p>";
        console.error("ERROR:: ", error2.response.data.message);
      } else {
        console.error("ERROR:: ", error2);
      }
      return {
        success: false
      };
    });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: mailchimpListId !== void 0 && /* @__PURE__ */ jsx("div", { className: `my_row form ${dataRow == row && clickType === "mailchimp" ? "open" : ""}`, children: dataRow == row && /* @__PURE__ */ jsx("div", { className: "form_wrap", children: successful ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h3", { children: "Success!" }),
    /* @__PURE__ */ jsx("p", { children: "Check your email for confirmation and/or a welcome message." })
  ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: (e) => handleSubmit(e), children: [
    /* @__PURE__ */ jsx("h3", { children: "Enter Your Email To Subscribe." }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "email",
        name: "email",
        value: formValue,
        placeholder: "Email Address",
        onChange: (e) => setFormValue(e.target.value)
      }
    ),
    error && /* @__PURE__ */ jsx("p", { className: "mx-4 !text-red-600", children: error }),
    /* @__PURE__ */ jsx("button", { className: "button blue", type: "submit", children: "Submit" })
  ] }) }) }) });
};
const StoreProducts = ({
  dataRow,
  row,
  clickType,
  storeProducts
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: storeProducts && /* @__PURE__ */ jsx("div", { className: `my_row form ${dataRow == row && clickType === "shopify" ? "open" : ""}`, children: dataRow == row && /* @__PURE__ */ jsx("div", { className: "form_wrap", children: /* @__PURE__ */ jsx("div", { className: "products_grid folder", children: storeProducts.map((product) => {
    const { id, title, product_url, image_url, price } = product;
    return /* @__PURE__ */ jsx("div", { className: "single_product", children: /* @__PURE__ */ jsxs("a", { href: product_url, target: "_blank", children: [
      /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsx("img", { src: image_url, alt: title }) }),
      /* @__PURE__ */ jsx("h3", { children: title }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("sup", { children: "$" }),
        price
      ] })
    ] }) }, id);
  }) }) }) }) });
};
const Preview$1 = ({
  nodesRef,
  completedCrop,
  row,
  setRow,
  value,
  setValue,
  subStatus,
  pageHeaderRef,
  setShowPreview
}) => {
  const loadPreviewHeight = UseLoadPreviewHeight();
  const resizePreviewHeight2 = UseResizePreviewHeight();
  const { userLinks: userLinks2 } = useContext(UserLinksContext);
  const { pageSettings } = useContext(PageContext);
  const [iconCount, setIconCount] = useState(null);
  const [clickType, setClickType] = useState(null);
  useEffect(() => {
    if (subStatus) {
      setIconCount(userLinks2.length);
    } else {
      setIconCount(8);
    }
  }, [userLinks2]);
  useEffect(() => {
    function handleResize() {
      const windowWidth = window.outerWidth;
      if (windowWidth > 992) {
        document.querySelector(".links_col.preview").classList.remove("show");
        document.querySelector("body").classList.remove("fixed");
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const ClosePreview = () => {
    document.querySelector("body").classList.remove("fixed");
    setShowPreview(false);
  };
  const accordionLinks = value !== null ? userLinks2[value].links : null;
  const mailchimpListId = value !== null ? userLinks2[value].mailchimp_list_id : null;
  const storeProducts = value !== null ? userLinks2[value].shopify_products : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "close_preview", onClick: ClosePreview, children: /* @__PURE__ */ jsx(IoIosCloseCircleOutline, {}) }),
    /* @__PURE__ */ jsx("div", { className: "links_wrap preview", children: /* @__PURE__ */ jsx("div", { className: "inner_content", id: "preview_wrap", children: /* @__PURE__ */ jsxs("div", { className: "inner_content_wrap", style: { maxHeight: resizePreviewHeight2 ? resizePreviewHeight2 + "px" : loadPreviewHeight + "px" }, children: [
      /* @__PURE__ */ jsx(
        Header,
        {
          nodesRef,
          completedCrop
        }
      ),
      /* @__PURE__ */ jsxs("div", { id: pageSettings["profile_layout"], className: "profile_content", ref: pageHeaderRef, children: [
        /* @__PURE__ */ jsx(
          ProfileImage,
          {
            completedCrop,
            nodesRef
          }
        ),
        /* @__PURE__ */ jsx(ProfileText, {})
      ] }),
      /* @__PURE__ */ jsx("div", { className: "icons_wrap main", children: userLinks2 == null ? void 0 : userLinks2.slice(0, iconCount).map((linkItem, index2) => {
        let {
          id,
          type,
          name: name2,
          url,
          email,
          phone,
          icon,
          active_status,
          links
        } = linkItem;
        if (email) {
          url = "mailto:" + email;
        } else if (phone) {
          url = "tel:" + phone;
          if (icon.includes("Facetime")) {
            url = "facetime:" + phone;
          }
        }
        const dataRow = Math.ceil((index2 + 1) / 4);
        let displayIcon = null;
        if (type !== "folder") {
          displayIcon = checkIcon(icon, "preview", subStatus);
        }
        let colClasses = "";
        if (type === "folder" || type === "mailchimp" || type === "shopify") {
          colClasses = "icon_col folder";
        } else {
          colClasses = "icon_col";
        }
        return /* @__PURE__ */ jsxs(React.Fragment, { children: [
          (() => {
            switch (type) {
              case "folder":
                return active_status && subStatus ? /* @__PURE__ */ jsx(
                  Folder,
                  {
                    colClasses,
                    mainIndex: index2,
                    links,
                    setRow,
                    value,
                    setValue,
                    dataRow,
                    name: name2,
                    clickType,
                    setClickType,
                    subStatus
                  }
                ) : subStatus && /* @__PURE__ */ jsx("div", { className: ` ${colClasses} ` });
              case "standard":
              case "offer":
              case "url":
              case "email":
              case "phone":
                return /* @__PURE__ */ jsx("div", { className: ` ${colClasses} `, children: active_status ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      className: !url || !displayIcon ? "default" : "",
                      target: "_blank",
                      href: url || "#",
                      children: /* @__PURE__ */ jsx("img", { src: displayIcon, alt: "" })
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { children: (name2 == null ? void 0 : name2.length) > 11 ? name2.substring(0, 11) + "..." : name2 || "Link Name" })
                ] }) : "" });
            }
          })(),
          (type === "mailchimp" || type === "shopify") && /* @__PURE__ */ jsx(
            FormIcon,
            {
              colClasses,
              displayIcon,
              name: name2,
              active_status,
              dataRow,
              mainIndex: index2,
              setRow,
              value,
              setValue,
              index: index2,
              setClickType,
              clickType,
              type
            }
          ),
          subStatus && ((index2 + 1) % 4 === 0 || index2 + 1 === iconCount) ? /* @__PURE__ */ jsx(
            SubscribeForm,
            {
              dataRow,
              row,
              mailchimpListId,
              clickType
            }
          ) : "",
          subStatus && ((index2 + 1) % 4 === 0 || index2 + 1 === iconCount) ? /* @__PURE__ */ jsx(
            StoreProducts,
            {
              dataRow,
              row,
              clickType,
              storeProducts
            }
          ) : "",
          subStatus && ((index2 + 1) % 4 === 0 || index2 + 1 === iconCount) ? /* @__PURE__ */ jsx("div", { className: `my_row folder ${dataRow == row && clickType === "folder" ? "open" : ""}`, children: /* @__PURE__ */ jsx("div", { className: "icons_wrap inner", children: dataRow == row ? accordionLinks == null ? void 0 : accordionLinks.map((innerLinkFull, index22) => {
            return /* @__PURE__ */ jsx(
              AccordionLinks,
              {
                icons: innerLinkFull,
                subStatus
              },
              index22
            );
          }) : "" }) }) : ""
        ] }, index2);
      }) })
    ] }) }) })
  ] });
};
const __vite_glob_0_77 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Preview$1
}, Symbol.toStringTag, { value: "Module" }));
const Link = ({
  link,
  handleOnClick,
  fetchFolderLinks,
  handleChange,
  subStatus
}) => {
  const type = link.type || null;
  const linkID = link.id;
  let hasLinks = true;
  let displayIcon;
  if (type === "folder") {
    hasLinks = link.links.length > 0;
  } else {
    displayIcon = checkIcon(link.icon, "", subStatus);
  }
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: link.id });
  const style = {
    transform: CSS$1.Transform.toString(transform),
    transition
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "grid_item",
      ref: setNodeRef,
      style,
      children: /* @__PURE__ */ jsxs("div", { className: "icon_col", children: [
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: "drag_handle",
            ...attributes,
            ...listeners,
            children: [
              /* @__PURE__ */ jsx(MdDragHandle, {}),
              /* @__PURE__ */ jsx("div", { className: "hover_text", children: /* @__PURE__ */ jsx("p", { children: "Move" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "column_content", children: [
          type === "folder" ? /* @__PURE__ */ jsx("div", { className: "icon_wrap folder", children: /* @__PURE__ */ jsxs("div", { className: "inner_icon_wrap", onClick: (e) => {
            fetchFolderLinks(linkID);
          }, children: [
            /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/blank-folder-square.jpg"), alt: "" }),
            /* @__PURE__ */ jsxs("div", { className: hasLinks ? "folder_icons main" : "folder_icons empty", children: [
              hasLinks && link.links.slice(
                0,
                9
              ).map((innerLink, index2) => {
                const {
                  id,
                  icon
                } = innerLink;
                return /* @__PURE__ */ jsx("div", { className: "image_col", children: /* @__PURE__ */ jsx("img", { src: checkIcon(icon, "", subStatus), alt: "" }) }, index2);
              }),
              !hasLinks && /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { children: "+" }),
                " ",
                /* @__PURE__ */ jsx("br", {}),
                "Add",
                /* @__PURE__ */ jsx("br", {}),
                "Icons"
              ] })
            ] })
          ] }) }) : /* @__PURE__ */ jsx("div", { className: "icon_wrap", onClick: (e) => {
            handleOnClick(linkID);
          }, children: /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsx("img", { src: displayIcon, alt: "" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "my_row", children: /* @__PURE__ */ jsxs("div", { className: "switch_wrap", children: [
            /* @__PURE__ */ jsx(
              Switch,
              {
                onChange: () => handleChange(link, hasLinks, type),
                checked: Boolean(link.active_status)
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "hover_text switch", children: /* @__PURE__ */ jsxs("p", { children: [
              Boolean(link.active_status) ? "Disable" : "Enable",
              type === "folder" ? "Folder" : "Icon"
            ] }) })
          ] }) })
        ] })
      ] })
    }
  );
};
const __vite_glob_0_64 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Link
}, Symbol.toStringTag, { value: "Module" }));
const icons = [
  {
    "name": "Amazon Music",
    "required_in_url": "music.amazon",
    "prefix": "https://music.amazon.com/"
  },
  {
    "name": "Among Us",
    "required_in_url": null,
    "prefix": null
  },
  {
    "name": "Apple Music",
    "required_in_url": "music.apple",
    "prefix": "https://music.apple.com/"
  },
  {
    "name": "AutoTrader",
    "required_in_url": "autotrader",
    "prefix": "https://www.autotrader.com/"
  },
  {
    "name": "Behance",
    "required_in_url": "behance",
    "prefix": "https://behance.net"
  },
  {
    "name": "Big Cartel",
    "required_in_url": null,
    "prefix": null
  },
  {
    "name": "CarGurus",
    "required_in_url": "cargurus",
    "prefix": "https://www.cargurus.com/"
  },
  {
    "name": "Cars",
    "required_in_url": "cars",
    "prefix": "https://www.cars.com/"
  },
  {
    "name": "CashApp",
    "required_in_url": "cash.app",
    "prefix": "https://cash.app/"
  },
  {
    "name": "Craigslist",
    "required_in_url": "craigslist",
    "prefix": null
  },
  {
    "name": "Depop",
    "required_in_url": "depop",
    "prefix": "https://www.depop.com/"
  },
  {
    "name": "Discord",
    "required_in_url": "discord",
    "prefix": "https://discord.com/"
  },
  {
    "name": "DoorDash",
    "required_in_url": "doordash",
    "prefix": null
  },
  {
    "name": "Dropbox",
    "required_in_url": "dropbox",
    "prefix": "https://www.dropbox.com/"
  },
  {
    "name": "Ebay",
    "required_in_url": "ebay",
    "prefix": "https://www.ebay.com/"
  },
  {
    "name": "EbayMotors",
    "required_in_url": "ebay",
    "prefix": "https://www.ebay.com/"
  },
  {
    "name": "Etsy",
    "required_in_url": "etsy",
    "prefix": "https://www.etsy.com/"
  },
  {
    "name": "Facebook",
    "required_in_url": "facebook",
    "prefix": "https://www.facebook.com/"
  },
  {
    "name": "Facetime",
    "required_in_url": null
  },
  {
    "name": "Fiverr",
    "required_in_url": "fiverr",
    "prefix": "https://www.fiverr.com/"
  },
  {
    "name": "Flickr",
    "required_in_url": "flickr",
    "prefix": "https://flickr.com/"
  },
  {
    "name": "Gmail",
    "required_in_url": "mail.google"
  },
  {
    "name": "Google Drive",
    "required_in_url": "drive.google",
    "prefix": "https://drive.google.com/"
  },
  {
    "name": "Google Earth",
    "required_in_url": "earth.google",
    "prefix": "https://earth.google.com/"
  },
  {
    "name": "Google Photos",
    "required_in_url": "photos.google",
    "prefix": "https://photos.google.com/"
  },
  {
    "name": "GoogleChat",
    "required_in_url": null,
    "prefix": "https://mail.google.com/chat/"
  },
  {
    "name": "GoogleMaps",
    "required_in_url": "google",
    "prefix": "https://www.google.com/maps/"
  },
  {
    "name": "GrubHub",
    "required_in_url": "grubhub"
  },
  {
    "name": "ICQ",
    "required_in_url": "icq",
    "prefix": "https://www.icq.com/"
  },
  {
    "name": "InstaCart",
    "required_in_url": "instacart"
  },
  {
    "name": "Instagram",
    "required_in_url": "instagram",
    "prefix": "https://www.instagram.com/"
  },
  {
    "name": "Life360",
    "required_in_url": "life360",
    "prefix": "https://www.life360.com/"
  },
  {
    "name": "LinkedIn",
    "required_in_url": "linkedin",
    "prefix": "https://www.linkedin.com/"
  },
  {
    "name": "Marketplace",
    "required_in_url": "facebook",
    "prefix": "https://www.facebook.com/marketplace/"
  },
  {
    "name": "Medium",
    "required_in_url": "medium",
    "prefix": "https://medium.com/"
  },
  {
    "name": "Messenger",
    "required_in_url": "messenger",
    "prefix": "https://www.messenger.com/"
  },
  {
    "name": "MicrosftTeams",
    "required_in_url": null,
    "prefix": "https://teams.live.com/"
  },
  {
    "name": "OfferUp",
    "required_in_url": "offerup",
    "prefix": "https://offerup.com/"
  },
  {
    "name": "OneDrive",
    "required_in_url": "onedrive",
    "prefix": "https://onedrive.live.com/"
  },
  {
    "name": "OnlyFans",
    "required_in_url": "onlyfans",
    "prefix": "https://onlyfans.com/"
  },
  {
    "name": "OpenTable",
    "required_in_url": "opentable"
  },
  {
    "name": "Outlook",
    "required_in_url": "outlook.live"
  },
  {
    "name": "Pandora",
    "required_in_url": "pandora",
    "prefix": "https://www.pandora.com/"
  },
  {
    "name": "Patreon",
    "required_in_url": "patreon",
    "prefix": "https://www.patreon.com/"
  },
  {
    "name": "Paypal",
    "required_in_url": "paypal",
    "prefix": "https://www.paypal.com/"
  },
  {
    "name": "PhotoBucket",
    "required_in_url": "photobucket",
    "prefix": "https://photobucket.com/"
  },
  {
    "name": "Picasa",
    "required_in_url": null
  },
  {
    "name": "Pinterest",
    "required_in_url": "pinterest",
    "prefix": "https://www.pinterest.com/"
  },
  {
    "name": "Postmates",
    "required_in_url": "postmates"
  },
  {
    "name": "Quora",
    "required_in_url": "quora",
    "prefix": "https://www.quora.com/"
  },
  {
    "name": "RSS Feed",
    "required_in_url": "rss"
  },
  {
    "name": "Roblox",
    "required_in_url": "roblox"
  },
  {
    "name": "Shopify",
    "required_in_url": "shopify"
  },
  {
    "name": "Slack",
    "required_in_url": "slack"
  },
  {
    "name": "Spotify",
    "required_in_url": "spotify",
    "prefix": "https://open.spotify.com/"
  },
  {
    "name": "Telegram",
    "required_in_url": "t.me",
    "prefix": "https://t.me/"
  },
  {
    "name": "TikTok",
    "required_in_url": "tiktok",
    "prefix": "https://www.tiktok.com/"
  },
  {
    "name": "TripAdvisor",
    "required_in_url": "tripAdvisor"
  },
  {
    "name": "Tumblr",
    "required_in_url": "tumblr",
    "prefix": "https://www.tumblr.com/"
  },
  {
    "name": "Twitch",
    "required_in_url": "twitch.tv",
    "prefix": "https://www.twitch.tv/"
  },
  {
    "name": "Twitter",
    "required_in_url": "twitter",
    "prefix": "https://twitter.com/"
  },
  {
    "name": "UberEats",
    "required_in_url": "ubereats"
  },
  {
    "name": "UpWork",
    "required_in_url": "upwork",
    "prefix": "https://www.upwork.com/"
  },
  {
    "name": "Venmo",
    "required_in_url": "venmo"
  },
  {
    "name": "Viber",
    "required_in_url": "viber",
    "prefix": "https://msng.link/o/?"
  },
  {
    "name": "Vimeo",
    "required_in_url": "vimeo",
    "prefix": "https://vimeo.com/"
  },
  {
    "name": "Whatsapp",
    "required_in_url": "whatsapp",
    "prefix": "https://api.whatsapp.com/send?phone="
  },
  {
    "name": "Wikipedia",
    "required_in_url": "wikipedia",
    "prefix": "https://en.wikipedia.org/wiki/"
  },
  {
    "name": "Yahoo Mail",
    "required_in_url": "mail.yahoo"
  },
  {
    "name": "Yelp",
    "required_in_url": "yelp",
    "prefix": "https://www.yelp.com/"
  },
  {
    "name": "YouTube",
    "required_in_url": "youtube",
    "prefix": "https://www.youtube.com/"
  },
  {
    "name": "Zelle",
    "required_in_url": "zellepay"
  },
  {
    "name": "Airbnb",
    "required_in_url": "airbnb",
    "prefix": "https://www.airbnb.com/"
  },
  {
    "name": "Poshmark",
    "required_in_url": "poshmark",
    "prefix": "https://poshmark.com/"
  },
  {
    "name": "Reddit",
    "required_in_url": "reddit",
    "prefix": "https://www.reddit.com/"
  },
  {
    "name": "Snapchat",
    "required_in_url": "snapchat",
    "prefix": "https://www.snapchat.com/"
  },
  {
    "name": "Soundcloud",
    "required_in_url": "soundcloud",
    "prefix": "https://soundcloud.com/"
  },
  {
    "name": "Xbox",
    "required_in_url": "xbox",
    "prefix": "https://www.xbox.com/"
  },
  {
    "name": "Zillow",
    "required_in_url": "zillow",
    "prefix": "https://www.zillow.com/"
  }
];
const addLink = (packets) => {
  return axios$1.post("/dashboard/links/new", packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
      const link_id = response.data.link_id;
      const position = response.data.position;
      let iconPath = null;
      if (response.data.iconPath) {
        iconPath = response.data.iconPath;
      }
      return {
        success: true,
        link_id,
        position,
        iconPath
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors.icon !== void 0) {
        EventBus.dispatch("error", { message: error.response.data.errors.icon[0] });
      } else if (error.response.data.errors.name !== void 0) {
        EventBus.dispatch("error", { message: error.response.data.errors.name[0] });
      } else if (error.response.data.errors.url !== void 0) {
        EventBus.dispatch("error", { message: error.response.data.errors.url[0] });
      } else if (error.response.data.errors.email !== void 0) {
        EventBus.dispatch("error", { message: error.response.data.errors.email[0] });
      } else if (error.response.data.errors.mailchimp_list_id !== void 0) {
        EventBus.dispatch("error", { message: "Mailchimp List Is Required" });
      } else if (error.response.data.errors.shopify_products !== void 0) {
        EventBus.dispatch("error", { message: "Shopify Products Are Required" });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updateLink = (packets, editID) => {
  return axios$1.put("/dashboard/links/update/" + editID, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
      let iconPath = null;
      if (response.data.path) {
        iconPath = response.data.path;
      }
      return {
        success: true,
        iconPath
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors.icon !== void 0) {
        EventBus.dispatch("error", { message: error.response.data.errors.icon[0] });
      } else if (error.response.data.errors.name !== void 0) {
        EventBus.dispatch("error", { message: error.response.data.errors.name[0] });
      } else if (error.response.data.errors.url !== void 0) {
        EventBus.dispatch("error", { message: error.response.data.errors.url[0] });
      } else if (error.response.data.errors.email !== void 0) {
        EventBus.dispatch("error", { message: error.response.data.errors.email[0] });
      } else if (error.response.data.errors.phone !== void 0) {
        EventBus.dispatch("error", { message: error.response.data.errors.phone[0] });
      } else if (error.response.data.errors.mailchimp_list_id !== void 0) {
        EventBus.dispatch("error", { message: "Mailchimp List Is Required" });
      } else if (error.response.data.errors.shopify_products !== void 0) {
        EventBus.dispatch("error", { message: "Shopify Products Are Required" });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updateLinksPositions = (packets) => {
  return axios$1.patch("/dashboard/links/update-positions", packets).then(
    (response) => {
      console.log(JSON.stringify(response.data.message));
    }
  ).catch((error) => {
    console.error("ERROR:: ", error.response.data);
  });
};
const updateLinkStatus = (packets, itemID, url) => {
  return axios$1.patch(url + itemID, packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
      return {
        success: true
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const deleteLink = (packets, itemID) => {
  return axios$1.put("/dashboard/links/delete/" + itemID, packets).then(
    (response) => {
      const links = response.data.links;
      const returnMessage = JSON.stringify(response.data.message);
      EventBus.dispatch("success", { message: returnMessage });
      return {
        links,
        success: true
      };
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response.data.message);
      EventBus.dispatch("error", { message: error.response.data.message });
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const checkURL = (url, name2, custom, subStatus) => {
  if (custom) {
    return checkForHttp(url);
  } else {
    let icon = icons.find((icon2) => icon2.name === name2);
    if (icon && icon.required_in_url && !subStatus) {
      if (url.toLowerCase().includes(icon.required_in_url)) {
        const returnURL = checkForHttp(url);
        return {
          success: true,
          url: returnURL
        };
      } else {
        EventBus.dispatch(
          "error",
          { message: "URL does not match Icon selected" }
        );
        return {
          success: false
        };
      }
    } else {
      const returnURL = checkForHttp(url);
      return {
        success: true,
        url: returnURL
      };
    }
  }
};
const checkForHttp = (url) => {
  let returnURL = null;
  if (url.includes("http")) {
    returnURL = url;
  } else {
    returnURL = "https://" + url;
  }
  return returnURL;
};
const getAllLinks = (pageID) => {
  return axios$1.get("/dashboard/page/get-links/" + pageID).then(
    (response) => {
      const userLinks2 = response.data.userLinks;
      return {
        success: true,
        userLinks: userLinks2
      };
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response.data.message);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const LINKS_ACTIONS = {
  SET_LINKS: "set-links",
  SET_FOLDER_LINKS_ORDER: "set-folder-links-order",
  UPDATE_LINKS_STATUS: "update-links-status",
  UPDATE_LINKS_STATUS_FROM_FOLDER: "update-links-status-from-folder",
  ADD_NEW_IN_FOLDER: "add-new-in-folder",
  UPDATE_FOLDER_NAME: "update-folder-name",
  UPDATE_LINK: "update-link",
  UPDATE_LINK_IN_FOLDER: "update-link-in-folder",
  UPDATE_LINKS_POSITIONS: "update-links-positions"
};
function reducer(userLinks2, action) {
  switch (action.type) {
    case LINKS_ACTIONS.SET_LINKS:
      return action.payload.links;
    case LINKS_ACTIONS.SET_FOLDER_LINKS_ORDER:
      return userLinks2.map((item) => {
        if (item.id === action.payload.id && item.type === "folder") {
          return {
            ...item,
            links: action.payload.links
          };
        }
        return item;
      });
    case LINKS_ACTIONS.UPDATE_LINKS_STATUS:
      return userLinks2.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            active_status: !item.active_status
          };
        }
        return item;
      });
    case LINKS_ACTIONS.UPDATE_LINKS_STATUS_FROM_FOLDER:
      return userLinks2.map((item) => {
        if (item.id === action.payload.folderID && item.type === "folder") {
          const newItemLinks = item.links.map((linkItem) => {
            if (linkItem.id === action.payload.id) {
              return {
                ...linkItem,
                active_status: !linkItem.active_status
              };
            }
            return linkItem;
          });
          return {
            ...item,
            links: newItemLinks
          };
        }
        return item;
      });
    case LINKS_ACTIONS.ADD_NEW_IN_FOLDER:
      return userLinks2.map((item) => {
        if (item.id === action.payload.folderID) {
          const itemLinks = item.links.concat(action.payload.newLinkObject);
          return {
            ...item,
            active_status: action.payload.folderActive || item.active_status,
            links: itemLinks
          };
        }
        return item;
      });
    case LINKS_ACTIONS.UPDATE_FOLDER_NAME:
      return userLinks2.map((item) => {
        if (item.id === action.payload.folderID) {
          item.name = action.payload.name;
          return item;
        }
        return item;
      });
    case LINKS_ACTIONS.UPDATE_LINK:
      return userLinks2.map((item) => {
        if (item.id === action.payload.editID) {
          return {
            ...item,
            name: action.payload.currentLink.name,
            url: action.payload.url,
            email: action.payload.currentLink.email,
            phone: action.payload.currentLink.phone,
            type: action.payload.currentLink.type,
            mailchimp_list_id: action.payload.currentLink.mailchimp_list_id,
            shopify_products: action.payload.currentLink.shopify_products,
            shopify_id: action.payload.currentLink.shopify_id,
            icon: action.payload.iconPath
          };
        }
        return item;
      });
    case LINKS_ACTIONS.UPDATE_LINK_IN_FOLDER:
      return userLinks2.map((item) => {
        if (item.id === action.payload.folderID) {
          const newItemsLinks = item.links.map((linkItem) => {
            if (linkItem.id === action.payload.editID) {
              return {
                ...linkItem,
                name: action.payload.currentLink.name,
                url: action.payload.url,
                email: action.payload.currentLink.email,
                phone: action.payload.currentLink.phone,
                type: action.payload.currentLink.type,
                mailchimp_list_id: action.payload.currentLink.mailchimp_list_id,
                shopify_products: action.payload.currentLink.shopify_products,
                shopify_id: action.payload.currentLink.shopify_id,
                icon: action.payload.iconPath
              };
            }
            return linkItem;
          });
          return {
            ...item,
            links: newItemsLinks
          };
        }
        return item;
      });
    case LINKS_ACTIONS.UPDATE_LINKS_POSITIONS:
      return action.payload.links.map((item) => {
        if (item.id === action.payload.folderID) {
          const newOrder = item.links.map((link, index2) => {
            return {
              ...link,
              position: index2
            };
          });
          return {
            ...item,
            active_status: action.payload.folderActive === false ? action.payload.folderActive : item.active_status,
            links: newOrder
          };
        }
        return item;
      });
    default:
      return userLinks2;
  }
}
const FOLDER_LINKS_ACTIONS = {
  SET_FOLDER_LINKS: "set-folder-links",
  UPDATE_FOLDER_LINKS_STATUS: "update-folder-links-status",
  UPDATE_FOLDER_LINKS: "update-folder-links"
};
function folderLinksReducer(folderLinks, action) {
  switch (action.type) {
    case FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS:
      return action.payload.links;
    case FOLDER_LINKS_ACTIONS.UPDATE_FOLDER_LINKS_STATUS:
      return folderLinks.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            active_status: !item.active_status
          };
        }
        return item;
      });
    case FOLDER_LINKS_ACTIONS.UPDATE_FOLDER_LINKS:
      return folderLinks.map((item) => {
        if (item.id === action.payload.editID) {
          return {
            ...item,
            name: action.payload.currentLink.name,
            url: action.payload.url,
            email: action.payload.currentLink.email,
            phone: action.payload.currentLink.phone,
            mailchimp_list_id: action.payload.currentLink.mailchimp_list_id,
            shopify_products: action.payload.currentLink.shopify_products,
            shopify_id: action.payload.currentLink.shopify_id,
            type: action.payload.currentLink.type,
            icon: action.payload.iconPath
          };
        }
        return item;
      });
    default:
      return folderLinks;
  }
}
const Links = ({
  setEditID,
  setEditFolderID,
  setRow,
  setValue,
  setShowUpgradePopup,
  setOptionText,
  subStatus,
  setAccordionValue
}) => {
  const { userLinks: userLinks2, dispatch } = useContext(UserLinksContext);
  const { dispatchFolderLinks } = useContext(FolderLinksContext);
  const targetRef = useRef(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const handleChange = (currentItem, hasLinks, type) => {
    if (hasLinks) {
      if (currentItem.type && currentItem.type === "folder" && !subStatus) {
        setShowUpgradePopup(true);
        setOptionText("enable your folders");
      } else {
        const newStatus = !currentItem.active_status;
        let url = "";
        if (currentItem.type && currentItem.type === "folder") {
          url = "/dashboard/folder/status/";
        } else {
          url = "/dashboard/links/status/";
        }
        const packets = {
          active_status: newStatus
        };
        updateLinkStatus(packets, currentItem.id, url).then((data) => {
          if (data.success) {
            dispatch({ type: LINKS_ACTIONS.UPDATE_LINKS_STATUS, payload: { id: currentItem.id } });
          }
        });
      }
    } else {
      EventBus.dispatch("error", { message: "Add Icons Before Enabling" });
    }
  };
  const handleOnClick = (linkID) => {
    setEditID(linkID);
    const currentLink = userLinks2.find(function(e) {
      return e.id === linkID;
    });
    if (currentLink.type === "shopify" || currentLink.type === "mailchimp") {
      setAccordionValue("integration");
    } else if (currentLink.icon.includes("offer-images")) {
      setAccordionValue("offer");
    } else if (currentLink.icon.includes("custom-icons")) {
      setAccordionValue("custom");
    } else {
      setAccordionValue("standard");
    }
    setTimeout(function() {
      document.querySelector("#scrollTo").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 300);
  };
  const fetchFolderLinks = async (linkID) => {
    if (subStatus) {
      const url = "folder/links/" + linkID;
      const response = await fetch(url);
      const folderLinks = await response.json();
      dispatchFolderLinks({ type: FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS, payload: { links: folderLinks["links"] } });
      setEditFolderID(linkID);
      setTimeout(function() {
        document.querySelector("#scrollTo").scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
      }, 300);
    } else {
      setShowUpgradePopup(true);
      setOptionText("access your folders");
    }
  };
  const handleGridOnChange = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setRow(null);
      setValue(null);
      const oldIndex = userLinks2.map(function(e) {
        return e.id;
      }).indexOf(active.id);
      const newIndex = userLinks2.map(function(e) {
        return e.id;
      }).indexOf(over.id);
      const newArray = arrayMove(userLinks2, oldIndex, newIndex);
      dispatch({ type: LINKS_ACTIONS.SET_LINKS, payload: { links: newArray } });
      const packets = {
        userLinks: newArray
      };
      updateLinksPositions(packets);
    }
  };
  return /* @__PURE__ */ jsx("section", { ref: targetRef, className: `icons_wrap add_icons icons ${userLinks2.length === 0 ? "no_icons" : ""} `, children: userLinks2.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "info_message", children: [
    /* @__PURE__ */ jsx("p", { children: "You don't have any icons to display." }),
    /* @__PURE__ */ jsx("p", { children: "Click 'Add Icon' above to start adding links." })
  ] }) : /* @__PURE__ */ jsx(
    DndContext,
    {
      sensors,
      collisionDetection: closestCenter,
      onDragEnd: handleGridOnChange,
      children: /* @__PURE__ */ jsx(
        SortableContext,
        {
          id: "grid-sort-contextbasic",
          items: userLinks2.map((i) => i == null ? void 0 : i.id),
          strategy: rectSortingStrategy,
          children: userLinks2 == null ? void 0 : userLinks2.map((link) => {
            return /* @__PURE__ */ jsx(
              Link,
              {
                link,
                handleOnClick,
                fetchFolderLinks,
                handleChange,
                subStatus
              },
              link.id
            );
          })
        }
      )
    }
  ) });
};
const __vite_glob_0_66 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Links
}, Symbol.toStringTag, { value: "Module" }));
const PageHeader = forwardRef(function PageHeader2(props, ref) {
  var _a;
  const {
    completedCrop,
    setCompletedCrop,
    setShowLoader,
    elementName
  } = props;
  const { pageSettings, setPageSettings } = useContext(PageContext);
  const [disableButton, setDisableButton] = useState(true);
  const [upImg, setUpImg] = useState(null);
  const imgRef = useRef();
  const previewCanvasRef = ref;
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 });
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);
  useDebounceEffect(
    async () => {
      var _a2, _b, _c;
      if (((_a2 = completedCrop[elementName]) == null ? void 0 : _a2.isCompleted.width) && ((_b = completedCrop[elementName]) == null ? void 0 : _b.isCompleted.height) && imgRef.current && (previewCanvasRef == null ? void 0 : previewCanvasRef.current[elementName])) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef == null ? void 0 : previewCanvasRef.current[elementName],
          (_c = completedCrop[elementName]) == null ? void 0 : _c.isCompleted,
          scale,
          rotate
        );
      }
    },
    100,
    [(_a = completedCrop[elementName]) == null ? void 0 : _a.isCompleted, scale, rotate]
  );
  const onSelectFile = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }
    setCrop(void 0);
    setDisableButton(false);
    document.querySelector("form.header_img_form .bottom_section").classList.remove("hidden");
    if (window.innerWidth < 993) {
      document.querySelector(".header_img_form").scrollIntoView({
        behavior: "smooth"
      });
    }
    createImage(files[0], setUpImg);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableButton(true);
    const image = getFileToUpload(previewCanvasRef == null ? void 0 : previewCanvasRef.current[elementName]);
    image.then((value) => {
      fileUpload(value);
    }).catch((error) => {
      console.error(error);
      setDisableButton(false);
    });
  };
  const fileUpload = (image) => {
    setShowLoader({ show: true, icon: "upload", position: "fixed" });
    window.Vapor.store(
      image,
      {
        visibility: "public-read"
      },
      {
        progress: (progress) => {
          this.uploadProgress = Math.round(progress * 100);
        }
      }
    ).then((response) => {
      const packets = {
        header_img: response.key,
        ext: response.extension
      };
      headerImage(packets, pageSettings["id"]).then((data) => {
        setShowLoader({ show: false, icon: null, position: "" });
        if (data.success) {
          setUpImg(null);
          setCompletedCrop({});
          const newArray = { ...pageSettings };
          newArray.header_img = data.imgPath;
          setPageSettings(newArray);
          document.querySelector("form.header_img_form .bottom_section").classList.add("hidden");
        }
      });
    }).catch((error) => {
      console.error(error);
      EventBus.dispatch("error", { message: "There was an error saving your image." });
      setDisableButton(false);
    });
  };
  const handleCancel = () => {
    setUpImg(null);
    const copy = { ...completedCrop };
    delete copy[elementName];
    setCompletedCrop(copy);
    document.querySelector("form.header_img_form .bottom_section").classList.add("hidden");
  };
  return /* @__PURE__ */ jsxs("div", { className: "my_row page_settings", children: [
    /* @__PURE__ */ jsx("div", { className: "column_wrap", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "header_img_form", children: [
      !upImg && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "top_section", children: [
          /* @__PURE__ */ jsxs(
            "label",
            {
              htmlFor: "header_file_upload",
              className: "custom",
              children: [
                "Header Image",
                /* @__PURE__ */ jsxs("span", { className: "edit_icon", children: [
                  /* @__PURE__ */ jsx(MdEdit, {}),
                  /* @__PURE__ */ jsx("div", { className: "hover_text edit_image", children: /* @__PURE__ */ jsx("p", { children: "Edit Header Image" }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "custom",
              id: "header_file_upload",
              type: "file",
              accept: "image/png, image/jpeg, image/jpg, image/gif",
              onChange: onSelectFile
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "my_row info_text file_types", children: /* @__PURE__ */ jsxs("p", { className: "m-0 char_count w-100 ", children: [
          "Allowed File Types:",
          " ",
          /* @__PURE__ */ jsx("span", { children: "png, jpg, jpeg, gif" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bottom_section hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "crop_section", children: [
          /* @__PURE__ */ jsx(
            CropTools,
            {
              rotate,
              setRotate,
              scale,
              setScale
            }
          ),
          /* @__PURE__ */ jsx(
            ReactCrop$1,
            {
              crop,
              aspect,
              onChange: (_2, percentCrop) => setCrop(percentCrop),
              onComplete: (c) => setCompletedCrop({
                ...completedCrop,
                [`${elementName}`]: {
                  isCompleted: c
                }
              }),
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  onLoad: (e) => onImageLoad(e, aspect, setCrop),
                  src: upImg,
                  ref: imgRef,
                  style: { transform: `scale(${scale}) rotate(${rotate}deg)` },
                  alt: "Crop Me"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bottom_row", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "button green",
              disabled: disableButton,
              children: "Save"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              className: "button transparent gray",
              href: "#",
              onClick: (e) => {
                e.preventDefault();
                handleCancel();
              },
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              className: "help_link",
              href: "mailto:help@link.pro",
              children: "Need Help?"
            }
          )
        ] })
      ] })
    ] }) }),
    !upImg && /* @__PURE__ */ jsx(ToolTipIcon, { section: "header" })
  ] });
});
const __vite_glob_0_70 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PageHeader
}, Symbol.toStringTag, { value: "Module" }));
const PageProfile = forwardRef(function PageProfile2(props, ref) {
  var _a;
  const {
    completedCrop,
    setCompletedCrop,
    setShowLoader,
    elementName
  } = props;
  const { pageSettings, setPageSettings } = useContext(PageContext);
  const [disableButton, setDisableButton] = useState(true);
  const [upImg, setUpImg] = useState(null);
  const imgRef = useRef();
  const previewCanvasRef = ref;
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 });
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1);
  useDebounceEffect(
    async () => {
      var _a2, _b;
      if (((_a2 = completedCrop[elementName]) == null ? void 0 : _a2.isCompleted.width) && ((_b = completedCrop[elementName]) == null ? void 0 : _b.isCompleted.height) && imgRef.current && previewCanvasRef.current[elementName]) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current[elementName],
          completedCrop[elementName].isCompleted,
          scale,
          rotate
        );
      }
    },
    100,
    [(_a = completedCrop[elementName]) == null ? void 0 : _a.isCompleted, scale, rotate]
  );
  const onSelectFile = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }
    setCrop(void 0);
    setDisableButton(false);
    document.querySelector("form.profile_img_form .bottom_section").classList.remove("hidden");
    if (window.innerWidth < 993) {
      document.querySelector(".profile_img_form").scrollIntoView({
        behavior: "smooth"
      });
    }
    createImage(files[0], setUpImg);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableButton(true);
    const image = getFileToUpload(previewCanvasRef == null ? void 0 : previewCanvasRef.current[elementName]);
    image.then((value) => {
      fileUpload(value);
    }).catch((error) => {
      console.error(error);
      setDisableButton(false);
    });
  };
  const fileUpload = (image) => {
    setShowLoader({ show: true, icon: "upload", position: "fixed" });
    window.Vapor.store(
      image,
      {
        visibility: "public-read"
      },
      {
        progress: (progress) => {
          this.uploadProgress = Math.round(progress * 100);
        }
      }
    ).then((response) => {
      const packets = {
        profile_img: response.key,
        ext: response.extension
      };
      profileImage(packets, pageSettings["id"], pageSettings["default"]).then((data) => {
        setShowLoader({ show: false, icon: null, position: "" });
        if (data.success) {
          setUpImg(null);
          const newArray = { ...pageSettings };
          newArray.profile_img = data.imgPath;
          setPageSettings(newArray);
          document.querySelector("form.profile_img_form .bottom_section").classList.add("hidden");
        }
      });
    }).catch((error) => {
      console.error(error);
      setDisableButton(false);
      EventBus.dispatch("error", { message: "There was an error saving your image." });
    });
  };
  const handleCancel = () => {
    setUpImg(null);
    const copy = { ...completedCrop };
    delete copy[elementName];
    setCompletedCrop(copy);
    document.querySelector("form.profile_img_form .bottom_section").classList.add("hidden");
  };
  return /* @__PURE__ */ jsxs("div", { className: "my_row page_settings", children: [
    /* @__PURE__ */ jsx("div", { className: "column_wrap", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "profile_img_form", children: [
      !upImg && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "top_section", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "profile_file_upload", className: "custom", children: [
            "Profile Image",
            /* @__PURE__ */ jsxs("span", { className: "edit_icon", children: [
              /* @__PURE__ */ jsx(MdEdit, {}),
              /* @__PURE__ */ jsx("div", { className: "hover_text edit_image", children: /* @__PURE__ */ jsx("p", { children: "Edit Profile Image" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "custom",
              id: "profile_file_upload",
              type: "file",
              accept: "image/png, image/jpeg, image/jpg, image/gif",
              onChange: onSelectFile
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "my_row info_text file_types", children: /* @__PURE__ */ jsxs("p", { className: "m-0 char_count w-100 ", children: [
          "Allowed File Types: ",
          /* @__PURE__ */ jsx("span", { children: "png, jpg, jpeg, gif" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bottom_section hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "crop_section", children: [
          /* @__PURE__ */ jsx(
            CropTools,
            {
              rotate,
              setRotate,
              scale,
              setScale
            }
          ),
          /* @__PURE__ */ jsx(
            ReactCrop$1,
            {
              crop,
              aspect,
              onChange: (_2, percentCrop) => setCrop(percentCrop),
              onComplete: (c) => setCompletedCrop({
                ...completedCrop,
                [`${elementName}`]: {
                  isCompleted: c
                }
              }),
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  onLoad: (e) => onImageLoad(e, aspect, setCrop),
                  src: upImg,
                  ref: imgRef,
                  style: { transform: `scale(${scale}) rotate(${rotate}deg)` },
                  alt: "Crop me"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bottom_row", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "button green",
              disabled: disableButton,
              children: "Save"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              className: "button transparent gray",
              href: "#",
              onClick: (e) => {
                e.preventDefault();
                handleCancel();
              },
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx("a", { className: "help_link", href: "mailto:help@link.pro", children: "Need Help?" })
        ] })
      ] })
    ] }) }),
    !upImg && /* @__PURE__ */ jsx(ToolTipIcon, { section: "profile" })
  ] });
});
const __vite_glob_0_74 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PageProfile
}, Symbol.toStringTag, { value: "Module" }));
const PageName = ({ pageNames }) => {
  const { pageSettings, setPageSettings } = useContext(PageContext);
  const [userPageNames, setUserPageNames] = useState(pageNames);
  const [name2, setName] = useState(pageSettings["name"]);
  const [available, setAvailability] = useState(true);
  const [currentMatch, setCurrentMatch] = useState(true);
  const [regexMatch, setRegexMatch] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentMatch && available) {
      const packets = {
        name: name2
      };
      updatePageName(packets, pageSettings["id"]).then((data) => {
        if (data.success) {
          let prevNames = [...userPageNames];
          prevNames = prevNames.map((item, index2) => {
            if (item === pageSettings["name"]) {
              item = name2;
            }
            return item;
          });
          setUserPageNames(prevNames);
          setPageSettings(
            {
              ...pageSettings,
              name: name2
            }
          );
          setCurrentMatch(true);
          if (pageSettings["default"]) {
            document.querySelector("#username").innerText = name2;
          }
        }
      });
    }
  };
  const checkPageName = (e) => {
    let value = e.target.value.toLowerCase();
    const match = userPageNames.indexOf(value);
    const regex = /^[A-Za-z0-9-_.]+$/;
    setRegexMatch(regex.test(value));
    if (value.length > 2 && value === pageSettings["name"]) {
      setAvailability(true);
      setCurrentMatch(true);
    } else if (match < 0 && value.length > 2 && regex.test(value)) {
      setAvailability(true);
      setCurrentMatch(false);
    } else {
      console.log("last one");
      setAvailability(false);
      setCurrentMatch(false);
    }
    setName(value);
  };
  return /* @__PURE__ */ jsxs("div", { className: "edit_form page_name", children: [
    !regexMatch && /* @__PURE__ */ jsx("p", { className: "status not_available char_message", children: "Only letters, numbers, dashes, underscores, periods allowed" }),
    /* @__PURE__ */ jsx("label", { children: "Link.pro/" }),
    /* @__PURE__ */ jsxs("form", { className: "link_name", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          name: "name",
          type: "text",
          defaultValue: name2,
          onChange: checkPageName,
          onKeyDown: (event) => {
            if (event.key === "Enter") {
              handleSubmit(event);
            }
          },
          onBlur: (e) => handleSubmit(e)
        }
      ),
      available ? /* @__PURE__ */ jsx("div", { className: "info_text my_row", children: currentMatch ? /* @__PURE__ */ jsx("p", { className: "status", children: "Current" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "submit_circle",
            href: "#",
            onClick: (e) => handleSubmit(e),
            children: /* @__PURE__ */ jsx(FiThumbsUp, {})
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "status", children: "Available" })
      ] }) }) : /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "cancel_icon", children: /* @__PURE__ */ jsx(FiThumbsDown, {}) }),
        /* @__PURE__ */ jsx("div", { className: "info_text my_row", children: /* @__PURE__ */ jsx("p", { className: "status not_available", children: "Not Available" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(ToolTipIcon, { section: "name" })
  ] });
};
const __vite_glob_0_72 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PageName
}, Symbol.toStringTag, { value: "Module" }));
const AddPageForm = ({ setIsEditing, setAllUserPages, allUserPages, pageNames }) => {
  const [newPageName, setNewPageName] = useState(null);
  const [available, setAvailability] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const packets = {
      name: newPageName
    };
    addPage(packets).then((data) => {
      if (data.success) {
        const newElement = {
          id: data.page_id,
          name: newPageName
        };
        let prevPages = [...allUserPages];
        prevPages = prevPages.concat(newElement);
        setAllUserPages(prevPages);
        setIsEditing(false);
        window.location.href = "/dashboard/pages/" + data.page_id;
      }
    });
  };
  const checkPageName = (e) => {
    let value = e.target.value.toLowerCase().replace(/\s/g, "-");
    const match = pageNames.indexOf(value);
    if (match < 0 && value !== "") {
      setAvailability(true);
    } else {
      setAvailability(false);
    }
    setNewPageName(value);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h3", { children: "Choose Your Link Name" }),
    /* @__PURE__ */ jsxs("form", { className: "new_page", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          name: "name",
          type: "text",
          placeholder: "Link Name",
          onChange: checkPageName,
          onKeyDown: (event) => {
            if (event.key === "Enter") {
              handleSubmit(event);
            }
          }
        }
      ),
      available ? /* @__PURE__ */ jsx(
        "a",
        {
          className: "submit_circle",
          href: "#",
          onClick: (e) => handleSubmit(e),
          children: /* @__PURE__ */ jsx(FiThumbsUp, {})
        }
      ) : /* @__PURE__ */ jsx(
        "a",
        {
          className: "cancel_icon",
          href: "#",
          onClick: (e) => {
            e.preventDefault();
            setIsEditing(false);
          },
          children: /* @__PURE__ */ jsx(FiThumbsDown, {})
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "status", children: available ? "Available" : /* @__PURE__ */ jsx("span", { className: "status not_available", children: "Not Available" }) }),
      /* @__PURE__ */ jsxs("div", { className: "my_row button_row", children: [
        /* @__PURE__ */ jsx("button", { className: "button green", type: "submit", children: "Save" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "button transparent gray", onClick: (e) => {
          e.preventDefault();
          setIsEditing(false);
        }, children: "Cancel" })
      ] })
    ] })
  ] });
};
const __vite_glob_0_68 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AddPageForm
}, Symbol.toStringTag, { value: "Module" }));
const PageNav = ({
  allUserPages,
  setAllUserPages,
  userSub,
  subStatus,
  setShowUpgradePopup,
  setOptionText,
  pageNames
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { pageSettings, setPageSettings } = useContext(PageContext);
  const pageList = allUserPages.filter((element) => element.id !== pageSettings["id"]);
  const handleClick = (e) => {
    e.preventDefault();
    const type = e.target.dataset.type;
    if (type !== void 0 && type === "disabled") {
      enablePopup("access this link");
    } else if (userSub) {
      const { name: name2 } = { ...userSub };
      if (subStatus && name2 === "premier") {
        if (allUserPages.length === 5) {
          enablePopup("a custom plan to add more links");
        } else {
          setIsEditing(true);
        }
      } else {
        enablePopup("add more links");
      }
    } else {
      enablePopup("add more links");
    }
  };
  const enablePopup = (text2) => {
    setShowUpgradePopup(true);
    setOptionText(text2);
  };
  return /* @__PURE__ */ jsxs("div", { className: "page_menu_row", children: [
    /* @__PURE__ */ jsx("div", { className: "current_page", id: pageSettings["id"], children: /* @__PURE__ */ jsx("p", { children: pageSettings["name"] }) }, pageSettings["id"]),
    /* @__PURE__ */ jsx("div", { className: "menu_wrap", children: /* @__PURE__ */ jsxs("div", { className: allUserPages.length > 1 ? "menu_icon add_border" : "menu_icon", children: [
      allUserPages.length > 1 ? /* @__PURE__ */ jsx(FiChevronDown, {}) : /* @__PURE__ */ jsx(MdAddCircleOutline, {}),
      /* @__PURE__ */ jsx("div", { className: "menu_content", children: /* @__PURE__ */ jsxs("ul", { className: "page_menu", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { onClick: (e) => {
          handleClick(e);
        }, href: "#", children: "Add New Link" }) }),
        pageList.map((page) => {
          return page["disabled"] || !userSub || userSub.name !== "premier" ? /* @__PURE__ */ jsx("li", { className: "disabled_link", "data-type": "disabled", onClick: (e) => {
            handleClick(e);
          }, children: page["name"] }, page["id"]) : /* @__PURE__ */ jsx("li", { id: page["id"], children: /* @__PURE__ */ jsx("a", { href: "/dashboard/pages/" + page["id"], children: page["name"] }) }, page["id"]);
        })
      ] }) })
    ] }) }),
    isEditing ? /* @__PURE__ */ jsx("div", { className: "edit_form popup new_page_form", children: /* @__PURE__ */ jsx("div", { className: "form_wrap", children: /* @__PURE__ */ jsx(
      AddPageForm,
      {
        setIsEditing,
        setAllUserPages,
        allUserPages,
        pageNames
      }
    ) }) }) : ""
  ] });
};
const __vite_glob_0_73 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PageNav
}, Symbol.toStringTag, { value: "Module" }));
const PageTitle = () => {
  const { pageSettings, setPageSettings } = useContext(PageContext);
  const [charactersLeft, setCharactersLeft] = useState();
  useEffect(() => {
    if (pageSettings["title"]) {
      setCharactersLeft(30 - pageSettings["title"].length);
    } else {
      setCharactersLeft(30);
    }
  }, [charactersLeft]);
  const handleChange = (e) => {
    const value = e.target.value;
    setCharactersLeft(30 - value.length);
    setPageSettings({
      ...pageSettings,
      title: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pageSettings["title"] != null) {
      const packets = {
        title: pageSettings["title"]
      };
      pageTitle(packets, pageSettings["id"]);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "edit_form", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          maxLength: "30",
          name: "title",
          type: "text",
          placeholder: "Add Title",
          defaultValue: pageSettings["title"] || "",
          onChange: (e) => handleChange(e),
          onKeyDown: (event) => {
            if (event.key === "Enter") {
              handleSubmit(event);
            }
          },
          onBlur: (e) => handleSubmit(e)
        }
      ),
      charactersLeft < 30 ? /* @__PURE__ */ jsxs(
        "a",
        {
          className: "submit_circle",
          href: "#",
          onClick: (e) => handleSubmit(e),
          children: [
            /* @__PURE__ */ jsx(FiThumbsUp, {}),
            /* @__PURE__ */ jsx("div", { className: "hover_text submit_button", children: /* @__PURE__ */ jsx("p", { children: "Submit Title Text" }) })
          ]
        }
      ) : /* @__PURE__ */ jsx("span", { className: "cancel_icon", children: /* @__PURE__ */ jsx(FiThumbsDown, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "my_row info_text title", children: [
        /* @__PURE__ */ jsx("p", { className: "char_max", children: "Max 30 Characters" }),
        /* @__PURE__ */ jsx("p", { className: "char_count", children: charactersLeft < 0 ? /* @__PURE__ */ jsx("span", { className: "over", children: "Over Character Limit" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          "Characters Left: ",
          /* @__PURE__ */ jsxs("span", { className: "count", children: [
            " ",
            charactersLeft,
            " "
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(ToolTipIcon, { section: "title" })
  ] });
};
const __vite_glob_0_75 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PageTitle
}, Symbol.toStringTag, { value: "Module" }));
const PageBio = () => {
  const { pageSettings, setPageSettings } = useContext(PageContext);
  const [charactersLeft, setCharactersLeft] = useState();
  useEffect(() => {
    if (pageSettings["bio"]) {
      setCharactersLeft(65 - pageSettings["bio"].length);
    }
  }, [charactersLeft]);
  const handleChange = (e) => {
    const value = e.target.value;
    setCharactersLeft(65 - value.length);
    setPageSettings({
      ...pageSettings,
      bio: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pageSettings["bio"] != null) {
      const packets = {
        bio: pageSettings["bio"]
      };
      pageBio(packets, pageSettings["id"]);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "edit_form", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "form_content", children: [
        /* @__PURE__ */ jsx(
          "textarea",
          {
            maxLength: "65",
            name: "bio",
            id: "",
            rows: "5",
            placeholder: "Add Bio or Slogan (Optional)",
            defaultValue: pageSettings["bio"] || "",
            onChange: (e) => handleChange(e),
            onKeyDown: (event) => {
              if (event.key === "Enter") {
                handleSubmit(event);
              }
            },
            onBlur: (e) => handleSubmit(e)
          }
        ),
        charactersLeft < 62 ? /* @__PURE__ */ jsxs(
          "a",
          {
            className: "submit_circle textarea",
            href: "#",
            onClick: (e) => handleSubmit(e),
            children: [
              /* @__PURE__ */ jsx(FiThumbsUp, {}),
              /* @__PURE__ */ jsx("div", { className: "hover_text submit_button", children: /* @__PURE__ */ jsx("p", { children: "Submit Bio Text" }) })
            ]
          }
        ) : /* @__PURE__ */ jsx("span", { className: "cancel_icon textarea", children: /* @__PURE__ */ jsx(FiThumbsDown, {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my_row info_text", children: [
        /* @__PURE__ */ jsx("p", { className: "char_max", children: "Max 65 Characters" }),
        /* @__PURE__ */ jsx("p", { className: "char_count", children: charactersLeft < 0 ? /* @__PURE__ */ jsx("span", { className: "over", children: "Over Character Limit" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          "Characters Left: ",
          /* @__PURE__ */ jsxs("span", { children: [
            " ",
            pageSettings["bio"] ? charactersLeft : "65"
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(ToolTipIcon, { section: "bio" })
  ] });
};
const __vite_glob_0_69 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PageBio
}, Symbol.toStringTag, { value: "Module" }));
const AddLink = ({
  subStatus,
  setShowUpgradePopup,
  setOptionText,
  setShowLinkForm
}) => {
  const { userLinks: userLinks2 } = useContext(UserLinksContext);
  const handleClick = (e) => {
    e.preventDefault();
    const newUserLinks = userLinks2.filter((element) => !element.type);
    const count = newUserLinks.length;
    if (count < 8 || subStatus) {
      setShowLinkForm(true);
      setTimeout(function() {
        document.querySelector("#scrollTo").scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
      }, 800);
    } else {
      setShowUpgradePopup(true);
      setOptionText("add more icons");
    }
  };
  return /* @__PURE__ */ jsxs("a", { href: "", className: "icon_wrap", onClick: handleClick, children: [
    /* @__PURE__ */ jsx(ImPlus, {}),
    /* @__PURE__ */ jsx("h3", { children: "Add Icon" })
  ] });
};
const __vite_glob_0_44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AddLink
}, Symbol.toStringTag, { value: "Module" }));
const UpgradePopup = ({ optionText, showUpgradePopup, setShowUpgradePopup }) => {
  const handleClose = (e) => {
    e.preventDefault();
    setShowUpgradePopup(false);
  };
  return /* @__PURE__ */ jsxs("div", { id: "upgrade_popup", className: showUpgradePopup ? "open" : "", children: [
    /* @__PURE__ */ jsx("a", { className: "close_popup", href: "#", onClick: handleClose, children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-x-circle", viewBox: "0 0 16 16", children: [
      /* @__PURE__ */ jsx("path", { d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" }),
      /* @__PURE__ */ jsx("path", { d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "box", children: [
      /* @__PURE__ */ jsx("div", { className: "icon_wrap", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/icon_uparrow.png"), alt: "" }) }),
      /* @__PURE__ */ jsx("h2", { children: "Upgrade Now" }),
      /* @__PURE__ */ jsxs("h3", { children: [
        "Upgrade to ",
        /* @__PURE__ */ jsx("span", { className: "option_text", children: optionText }),
        " and much more!"
      ] }),
      /* @__PURE__ */ jsx(Link$1, { className: "button blue", href: route("plans.get"), children: "Learn More" })
    ] })
  ] });
};
const ConfirmPopup = ({
  editID,
  setEditID,
  showConfirmPopup,
  setShowConfirmPopup,
  folderID,
  setInputType,
  setIntegrationType,
  setAccordionValue
}) => {
  const { userLinks: userLinks2, dispatch } = useContext(UserLinksContext);
  const { folderLinks, dispatchFolderLinks } = useContext(FolderLinksContext);
  const deleteItem = (e) => {
    e.preventDefault();
    let newFolderArray;
    let newArray;
    if (folderID) {
      newFolderArray = folderLinks.filter((element) => element.id !== editID);
      newArray = userLinks2.map((item) => {
        if (item.id === folderID && item.type === "folder") {
          const itemLinks = item.links.filter((element) => element.id !== editID);
          return {
            ...item,
            links: itemLinks
          };
        }
        return item;
      });
    } else {
      newArray = userLinks2.filter((element) => element.id !== editID);
    }
    const packets = {
      userLinks: newArray,
      folderLinks: newFolderArray
    };
    deleteLink(packets, editID).then((data) => {
      if (data.success) {
        if (folderID) {
          const newFolderLinks = data.links.find((el) => el.id === folderID);
          dispatchFolderLinks({ type: FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS, payload: { links: newFolderLinks.links } });
          let folderActive = null;
          if (newFolderArray.length === 0) {
            folderActive = false;
            const url = "/dashboard/folder/status/";
            const packets2 = {
              active_status: folderActive
            };
            updateLinkStatus(packets2, folderID, url);
          }
          dispatch({ type: LINKS_ACTIONS.UPDATE_LINKS_POSITIONS, payload: { links: newArray, folderActive, folderID } });
        } else {
          dispatch({ type: LINKS_ACTIONS.SET_LINKS, payload: { links: data.links } });
        }
        setEditID(null);
        setShowConfirmPopup(false);
        setIntegrationType(null);
        setInputType(null);
        setAccordionValue(null);
      }
    });
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setShowConfirmPopup(false);
  };
  return /* @__PURE__ */ jsx("div", { id: "confirm_popup_link", className: showConfirmPopup ? "open" : "", children: /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("div", { className: "icon_wrap check", children: /* @__PURE__ */ jsx(MdCheckCircle, {}) }),
    /* @__PURE__ */ jsx("h2", { children: "Confirm" }),
    /* @__PURE__ */ jsxs("div", { className: "text_wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "confirm_text", children: "Are you sure you want to delete this icon?" }),
      /* @__PURE__ */ jsxs("form", { action: "resources/js/Pages/Dashboard/ConfirmPopup", className: "button_row", children: [
        /* @__PURE__ */ jsx("a", { className: "button green", href: "resources/js/Pages/Dashboard/ConfirmPopup#", onClick: deleteItem, children: "Yes" }),
        /* @__PURE__ */ jsx("a", { className: "button transparent gray", href: "resources/js/Pages/Dashboard/ConfirmPopup#", onClick: handleCancel, children: "No" })
      ] })
    ] })
  ] }) });
};
const FolderLink = ({
  link,
  handleOnClick,
  handleChange,
  subStatus
}) => {
  const linkID = link.id;
  let displayIcon;
  displayIcon = checkIcon(link.icon, "edit", subStatus);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: link.id });
  const style = {
    transform: CSS$1.Transform.toString(transform),
    transition
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "grid_item",
      ref: setNodeRef,
      style,
      children: /* @__PURE__ */ jsxs("div", { className: "icon_col", children: [
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: "drag_handle",
            ...attributes,
            ...listeners,
            children: [
              /* @__PURE__ */ jsx(MdDragHandle, {}),
              /* @__PURE__ */ jsx("div", { className: "hover_text", children: /* @__PURE__ */ jsx("p", { children: "Move" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "column_content", children: [
          /* @__PURE__ */ jsx("div", { className: "icon_wrap", onClick: (e) => {
            handleOnClick(linkID);
          }, children: /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsx("img", { src: displayIcon, alt: "" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "my_row", children: /* @__PURE__ */ jsxs("div", { className: "switch_wrap", children: [
            /* @__PURE__ */ jsx(
              Switch,
              {
                onChange: (e) => handleChange(link),
                checked: Boolean(link.active_status)
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "hover_text switch", children: /* @__PURE__ */ jsxs("p", { children: [
              Boolean(link.active_status) ? "Deactivate" : "Active",
              " Icon"
            ] }) })
          ] }) })
        ] })
      ] })
    }
  );
};
const __vite_glob_0_41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FolderLink
}, Symbol.toStringTag, { value: "Module" }));
const FolderLinks = ({
  folderID,
  subStatus,
  setEditID,
  setAccordionValue
}) => {
  const { dispatch } = useContext(UserLinksContext);
  const { folderLinks, dispatchFolderLinks } = useContext(FolderLinksContext);
  const targetRef = useRef(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const handleChange = (currentItem) => {
    const newStatus = !currentItem.active_status;
    const packets = {
      active_status: newStatus
    };
    const url = "/dashboard/links/status/";
    updateLinkStatus(packets, currentItem.id, url).then((data) => {
      if (data.success) {
        dispatchFolderLinks({ type: FOLDER_LINKS_ACTIONS.UPDATE_FOLDER_LINKS_STATUS, payload: { id: currentItem.id } });
        dispatch({ type: LINKS_ACTIONS.UPDATE_LINKS_STATUS_FROM_FOLDER, payload: { id: currentItem.id, folderID } });
      }
    });
  };
  const handleOnClick = (linkID) => {
    setEditID(linkID);
    const currentLink = folderLinks.find(function(e) {
      return e.id === linkID;
    });
    if (currentLink.icon.includes("offer-images")) {
      setAccordionValue("offer");
    } else if (currentLink.icon.includes("custom-icons")) {
      setAccordionValue("custom");
    } else {
      setAccordionValue("standard");
    }
    setTimeout(function() {
      document.querySelector("#scrollTo").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 800);
  };
  const handleGridOnChange = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = folderLinks.map(function(e) {
        return e.id;
      }).indexOf(active.id);
      const newIndex = folderLinks.map(function(e) {
        return e.id;
      }).indexOf(over.id);
      const newArray = arrayMove(folderLinks, oldIndex, newIndex);
      dispatchFolderLinks({ type: FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS, payload: { links: newArray } });
      dispatch({ type: LINKS_ACTIONS.SET_FOLDER_LINKS_ORDER, payload: { links: newArray, id: folderID } });
      const packets = {
        userLinks: newArray
      };
      updateLinksPositions(packets);
    }
  };
  return /* @__PURE__ */ jsx("div", { ref: targetRef, className: `icons_wrap add_icons icons folder ${folderLinks.length === 0 ? "no_icons" : ""}`, children: folderLinks.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "info_message", children: [
    /* @__PURE__ */ jsx("p", { children: "You don't have any icons to display in this folder." }),
    /* @__PURE__ */ jsx("p", { children: "Click 'Add Icon' above to start adding links." })
  ] }) : /* @__PURE__ */ jsx(
    DndContext,
    {
      sensors,
      collisionDetection: closestCenter,
      onDragEnd: handleGridOnChange,
      children: /* @__PURE__ */ jsx(
        SortableContext,
        {
          id: "grid-sort-contextbasic",
          items: folderLinks.map((i) => i == null ? void 0 : i.id),
          strategy: rectSortingStrategy,
          children: folderLinks.length > 0 && folderLinks.map((link) => {
            return /* @__PURE__ */ jsx(
              FolderLink,
              {
                link,
                subStatus,
                handleChange,
                handleOnClick
              },
              link.id
            );
          })
        }
      )
    }
  ) });
};
const __vite_glob_0_42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FolderLinks
}, Symbol.toStringTag, { value: "Module" }));
const ConfirmFolderDelete = ({
  showConfirmFolderDelete,
  setShowConfirmFolderDelete,
  folderID,
  setEditFolderID,
  setAccordionValue
}) => {
  const { userLinks: userLinks2, dispatch } = useContext(UserLinksContext);
  const deleteItem = (e) => {
    e.preventDefault();
    let newArray = userLinks2.filter((element) => {
      if (element.type !== "folder") {
        return element;
      } else {
        return element.id !== folderID;
      }
    });
    const packets = {
      userLinks: newArray
    };
    deleteFolder(packets, folderID).then((data) => {
      if (data.success) {
        dispatch({ type: LINKS_ACTIONS.SET_LINKS, payload: { links: data.links } });
        setEditFolderID(null);
        setShowConfirmFolderDelete(false);
        setAccordionValue(null);
      }
    });
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setShowConfirmFolderDelete(false);
  };
  return /* @__PURE__ */ jsx("div", { id: "confirm_folder_popup_link", className: showConfirmFolderDelete ? "open" : "", children: /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("div", { className: "icon_wrap check", children: /* @__PURE__ */ jsx(MdCheckCircle, {}) }),
    /* @__PURE__ */ jsx("h2", { children: "Confirm" }),
    /* @__PURE__ */ jsxs("div", { className: "text_wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "confirm_text", children: "Are you sure you want to delete this folder?" }),
      /* @__PURE__ */ jsxs("form", { action: "resources/js/Pages/Dashboard/ConfirmFolderDelete", className: "button_row", children: [
        /* @__PURE__ */ jsx("a", { className: "button green", href: "resources/js/Pages/Dashboard/ConfirmFolderDelete#", onClick: deleteItem, children: "Yes" }),
        /* @__PURE__ */ jsx("a", { className: "button transparent gray", href: "resources/js/Pages/Dashboard/ConfirmFolderDelete#", onClick: handleCancel, children: "No" })
      ] })
    ] })
  ] }) });
};
const DowngradeAlert = () => {
  return /* @__PURE__ */ jsxs("div", { className: "icon_message", children: [
    /* @__PURE__ */ jsx("p", { children: "Your plan has been downgraded to Free. Your link will only display up to 8 icons max, any custom icons you used will have to be changed to use our standard icons and any folders you added will not be shown." }),
    /* @__PURE__ */ jsx(Link$1, { className: "button blue", href: route("plans.get"), children: "Upgrade" })
  ] });
};
function PageHeaderLayout({ pageHeaderRef }) {
  const { pageSettings } = useContext(PageContext);
  const [layout, setLayout] = useState(pageSettings["profile_layout"]);
  const setRadioValue = (value) => {
    const packets = {
      profileLayout: value
    };
    updateProfileLayout(packets, pageSettings["id"]).then((response) => {
      console.log(response.message);
      setLayout(value);
    });
    pageHeaderRef.current.id = value;
  };
  return /* @__PURE__ */ jsxs("div", { className: "edit_form", children: [
    /* @__PURE__ */ jsxs("form", { className: "layouts", children: [
      /* @__PURE__ */ jsxs("div", { className: "radio_wrap", children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: "layout_one", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              value: "layout_one",
              name: "layout",
              checked: layout === "layout_one",
              onChange: (e) => {
                setRadioValue(e.target.value);
              }
            }
          ),
          "Layout 1"
        ] }),
        /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/layout-1.png"), alt: "" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "radio_wrap", children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: "layout_two", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              value: "layout_two",
              name: "layout",
              checked: layout === "layout_two",
              onChange: (e) => {
                setRadioValue(e.target.value);
              }
            }
          ),
          "Layout 2"
        ] }),
        /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/layout-2.png"), alt: "" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "radio_wrap", children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: "layout_three", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              value: "layout_three",
              name: "layout",
              checked: layout === "layout_three",
              onChange: (e) => {
                setRadioValue(e.target.value);
              }
            }
          ),
          "Layout 3"
        ] }),
        /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/layout-3.png"), alt: "" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(ToolTipIcon, { section: "layout" })
  ] });
}
const __vite_glob_0_71 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PageHeaderLayout
}, Symbol.toStringTag, { value: "Module" }));
const LivePageButton = ({ pageName }) => {
  const host = window.location.origin;
  return /* @__PURE__ */ jsx("a", { className: "button green", target: "_blank", href: host + "/" + pageName, children: "Open Live Page" });
};
const __vite_glob_0_67 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LivePageButton
}, Symbol.toStringTag, { value: "Module" }));
const MessageAlertPopup = ({ optionText, showMessageAlertPopup, setShowMessageAlertPopup }) => {
  const handleClose = (e) => {
    e.preventDefault();
    setShowMessageAlertPopup(false);
  };
  return /* @__PURE__ */ jsxs("div", { id: "upgrade_popup", className: showMessageAlertPopup ? "open" : "", children: [
    /* @__PURE__ */ jsx("a", { className: "close_popup", href: "#", onClick: handleClose, children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-x-circle", viewBox: "0 0 16 16", children: [
      /* @__PURE__ */ jsx("path", { d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" }),
      /* @__PURE__ */ jsx("path", { d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "box", children: [
      /* @__PURE__ */ jsx("div", { className: "icon_wrap blue_icon", children: /* @__PURE__ */ jsx(IoMdAlert, {}) }),
      /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx("span", { className: "option_text", children: optionText }) })
    ] })
  ] });
};
const getIcons = (url) => {
  return axios$1.get(url).then(
    (response) => {
      const iconData = response.data.iconData;
      const authUser = response.data.authUser || null;
      return {
        success: true,
        iconData,
        authUser
      };
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const DropdownComponent$1 = ({
  data,
  setSearchInput,
  iconList,
  setFilteredIcons,
  setFilteredByCat
}) => {
  const handleChange = (e) => {
    setSearchInput("");
    const value = e.target.value.toLowerCase();
    if (value === "all") {
      setFilteredByCat(iconList);
      setFilteredIcons(iconList);
    } else {
      const filtered = iconList.filter((icon) => {
        return icon.categories.find((el) => el.match(value));
      });
      setFilteredByCat(filtered);
      setFilteredIcons(filtered);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "my_row position-relative", children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        className: "active",
        id: "category_select",
        defaultValue: "all",
        onChange: (e) => handleChange(e),
        children: [
          /* @__PURE__ */ jsx("option", { value: "all", children: "All" }),
          data == null ? void 0 : data.map((category) => {
            const { id, name: name2, children, parent_id } = category;
            return children.length > 0 ? /* @__PURE__ */ jsxs("optgroup", { label: name2, "data-parent": parent_id, children: [
              /* @__PURE__ */ jsxs("option", { value: name2, children: [
                "All ",
                name2
              ] }, children.length),
              children.map((child) => {
                const { id: id2, name: name22 } = child;
                return /* @__PURE__ */ jsx("option", { value: name22, children: name22 }, id2);
              })
            ] }, id) : /* @__PURE__ */ jsx("option", { value: id, children: name2 }, id);
          })
        ]
      }
    ),
    /* @__PURE__ */ jsx("label", { htmlFor: "category_select", id: "category_select_label", children: "Filter By Category" })
  ] });
};
const __vite_glob_0_48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DropdownComponent$1
}, Symbol.toStringTag, { value: "Module" }));
const IconList = ({
  currentLink,
  setCurrentLink,
  accordionValue,
  setCharactersLeft,
  setInputType = null,
  integrationType = null,
  editID,
  customIconArray = null,
  setCustomIconArray = null
}) => {
  const [isDefaultIcon, setIsDefaultIcon] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [iconList, setIconList] = useState([]);
  const [filteredIcons, setFilteredIcons] = useState([]);
  const [filteredByCat, setFilteredByCat] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]);
  const [activeIcon, setActiveIcon] = useState(null);
  const [iconsWrapClasses, setIconsWrapClasses] = useState("");
  useEffect(() => {
    if (accordionValue === "offer") {
      getCourseCategories().then((data) => {
        if (data.success) {
          setCourseCategories(data.categories);
        }
      });
    }
  }, []);
  useEffect(() => {
    let url;
    switch (accordionValue) {
      case "offer":
        url = "/get-aff-icons";
        break;
      case "custom":
      case "integration":
        url = "/get-custom-icons";
        break;
      case "standard":
        url = "/get-standard-icons";
        break;
    }
    getIcons(url).then((data) => {
      if (data.success) {
        if (accordionValue === "standard") {
          setIconList(getIconPaths(data.iconData));
        } else if (accordionValue === "custom" || accordionValue === "integration") {
          setCustomIconArray(data.iconData);
        } else {
          setIconList(data.iconData);
        }
        if (data.authUser) {
          setAuthUser(data.authUser);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    });
  }, [accordionValue]);
  useEffect(() => {
    if (accordionValue === "integration" && !editID) {
      setIsDefaultIcon(true);
      if (integrationType === "mailchimp") {
        setCurrentLink((prevState) => ({
          ...prevState,
          icon: "https://local-lp-user-images.s3.us-east-2.amazonaws.com/icons/Mailchimp.png",
          type: "mailchimp"
        }));
      }
      if (integrationType === "shopify") {
        setCurrentLink((prevState) => ({
          ...prevState,
          icon: "https://lp-production-images.s3.us-east-2.amazonaws.com/icons/Shopify.png",
          type: "shopify"
        }));
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [accordionValue]);
  const selectIcon = useCallback((e, source) => {
    e.preventDefault();
    const el = e.target;
    const iconType = el.dataset.icontype;
    const iconIndex = el.dataset.index || null;
    if (iconIndex !== activeIcon) {
      setActiveIcon(iconIndex);
      let name2;
      if (el.dataset.name) {
        name2 = el.dataset.name;
        setCharactersLeft(11 - name2.length);
        if (name2.toLowerCase().includes("mail") && !name2.toLowerCase().includes("mailchimp") || name2.toLowerCase().includes("yahoo") || name2.toLowerCase().includes("outlook")) {
          setInputType("email");
        } else if (name2.toLowerCase() === "phone" || name2.toLowerCase() === "facetime") {
          setInputType("phone");
        } else {
          setInputType("url");
        }
      } else {
        name2 = currentLink.name;
      }
      let url = null;
      if (iconType === "standard") {
        let icon = icons.find((icon2) => icon2.name === name2);
        if (icon == null ? void 0 : icon.prefix) {
          url = icon.prefix;
        }
      }
      if (iconType === "offer") {
        url = window.location.origin + "/" + el.dataset.creator + "/course-page/" + el.dataset.slug + "?a=" + authUser;
        setInputType("offer");
      }
      setCurrentLink((prevState) => ({
        ...prevState,
        name: name2,
        icon: source,
        url,
        type: iconType,
        course_id: el.dataset.course || ""
      }));
      setTimeout(function() {
        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }, 500);
    } else {
      setActiveIcon(null);
    }
  });
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  useEffect(() => {
    if (accordionValue === "standard") {
      setFilteredIcons(iconList == null ? void 0 : iconList.filter((i) => {
        const iconName = i.name && i.name.toLowerCase().replace(" ", "");
        const userInput = searchInput.toLowerCase().replace(" ", "");
        return iconName && iconName.match(userInput);
      }));
    } else {
      const filterList = filteredByCat.length > 0 ? filteredByCat : iconList;
      setFilteredIcons(filterList == null ? void 0 : filterList.filter((i) => {
        const offerName = i.name && i.name.toLowerCase().replace(" ", "");
        const userInput = searchInput.toLowerCase().replace(" ", "");
        return offerName && offerName.match(userInput);
      }));
    }
  }, [iconList, searchInput]);
  useEffect(() => {
    let classes = "";
    if (accordionValue === "integration") {
      classes = "outer integration_icons";
    }
    if (activeIcon !== null || customIconArray && customIconArray.length < 5 && (accordionValue === "custom" || accordionValue === "integration")) {
      classes += " active";
    }
    setIconsWrapClasses(classes);
  }, [activeIcon, customIconArray]);
  const switchIconsList = () => {
    switch (accordionValue) {
      case "custom":
        return !isEmpty(customIconArray) ? customIconArray.map((iconPath, index2) => {
          const newPath = iconPath == null ? void 0 : iconPath.replace("public", "/storage");
          return /* @__PURE__ */ jsx("div", { className: "icon_col", children: /* @__PURE__ */ jsx(
            "img",
            {
              alt: "",
              className: `img-fluid icon_image ${parseInt(activeIcon) === parseInt(index2) ? "active" : ""}`,
              "data-icontype": accordionValue,
              "data-index": index2,
              src: newPath,
              onClick: (e) => {
                selectIcon(e, newPath);
              }
            }
          ) }, index2);
        }) : /* @__PURE__ */ jsxs("div", { className: "info_message", children: [
          /* @__PURE__ */ jsx("p", { children: "You don't have any icons to display." }),
          /* @__PURE__ */ jsx("p", { children: "Click 'Upload Image' above to add a custom icon." })
        ] });
      case "integration":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "icon_col default_icon", children: [
            /* @__PURE__ */ jsx("p", { children: "Default Icon" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                alt: "",
                className: `
                                     ${isDefaultIcon ? "active img-fluid icon_image" : "img-fluid icon_image"}
                                     ${parseInt(activeIcon) === parseInt(-1) ? "active" : ""}
                                     `,
                src: integrationType === "mailchimp" ? "https://local-lp-user-images.s3.us-east-2.amazonaws.com/icons/Mailchimp.png" : "https://lp-production-images.s3.us-east-2.amazonaws.com/icons/Shopify.png",
                "data-icontype": "default",
                "data-index": -1,
                onClick: (e) => {
                  selectIcon(e, e.target.src);
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "custom_icons", children: [
            /* @__PURE__ */ jsx("p", { children: "Custom Icons" }),
            /* @__PURE__ */ jsx("div", { className: "icons_wrap inner", children: !isEmpty(customIconArray) ? customIconArray.map((iconPath, index2) => {
              const newPath = iconPath.replace("public", "/storage");
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: `icon_col`,
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      alt: "",
                      "data-index": index2,
                      className: `img-fluid icon_image ${parseInt(activeIcon) === parseInt(index2) ? "active" : ""}`,
                      src: newPath,
                      "data-icontype": accordionValue,
                      onClick: (e) => {
                        selectIcon(e, newPath);
                      }
                    }
                  )
                },
                index2
              );
            }) : /* @__PURE__ */ jsxs("div", { className: "info_message", children: [
              /* @__PURE__ */ jsx("p", { children: "You don't have any icons to display." }),
              /* @__PURE__ */ jsx("p", { children: "Click 'Upload Image' above to add a custom icon." })
            ] }) })
          ] })
        ] });
      default:
        return filteredIcons ? filteredIcons.map((icon, index2) => {
          return /* @__PURE__ */ jsxs("div", { className: "icon_col", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: `img-fluid icon_image ${parseInt(activeIcon) === parseInt(index2) ? "active" : ""}`,
                src: icon.path,
                onClick: (e) => {
                  selectIcon(e, icon.path);
                },
                "data-name": icon.name,
                "data-creator": icon.creator || "",
                "data-slug": icon.slug || "",
                "data-course": icon.course_id || "",
                "data-icontype": accordionValue,
                "data-index": index2,
                alt: ""
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "hover_text icon_text", children: /* @__PURE__ */ jsx("p", { children: icon.name }) })
          ] }, index2);
        }) : iconList == null ? void 0 : iconList.map((icon, index2) => {
          return /* @__PURE__ */ jsxs("div", { className: "icon_col", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: `img-fluid icon_image ${parseInt(activeIcon) === parseInt(index2) ? "active" : ""}`,
                src: icon.path,
                onClick: (e) => {
                  selectIcon(e, icon.path);
                },
                "data-name": icon.name,
                "data-creator": icon.creator || "",
                "data-slug": icon.slug || "",
                "data-course": icon.course_id || "",
                "data-icontype": accordionValue,
                "data-index": index2,
                alt: ""
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "hover_text icon_text", children: /* @__PURE__ */ jsx("p", { children: icon.name }) })
          ] }, index2);
        });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    (accordionValue === "standard" || accordionValue === "offer") && /* @__PURE__ */ jsxs("div", { className: "uploader mt-3", children: [
      accordionValue === "offer" && /* @__PURE__ */ jsx(
        DropdownComponent$1,
        {
          data: courseCategories,
          iconList,
          setSearchInput,
          setFilteredIcons,
          setFilteredByCat
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative my-3 my_row", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "animate",
            name: "search",
            type: "text",
            onChange: (e) => handleChange(e),
            onFocus: (e) => HandleFocus$1(e.target),
            onBlur: (e) => HandleBlur(e.target),
            value: searchInput
          }
        ),
        /* @__PURE__ */ jsxs("label", { htmlFor: "search", children: [
          "Search ",
          accordionValue === "standard" ? "Icons" : "Offers"
        ] })
      ] }),
      accordionValue === "standard" && /* @__PURE__ */ jsx("div", { className: "my_row info_text file_types text-center mb-2 text-center", children: /* @__PURE__ */ jsx("a", { href: "mailto:help@link.pro", className: "mx-auto m-0 char_count", children: "Don't See Your Icon? Contact Us!" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `icons_wrap my_row ${iconsWrapClasses}`, children: [
      isLoading && /* @__PURE__ */ jsx("div", { id: "loading_spinner", className: "active", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/spinner.svg"), alt: "" }) }),
      switchIconsList()
    ] })
  ] });
};
const __vite_glob_0_63 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IconList
}, Symbol.toStringTag, { value: "Module" }));
const InputComponent$1 = ({
  currentLink,
  setCurrentLink,
  inputType,
  setInputType
}) => {
  const { url, email, phone } = currentLink;
  const [inputValues, setInputValues] = useState({
    name: null,
    type: null,
    value: null,
    placeholder: null,
    key: null
  });
  useEffect(() => {
    let currentInputType;
    if (url) {
      currentInputType = "url";
    } else if (email) {
      currentInputType = "email";
    } else if (phone) {
      currentInputType = "phone";
    } else {
      currentInputType = "url";
    }
    setInputType(currentInputType);
    setCurrentLink((link) => ({
      ...link,
      type: currentInputType
    }));
  }, []);
  useEffect(() => {
    switch (inputType) {
      case "url":
        setInputValues({
          name: "url",
          type: "text",
          value: url || "",
          placeholder: "https://linkurl.com",
          key: "url"
        });
        break;
      case "email":
        setInputValues({
          name: "email",
          type: "email",
          value: email || "",
          placeholder: "example@example.com",
          key: "email"
        });
        break;
      case "phone":
        setInputValues({
          name: "phone",
          type: "tel",
          value: phone || "",
          placeholder: "xxx-xxx-xxxx",
          key: "phone"
        });
        break;
      default:
        setInputValues({
          name: "url",
          type: "text",
          value: url || "",
          placeholder: "https://linkurl.com",
          key: "url"
        });
        break;
    }
  }, [inputType, currentLink]);
  const handleChange = (e, key2) => {
    var _a;
    let key22;
    let key3;
    let iconType;
    if (key2 === "phone") {
      key22 = "email";
      key3 = "url";
      iconType = "phone";
    } else if (key2.includes("email")) {
      key22 = "phone";
      key3 = "url";
      iconType = "email";
    } else {
      key22 = "phone";
      key3 = "email";
      iconType = "url";
    }
    setCurrentLink({
      ...currentLink,
      [`${key2}`]: ((_a = e.target) == null ? void 0 : _a.value) || e,
      [`${key22}`]: null,
      [`${key3}`]: null,
      /*[`${key4}`]: null,
      [`${key5}`]: null,*/
      type: iconType
    });
  };
  const { name: name2, type, value, placeholder, key } = inputValues;
  return /* @__PURE__ */ jsxs("div", { className: "my_row relative mt-2", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        className: value !== "" ? "active" : "",
        name: name2,
        type,
        defaultValue: value || "",
        onChange: (e) => handleChange(e, key),
        onFocus: (e) => HandleFocus$1(e.target),
        onBlur: (e) => HandleBlur(e.target)
      }
    ),
    /* @__PURE__ */ jsx("label", { className: "text-lowercase", children: placeholder })
  ] });
};
const __vite_glob_0_50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: InputComponent$1
}, Symbol.toStringTag, { value: "Module" }));
const InputTypeRadio = ({ inputType, setInputType, currentLink, setCurrentLink }) => {
  useEffect(() => {
    if (currentLink.url) {
      setInputType("url");
    } else if (currentLink.email) {
      setInputType("email");
    } else if (currentLink.phone) {
      setInputType("phone");
    }
  }, []);
  const handleOnChange = (e) => {
    setInputType(e.target.value);
    setCurrentLink((prevState) => ({
      ...prevState,
      type: e.target.value
    }));
  };
  return /* @__PURE__ */ jsxs("div", { className: "my_row radios_wrap input_types mb-1", children: [
    /* @__PURE__ */ jsx("div", { className: inputType === "url" || !inputType ? "radio_wrap active" : "radio_wrap", children: /* @__PURE__ */ jsxs("label", { htmlFor: "url", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "url",
          type: "radio",
          value: "url",
          name: "input_type",
          checked: inputType === "url" || !inputType,
          onChange: (e) => {
            handleOnChange(e);
          }
        }
      ),
      "URL"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: inputType === "email" ? "radio_wrap active" : "radio_wrap", children: /* @__PURE__ */ jsxs("label", { htmlFor: "email", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "email",
          type: "radio",
          value: "email",
          name: "input_type",
          onChange: (e) => {
            handleOnChange(e);
          },
          checked: inputType === "email"
        }
      ),
      "Email"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: inputType === "phone" ? "radio_wrap active" : "radio_wrap", children: /* @__PURE__ */ jsxs("label", { htmlFor: "phone", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "phone",
          type: "radio",
          value: "phone",
          name: "input_type",
          onChange: (e) => {
            handleOnChange(e);
          },
          checked: inputType === "phone"
        }
      ),
      "Phone"
    ] }) })
  ] });
};
const __vite_glob_0_51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: InputTypeRadio
}, Symbol.toStringTag, { value: "Module" }));
const StandardForm = ({
  accordionValue,
  setAccordionValue,
  inputType,
  setInputType,
  editID,
  subStatus,
  setShowLinkForm,
  setEditID,
  setShowUpgradePopup,
  setOptionText,
  folderID,
  affStatus = null
}) => {
  const { userLinks: userLinks2, dispatch } = useContext(UserLinksContext);
  const { folderLinks, dispatchFolderLinks } = useContext(FolderLinksContext);
  const { pageSettings } = useContext(PageContext);
  const [showTerms, setShowTerms] = useState(false);
  const [affiliateStatus, setAffiliateStatus] = useState(affStatus);
  const [currentLink, setCurrentLink] = useState(
    userLinks2.find(function(e) {
      return e.id === editID;
    }) || folderLinks.find(function(e) {
      return e.id === editID;
    }) || {
      icon: null,
      name: null,
      url: null,
      email: null,
      phone: null,
      mailchimp_list_id: null,
      shopify_products: null,
      shopify_id: null,
      course_id: null,
      type: null
    }
  );
  const [charactersLeft, setCharactersLeft] = useState();
  useEffect(() => {
    if (currentLink.name) {
      setCharactersLeft(11 - currentLink.name.length);
    } else {
      setCharactersLeft(11);
    }
  }, [charactersLeft]);
  useEffect(() => {
    if (accordionValue === "standard") {
      if (currentLink.phone) {
        setInputType("phone");
      } else if (currentLink.email) {
        setInputType("email");
      } else {
        setInputType("url");
      }
    } else if (accordionValue === "offer") {
      setInputType("offer");
    }
  }, []);
  const handleLinkName = useCallback((e) => {
    let value = e.target.value;
    setCharactersLeft(11 - value.length);
    setCurrentLink(() => ({
      ...currentLink,
      name: value
    }));
  });
  const handleOnClick = (e) => {
    if (!subStatus) {
      setShowUpgradePopup(true);
      setOptionText("change link name");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let URL2 = currentLink.url;
    let data;
    if (URL2 && currentLink.name) {
      data = checkURL(URL2, currentLink.name, null, subStatus);
    } else {
      data = {
        success: true,
        url: URL2
      };
    }
    if (data["success"]) {
      URL2 = data["url"];
      let packets;
      switch (inputType) {
        case "url":
          packets = {
            name: currentLink.name,
            url: URL2,
            icon: currentLink.icon,
            page_id: pageSettings["id"],
            folder_id: folderID,
            type: "url"
          };
          break;
        case "email":
          packets = {
            name: currentLink.name,
            email: currentLink.email,
            icon: currentLink.icon,
            page_id: pageSettings["id"],
            folder_id: folderID,
            type: "email"
          };
          break;
        case "phone":
          packets = {
            name: currentLink.name,
            phone: currentLink.phone,
            icon: currentLink.icon,
            page_id: pageSettings["id"],
            folder_id: folderID,
            type: "phone"
          };
          break;
        case "offer":
          packets = {
            name: currentLink.name,
            icon: currentLink.icon,
            url: URL2,
            page_id: pageSettings["id"],
            course_id: currentLink.course_id,
            folder_id: folderID,
            type: "offer"
          };
          break;
      }
      const func = editID ? updateLink(packets, editID) : addLink(packets);
      func.then((data2) => {
        if (data2.success) {
          if (folderID) {
            if (editID) {
              dispatchFolderLinks({
                type: FOLDER_LINKS_ACTIONS.UPDATE_FOLDER_LINKS,
                payload: {
                  editID,
                  currentLink,
                  url: URL2,
                  iconPath: currentLink.icon
                }
              });
              dispatch({
                type: LINKS_ACTIONS.UPDATE_LINK_IN_FOLDER,
                payload: {
                  folderID,
                  editID,
                  currentLink,
                  url: URL2,
                  iconPath: currentLink.icon
                }
              });
            } else {
              let newFolderLinks = [...folderLinks];
              const newLinkObject = {
                id: data2.link_id,
                folder_id: folderID,
                name: currentLink.name,
                url: URL2,
                email: currentLink.email,
                phone: currentLink.phone,
                type: currentLink.type,
                icon: currentLink.icon,
                course_id: currentLink.course_id,
                position: data2.position,
                active_status: true
              };
              newFolderLinks = newFolderLinks.concat(
                newLinkObject
              );
              dispatchFolderLinks({
                type: FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS,
                payload: {
                  links: newFolderLinks
                }
              });
              let folderActive = null;
              if (newFolderLinks.length === 1) {
                folderActive = true;
                const url = "/dashboard/folder/status/";
                const packets2 = {
                  active_status: folderActive
                };
                updateLinkStatus(
                  packets2,
                  folderID,
                  url
                );
              }
              dispatch({
                type: LINKS_ACTIONS.ADD_NEW_IN_FOLDER,
                payload: {
                  newLinkObject,
                  folderActive,
                  folderID
                }
              });
            }
          } else {
            if (editID) {
              dispatch({
                type: LINKS_ACTIONS.UPDATE_LINK,
                payload: {
                  editID,
                  currentLink,
                  url: URL2,
                  iconPath: currentLink.icon
                }
              });
            } else {
              let newLinks = [...userLinks2];
              const newLinkObject = {
                id: data2.link_id,
                name: currentLink.name,
                url: URL2,
                email: currentLink.email,
                phone: currentLink.phone,
                type: currentLink.type,
                icon: currentLink.icon,
                course_id: currentLink.course_id,
                position: data2.position,
                active_status: true
              };
              dispatch({
                type: LINKS_ACTIONS.SET_LINKS,
                payload: {
                  links: newLinks.concat(
                    newLinkObject
                  )
                }
              });
            }
          }
          setCurrentLink({});
          setAccordionValue(null);
          setShowLinkForm(false);
          setInputType(null);
          setEditID(null);
        }
      });
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setEditID(null);
    setShowLinkForm(false);
    setInputType(null);
    setAccordionValue(null);
    document.getElementById(
      "left_col_wrap"
    ).style.minHeight = "unset";
  };
  const handleSubmitTerms = (e) => {
    e.preventDefault();
    acceptTerms().then((data) => {
      if (data.success) {
        setAffiliateStatus("approved");
        setShowTerms(false);
      }
    });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: accordionValue === "offer" && (affiliateStatus !== "approved" || !affiliateStatus) ? showTerms ? /* @__PURE__ */ jsxs("div", { className: "aff_terms", children: [
    /* @__PURE__ */ jsx("h3", { children: "Terms and Conditions" }),
    /* @__PURE__ */ jsx("p", { children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, aspernatur dignissimos doloribus itaque quaerat rem repellendus vel voluptates. Aliquam doloribus eligendi iste, labore molestias nisi omnis saepe voluptatibus. Consequuntur, esse." }),
    /* @__PURE__ */ jsx("form", { action: "", onSubmit: handleSubmitTerms, children: /* @__PURE__ */ jsxs("div", { className: "buttons_wrap", children: [
      /* @__PURE__ */ jsx("button", { type: "submit", className: "button green", children: "Accept" }),
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "button transparent gray",
          href: "#",
          onClick: (e) => {
            e.preventDefault();
            setShowTerms(false);
          },
          children: "Cancel"
        }
      )
    ] }) })
  ] }) : /* @__PURE__ */ jsxs("div", { className: "info_message", children: [
    /* @__PURE__ */ jsx("p", { children: "Sign up now to become an affiliate and earn money selling courses!" }),
    /* @__PURE__ */ jsx(
      "a",
      {
        className: "button blue",
        href: "#",
        onClick: (e) => {
          e.preventDefault();
          setShowTerms(true);
        },
        children: "Click Here To Get Approved"
      }
    )
  ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "link_form", children: [
    /* @__PURE__ */ jsx("div", { className: "icon_row", children: /* @__PURE__ */ jsx("div", { className: "icon_box", children: /* @__PURE__ */ jsx(
      IconList,
      {
        currentLink,
        setCurrentLink,
        accordionValue,
        setCharactersLeft,
        inputType,
        setInputType,
        editID
      }
    ) }) }),
    /* @__PURE__ */ jsxs("div", { className: "my_row my-4", children: [
      !subStatus && /* @__PURE__ */ jsxs("p", { className: "upgrade_text", children: [
        /* @__PURE__ */ jsx("sup", { children: "*" }),
        "Upgrade to customize"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "input_wrap mt-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: `${!subStatus ? "disabled " : ""} ${currentLink.name ? "active" : ""}`,
            name: "name",
            type: "text",
            value: currentLink.name || "",
            onChange: (e) => handleLinkName(e),
            onFocus: (e) => HandleFocus$1(e.target),
            onBlur: (e) => HandleBlur(e.target),
            disabled: !subStatus
          }
        ),
        /* @__PURE__ */ jsx("label", { children: "Icon Name" }),
        !subStatus && /* @__PURE__ */ jsx(
          "span",
          {
            className: "disabled_wrap",
            "data-type": "name",
            onClick: (e) => handleOnClick()
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my_row info_text title", children: [
        /* @__PURE__ */ jsx("p", { className: "char_max", children: "Max 11 Characters Shown" }),
        /* @__PURE__ */ jsx("p", { className: "char_count", children: charactersLeft < 0 ? /* @__PURE__ */ jsx("span", { className: "over", children: "Only 11 Characters Will Be Shown" }) : "Characters Left: " + charactersLeft })
      ] })
    ] }),
    accordionValue !== "offer" && /* @__PURE__ */ jsx(
      InputTypeRadio,
      {
        inputType,
        setInputType,
        currentLink,
        setCurrentLink
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "my_row mb-4", children: accordionValue === "offer" ? /* @__PURE__ */ jsxs("div", { className: "external_link", children: [
      /* @__PURE__ */ jsx("h3", { children: "Offer Landing Page:" }),
      currentLink.url ? /* @__PURE__ */ jsx("a", { href: currentLink.url.split(
        "?"
      )[0], target: "_blank", children: currentLink.url.split(
        "?"
      )[0] }) : /* @__PURE__ */ jsx("p", { children: "Select An Icon Above" })
    ] }) : /* @__PURE__ */ jsx(
      InputComponent$1,
      {
        inputType,
        setInputType,
        currentLink,
        setCurrentLink
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "button_row w-full mt-4", children: [
      /* @__PURE__ */ jsx("button", { className: "button green", type: "submit", children: "Save" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "button transparent gray", onClick: (e) => handleCancel(e), children: "Cancel" }),
      /* @__PURE__ */ jsx("a", { className: "help_link", href: "mailto:help@link.pro", children: "Need Help?" })
    ] })
  ] }) });
};
const __vite_glob_0_62 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StandardForm
}, Symbol.toStringTag, { value: "Module" }));
const FormBreadcrumbs = ({
  folderID,
  editID,
  setEditID,
  setEditFolderID,
  setAccordionValue,
  showLinkForm,
  setShowLinkForm,
  setIntegrationType,
  setInputType
}) => {
  return /* @__PURE__ */ jsx("div", { className: "breadcrumb_links", children: folderID ? /* @__PURE__ */ jsxs(Fragment, { children: [
    editID || showLinkForm ? /* @__PURE__ */ jsxs(
      "a",
      {
        className: "back",
        href: "#",
        onClick: (e) => {
          e.preventDefault();
          setShowLinkForm(false);
          setEditID(null);
          setAccordionValue(null);
        },
        children: [
          /* @__PURE__ */ jsx(BiChevronLeft, {}),
          "Folder"
        ]
      }
    ) : "",
    /* @__PURE__ */ jsxs(
      "a",
      {
        className: "back",
        href: "#",
        onClick: (e) => {
          e.preventDefault();
          setEditFolderID(false);
          setShowLinkForm(false);
          setEditID(null);
          setAccordionValue(null);
        },
        children: [
          /* @__PURE__ */ jsx(BiChevronsLeft, {}),
          "Icons"
        ]
      }
    )
  ] }) : /* @__PURE__ */ jsxs(
    "a",
    {
      className: "back",
      href: "#",
      onClick: (e) => {
        e.preventDefault();
        setShowLinkForm(false);
        setEditID(null);
        setEditFolderID(false);
        setIntegrationType(null);
        setInputType(null);
        setAccordionValue(null);
      },
      children: [
        /* @__PURE__ */ jsx(BiChevronLeft, {}),
        "Back To Icons"
      ]
    }
  ) });
};
const __vite_glob_0_49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FormBreadcrumbs
}, Symbol.toStringTag, { value: "Module" }));
const DeleteIcon = ({
  setShowConfirmPopup,
  setShowConfirmFolderDelete,
  editFolderID,
  editID
}) => {
  const handleDeleteClick = (e) => {
    e.preventDefault();
    if (editFolderID && !editID) {
      setShowConfirmFolderDelete(true);
    } else {
      setShowConfirmPopup(true);
    }
  };
  return /* @__PURE__ */ jsxs(
    "a",
    {
      className: "delete",
      href: "#",
      onClick: handleDeleteClick,
      children: [
        /* @__PURE__ */ jsx(MdDeleteForever, {}),
        /* @__PURE__ */ jsx("div", { className: "hover_text delete_folder", children: /* @__PURE__ */ jsxs("p", { children: [
          "Delete ",
          editID ? "Icon" : "Folder"
        ] }) })
      ]
    }
  );
};
const __vite_glob_0_47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteIcon
}, Symbol.toStringTag, { value: "Module" }));
const FolderNameInput = ({ folderID }) => {
  const [charactersLeft, setCharactersLeft] = useState();
  const { userLinks: userLinks2, dispatch } = useContext(UserLinksContext);
  const [currentFolder, setCurrentFolder] = useState(
    userLinks2.find(function(e) {
      return e.id === folderID && e.type === "folder";
    }) || null
  );
  useEffect(() => {
    if (currentFolder.name) {
      setCharactersLeft(11 - currentFolder.name.length);
    } else {
      setCharactersLeft(11);
    }
  }, [charactersLeft]);
  const handleSubmit = () => {
    const packets = {
      folderName: currentFolder.name
    };
    updateFolderName(folderID, packets).then((data) => {
      if (data.success) {
        dispatch({ type: LINKS_ACTIONS.UPDATE_FOLDER_NAME, payload: { folderID, name: currentFolder.name } });
      }
    });
  };
  const handleFolderName = (e) => {
    let value = e.target.value;
    setCharactersLeft(11 - value.length);
    setCurrentFolder({
      ...currentFolder,
      name: value
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "input_wrap", children: /* @__PURE__ */ jsx(
      "input",
      {
        name: "name",
        type: "text",
        value: currentFolder.name || "",
        placeholder: "Folder Name",
        onChange: (e) => handleFolderName(e),
        onKeyPress: (event) => {
          if (event.key === "Enter") {
            handleSubmit();
          }
        },
        onBlur: (e) => handleSubmit()
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "my_row info_text", children: [
      /* @__PURE__ */ jsx("p", { className: "char_max", children: "Max 11 Characters Shown" }),
      /* @__PURE__ */ jsx("p", { className: "char_count", children: charactersLeft < 0 ? /* @__PURE__ */ jsx("span", { className: "over", children: "Only 11 Characters Will Be Shown" }) : "Characters Left: " + charactersLeft })
    ] })
  ] });
};
const __vite_glob_0_43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FolderNameInput
}, Symbol.toStringTag, { value: "Module" }));
const AccordionLink = ({ type, accordionValue, setAccordionValue, linkText, subStatus }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setAccordionValue(type);
  };
  return /* @__PURE__ */ jsxs("a", { className: `accordion_link ${accordionValue === type && "open"}`, href: "#", onClick: (e) => handleClick(e), children: [
    linkText,
    /* @__PURE__ */ jsx(MdKeyboardArrowUp, {})
  ] });
};
const __vite_glob_0_45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AccordionLink
}, Symbol.toStringTag, { value: "Module" }));
const CustomForm = ({
  accordionValue,
  setAccordionValue,
  inputType,
  setInputType,
  editID,
  setShowLinkForm,
  setEditID,
  folderID,
  setShowLoader
}) => {
  const [customIconArray, setCustomIconArray] = useState([]);
  const { userLinks: userLinks2, dispatch } = useContext(UserLinksContext);
  const { folderLinks, dispatchFolderLinks } = useContext(FolderLinksContext);
  const { pageSettings } = useContext(PageContext);
  const [completedIconCrop, setCompletedIconCrop] = useState({});
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1);
  const [iconSelected, setIconSelected] = useState(false);
  const [upImg, setUpImg] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30 });
  const [customIcon, setCustomIcon] = useState(null);
  const [charactersLeft, setCharactersLeft] = useState();
  const [currentLink, setCurrentLink] = useState(
    userLinks2.find(function(e) {
      return e.id === editID;
    }) || folderLinks.find(function(e) {
      return e.id === editID;
    }) || {
      icon: null,
      name: null,
      url: null,
      email: null,
      phone: null,
      mailchimp_list_id: null,
      shopify_products: null,
      shopify_id: null,
      type: null
    }
  );
  useDebounceEffect(
    async () => {
      if ((completedIconCrop == null ? void 0 : completedIconCrop.width) && (completedIconCrop == null ? void 0 : completedIconCrop.height) && imgRef.current && previewCanvasRef.current) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedIconCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedIconCrop, scale, rotate]
  );
  useEffect(() => {
    if (currentLink.name) {
      setCharactersLeft(11 - currentLink.name.length);
    } else {
      setCharactersLeft(11);
    }
  }, [charactersLeft]);
  useEffect(() => {
    if (!customIcon) {
      return;
    }
    const objectUrl = URL.createObjectURL(customIcon);
    return () => URL.revokeObjectURL(objectUrl);
  }, [customIcon]);
  const selectCustomIcon = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }
    setCrop(void 0);
    setIconSelected(true);
    createImage(files[0], setUpImg);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (iconSelected) {
      const image = getFileToUpload(previewCanvasRef == null ? void 0 : previewCanvasRef.current);
      image.then((value) => {
        submitWithCustomIcon(value);
      });
    } else {
      let URL2 = currentLink.url;
      let data;
      if (URL2 && currentLink.name) {
        data = checkURL(
          URL2,
          currentLink.name,
          false,
          true
        );
      } else {
        data = {
          success: true,
          url: URL2
        };
      }
      if (data["success"]) {
        URL2 = data["url"];
        let packets;
        switch (inputType) {
          case "url":
            packets = {
              name: currentLink.name,
              url: URL2,
              icon: currentLink.icon,
              page_id: pageSettings["id"],
              folder_id: folderID,
              type: currentLink.type
            };
            break;
          case "email":
            packets = {
              name: currentLink.name,
              email: currentLink.email,
              icon: currentLink.icon,
              page_id: pageSettings["id"],
              folder_id: folderID,
              type: currentLink.type
            };
            break;
          case "phone":
            packets = {
              name: currentLink.name,
              phone: currentLink.phone,
              icon: currentLink.icon,
              page_id: pageSettings["id"],
              folder_id: folderID,
              type: currentLink.type
            };
            break;
        }
        const func = editID ? updateLink(packets, editID) : addLink(packets);
        func.then((data2) => {
          if (data2.success) {
            if (folderID) {
              if (editID) {
                dispatchFolderLinks({
                  type: FOLDER_LINKS_ACTIONS.UPDATE_FOLDER_LINKS,
                  payload: {
                    editID,
                    currentLink,
                    url: URL2,
                    iconPath: currentLink.icon
                  }
                });
                dispatch({
                  type: LINKS_ACTIONS.UPDATE_LINK_IN_FOLDER,
                  payload: {
                    folderID,
                    editID,
                    currentLink,
                    url: URL2,
                    iconPath: currentLink.icon
                  }
                });
              } else {
                let newFolderLinks = [...folderLinks];
                const newLinkObject = {
                  id: data2.link_id,
                  folder_id: folderID,
                  name: currentLink.name,
                  url: URL2,
                  email: currentLink.email,
                  phone: currentLink.phone,
                  type: currentLink.type,
                  mailchimp_list_id: currentLink.mailchimp_list_id,
                  shopify_products: currentLink.shopify_products,
                  shopify_id: currentLink.shopify_id,
                  icon: currentLink.icon,
                  position: data2.position,
                  active_status: true
                };
                newFolderLinks = newFolderLinks.concat(
                  newLinkObject
                );
                dispatchFolderLinks({
                  type: FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS,
                  payload: {
                    links: newFolderLinks
                  }
                });
                let folderActive = null;
                if (newFolderLinks.length === 1) {
                  folderActive = true;
                  const url = "/dashboard/folder/status/";
                  const packets2 = {
                    active_status: folderActive
                  };
                  updateLinkStatus(
                    packets2,
                    folderID,
                    url
                  );
                }
                dispatch({
                  type: LINKS_ACTIONS.ADD_NEW_IN_FOLDER,
                  payload: {
                    newLinkObject,
                    folderActive,
                    folderID
                  }
                });
              }
            } else {
              if (editID) {
                dispatch({
                  type: LINKS_ACTIONS.UPDATE_LINK,
                  payload: {
                    editID,
                    currentLink,
                    url: URL2,
                    iconPath: currentLink.icon
                  }
                });
              } else {
                let newLinks = [...userLinks2];
                const newLinkObject = {
                  id: data2.link_id,
                  name: currentLink.name,
                  url: URL2,
                  email: currentLink.email,
                  phone: currentLink.phone,
                  type: currentLink.type,
                  mailchimp_list_id: currentLink.mailchimp_list_id,
                  shopify_products: currentLink.shopify_products,
                  shopify_id: currentLink.shopify_id,
                  icon: currentLink.icon,
                  position: data2.position,
                  active_status: true
                };
                dispatch({
                  type: LINKS_ACTIONS.SET_LINKS,
                  payload: {
                    links: newLinks.concat(
                      newLinkObject
                    )
                  }
                });
              }
            }
            setShowLinkForm(false);
            setEditID(null);
            setCurrentLink({});
          }
        });
      }
    }
  };
  const submitWithCustomIcon = (image) => {
    if (currentLink.name && (currentLink.url || currentLink.email || currentLink.phone)) {
      setShowLoader({ show: true, icon: "upload", position: "fixed" });
      window.Vapor.store(
        image,
        {
          visibility: "public-read"
        },
        {
          progress: (progress) => {
            (void 0).uploadProgress = Math.round(progress * 100);
          }
        }
      ).then((response) => {
        let URL2 = currentLink.url;
        if (URL2) {
          URL2 = checkURL(currentLink.url, null, true);
        }
        let packets;
        switch (inputType) {
          case "url":
            packets = {
              name: currentLink.name,
              url: URL2,
              icon: response.key,
              page_id: pageSettings["id"],
              ext: response.extension,
              folder_id: folderID,
              type: currentLink.type
            };
            break;
          case "email":
            packets = {
              name: currentLink.name,
              email: currentLink.email,
              icon: response.key,
              page_id: pageSettings["id"],
              ext: response.extension,
              folder_id: folderID,
              type: currentLink.type
            };
            break;
          case "phone":
            packets = {
              name: currentLink.name,
              phone: currentLink.phone,
              icon: response.key,
              page_id: pageSettings["id"],
              ext: response.extension,
              folder_id: folderID,
              type: currentLink.type
            };
            break;
        }
        const func = editID ? updateLink(packets, editID) : addLink(packets);
        func.then((data) => {
          setShowLoader({ show: false, icon: null });
          if (data.success) {
            const iconPath = data.iconPath;
            if (folderID) {
              if (editID) {
                dispatchFolderLinks({
                  type: FOLDER_LINKS_ACTIONS.UPDATE_FOLDER_LINKS,
                  payload: {
                    editID,
                    currentLink,
                    url: URL2,
                    iconPath
                  }
                });
                dispatch({
                  type: LINKS_ACTIONS.UPDATE_LINK_IN_FOLDER,
                  payload: {
                    folderID,
                    editID,
                    currentLink,
                    url: URL2,
                    iconPath
                  }
                });
              } else {
                let newFolderLinks = [...folderLinks];
                const newLinkObject = {
                  id: data.link_id,
                  folder_id: folderID,
                  name: currentLink.name,
                  url: URL2,
                  email: currentLink.email,
                  phone: currentLink.phone,
                  mailchimp_list_id: currentLink.mailchimp_list_id,
                  shopify_products: currentLink.shopify_products,
                  shopify_id: currentLink.shopify_id,
                  type: currentLink.type,
                  icon: iconPath,
                  position: data.position,
                  active_status: true
                };
                let folderActive = null;
                if (newFolderLinks.length === 1) {
                  folderActive = true;
                  const url = "/dashboard/folder/status/";
                  const packets2 = {
                    active_status: folderActive
                  };
                  updateLinkStatus(packets2, folderID, url);
                }
                dispatch({
                  type: LINKS_ACTIONS.ADD_NEW_IN_FOLDER,
                  payload: {
                    newLinkObject,
                    folderActive,
                    folderID
                  }
                });
                dispatchFolderLinks({
                  type: FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS,
                  payload: {
                    links: newFolderLinks.concat(newLinkObject)
                  }
                });
              }
            } else {
              if (editID) {
                dispatch({
                  type: LINKS_ACTIONS.UPDATE_LINK,
                  payload: {
                    editID,
                    currentLink,
                    url: URL2,
                    iconPath
                  }
                });
              } else {
                let newLinks = [...userLinks2];
                const newLinkObject = {
                  id: data.link_id,
                  name: currentLink.name,
                  url: URL2,
                  email: currentLink.email,
                  phone: currentLink.phone,
                  type: currentLink.type,
                  icon: iconPath,
                  position: data.position,
                  active_status: true
                };
                dispatch({
                  type: LINKS_ACTIONS.SET_LINKS,
                  payload: {
                    links: newLinks.concat(newLinkObject)
                  }
                });
              }
            }
            setCustomIconArray((customIconArray2) => [
              ...customIconArray2,
              iconPath
            ]);
            setCurrentLink({});
            setShowLinkForm(false);
            setAccordionValue(null);
            setEditID(null);
            setInputType(null);
          }
        });
      }).catch((error) => {
        console.error(error);
      });
    } else {
      EventBus.dispatch("error", { message: "Icon Destination and Name is Required" });
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setEditID(null);
    setShowLinkForm(false);
    setAccordionValue(null);
    setInputType(null);
    setCompletedIconCrop({});
    document.getElementById("left_col_wrap").style.minHeight = "unset";
  };
  const handleLinkName = useCallback((e) => {
    let value = e.target.value;
    setCharactersLeft(11 - value.length);
    setCurrentLink(() => ({
      ...currentLink,
      name: value
    }));
  });
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "link_form", children: [
    /* @__PURE__ */ jsxs("div", { className: "my_row", children: [
      iconSelected && /* @__PURE__ */ jsxs("div", { className: "crop_section", children: [
        /* @__PURE__ */ jsx("p", { children: "Crop Icon" }),
        /* @__PURE__ */ jsx(
          CropTools,
          {
            rotate,
            setRotate,
            scale,
            setScale
          }
        ),
        /* @__PURE__ */ jsx(
          ReactCrop$1,
          {
            crop,
            onChange: (_2, percentCrop) => setCrop(percentCrop),
            onComplete: (c) => setCompletedIconCrop(c),
            aspect,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                onLoad: (e) => onImageLoad(e, aspect, setCrop),
                src: upImg,
                ref: imgRef,
                style: { transform: `scale(${scale}) rotate(${rotate}deg)` },
                alt: "Crop Me"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "icon_col", children: [
          /* @__PURE__ */ jsx("p", { children: "Icon Preview" }),
          /* @__PURE__ */ jsx(
            "canvas",
            {
              ref: previewCanvasRef,
              style: {
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
                width: iconSelected ? `100%` : 0,
                height: iconSelected ? `100%` : 0,
                borderRadius: `20px`
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "icon_row", children: /* @__PURE__ */ jsxs("div", { className: "icon_box", children: [
        /* @__PURE__ */ jsxs("div", { className: "uploader", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "custom_icon_upload", className: "custom text-uppercase button blue", children: "Upload Image" }),
          /* @__PURE__ */ jsx("input", { id: "custom_icon_upload", type: "file", className: "custom", onChange: selectCustomIcon, accept: "image/png, image/jpeg, image/jpg, image/gif" }),
          /* @__PURE__ */ jsx("div", { className: "my_row info_text file_types text-center mb-2", children: /* @__PURE__ */ jsxs("p", { className: "m-0 char_count w-100 ", children: [
            "Allowed File Types: ",
            /* @__PURE__ */ jsx("span", { children: "png, jpg, jpeg, gif" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(
          IconList,
          {
            currentLink,
            setCurrentLink,
            accordionValue,
            setCharactersLeft,
            inputType,
            setInputType,
            customIconArray,
            setCustomIconArray,
            editID
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "my_row my-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "input_wrap", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: currentLink.name !== "" ? "active" : "",
            name: "name",
            type: "text",
            value: currentLink.name || "",
            onChange: (e) => handleLinkName(e),
            onFocus: (e) => HandleFocus$1(e.target),
            onBlur: (e) => HandleBlur(e.target)
          }
        ),
        /* @__PURE__ */ jsx("label", { children: "Link Name" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "info_text title my_row", children: [
        /* @__PURE__ */ jsx("p", { className: "char_max", children: "Max 11 Characters Shown" }),
        /* @__PURE__ */ jsx("p", { className: "char_count", children: charactersLeft < 0 ? /* @__PURE__ */ jsx("span", { className: "over", children: "Only 11 Characters Will Be Shown" }) : "Characters Left: " + charactersLeft })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      InputTypeRadio,
      {
        inputType,
        setInputType,
        currentLink,
        setCurrentLink
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "my_row", children: /* @__PURE__ */ jsx(
      InputComponent$1,
      {
        inputType,
        setInputType,
        currentLink,
        setCurrentLink
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "my_row button_row mt-4", children: [
      /* @__PURE__ */ jsx("button", { className: "button green", type: "submit", children: "Save" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "button transparent gray", onClick: (e) => handleCancel(e), children: "Cancel" }),
      /* @__PURE__ */ jsx("a", { className: "help_link", href: "mailto:help@link.pro", children: "Need Help?" })
    ] })
  ] });
};
const __vite_glob_0_46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CustomForm
}, Symbol.toStringTag, { value: "Module" }));
const IntegrationType = ({
  integrationType,
  setIntegrationType,
  setShowLoader,
  setLists,
  redirectedType,
  setShopifyStores
}) => {
  useEffect(() => {
    if (integrationType === "mailchimp") {
      fetchLists();
    } else if (integrationType === "shopify") {
      fetchStores();
    }
    if (redirectedType) {
      redirectedType === "mailchimp" ? fetchLists() : fetchStores();
    }
  }, [integrationType]);
  const handleChange = (e) => {
    const value = e.target.value;
    setIntegrationType(value);
    if (value === "mailchimp") {
      fetchLists();
    }
    if (value === "shopify") {
      fetchStores();
    }
    setTimeout(function() {
      document.querySelector("#scrollTo").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 300);
  };
  const fetchLists = () => {
    setShowLoader({ show: true, icon: "loading", position: "absolute" });
    getMailchimpLists().then(
      (data) => {
        if (data.success) {
          !isEmpty(data.lists) && setLists(data.lists);
          setShowLoader({ show: false, icon: "", position: "" });
        }
      }
    );
  };
  const fetchStores = () => {
    setShowLoader({ show: true, icon: "loading", position: "absolute" });
    getStores().then(
      (data) => {
        if (data.success) {
          !isEmpty(data.stores) && setShopifyStores(data.stores);
          setShowLoader({ show: false, icon: "", position: "" });
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "integration_dropdown_wrap", children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        className: integrationType !== "" ? "active" : "",
        name: "integration_type",
        onChange: (e) => handleChange(e),
        onFocus: (e) => HandleFocus$1(e.target),
        onBlur: (e) => HandleBlur(e.target),
        value: integrationType || void 0,
        children: [
          /* @__PURE__ */ jsx("option", { value: "" }),
          /* @__PURE__ */ jsx(
            "option",
            {
              value: "mailchimp",
              children: "MailChimp"
            }
          ),
          /* @__PURE__ */ jsx(
            "option",
            {
              value: "shopify",
              children: "Shopify"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("label", { htmlFor: "mailchimp_list_id", children: "Select Integration Type" })
  ] });
};
const __vite_glob_0_53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IntegrationType
}, Symbol.toStringTag, { value: "Module" }));
const MailchimpIntegration = ({ connectionError, integrationType, editID }) => {
  const handleMailchimpClick = (e) => {
    e.preventDefault();
    const url = "/auth/mailchimp";
    if (editID) {
      localStorage.setItem("editID", editID);
    } else {
      localStorage.setItem("showLinkForm", true);
    }
    localStorage.setItem("integrationType", integrationType);
    window.location.href = url;
  };
  return /* @__PURE__ */ jsxs("div", { className: "integration_wrap", children: [
    /* @__PURE__ */ jsx("h3", { children: "Add your Mailchimp account as a LinkPro button!" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Connect your Mailchimp account by clicking the button below." }),
    /* @__PURE__ */ jsx("p", { className: "small", children: "Note: You will be redirected away from Link Pro to log into Mailchimp. You will need to either already have or create a new MailChimp account of your own to use this integration." }),
    /* @__PURE__ */ jsx("div", { id: "scrollTo", className: "button_wrap mt-4", children: /* @__PURE__ */ jsx(
      "a",
      {
        className: "button blue",
        href: "#",
        onClick: (e) => handleMailchimpClick(e),
        children: "Login To Mailchimp"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "connection_error", children: /* @__PURE__ */ jsx("p", { children: connectionError }) })
  ] });
};
const __vite_glob_0_54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MailchimpIntegration
}, Symbol.toStringTag, { value: "Module" }));
const ShopifyIntegration = ({
  connectionError,
  integrationType,
  editID,
  showAddStore,
  setShowAddStore
}) => {
  const [domain, setDomain] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "/auth/shopify?domain=" + domain;
    if (domain) {
      if (editID) {
        localStorage.setItem("editID", editID);
      } else {
        localStorage.setItem("showLinkForm", true);
      }
      localStorage.setItem("integrationType", integrationType);
      window.location.href = url;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "integration_wrap", children: [
    /* @__PURE__ */ jsx("h3", { children: "Add your Shopify products as a LinkPro button!" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "In connecting Shopify, you are sharing your Shopify store name and Product details with LinkPro." }),
    /* @__PURE__ */ jsx("p", { className: "small my-4", children: "Note: You will be redirected away from LinkPro to log into Shopify. You will need to either already have or create a a Shopify store of your own to use this integration." }),
    /* @__PURE__ */ jsxs("form", { id: "scrollTo", onSubmit: handleSubmit, className: "link_form shopify_domain", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "domain", children: "Enter your .myshopify.com URL to log into your store." }),
      /* @__PURE__ */ jsxs("div", { className: "input_wrap", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "domain",
            placeholder: "your-store-name",
            onChange: (e) => setDomain(e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx("p", { children: ".myshopify.com" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "button_wrap", children: /* @__PURE__ */ jsx("button", { className: "button blue", type: "submit", children: "Login To Shopify" }) }),
      showAddStore && /* @__PURE__ */ jsx("div", { className: "button_wrap mt-3", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "#",
          className: "button transparent gray",
          type: "submit",
          onClick: (e) => {
            e.preventDefault();
            setShowAddStore(false);
          },
          children: "Cancel"
        }
      ) }),
      /* @__PURE__ */ jsx("small", { children: "LinkPro will not receive any sales data. All transactions will occur on your Shopify Store." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "connection_error", children: /* @__PURE__ */ jsx("p", { children: connectionError }) })
  ] });
};
const __vite_glob_0_59 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ShopifyIntegration
}, Symbol.toStringTag, { value: "Module" }));
const MailchimpLists = ({
  currentLink,
  setCurrentLink,
  lists,
  setLists,
  name: name2
}) => {
  const handleChange = (e) => {
    setCurrentLink({
      ...currentLink,
      mailchimp_list_id: e.target.value
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    removeMailchimpConnection().then(
      (data) => {
        if (data.success) {
          setLists([]);
          setCurrentLink({
            ...currentLink,
            active_status: 0
          });
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("label", { htmlFor: "mailchimp_list_id", children: "Mailchimp List" }),
    /* @__PURE__ */ jsxs(
      "select",
      {
        name: name2,
        onChange: (e) => handleChange(e),
        required: true,
        value: currentLink.mailchimp_list_id || void 0,
        children: [
          /* @__PURE__ */ jsx("option", { children: "Select Your List" }),
          !isEmpty(lists) && (lists == null ? void 0 : lists.map((list) => {
            return /* @__PURE__ */ jsx(
              "option",
              {
                value: list.list_id,
                children: list.list_name
              },
              list.list_id
            );
          }))
        ]
      }
    ),
    !isEmpty(lists) && /* @__PURE__ */ jsx("div", { className: "my_row remove_link", children: /* @__PURE__ */ jsx("a", { href: "#", onClick: (e) => handleClick(
      e
    ), children: "Remove Connection" }) })
  ] });
};
const __vite_glob_0_55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MailchimpLists
}, Symbol.toStringTag, { value: "Module" }));
const SingleProduct = ({ product, setSelectedProducts, selectedProducts }) => {
  const [selectedId, setSelectedId] = useState(null);
  const { id, title, product_url, image_url, price } = product;
  useEffect(() => {
    (selectedProducts == null ? void 0 : selectedProducts.length) > 0 && selectedProducts.find(function(e) {
      if (e.id === id) {
        setSelectedId(e.id);
      }
    });
  }, [selectedProducts]);
  const handleOnClick = (e) => {
    e.preventDefault();
    const productID = parseInt(e.target.dataset.id);
    let newProducts = [...selectedProducts];
    const foundProduct = newProducts.find(function(e2) {
      return e2.id === productID;
    });
    if (foundProduct) {
      setSelectedId(null);
      const filteredProducts = newProducts.filter((element) => element.id !== productID);
      newProducts = filteredProducts.map((el, index2) => {
        return {
          ...el,
          position: index2 + 1
        };
      });
    } else {
      setSelectedId(productID);
      const newObject = {
        id: productID,
        title: e.target.dataset.title,
        image_url: e.target.dataset.image,
        product_url: e.target.dataset.url,
        price: e.target.dataset.price,
        position: newProducts.length + 1
      };
      newProducts = newProducts.concat(newObject);
    }
    setSelectedProducts(newProducts);
  };
  const getPosition = (productID) => {
    const product2 = selectedProducts.length > 0 && (selectedProducts == null ? void 0 : selectedProducts.find(function(e) {
      return e.id === productID;
    }));
    return product2.position;
  };
  return /* @__PURE__ */ jsxs("div", { className: "single_product", children: [
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: "#",
        className: selectedId === id ? "selected" : "",
        "data-id": id,
        "data-image": image_url,
        "data-title": title,
        "data-url": product_url,
        "data-price": price,
        onClick: (e) => handleOnClick(e),
        children: [
          /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsx("img", { src: image_url, alt: title }) }),
          /* @__PURE__ */ jsx("h3", { children: title }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("sup", { children: "$" }),
            price
          ] })
        ]
      }
    ),
    selectedId === id && /* @__PURE__ */ jsx("span", { className: "position", children: getPosition(id) })
  ] });
};
const __vite_glob_0_60 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SingleProduct
}, Symbol.toStringTag, { value: "Module" }));
const AllProducts = ({
  selectedProducts,
  setSelectedProducts,
  allProducts,
  setDisplayAllProducts,
  /*handleChange,*/
  setCurrentLink
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    setCurrentLink((prev) => ({
      ...prev,
      shopify_products: selectedProducts
    }));
    setDisplayAllProducts(false);
  };
  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = allProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allProducts.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % allProducts.length;
    setItemOffset(newOffset);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h3", { children: "Select Products to Add to Icon" }),
    /* @__PURE__ */ jsx("small", { children: "(max 6 products per icon)" }),
    /* @__PURE__ */ jsx("div", { className: "products_grid", children: !isEmpty(currentItems) && (currentItems == null ? void 0 : currentItems.map((product, index2) => {
      return /* @__PURE__ */ jsx(
        SingleProduct,
        {
          product,
          setSelectedProducts,
          selectedProducts
        },
        index2
      );
    })) }),
    /* @__PURE__ */ jsx(
      ReactPaginate,
      {
        breakLabel: "...",
        nextLabel: /* @__PURE__ */ jsx(MdKeyboardArrowRight, {}),
        onPageChange: handlePageClick,
        pageRangeDisplayed: 5,
        pageCount,
        previousLabel: /* @__PURE__ */ jsx(MdKeyboardArrowLeft, {}),
        renderOnZeroPageCount: null
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "button_wrap", children: /* @__PURE__ */ jsx(
      "a",
      {
        className: "button blue",
        href: "#",
        onClick: (e) => handleClick(e),
        children: "Add Selected Products"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "button_wrap", children: /* @__PURE__ */ jsx(
      "a",
      {
        className: "button transparent gray",
        href: "#",
        onClick: (e) => {
          e.preventDefault();
          setDisplayAllProducts(false);
        },
        children: "Cancel"
      }
    ) })
  ] });
};
const __vite_glob_0_56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AllProducts
}, Symbol.toStringTag, { value: "Module" }));
const StoreDropdown = ({
  currentLink,
  setCurrentLink,
  setSelectedProducts,
  setShowAddStore,
  shopifyStores,
  storeID
}) => {
  const handleStoreChange = (e) => {
    e.preventDefault();
    setCurrentLink({
      ...currentLink,
      shopify_id: e.target.value,
      shopify_products: null
    });
    setSelectedProducts([]);
  };
  const handleAddStore = (e) => {
    e.preventDefault();
    setShowAddStore(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "my_row relative", children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        className: currentLink.shopify_id || storeID ? "active" : "",
        name: "shopify_store",
        onChange: (e) => handleStoreChange(e),
        onBlur: (e) => HandleBlur(e.target),
        onFocus: (e) => HandleFocus$1(e.target),
        value: currentLink.shopify_id || storeID || void 0,
        children: [
          /* @__PURE__ */ jsx("option", { value: "" }),
          !isEmpty(shopifyStores) && (shopifyStores == null ? void 0 : shopifyStores.map((store) => {
            return /* @__PURE__ */ jsx(
              "option",
              {
                value: store.id,
                children: store.domain
              },
              store.id
            );
          }))
        ]
      }
    ),
    /* @__PURE__ */ jsx("label", { htmlFor: "shopify_store", children: "Shopify Stores" }),
    /* @__PURE__ */ jsx("div", { className: "my_row add_more_link mb-4 mt-3", children: /* @__PURE__ */ jsxs("a", { className: "icon_wrap", href: "#", onClick: (e) => handleAddStore(e), children: [
      /* @__PURE__ */ jsx(ImPlus, {}),
      /* @__PURE__ */ jsx("h3", { children: "Add a Store" })
    ] }) })
  ] });
};
const __vite_glob_0_61 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StoreDropdown
}, Symbol.toStringTag, { value: "Module" }));
const ShopifyAddProducts = ({
  setDisplayAllProducts,
  setAllProducts,
  setShowLoader,
  currentLink,
  storeID
}) => {
  const [error, setError] = useState(null);
  const store = currentLink.shopify_id || storeID || null;
  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => {
        setError(null);
      }, 3e3);
      return () => window.clearTimeout(errorTimeout);
    }
  }, [error]);
  const handleClick = (e) => {
    e.preventDefault();
    if (store) {
      setShowLoader({ show: true, icon: "loading", position: "absolute" });
      getAllProducts(currentLink.shopify_id).then(
        (data) => {
          if (data.success) {
            !isEmpty(data.products) && setAllProducts(data.products);
            setDisplayAllProducts(true);
            setShowLoader({ show: false, icon: "", position: "" });
          }
        }
      );
    } else {
      setError("Please select a Shopify store above to add products");
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("a", { className: "icon_wrap", href: "#", onClick: (e) => handleClick(e), children: [
      /* @__PURE__ */ jsx(ImPlus, {}),
      /* @__PURE__ */ jsx("h3", { children: "Add Products" })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "inline_error_message", children: [
      /* @__PURE__ */ jsx(FaExclamationTriangle, {}),
      /* @__PURE__ */ jsx("p", { children: error })
    ] })
  ] });
};
const __vite_glob_0_58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ShopifyAddProducts
}, Symbol.toStringTag, { value: "Module" }));
const SelectedProducts = ({
  currentLink,
  setDisplayAllProducts,
  setAllProducts,
  setShowLoader,
  storeID
}) => {
  var _a;
  return /* @__PURE__ */ jsxs("div", { className: "my_row", children: [
    /* @__PURE__ */ jsx("label", { children: "Selected Products" }),
    /* @__PURE__ */ jsx("div", { className: "selected_products my_row", children: currentLink.shopify_products ? /* @__PURE__ */ jsx("div", { className: "products_grid", children: (_a = currentLink.shopify_products) == null ? void 0 : _a.map(
      (product) => {
        return /* @__PURE__ */ jsx(
          SingleProduct,
          {
            product
          },
          product.id
        );
      }
    ) }) : /* @__PURE__ */ jsxs("div", { className: "info_message", children: [
      /* @__PURE__ */ jsx("p", { children: "You don't have any products selected." }),
      /* @__PURE__ */ jsx("p", { children: "Click 'Add Products' below to start adding products from your store." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "add_more_link mb-4 mt-3", children: /* @__PURE__ */ jsx(
      ShopifyAddProducts,
      {
        setDisplayAllProducts,
        setAllProducts,
        setShowLoader,
        currentLink,
        storeID
      }
    ) })
  ] });
};
const __vite_glob_0_57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SelectedProducts
}, Symbol.toStringTag, { value: "Module" }));
const IntegrationForm = ({
  setAccordionValue,
  accordionValue,
  editID,
  setShowLinkForm,
  setEditID,
  setOptionText,
  setShowMessageAlertPopup,
  setShowLoader,
  setIntegrationType,
  integrationType,
  connectionError,
  shopifyStores,
  setShopifyStores,
  redirectedType,
  storeID
}) => {
  const [customIconArray, setCustomIconArray] = useState([]);
  const { userLinks: userLinks2, dispatch } = useContext(UserLinksContext);
  const { pageSettings } = useContext(PageContext);
  const iconRef = createRef(null);
  const [completedIconCrop, setCompletedIconCrop] = useState(null);
  const [iconSelected, setIconSelected] = useState(false);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = iconRef;
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 });
  const [customIcon, setCustomIcon] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1);
  const [lists, setLists] = useState([]);
  const [charactersLeft, setCharactersLeft] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [displayAllProducts, setDisplayAllProducts] = useState(false);
  const [showAddStore, setShowAddStore] = useState(false);
  const [currentLink, setCurrentLink] = useState(
    userLinks2.find(function(e) {
      return e.id === editID;
    }) || {
      icon: null,
      name: null,
      url: null,
      email: null,
      phone: null,
      mailchimp_list_id: null,
      shopify_products: null,
      shopify_id: null,
      type: null
    }
  );
  useDebounceEffect(
    async () => {
      if ((completedIconCrop == null ? void 0 : completedIconCrop.width) && (completedIconCrop == null ? void 0 : completedIconCrop.height) && imgRef.current && previewCanvasRef.current) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedIconCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedIconCrop, scale, rotate]
  );
  useEffect(() => {
    if (currentLink.shopify_products && currentLink.shopify_id) {
      setSelectedProducts(currentLink.shopify_products);
      setIntegrationType("shopify");
    }
    if (currentLink.mailchimp_list_id) {
      setIntegrationType("mailchimp");
    }
  }, []);
  useEffect(() => {
    if (currentLink.name) {
      setCharactersLeft(11 - currentLink.name.length);
    } else {
      setCharactersLeft(11);
    }
  }, [charactersLeft]);
  useEffect(() => {
    if (!customIcon) {
      return;
    }
    const objectUrl = URL.createObjectURL(customIcon);
    return () => URL.revokeObjectURL(objectUrl);
  }, [customIcon]);
  const selectCustomIcon = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }
    setCrop(void 0);
    setIconSelected(true);
    createImage(files[0], setUpImg);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkForMailchimpForm() === void 0 || !checkForMailchimpForm() || integrationType === "shopify") {
      if (iconSelected) {
        const image = getFileToUpload(previewCanvasRef == null ? void 0 : previewCanvasRef.current);
        image.then((value) => {
          submitWithCustomIcon(value);
        });
      } else {
        let URL2 = currentLink.url;
        let packets;
        switch (integrationType) {
          case "mailchimp":
            packets = {
              name: currentLink.name,
              mailchimp_list_id: currentLink.mailchimp_list_id,
              icon: currentLink.icon,
              page_id: pageSettings["id"],
              type: "mailchimp"
            };
            break;
          case "shopify":
            packets = {
              name: currentLink.name,
              shopify_products: currentLink.shopify_products,
              shopify_id: currentLink.shopify_id,
              icon: currentLink.icon,
              page_id: pageSettings["id"],
              type: "shopify"
            };
            break;
        }
        const func = editID ? updateLink(packets, editID) : addLink(packets);
        func.then((data) => {
          if (data.success) {
            if (editID) {
              dispatch({
                type: LINKS_ACTIONS.UPDATE_LINK,
                payload: {
                  editID,
                  currentLink,
                  url: URL2,
                  iconPath: currentLink.icon
                }
              });
            } else {
              let newLinks = [...userLinks2];
              const newLinkObject = {
                id: data.link_id,
                name: currentLink.name,
                url: URL2,
                email: currentLink.email,
                phone: currentLink.phone,
                type: currentLink.type,
                mailchimp_list_id: currentLink.mailchimp_list_id,
                shopify_products: currentLink.shopify_products,
                shopify_id: currentLink.shopify_id,
                icon: currentLink.icon,
                position: data.position,
                active_status: true
              };
              dispatch({
                type: LINKS_ACTIONS.SET_LINKS,
                payload: {
                  links: newLinks.concat(
                    newLinkObject
                  )
                }
              });
            }
            setCurrentLink({});
            setAccordionValue(null);
            setShowLinkForm(false);
            setIntegrationType(null);
            setEditID(null);
          }
        });
      }
    } else {
      setShowMessageAlertPopup(true);
      setOptionText("Only 1 Mailchimp subscribe form is allowed per page.");
    }
  };
  const submitWithCustomIcon = (image) => {
    if (currentLink.name && (currentLink.mailchimp_list_id || currentLink.shopify_products)) {
      setShowLoader({ show: true, icon: "upload", position: "fixed" });
      window.Vapor.store(
        image,
        {
          visibility: "public-read"
        },
        {
          progress: (progress) => {
            (void 0).uploadProgress = Math.round(progress * 100);
          }
        }
      ).then((response) => {
        let URL2 = currentLink.url;
        if (URL2) {
          URL2 = checkURL(currentLink.url, null, true);
        }
        let packets;
        switch (integrationType) {
          case "mailchimp":
            packets = {
              name: currentLink.name,
              mailchimp_list_id: currentLink.mailchimp_list_id,
              icon: response.key,
              page_id: pageSettings["id"],
              ext: response.extension,
              type: "mailchimp"
            };
            break;
          case "shopify":
            packets = {
              name: currentLink.name,
              shopify_products: currentLink.shopify_products,
              shopify_id: currentLink.shopify_id,
              icon: response.key,
              page_id: pageSettings["id"],
              ext: response.extension,
              type: "shopify"
            };
            break;
        }
        const func = editID ? updateLink(packets, editID) : addLink(packets);
        func.then((data) => {
          setShowLoader({ show: false, icon: null });
          if (data.success) {
            const iconPath = data.iconPath;
            if (editID) {
              dispatch({
                type: LINKS_ACTIONS.UPDATE_LINK,
                payload: {
                  editID,
                  currentLink,
                  url: URL2,
                  iconPath
                }
              });
            } else {
              let newLinks = [...userLinks2];
              const newLinkObject = {
                id: data.link_id,
                name: currentLink.name,
                url: URL2,
                email: currentLink.email,
                phone: currentLink.phone,
                type: currentLink.type,
                mailchimp_list_id: currentLink.mailchimp_list_id,
                shopify_products: currentLink.shopify_products,
                shopify_id: currentLink.shopify_id,
                icon: iconPath,
                position: data.position,
                active_status: true
              };
              dispatch({
                type: LINKS_ACTIONS.SET_LINKS,
                payload: {
                  links: newLinks.concat(newLinkObject)
                }
              });
            }
            setCustomIconArray((customIconArray2) => [
              ...customIconArray2,
              iconPath
            ]);
            setShowLinkForm(false);
            setAccordionValue(null);
            setEditID(null);
            setIntegrationType(null);
            setCurrentLink({
              icon: null,
              name: null,
              url: null,
              email: null,
              phone: null,
              mailchimp_list_id: null,
              shopify_products: null,
              type: null
            });
          }
        });
      }).catch((error) => {
        console.error(error);
      });
    } else {
      EventBus.dispatch("error", { message: "Icon Destination and Name is Required" });
    }
  };
  const handleLinkName = useCallback(
    (e) => {
      let value = e.target.value;
      setCharactersLeft(11 - value.length);
      setCurrentLink(() => ({
        ...currentLink,
        name: value
      }));
    }
  );
  const checkForMailchimpForm = () => {
    const link = userLinks2.find(function(e) {
      return e.mailchimp_list_id;
    });
    if ((link == null ? void 0 : link.id) === editID) {
      return false;
    }
    return link;
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setEditID(null);
    setShowLinkForm(false);
    setIntegrationType(null);
    setAccordionValue(null);
    setCompletedIconCrop({});
    setCustomIcon(null);
    setIconSelected(false);
    setUpImg(null);
    document.getElementById("left_col_wrap").style.minHeight = "unset";
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      IntegrationType,
      {
        integrationType,
        setIntegrationType,
        setShowLoader,
        setLists,
        setShopifyStores,
        redirectedType,
        setShowAddStore
      }
    ),
    integrationType === "mailchimp" && isEmpty(lists) && /* @__PURE__ */ jsx(
      MailchimpIntegration,
      {
        connectionError,
        integrationType,
        editID
      }
    ),
    (integrationType === "shopify" && isEmpty(shopifyStores) || showAddStore) && /* @__PURE__ */ jsx(
      ShopifyIntegration,
      {
        connectionError,
        integrationType,
        editID,
        showAddStore,
        setShowAddStore
      }
    ),
    integrationType === "mailchimp" && !isEmpty(lists) || integrationType === "shopify" && !isEmpty(shopifyStores) && !showAddStore ? /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "link_form", children: [
      /* @__PURE__ */ jsxs("div", { className: "my_row", children: [
        iconSelected && /* @__PURE__ */ jsxs("div", { className: "crop_section", children: [
          /* @__PURE__ */ jsx("p", { children: "Crop Icon" }),
          /* @__PURE__ */ jsx(
            CropTools,
            {
              rotate,
              setRotate,
              scale,
              setScale
            }
          ),
          /* @__PURE__ */ jsx(
            ReactCrop$1,
            {
              crop,
              onChange: (_2, percentCrop) => setCrop(percentCrop),
              onComplete: (c) => setCompletedIconCrop(c),
              aspect,
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  onLoad: (e) => onImageLoad(e, aspect, setCrop),
                  src: upImg,
                  ref: imgRef,
                  style: { transform: `scale(${scale}) rotate(${rotate}deg)` },
                  alt: "Crop Me"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "icon_col", children: [
            /* @__PURE__ */ jsx("p", { children: "Icon Preview" }),
            /* @__PURE__ */ jsx(
              "canvas",
              {
                ref: previewCanvasRef,
                style: {
                  backgroundSize: `cover`,
                  backgroundRepeat: `no-repeat`,
                  width: iconSelected ? `100%` : 0,
                  height: iconSelected ? `100%` : 0,
                  borderRadius: `20px`
                }
              }
            )
          ] })
        ] }),
        !displayAllProducts && /* @__PURE__ */ jsx("div", { className: "icon_row", children: /* @__PURE__ */ jsxs("div", { className: "icon_box", children: [
          /* @__PURE__ */ jsxs("div", { className: "uploader", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "custom_icon_upload", className: "custom text-uppercase button blue", children: "Upload Image" }),
            /* @__PURE__ */ jsx("input", { id: "custom_icon_upload", type: "file", className: "custom", onChange: selectCustomIcon, accept: "image/png, image/jpeg, image/jpg, image/gif" }),
            /* @__PURE__ */ jsx("div", { className: "my_row info_text file_types text-center mb-2", children: /* @__PURE__ */ jsxs("p", { className: "m-0 char_count w-100 ", children: [
              "Allowed File Types: ",
              /* @__PURE__ */ jsx("span", { children: "png, jpg, jpeg, gif" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(
            IconList,
            {
              currentLink,
              setCurrentLink,
              accordionValue,
              setCharactersLeft,
              integrationType,
              editID,
              customIconArray,
              setCustomIconArray
            }
          )
        ] }) })
      ] }),
      !displayAllProducts && /* @__PURE__ */ jsxs("div", { className: "my_row mt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "input_wrap", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: currentLink.name !== "" ? "active" : "",
              name: "name",
              type: "text",
              value: currentLink.name || "",
              onChange: (e) => handleLinkName(e),
              onFocus: (e) => HandleFocus$1(e.target),
              onBlur: (e) => HandleBlur(e.target)
            }
          ),
          /* @__PURE__ */ jsx("label", { children: "Link Name" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "my_row info_text title", children: [
          /* @__PURE__ */ jsx("p", { className: "char_max", children: "Max 11 Characters Shown" }),
          /* @__PURE__ */ jsx("p", { className: "char_count", children: charactersLeft < 0 ? /* @__PURE__ */ jsx("span", { className: "over", children: "Only 11 Characters Will Be Shown" }) : "Characters Left: " + charactersLeft })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my_row my-4", children: [
        integrationType === "mailchimp" ? /* @__PURE__ */ jsx(
          MailchimpLists,
          {
            lists,
            setLists,
            currentLink,
            setCurrentLink,
            setIntegrationType
          }
        ) : "",
        integrationType === "shopify" && /* @__PURE__ */ jsx("div", { className: "my_row products_wrap", children: displayAllProducts ? /* @__PURE__ */ jsx(
          AllProducts,
          {
            selectedProducts,
            setSelectedProducts,
            allProducts,
            setDisplayAllProducts,
            setCurrentLink,
            name
          }
        ) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            StoreDropdown,
            {
              currentLink,
              setCurrentLink,
              setSelectedProducts,
              setShowAddStore,
              shopifyStores,
              storeID
            }
          ),
          /* @__PURE__ */ jsx(
            SelectedProducts,
            {
              currentLink,
              setDisplayAllProducts,
              setAllProducts,
              setShowLoader,
              storeID
            }
          )
        ] }) })
      ] }),
      !displayAllProducts && /* @__PURE__ */ jsxs("div", { className: "my_row button_row", children: [
        /* @__PURE__ */ jsx("button", { className: "button green", type: "submit", children: "Save" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "button transparent gray", onClick: (e) => handleCancel(e), children: "Cancel" }),
        /* @__PURE__ */ jsx("a", { className: "help_link", href: "mailto:help@link.pro", children: "Need Help?" })
      ] })
    ] }) : ""
  ] });
};
const __vite_glob_0_52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IntegrationForm
}, Symbol.toStringTag, { value: "Module" }));
const UserLinksContext = createContext();
const FolderLinksContext = createContext();
const PageContext = createContext();
function Dashboard({
  message = null,
  userData
}) {
  const { links, page, userPages, allPageNames, userSub, affStatus } = userData;
  const [userLinks2, dispatch] = useReducer(reducer, links);
  const [folderLinks, dispatchFolderLinks] = useReducer(folderLinksReducer, []);
  const [pageSettings, setPageSettings] = useState(page);
  const [infoText, setInfoText] = useState({ section: "", text: [] });
  const [infoTextOpen, setInfoTextOpen] = useState(false);
  const [infoLocation, setInfoLocation] = useState({});
  const [infoClicked, setInfoClicked] = useState(null);
  const [triangleRef, setTriangleRef] = useState(null);
  const [allUserPages, setAllUserPages] = useState(userPages);
  const [editFolderID, setEditFolderID] = useState(null);
  const [editID, setEditID] = useState(null);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [accordionValue, setAccordionValue] = useState(null);
  const [inputType, setInputType] = useState(null);
  const [integrationType, setIntegrationType] = useState(null);
  const [storeID, setStoreID] = useState(null);
  const [shopifyStores, setShopifyStores] = useState([]);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showMessageAlertPopup, setShowMessageAlertPopup] = useState(false);
  const [showConfirmFolderDelete, setShowConfirmFolderDelete] = useState(false);
  const [optionText, setOptionText] = useState("");
  const nodesRef = useRef({});
  const [completedCrop, setCompletedCrop] = useState({});
  const pageHeaderRef = useRef();
  const leftColWrap = useRef();
  const subStatus = useMemo(
    () => {
      return checkSubStatus(userSub);
    },
    []
  );
  const [showLoader, setShowLoader] = useState({
    show: false,
    icon: "",
    position: ""
  });
  const [row, setRow] = useState(null);
  const [value, setValue] = useState(null);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  useEffect(() => {
    var _a, _b;
    const data = getUrlParams();
    message = (_a = data.urlParams) == null ? void 0 : _a.get("message");
    if (message) {
      EventBus.dispatch("success", { message });
      (_b = data.urlParams) == null ? void 0 : _b.delete("message");
      window.history.pushState({}, document.title, data.href);
      localStorage.clear();
      return () => EventBus.remove("success");
    }
  }, []);
  useEffect(() => {
    previewButtonRequest(setShowPreviewButton);
  }, []);
  useEffect(() => {
    function setPreviewButton() {
      previewButtonRequest(setShowPreviewButton);
    }
    window.addEventListener("resize", setPreviewButton);
    return () => {
      window.removeEventListener("resize", setPreviewButton);
    };
  }, []);
  const [redirectedType, setRedirectedType] = useState(null);
  useEffect(() => {
    var _a, _b, _c;
    const data = getUrlParams();
    const redirected = (_a = data.urlParams) == null ? void 0 : _a.get("redirected");
    const storeID2 = (_b = data.urlParams) == null ? void 0 : _b.get("store");
    const error = (_c = data.urlParams) == null ? void 0 : _c.get("connection_error");
    if (redirected && redirected !== "") {
      setInputType(localStorage.getItem("inputType") || null);
      setAccordionValue("integration");
      setRedirectedType(redirected);
      setIntegrationType(localStorage.getItem("integrationType") || null);
      setEditID(JSON.parse(localStorage.getItem("editID")) || null);
      setShowLinkForm(JSON.parse(localStorage.getItem("showLinkForm")) || false);
      if (storeID2 && storeID2 !== "") {
        setStoreID(storeID2);
      }
      const scrollTimeout = setTimeout(function() {
        document.querySelector("#scrollTo").scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
        data.urlParams.delete("redirected");
        data.urlParams.delete("store");
        data.urlParams.delete("connection_error");
        window.history.pushState({}, document.title, data.href);
        localStorage.clear();
      }, 800);
      if (error && error !== "") {
        setConnectionError(error);
      }
      return () => window.clearTimeout(scrollTimeout);
    }
  }, []);
  const getUrlParams = () => {
    const href = window.location.href.split("?")[0];
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return {
      href,
      urlParams
    };
  };
  const myErrorHandler = (Error2, { componentStack: string }) => {
    if (String(Error2).includes("Invalid attempt to destructure non-iterable instance")) {
      const packets = {
        userLinks: userLinks2
      };
      updateLinksPositions(packets).then(() => {
        getAllLinks(pageSettings["id"]).then((data) => {
          if (data["success"]) {
            dispatch({ type: LINKS_ACTIONS.SET_LINKS, payload: { links: data["userLinks"] } });
          }
        });
      });
    }
  };
  function errorFallback({ error, resetErrorBoundary }) {
    return /* @__PURE__ */ jsxs("div", { role: "alert", className: "my_row text-center", children: [
      /* @__PURE__ */ jsx("p", { children: "Something went wrong:" }),
      /* @__PURE__ */ jsx("button", { className: "button red", onClick: (e) => {
        window.location.reload();
      }, children: "Refresh Page" })
    ] });
  }
  const handleDisabledClick = (e) => {
    const type = e.target.dataset.type;
    if (!subStatus) {
      let text2;
      if (type === "custom") {
        text2 = "add custom icons";
      } else if (type === "integration") {
        text2 = "add an integration";
      } else if (type === "offer") {
        text2 = "earn money from an affiliate offer";
      }
      setShowUpgradePopup(true);
      setOptionText(text2);
    }
  };
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "page_title", children: "Pages" }),
      /* @__PURE__ */ jsx("section", { className: "card edit_page", children: /* @__PURE__ */ jsx("div", { id: "links_page", children: /* @__PURE__ */ jsxs("div", { className: "my_row page_wrap", children: [
        showLoader.show && showLoader.position === "fixed" && /* @__PURE__ */ jsx(
          Loader,
          {
            showLoader
          }
        ),
        /* @__PURE__ */ jsx(SetFlash, {}),
        showUpgradePopup && /* @__PURE__ */ jsx(
          UpgradePopup,
          {
            optionText,
            showUpgradePopup,
            setShowUpgradePopup
          }
        ),
        showMessageAlertPopup && /* @__PURE__ */ jsx(
          MessageAlertPopup,
          {
            optionText,
            showMessageAlertPopup,
            setShowMessageAlertPopup
          }
        ),
        /* @__PURE__ */ jsx(UserLinksContext.Provider, { value: { userLinks: userLinks2, dispatch }, children: /* @__PURE__ */ jsxs(FolderLinksContext.Provider, { value: { folderLinks, dispatchFolderLinks }, children: [
          showConfirmPopup && /* @__PURE__ */ jsx(
            ConfirmPopup,
            {
              editID,
              setEditID,
              showConfirmPopup,
              setShowConfirmPopup,
              folderID: editFolderID,
              setInputType,
              setIntegrationType,
              setAccordionValue
            }
          ),
          showConfirmFolderDelete && /* @__PURE__ */ jsx(
            ConfirmFolderDelete,
            {
              showConfirmFolderDelete,
              setShowConfirmFolderDelete,
              folderID: editFolderID,
              setEditFolderID,
              setAccordionValue
            }
          ),
          /* @__PURE__ */ jsx(PageContext.Provider, { value: {
            pageSettings,
            setPageSettings
          }, children: /* @__PURE__ */ jsxs(ToolTipContextProvider, { value: {
            infoText,
            setInfoText,
            infoTextOpen,
            setInfoTextOpen,
            infoLocation,
            setInfoLocation,
            infoClicked,
            setInfoClicked,
            setTriangleRef,
            triangleRef
          }, children: [
            /* @__PURE__ */ jsxs("div", { className: "left_column", children: [
              /* @__PURE__ */ jsx(
                PageNav,
                {
                  allUserPages,
                  setAllUserPages,
                  userSub,
                  subStatus,
                  setShowUpgradePopup,
                  setOptionText,
                  pageNames: allPageNames
                }
              ),
              /* @__PURE__ */ jsxs("div", { ref: leftColWrap, className: "content_wrap my_row", id: "left_col_wrap", children: [
                /* @__PURE__ */ jsxs("div", { className: "top_section", children: [
                  /* @__PURE__ */ jsx(
                    PageName,
                    {
                      pageNames: allPageNames
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    PageHeader,
                    {
                      ref: nodesRef,
                      completedCrop,
                      setCompletedCrop,
                      setShowLoader,
                      elementName: "header_img"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    PageProfile,
                    {
                      ref: nodesRef,
                      completedCrop,
                      setCompletedCrop,
                      setShowLoader,
                      elementName: "profile_img"
                    }
                  ),
                  /* @__PURE__ */ jsx(PageTitle, {}),
                  /* @__PURE__ */ jsx(PageBio, {}),
                  /* @__PURE__ */ jsx(
                    PageHeaderLayout,
                    {
                      pageHeaderRef
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    InfoText,
                    {
                      divRef: leftColWrap
                    }
                  ),
                  showPreviewButton && /* @__PURE__ */ jsx(PreviewButton, { setShowPreview }),
                  userSub && !subStatus && /* @__PURE__ */ jsx(DowngradeAlert, {})
                ] }),
                /* @__PURE__ */ jsx("div", { className: "my_row view_live_link link_row", children: /* @__PURE__ */ jsx(LivePageButton, { pageName: pageSettings["name"] }) }),
                editID || showLinkForm || editFolderID ? /* @__PURE__ */ jsxs("div", { className: "my_row icon_links", id: "scrollTo", children: [
                  /* @__PURE__ */ jsxs("p", { className: "form_title", children: [
                    editID || editFolderID && !showLinkForm ? "Editing " : "",
                    showLinkForm ? "Adding " : "",
                    editFolderID && !editID && !showLinkForm ? "Folder" : "Icon"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "links_row", children: [
                    /* @__PURE__ */ jsx(
                      FormBreadcrumbs,
                      {
                        setEditFolderID,
                        setShowLinkForm,
                        folderID: editFolderID,
                        setAccordionValue,
                        editID,
                        setEditID,
                        setIntegrationType,
                        setInputType,
                        showLinkForm
                      }
                    ),
                    (editID || editFolderID && !showLinkForm) && /* @__PURE__ */ jsx("div", { className: "delete_icon", children: /* @__PURE__ */ jsx(
                      DeleteIcon,
                      {
                        setShowConfirmFolderDelete,
                        setShowConfirmPopup,
                        editFolderID,
                        editID,
                        setAccordionValue
                      }
                    ) })
                  ] }),
                  editFolderID && !editID ? /* @__PURE__ */ jsx("div", { className: "folder_name my_row", children: /* @__PURE__ */ jsx(
                    FolderNameInput,
                    {
                      folderID: editFolderID
                    }
                  ) }) : ""
                ] }) : "",
                !editID && !editFolderID && !showLinkForm ? /* @__PURE__ */ jsxs("div", { className: "my_row link_row", children: [
                  /* @__PURE__ */ jsx("div", { className: "add_more_link", children: /* @__PURE__ */ jsx(
                    AddLink,
                    {
                      setShowLinkForm,
                      subStatus,
                      setShowUpgradePopup,
                      setOptionText
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "add_more_link", children: /* @__PURE__ */ jsx(
                    AddFolder,
                    {
                      subStatus,
                      setShowUpgradePopup,
                      setOptionText,
                      setEditFolderID
                    }
                  ) })
                ] }) : editFolderID && !editID && !showLinkForm ? /* @__PURE__ */ jsx("div", { className: "my_row link_row", children: /* @__PURE__ */ jsx("div", { className: "add_more_link", children: /* @__PURE__ */ jsx(
                  AddLink,
                  {
                    setShowLinkForm,
                    subStatus,
                    setShowUpgradePopup,
                    setOptionText
                  }
                ) }) }) : "",
                (showLinkForm || editID) && /* @__PURE__ */ jsx("div", { className: "edit_form link my_row", children: /* @__PURE__ */ jsxs("div", { className: "my_row tab_content_wrap", children: [
                  /* @__PURE__ */ jsxs("div", { className: `accordion_row my_row`, children: [
                    /* @__PURE__ */ jsx(
                      AccordionLink,
                      {
                        subStatus,
                        accordionValue,
                        setAccordionValue,
                        linkText: "Standard Icon",
                        type: "standard"
                      }
                    ),
                    accordionValue === "standard" && /* @__PURE__ */ jsx("div", { className: `inner_wrap ${accordionValue === "standard" && "open"}`, children: /* @__PURE__ */ jsx(
                      StandardForm,
                      {
                        setAccordionValue,
                        accordionValue,
                        inputType,
                        setInputType,
                        editID,
                        subStatus,
                        setShowLinkForm,
                        setEditID,
                        setShowUpgradePopup,
                        setOptionText,
                        folderID: editFolderID
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      "data-type": "offer",
                      className: `accordion_row my_row`,
                      children: [
                        /* @__PURE__ */ jsx(
                          AccordionLink,
                          {
                            accordionValue,
                            setAccordionValue,
                            linkText: "Affiliate Offers",
                            type: "offer"
                          }
                        ),
                        accordionValue === "offer" && /* @__PURE__ */ jsx("div", { className: `inner_wrap ${accordionValue} ${accordionValue === "offer" && "open"}`, children: /* @__PURE__ */ jsx(
                          StandardForm,
                          {
                            accordionValue,
                            setAccordionValue,
                            inputType,
                            setInputType,
                            editID,
                            subStatus,
                            setShowLinkForm,
                            setEditID,
                            setShowUpgradePopup,
                            setOptionText,
                            folderID: editFolderID,
                            affStatus
                          }
                        ) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      "data-type": "custom",
                      className: `accordion_row my_row ${!subStatus ? "disabled" : ""}`,
                      onClick: (e) => handleDisabledClick(e),
                      children: [
                        /* @__PURE__ */ jsx(
                          AccordionLink,
                          {
                            accordionValue,
                            setAccordionValue,
                            linkText: "Custom Icon",
                            type: "custom"
                          }
                        ),
                        accordionValue === "custom" && /* @__PURE__ */ jsx("div", { className: `inner_wrap ${accordionValue === "custom" && "open"}`, children: /* @__PURE__ */ jsx(
                          CustomForm,
                          {
                            accordionValue,
                            setAccordionValue,
                            inputType,
                            setInputType,
                            editID,
                            setShowLinkForm,
                            setEditID,
                            setShowLoader,
                            folderID: editFolderID
                          }
                        ) })
                      ]
                    }
                  ),
                  !editFolderID && /* @__PURE__ */ jsxs(
                    "div",
                    {
                      "data-type": "integration",
                      className: `accordion_row my_row ${!subStatus ? "disabled" : ""}`,
                      onClick: (e) => handleDisabledClick(e),
                      children: [
                        /* @__PURE__ */ jsx(
                          AccordionLink,
                          {
                            accordionValue,
                            setAccordionValue,
                            linkText: "Integrations",
                            type: "integration"
                          }
                        ),
                        accordionValue === "integration" && /* @__PURE__ */ jsx("div", { className: `inner_wrap ${accordionValue === "integration" && "open"}`, children: /* @__PURE__ */ jsx(
                          IntegrationForm,
                          {
                            accordionValue,
                            setAccordionValue,
                            editID,
                            setShowLinkForm,
                            setEditID,
                            setShowMessageAlertPopup,
                            setOptionText,
                            setShowLoader,
                            setIntegrationType,
                            integrationType,
                            connectionError,
                            shopifyStores,
                            setShopifyStores,
                            redirectedType,
                            storeID
                          }
                        ) })
                      ]
                    }
                  )
                ] }) }),
                editFolderID && !editID && !showLinkForm ? /* @__PURE__ */ jsx(ErrorBoundary, { FallbackComponent: errorFallback, onError: myErrorHandler, children: /* @__PURE__ */ jsx(
                  FolderLinks,
                  {
                    folderID: editFolderID,
                    subStatus,
                    setEditID,
                    setAccordionValue
                  }
                ) }) : !showLinkForm && !editID && !editFolderID && /* @__PURE__ */ jsx(ErrorBoundary, { FallbackComponent: errorFallback, onError: myErrorHandler, children: /* @__PURE__ */ jsx(
                  Links,
                  {
                    setEditID,
                    setEditFolderID,
                    subStatus,
                    setRow,
                    setValue,
                    setShowUpgradePopup,
                    setOptionText,
                    setAccordionValue
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: `right_column links_col preview ${showPreview ? "show" : ""}`, children: /* @__PURE__ */ jsx(
              Preview$1,
              {
                nodesRef,
                completedCrop,
                row,
                setRow,
                value,
                setValue,
                subStatus,
                pageHeaderRef,
                setShowPreview
              }
            ) })
          ] }) })
        ] }) })
      ] }) }) })
    ] })
  ] });
}
const __vite_glob_0_81 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FolderLinksContext,
  PageContext,
  UserLinksContext,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
const AddFolder = ({
  setShowUpgradePopup,
  setOptionText,
  setEditFolderID,
  subStatus
}) => {
  const { pageSettings } = useContext(PageContext);
  const { userLinks: userLinks2, dispatch } = useContext(UserLinksContext);
  const { dispatchFolderLinks } = useContext(FolderLinksContext);
  const handleClick = (e) => {
    e.preventDefault();
    if (subStatus) {
      const packets = {
        pageID: pageSettings["id"]
      };
      addFolder(packets).then((data) => {
        if (data.success) {
          let newLinks = [...userLinks2];
          const newFolderObject = {
            id: data.id,
            name: null,
            type: "folder",
            position: data.position,
            links: []
          };
          dispatch({ type: LINKS_ACTIONS.SET_LINKS, payload: { links: newLinks.concat(newFolderObject) } });
          fetchFolderLinks(data.id);
        }
      });
    } else {
      setShowUpgradePopup(true);
      setOptionText("add folders");
    }
  };
  const fetchFolderLinks = async (folderID) => {
    const url = "folder/links/" + folderID;
    const response = await fetch(url);
    const folderLinks = await response.json();
    dispatchFolderLinks({ type: FOLDER_LINKS_ACTIONS.SET_FOLDER_LINKS, payload: { links: folderLinks["links"] } });
    setEditFolderID(folderID);
    setTimeout(function() {
      document.querySelector("#scrollTo").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 800);
  };
  return /* @__PURE__ */ jsxs("a", { href: "", className: "icon_wrap", onClick: handleClick, children: [
    /* @__PURE__ */ jsx(ImPlus, {}),
    /* @__PURE__ */ jsx("h3", { children: "Add Folder" })
  ] });
};
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AddFolder
}, Symbol.toStringTag, { value: "Module" }));
const userLinks = user.links;
const myLinksArray = userLinks == null ? void 0 : userLinks.map(({
  id,
  type,
  name: name2,
  icon,
  url,
  email,
  phone,
  mailchimp_list_id,
  shopify_products,
  shopify_id,
  active_status,
  position,
  links
}) => ({
  id,
  name: name2,
  icon,
  url,
  email,
  phone,
  mailchimp_list_id,
  shopify_products,
  shopify_id,
  active_status,
  position,
  type,
  links
}));
const __vite_glob_0_65 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: myLinksArray
}, Symbol.toStringTag, { value: "Module" }));
function ErrorPage({ status }) {
  const title = {
    503: "503: Service Unavailable",
    500: "500: Server Error",
    404: "404: Page Not Found",
    403: "403: Forbidden"
  }[status];
  const description = {
    503: "Sorry, we are doing some maintenance. Please check back soon.",
    500: "Whoops, something went wrong on our servers.",
    404: "Sorry, the page you are looking for could not be found.",
    403: "Sorry, you are forbidden from accessing this page."
  }[status];
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "h-96 flex flex-col justify-top w-full text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl mb-5", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-lg mb-10", children: description }),
      /* @__PURE__ */ jsx("a", { className: "blue", href: route("login"), children: "Return To Home Page" })
    ] }) })
  ] });
}
const __vite_glob_0_82 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ErrorPage
}, Symbol.toStringTag, { value: "Module" }));
const PageLayout = () => {
  return /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "utility_page mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "page_title !mb-10", children: "How It Works" }),
    /* @__PURE__ */ jsxs("div", { className: "row flex flex-col-reverse md:flex-row gap-5", children: [
      /* @__PURE__ */ jsx("div", { className: "column w-full", children: /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/how-it-works-step-1.jpg"), alt: "" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "column w-full flex flex-col justify-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "column_title", children: "Step 1" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Get started by creating your free account with your ",
          /* @__PURE__ */ jsx("strong", { children: "email address and password." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "row flex flex-col md:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "column w-full flex flex-col justify-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "column_title", children: "Step 2" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Choose a link name so followers can find all your ",
          /* @__PURE__ */ jsx("strong", { children: "socials, products, and info in one place." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "column w-full", children: /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/how-it-works-step-2.jpg"), alt: "" }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "row flex flex-col-reverse md:flex-row", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full column", children: /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/how-it-works-step-3.jpg"), alt: "" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "column w-full flex flex-col justify-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "column_title", children: "Step 3" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Keep a free account forever or ",
          /* @__PURE__ */ jsx("strong", { children: "upgrade for advanced features with Pro," }),
          " Premium or Custom."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "row flex flex-col md:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "column w-full flex flex-col justify-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "column_title", children: "Step 4" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Build your page with images, text, icons, and links. ",
          /* @__PURE__ */ jsx("strong", { children: "Post your link everywhere!" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "column w-full", children: /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/how-it-works-step-4.png"), alt: "" }) }) })
    ] })
  ] }) });
};
const __vite_glob_0_84 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PageLayout
}, Symbol.toStringTag, { value: "Module" }));
function Contact({ auth }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Contact Us" }),
    isEmpty(auth.user.userInfo) ? /* @__PURE__ */ jsx(Guest, { children: /* @__PURE__ */ jsx(PageLayout, {}) }) : /* @__PURE__ */ jsx(Authenticated, { children: /* @__PURE__ */ jsx(PageLayout, {}) })
  ] });
}
const __vite_glob_0_83 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Contact
}, Symbol.toStringTag, { value: "Module" }));
const AddSectionLink = ({
  sections,
  setSections,
  pageID,
  setOpenIndex,
  type
}) => {
  const handleOnClick = (e) => {
    e.preventDefault();
    const packets = {
      type
    };
    addSection(packets, pageID).then((response) => {
      if (response.success) {
        setSections([
          ...sections,
          response.section
        ]);
        const newIndex = sections.length;
        setOpenIndex((prev) => [
          ...prev,
          newIndex
        ]);
        setTimeout(function() {
          document.querySelector(".sections_wrap .section_row:last-child").scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
        }, 800);
      }
    });
  };
  return /* @__PURE__ */ jsxs("a", { className: "icon_wrap", href: "#", onClick: (e) => handleOnClick(e), children: [
    /* @__PURE__ */ jsx(ImPlus, {}),
    /* @__PURE__ */ jsxs("h3", { children: [
      "Add ",
      capitalize(type),
      " Section"
    ] })
  ] });
};
const __vite_glob_0_85 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AddSectionLink
}, Symbol.toStringTag, { value: "Module" }));
const ColorPicker = ({
  label,
  elementName,
  pageData = null,
  dispatch = null,
  sections = null,
  setSections = null,
  currentSection = null
}) => {
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "",
    g: "",
    b: "",
    a: "0"
  });
  const { r, g, b, a } = sketchPickerColor;
  const [showPicker, setShowPicker] = useState(false);
  const [pickerBg, setPickerBg] = useState({});
  const [colorValues, setColorValues] = useState({
    previous: null,
    current: null
  });
  useEffect(() => {
    setPickerBg({ background: `rgba(${r} , ${g} , ${b} , ${a})` });
  }, [sketchPickerColor]);
  useEffect(() => {
    if (currentSection) {
      let element = elementName.split(/(\d+)/);
      element = element[2].replace("_", "");
      let color;
      if (element === "text_color" && !currentSection[element]) {
        color = "rgba(0,0,0,1)";
      } else if (element === "bg_color" && !currentSection[element]) {
        color = "rgba(255,255,255,1)";
      } else {
        color = currentSection[element];
      }
      setPickerBg({ background: color });
      setColorValues((prev) => ({
        ...prev,
        previous: color
      }));
    } else {
      setPickerBg({ background: pageData[elementName] });
      setColorValues((prev) => ({
        ...prev,
        previous: pageData[elementName]
      }));
    }
  }, []);
  const handleOnChange = (color) => {
    setSketchPickerColor(color);
    const value = `rgba(${color.r} , ${color.g} , ${color.b} , ${color.a})`;
    if (sections) {
      let element = elementName.split(/(\d+)/);
      element = element[2].replace("_", "");
      setSections(sections.map((section2) => {
        if (section2.id === currentSection.id) {
          return {
            ...section2,
            [`${element}`]: value
          };
        }
        return section2;
      }));
    } else {
      dispatch({
        type: LP_ACTIONS.UPDATE_PAGE_DATA,
        payload: {
          value,
          name: elementName
        }
      });
    }
    setColorValues((prev) => ({
      ...prev,
      current: value
    }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (sections) {
      let element = elementName.split(/(\d+)/);
      element = element[2].replace("_", "");
      const packets = {
        [`${element}`]: colorValues.current
      };
      updateSectionData(packets, currentSection.id).then((response) => {
        if (response.success) {
          setColorValues({
            previous: colorValues.current,
            current: colorValues.current
          });
          setShowPicker(false);
        }
      });
    } else {
      const packets = {
        [`${elementName}`]: colorValues.current
      };
      updateData(packets, pageData["id"], elementName).then((response) => {
        if (response.success) {
          setShowPicker(false);
          setColorValues({
            previous: colorValues.current,
            current: colorValues.current
          });
        }
      });
    }
  };
  const handleClose = (e) => {
    e.preventDefault();
    if (sections) {
      let element = elementName.split(/(\d+)/);
      element = element[2].replace("_", "");
      setSections(sections.map((section2) => {
        if (section2.id === currentSection.id) {
          return {
            ...section2,
            [`${element}`]: colorValues.previous
          };
        }
        return section2;
      }));
    } else {
      dispatch({
        type: LP_ACTIONS.UPDATE_PAGE_DATA,
        payload: {
          value: colorValues.previous,
          name: elementName
        }
      });
    }
    setColorValues({
      previous: colorValues.previous,
      current: colorValues.previous
    });
    setPickerBg({ background: colorValues.previous });
    setShowPicker(false);
  };
  return /* @__PURE__ */ jsxs("article", { className: "my_row page_settings border_wrap", children: [
    /* @__PURE__ */ jsx("h4", { children: label }),
    /* @__PURE__ */ jsxs("div", { className: "icon_wrap", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#",
          onClick: (e) => {
            e.preventDefault();
            setShowPicker(!showPicker);
          },
          children: [
            /* @__PURE__ */ jsx("span", { className: "color_wrap", children: /* @__PURE__ */ jsx(
              "span",
              {
                className: "color_box",
                style: pickerBg
              }
            ) }),
            "Edit"
          ]
        }
      ),
      showPicker && /* @__PURE__ */ jsxs("div", { className: "picker_wrapper", children: [
        /* @__PURE__ */ jsx("div", { className: "close_icon icon_wrap", children: /* @__PURE__ */ jsx("a", { href: "#", onClick: (e) => {
          handleClose(e);
        }, children: /* @__PURE__ */ jsx(RiCloseCircleFill, {}) }) }),
        /* @__PURE__ */ jsx(
          SketchPicker,
          {
            onChange: (color) => {
              handleOnChange(color.rgb);
            },
            color: sketchPickerColor,
            width: 300
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "button blue",
            href: "#",
            onClick: (e) => {
              handleSave(e);
            },
            children: "Save"
          }
        )
      ] })
    ] })
  ] });
};
const __vite_glob_0_86 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ColorPicker
}, Symbol.toStringTag, { value: "Module" }));
const DeleteSection = ({ id, sections, setSections, setOpenIndex }) => {
  const handleDeleteClick = (e) => {
    e.preventDefault();
    setOpenIndex([]);
    const newSectionsArray = sections.filter((section2) => {
      return section2.id !== id;
    });
    const packets = {
      sections: newSectionsArray
    };
    deleteSection(id, packets).then((response) => {
      if (response.success) {
        setSections(newSectionsArray);
      }
    });
  };
  return /* @__PURE__ */ jsx(
    "a",
    {
      className: "button red float-right",
      href: "#",
      onClick: (e) => handleDeleteClick(e),
      children: "Delete Section"
    }
  );
};
const __vite_glob_0_87 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteSection
}, Symbol.toStringTag, { value: "Module" }));
const DropdownComponent = ({
  courses,
  buttonCourseId,
  sections,
  setSections,
  id
}) => {
  const handleChange = (e) => {
    if (e.target.value === "") {
      e.target.classList.remove("active");
    }
    const slug = e.target.options[e.target.selectedIndex].dataset.slug;
    const value = e.target.value;
    const packets = {
      button_course_id: value
    };
    updateSectionData(packets, id).then((response) => {
      if (response.success) {
        setSections(
          sections.map((section2) => {
            if (section2.id === id) {
              section2.button_course_id = value;
              section2.slug = slug;
              return section2;
            }
            return section2;
          })
        );
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        className: `animate ${buttonCourseId && "active"} `,
        name: "courses",
        id: "courses",
        onChange: (e) => handleChange(e),
        value: buttonCourseId || "",
        onFocus: (e) => HandleFocus(e.target),
        children: [
          /* @__PURE__ */ jsx("option", {}),
          courses == null ? void 0 : courses.map((course, index2) => {
            return /* @__PURE__ */ jsx("option", { value: course.id, "data-slug": course.slug, children: course.title }, index2);
          })
        ]
      }
    ),
    /* @__PURE__ */ jsx("label", { children: "Select Course" })
  ] });
};
const __vite_glob_0_88 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DropdownComponent
}, Symbol.toStringTag, { value: "Module" }));
const ImageComponent = forwardRef(function ImageComponent22(props, ref) {
  var _a;
  const {
    completedCrop,
    setCompletedCrop,
    setShowLoader,
    elementName,
    cropArray,
    pageData = null,
    dispatch = null,
    sections = null,
    setSections = null,
    currentSection = null
  } = props;
  const [disableButton, setDisableButton] = useState(true);
  const [elementLabel, setElementLabel] = useState(elementName);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef();
  const previewCanvasRef = ref;
  const [crop, setCrop] = useState(cropArray);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(cropArray["aspect"] || 16 / 9);
  useEffect(() => {
    const words = elementName.split("_");
    setElementLabel(elementName === "hero" ? "Header Image" : words.join(" "));
  }, [elementName]);
  useDebounceEffect(
    async () => {
      var _a2, _b, _c;
      if (((_a2 = completedCrop[elementName]) == null ? void 0 : _a2.isCompleted.width) && ((_b = completedCrop[elementName]) == null ? void 0 : _b.isCompleted.height) && imgRef.current && (previewCanvasRef == null ? void 0 : previewCanvasRef.current[elementName])) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef == null ? void 0 : previewCanvasRef.current[elementName],
          (_c = completedCrop[elementName]) == null ? void 0 : _c.isCompleted,
          scale,
          rotate
        );
      }
    },
    100,
    [(_a = completedCrop[elementName]) == null ? void 0 : _a.isCompleted, scale, rotate]
  );
  const onSelectFile = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }
    setCrop(void 0);
    setDisableButton(false);
    document.querySelector("." + CSS.escape(elementName) + "_form .bottom_section").classList.remove("hidden");
    if (window.innerWidth < 993) {
      document.querySelector("." + CSS.escape(elementName) + "_form").scrollIntoView({
        behavior: "smooth"
      });
    }
    createImage(files[0], setUpImg);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableButton(true);
    const image = getFileToUpload(previewCanvasRef == null ? void 0 : previewCanvasRef.current[elementName]);
    image.then((value) => {
      fileUpload(value);
    }).catch((error) => {
      console.error(error);
      setDisableButton(false);
    });
  };
  const fileUpload = (image) => {
    setShowLoader({
      show: true,
      icon: "upload",
      position: "fixed"
    });
    window.Vapor.store(
      image,
      {
        visibility: "public-read"
      },
      {
        progress: (progress) => {
          this.uploadProgress = Math.round(progress * 100);
        }
      }
    ).then((response) => {
      const packets = {
        [`${elementName}`]: response.key,
        ext: response.extension
      };
      if (sections) {
        updateSectionImage(packets, currentSection.id).then((data) => {
          if (data.success) {
            setSections(sections.map((section2) => {
              if (section2.id === currentSection.id) {
                return {
                  ...section2,
                  image: data.imagePath
                };
              }
              return section2;
            }));
            setShowLoader({
              show: false,
              icon: "",
              position: ""
            });
            setUpImg(null);
            delete completedCrop[elementName];
            setCompletedCrop(completedCrop);
            document.querySelector(
              "." + CSS.escape(elementName) + "_form .bottom_section"
            ).classList.add("hidden");
          }
        });
      } else {
        updateImage(packets, pageData["id"]).then((data) => {
          if (data.success) {
            dispatch({
              type: LP_ACTIONS.UPDATE_PAGE_DATA,
              payload: {
                value: data.imagePath,
                name: elementName
              }
            });
            setShowLoader({
              show: false,
              icon: "",
              position: ""
            });
            setUpImg(null);
            delete completedCrop[elementName];
            setCompletedCrop(completedCrop);
            document.querySelector(
              "." + CSS.escape(elementName) + "_form .bottom_section"
            ).classList.add("hidden");
          }
        });
      }
    }).catch((error) => {
      console.error(error);
      setDisableButton(false);
    });
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setUpImg(null);
    const copy = { ...completedCrop };
    delete copy[elementName];
    setCompletedCrop(copy);
    document.querySelector("." + CSS.escape(elementName) + "_form .bottom_section").classList.add("hidden");
  };
  return /* @__PURE__ */ jsx("article", { className: "my_row page_settings", children: /* @__PURE__ */ jsx("div", { className: "column_wrap", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: `${elementName}_form`, children: [
    !completedCrop[elementName] && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "top_section", children: [
        /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: `${elementName}_file_upload`,
            className: "custom",
            children: [
              elementLabel,
              /* @__PURE__ */ jsxs("span", { className: "edit_icon", children: [
                /* @__PURE__ */ jsx(MdEdit, {}),
                /* @__PURE__ */ jsx("div", { className: "hover_text edit_image", children: /* @__PURE__ */ jsxs("p", { children: [
                  "Edit ",
                  elementLabel
                ] }) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "custom",
            id: `${elementName}_file_upload`,
            type: "file",
            accept: "image/png, image/jpeg, image/jpg, image/gif",
            onChange: onSelectFile
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "my_row info_text file_types", children: /* @__PURE__ */ jsxs("p", { className: "m-0 char_count w-100 ", children: [
        "Allowed File Types:",
        " ",
        /* @__PURE__ */ jsx("span", { children: "png, jpg, jpeg, gif" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bottom_section hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "crop_section", children: [
        /* @__PURE__ */ jsx(
          CropTools,
          {
            rotate,
            setRotate,
            scale,
            setScale
          }
        ),
        /* @__PURE__ */ jsx(
          ReactCrop$1,
          {
            crop,
            aspect,
            onChange: (_2, percentCrop) => setCrop(percentCrop),
            onComplete: (c) => setCompletedCrop({
              ...completedCrop,
              [`${elementName}`]: {
                isCompleted: c
              }
            }),
            children: /* @__PURE__ */ jsx(
              "img",
              {
                onLoad: (e) => onImageLoad(e, aspect, setCrop),
                src: upImg,
                ref: imgRef,
                style: { transform: `scale(${scale}) rotate(${rotate}deg)` },
                alt: "Crop me"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bottom_row", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "button green",
            disabled: disableButton,
            children: "Save"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "button transparent gray",
            href: "#",
            onClick: (e) => {
              handleCancel(e);
            },
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "help_link",
            href: "mailto:help@link.pro",
            children: "Need Help?"
          }
        )
      ] })
    ] })
  ] }) }) });
});
const __vite_glob_0_90 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ImageComponent
}, Symbol.toStringTag, { value: "Module" }));
const InputComponent = ({
  placeholder,
  type,
  maxChar = null,
  hoverText: hoverText2,
  elementName,
  value,
  data = null,
  dispatch = null,
  sections = null,
  setSections = null,
  currentSection = null,
  showTiny = null,
  setShowTiny = null
}) => {
  const [charactersLeft, setCharactersLeft] = useState(maxChar);
  const [isValid, setIsValid] = useState(false);
  const [textInputValue, setTextInputValue] = useState(value);
  useEffect(() => {
    if (textInputValue) {
      setCharactersLeft(maxChar - textInputValue.length);
      setIsValid(true);
    } else {
      setCharactersLeft(maxChar);
    }
  }, []);
  const handleChange = (e) => {
    const value2 = e.target.value;
    setTextInputValue(value2);
    let check;
    if (maxChar) {
      check = checkValidity(value2, "maxChar");
      setCharactersLeft(maxChar - value2.length);
    }
    if (check || !maxChar) {
      if (sections) {
        let element = elementName.split(/(\d+)/);
        element = element[2].replace("_", "");
        setSections(sections.map((section2) => {
          if (section2.id === currentSection.id) {
            return {
              ...section2,
              [`${element}`]: value2
            };
          }
          return section2;
        }));
      } else {
        dispatch({
          type: LP_ACTIONS.UPDATE_PAGE_DATA,
          payload: {
            value: value2,
            name: elementName
          }
        });
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      e.target.classList.remove("active");
    }
    if (isValid) {
      if (sections) {
        w;
        let element = elementName.split(/(\d+)/);
        element = element[2].replace("_", "");
        const packets = {
          [`${element}`]: textInputValue
        };
        updateSectionData(packets, currentSection.id);
      } else {
        const packets = {
          [`${elementName}`]: textInputValue
        };
        updateData(packets, data["id"], elementName).then((response) => {
          if (response.success && response.slug) {
            dispatch({
              type: LP_ACTIONS.UPDATE_PAGE_DATA,
              payload: {
                value: response.slug,
                name: "slug"
              }
            });
          }
        });
      }
    }
  };
  const checkValidity = (value2, checkType) => {
    if (checkType === "url") {
      if (validator.isURL(value2)) {
        setIsValid(true);
        return true;
      } else {
        setIsValid(false);
        return false;
      }
    } else if (checkType === "maxChar") {
      if (maxChar - value2.length >= 0 && value2.length > 0) {
        setIsValid(true);
        return true;
      } else {
        setIsValid(false);
        return false;
      }
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "edit_form", children: /* @__PURE__ */ jsxs("form", { children: [
    {
      "text": /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: `animate ${textInputValue && "active"} `,
            maxLength: maxChar,
            name: elementName,
            type: "text",
            defaultValue: textInputValue || "",
            onChange: (e) => handleChange(e),
            onKeyDown: (event) => {
              if (event.key === "Enter") {
                handleSubmit(event);
              }
            },
            onBlur: (e) => handleSubmit(e),
            onFocus: (e) => HandleFocus(e.target)
          }
        ),
        /* @__PURE__ */ jsx("label", { children: placeholder })
      ] }),
      "textarea": /* @__PURE__ */ jsx(
        EditorComponent,
        {
          dispatch,
          sections,
          setSections,
          currentSection,
          elementName,
          data,
          isValid,
          setIsValid,
          showTiny,
          setShowTiny
        }
      )
    }[type],
    isValid ? /* @__PURE__ */ jsxs(
      "a",
      {
        className: `submit_circle ${type === "textarea" ? "textarea" : ""}`,
        href: "#",
        onClick: (e) => type !== "textarea" ? handleSubmit(e) : e.preventDefault(),
        children: [
          /* @__PURE__ */ jsx(FiThumbsUp, {}),
          /* @__PURE__ */ jsx("div", { className: "hover_text submit_button", children: /* @__PURE__ */ jsx("p", { children: hoverText2 }) })
        ]
      }
    ) : /* @__PURE__ */ jsx("span", { className: `cancel_icon ${type === "textarea" ? "textarea" : ""}`, children: /* @__PURE__ */ jsx(FiThumbsDown, {}) }),
    maxChar && /* @__PURE__ */ jsxs("div", { className: "my_row info_text title", children: [
      /* @__PURE__ */ jsxs("p", { className: "char_max", children: [
        "Max ",
        maxChar,
        " Characters"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "char_count", children: charactersLeft < 0 ? /* @__PURE__ */ jsx("span", { className: "over", children: "Over Character Limit" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        "Characters Left: ",
        /* @__PURE__ */ jsxs("span", { className: "count", children: [
          " ",
          charactersLeft,
          " "
        ] })
      ] }) })
    ] })
  ] }) });
};
const __vite_glob_0_91 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: InputComponent
}, Symbol.toStringTag, { value: "Module" }));
const Hero = ({
  nodesRef,
  completedCrop,
  elementName,
  pageData
}) => {
  var _a, _b;
  const [headerImageStyle, setHeaderImageStyle] = useState(null);
  useEffect(() => {
    var _a2, _b2, _c;
    const background = pageData["hero"] ? "url(" + pageData["hero"] + ") center 25% no-repeat" : "url(" + Vapor.asset("images/image-placeholder.jpg") + ") center no-repeat #f4f4f4";
    setHeaderImageStyle(
      ((_a2 = completedCrop[elementName]) == null ? void 0 : _a2.isCompleted) ? {
        width: ((_b2 = completedCrop[elementName]) == null ? void 0 : _b2.isCompleted) ? `100%` : 0,
        height: ((_c = completedCrop[elementName]) == null ? void 0 : _c.isCompleted) ? `auto` : 0,
        maxHeight: "162px",
        overflow: "hidden"
      } : {
        background,
        backgroundSize: pageData["hero"] ? "cover" : "68%",
        backgroundRepeat: "no-repeat",
        minHeight: "162px"
      }
    );
  }, [completedCrop[elementName]]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "header_image my_row",
      style: headerImageStyle,
      children: completedCrop[elementName] && /* @__PURE__ */ jsx(
        "canvas",
        {
          className: `${elementName}_bg_image`,
          ref: (ref) => nodesRef.current[elementName] = ref,
          style: {
            /*backgroundImage: nodesRef.current[elementName],*/
            /*width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0)*/
            backgroundSize: `cover`,
            backgroundRepeat: `no-repeat`,
            width: ((_a = completedCrop[elementName]) == null ? void 0 : _a.isCompleted) ? `100%` : 0,
            height: ((_b = completedCrop[elementName]) == null ? void 0 : _b.isCompleted) ? `auto` : 0
          }
        }
      )
    }
  );
};
const __vite_glob_0_92 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hero
}, Symbol.toStringTag, { value: "Module" }));
const TopBar = ({
  nodesRef,
  completedCrop,
  pageData
}) => {
  var _a, _b;
  return /* @__PURE__ */ jsxs("div", { className: "top_section", style: {
    background: pageData["header_color"]
  }, children: [
    /* @__PURE__ */ jsx("div", { className: "logo", children: (completedCrop == null ? void 0 : completedCrop.logo) ? /* @__PURE__ */ jsx(
      "canvas",
      {
        ref: (ref) => nodesRef.current.logo = ref,
        style: {
          width: ((_a = completedCrop.logo) == null ? void 0 : _a.isCompleted) ? `100%` : 0,
          height: ((_b = completedCrop.logo) == null ? void 0 : _b.isCompleted) ? `100%` : 0,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`
        }
      }
    ) : /* @__PURE__ */ jsx("img", { src: pageData["logo"] || Vapor.asset("images/logo.png"), alt: "" }) }),
    /* @__PURE__ */ jsx("div", { className: "text_wrap", children: /* @__PURE__ */ jsx("p", { style: { color: pageData["header_text_color"] }, children: pageData["slogan"] }) })
  ] });
};
const __vite_glob_0_96 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TopBar
}, Symbol.toStringTag, { value: "Module" }));
const SectionImage = ({
  nodesRef,
  completedCrop,
  elementName,
  imgUrl
}) => {
  var _a, _b;
  const [sectionImageStyle, setSectionImageStyle] = useState(null);
  useEffect(() => {
    var _a2, _b2, _c;
    const backgroundImg = imgUrl || Vapor.asset("images/image-placeholder.jpg");
    setSectionImageStyle(
      ((_a2 = completedCrop[elementName]) == null ? void 0 : _a2.isCompleted) ? {
        width: ((_b2 = completedCrop[elementName]) == null ? void 0 : _b2.isCompleted) ? `100%` : 0,
        height: ((_c = completedCrop[elementName]) == null ? void 0 : _c.isCompleted) ? `auto` : 0,
        minHeight: "130px",
        overflow: "hidden"
      } : {
        background: "url(" + backgroundImg + ") center no-repeat",
        backgroundSize: "cover",
        minHeight: "130px"
      }
    );
  }, [completedCrop[elementName]]);
  return /* @__PURE__ */ jsx("div", { className: "image_bg", style: sectionImageStyle, children: completedCrop[elementName] ? /* @__PURE__ */ jsx(
    "canvas",
    {
      className: `${elementName}_bg_image`,
      ref: (ref) => nodesRef.current[elementName] = ref,
      style: {
        /*backgroundImage: nodesRef.current[elementName],*/
        /*width: Math.round(completedCrop?.width ?? 0),
        height: Math.round(completedCrop?.height ?? 0)*/
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
        width: ((_a = completedCrop[elementName]) == null ? void 0 : _a.isCompleted) ? `100%` : 0,
        height: ((_b = completedCrop[elementName]) == null ? void 0 : _b.isCompleted) ? `auto` : 0
      }
    }
  ) : "" });
};
const __vite_glob_0_95 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SectionImage
}, Symbol.toStringTag, { value: "Module" }));
const PreviewSection = ({
  currentSection,
  nodesRef,
  completedCrop,
  position,
  hoverSection,
  url
}) => {
  const {
    type,
    bg_color,
    text: text2,
    image,
    button,
    button_position,
    button_size,
    button_text,
    button_text_color,
    button_color,
    slug
  } = currentSection;
  const [buttonStyle, setButtonStyle] = useState(null);
  const [textValue, setTextValue] = useState(text2);
  const firstUpdate = useRef(true);
  useEffect(() => {
    setButtonStyle({
      background: button_color,
      color: button_text_color,
      width: button_size + "%"
    });
  }, [button_text_color, button_color, button_size]);
  useEffect(() => {
    if (type === "text") {
      if (firstUpdate.current && text2 && isJSON(text2)) {
        const allContent = JSON.parse(text2);
        allContent["blocks"] = allContent["blocks"].map((block) => {
          if (!block.text) {
            block.text = "";
          }
          return block;
        });
        setTextValue(draftToHtml(allContent));
        firstUpdate.current = false;
      } else {
        setTextValue(text2);
      }
    }
  }, [text2]);
  const createMarkup = (text22) => {
    return {
      __html: DOMPurify.sanitize(text22)
    };
  };
  const Button = ({ buttonText }) => {
    return /* @__PURE__ */ jsx("div", { className: `button_wrap my_row ${button_position ? button_position : "above"}`, children: /* @__PURE__ */ jsx(
      "a",
      {
        href: url + "/course-page/" + slug,
        target: "_blank",
        className: "button",
        style: buttonStyle,
        children: buttonText || "Get Course"
      }
    ) });
  };
  return /* @__PURE__ */ jsx("section", { id: `preview_section_${position}`, className: hoverSection === "section_" + position ? "active" : "", children: /* @__PURE__ */ jsxs("div", { className: type, style: { background: bg_color || "rgba(255,255,255,1)" }, children: [
    !!button && button_position === "above" && /* @__PURE__ */ jsx(
      Button,
      {
        buttonText: button_text
      }
    ),
    {
      "text": /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: createMarkup(textValue) }),
      "image": /* @__PURE__ */ jsx(
        SectionImage,
        {
          nodesRef,
          completedCrop,
          elementName: "section_" + position + "_" + type,
          imgUrl: image
        }
      )
    }[type],
    !!button && button_position === "below" && /* @__PURE__ */ jsx(
      Button,
      {
        buttonText: button_text
      }
    )
  ] }) });
};
const __vite_glob_0_94 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PreviewSection
}, Symbol.toStringTag, { value: "Module" }));
const Preview = ({
  completedCrop,
  nodesRef,
  pageData,
  sections,
  setShowPreview,
  hoverSection,
  url
}) => {
  const loadPreviewHeight = UseLoadPreviewHeight();
  const resizePreviewHeight2 = UseResizePreviewHeight();
  useEffect(() => {
    if (hoverSection) {
      const target = document.getElementById("preview_" + hoverSection);
      if (target) {
        if (hoverSection.includes("header")) {
          target.parentNode.scrollTop = target.offsetTop;
        } else {
          target.parentNode.parentNode.scrollTop = target.offsetTop + 100;
        }
      }
    }
  }, [hoverSection]);
  const ClosePreview = () => {
    document.querySelector("body").classList.remove("fixed");
    setShowPreview(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "close_preview", onClick: ClosePreview, children: /* @__PURE__ */ jsx(IoIosCloseCircleOutline, {}) }),
    /* @__PURE__ */ jsx("div", { className: "links_wrap preview lp_creator", children: /* @__PURE__ */ jsx("div", { className: "inner_content", id: "preview_wrap", children: /* @__PURE__ */ jsxs("div", { className: "inner_content_wrap", style: { maxHeight: resizePreviewHeight2 ? resizePreviewHeight2 + "px" : loadPreviewHeight + "px" }, children: [
      /* @__PURE__ */ jsxs("section", { className: `my_row header ${hoverSection === "header_section" ? "active" : ""}`, id: "preview_header_section", children: [
        /* @__PURE__ */ jsx(
          TopBar,
          {
            nodesRef,
            completedCrop,
            pageData
          }
        ),
        /* @__PURE__ */ jsx(
          Hero,
          {
            nodesRef,
            completedCrop,
            pageData,
            elementName: "hero"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "sections", children: !isEmpty(sections) && sections.map((section2, index2) => {
        return /* @__PURE__ */ jsx(
          PreviewSection,
          {
            currentSection: section2,
            nodesRef,
            completedCrop,
            position: index2 + 1,
            hoverSection,
            url
          },
          section2.id
        );
      }) })
    ] }) }) })
  ] });
};
const __vite_glob_0_93 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Preview
}, Symbol.toStringTag, { value: "Module" }));
const PublishButton = ({ pageData, dispatch }) => {
  const handleOnClick = (e) => {
    e.preventDefault();
    const packets = {
      published: true
    };
    publishPage(packets, pageData["id"]).then((response) => {
      if (response.success) {
        dispatch({
          type: LP_ACTIONS.UPDATE_PAGE_DATA,
          payload: {
            value: true,
            name: "published"
          }
        });
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "my_row button_wrap mt-3", children: [
    /* @__PURE__ */ jsx("button", { type: "submit", disabled: !pageData["title"] ? "disabled" : "", className: !pageData["title"] ? "button blue disabled" : "button blue", onClick: (e) => handleOnClick(e), children: "Publish" }),
    !pageData["title"] ? /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx(IoWarningOutline, {}),
      " Course requires a title/slug before being published"
    ] }) : ""
  ] });
};
const __vite_glob_0_97 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PublishButton
}, Symbol.toStringTag, { value: "Module" }));
const SectionButtonOptions = ({
  position,
  buttonPosition,
  includeButton,
  sections,
  setSections,
  currentSection,
  id,
  courses = null,
  buttonCourseId = null,
  buttonSize
}) => {
  const [includeButtonValue, setIncludeButtonValue] = useState(false);
  const [buttonPositionValue, setButtonPositionValue] = useState("above");
  const [buttonSizeState, setButtonSizeState] = useState(buttonSize);
  useEffect(() => {
    setIncludeButtonValue(includeButton);
  }, []);
  useEffect(() => {
    setButtonPositionValue(buttonPosition);
  }, []);
  const handleSwitchChange = () => {
    setIncludeButtonValue(!includeButtonValue);
    const packets = {
      button: !includeButtonValue
    };
    updateSectionData(packets, id).then((response) => {
      if (response.success) {
        setSections(
          sections.map((section2) => {
            if (section2.id === id) {
              section2.button = !includeButtonValue;
            }
            return section2;
          })
        );
      }
    });
  };
  const handleRadioChange = (value) => {
    setButtonPositionValue(value);
    const packets = {
      button_position: value
    };
    updateSectionData(packets, id).then((response) => {
      if (response.success) {
        setSections(
          sections.map((section2) => {
            if (section2.id === id) {
              section2.button_position = value;
            }
            return section2;
          })
        );
      }
    });
  };
  const handleRangeChange = (value) => {
    setButtonSizeState(value);
  };
  const submitButtonSize = () => {
    const packets = {
      button_size: buttonSizeState
    };
    updateSectionData(packets, id).then((response) => {
      if (response.success) {
        setSections(
          sections.map((section2) => {
            if (section2.id === id) {
              section2.button_size = buttonSizeState;
            }
            return section2;
          })
        );
      }
    });
  };
  const rangePercent = (value) => {
    return value + "%";
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: `switch_wrap page_settings border_wrap`, children: [
      /* @__PURE__ */ jsx("h3", { children: "Include Button" }),
      /* @__PURE__ */ jsx(
        IOSSwitch,
        {
          onChange: handleSwitchChange,
          checked: Boolean(includeButtonValue)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `button_options ${includeButtonValue ? "open" : ""}`, children: [
      /* @__PURE__ */ jsx("article", { className: "page_settings border_wrap", children: /* @__PURE__ */ jsx("div", { className: "radios_wrap", children: /* @__PURE__ */ jsxs(FormControl$1, { children: [
        /* @__PURE__ */ jsx(
          FormLabel,
          {
            id: `section_${position}_above`,
            sx: {
              color: "#000"
            },
            children: /* @__PURE__ */ jsx("h3", { children: "Button Location" })
          }
        ),
        /* @__PURE__ */ jsxs(
          RadioGroup,
          {
            row: true,
            "aria-labelledby": `section_${position}_above`,
            name: `section_${position}_above`,
            onChange: (e) => {
              handleRadioChange(e.target.value);
            },
            children: [
              /* @__PURE__ */ jsx(
                FormControlLabel,
                {
                  value: "above",
                  control: /* @__PURE__ */ jsx(
                    Radio,
                    {
                      checked: (buttonPositionValue === "above" || !buttonPositionValue) && true
                    }
                  ),
                  label: "Above"
                }
              ),
              /* @__PURE__ */ jsx(
                FormControlLabel,
                {
                  value: "below",
                  control: /* @__PURE__ */ jsx(
                    Radio,
                    {
                      checked: buttonPositionValue === "below" && true
                    }
                  ),
                  label: "Below"
                }
              )
            ]
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsxs("article", { className: "my_row page_settings border_wrap", children: [
        /* @__PURE__ */ jsx("h3", { children: "Button Size" }),
        /* @__PURE__ */ jsx("div", { className: "slider_wrap", children: /* @__PURE__ */ jsx(
          Slider,
          {
            value: buttonSizeState,
            "aria-label": "Default",
            valueLabelDisplay: "auto",
            valueLabelFormat: rangePercent,
            color: "primary",
            step: 1,
            min: 25,
            max: 100,
            sx: {
              color: "#424fcf"
            },
            onChange: (e) => handleRangeChange(e.target.value),
            onChangeCommitted: submitButtonSize
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(
        ColorPicker,
        {
          label: "Button Text Color",
          sections,
          setSections,
          currentSection,
          elementName: `section_${position}_button_text_color`
        }
      ),
      /* @__PURE__ */ jsx(
        ColorPicker,
        {
          label: "Button Color",
          sections,
          setSections,
          currentSection,
          elementName: `section_${position}_button_color`
        }
      ),
      /* @__PURE__ */ jsx(
        InputComponent,
        {
          placeholder: "Update Button Text (optional)",
          type: "text",
          maxChar: 15,
          hoverText: "Submit Button Text",
          elementName: `section_${position}_button_text`,
          sections,
          setSections,
          currentSection,
          value: currentSection["button_text"]
        }
      ),
      /* @__PURE__ */ jsx(
        DropdownComponent,
        {
          courses,
          buttonCourseId,
          sections,
          setSections,
          id
        }
      )
    ] })
  ] });
};
const __vite_glob_0_99 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SectionButtonOptions
}, Symbol.toStringTag, { value: "Module" }));
const Section = ({
  section: section2,
  index: index2,
  completedCrop,
  setCompletedCrop,
  nodesRef,
  sections,
  setSections,
  openIndex,
  setOpenIndex,
  setShowLoader,
  handleMouseEnter,
  showTiny,
  setShowTiny,
  courses
}) => {
  const {
    id,
    type,
    text: text2,
    button_position,
    button,
    button_course_id,
    button_size
  } = section2;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: section2.id });
  const style = {
    transform: CSS$1.Transform.toString(transform),
    transition
  };
  const handleSectionOpen = (rowIndex) => {
    if (openIndex) {
      if (openIndex.includes(rowIndex)) {
        const newArrayIndex = openIndex.filter(
          (element) => element !== rowIndex
        );
        setOpenIndex(newArrayIndex);
      } else {
        const newArrayIndex = openIndex.concat(rowIndex);
        setOpenIndex(newArrayIndex);
      }
    }
  };
  const handleMouseDown = () => {
    setOpenIndex([]);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: setNodeRef,
      className: "section_row",
      id: `section_${index2 + 1}`,
      style,
      onMouseEnter: (e) => handleMouseEnter(e),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "section_title",
            onClick: (e) => handleSectionOpen(index2),
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "drag_handle creator_section",
                  onMouseDown: handleMouseDown,
                  ...attributes,
                  ...listeners,
                  children: /* @__PURE__ */ jsx(MdDragHandle, {})
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "title_column", children: /* @__PURE__ */ jsxs("h4", { children: [
                "Section ",
                index2 + 1
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: `icon_wrap ${openIndex.includes(index2) ? "open" : ""}`, children: /* @__PURE__ */ jsx(MdKeyboardArrowDown, {}) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: `section_content my_row ${openIndex.includes(index2) ? "open" : ""}`, children: [
          type === "text" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              InputComponent,
              {
                placeholder: "Add Text",
                type: "textarea",
                hoverText: `Add Text to Section ${index2 + 1}`,
                elementName: `section_${index2 + 1}_text`,
                value: text2,
                currentSection: section2,
                sections,
                setSections,
                showTiny,
                setShowTiny
              }
            ),
            /* @__PURE__ */ jsx(
              ColorPicker,
              {
                label: "Background Color",
                currentSection: section2,
                sections,
                setSections,
                elementName: `section_${index2 + 1}_bg_color`
              }
            )
          ] }),
          type === "image" && /* @__PURE__ */ jsx(
            ImageComponent,
            {
              ref: nodesRef,
              completedCrop,
              setCompletedCrop,
              setShowLoader,
              currentSection: section2,
              sections,
              setSections,
              elementName: `section_${index2 + 1}_image`,
              cropArray: {
                unit: "%",
                width: 30,
                x: 25,
                y: 25,
                aspect: 16 / 8
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "my_row", children: /* @__PURE__ */ jsx(
            SectionButtonOptions,
            {
              position: index2 + 1,
              buttonPosition: button_position,
              includeButton: button,
              sections,
              setSections,
              currentSection: section2,
              buttonCourseId: button_course_id,
              buttonSize: button_size,
              courses,
              id
            }
          ) }),
          /* @__PURE__ */ jsx(
            DeleteSection,
            {
              id,
              sections,
              setSections,
              setOpenIndex
            }
          )
        ] })
      ]
    }
  );
};
const __vite_glob_0_98 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Section
}, Symbol.toStringTag, { value: "Module" }));
function LPCreator({ landingPageArray, courses, username }) {
  const [showTiny, setShowTiny] = useState(false);
  const [openIndex, setOpenIndex] = useState([0]);
  const [hoverSection, setHoverSection] = useState(null);
  const [pageData, dispatch] = useReducer(reducer$1, landingPageArray);
  const [sections, setSections] = useState(pageData["sections"]);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [completedCrop, setCompletedCrop] = useState({});
  const nodesRef = useRef({});
  const [showLoader, setShowLoader] = useState({
    show: false,
    icon: "",
    position: ""
  });
  const [flash, setFlash] = useState({
    show: false,
    type: "",
    msg: ""
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  useEffect(() => {
    previewButtonRequest(setShowPreviewButton);
  }, []);
  useEffect(() => {
    function setPreviewButton() {
      previewButtonRequest(setShowPreviewButton);
    }
    window.addEventListener("resize", setPreviewButton);
    return () => {
      window.removeEventListener("resize", setPreviewButton);
    };
  }, []);
  const showFlash = (show = false, type = "", msg = "") => {
    setFlash({ show, type, msg });
  };
  useEffect(() => {
    EventBus.on("success", (data) => {
      showFlash(true, "success", data.message.replace(/"/g, ""));
      return () => EventBus.remove("success");
    });
  }, []);
  useEffect(() => {
    EventBus.on("error", (data) => {
      showFlash(true, "error", data.message.replace(/"/g, ""));
      return () => EventBus.remove("error");
    });
  }, []);
  const handleMouseEnter = (e) => {
    setHoverSection(e.target.id);
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      let newArray;
      setSections((sections2) => {
        const oldIndex = sections2.map(function(e) {
          return e.id;
        }).indexOf(active.id);
        const newIndex = sections2.map(function(e) {
          return e.id;
        }).indexOf(over.id);
        newArray = arrayMove(sections2, oldIndex, newIndex);
        return newArray;
      });
      const packets = {
        sections: newArray
      };
      updateSectionsPositions(packets).then(() => {
        setShowTiny(false);
        setShowTiny(true);
      });
    }
  };
  const url = window.location.protocol + "//" + window.location.host + "/" + username;
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Landing Page Creator" }),
    /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "page_title", children: "Course Creator" }),
      /* @__PURE__ */ jsx("section", { className: "card edit_page creator", children: /* @__PURE__ */ jsx("div", { id: "links_page", children: /* @__PURE__ */ jsx("div", { id: "creator", className: "my_row creator_wrap", children: /* @__PURE__ */ jsxs("div", { className: "my_row page_wrap", children: [
        showLoader.show && /* @__PURE__ */ jsx(
          Loader,
          {
            showLoader
          }
        ),
        flash.show && /* @__PURE__ */ jsx(
          Flash,
          {
            ...flash,
            setFlash,
            removeFlash: showFlash,
            pageSettings: pageData
          }
        ),
        showPreviewButton && /* @__PURE__ */ jsx(PreviewButton, { setShowPreview }),
        /* @__PURE__ */ jsxs("div", { className: "left_column", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 card_title", children: "Create Your Landing Page" }),
          /* @__PURE__ */ jsxs("div", { className: "content_wrap my_row creator", id: "left_col_wrap", children: [
            /* @__PURE__ */ jsxs(
              "section",
              {
                id: "header_section",
                className: "my_row section section_row",
                onMouseEnter: (e) => handleMouseEnter(e),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "section_title", children: /* @__PURE__ */ jsx("h4", { children: "Header" }) }),
                  /* @__PURE__ */ jsx("div", { className: "section_content my_row", children: /* @__PURE__ */ jsx(
                    InputComponent,
                    {
                      placeholder: "Page Title",
                      type: "text",
                      maxChar: 60,
                      hoverText: "Submit Page Title",
                      elementName: "title",
                      data: pageData,
                      dispatch,
                      value: pageData["title"]
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "section_content my_row", children: [
                    /* @__PURE__ */ jsx(
                      ImageComponent,
                      {
                        ref: nodesRef,
                        completedCrop,
                        setCompletedCrop,
                        setShowLoader,
                        pageData,
                        dispatch,
                        elementName: "logo",
                        cropArray: {
                          unit: "%",
                          width: 60,
                          height: 30,
                          x: 25,
                          y: 25
                        }
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      InputComponent,
                      {
                        placeholder: "Slogan (optional)",
                        type: "text",
                        maxChar: 30,
                        hoverText: "Submit Slogan Text",
                        elementName: "slogan",
                        data: pageData,
                        dispatch,
                        value: pageData["slogan"]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ImageComponent,
                      {
                        ref: nodesRef,
                        completedCrop,
                        setCompletedCrop,
                        setShowLoader,
                        pageData,
                        dispatch,
                        elementName: "hero",
                        cropArray: {
                          unit: "%",
                          width: 30,
                          x: 25,
                          y: 25,
                          aspect: 16 / 8
                        }
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ColorPicker,
                      {
                        label: "Top Header Color",
                        pageData,
                        dispatch,
                        elementName: "header_color"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      ColorPicker,
                      {
                        label: "Header Text Color",
                        pageData,
                        dispatch,
                        elementName: "header_text_color"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "my_row page_settings", children: pageData["slug"] && /* @__PURE__ */ jsxs("div", { className: "url_wrap", children: [
                      /* @__PURE__ */ jsx("p", { children: "Landing Page URL:" }),
                      /* @__PURE__ */ jsx("a", { target: "_blank", href: `${url}/${pageData["slug"]}`, children: `${url}/${pageData["slug"]}` })
                    ] }) })
                  ] })
                ]
              }
            ),
            !isEmpty(sections) && /* @__PURE__ */ jsx(
              DndContext,
              {
                sensors,
                collisionDetection: closestCenter,
                onDragEnd: handleDragEnd,
                children: /* @__PURE__ */ jsx("section", { className: "sections_wrap my_row", children: /* @__PURE__ */ jsx(
                  SortableContext,
                  {
                    items: sections,
                    strategy: verticalListSortingStrategy,
                    children: sections.map((section2, index2) => {
                      return /* @__PURE__ */ jsx(
                        Section,
                        {
                          section: section2,
                          index: index2,
                          completedCrop,
                          setCompletedCrop,
                          nodesRef,
                          sections,
                          setSections,
                          url,
                          openIndex,
                          setOpenIndex,
                          setShowLoader,
                          handleMouseEnter,
                          showTiny,
                          setShowTiny,
                          courses
                        },
                        section2.id
                      );
                    })
                  }
                ) })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "link_row", children: [
              /* @__PURE__ */ jsx(
                AddSectionLink,
                {
                  sections,
                  setSections,
                  pageID: pageData["id"],
                  setOpenIndex,
                  type: "text"
                }
              ),
              /* @__PURE__ */ jsx(
                AddSectionLink,
                {
                  sections,
                  setSections,
                  pageID: pageData["id"],
                  setOpenIndex,
                  type: "image"
                }
              )
            ] }),
            !pageData["published"] && /* @__PURE__ */ jsx(
              PublishButton,
              {
                pageData,
                dispatch
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `right_column links_col preview${showPreview ? " show" : ""}`, children: /* @__PURE__ */ jsx(
          Preview,
          {
            completedCrop,
            nodesRef,
            sections,
            url,
            pageData,
            setShowPreview,
            hoverSection
          }
        ) })
      ] }) }) }) })
    ] })
  ] });
}
const __vite_glob_0_100 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LPCreator
}, Symbol.toStringTag, { value: "Module" }));
const SectionComponent = ({ section: section2 }) => {
  const [bgStyle, setBgStyle] = useState(null);
  const [buttonStyle, setButtonStyle] = useState(null);
  const {
    id,
    type,
    image,
    bg_color,
    button,
    button_position,
    button_color,
    button_text_color,
    button_text,
    button_size,
    text: text2,
    slug,
    username
  } = section2;
  const [textValue, setTextValue] = useState(text2);
  useEffect(() => {
    if (type === "text") {
      if (text2 && isJSON(text2)) {
        const allContent = JSON.parse(text2);
        allContent["blocks"] = allContent["blocks"].map((block) => {
          if (!block.text) {
            block.text = "";
          }
          return block;
        });
        setTextValue(draftToHtml(allContent));
      } else {
        setTextValue(text2);
      }
    }
  }, []);
  useEffect(() => {
    setButtonStyle({
      background: button_color,
      color: button_text_color,
      width: button_size + "%"
    });
  }, []);
  const createMarkup = (text22) => {
    return {
      __html: DOMPurify.sanitize(text22)
    };
  };
  useEffect(() => {
    if (type === "image") {
      if (section2.image) {
        setBgStyle({
          background: "url(" + image + ") no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        });
      } else {
        setBgStyle({
          background: "url(" + Vapor.asset("images/image-placeholder.jpg") + ") no-repeat",
          backgroundPosition: "center",
          backgroundSize: "30%",
          backgroundColor: "#f4f4f4"
        });
      }
    }
  }, []);
  const url = window.location.protocol + "//" + window.location.host + "/" + username + "/course-page/" + slug;
  const Button = ({ buttonText }) => {
    return /* @__PURE__ */ jsx("div", { id, className: `button_wrap ${button_position ? button_position : "above"}`, children: /* @__PURE__ */ jsx(
      "a",
      {
        href: url,
        target: "_blank",
        className: "button",
        style: buttonStyle,
        children: buttonText || "Get Course"
      }
    ) });
  };
  return /* @__PURE__ */ jsxs("section", { className: type, style: type === "text" ? { background: bg_color } : bgStyle, children: [
    type === "text" && /* @__PURE__ */ jsxs("article", { className: "section_content", children: [
      button && button_position === "above" ? /* @__PURE__ */ jsx(Button, { buttonText: button_text }) : "",
      /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: createMarkup(textValue) }),
      button && button_position === "below" ? /* @__PURE__ */ jsx(Button, { buttonText: button_text }) : ""
    ] }),
    type === "image" && button ? /* @__PURE__ */ jsx(Button, { buttonText: button_text }) : ""
  ] });
};
const __vite_glob_0_103 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SectionComponent
}, Symbol.toStringTag, { value: "Module" }));
function LandingPage({ page, sections }) {
  return /* @__PURE__ */ jsxs("div", { id: "links_page", className: "live_page", children: [
    /* @__PURE__ */ jsx(Head, { title: page.title }),
    /* @__PURE__ */ jsx("div", { className: "creator_wrap my_row", children: /* @__PURE__ */ jsxs("div", { id: "live_landing_page", children: [
      /* @__PURE__ */ jsxs("section", { className: "header", children: [
        /* @__PURE__ */ jsx("div", { className: "top_section", style: { background: page.header_color }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
          /* @__PURE__ */ jsx("div", { className: "logo", children: /* @__PURE__ */ jsx("img", { src: page.logo || Vapor.asset("images/logo.png"), alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "text_wrap", children: /* @__PURE__ */ jsx("p", { style: { color: page.header_text_color }, children: page.slogan }) })
        ] }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "header_image my_row",
            style: {
              background: "url(" + page.hero + ") no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "sections", children: sections == null ? void 0 : sections.map((section2, index2) => {
        return /* @__PURE__ */ jsx(SectionComponent, { section: section2 }, index2);
      }) })
    ] }) })
  ] });
}
const __vite_glob_0_102 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LandingPage
}, Symbol.toStringTag, { value: "Module" }));
function LivePage({ links, page, subscribed }) {
  const { user_id, header_img, profile_layout, profile_img, title, bio, name: name2 } = page;
  const [headerStyle, setHeaderStyle] = useState({});
  const [iconCount, setIconCount] = useState(null);
  const [row, setRow] = useState(null);
  const [value, setValue] = useState(null);
  const [clickType, setClickType] = useState(null);
  useEffect(() => {
    if (header_img) {
      setHeaderStyle({
        background: "url(" + header_img + ") no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center bottom"
      });
    }
  }, []);
  useEffect(() => {
    if (subscribed) {
      setIconCount(links.length);
    } else {
      setIconCount(8);
    }
  }, []);
  const accordionLinks = value !== null ? links[value].links : null;
  const mailchimpListId = value !== null ? links[value].mailchimp_list_id : null;
  const storeProducts = value !== null ? links[value].shopify_products : null;
  return /* @__PURE__ */ jsxs("main", { className: "py-4", children: [
    /* @__PURE__ */ jsx(Head, { title: name2 }),
    /* @__PURE__ */ jsx("div", { id: "links_page", children: /* @__PURE__ */ jsx("div", { className: "links_col my_row", children: /* @__PURE__ */ jsx("div", { className: "links_wrap live_page h-full", children: /* @__PURE__ */ jsxs("div", { className: "inner_content live_page", children: [
      /* @__PURE__ */ jsx("div", { className: `page_header ${!header_img ? "default" : ""} `, style: headerStyle, children: !header_img && /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/default-img.png"), alt: "Header Image" }) }),
      /* @__PURE__ */ jsxs("div", { id: profile_layout, className: "profile_content", children: [
        /* @__PURE__ */ jsx("div", { className: `profile_img_column ${!profile_img ? "default" : ""}`, children: /* @__PURE__ */ jsx("div", { className: "profile_image", children: /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsx("img", { src: profile_img || Vapor.asset("images/default-img.png"), alt: "" }) }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "profile_text", children: [
          title && /* @__PURE__ */ jsx("h2", { children: title }),
          bio && /* @__PURE__ */ jsx("p", { children: bio })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "icons_wrap main", children: links.slice(0, iconCount).map((linkItem, index2) => {
          let {
            id,
            type,
            name: name22,
            url,
            email,
            phone,
            icon,
            active_status,
            links: links2
          } = linkItem;
          if (email) {
            url = "mailto:" + email;
          } else if (phone) {
            url = "tel:" + phone;
            if (icon.includes("Facetime")) {
              url = "facetime:" + phone;
            }
          }
          const dataRow = Math.ceil((index2 + 1) / 4);
          let displayIcon = null;
          if (type !== "folder") {
            displayIcon = checkIcon(icon, "preview", subscribed);
          }
          let colClasses = "";
          if (type === "folder" || type === "mailchimp" || type === "shopify") {
            colClasses = "icon_col folder";
          } else {
            colClasses = "icon_col";
          }
          return /* @__PURE__ */ jsxs(React.Fragment, { children: [
            (() => {
              switch (type) {
                case "folder":
                  return active_status && subscribed ? /* @__PURE__ */ jsx(
                    Folder,
                    {
                      id,
                      colClasses,
                      mainIndex: index2,
                      links: links2,
                      setRow,
                      value,
                      setValue,
                      dataRow,
                      name: name22,
                      clickType,
                      setClickType,
                      subStatus: subscribed
                    }
                  ) : subscribed && /* @__PURE__ */ jsx("div", { className: ` ${colClasses} ` });
                case "standard":
                case "offer":
                case "url":
                case "email":
                case "phone":
                  return /* @__PURE__ */ jsx("div", { className: ` ${colClasses} `, children: active_status ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        className: !url || !displayIcon ? "default" : "",
                        target: "_blank",
                        href: url || "#",
                        onClick: (e) => TrackIconClick(id),
                        children: /* @__PURE__ */ jsx("img", { src: displayIcon, alt: "" })
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { children: (name22 == null ? void 0 : name22.length) > 11 ? name22.substring(0, 11) + "..." : name22 || "Link Name" })
                  ] }) : "" });
              }
            })(),
            (type === "mailchimp" || type === "shopify") && /* @__PURE__ */ jsx(
              FormIcon,
              {
                colClasses,
                displayIcon,
                name: name22,
                active_status,
                dataRow,
                mainIndex: index2,
                setRow,
                value,
                setValue,
                index: index2,
                setClickType,
                clickType,
                type
              }
            ),
            subscribed && ((index2 + 1) % 4 === 0 || index2 + 1 === iconCount) ? /* @__PURE__ */ jsx(
              SubscribeForm,
              {
                dataRow,
                row,
                mailchimpListId,
                clickType,
                userId: user_id
              }
            ) : "",
            subscribed && ((index2 + 1) % 4 === 0 || index2 + 1 === iconCount) ? /* @__PURE__ */ jsx(
              StoreProducts,
              {
                dataRow,
                row,
                clickType,
                storeProducts
              }
            ) : "",
            subscribed && ((index2 + 1) % 4 === 0 || index2 + 1 === iconCount) ? /* @__PURE__ */ jsx("div", { className: `my_row folder ${dataRow == row && clickType === "folder" ? "open" : ""}`, children: /* @__PURE__ */ jsx("div", { className: "icons_wrap inner", children: dataRow == row ? accordionLinks == null ? void 0 : accordionLinks.map((innerLinkFull, index22) => {
              return /* @__PURE__ */ jsx(
                AccordionLinks,
                {
                  icons: innerLinkFull,
                  subStatus: subscribed
                },
                index22
              );
            }) : "" }) }) : ""
          ] }, index2);
        }) })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "my_row user_page_footer", children: /* @__PURE__ */ jsx("div", { className: "image_wrap", children: /* @__PURE__ */ jsxs("a", { href: route("register"), children: [
      /* @__PURE__ */ jsx("p", { children: "Powered By" }),
      /* @__PURE__ */ jsx("img", { src: Vapor.asset("/images/logo.png"), alt: "Link Pro" })
    ] }) }) })
  ] });
}
const __vite_glob_0_104 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LivePage
}, Symbol.toStringTag, { value: "Module" }));
const purchaseSubscription = (url, packets) => {
  return axios$1.post(url, packets).then(
    (response) => {
      console.log(response);
      const returnMessage = response.data.message;
      const success = response.data.success;
      const url2 = response.data.url;
      return {
        success,
        message: returnMessage,
        url: url2
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors) {
        EventBus.dispatch("error", { message: error.response.data.errors });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const cancelSubscription = (packets) => {
  return axios$1.put("/subscribe/cancel", packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      const success = response.data.success;
      const endsAt = response.data.ends_at || null;
      if (success) {
        EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      } else {
        EventBus.dispatch("error", { message: "There was an issue changing your plan." });
        console.log("ERROR:: ", returnMessage);
      }
      return {
        success,
        ends_at: endsAt
      };
    }
  ).catch((error) => {
    if (error.response) {
      EventBus.dispatch("error", { message: "There was an issue changing your plan." });
      console.log("catch ERROR:: ", error.response);
    } else {
      EventBus.dispatch("error", { message: "There was an issue changing your plan." });
      console.error("catch ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const changePlan = (packets) => {
  return axios$1.post("/subscribe/change-plan", packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      const success = response.data.success;
      const url = response.data.url;
      if (success) {
        EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      } else {
        EventBus.dispatch("error", { message: returnMessage });
      }
      return {
        success,
        message: returnMessage,
        url
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors) {
        EventBus.dispatch("error", { message: error.response.data.errors });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const resumeSubscription = (packets) => {
  return axios$1.post("/subscribe/resume", packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      const success = response.data.success;
      if (success) {
        EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      } else {
        EventBus.dispatch("error", { message: returnMessage });
      }
      return {
        success
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors) {
        EventBus.dispatch("error", { message: error.response.data.errors });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const updatePaymentMethod = (packets) => {
  return axios$1.post("/update-payment-method", packets).then(
    (response) => {
      const returnMessage = JSON.stringify(response.data.message);
      const success = response.data.success;
      if (success) {
        EventBus.dispatch("success", { message: returnMessage.replace("_", " ") });
      } else {
        EventBus.dispatch("error", { message: returnMessage.replace("_", " ") });
      }
      return {
        success
      };
    }
  ).catch((error) => {
    if (error.response !== void 0) {
      EventBus.dispatch(
        "error",
        { message: "There was an error updating your credit card." }
      );
      console.error("ERROR:: ", error.response.data);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const checkPromoCode = (packets) => {
  return axios$1.post("/subscribe/check-code", packets).then(
    (response) => {
      const message = response.data.message;
      const success = response.data.success;
      return {
        success,
        message
      };
    }
  ).catch((error) => {
    if (error.response) {
      if (error.response.data.errors) {
        EventBus.dispatch("error", { message: error.response.data.errors });
      } else {
        console.error(error.response);
      }
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const ConfirmChange = ({ confirmChange, setConfirmChange, setError, setShowLoader }) => {
  const { type, level } = confirmChange;
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setShowLoader({
      show: true,
      position: "absolute",
      icon: ""
    });
    const packets = {
      level
    };
    changePlan(packets).then((response) => {
      if (response.success) {
        router.get(response.url, { message: response.message });
      } else {
        setError({
          show: true,
          message: response.message
        });
        setConfirmChange({
          show: false,
          level: ""
        });
      }
      setShowLoader({
        show: false,
        position: "",
        icon: ""
      });
    });
  });
  const handleClose = useCallback((e) => {
    e.preventDefault();
    setConfirmChange({
      show: false,
      level: ""
    });
  });
  return /* @__PURE__ */ jsx("div", { id: "confirm_popup", children: /* @__PURE__ */ jsxs("div", { className: "content_wrap", children: [
    /* @__PURE__ */ jsx("div", { className: "icon_wrap check", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-circle-fill", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" }) }) }),
    /* @__PURE__ */ jsx("h2", { children: "Confirm" }),
    /* @__PURE__ */ jsxs("div", { className: "text_wrap", children: [
      /* @__PURE__ */ jsxs("p", { className: "confirm_text", children: [
        "Are you sure you want to ",
        /* @__PURE__ */ jsx("span", { id: "text_type", children: type }),
        " your plan?"
      ] }),
      /* @__PURE__ */ jsxs("form", { className: "button_row", action: "", method: "post", id: "popup_form", onSubmit: (e) => handleSubmit(e), children: [
        /* @__PURE__ */ jsx("input", { className: "level", name: "level", type: "hidden", value: "" }),
        /* @__PURE__ */ jsx("input", { className: "plan", name: "plan", type: "hidden", value: "" }),
        /* @__PURE__ */ jsxs("div", { className: "button_row flex gap-4 mt-5", children: [
          /* @__PURE__ */ jsx("button", { type: "submit", className: "button green", children: "Yes" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              className: "close_popup button transparent gray",
              href: "#",
              onClick: (e) => handleClose(e),
              children: "No"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
};
const __vite_glob_0_105 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmChange
}, Symbol.toStringTag, { value: "Module" }));
function Plans({ path }) {
  const { auth } = usePage().props;
  const subscriptionName = auth.user.subscription.name;
  const braintreeStatus = auth.user.subscription.braintree_status;
  const braintreeID = auth.user.subscription.braintree_id;
  const [showLoader, setShowLoader] = useState({
    show: false,
    icon: "",
    position: ""
  });
  const [error, setError] = useState({
    show: false,
    message: ""
  });
  const [confirmChange, setConfirmChange] = useState({
    show: false,
    type: "",
    level: ""
  });
  const handleOnClick = useCallback((e, type, level) => {
    e.preventDefault();
    setConfirmChange({
      show: true,
      type,
      level
    });
  });
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Subscription Plans" }),
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "my_row form_page plans text-center", children: [
      path.includes("create-page") ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h2", { className: "page_title !m-0", children: "Welcome to Link Pro!" }),
        /* @__PURE__ */ jsx("p", { className: "sub_title mb-5", children: "Continue free forever or upgrade for advanced features!" })
      ] }) : /* @__PURE__ */ jsx("h2", { className: "page_title", children: "Upgrade Now For Advanced Features!" }),
      /* @__PURE__ */ jsxs("div", { className: `card inline-block relative ${confirmChange.show && "active"} `, children: [
        showLoader.show && /* @__PURE__ */ jsx(
          Loader,
          {
            showLoader
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "card-body inline-block w-full", children: [
          error.show && /* @__PURE__ */ jsx("div", { className: "my_row block text-center mb-5 p-3 border rounded-lg border-red-500", children: /* @__PURE__ */ jsx("p", { className: "text-red-500", children: error.message }) }),
          confirmChange.show ? /* @__PURE__ */ jsx(
            ConfirmChange,
            {
              confirmChange,
              setConfirmChange,
              setError,
              setShowLoader
            }
          ) : /* @__PURE__ */ jsxs("div", { className: `my_row  ${subscriptionName === "premier" && (braintreeStatus === "active" || braintreeStatus === "pending") ? "two_columns" : "three_columns"}`, children: [
            !subscriptionName || subscriptionName !== "premier" || braintreeStatus !== "active" && braintreeStatus !== "pending" ? /* @__PURE__ */ jsxs("div", { className: "column pro", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-uppercase", children: "Pro" }),
              /* @__PURE__ */ jsxs("ul", { children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
                  /* @__PURE__ */ jsx("p", { children: "Free Features PLUS" })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
                  /* @__PURE__ */ jsx("p", { children: "Unlimited Icons" })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
                  /* @__PURE__ */ jsx("p", { children: "Group Icons In Folders" })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
                  /* @__PURE__ */ jsx("p", { children: "Custom Icons" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pricing", children: /* @__PURE__ */ jsxs("h3", { children: [
                /* @__PURE__ */ jsx("sup", { children: "$" }),
                "4.99",
                /* @__PURE__ */ jsx("span", { children: "/ mo" })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "button_row", children: subscriptionName === "pro" && (braintreeStatus === "active" || braintreeStatus === "pending") ? /* @__PURE__ */ jsx("span", { className: "button disabled", children: "Current" }) : braintreeStatus === "active" ? /* @__PURE__ */ jsx("button", { className: "button blue open_popup", "data-type": "downgrade", "data-level": "pro", children: "Downgrade My Plan" }) : /* @__PURE__ */ jsx(Link$1, { className: "button blue_gradient", href: "/subscribe?plan=pro", children: "Get Pro" }) })
            ] }) : "",
            /* @__PURE__ */ jsxs("div", { className: "column premier", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-uppercase", children: "Premier" }),
              /* @__PURE__ */ jsxs("ul", { children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
                  /* @__PURE__ */ jsx("p", { children: "Pro Features PLUS" })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
                  /* @__PURE__ */ jsx("p", { children: "Up to 5 Unique Links" })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
                  /* @__PURE__ */ jsx("p", { children: "Password Protected Links" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pricing", children: /* @__PURE__ */ jsxs("h3", { children: [
                /* @__PURE__ */ jsx("sup", { children: "$" }),
                "19.99",
                /* @__PURE__ */ jsx("span", { children: "/ mo" })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "button_row", children: subscriptionName === "premier" && (braintreeStatus === "active" || braintreeStatus === "pending") ? /* @__PURE__ */ jsx("span", { className: "button disabled", children: "Current" }) : subscriptionName && (braintreeStatus === "active" || braintreeStatus === "pending") && braintreeID !== "bypass" ? /* @__PURE__ */ jsx(
                "button",
                {
                  className: "open_popup button black_gradient",
                  onClick: (e) => handleOnClick(e, "upgrade", "premier"),
                  children: "Go Premier"
                }
              ) : /* @__PURE__ */ jsx(Link$1, { className: "button black_gradient", href: "/subscribe?plan=premier", children: "Go Premier" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "column custom", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-uppercase", children: "Custom" }),
              /* @__PURE__ */ jsxs("ul", { children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
                  /* @__PURE__ */ jsx("p", { children: "Unlimited Links" })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
                  /* @__PURE__ */ jsx("p", { children: "Dedicated Account Manager" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pricing", children: /* @__PURE__ */ jsx("h3", { children: "ASK" }) }),
              /* @__PURE__ */ jsx("div", { className: "button_row", children: /* @__PURE__ */ jsx("a", { className: "button gray_gradient", href: "mailto:admin@link.pro", children: "Contact Us" }) })
            ] })
          ] }),
          path.includes("create-page") && /* @__PURE__ */ jsx("div", { className: "my_row", children: /* @__PURE__ */ jsxs("div", { className: "column free plans_page", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-uppercase", children: "Free" }),
            /* @__PURE__ */ jsxs("div", { className: "my_row three_columns", children: [
              /* @__PURE__ */ jsxs("div", { className: "column", children: [
                /* @__PURE__ */ jsx("h4", { children: "Having trouble choosing?" }),
                /* @__PURE__ */ jsx("p", { children: "No Problem! Continue now free and upgrade later!" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "column", children: /* @__PURE__ */ jsxs("ul", { children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
                  /* @__PURE__ */ jsx("p", { children: "1 Unique Link" })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
                  /* @__PURE__ */ jsx("p", { children: "Up To 8 Icons" })
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
                  /* @__PURE__ */ jsx("p", { children: "Add Social Links" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "column", children: /* @__PURE__ */ jsx(Link$1, { className: "button green_gradient", href: route("dashboard"), children: "Continue" }) })
            ] })
          ] }) })
        ] })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_106 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Plans
}, Symbol.toStringTag, { value: "Module" }));
const PreRegister = () => {
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Pre Register" }),
    /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "page_title", children: "Pages" }),
      /* @__PURE__ */ jsxs("section", { id: "pre_register", className: "card edit_page", children: [
        /* @__PURE__ */ jsx("h3", { children: "Build a LinkPro Page to create one link to promote all of your social media account." }),
        /* @__PURE__ */ jsx("h3", { children: "Plus create your own Courses or market existing Courses for a revenue share!" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "number", children: "1" }),
            /* @__PURE__ */ jsxs("div", { className: "text_wrap", children: [
              /* @__PURE__ */ jsx("h4", { children: "Create your LinkPro Page" }),
              /* @__PURE__ */ jsx("p", { children: "Add images, text and all of your social media or contact icons to your Page." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "number", children: "2" }),
            /* @__PURE__ */ jsxs("div", { className: "text_wrap", children: [
              /* @__PURE__ */ jsx("h4", { children: "Share your Page" }),
              /* @__PURE__ */ jsx("p", { children: "Add your Page link to any social or email accounts to link all of your followers with one simple link." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "number", children: "3" }),
            /* @__PURE__ */ jsxs("div", { className: "text_wrap", children: [
              /* @__PURE__ */ jsx("h4", { children: "Create or market LinkPro Courses" }),
              /* @__PURE__ */ jsx("p", { children: "After creating your Page, create your own video Courses or market other public Courses to generate Income" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("a", { className: "button blue w-full", href: route("create.page"), children: "Get Started!" })
      ] })
    ] })
  ] });
};
const __vite_glob_0_107 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PreRegister
}, Symbol.toStringTag, { value: "Module" }));
function DangerButton({ className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function Modal({ children, show = false, maxWidth = "2xl", closeable = true, onClose = () => {
} }) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl"
  }[maxWidth];
  return /* @__PURE__ */ jsx(Transition, { show, as: Fragment$1, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all",
      onClose: close,
      children: [
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            as: Fragment$1,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            as: Fragment$1,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              Dialog.Panel,
              {
                className: `mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`,
                children
              }
            )
          }
        )
      ]
    }
  ) });
}
function SecondaryButton({ type = "button", className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: `inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function DeleteUserForm({ className = "" }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Delete Account" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain." })
    ] }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: "Delete Account" }),
    /* @__PURE__ */ jsx(Modal, { show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Are you sure you want to delete your account?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password", className: "sr-only" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            className: "mt-1 block w-3/4",
            isFocused: true,
            placeholder: "Password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: "Cancel" }),
        /* @__PURE__ */ jsx(DangerButton, { className: "ml-3", disabled: processing, children: "Delete Account" })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_109 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdatePasswordForm({ className = "" }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Update Password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Ensure your account is using a long, random password to stay secure." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "current_password", value: "Current Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "current_password",
            ref: currentPasswordInput,
            value: data.current_password,
            onChange: (e) => setData("current_password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "current-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.current_password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "New Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            value: data.password_confirmation,
            onChange: (e) => setData("password_confirmation", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_110 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({ mustVerifyEmail, status, className = "" }) {
  const user2 = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user2.name,
    email: user2.email
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Profile Information" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Update your account's profile information and email address." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      mustVerifyEmail && user2.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm mt-2 text-gray-800", children: [
          "Your email address is unverified.",
          /* @__PURE__ */ jsx(
            Link$1,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              children: "Click here to re-send the verification email."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 font-medium text-sm text-green-600", children: "A new verification link has been sent to your email address." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_111 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function Edit({ auth, mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_108 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
const CreatePageForm = ({ pageNames }) => {
  const [newPageName, setNewPageName] = useState(null);
  const [available, setAvailability] = useState(false);
  const [regexMatch, setRegexMatch] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (available) {
      const packets = {
        name: newPageName,
        createPage: true
      };
      addPage(packets).then((data) => {
        if (data.success) {
          router.get("/plans");
        }
      });
    }
  };
  const checkPageName = (e) => {
    let value = e.target.value.toLowerCase();
    const match = pageNames.indexOf(value);
    const regex = /^[A-Za-z0-9-_.]+$/;
    setRegexMatch(regex.test(value));
    if (match < 0 && value.length > 2 && regex.test(value)) {
      setAvailability(true);
    } else {
      setAvailability(false);
    }
    setNewPageName(value);
  };
  return /* @__PURE__ */ jsxs("form", { className: "new_page", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-start link_name", children: [
      !regexMatch && /* @__PURE__ */ jsx("p", { className: "status not_available char_message register_page", children: "Only letters, numbers, dashes, underscores, periods allowed" }),
      /* @__PURE__ */ jsx("span", { className: "pt-1 label", children: "Link.pro/" }),
      /* @__PURE__ */ jsxs("div", { className: "input_wrap relative", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "animate",
            name: "name",
            type: "text",
            onChange: checkPageName,
            onKeyDown: (event) => {
              if (event.key === "Enter") {
                handleSubmit(event);
              }
            },
            required: true
          }
        ),
        /* @__PURE__ */ jsx("label", { children: "Link Name" }),
        available ? /* @__PURE__ */ jsx(
          "a",
          {
            className: "submit_circle",
            href: "resources/js/Pages/Register/Components/CreatePageForm#",
            onClick: (e) => handleSubmit(e),
            children: /* @__PURE__ */ jsx(FiThumbsUp, {})
          }
        ) : /* @__PURE__ */ jsx("span", { className: "cancel_icon", children: /* @__PURE__ */ jsx(FiThumbsDown, {}) }),
        /* @__PURE__ */ jsx("p", { className: "status", children: available ? "Available" : /* @__PURE__ */ jsx("span", { className: "status not_available", children: "Not Available" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "my_row button_row", children: /* @__PURE__ */ jsx("button", { className: "button blue", type: "submit", children: "Submit" }) })
  ] });
};
const __vite_glob_0_112 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreatePageForm
}, Symbol.toStringTag, { value: "Module" }));
const FormButtons = () => {
  return /* @__PURE__ */ jsxs("div", { className: "my_row button_row", children: [
    /* @__PURE__ */ jsx("a", { href: "/plans", className: "button transparent gray", children: "Skip" }),
    /* @__PURE__ */ jsx("button", { className: "button blue", type: "submit", children: "Continue" })
  ] });
};
const __vite_glob_0_114 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FormButtons
}, Symbol.toStringTag, { value: "Module" }));
const Facebook = ({ setStep, pageId }) => {
  const [facebookUser, setFacebookUser] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const packets = {
      name: "Facebook",
      url: "https://facebook.com/" + facebookUser,
      icon: "https://lp-production-images.s3.us-east-2.amazonaws.com/icons/Facebook.png",
      page_id: pageId,
      folder_id: null
    };
    addLink(packets).then((data) => {
      if (data.success) {
        setStep("instagram");
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("h3", { children: "Add Your Facebook account" }) }),
    /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsx("div", { className: "form_wrap", children: /* @__PURE__ */ jsxs("form", { className: "register_page my_row", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-center align-items-flex-start link_name", children: [
        /* @__PURE__ */ jsx("label", { className: "pt-1", children: "facebook.com/" }),
        /* @__PURE__ */ jsx("div", { className: "input_wrap", children: /* @__PURE__ */ jsx(
          "input",
          {
            name: "name",
            type: "text",
            placeholder: "Facebook Username",
            onChange: (e) => setFacebookUser(e.target.value),
            onKeyDown: (event) => {
              if (event.key === "Enter") {
                handleSubmit(event);
              }
            },
            value: facebookUser,
            required: true
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(FormButtons, {})
    ] }) }) })
  ] });
};
const __vite_glob_0_113 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Facebook
}, Symbol.toStringTag, { value: "Module" }));
const Instagram = ({ setStep, pageId }) => {
  const [igUser, setIgUser] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const packets = {
      name: "Instagram",
      url: "https://www.instagram.com/" + igUser,
      icon: "https://lp-production-images.s3.us-east-2.amazonaws.com/icons/Instagram.png",
      page_id: pageId,
      folder_id: null
    };
    addLink(packets).then((data) => {
      if (data.success) {
        setStep("twitter");
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("h3", { children: "Add Your Instagram account" }) }),
    /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsx("div", { className: "form_wrap", children: /* @__PURE__ */ jsxs("form", { className: "new_page", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-center align-items-flex-start link_name", children: [
        /* @__PURE__ */ jsx("label", { className: "pt-1", children: "instagram.com/" }),
        /* @__PURE__ */ jsx("div", { className: "input_wrap", children: /* @__PURE__ */ jsx(
          "input",
          {
            name: "name",
            type: "text",
            placeholder: "Instagram Username",
            onChange: (e) => setIgUser(e.target.value),
            onKeyDown: (event) => {
              if (event.key === "Enter") {
                handleSubmit(event);
              }
            },
            value: igUser,
            required: true
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(FormButtons, {})
    ] }) }) })
  ] });
};
const __vite_glob_0_115 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Instagram
}, Symbol.toStringTag, { value: "Module" }));
const Twitter = ({ setStep, pageId }) => {
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const packets = {
      name: "Twitter",
      url: "https://twitter.com/" + username,
      icon: "https://lp-production-images.s3.us-east-2.amazonaws.com/icons/Twitter.png",
      page_id: pageId,
      folder_id: null
    };
    addLink(packets).then((data) => {
      if (data.success) {
        setStep("tiktok");
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("h3", { children: "Add Your Twitter account" }) }),
    /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsx("div", { className: "form_wrap", children: /* @__PURE__ */ jsxs("form", { className: "new_page", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-center align-items-flex-start link_name", children: [
        /* @__PURE__ */ jsx("label", { className: "pt-1", children: "twitter.com/" }),
        /* @__PURE__ */ jsx("div", { className: "input_wrap", children: /* @__PURE__ */ jsx(
          "input",
          {
            name: "name",
            type: "text",
            placeholder: "Twitter Username",
            onChange: (e) => setUsername(e.target.value),
            onKeyDown: (event) => {
              if (event.key === "Enter") {
                handleSubmit(event);
              }
            },
            value: username,
            required: true
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(FormButtons, {})
    ] }) }) })
  ] });
};
const __vite_glob_0_118 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Twitter
}, Symbol.toStringTag, { value: "Module" }));
const TikTok = ({ pageId }) => {
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const packets = {
      name: "TikTok",
      url: "https://www.tiktok.com/" + username,
      icon: "https://lp-production-images.s3.us-east-2.amazonaws.com/icons/TikTok.png",
      page_id: pageId,
      folder_id: null
    };
    addLink(packets).then((data) => {
      if (data.success) {
        window.location.href = "/plans";
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("h3", { children: "Add Your TikTok account" }) }),
    /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsx("div", { className: "form_wrap", children: /* @__PURE__ */ jsxs("form", { className: "new_page", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-center align-items-flex-start link_name", children: [
        /* @__PURE__ */ jsx("label", { className: "pt-1", children: "tiktok.com/" }),
        /* @__PURE__ */ jsx("div", { className: "input_wrap", children: /* @__PURE__ */ jsx(
          "input",
          {
            name: "name",
            type: "text",
            placeholder: "TikTok Username",
            onChange: (e) => setUsername(e.target.value),
            onKeyDown: (event) => {
              if (event.key === "Enter") {
                handleSubmit(event);
              }
            },
            value: username,
            required: true
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(FormButtons, {})
    ] }) }) })
  ] });
};
const __vite_glob_0_117 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TikTok
}, Symbol.toStringTag, { value: "Module" }));
const SocialMediaForms = ({ pageId, step, setStep }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: (() => {
    switch (step) {
      case "facebook":
        return /* @__PURE__ */ jsx(
          Facebook,
          {
            setStep,
            pageId
          }
        );
      case "instagram":
        return /* @__PURE__ */ jsx(
          Instagram,
          {
            setStep,
            pageId
          }
        );
      case "twitter":
        return /* @__PURE__ */ jsx(
          Twitter,
          {
            setStep,
            pageId
          }
        );
      case "tiktok":
        return /* @__PURE__ */ jsx(
          TikTok,
          {
            pageId
          }
        );
      default:
        return null;
    }
  })() });
};
const __vite_glob_0_116 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SocialMediaForms
}, Symbol.toStringTag, { value: "Module" }));
function CreatePage({ pageNames }) {
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Create Page" }),
    /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "page_title mb-0", children: "Choose Your Link Name" }),
      /* @__PURE__ */ jsx("div", { id: "create_page", className: "my_row form_page edit_form register", children: /* @__PURE__ */ jsx("div", { className: "card guest", children: /* @__PURE__ */ jsx(
        CreatePageForm,
        {
          pageNames
        }
      ) }) })
    ] })
  ] });
}
const __vite_glob_0_119 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreatePage
}, Symbol.toStringTag, { value: "Module" }));
const AccordionData = [
  {
    id: 0,
    title: "Page Tabs",
    content: "View and edit all of your LinkPro Pages with this tabulated layout. The Tab name is the name of the LinkPro Page being edited. FREE and PRO users are limited to one page while PREMIER users can add up to 5 Pages by clicking the + tab.",
    subTitle: "Pro Tip!",
    subContent: "Many influencers and businesses utilize multiple pages for internal links, special offers, content, or sweepstakes for their followers.",
    image: "setup-new-page1.jpg"
  },
  {
    id: 1,
    title: "Page Name",
    content: "The text in this field is the name of your page and is appended to “link.pro/” to create the URL for a user’s Page (e.g. link.pro/SETUP).  This unique link is chosen upon first setting up a LinkPro Page and is always visible in the Dashboard view. Users are free to change this at any time if the name is not already taken by another user.",
    subTitle: "Pro Tip!",
    subContent: "Choosing a simple Page Name that reflects your content makes your LinkPro URL more informative for your audience.",
    image: "setup-page-name.jpg"
  },
  {
    id: 2,
    title: "Page Protection",
    content: "This option allows PRO and PREMIER users to restrict access to their Page/s for those with the access code. Selecting this option means that only people with an access code can view your LinkPro Page. The access code is required to have a minimum of 4 alpha-numeric characters/symbols.",
    subTitle: "Pro Tip!",
    subContent: "Password protecting a page is useful for promotional offers, exclusive content, and companies with internal information accessible to employees and not the general public.",
    image: "setup-password.jpg"
  },
  {
    id: 3,
    title: "Header Image",
    content: "Where users upload a background header image for their Page. After selecting a file (.jpg, .jpeg, .png, .gif) to upload, users can resize the image to perfection using the built-in cropping functionality.",
    subTitle: null,
    subContent: null,
    image: "setup-header-img.jpg"
  },
  {
    id: 4,
    title: "Profile Image",
    content: "Where users upload a profile image for their Page. After selecting a file (.jpg, .jpeg, .png, .gif) to upload, users can resize the image to perfection using the built-in cropping functionality.",
    subTitle: "Pro Tip!",
    subContent: "A square profile image will be cropped to a circular shape on your page. Choose an image that will appropriately fit a circular shape!",
    image: "setup-profile-img.jpg"
  },
  {
    id: 5,
    title: "Page-Title Text",
    content: "Add a brief title to your Page (30 character max). The text is bold and displayed directly below the header image to provide viewers with a title for the content you add to your Page.",
    subTitle: "Pro Tip!",
    subContent: "A shorter Page-Title allows viewers to see more icons quicker!",
    image: "setup-page-title.jpg"
  },
  {
    id: 6,
    title: "Page-Bio Text",
    content: "Description text displayed directly below the Page Title to provide your followers a brief bio or slogan for your Page. (60 character max).",
    subTitle: "Pro Tip!",
    subContent: "A shorter Page-Bio allows viewers to see more icons quicker!",
    image: "setup-page-bio.jpg"
  },
  {
    id: 7,
    title: "Icon Section",
    content: "This section is where users add and edit icons on their Page. Clicking an icon’s edit button opens up the editing panel. FREE users are allowed to select an existing icon and enter their URL for that icon. PRO and PREMIER users have the option of using an existing icon or creating their own custom icon. To create a custom icon, a user uploads an image which is used as the icon image. The URL for the custom icon can be anything. Additionally, PRO and PREMIER users can enter a custom icon title for their custom icon. FREE users are allowed up to 8 icons, while PRO and PREMIER enjoy unlimited.  Icons can be rearranged by clicking on the two lines and dragging to the desired location.",
    subTitle: "Pro Tip!",
    subContent: "Add Icons for all of your social media accounts, websites, stores, blogs, emails, phones, music platforms, etc.. Use your own logo on a custom icon to make your website look like an app. Showcase certain links by putting them first!",
    image: "setup-add-icon.jpg"
  },
  {
    id: 8,
    title: "Website Header Links",
    content: "These links are where users upgrade/downgrade their membership, update username/password, update payment method, contact support, or log out.",
    subTitle: null,
    subContent: null,
    image: "setup-menu.jpg"
  },
  {
    id: 9,
    title: "Page Preview",
    content: "See exactly how your Page will look to a mobile user live and in real time as you make updates. When you like what you see, you are finished!",
    subTitle: "Pro Tip!",
    subContent: "Make sure to test all of your icons on your active link to be sure everything is working as you would expect!",
    image: "setup-preview.jpg"
  },
  {
    id: 10,
    title: "Add Folder",
    content: "This section is where users can add folders to their Page. This feature is for PRO and Premier users only. Clicking Add Folder adds a new folder and opens up the folder for editing. Here you can follow the same guidelines to add icons inside the folder as explained above. You can also delete the folder from here as well. A folder can't be enabled unless there is at least 1 icon added",
    subTitle: null,
    subContent: null,
    image: "setup-add-folder.jpg"
  }
];
const __vite_glob_0_120 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AccordionData
}, Symbol.toStringTag, { value: "Module" }));
const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index2) => {
    if (activeIndex === index2) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index2);
    }
    setTimeout(function() {
      document.querySelector(".accordion-content.open").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }, 400);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "accordion_row my_row top_row", children: /* @__PURE__ */ jsxs("div", { className: "content_wrap", children: [
      /* @__PURE__ */ jsx("div", { className: "logo_wrap", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/logo.png"), alt: "" }) }),
      /* @__PURE__ */ jsxs("div", { className: "title_wrap my_row", children: [
        /* @__PURE__ */ jsxs("div", { className: "title my_row", onClick: (e) => {
          handleClick(8);
        }, children: [
          /* @__PURE__ */ jsx("div", { className: "number", children: /* @__PURE__ */ jsx("h5", { children: "11" }) }),
          /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/" + AccordionData[8].image), alt: "" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: activeIndex === 8 ? "accordion-content open" : "accordion-content", children: /* @__PURE__ */ jsx("p", { children: AccordionData[8].content }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "two_columns my_row", children: [
      /* @__PURE__ */ jsxs("div", { className: "column", children: [
        /* @__PURE__ */ jsxs("div", { className: "my_row accordion_row", children: [
          /* @__PURE__ */ jsx("div", { className: "title_wrap my_row", children: /* @__PURE__ */ jsxs("div", { className: "title my_row", onClick: (e) => {
            handleClick(0);
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "number", children: /* @__PURE__ */ jsx("h5", { children: "1" }) }),
            /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/" + AccordionData[0].image), alt: "" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "accordion_content_wrap", children: /* @__PURE__ */ jsxs("div", { className: activeIndex === 0 ? "accordion-content open" : "accordion-content", children: [
            /* @__PURE__ */ jsx("p", { children: AccordionData[0].content }),
            AccordionData[0].subTitle && /* @__PURE__ */ jsx("h5", { children: AccordionData[0].subTitle }),
            AccordionData[0].subContent && /* @__PURE__ */ jsx("p", { children: AccordionData[0].subContent })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "my_row accordion_row", children: [
          /* @__PURE__ */ jsx("div", { className: "title_wrap my_row", children: /* @__PURE__ */ jsxs("div", { className: "title my_row", onClick: (e) => {
            handleClick(1);
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "number", children: /* @__PURE__ */ jsx("h5", { children: "2" }) }),
            /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/" + AccordionData[1].image), alt: "" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "accordion_content_wrap", children: /* @__PURE__ */ jsxs("div", { className: activeIndex === 1 ? "accordion-content open" : "accordion-content", children: [
            /* @__PURE__ */ jsx("p", { children: AccordionData[1].content }),
            AccordionData[1].subTitle && /* @__PURE__ */ jsx("h5", { children: AccordionData[1].subTitle }),
            AccordionData[1].subContent && /* @__PURE__ */ jsx("p", { children: AccordionData[1].subContent })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "my_row accordion_row", children: [
          /* @__PURE__ */ jsx("div", { className: "title_wrap my_row", children: /* @__PURE__ */ jsxs("div", { className: "title my_row", onClick: (e) => {
            handleClick(2);
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "number", children: /* @__PURE__ */ jsx("h5", { children: "3" }) }),
            /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/" + AccordionData[2].image), alt: "" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "accordion_content_wrap", children: /* @__PURE__ */ jsxs("div", { className: activeIndex === 2 ? "accordion-content open" : "accordion-content", children: [
            /* @__PURE__ */ jsx("p", { children: AccordionData[2].content }),
            AccordionData[2].subTitle && /* @__PURE__ */ jsx("h5", { children: AccordionData[2].subTitle }),
            AccordionData[2].subContent && /* @__PURE__ */ jsx("p", { children: AccordionData[2].subContent })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "my_row accordion_row", children: [
          /* @__PURE__ */ jsx("div", { className: "title_wrap my_row", children: /* @__PURE__ */ jsxs("div", { className: "title my_row", onClick: (e) => {
            handleClick(3);
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "number", children: /* @__PURE__ */ jsx("h5", { children: "4" }) }),
            /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/" + AccordionData[3].image), alt: "" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "accordion_content_wrap", children: /* @__PURE__ */ jsxs("div", { className: activeIndex === 3 ? "accordion-content open" : "accordion-content", children: [
            /* @__PURE__ */ jsx("p", { children: AccordionData[3].content }),
            AccordionData[3].subTitle && /* @__PURE__ */ jsx("h5", { children: AccordionData[3].subTitle }),
            AccordionData[3].subContent && /* @__PURE__ */ jsx("p", { children: AccordionData[3].subContent })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "my_row accordion_row", children: [
          /* @__PURE__ */ jsx("div", { className: "title_wrap my_row", children: /* @__PURE__ */ jsxs("div", { className: "title my_row", onClick: (e) => {
            handleClick(4);
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "number", children: /* @__PURE__ */ jsx("h5", { children: "5" }) }),
            /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/" + AccordionData[4].image), alt: "" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "accordion_content_wrap", children: /* @__PURE__ */ jsxs("div", { className: activeIndex === 4 ? "accordion-content open" : "accordion-content", children: [
            /* @__PURE__ */ jsx("p", { children: AccordionData[4].content }),
            AccordionData[4].subTitle && /* @__PURE__ */ jsx("h5", { children: AccordionData[4].subTitle }),
            AccordionData[4].subContent && /* @__PURE__ */ jsx("p", { children: AccordionData[4].subContent })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "my_row accordion_row", children: [
          /* @__PURE__ */ jsx("div", { className: "title_wrap my_row", children: /* @__PURE__ */ jsxs("div", { className: "title my_row", onClick: (e) => {
            handleClick(5);
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "number", children: /* @__PURE__ */ jsx("h5", { children: "6" }) }),
            /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/" + AccordionData[5].image), alt: "" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "accordion_content_wrap", children: /* @__PURE__ */ jsxs("div", { className: activeIndex === 5 ? "accordion-content open" : "accordion-content", children: [
            /* @__PURE__ */ jsx("p", { children: AccordionData[5].content }),
            AccordionData[5].subTitle && /* @__PURE__ */ jsx("h5", { children: AccordionData[5].subTitle }),
            AccordionData[5].subContent && /* @__PURE__ */ jsx("p", { children: AccordionData[5].subContent })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "my_row accordion_row", children: [
          /* @__PURE__ */ jsx("div", { className: "title_wrap my_row", children: /* @__PURE__ */ jsxs("div", { className: "title my_row", onClick: (e) => {
            handleClick(6);
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "number", children: /* @__PURE__ */ jsx("h5", { children: "7" }) }),
            /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/" + AccordionData[6].image), alt: "" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "accordion_content_wrap", children: /* @__PURE__ */ jsxs("div", { className: activeIndex === 6 ? "accordion-content open" : "accordion-content", children: [
            /* @__PURE__ */ jsx("p", { children: AccordionData[6].content }),
            AccordionData[6].subTitle && /* @__PURE__ */ jsx("h5", { children: AccordionData[6].subTitle }),
            AccordionData[6].subContent && /* @__PURE__ */ jsx("p", { children: AccordionData[6].subContent })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "my_row button_row", children: /* @__PURE__ */ jsx("span", { className: "button_wrap", children: /* @__PURE__ */ jsx("span", { children: "OPEN LIVE PAGE" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "my_row accordion_row", children: [
          /* @__PURE__ */ jsx("div", { className: "title_wrap my_row", children: /* @__PURE__ */ jsxs("div", { className: "title my_row", onClick: (e) => {
            handleClick(7);
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "number", children: /* @__PURE__ */ jsx("h5", { children: "8" }) }),
            /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/" + AccordionData[7].image), alt: "" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "accordion_content_wrap", children: /* @__PURE__ */ jsxs("div", { className: activeIndex === 7 ? "accordion-content open" : "accordion-content", children: [
            /* @__PURE__ */ jsx("p", { children: AccordionData[7].content }),
            AccordionData[7].subTitle && /* @__PURE__ */ jsx("h5", { children: AccordionData[7].subTitle }),
            AccordionData[7].subContent && /* @__PURE__ */ jsx("p", { children: AccordionData[7].subContent })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "my_row accordion_row", children: [
          /* @__PURE__ */ jsx("div", { className: "title_wrap my_row", children: /* @__PURE__ */ jsxs("div", { className: "title my_row", onClick: (e) => {
            handleClick(10);
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "number", children: /* @__PURE__ */ jsx("h5", { children: "9" }) }),
            /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/" + AccordionData[10].image), alt: "" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "accordion_content_wrap", children: /* @__PURE__ */ jsxs("div", { className: activeIndex === 10 ? "accordion-content open" : "accordion-content", children: [
            /* @__PURE__ */ jsx("p", { children: AccordionData[10].content }),
            AccordionData[10].subTitle && /* @__PURE__ */ jsx("h5", { children: AccordionData[10].subTitle }),
            AccordionData[10].subContent && /* @__PURE__ */ jsx("p", { children: AccordionData[10].subContent })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "column", children: /* @__PURE__ */ jsxs("div", { className: "my_row accordion_row", children: [
        /* @__PURE__ */ jsx("div", { className: "title_wrap my_row", children: /* @__PURE__ */ jsxs("div", { className: "title my_row", onClick: (e) => {
          handleClick(9);
        }, children: [
          /* @__PURE__ */ jsx("div", { className: "number", children: /* @__PURE__ */ jsx("h5", { children: "10" }) }),
          /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/" + AccordionData[9].image), alt: "" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: activeIndex === 9 ? "accordion-content open" : "accordion-content", children: [
          /* @__PURE__ */ jsx("p", { children: AccordionData[9].content }),
          AccordionData[9].subTitle && /* @__PURE__ */ jsx("h5", { children: AccordionData[9].subTitle }),
          AccordionData[9].subContent && /* @__PURE__ */ jsx("p", { children: AccordionData[9].subContent })
        ] })
      ] }) })
    ] })
  ] });
};
const __vite_glob_0_121 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Accordion
}, Symbol.toStringTag, { value: "Module" }));
function Index() {
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Setup" }),
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "my_row setup_page", children: [
      /* @__PURE__ */ jsx("h2", { className: "page_title", children: "Setup" }),
      /* @__PURE__ */ jsx("div", { className: "card inline-block", children: /* @__PURE__ */ jsx("div", { id: "setup", className: "inline-block", children: /* @__PURE__ */ jsx("div", { className: "my_row content_wrap", children: /* @__PURE__ */ jsx("div", { className: "accordion", children: /* @__PURE__ */ jsx(Accordion, {}) }) }) }) })
    ] }) })
  ] });
}
const __vite_glob_0_122 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const ColumnComponent = ({
  section: section2,
  dataRow,
  indexValue,
  setIndexValue,
  index: index2,
  course,
  hasCourseAccess,
  affRef,
  clickId,
  creator,
  page
}) => {
  const {
    type,
    text: text2,
    text_color,
    video_title,
    video_link,
    background_color,
    button,
    button_position,
    button_text,
    button_text_color,
    button_color,
    button_size,
    lock_video
  } = section2;
  const { slug, header_color, header_text_color } = course;
  let additionalVars = "";
  if (affRef && clickId) {
    additionalVars = "?a=" + affRef + "&cid=" + clickId;
  }
  const buttonUrl = window.location.protocol + "//" + window.location.host + "/" + creator + "/course/" + slug + "/checkout" + additionalVars;
  const [imagePlaceholder, setImagePlaceholder] = useState(null);
  const [mobileVideo, setMobileVideo] = useState(null);
  const [buttonStyle, setButtonStyle] = useState(null);
  useEffect(() => {
    if (type === "video" && video_link) {
      let split;
      if (video_link.includes("youtube")) {
        split = video_link.split("/embed/");
        setImagePlaceholder("https://img.youtube.com/vi/" + split[1] + "/mqdefault.jpg");
      } else {
        split = video_link.split("/video/");
        setImagePlaceholder("https://vumbnail.com/" + split[1] + ".jpg");
      }
    }
  }, []);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 551) {
        setIndexValue(null);
      } else {
        setMobileVideo(null);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (button) {
      let maxWidth = "auto";
      if (window.innerWidth > 550) {
        maxWidth = "250px";
      }
      setButtonStyle({
        background: button_color,
        color: button_text_color,
        width: button_size + "%",
        maxWidth
      });
    }
  }, []);
  const handleOnClick = (e) => {
    e.preventDefault();
    if (hasCourseAccess || !lock_video) {
      const clickedDiv = e.currentTarget.parentNode;
      if (window.innerWidth < 551) {
        setMobileVideo(true);
      } else {
        if (clickedDiv.classList.contains("open")) {
          setIndexValue(null);
        } else {
          setIndexValue(clickedDiv.firstChild.dataset.index);
          setTimeout(function() {
            document.querySelector(".video_viewer").scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            });
          }, 600);
        }
      }
    }
  };
  const Button = () => {
    return /* @__PURE__ */ jsx("div", { className: `button_wrap ${button_position ? button_position : "above"}`, children: /* @__PURE__ */ jsx(
      "a",
      {
        href: buttonUrl,
        target: "_blank",
        className: "button",
        style: buttonStyle,
        children: button_text || "Get Course"
      }
    ) });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `column ${type} ${index2 == indexValue ? "open" : ""}`,
      style: { background: background_color },
      children: [
        type === "video" ? mobileVideo ? /* @__PURE__ */ jsx("div", { className: "my_row folder open", children: /* @__PURE__ */ jsx("div", { className: "video_wrapper", children: /* @__PURE__ */ jsx("iframe", { src: video_link, allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;", allowFullScreen: true }) }) }) : (hasCourseAccess || !lock_video) && page !== "lander" ? /* @__PURE__ */ jsxs(
          "a",
          {
            className: "my_row relative",
            href: "#",
            "data-video": video_link,
            "data-index": index2,
            "data-row": dataRow,
            onClick: (e) => handleOnClick(e),
            children: [
              /* @__PURE__ */ jsx("span", { className: "image_wrap my_row", children: /* @__PURE__ */ jsx("img", { src: imagePlaceholder, alt: "" }) }),
              /* @__PURE__ */ jsx("span", { className: "play_icon", children: /* @__PURE__ */ jsx(FaCirclePlay, {}) })
            ]
          }
        ) : /* @__PURE__ */ jsxs("span", { className: "image_wrap my_row", children: [
          /* @__PURE__ */ jsx("img", { className: "locked", src: imagePlaceholder, alt: "" }),
          /* @__PURE__ */ jsxs("div", { className: "text-center locked_content", style: { color: "rgb(255,255,255)" }, children: [
            /* @__PURE__ */ jsx(BiLock, {}),
            /* @__PURE__ */ jsxs("p", { children: [
              "Unlock this video",
              /* @__PURE__ */ jsx("br", {}),
              "by purchasing this course"
            ] }),
            /* @__PURE__ */ jsx("a", { className: "button", href: buttonUrl, style: { background: header_color, color: header_text_color }, children: "Purchase Now" })
          ] })
        ] }) : "",
        /* @__PURE__ */ jsxs("div", { className: "my_row text_wrap", children: [
          type === "video" && /* @__PURE__ */ jsx("h3", { style: { color: text_color }, children: video_title }),
          (!hasCourseAccess || page === "lander") && (button && button_position === "above") ? /* @__PURE__ */ jsx(Button, {}) : "",
          /* @__PURE__ */ jsx("p", { style: { color: text_color }, children: text2 }),
          (!hasCourseAccess || page === "lander") && (button && button_position === "below") ? /* @__PURE__ */ jsx(Button, {}) : ""
        ] })
      ]
    }
  );
};
const __vite_glob_0_123 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ColumnComponent
}, Symbol.toStringTag, { value: "Module" }));
const VideoComponent = ({ indexValue, sections }) => {
  return /* @__PURE__ */ jsx("div", { className: "video_viewer my_row", children: /* @__PURE__ */ jsxs("div", { className: "video_content", style: { background: sections[indexValue].background_color }, children: [
    /* @__PURE__ */ jsx("div", { className: `my_row folder open`, children: /* @__PURE__ */ jsx("div", { className: "video_wrapper", children: /* @__PURE__ */ jsx("iframe", { src: sections[indexValue].video_link, frameBorder: "0", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;", allowFullScreen: true }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "video_description my_row", children: [
      /* @__PURE__ */ jsx("h3", { style: { color: sections[indexValue].text_color }, children: sections[indexValue].video_title }),
      /* @__PURE__ */ jsx("p", { style: { color: sections[indexValue].text_color }, children: sections[indexValue].text })
    ] })
  ] }) });
};
const __vite_glob_0_124 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VideoComponent
}, Symbol.toStringTag, { value: "Module" }));
const CourseLayout = ({ auth, children, course }) => {
  return /* @__PURE__ */ jsxs("div", { id: "app_wrap", className: `my_row ${!isEmpty(auth.user.userInfo) ? "member" : ""} course_page`, children: [
    /* @__PURE__ */ jsxs("div", { className: "page_content my_row", children: [
      /* @__PURE__ */ jsx("header", { className: "my_row nav_row", style: { background: course.header_color }, children: /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
        /* @__PURE__ */ jsx("a", { className: "logo", href: "/", children: /* @__PURE__ */ jsx("h1", { children: /* @__PURE__ */ jsx("img", { src: course.logo || Vapor.asset("images/logo.png"), alt: course.title ?? "" }) }) }),
        /* @__PURE__ */ jsx("h2", { id: "course_title", className: "title", style: { color: course.header_text_color }, children: course.title })
      ] }) }) }),
      /* @__PURE__ */ jsx("main", { children })
    ] }),
    /* @__PURE__ */ jsx(AuthenticatedFooter, {})
  ] });
};
function Course({
  auth,
  course,
  creator,
  sections,
  hasCourseAccess,
  page = null,
  affRef = null,
  clickId = null
}) {
  const { intro_video, intro_text, intro_background_color, title } = course;
  const [indexValue, setIndexValue] = useState(null);
  const [introText, setIntroText] = useState(intro_text);
  useEffect(() => {
    const href = window.location.href.split("?")[0];
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const message = urlParams == null ? void 0 : urlParams.get("message");
    if (message) {
      EventBus.dispatch("success", { message });
      urlParams == null ? void 0 : urlParams.delete("message");
      window.history.pushState({}, document.title, href);
      return () => EventBus.remove("success");
    }
  }, []);
  useEffect(() => {
    if (introText && isJSON(introText)) {
      const allContent = JSON.parse(introText);
      allContent["blocks"] = allContent["blocks"].map((block) => {
        if (!block.text) {
          block.text = "";
        }
        return block;
      });
      setIntroText(draftToHtml(allContent));
    } else {
      setIntroText(introText);
    }
  }, []);
  useEffect(() => {
    const handleScroll = (e) => {
      const divClass = document.querySelector(".member.course_page");
      if (divClass) {
        if (window.innerWidth < 768) {
          const scrollPosition = window.scrollY;
          const divTop = document.getElementById("course_title").offsetTop;
          const header = document.querySelector("header");
          const mainDiv = document.querySelector("main");
          if (scrollPosition > divTop - 22) {
            const headerHeight = header.offsetHeight;
            const topPosition = headerHeight - 68;
            header.style.position = "fixed";
            header.style.left = 0;
            header.style.top = "-" + topPosition + "px";
            mainDiv.style.paddingTop = headerHeight + 40 + "px";
          } else {
            header.style.top = "auto";
            header.style.position = "relative";
            mainDiv.style.paddingTop = "40px";
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);
  const createMarkup = (text2) => {
    return {
      __html: DOMPurify.sanitize(text2)
    };
  };
  return /* @__PURE__ */ jsxs(CourseLayout, { course, auth, children: [
    !isEmpty(auth.user.userInfo) && /* @__PURE__ */ jsx(Menu, {}),
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsx(SetFlash, {}),
    /* @__PURE__ */ jsx("div", { className: "creator course_creator", children: /* @__PURE__ */ jsx("div", { id: "links_page", className: "live_page course", children: /* @__PURE__ */ jsx("div", { id: "single_course", className: "my_row", children: /* @__PURE__ */ jsx("div", { className: "single_course_content my_row", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "my_row courses_grid", children: [
      indexValue && /* @__PURE__ */ jsx(
        VideoComponent,
        {
          indexValue,
          sections
        }
      ),
      /* @__PURE__ */ jsxs("section", { className: "header", children: [
        intro_video && !indexValue && /* @__PURE__ */ jsx("div", { className: "intro_video", children: /* @__PURE__ */ jsx("div", { className: "video_wrapper", children: /* @__PURE__ */ jsx("iframe", { src: intro_video, allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;", allowFullScreen: true }) }) }),
        intro_text && /* @__PURE__ */ jsx("div", { className: "intro_text my_row", style: { background: intro_background_color }, children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: createMarkup(introText) }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "my_row", children: /* @__PURE__ */ jsx("div", { className: "sections", children: sections.map((section2, index2) => {
        return /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
          ColumnComponent,
          {
            section: section2,
            indexValue,
            setIndexValue,
            index: index2,
            course,
            hasCourseAccess,
            affRef,
            clickId,
            creator,
            page
          }
        ) }, section2.id);
      }) }) })
    ] }) }) }) }) }) })
  ] });
}
const __vite_glob_0_125 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Course
}, Symbol.toStringTag, { value: "Module" }));
const getPageStats = (packets) => {
  return axios$1.post("/stats/page", packets).then(
    (response) => {
      const returnData = response.data;
      return {
        success: true,
        data: returnData["data"]
      };
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const getLinkStats = (packets) => {
  return axios$1.post("/stats/link", packets).then(
    (response) => {
      const returnData = response.data.data;
      return {
        success: true,
        linkStats: returnData["currentData"],
        deletedStats: returnData["pastData"]
      };
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const getFolderStats = (packets) => {
  return axios$1.post("/stats/folder", packets).then(
    (response) => {
      const returnData = response.data.data;
      return {
        success: true,
        currentData: returnData["currentData"]
        /*pastData: returnData["pastData"]*/
      };
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const getAffiliateStats = (url, packets) => {
  return axios$1.post(url, packets).then(
    (response) => {
      const returnData = response.data.data;
      return {
        success: true,
        affiliateData: returnData["affiliateData"],
        totals: returnData["totals"]
      };
    }
  ).catch((error) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("ERROR:: ", error);
    }
    return {
      success: false
    };
  });
};
const reactDatepicker = "";
const RefreshButton = ({
  startDate,
  endDate,
  dropdownValue,
  getStats,
  filterByValue = null
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    let packets;
    if (dropdownValue > 0) {
      packets = {
        dateValue: dropdownValue
      };
    } else {
      packets = {
        startDate: Math.round(new Date(startDate) / 1e3),
        endDate: Math.round(new Date(endDate) / 1e3)
      };
    }
    if (filterByValue) {
      let url = "";
      if (filterByValue === "offer") {
        url = "/stats/get/offer";
      } else if (filterByValue === "publisher") {
        url = "/stats/get/publisher";
      }
      getStats(packets, url);
    } else {
      getStats(packets);
    }
  };
  return /* @__PURE__ */ jsx("a", { className: "refresh_button", href: "#", onClick: (e) => handleClick(e), children: /* @__PURE__ */ jsx(BiRefresh, {}) });
};
const __vite_glob_0_131 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RefreshButton
}, Symbol.toStringTag, { value: "Module" }));
const Filters = ({
  handleDateChange,
  startDate,
  endDate,
  handleDropdownChange,
  dropdownValue,
  getStats,
  tab,
  filterByValue = null,
  setFilterByValue = null
}) => {
  const handleFilterByChange = (e) => {
    let url = "";
    if (e.target.value === "offer") {
      url = "/stats/get/offer";
    } else if (e.target.value === "publisher") {
      url = "/stats/get/publisher";
    }
    setFilterByValue(e.target.value);
    let packets;
    if (dropdownValue > 0) {
      packets = {
        dateValue: dropdownValue
      };
    } else {
      packets = {
        startDate: Math.round(new Date(startDate) / 1e3),
        endDate: Math.round(new Date(endDate) / 1e3)
      };
    }
    getStats(packets, url);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    tab === "affiliate" && /* @__PURE__ */ jsxs("div", { className: "my_row filter filter_by", children: [
      /* @__PURE__ */ jsx("div", { className: "column", children: /* @__PURE__ */ jsxs("select", { onChange: (e) => handleFilterByChange(e), value: filterByValue, children: [
        /* @__PURE__ */ jsx("option", { value: "offer", children: "Stats by Offer" }),
        /* @__PURE__ */ jsx("option", { value: "publisher", children: "Stats by Publisher" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "column", children: /* @__PURE__ */ jsx(
        RefreshButton,
        {
          startDate,
          endDate,
          dropdownValue,
          getStats,
          filterByValue
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `my_row filter ${tab}_tab`, children: [
      /* @__PURE__ */ jsx("div", { className: "column", children: /* @__PURE__ */ jsxs("select", { onChange: (e) => handleDropdownChange(e), value: dropdownValue, children: [
        /* @__PURE__ */ jsx("option", { value: "1", children: "Today" }),
        /* @__PURE__ */ jsx("option", { value: "2", children: "Yesterday" }),
        /* @__PURE__ */ jsx("option", { value: "3", children: "Week To date" }),
        /* @__PURE__ */ jsx("option", { value: "4", children: "Month To Date" }),
        /* @__PURE__ */ jsx("option", { value: "5", children: "Year To Date" }),
        /* @__PURE__ */ jsx("option", { value: "6", children: "Last Week" }),
        /* @__PURE__ */ jsx("option", { value: "7", children: "Last Month" }),
        /* @__PURE__ */ jsx("option", { value: "0", children: "Custom" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "column", children: [
        /* @__PURE__ */ jsx(
          DatePicker,
          {
            selected: startDate,
            onChange: (date) => handleDateChange(date, "start"),
            selectsStart: true,
            startDate,
            endDate,
            maxDate: /* @__PURE__ */ new Date(),
            placeholderText: "Start Date"
          }
        ),
        /* @__PURE__ */ jsx(FaRegCalendarAlt, {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "column", children: [
        /* @__PURE__ */ jsx(
          DatePicker,
          {
            selected: endDate,
            onChange: (date) => handleDateChange(date, "end"),
            selectsEnd: true,
            startDate,
            endDate,
            minDate: startDate,
            maxDate: /* @__PURE__ */ new Date(),
            placeholderText: "End Date"
          }
        ),
        /* @__PURE__ */ jsx(FaRegCalendarAlt, {})
      ] }),
      tab !== "affiliate" && /* @__PURE__ */ jsx("div", { className: "column", children: /* @__PURE__ */ jsx(
        RefreshButton,
        {
          startDate,
          endDate,
          dropdownValue,
          getStats
        }
      ) })
    ] })
  ] });
};
const __vite_glob_0_127 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Filters,
  default: Filters
}, Symbol.toStringTag, { value: "Module" }));
const Table = ({
  totals = null,
  isLoading,
  animate,
  data,
  columns
}) => {
  const [openIndex, setOpenIndex] = useState([]);
  const {
    getTableProps,
    // table props from react-table
    getTableBodyProps,
    // table body props from react-table
    headerGroups,
    // headerGroups, if your table has groupings
    rows,
    // rows for the table based on the data passed
    prepareRow
    // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable(
    {
      columns,
      data: data ? data : null
    },
    useSortBy
  );
  const handleRowClick = (rowIndex) => {
    if (openIndex.includes(rowIndex)) {
      const newArrayIndex = openIndex.filter((element) => element !== rowIndex);
      setOpenIndex(newArrayIndex);
    } else {
      const newArrayIndex = openIndex.concat(rowIndex);
      setOpenIndex(newArrayIndex);
    }
  };
  return /* @__PURE__ */ jsxs("table", { className: "w-full table rounded-t-sm table-borderless", ...getTableProps(), children: [
    /* @__PURE__ */ jsx("thead", { children: headerGroups == null ? void 0 : headerGroups.map((headerGroup) => /* @__PURE__ */ jsx("tr", { ...headerGroup.getHeaderGroupProps(), children: headerGroup.headers.map((column) => /* @__PURE__ */ jsx("th", { ...column.getHeaderProps(column.getSortByToggleProps()), children: /* @__PURE__ */ jsxs("h5", { children: [
      /* @__PURE__ */ jsx("span", { children: column.render("Header") }),
      column.isSorted ? column.isSortedDesc ? /* @__PURE__ */ jsx(FaSortDown, {}) : /* @__PURE__ */ jsx(FaSortUp, {}) : /* @__PURE__ */ jsx(FaSort, {})
    ] }) })) })) }),
    /* @__PURE__ */ jsxs("tbody", { ...getTableBodyProps(), children: [
      isLoading && /* @__PURE__ */ jsx("tr", { id: "loading_spinner", className: "active", children: /* @__PURE__ */ jsx("td", { colSpan: "5", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/spinner.svg"), alt: "" }) }) }),
      isEmpty(data) ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: isLoading ? "hidden no_stats" : "no_stats", colSpan: "5", children: /* @__PURE__ */ jsx("h3", { children: "No Stats Available" }) }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        rows == null ? void 0 : rows.map((row, index2) => {
          var _a, _b;
          prepareRow(row);
          return /* @__PURE__ */ jsxs(React.Fragment, { children: [
            /* @__PURE__ */ jsx("tr", { ...row.getRowProps(), className: ((_a = row.original.userStats) == null ? void 0 : _a.length) > 0 ? "no_border" : "", children: row.cells.map((cell) => {
              return /* @__PURE__ */ jsx("td", { ...cell.getCellProps(), children: cell.column.Header === "Offer" || cell.column.Header === "Current Icons" || cell.column.Header === "Past Icons" ? /* @__PURE__ */ jsx("img", { src: cell.value, alt: "" }) : /* @__PURE__ */ jsxs("p", { className: `${animate ? "animate hide" : "animate"}`, children: [
                cell.column.Header === "Payout" && "$",
                cell.render("Cell")
              ] }) });
            }) }, index2),
            ((_b = row.original.userStats) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", children: /* @__PURE__ */ jsxs("table", { className: "table table-borderless user_stats w-full", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { onClick: (e) => handleRowClick(index2), children: [
                /* @__PURE__ */ jsx("th", { scope: "col", children: /* @__PURE__ */ jsx("h5", { children: "Stats By Publisher" }) }),
                /* @__PURE__ */ jsx("th", { scope: "col" }),
                /* @__PURE__ */ jsx("th", { scope: "col" }),
                /* @__PURE__ */ jsx("th", { scope: "col" }),
                /* @__PURE__ */ jsx("th", { scope: "col", children: openIndex.includes(index2) ? /* @__PURE__ */ jsx(HiMinusSm, {}) : /* @__PURE__ */ jsx(HiOutlinePlusSm, {}) })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: openIndex.includes(index2) ? "open" : "", children: row.original.userStats.map((user2, index22) => {
                const { name: name2, rawCount, uniqueCount, conversionCount, payout } = user2;
                return /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("p", { className: `${animate ? "animate hide" : "animate"}`, children: name2 }) }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("p", { className: `${animate ? "animate hide" : "animate"}`, children: rawCount }) }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("p", { className: `${animate ? "animate hide" : "animate"}`, children: uniqueCount }) }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("p", { className: `${animate ? "animate hide" : "animate"}`, children: conversionCount }) }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("p", { className: `${animate ? "animate hide" : "animate"}`, children: [
                    "$",
                    payout
                  ] }) })
                ] }, index22);
              }) })
            ] }) }) })
          ] }, index2);
        }),
        totals && /* @__PURE__ */ jsxs("tr", { className: "totals", children: [
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("h3", { children: "Totals" }) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("h3", { className: `${animate ? "animate hide" : "animate"}`, children: totals["totalRaw"] }) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("h3", { className: `${animate ? "animate hide" : "animate"}`, children: totals["totalUnique"] }) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("h3", { className: `${animate ? "animate hide" : "animate"}`, children: totals["totalConversions"] }) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("h3", { className: `${animate ? "animate hide" : "animate"}`, children: [
            "$",
            totals["totalPayout"]
          ] }) })
        ] })
      ] })
    ] })
  ] });
};
const __vite_glob_0_132 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Table
}, Symbol.toStringTag, { value: "Module" }));
const AffiliateStats = ({
  affiliateStats,
  setAffiliateStats,
  totals,
  setTotals,
  statsDate,
  setStatsDate,
  dropdownValue,
  setDropdownValue,
  filterByValue,
  setFilterByValue,
  tab
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    if (isEmpty(affiliateStats)) {
      const packets = {
        currentDay: true
      };
      getStatsCall(packets, "/stats/get/offer");
    } else {
      setIsLoading(false);
      setAnimate(false);
    }
  }, []);
  const offerColumns = useMemo(
    () => [
      {
        Header: "Offer",
        accessor: "icon"
      },
      {
        Header: "Raw Clicks",
        accessor: "rawCount"
      },
      {
        Header: "Unique Clicks",
        accessor: "uniqueCount"
      },
      {
        Header: "Conversions",
        accessor: "conversionCount"
      },
      {
        Header: "Payout",
        accessor: "payout"
      }
    ],
    []
  );
  const publisherColumns = useMemo(
    () => [
      {
        Header: "Publisher",
        accessor: "name"
      },
      {
        Header: "Raw Clicks",
        accessor: "rawCount"
      },
      {
        Header: "Unique Clicks",
        accessor: "uniqueCount"
      },
      {
        Header: "Conversions",
        accessor: "conversionCount"
      },
      {
        Header: "Payout",
        accessor: "payout"
      }
    ],
    []
  );
  const handleDateChange = (date, type) => {
    let currentStartDate;
    let currentEndDate;
    if (type === "start") {
      setStatsDate((prevState) => ({
        ...prevState,
        startDate: date
      }));
      currentStartDate = date;
      currentEndDate = statsDate.endDate ? statsDate.endDate : null;
    } else {
      setStatsDate((prevState) => ({
        ...prevState,
        endDate: date
      }));
      currentEndDate = date;
      currentStartDate = statsDate.startDate ? statsDate.startDate : null;
    }
    if (currentEndDate && currentStartDate && currentStartDate <= currentEndDate) {
      setDropdownValue(0);
      const packets = {
        startDate: Math.round(new Date(currentStartDate) / 1e3),
        endDate: Math.round(new Date(currentEndDate) / 1e3)
      };
      let url = "";
      if (filterByValue === "offer") {
        url = "/stats/get/offer";
      } else if (filterByValue === "publisher") {
        url = "/stats/get/publisher";
      }
      getStatsCall(packets, url);
    }
  };
  const handleDropdownChange = (e) => {
    if (e.target.value !== 0) {
      setStatsDate({
        startDate: null,
        endDate: null
      });
      setDropdownValue(e.target.value);
      const packets = {
        dateValue: e.target.value
      };
      let url = "";
      if (filterByValue === "offer") {
        url = "/stats/get/offer";
      } else if (filterByValue === "publisher") {
        url = "/stats/get/publisher";
      }
      getStatsCall(packets, url);
    }
  };
  const getStatsCall = useCallback((packets, url) => {
    setAnimate(true);
    getAffiliateStats(url, packets).then((data) => {
      if (data["success"]) {
        setTimeout(() => {
          setAffiliateStats(data["affiliateData"]);
          setTotals(data["totals"]);
          setAnimate(false);
          setIsLoading(false);
        }, 500);
      } else {
        setAnimate(false);
        setIsLoading(false);
      }
    });
  }, [statsDate]);
  return /* @__PURE__ */ jsxs("div", { className: "stats_wrap my_row", children: [
    /* @__PURE__ */ jsx(
      Filters,
      {
        handleDateChange,
        startDate: statsDate.startDate,
        endDate: statsDate.endDate,
        handleDropdownChange,
        dropdownValue,
        getStats: getStatsCall,
        tab,
        filterByValue,
        setFilterByValue
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "table_wrap my_row table-responsive", children: /* @__PURE__ */ jsx(
      Table,
      {
        isLoading,
        animate,
        totals,
        data: affiliateStats,
        columns: filterByValue === "offer" ? offerColumns : publisherColumns
      }
    ) })
  ] });
};
const __vite_glob_0_126 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AffiliateStats
}, Symbol.toStringTag, { value: "Module" }));
const FolderStats = ({
  folderStats,
  setFolderStats,
  folderStatsDate,
  setFolderStatsDate,
  folderDropdownValue,
  setFolderDropdownValue,
  tab
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    if (isEmpty(folderStats)) {
      const packets = {
        currentDay: true
      };
      folderStatsCall(packets);
    } else {
      setIsLoading(false);
      setAnimate(false);
    }
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "Current Icons",
        accessor: "icon"
      },
      {
        Header: "Icon Name",
        accessor: "iconName"
      },
      {
        Header: "Icon Clicks",
        accessor: "visits"
      }
    ],
    []
  );
  const handleDateChange = (date, type) => {
    let currentStartDate = null;
    let currentEndDate = null;
    if (type === "start") {
      setFolderStatsDate((prevState) => ({
        ...prevState,
        startDate: date
      }));
      currentStartDate = date;
      currentEndDate = folderStatsDate.endDate ? folderStatsDate.endDate : null;
    } else {
      setFolderStatsDate((prevState) => ({
        ...prevState,
        endDate: date
      }));
      currentEndDate = date;
      currentStartDate = folderStatsDate.startDate ? folderStatsDate.startDate : null;
    }
    if (currentEndDate && currentStartDate && currentStartDate <= currentEndDate) {
      setFolderDropdownValue(0);
      const packets = {
        startDate: Math.round(new Date(currentStartDate) / 1e3),
        endDate: Math.round(new Date(currentEndDate) / 1e3)
      };
      folderStatsCall(packets);
    }
  };
  const handleDropdownChange = (e) => {
    setFolderStatsDate({
      startDate: null,
      endData: null
    });
    setFolderDropdownValue(e.target.value);
    const packets = {
      dateValue: e.target.value
    };
    folderStatsCall(packets);
  };
  const folderStatsCall = useCallback((packets) => {
    setAnimate(true);
    getFolderStats(packets).then((data) => {
      if (data["success"]) {
        setTimeout(() => {
          setFolderStats(data["currentData"]);
          setAnimate(false);
          setIsLoading(false);
        }, 500);
      } else {
        setAnimate(false);
        setIsLoading(false);
      }
    });
  }, [folderStatsDate]);
  return /* @__PURE__ */ jsxs("div", { className: "stats_wrap my_row relative", children: [
    /* @__PURE__ */ jsx(
      Filters,
      {
        handleDateChange,
        startDate: folderStatsDate.startDate,
        endDate: folderStatsDate.endDate,
        handleDropdownChange,
        dropdownValue: folderDropdownValue,
        getStats: folderStatsCall,
        tab
      }
    ),
    isLoading && /* @__PURE__ */ jsx("div", { className: "my_row", children: /* @__PURE__ */ jsx("div", { id: "loading_spinner", className: "active", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/spinner.svg"), alt: "" }) }) }),
    folderStats.length < 1 ? /* @__PURE__ */ jsxs("div", { className: "my_row", children: [
      /* @__PURE__ */ jsxs("div", { className: "my_row labels", children: [
        /* @__PURE__ */ jsx("h5", { children: "Folder Name" }),
        /* @__PURE__ */ jsx("h5", { children: "Folder Clicks" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "content_wrap", children: /* @__PURE__ */ jsx("h3", { children: "No Stats Available" }) })
    ] }) : folderStats.map((item) => {
      const { id, name: name2, clickCount, links } = item;
      return /* @__PURE__ */ jsxs("div", { className: "my_row", children: [
        /* @__PURE__ */ jsxs("div", { className: "my_row labels", children: [
          /* @__PURE__ */ jsx("h5", { children: "Folder Name" }),
          /* @__PURE__ */ jsx("h5", { children: "Folder Clicks" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "content_wrap", children: [
          /* @__PURE__ */ jsxs("div", { className: "my_row title", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              " ",
              name2,
              " "
            ] }),
            /* @__PURE__ */ jsx("p", { className: "animate", children: clickCount })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "table_wrap my_row table-responsive mb-4", children: (links == null ? void 0 : links.length) > 0 && /* @__PURE__ */ jsx(
            Table,
            {
              isLoading,
              animate,
              data: links,
              columns
            }
          ) })
        ] })
      ] }, id);
    })
  ] });
};
const __vite_glob_0_128 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FolderStats
}, Symbol.toStringTag, { value: "Module" }));
const LinkStats = ({
  linkStats,
  setLinkStats,
  deletedStats,
  setDeletedStats,
  linkStatsDate,
  setLinkStatsDate,
  linkDropdownValue,
  setLinkDropdownValue,
  tab
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    if (isEmpty(linkStats)) {
      const packets = {
        currentDay: true
      };
      linkStatsCall(packets);
    } else {
      setIsLoading(false);
      setAnimate(false);
    }
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "Current Icons",
        accessor: "icon"
      },
      {
        Header: "Icon Name",
        accessor: "iconName"
      },
      {
        Header: "Icon Clicks",
        accessor: "visits"
      }
    ],
    []
  );
  const deletedColumns = useMemo(
    () => [
      {
        Header: "Past Icons",
        accessor: "icon"
      },
      {
        Header: "Icon Name",
        accessor: "iconName"
      },
      {
        Header: "Icon Clicks",
        accessor: "visits"
      }
    ],
    []
  );
  const handleDateChange = (date, type) => {
    let currentStartDate = null;
    let currentEndDate = null;
    if (type === "start") {
      setLinkStatsDate((prevState) => ({
        ...prevState,
        startDate: date
      }));
      currentStartDate = date;
      currentEndDate = linkStatsDate.endDate ? linkStatsDate.endDate : null;
    } else {
      setLinkStatsDate((prevState) => ({
        ...prevState,
        endDate: date
      }));
      currentEndDate = date;
      currentStartDate = linkStatsDate.startDate ? linkStatsDate.startDate : null;
    }
    if (currentEndDate && currentStartDate && currentStartDate <= currentEndDate) {
      setLinkDropdownValue(0);
      const packets = {
        startDate: Math.round(new Date(currentStartDate) / 1e3),
        endDate: Math.round(new Date(currentEndDate) / 1e3)
      };
      linkStatsCall(packets);
    }
  };
  const handleDropdownChange = (e) => {
    if (e.target.value !== 0) {
      setLinkStatsDate({
        startDate: null,
        endData: null
      });
      setLinkDropdownValue(e.target.value);
      const packets = {
        dateValue: e.target.value
      };
      linkStatsCall(packets);
    }
  };
  const linkStatsCall = useCallback((packets) => {
    setAnimate(true);
    getLinkStats(packets).then((data) => {
      if (data["success"]) {
        setTimeout(() => {
          setLinkStats(data["linkStats"]);
          setDeletedStats(data["deletedStats"]);
          setAnimate(false);
          setIsLoading(false);
        }, 500);
      } else {
        setAnimate(false);
        setIsLoading(false);
      }
    });
  }, [linkStatsDate]);
  return /* @__PURE__ */ jsxs("div", { className: "stats_wrap my_row", children: [
    /* @__PURE__ */ jsx(
      Filters,
      {
        handleDateChange,
        startDate: linkStatsDate.startDate,
        endDate: linkStatsDate.endDate,
        handleDropdownChange,
        dropdownValue: linkDropdownValue,
        getStats: linkStatsCall,
        tab
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "table_wrap my_row table-responsive", children: /* @__PURE__ */ jsx(
      Table,
      {
        isLoading,
        animate,
        data: linkStats,
        columns
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "table_wrap my_row table-responsive", children: /* @__PURE__ */ jsx(
      Table,
      {
        isLoading,
        animate,
        data: deletedStats,
        columns: deletedColumns
      }
    ) })
  ] });
};
const __vite_glob_0_129 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LinkStats
}, Symbol.toStringTag, { value: "Module" }));
const PageStats = ({
  pageStats,
  setPageStats,
  pageStatsDate,
  setPageStatsDate,
  pageDropdownValue,
  setPageDropdownValue,
  tab
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    if (isEmpty(pageStats)) {
      const packets = {
        currentDay: true
      };
      pageStatsCall(packets);
    } else {
      setIsLoading(false);
      setAnimate(false);
    }
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "Page Name",
        accessor: "pageName"
      },
      {
        Header: "Page Loads",
        accessor: "visits"
      },
      {
        Header: "Icon Clicks",
        accessor: "linkVisits"
      }
    ],
    []
  );
  const handleDateChange = (date, type) => {
    let currentStartDate = null;
    let currentEndDate = null;
    if (type === "start") {
      setPageStatsDate((prevState) => ({
        ...prevState,
        startDate: date
      }));
      currentStartDate = date;
      currentEndDate = pageStatsDate.endDate ? pageStatsDate.endDate : null;
    } else {
      setPageStatsDate((prevState) => ({
        ...prevState,
        endDate: date
      }));
      currentEndDate = date;
      currentStartDate = pageStatsDate.startDate ? pageStatsDate.startDate : null;
    }
    if (currentStartDate && currentEndDate && currentStartDate <= currentEndDate) {
      setPageDropdownValue(0);
      const packets = {
        startDate: Math.round(new Date(currentStartDate) / 1e3),
        endDate: Math.round(new Date(currentEndDate) / 1e3)
      };
      pageStatsCall(packets);
    }
  };
  const handleDropdownChange = (e) => {
    setPageStatsDate({
      startDate: null,
      endData: null
    });
    setPageDropdownValue(e.target.value);
    const packets = {
      dateValue: e.target.value
    };
    pageStatsCall(packets);
  };
  const pageStatsCall = useCallback((packets) => {
    setAnimate(true);
    getPageStats(packets).then((data) => {
      if (data["success"]) {
        setTimeout(() => {
          setPageStats(data["data"]);
          setAnimate(false);
          setIsLoading(false);
        }, 500);
      } else {
        setAnimate(false);
        setIsLoading(false);
      }
    });
  }, [pageStatsDate]);
  return /* @__PURE__ */ jsxs("div", { className: "stats_wrap my_row", children: [
    /* @__PURE__ */ jsx(
      Filters,
      {
        handleDateChange,
        startDate: pageStatsDate.startDate,
        endDate: pageStatsDate.endDate,
        handleDropdownChange,
        dropdownValue: pageDropdownValue,
        getStats: pageStatsCall,
        tab
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "table_wrap my_row table-responsive", children: /* @__PURE__ */ jsx(
      Table,
      {
        isLoading,
        animate,
        data: pageStats,
        columns
      }
    ) })
  ] });
};
const __vite_glob_0_130 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PageStats
}, Symbol.toStringTag, { value: "Module" }));
function Stats() {
  const [tab, setTab] = useState("page");
  const [pageStats, setPageStats] = useState([]);
  const [linkStats, setLinkStats] = useState([]);
  const [deletedStats, setDeletedStats] = useState([]);
  const [folderStats, setFolderStats] = useState([]);
  const [affiliateStats, setAffiliateStats] = useState([]);
  const [affiliateTotals, setAffiliateTotals] = useState([]);
  const [linkStatsDate, setLinkStatsDate] = useState({
    startDate: null,
    endDate: null
  });
  const [pageStatsDate, setPageStatsDate] = useState({
    startDate: null,
    endDate: null
  });
  const [folderStatsDate, setFolderStatsDate] = useState({
    startDate: null,
    endDate: null
  });
  const [affiliateStatsDate, setAffiliateStatsDate] = useState({
    startDate: null,
    endDate: null
  });
  const [pageDropdownValue, setPageDropdownValue] = useState(1);
  const [linkDropdownValue, setLinkDropdownValue] = useState(1);
  const [folderDropdownValue, setFolderDropdownValue] = useState(1);
  const [affiliateDropdownValue, setAffiliateDropdownValue] = useState(1);
  const [filterByValue, setFilterByValue] = useState("offer");
  const handleClick = (e) => {
    e.preventDefault();
    setTab(e.target.dataset.tab);
  };
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Stats" }),
    /* @__PURE__ */ jsx("div", { className: "container", id: "stats_page", children: /* @__PURE__ */ jsxs("div", { className: "my_row form_page stats", children: [
      /* @__PURE__ */ jsx("h2", { className: "page_title text-center", children: "Stats" }),
      /* @__PURE__ */ jsx("div", { className: "card flex", children: /* @__PURE__ */ jsx("div", { id: "stats", className: "my_row", children: /* @__PURE__ */ jsxs("div", { className: "tabs_wrap", children: [
        /* @__PURE__ */ jsxs("div", { className: "my_row tab_nav", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: `tab_link ${tab === "page" ? "active" : ""}`, "data-tab": "page", onClick: (e) => {
            handleClick(e);
          }, children: "Page Stats" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: `tab_link ${tab === "icon" ? "active" : ""}`, "data-tab": "icon", onClick: (e) => {
            handleClick(e);
          }, children: "Icon Stats" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: `tab_link ${tab === "folder" ? "active" : ""}`, "data-tab": "folder", onClick: (e) => {
            handleClick(e);
          }, children: "Folder Stats" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: `tab_link ${tab === "affiliate" ? "active" : ""}`, "data-tab": "affiliate", onClick: (e) => {
            handleClick(e);
          }, children: "Affiliate Stats" })
        ] }),
        tab === "page" && /* @__PURE__ */ jsx(
          PageStats,
          {
            pageStats,
            setPageStats,
            pageStatsDate,
            setPageStatsDate,
            pageDropdownValue,
            setPageDropdownValue,
            tab
          }
        ),
        tab === "icon" && /* @__PURE__ */ jsx(
          LinkStats,
          {
            linkStats,
            setLinkStats,
            deletedStats,
            setDeletedStats,
            linkStatsDate,
            setLinkStatsDate,
            linkDropdownValue,
            setLinkDropdownValue,
            tab
          }
        ),
        tab === "folder" && /* @__PURE__ */ jsx(
          FolderStats,
          {
            folderStats,
            setFolderStats,
            folderStatsDate,
            setFolderStatsDate,
            folderDropdownValue,
            setFolderDropdownValue,
            tab
          }
        ),
        tab === "affiliate" && /* @__PURE__ */ jsx(
          AffiliateStats,
          {
            affiliateStats,
            setAffiliateStats,
            totals: affiliateTotals,
            setTotals: setAffiliateTotals,
            statsDate: affiliateStatsDate,
            setStatsDate: setAffiliateStatsDate,
            dropdownValue: affiliateDropdownValue,
            setDropdownValue: setAffiliateDropdownValue,
            filterByValue,
            setFilterByValue,
            tab
          }
        )
      ] }) }) })
    ] }) })
  ] });
}
const __vite_glob_0_133 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Stats
}, Symbol.toStringTag, { value: "Module" }));
const PromoComponent = ({
  plan,
  setShowLoader,
  promoCode,
  setPromoCode
}) => {
  const promoRef = useRef(null);
  const [message, setMessage] = useState({
    text: null,
    subText: null,
    success: false
  });
  const handlePromoSubmit = (e) => {
    e.preventDefault();
    setMessage({});
    setShowLoader({
      show: true,
      icon: "",
      position: "absolute"
    });
    const packets = {
      planId: plan,
      code: promoCode
    };
    checkPromoCode(packets).then((response) => {
      if (response.success) {
        setMessage((prev) => ({
          ...prev,
          success: true
        }));
        if (response.message.includes("Lifetime")) {
          setMessage((prev) => ({
            ...prev,
            subText: "Click 'Submit' below to activate your membership:"
          }));
        } else {
          setMessage((prev) => ({
            ...prev,
            subText: "Choose a way to pay for future billing. If you cancel before the next billing cycle you will never be charged."
          }));
        }
      } else {
        setMessage((prev) => ({
          ...prev,
          success: false
        }));
      }
      setMessage((prev) => ({
        ...prev,
        text: response.message
      }));
      setShowLoader({
        show: false,
        icon: "",
        position: ""
      });
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "my_row", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        className: "discount_link",
        href: "#",
        onClick: (e) => promoRef.current.classList.add("open"),
        children: "Have a Promo Code? Click Here!"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "discount_wrap my_row", ref: promoRef, children: [
      /* @__PURE__ */ jsxs("form", { id: "submit_discount_code", action: "", method: "", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "discountCode",
            id: "discount_code",
            onChange: (e) => setPromoCode(e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            className: "button blue",
            onClick: (e) => handlePromoSubmit(e),
            children: "Apply"
          }
        )
      ] }),
      !isEmpty(message) && /* @__PURE__ */ jsxs("div", { id: `promo_response`, className: "my_row", role: "alert", children: [
        /* @__PURE__ */ jsx("p", { className: ` ${message.success ? "success" : "error"}`, children: message.text }),
        message.subText && /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { children: "NEXT: " }),
          " ",
          message.subText
        ] })
      ] })
    ] })
  ] });
};
const __vite_glob_0_134 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PromoComponent
}, Symbol.toStringTag, { value: "Module" }));
function Purchase({
  plan,
  token,
  price,
  existing,
  bypass
}) {
  const [showLoader, setShowLoader] = useState({
    show: false,
    icon: "",
    position: ""
  });
  const loadRef = useRef(true);
  const [braintreeInstance, setBraintreeInstance] = useState(null);
  const [promoCode, setPromoCode] = useState(null);
  useEffect(() => {
    const firstRender = loadRef.current;
    if (firstRender) {
      loadRef.current = false;
      braintree.dropin.create({
        authorization: token,
        selector: "#bt-dropin",
        paypal: {
          flow: "vault"
        },
        googlePay: {
          googlePayVersion: 2,
          merchantId: "0764-6991-5982",
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPrice: price,
            currencyCode: "USD"
          }
        },
        venmo: {
          allowDesktop: true,
          paymentMethodUsage: "multi_use"
        },
        applePay: {
          displayName: "LinkPro",
          paymentRequest: {
            total: {
              label: "LinkPro",
              amount: price
            },
            // We recommend collecting billing address information, at minimum
            // billing postal code, and passing that billing postal code with all
            // Apple Pay transactions as a best practice.
            requiredBillingContactFields: ["postalAddress"]
          }
        }
      }, function(createErr, instance) {
        if (createErr) {
          console.log("Create Error", createErr);
          return;
        }
        setBraintreeInstance(instance);
      });
    } else {
      console.log("Not a first Render");
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader({
      show: true,
      position: "absolute",
      icon: ""
    });
    let url = null;
    if (bypass) {
      url = "/subscribe/change-plan";
    } else if (existing) {
      url = "/subscribe/resume";
    } else {
      url = "/subscribe/create";
    }
    if (promoCode && (promoCode.toLowerCase() === "freepremier" || promoCode.toLowerCase() === "freepro")) {
      const packets = {
        level: plan
      };
      purchaseSubscription(url, packets).then((response) => {
        if (response.success) {
          router.get("/dashboard");
        }
      });
    } else {
      braintreeInstance.requestPaymentMethod(function(err, payload) {
        if (err) {
          console.log("Request Payment Method Error", err);
          return;
        }
        const packets = {
          payment_method_nonce: payload.nonce,
          payment_method_token: token,
          discountCode: promoCode,
          planId: plan
        };
        purchaseSubscription(url, packets).then((response) => {
          if (response.success) {
            router.get(response.url, { message: response.message });
          }
          setShowLoader({
            show: false,
            position: "",
            icon: ""
          });
        });
      });
    }
  };
  const switchStatement = () => {
    switch (plan) {
      case "pro":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "1 Unique Link" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Unlimited Icons" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Custom Icons" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Add Social Links" })
          ] })
        ] });
      case "premier":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Up to 5 Unique Links" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Unlimited Icons" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Custom Icons" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Password Protected Links" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Add Social Links" })
          ] })
        ] });
    }
  };
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Purchase Subscription" }),
    /* @__PURE__ */ jsx(SetFlash, {}),
    /* @__PURE__ */ jsx("div", { className: "my_row form_page plans checkout", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("h2", { className: "page_title mb-0 w-100", children: [
        "Upgrade to ",
        /* @__PURE__ */ jsx("span", { className: "text-capitalize", children: capitalize(plan) }),
        " For Only"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pricing m-0", children: /* @__PURE__ */ jsxs("h3", { children: [
        /* @__PURE__ */ jsx("sup", { children: "$" }),
        price,
        /* @__PURE__ */ jsx("span", { children: "/ mo" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-body flex flex-row flex-wrap-reverse lg:flex-nowrap", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full plan_details", children: /* @__PURE__ */ jsx("div", { className: "my_row three_columns", children: /* @__PURE__ */ jsxs("div", { className: `column ${plan}`, children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-uppercase", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              capitalize(plan),
              " Plan"
            ] }),
            " Includes"
          ] }),
          /* @__PURE__ */ jsx("ul", { children: switchStatement() })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "w-full credit_card_form", children: /* @__PURE__ */ jsxs("div", { className: "my_row payment_form_wrap relative", children: [
          showLoader.show && /* @__PURE__ */ jsx(
            Loader,
            {
              showLoader
            }
          ),
          /* @__PURE__ */ jsx(
            PromoComponent,
            {
              plan,
              setShowLoader,
              promoCode,
              setPromoCode
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "my_row", children: /* @__PURE__ */ jsxs("form", { method: "", id: "payment-form", action: "", children: [
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("input", { id: "form_discount_code", type: "hidden", name: "discountCode" }),
              /* @__PURE__ */ jsx("input", { type: "hidden", id: "bypass", value: "null" }),
              /* @__PURE__ */ jsx("div", { className: "drop_in_wrap", children: /* @__PURE__ */ jsx("div", { className: "bt-drop-in-wrapper", children: /* @__PURE__ */ jsx("div", { id: "bt-dropin" }) }) })
            ] }),
            /* @__PURE__ */ jsx("input", { id: "nonce", name: "payment_method_nonce", type: "hidden" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "button blue",
                onClick: (e) => handleSubmit(e),
                children: /* @__PURE__ */ jsx("span", { children: "Submit" })
              }
            )
          ] }) })
        ] }) })
      ] }) })
    ] }) })
  ] });
}
const __vite_glob_0_135 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Purchase
}, Symbol.toStringTag, { value: "Module" }));
const BreadCrumbs = ({
  showSection,
  setShowSection
}) => {
  return /* @__PURE__ */ jsx("div", { className: "breadcrumb_links", children: /* @__PURE__ */ jsxs("ul", { children: [
    (showSection.includes("plans") || showSection.includes("cancel") || showSection.includes("methods")) && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { className: "back", href: "#", onClick: (e) => {
      e.preventDefault();
      setShowSection([]);
    }, children: [
      /* @__PURE__ */ jsx(BiChevronLeft, {}),
      "SETTINGS"
    ] }) }),
    (showSection.includes("cancel") || showSection.includes("changePlan")) && showSection.includes("plans") && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { className: "back", href: "#", onClick: (e) => {
      e.preventDefault();
      setShowSection(showSection.filter((section2) => {
        return section2 !== "cancel" && section2 !== "changePlan";
      }));
    }, children: [
      /* @__PURE__ */ jsx(BiChevronLeft, {}),
      "PLANS"
    ] }) })
  ] }) });
};
const __vite_glob_0_136 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BreadCrumbs
}, Symbol.toStringTag, { value: "Module" }));
const ConfirmPlanChange = ({
  pages,
  showSection,
  setShowSection,
  subscription,
  setSubscription,
  setShowLoader
}) => {
  const [defaultPage, setDefaultPage] = useState(null);
  const handleClick = (e) => {
    setShowLoader({
      show: true,
      position: "absolute",
      icon: ""
    });
    if (showSection.includes("cancel")) {
      const packets = {
        plan: subscription.braintree_id
      };
      cancelSubscription(packets).then((response) => {
        if (response.success) {
          setShowSection([]);
          setSubscription((prev) => ({
            ...prev,
            braintree_status: "canceled",
            ends_at: response.ends_at
          }));
        }
        setShowLoader({
          show: false,
          position: "",
          icon: ""
        });
      });
    }
    if (showSection.includes("changePlan")) {
      const packets = {
        defaultPage,
        level: "pro"
      };
      changePlan(packets).then((response) => {
        if (response.success) {
          setSubscription((prev) => ({
            ...prev,
            name: "pro"
          }));
          setShowSection([]);
        }
        setShowLoader({
          show: false,
          position: "",
          icon: ""
        });
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { id: "confirm_change_plan_details", className: `change_plan_message`, children: [
    /* @__PURE__ */ jsx("div", { className: "icon_wrap check", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-circle-fill", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" }) }) }),
    /* @__PURE__ */ jsx("h2", { children: "Confirm" }),
    /* @__PURE__ */ jsxs("form", { action: "", method: "", children: [
      showSection.includes("changePlan") ? /* @__PURE__ */ jsx("h3", { children: "By downgrading your account to Pro you will lose access to password protect your links and you will be limited to 1 unique link." }) : subscription.name === "pro" ? /* @__PURE__ */ jsx("h3", { children: "By downgrading your account to Free your subscription will be cancelled, your icons will be limited to 8 and you will no longer be able to use custom icons." }) : /* @__PURE__ */ jsx("h3", { children: "By downgrading your plan to Free your subscription will be cancelled. You will be limited to 1 unique link, your icons will be limited to 8, and you will no longer be able to use custom icons." }),
      pages.length > 1 && subscription.name === "premier" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "You currently have ",
          pages.length,
          " links."
        ] }),
        /* @__PURE__ */ jsx("label", { htmlFor: "defaultPage", children: "Select which link you would like to stay active:" }),
        /* @__PURE__ */ jsx("select", { name: "defaultPage", onChange: (e) => setDefaultPage(e.target.value), children: pages.map((page) => {
          return /* @__PURE__ */ jsx("option", { value: page.id, children: page.name });
        }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "confirm_text", children: "Do you want to continue?" }),
      /* @__PURE__ */ jsxs("div", { className: "button_row", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            className: "button green",
            onClick: (e) => handleClick(),
            children: "Yes"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "close_details button transparent gray",
            href: "#",
            onClick: (e) => {
              setShowSection(showSection.filter((section2) => {
                return section2 !== "changePlan" && section2 !== "cancel";
              }));
            },
            children: "No"
          }
        )
      ] })
    ] })
  ] });
};
const __vite_glob_0_138 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPlanChange
}, Symbol.toStringTag, { value: "Module" }));
const ChoosePlanContent = ({
  showSection,
  setShowSection,
  subscription,
  setSubscription,
  setShowLoader
}) => {
  const [pages, setPages] = useState({});
  useEffect(() => {
    getUserPages().then((response) => {
      if (response.success) {
        setPages(response.pages);
      }
    });
  }, []);
  const handleButtonClick = (e, type) => {
    e.preventDefault();
    setShowSection((prev) => [
      ...prev,
      type
    ]);
  };
  const handleUpgradeClick = (e, subscriptionLevel) => {
    e.preventDefault();
    setShowLoader({
      show: true,
      position: "absolute",
      icon: ""
    });
    const packets = {
      level: subscriptionLevel
    };
    changePlan(packets).then((response) => {
      if (response.success) {
        setShowSection([]);
        setSubscription((prev) => ({
          ...prev,
          name: subscriptionLevel
        }));
      }
    });
  };
  return /* @__PURE__ */ jsx("div", { id: "popup_choose_level", className: "inline-block relative w-full", children: /* @__PURE__ */ jsx("div", { className: `form_page plans inline-block w-full`, children: showSection.includes("changePlan") || showSection.includes("cancel") ? /* @__PURE__ */ jsx(
    ConfirmPlanChange,
    {
      subscription,
      pages,
      showSection,
      setShowSection,
      setSubscription,
      setShowLoader
    }
  ) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "icon_wrap", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("/images/icon-change-plans.png"), alt: "" }) }),
    /* @__PURE__ */ jsx("h2", { children: "Change Your Plan" }),
    /* @__PURE__ */ jsxs("div", { className: "my_row three_columns two_columns popup mt-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "column free", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-uppercase", children: "Free" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "1 Unique Link" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Up To 8 Icons" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Add Social Links" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pricing", children: /* @__PURE__ */ jsxs("h3", { className: "price", children: [
          /* @__PURE__ */ jsx("sup", { children: "$" }),
          "0"
        ] }) }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            className: "button green confirm_change_plan",
            "data-level": "free-cancel",
            onClick: (e) => handleButtonClick(e, "cancel"),
            children: "Downgrade To Free"
          }
        )
      ] }),
      !subscription.name || subscription.name === "premier" ? /* @__PURE__ */ jsxs("div", { className: "column pro", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-uppercase", children: "Pro" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Free Features PLUS" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Unlimited Icons" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Custom Icons" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pricing", children: /* @__PURE__ */ jsxs("h3", { className: "price", children: [
          /* @__PURE__ */ jsx("sup", { children: "$" }),
          "4.99",
          /* @__PURE__ */ jsx("span", { children: "/ mo" })
        ] }) }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            className: "button blue_gradient confirm_change_plan",
            "data-level": "pro",
            onClick: (e) => handleButtonClick(e, "changePlan"),
            children: "Downgrade To Pro"
          }
        )
      ] }) : "",
      !subscription.name || subscription.name === "pro" ? /* @__PURE__ */ jsxs("div", { className: "column premier", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-uppercase", children: "Premier" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Pro Features PLUS" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Up to 5 Unique Links" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check-lg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" }) }),
            /* @__PURE__ */ jsx("p", { children: "Password Protected Links" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pricing", children: /* @__PURE__ */ jsxs("h3", { className: "price", children: [
          /* @__PURE__ */ jsx("sup", { children: "$" }),
          "19.99",
          /* @__PURE__ */ jsx("span", { children: "/ mo" })
        ] }) }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            className: "button black_gradient",
            onClick: (e) => handleUpgradeClick(e, "premier"),
            children: "Upgrade To Premier"
          }
        )
      ] }) : ""
    ] })
  ] }) }) });
};
const __vite_glob_0_137 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ChoosePlanContent
}, Symbol.toStringTag, { value: "Module" }));
const PaymentComponent = ({
  authToken,
  setShowSection
}) => {
  const dropInRef = useRef(null);
  const loadRef = useRef(true);
  useEffect(() => {
    const firstRender = loadRef.current;
    if (firstRender || dropInRef.current.innerHTML === "") {
      loadRef.current = false;
      braintree.dropin.create({
        authorization: authToken,
        selector: "#bt-dropin"
      }, function(createErr, instance) {
        if (createErr) {
          console.log("Create Error", createErr);
        }
      });
    }
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-uppercase", children: "Billing Info" }),
    /* @__PURE__ */ jsx("div", { className: "drop_in_wrap", children: /* @__PURE__ */ jsx("div", { className: "bt-drop-in-wrapper", children: /* @__PURE__ */ jsx("div", { ref: dropInRef, id: "bt-dropin" }) }) }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "#",
        className: "button blue text-uppercase mt-auto",
        onClick: (e) => setShowSection((prev) => [
          ...prev,
          "methods"
        ]),
        children: "Change Payment Method"
      }
    )
  ] });
};
const __vite_glob_0_139 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PaymentComponent
}, Symbol.toStringTag, { value: "Module" }));
const PaymentMethodsComponent = ({
  token,
  subscription,
  setShowSection,
  setShowLoader
}) => {
  const [braintreeInstance, setBraintreeInstance] = useState(null);
  const loadRef = useRef(true);
  const dropInRef = useRef(null);
  useEffect(() => {
    const firstRender = loadRef.current;
    if (firstRender || dropInRef.current.innerHTML === "") {
      loadRef.current = false;
      const client_token = token;
      const subscriptionName = subscription.name;
      let amount;
      if (subscriptionName === "pro") {
        amount = "4.99";
      } else {
        amount = "19.99";
      }
      braintree.dropin.create({
        authorization: client_token,
        selector: "#bt-dropin-update",
        paypal: {
          flow: "vault"
        },
        googlePay: {
          googlePayVersion: 2,
          merchantId: "0764-6991-5982",
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPrice: amount,
            currencyCode: "USD"
          }
        },
        venmo: {
          allowDesktop: true,
          paymentMethodUsage: "multi_use"
        },
        applePay: {
          displayName: "LinkPro",
          paymentRequest: {
            total: {
              label: "LinkPro",
              amount
            }
            // We recommend collecting billing address information, at minimum
            // billing postal code, and passing that billing postal code with all
            // Apple Pay transactions as a best practice.
            //requiredBillingContactFields: ["postalAddress"]
          }
        }
      }, function(createErr, instance) {
        if (createErr) {
          console.log("Create Error", createErr);
          return;
        }
        setBraintreeInstance(instance);
      });
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader({
      show: true,
      position: "absolute",
      icon: ""
    });
    braintreeInstance.requestPaymentMethod(function(err, payload) {
      if (err) {
        console.log("Request Payment Method Error", err);
        return;
      }
      let pmLastFour = null;
      if (payload.details.lastFour !== void 0) {
        pmLastFour = payload.details.lastFour;
      }
      const packets = {
        payment_method_nonce: payload.nonce,
        pm_last_four: pmLastFour,
        pm_type: payload.type
      };
      updatePaymentMethod(packets).then((response) => {
        if (response.success) {
          setShowSection([]);
        }
        setShowLoader({
          show: false,
          position: "",
          icon: ""
        });
      });
    });
  };
  return /* @__PURE__ */ jsx("div", { id: "popup_payment_method", className: "form_page checkout", children: /* @__PURE__ */ jsxs("div", { className: "content_wrap", children: [
    /* @__PURE__ */ jsx("div", { className: "icon_wrap blue_icon", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-credit-card-2-front-fill", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" }) }) }),
    /* @__PURE__ */ jsx("h2", { children: "Choose Another Way to Pay" }),
    /* @__PURE__ */ jsx("div", { className: "text_wrap form_wrap", children: /* @__PURE__ */ jsxs("form", { id: "update_payment_method_form", action: "", method: "", children: [
      /* @__PURE__ */ jsx("div", { className: "bt-drop-in-wrapper", children: /* @__PURE__ */ jsx("div", { ref: dropInRef, id: "bt-dropin-update" }) }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#",
          className: "button blue",
          onClick: (e) => handleSubmit(e),
          children: "Submit"
        }
      )
    ] }) })
  ] }) });
};
const __vite_glob_0_140 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PaymentMethodsComponent
}, Symbol.toStringTag, { value: "Module" }));
const PlanComponent = ({
  subscription,
  setSubscription,
  userInfo,
  payment_method_token,
  setShowSection,
  setShowLoader
}) => {
  const [currentDateTime, setCurrentDateTime] = useState("");
  useEffect(() => {
    const today = /* @__PURE__ */ new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + ("0" + today.getSeconds()).slice(-2);
    setCurrentDateTime(date);
  }, []);
  const handleResumeClick = (e) => {
    e.preventDefault();
    setShowLoader({
      show: true,
      position: "absolute",
      icon: ""
    });
    const packets = {
      payment_method_token,
      planId: subscription.name
    };
    resumeSubscription(packets).then((response) => {
      if (response.success) {
        setSubscription((prev) => ({
          ...prev,
          ends_date: null,
          braintree_status: "active"
        }));
      }
      setShowLoader({
        show: false,
        position: "",
        icon: ""
      });
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-uppercase", children: "Plan Type" }),
    /* @__PURE__ */ jsx("h4", { children: "Your Current Plan is" }),
    subscription && subscription.braintree_status === "active" || subscription && subscription.braintree_status === "pending" ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "plan_name", children: [
        /* @__PURE__ */ jsx("p", { className: "text-capitalize", children: subscription.name }),
        /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/plan-type-bg.png"), alt: "" })
      ] }),
      userInfo.braintree_id !== "bypass" && /* @__PURE__ */ jsx(
        "a",
        {
          href: "#",
          className: "cancel_link",
          "data-plan": subscription.braintree_id,
          onClick: (e) => setShowSection(["cancel"]),
          children: "Cancel Subscription"
        }
      )
    ] }) : subscription && subscription.ends_at > currentDateTime ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "plan_name", children: [
        /* @__PURE__ */ jsx("p", { className: "text-capitalize", children: subscription.name }),
        /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/plan-type-bg.png"), alt: "" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "canceled_text", children: /* @__PURE__ */ jsxs("p", { children: [
        "Your subscription has been cancelled. It will end on:",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { children: new Date(subscription.ends_at).toLocaleDateString() })
      ] }) })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "plan_name", children: [
      /* @__PURE__ */ jsx("p", { children: "Free" }),
      /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/plan-type-bg.png"), alt: "" })
    ] }),
    subscription && subscription.braintree_status === "active" || subscription && subscription.braintree_status === "pending" ? userInfo.braintree_id !== "bypass" && /* @__PURE__ */ jsx("a", { href: "#", className: "button blue", onClick: (e) => {
      e.preventDefault();
      setShowSection((prev) => [
        ...prev,
        "plans"
      ]);
    }, children: "Change My Plan" }) : subscription && subscription.ends_at > currentDateTime ? /* @__PURE__ */ jsx("form", { action: "", method: "", children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "#",
        className: "button blue",
        onClick: (e) => handleResumeClick(e),
        children: "Resume"
      }
    ) }) : /* @__PURE__ */ jsx(Link$1, { className: "button blue", href: route("plans.get"), children: "Change My Plan" })
  ] });
};
const __vite_glob_0_141 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PlanComponent
}, Symbol.toStringTag, { value: "Module" }));
const UserForm = ({
  userInfo,
  setUserInfo
}) => {
  const { data, setData, put, processing, errors, reset } = useForm({
    email: null,
    password: null,
    password_confirmation: null
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const packets = {
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    };
    updateUserInfo(packets, userInfo.id).then((data2) => {
      if (data2.success) {
        reset("password", "password_confirmation");
        setUserInfo({
          ...userInfo,
          email: data2.email
        });
      }
    });
  };
  const handleFocus = (e) => {
    e.target.classList.add("active");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !isEmpty(errors) && console.log(errors),
    /* @__PURE__ */ jsx("h2", { className: "text-uppercase", children: "Account Info" }),
    /* @__PURE__ */ jsxs("form", { method: "POST", onSubmit: handleSubmit, action: `/update-account/${userInfo.id}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "form_inputs", children: [
        /* @__PURE__ */ jsxs("div", { className: "user_account mb-5 my_row", children: [
          /* @__PURE__ */ jsx("h5", { className: "my_row mb-4 text-left", children: "Update Email" }),
          /* @__PURE__ */ jsxs("div", { className: "input_wrap my_row relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "email",
                type: "email",
                className: `w-full animate bg-white ${userInfo.email ? "active" : ""} ${errors.email ? "border-danger" : ""} `,
                name: "email",
                defaultValue: userInfo.email,
                autoComplete: "email",
                onChange: (e) => setData("email", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx("label", { className: "z-2", htmlFor: "email", children: "E-Mail Address" })
          ] }),
          errors.email && /* @__PURE__ */ jsx("small", { className: "text-red-600 mb-3 block", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user_account", children: [
          /* @__PURE__ */ jsx("h5", { className: "my_row my_row mb-4 text-left", children: "Change Password" }),
          /* @__PURE__ */ jsxs("div", { className: "input_wrap my_row relative mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "password",
                type: "password",
                className: `w-full animate bg-white ${data.password && "active"} ${errors.password && "border-danger"} `,
                name: "password",
                autoComplete: "new-password",
                onChange: (e) => setData("password", e.target.value),
                onFocus: handleFocus
              }
            ),
            /* @__PURE__ */ jsx("label", { className: "z-2", htmlFor: "password", children: "New Password" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "input_wrap my_row relative mb-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "password_confirmation",
              type: "password",
              className: `w-full animate bg-white ${data.password && "active"} ${errors.password_confirmation && "border-danger"} `,
              name: "password_confirmation",
              autoComplete: "new-password",
              onChange: (e) => setData("password_confirmation", e.target.value),
              onFocus: handleFocus
            }
          ),
          /* @__PURE__ */ jsx("label", { className: "z-2", htmlFor: "password_confirmation", children: "Confirm New Password" })
        ] }),
        errors.password && /* @__PURE__ */ jsx("small", { className: "text-red-600 mb-3 block", children: errors.password })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "form_buttons", children: /* @__PURE__ */ jsx("button", { disabled: processing, type: "submit", className: "button blue text-uppercase", children: "Update My Info" }) })
    ] })
  ] });
};
const __vite_glob_0_142 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UserForm
}, Symbol.toStringTag, { value: "Module" }));
const User = ({
  subscriptionInfo,
  payment_method,
  token,
  payment_method_token
}) => {
  const { auth } = usePage().props;
  const permissions = auth.user.permissions;
  const [userInfo, setUserInfo] = useState(auth.user.userInfo);
  const [showSection, setShowSection] = useState([]);
  const [subscription, setSubscription] = useState(subscriptionInfo);
  const [showLoader, setShowLoader] = useState({
    show: false,
    icon: "",
    position: ""
  });
  return /* @__PURE__ */ jsxs(Authenticated, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Edit Accouunt" }),
    /* @__PURE__ */ jsx(SetFlash, {}),
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: `user_account my_row text-center form_page plans ${permissions.includes("view subscription details") ? "mt-4" : ""}`, children: [
      /* @__PURE__ */ jsx("h2", { className: "page_title", children: "Update Account Settings" }),
      /* @__PURE__ */ jsxs("div", { className: `card inline-block relative`, children: [
        showLoader.show && /* @__PURE__ */ jsx(
          Loader,
          {
            showLoader
          }
        ),
        !isEmpty(showSection) && /* @__PURE__ */ jsx(
          BreadCrumbs,
          {
            showSection,
            setShowSection
          }
        ),
        showSection.includes("plans") || showSection.includes("cancel") ? /* @__PURE__ */ jsx(
          ChoosePlanContent,
          {
            showSection,
            setShowSection,
            subscription,
            setSubscription,
            setShowLoader
          }
        ) : showSection.includes("methods") ? /* @__PURE__ */ jsx(
          PaymentMethodsComponent,
          {
            token,
            subscription,
            setShowSection,
            setShowLoader
          }
        ) : /* @__PURE__ */ jsx("div", { className: `w-full inline-block ${permissions.includes("view subscription details") && (!subscription || subscription.braintree_id === "bypass") || !permissions.includes("view subscription details") && permissions.includes("view courses") ? "two_columns" : ""}`, children: /* @__PURE__ */ jsx("div", { className: "card-body w-full inline-block", children: /* @__PURE__ */ jsxs("div", { className: `my_row ${permissions.includes("view subscription details") && (subscription && subscription.braintree_id !== "bypass") ? "three_columns " : ""} ${!subscription || subscription.braintree_id === "bypass" ? "two_columns" : ""}`, children: [
          /* @__PURE__ */ jsx("div", { className: `column update_info ${!permissions.includes("view subscription details") ? "!w-full" : ""}`, children: /* @__PURE__ */ jsx(
            UserForm,
            {
              userInfo,
              setUserInfo
            }
          ) }),
          permissions.includes("view subscription details") && /* @__PURE__ */ jsx("div", { className: "column", children: /* @__PURE__ */ jsx(
            PlanComponent,
            {
              subscription,
              setSubscription,
              userInfo,
              payment_method_token,
              showSection,
              setShowSection,
              setShowLoader
            }
          ) }),
          subscription && subscription.braintree_id !== "bypass" && /* @__PURE__ */ jsx("div", { className: "column", children: /* @__PURE__ */ jsx(
            PaymentComponent,
            {
              paymentMethod: payment_method,
              authToken: token,
              setShowSection
            }
          ) })
        ] }) }) })
      ] })
    ] }) })
  ] });
};
const __vite_glob_0_143 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: User
}, Symbol.toStringTag, { value: "Module" }));
function Welcome({ auth }) {
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "LinkPro" }),
    /* @__PURE__ */ jsx("div", { className: "relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white", children: /* @__PURE__ */ jsxs("div", { className: "guest_home", children: [
      /* @__PURE__ */ jsxs("section", { className: "two_col top", children: [
        /* @__PURE__ */ jsxs("div", { className: "col", children: [
          /* @__PURE__ */ jsx("h2", { children: "Unite Your Audience!" }),
          /* @__PURE__ */ jsx("h3", { children: "Infinite Possibilities." }),
          /* @__PURE__ */ jsx("p", { children: "Connect your followers across all platforms and turn your following into revenue!" }),
          /* @__PURE__ */ jsx("div", { id: "mobile_video", className: "col mobile" }),
          /* @__PURE__ */ jsxs("div", { className: "bottom_row my_row", children: [
            /* @__PURE__ */ jsx(Link$1, { className: "button blue", href: route("register"), children: "Sign up free" }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("em", { children: /* @__PURE__ */ jsx("strong", { children: "Already on LinkPro?" }) }),
              /* @__PURE__ */ jsx(Link$1, { href: route("login"), children: "Log In" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { id: "desktop_video", className: "col desktop", children: /* @__PURE__ */ jsx("div", { className: "video_wrap", children: /* @__PURE__ */ jsxs("video", { autoPlay: true, loop: true, muted: true, playsInline: true, children: [
          /* @__PURE__ */ jsx("source", { src: Vapor.asset("videos/home-image-loop-top-2.mp4"), type: "video/mp4" }),
          /* @__PURE__ */ jsx("source", { src: Vapor.asset("videos/home-image-loop-top-2.webm"), type: "video/webm" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "two_col social_media", children: [
        /* @__PURE__ */ jsx("div", { className: "col left", children: /* @__PURE__ */ jsx("div", { className: "video_wrap", children: /* @__PURE__ */ jsxs("video", { autoPlay: true, loop: true, muted: true, playsInline: true, children: [
          /* @__PURE__ */ jsx("source", { src: Vapor.asset("videos/home-image-loop-bottom.mp4"), type: "video/mp4" }),
          /* @__PURE__ */ jsx("source", { src: Vapor.asset("videos/home-image-loop-bottom.webm"), type: "video/webm" })
        ] }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "col", children: [
          /* @__PURE__ */ jsx("h2", { children: "Link Your Platforms" }),
          /* @__PURE__ */ jsx("p", { children: "Post your exclusive LinkPro link on all of your social media accounts. Cross all of your platforms to skyrocket your brand." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "two_col laptop", children: [
        /* @__PURE__ */ jsxs("div", { className: "col", children: [
          /* @__PURE__ */ jsx("h2", { children: "Get Down To Business" }),
          /* @__PURE__ */ jsx("p", { children: "LinkPro is all about business. We're in this to build all of our clients bottom line. Join Today to let LinkPro help you leverage the intersection of media & business to kick your revenue into gear." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col right", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/laptop-image.png"), alt: "" }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "two_col phone", children: [
        /* @__PURE__ */ jsx("div", { className: "col left", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/img-phone.png"), alt: "" }) }),
        /* @__PURE__ */ jsxs("div", { className: "col", children: [
          /* @__PURE__ */ jsx("h2", { children: "Self-Managed Platform" }),
          /* @__PURE__ */ jsx("p", { children: "LinkPro allows you to create your own private link, add a profile & background image, and create buttons to link all of your social media and business accounts in one place." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "two_col bottom", children: [
        /* @__PURE__ */ jsxs("div", { className: "col", children: [
          /* @__PURE__ */ jsx("h2", { children: "Cross Promote To Increase Revenue" }),
          /* @__PURE__ */ jsx("p", { children: "Contact Us to discuss how LinkPro will work directly with you to cross promote other products & services to increase your bottom line. Get paid every week for all revenue generated from our partners." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col right", children: /* @__PURE__ */ jsx("img", { src: Vapor.asset("images/bottom-image.png"), alt: "" }) })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_144 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
window.axios = axios$1;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.$ = $$1;
const app$1 = "";
const app = "";
window._ = _;
Vapor$1.withBaseAssetUrl("http://linkpro-new.test/");
window.Vapor = Vapor$1;
const appName = "LinkPro";
createServer(
  (page) => createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name2) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/AllCourses/ColumnComponent.jsx": __vite_glob_0_0, "./Pages/AllCourses/Courses.jsx": __vite_glob_0_1, "./Pages/Auth/ConfirmPassword.jsx": __vite_glob_0_2, "./Pages/Auth/ForgotPassword.jsx": __vite_glob_0_3, "./Pages/Auth/Login.jsx": __vite_glob_0_4, "./Pages/Auth/Register.jsx": __vite_glob_0_5, "./Pages/Auth/ResetPassword.jsx": __vite_glob_0_6, "./Pages/Auth/VerifyEmail.jsx": __vite_glob_0_7, "./Pages/Checkout/Checkout.jsx": __vite_glob_0_8, "./Pages/Checkout/Components/CheckoutLayout.jsx": __vite_glob_0_9, "./Pages/Checkout/Components/LoginModal.jsx": __vite_glob_0_10, "./Pages/Contact/Contact.jsx": __vite_glob_0_11, "./Pages/Contact/ContactForm.jsx": __vite_glob_0_12, "./Pages/Contact/ContactLayout.jsx": __vite_glob_0_13, "./Pages/CourseCreator/Components/AddSectionLink.jsx": __vite_glob_0_14, "./Pages/CourseCreator/Components/CategoryComponent.jsx": __vite_glob_0_15, "./Pages/CourseCreator/Components/ColorPicker.jsx": __vite_glob_0_16, "./Pages/CourseCreator/Components/DeleteSection.jsx": __vite_glob_0_17, "./Pages/CourseCreator/Components/DropdownComponent.jsx": __vite_glob_0_18, "./Pages/CourseCreator/Components/ImageComponent.jsx": __vite_glob_0_19, "./Pages/CourseCreator/Components/InputComponent.jsx": __vite_glob_0_20, "./Pages/CourseCreator/Components/Preview/Hero.jsx": __vite_glob_0_21, "./Pages/CourseCreator/Components/Preview/Preview.jsx": __vite_glob_0_22, "./Pages/CourseCreator/Components/Preview/PreviewSection.jsx": __vite_glob_0_23, "./Pages/CourseCreator/Components/Preview/SectionImage.jsx": __vite_glob_0_24, "./Pages/CourseCreator/Components/Preview/SectionVideo.jsx": __vite_glob_0_25, "./Pages/CourseCreator/Components/Preview/TopBar.jsx": __vite_glob_0_26, "./Pages/CourseCreator/Components/PublishButton.jsx": __vite_glob_0_27, "./Pages/CourseCreator/Components/Section.jsx": __vite_glob_0_28, "./Pages/CourseCreator/Components/SectionButtonOptions.jsx": __vite_glob_0_29, "./Pages/CourseCreator/Components/SwitchOptions.jsx": __vite_glob_0_30, "./Pages/CourseCreator/Components/VideoComponent.jsx": __vite_glob_0_31, "./Pages/CourseCreator/CourseCreator.jsx": __vite_glob_0_32, "./Pages/CourseCreator/Reducer.jsx": __vite_glob_0_33, "./Pages/CreatorCenter/Components/Preview.jsx": __vite_glob_0_34, "./Pages/CreatorCenter/Components/PreviewSection.jsx": __vite_glob_0_35, "./Pages/CreatorCenter/Components/SwitchOptions.jsx": __vite_glob_0_36, "./Pages/CreatorCenter/Components/TableComponent.jsx": __vite_glob_0_37, "./Pages/CreatorCenter/CreatorCenter.jsx": __vite_glob_0_38, "./Pages/Dashboard.jsx": __vite_glob_0_39, "./Pages/Dashboard/Components/Folder/AddFolder.jsx": __vite_glob_0_40, "./Pages/Dashboard/Components/Folder/FolderLink.jsx": __vite_glob_0_41, "./Pages/Dashboard/Components/Folder/FolderLinks.jsx": __vite_glob_0_42, "./Pages/Dashboard/Components/Folder/FolderNameInput.jsx": __vite_glob_0_43, "./Pages/Dashboard/Components/Link/AddLink.jsx": __vite_glob_0_44, "./Pages/Dashboard/Components/Link/Forms/AccordionLink.jsx": __vite_glob_0_45, "./Pages/Dashboard/Components/Link/Forms/CustomForm.jsx": __vite_glob_0_46, "./Pages/Dashboard/Components/Link/Forms/DeleteIcon.jsx": __vite_glob_0_47, "./Pages/Dashboard/Components/Link/Forms/DropdownComponent.jsx": __vite_glob_0_48, "./Pages/Dashboard/Components/Link/Forms/FormBreadcrumbs.jsx": __vite_glob_0_49, "./Pages/Dashboard/Components/Link/Forms/InputComponent.jsx": __vite_glob_0_50, "./Pages/Dashboard/Components/Link/Forms/InputTypeRadio.jsx": __vite_glob_0_51, "./Pages/Dashboard/Components/Link/Forms/IntegrationForm.jsx": __vite_glob_0_52, "./Pages/Dashboard/Components/Link/Forms/IntegrationType.jsx": __vite_glob_0_53, "./Pages/Dashboard/Components/Link/Forms/Mailchimp/MailchimpIntegration.jsx": __vite_glob_0_54, "./Pages/Dashboard/Components/Link/Forms/Mailchimp/MailchimpLists.jsx": __vite_glob_0_55, "./Pages/Dashboard/Components/Link/Forms/Shopify/AllProducts.jsx": __vite_glob_0_56, "./Pages/Dashboard/Components/Link/Forms/Shopify/SelectedProducts.jsx": __vite_glob_0_57, "./Pages/Dashboard/Components/Link/Forms/Shopify/ShopifyAddProducts.jsx": __vite_glob_0_58, "./Pages/Dashboard/Components/Link/Forms/Shopify/ShopifyIntegration.jsx": __vite_glob_0_59, "./Pages/Dashboard/Components/Link/Forms/Shopify/SingleProduct.jsx": __vite_glob_0_60, "./Pages/Dashboard/Components/Link/Forms/Shopify/StoreDropdown.jsx": __vite_glob_0_61, "./Pages/Dashboard/Components/Link/Forms/StandardForm.jsx": __vite_glob_0_62, "./Pages/Dashboard/Components/Link/IconList.jsx": __vite_glob_0_63, "./Pages/Dashboard/Components/Link/Link.jsx": __vite_glob_0_64, "./Pages/Dashboard/Components/Link/LinkItems.jsx": __vite_glob_0_65, "./Pages/Dashboard/Components/Link/Links.jsx": __vite_glob_0_66, "./Pages/Dashboard/Components/LivePageButton.jsx": __vite_glob_0_67, "./Pages/Dashboard/Components/Page/AddPageForm.jsx": __vite_glob_0_68, "./Pages/Dashboard/Components/Page/PageBio.jsx": __vite_glob_0_69, "./Pages/Dashboard/Components/Page/PageHeader.jsx": __vite_glob_0_70, "./Pages/Dashboard/Components/Page/PageHeaderLayout.jsx": __vite_glob_0_71, "./Pages/Dashboard/Components/Page/PageName.jsx": __vite_glob_0_72, "./Pages/Dashboard/Components/Page/PageNav.jsx": __vite_glob_0_73, "./Pages/Dashboard/Components/Page/PageProfile.jsx": __vite_glob_0_74, "./Pages/Dashboard/Components/Page/PageTitle.jsx": __vite_glob_0_75, "./Pages/Dashboard/Components/Preview/Header.jsx": __vite_glob_0_76, "./Pages/Dashboard/Components/Preview/Preview.jsx": __vite_glob_0_77, "./Pages/Dashboard/Components/Preview/PreviewButton.jsx": __vite_glob_0_78, "./Pages/Dashboard/Components/Preview/ProfileImage.jsx": __vite_glob_0_79, "./Pages/Dashboard/Components/Preview/ProfileText.jsx": __vite_glob_0_80, "./Pages/Dashboard/Dashboard.jsx": __vite_glob_0_81, "./Pages/Error/Index.jsx": __vite_glob_0_82, "./Pages/HowItWorks/Index.jsx": __vite_glob_0_83, "./Pages/HowItWorks/PageLayout.jsx": __vite_glob_0_84, "./Pages/LPCreator/Components/AddSectionLink.jsx": __vite_glob_0_85, "./Pages/LPCreator/Components/ColorPicker.jsx": __vite_glob_0_86, "./Pages/LPCreator/Components/DeleteSection.jsx": __vite_glob_0_87, "./Pages/LPCreator/Components/DropdownComponent.jsx": __vite_glob_0_88, "./Pages/LPCreator/Components/EditorComponent.jsx": __vite_glob_0_89, "./Pages/LPCreator/Components/ImageComponent.jsx": __vite_glob_0_90, "./Pages/LPCreator/Components/InputComponent.jsx": __vite_glob_0_91, "./Pages/LPCreator/Components/Preview/Hero.jsx": __vite_glob_0_92, "./Pages/LPCreator/Components/Preview/Preview.jsx": __vite_glob_0_93, "./Pages/LPCreator/Components/Preview/PreviewSection.jsx": __vite_glob_0_94, "./Pages/LPCreator/Components/Preview/SectionImage.jsx": __vite_glob_0_95, "./Pages/LPCreator/Components/Preview/TopBar.jsx": __vite_glob_0_96, "./Pages/LPCreator/Components/PublishButton.jsx": __vite_glob_0_97, "./Pages/LPCreator/Components/Section.jsx": __vite_glob_0_98, "./Pages/LPCreator/Components/SectionButtonOptions.jsx": __vite_glob_0_99, "./Pages/LPCreator/LPCreator.jsx": __vite_glob_0_100, "./Pages/LPCreator/Reducer.jsx": __vite_glob_0_101, "./Pages/LiveLP/LandingPage.jsx": __vite_glob_0_102, "./Pages/LiveLP/SectionComponent.jsx": __vite_glob_0_103, "./Pages/LivePage/LivePage.jsx": __vite_glob_0_104, "./Pages/Plans/ConfirmChange.jsx": __vite_glob_0_105, "./Pages/Plans/Plans.jsx": __vite_glob_0_106, "./Pages/PreRegister/PreRegister.jsx": __vite_glob_0_107, "./Pages/Profile/Edit.jsx": __vite_glob_0_108, "./Pages/Profile/Partials/DeleteUserForm.jsx": __vite_glob_0_109, "./Pages/Profile/Partials/UpdatePasswordForm.jsx": __vite_glob_0_110, "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": __vite_glob_0_111, "./Pages/Register/Components/CreatePageForm.jsx": __vite_glob_0_112, "./Pages/Register/Components/Facebook.jsx": __vite_glob_0_113, "./Pages/Register/Components/FormButtons.jsx": __vite_glob_0_114, "./Pages/Register/Components/Instagram.jsx": __vite_glob_0_115, "./Pages/Register/Components/SocialMediaForms.jsx": __vite_glob_0_116, "./Pages/Register/Components/TikTok.jsx": __vite_glob_0_117, "./Pages/Register/Components/Twitter.jsx": __vite_glob_0_118, "./Pages/Register/CreatePage.jsx": __vite_glob_0_119, "./Pages/Setup/AccordionData.jsx": __vite_glob_0_120, "./Pages/Setup/Components/Accordion.jsx": __vite_glob_0_121, "./Pages/Setup/Index.jsx": __vite_glob_0_122, "./Pages/SingleCourse/Components/ColumnComponent.jsx": __vite_glob_0_123, "./Pages/SingleCourse/Components/VideoComponent.jsx": __vite_glob_0_124, "./Pages/SingleCourse/Course.jsx": __vite_glob_0_125, "./Pages/Stats/Components/AffiliateStats.jsx": __vite_glob_0_126, "./Pages/Stats/Components/Filters.jsx": __vite_glob_0_127, "./Pages/Stats/Components/FolderStats.jsx": __vite_glob_0_128, "./Pages/Stats/Components/LinkStats.jsx": __vite_glob_0_129, "./Pages/Stats/Components/PageStats.jsx": __vite_glob_0_130, "./Pages/Stats/Components/RefreshButton.jsx": __vite_glob_0_131, "./Pages/Stats/Components/Table.jsx": __vite_glob_0_132, "./Pages/Stats/Stats.jsx": __vite_glob_0_133, "./Pages/Subscription/Components/PromoComponent.jsx": __vite_glob_0_134, "./Pages/Subscription/Purchase.jsx": __vite_glob_0_135, "./Pages/User/Components/BreadCrumbs.jsx": __vite_glob_0_136, "./Pages/User/Components/ChoosePlanContent.jsx": __vite_glob_0_137, "./Pages/User/Components/ConfirmPlanChange.jsx": __vite_glob_0_138, "./Pages/User/Components/PaymentComponent.jsx": __vite_glob_0_139, "./Pages/User/Components/PaymentMethodsComponent.jsx": __vite_glob_0_140, "./Pages/User/Components/PlanComponent.jsx": __vite_glob_0_141, "./Pages/User/Components/UserForm.jsx": __vite_glob_0_142, "./Pages/User/User.jsx": __vite_glob_0_143, "./Pages/Welcome.jsx": __vite_glob_0_144 });
      return pages[`./Pages/${name2}.jsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
