/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";

import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLang, updateTheme } from "../store/settingsSlice";
import { RootState } from "../store/store";

export const StyledSettings = styled("ul")`
  background: rgba(0, 0, 0, 0.5);
`;

export const StyledSettingsItem = styled("li")`
  background: rgba(255, 255, 255, 0.5);
`;

export function Settings() {
  const { lang, theme } = useSelector(
    (state: RootState) => state.persist.settings,
  );
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { register, getValues } = useForm({
    defaultValues: {
      lang: lang || "en",
      theme: theme || "colorful",
    },
  });

  const onChangeLang = () => {
    const langValue = getValues().lang;
    dispatch(updateLang(langValue));
    i18n.changeLanguage(langValue);
  };

  const onChangeTheme = () => {
    const themeValue = getValues().theme;
    dispatch(updateTheme(themeValue));
  };

  return (
    <StyledSettings>
      <StyledSettingsItem>
        {t("settings.lang.title")}
        <Form onChange={onChangeLang}>
          <input {...register("lang")} type="radio" value="en" id="en" />
          <label htmlFor="en">{t("settings.lang.en")}</label>
          <input {...register("lang")} type="radio" value="ru" id="ru" />
          <label htmlFor="ru">{t("settings.lang.ru")}</label>
        </Form>
      </StyledSettingsItem>
      <StyledSettingsItem>
        {t("settings.theme.title")}
        <Form onChange={onChangeTheme}>
          <input
            {...register("theme")}
            type="radio"
            value="colorful"
            id="colorful"
          />
          <label htmlFor="colorful">{t("settings.theme.colorful")}</label>
          <input {...register("theme")} type="radio" value="blend" id="blend" />
          <label htmlFor="blend">{t("settings.theme.blend")}</label>
        </Form>
      </StyledSettingsItem>
    </StyledSettings>
  );
}
