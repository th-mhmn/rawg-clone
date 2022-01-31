// Import SVG
import app_store_black from "../icons/app_store_black.svg";
import app_store_grey from "../icons/app_store_grey.svg";
import epic_black from "../icons/epic_black.svg";
import epic_grey from "../icons/epic_grey.svg";
import gog_grey from "../icons/gog_grey.svg";
import gog_black from "../icons/gog_black.svg";
import itch_black from "../icons/itch_black.svg";
import itch_grey from "../icons/itch_grey.svg";
import nintendo_store_grey from "../icons/nintendo_store_grey.svg";
import nintendo_store_black from "../icons/nintendo_store_black.svg";
import playstation_black from "../icons/playstation_black.svg";
import playstation_grey from "../icons/playstation_grey.svg";
import playstore_grey from "../icons/playstore_grey.svg";
import playstore_black from "../icons/playstore_black.svg";
import steam_black from "../icons/steam_black.svg";
import steam_grey from "../icons/steam_grey.svg";
import xbox_grey from "../icons/xbox_grey.svg";
import xbox_black from "../icons/xbox_black.svg";

export const getStoreIcon = (store) => {
  switch (store) {
    case "steam-grey":
      return steam_grey;
    case "steam-black":
      return steam_black;
    case "playstation-store-grey":
      return playstation_grey;
    case "playstation-store-black":
      return playstation_black;
    case "xbox-store-grey":
      return xbox_grey;
    case "xbox-store-black":
      return xbox_black;
    case "apple-appstore-grey":
      return app_store_grey;
    case "apple-appstore-black":
      return app_store_black;
    case "gog-grey":
      return gog_grey;
    case "gog-black":
      return gog_black;
    case "nintendo-black":
      return nintendo_store_black;
    case "nintendo-grey":
      return nintendo_store_grey;
    case "xbox360-black":
      return xbox_black;
    case "xbox360-grey":
      return xbox_grey;
    case "google-play-black":
      return playstore_black;
    case "google-play-grey":
      return playstore_grey;
    case "itch-black":
      return itch_black;
    case "itch-grey":
      return itch_grey;
    case "epic-games-black":
      return epic_black;
    case "epic-games-grey":
      return epic_grey;
  }
};
