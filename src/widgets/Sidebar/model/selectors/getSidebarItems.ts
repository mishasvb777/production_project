import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entites/User";
import { SidebarItemType } from "../types/sidebar";
import { RoutePatch } from "shared/config/routeConfig/routeConfig";
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';

export const getSidebarItems = createSelector(
  getUserAuthData, (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: RoutePatch.main,
        Icon: MainIcon,
        text: "Главная"
      },
      {
        path: RoutePatch.about,
        Icon: AboutIcon,
        text: "О сайте"
      },     
    ];

    if(userData) {
      sidebarItemsList.push(
        {
          path: RoutePatch.profile + userData?.id,
          Icon: ProfileIcon,
          text: "Профиль",
          authOnly: true
        },
        {
          path: RoutePatch.articles,
          Icon: ProfileIcon,
          text: "Статьи",
          authOnly: true
        },
      )
    }

    return sidebarItemsList;
  }
)



