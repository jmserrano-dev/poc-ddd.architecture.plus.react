import { Spin } from "antd";
import { useInject } from "inversify-hooks";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { IOC } from "ioc";
import { StateManager } from "application/state";
import { Observer } from "domain/seedwork/observer";

interface ILoading {}

const Loading = ({ children }: PropsWithChildren<ILoading>) => {
  const [stateManager] = useInject<StateManager>(IOC.STATE_MANAGER);
  const [loading, setLoading] = useState(stateManager.state.loading);

  useEffect(() => {
    const observer: Observer = {
      notify: () => setLoading(stateManager.state.loading),
    };

    stateManager.register(observer);
    return () => stateManager.unregister(observer);
  }, [stateManager]);

  return <Spin spinning={loading}>{children}</Spin>;
};

export const withLoading = <P extends object>(
  Component: React.ComponentType<P>
) => (props: P) => (
  <Loading>
    <Component {...props} />
  </Loading>
);
