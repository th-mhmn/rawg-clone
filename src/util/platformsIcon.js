// Import SVG
import windows from "../icons/windows.svg";
import apple from "../icons/apple.svg";
import xbox from "../icons/xbox.svg";
import playStation from "../icons/playStation.svg";
import linux from "../icons/linux.svg";
import nintendo from "../icons/nintendo.svg";
import gamepad from "../icons/gamepad.svg";
import android from "../icons/android.svg";
import iphone from "../icons/iphone.svg";

export const getPlatform = (platform) => {
  switch (platform) {
    case "PlayStation":
      return playStation;
    case "Xbox":
      return xbox;
    case "PC":
      return windows;
    case "Nintendo":
      return nintendo;
    case "Apple Macintosh":
      return apple;
    case "Linux":
      return linux;
    case "iOS":
      return iphone;
    case "Android":
      return android;
    default:
      return gamepad;
  }
};

export const getBlackPlatform = (platform) => {
  switch (platform){
    case "PlayStation":
      return playStation;
    case "Xbox":
      return xbox;
    case "PC":
           return windows;
    case "Nintendo":
      return nintendo;
    case "Apple Macintosh":
      return apple;
    case "Linux":
      return linux;
    case "iOS":
      return iphone;
    case "Android":
      return android;
    default:
      return gamepad;
  }
}
