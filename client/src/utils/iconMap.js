import sunIcon from "../assets/icons/sun.svg";
import cloudSunIcon from "../assets/icons/cloud-sun.svg";
import cloudIcon from "../assets/icons/cloud.svg";
import smogIcon from "../assets/icons/smog.svg";
import cloudShowersHeavyIcon from "../assets/icons/cloud-showers-heavy.svg";
import snowflakeIcon from "../assets/icons/snowflake.svg";
import cloudBoltIcon from "../assets/icons/cloud-bolt.svg";

export const ICON_MAP = new Map();

const addIcon = (values, icon) => {
  values.forEach((value) => {
    ICON_MAP.set(value, icon);
  });
};

addIcon([0, 1], sunIcon);
addIcon([2], cloudSunIcon);
addIcon([3], cloudIcon);
addIcon([45, 48], smogIcon);
addIcon(
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  cloudShowersHeavyIcon
);
addIcon([71, 74, 75, 77, 85, 86], snowflakeIcon);
addIcon([95, 96, 99], cloudBoltIcon);
