import { useState, useEffect } from "react";
import { useInject } from "inversify-hooks";
import { StateManager } from "@application/state";
import { IOC } from "@ioc";
import { Observer } from "@domain/seedwork/observer";

export const useLocale = () => {
  const [stateManager] = useInject<StateManager>(IOC.STATE_MANAGER);
  const [locale, setLocale] = useState<string>(stateManager.state.locale);

  const observer: Observer = {
    notify: () => setLocale(stateManager.state.locale),
  };

  useEffect(() => {
    stateManager.register(observer);
    return () => stateManager.unregister(observer);
  }, [observer, stateManager]);

  return { locale };
};
