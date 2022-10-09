import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Button from '@mui/material/Button';


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

  return (
    <div className="d-flex justify-content-end align-items-center language-select-root">
      <Button  onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
        <span className="white">{languageMap[selected]?.label} </span>
        <ArrowDropDown className="white" fontSize="small" />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <div>
          <List>
            <ListSubheader
            >{t("select_language")}</ListSubheader>
            {Object.keys(languageMap)?.map(item => (
              <ListItem
                button
                key={item}
                onClick={() => {
                  i18next.changeLanguage(item);
                  setMenuAnchor(null);
                }}
              >
                {languageMap[item].label}
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </div>
 
  );
};


export default LanguageSelect;

  
















