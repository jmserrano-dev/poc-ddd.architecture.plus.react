import { useTranslation } from "react-i18next";

export const useTranslator = () => {
  const { t } = useTranslation();
  return { t };
};
