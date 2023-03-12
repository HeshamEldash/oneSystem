import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";
import NavMenu from "../components/ui/NavMenu";
import {
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";

const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  ar: { label: "العربية", dir: "rtl", active: false },
};

const LanguageSelect = () => {
  const selected = localStorage.getItem("i18nextLng") || "en";
  // !selected && selected = "en"
  const { t } = useTranslation();

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  React.useEffect(() => {
    document.body.dir = languageMap[selected]?.dir;
  }, [menuAnchor, selected]);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="d-flex justify-content-end align-items-center language-select-root">
      <Button ref={anchorRef} onClick={handleToggle}>
        <span className="white">{languageMap[selected]?.label || "Language" } </span>
        <ArrowDropDown className="white" fontSize="small" />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          zIndex: "200",
        }}
      >
        <Paper
          sx={{
            boxShadow: "var(--deepShadow)",
            backgroundColor: "white",
            paddingBlock: "10px",
            zIndex: "200",
            position: "sticky",
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={open}
              id="composition-menu"
              aria-labelledby="composition-button"

            >
              <ListSubheader
                disableSticky
              >{t("select_language")}</ListSubheader>
              {Object.keys(languageMap)?.map((item) => (
                <MenuItem
                  key={item}
                  onClick={() => {
                    i18next.changeLanguage(item);
                    setOpen(false);
                  }}
                >
                  {languageMap[item].label}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
};

export default LanguageSelect;

// import React from "react";
// import { useTranslation } from "react-i18next";
// import i18next from "i18next";

// import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
// import Popover from "@mui/material/Popover";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListSubheader from "@mui/material/ListSubheader";
// import Button from "@mui/material/Button";
// import NavMenu from "../components/ui/NavMenu";
// import { Popper } from "@mui/material";

// const languageMap = {
//   en: { label: "English", dir: "ltr", active: true },
//   ar: { label: "العربية", dir: "rtl", active: false },
// };

// const LanguageSelect = () => {
//   const selected = localStorage.getItem("i18nextLng") || "en";
//   // !selected && selected = "en"
//   const { t } = useTranslation();

//   const [menuAnchor, setMenuAnchor] = React.useState(null);
//   React.useEffect(() => {
//     document.body.dir = languageMap[selected]?.dir;
//   }, [menuAnchor, selected]);

//   return (
//     <div className="d-flex justify-content-end align-items-center language-select-root">

//       <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
//         <span className="white">{languageMap[selected]?.label} </span>
//         <ArrowDropDown className="white" fontSize="small" />
//       </Button>
//       <Popover
//         open={!!menuAnchor}
//         anchorEl={menuAnchor}
//         onClose={() => setMenuAnchor(null)}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <div>
//           <List>
//             <ListSubheader>{t("select_language")}</ListSubheader>
//             {Object.keys(languageMap)?.map((item) => (
//               <ListItem

//                 key={item}
//                 onClick={() => {
//                   i18next.changeLanguage(item);
//                   setMenuAnchor(null);
//                 }}
//               >
//                 {languageMap[item].label}
//               </ListItem>
//             ))}
//           </List>
//         </div>
//       </Popover>

//     </div>
//   );
// };

// export default LanguageSelect;
