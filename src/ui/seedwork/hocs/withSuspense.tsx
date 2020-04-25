import React, { PropsWithChildren } from "react";
import { Spin } from "antd";

interface ISuspenseProps {}

const Suspense = ({ children }: PropsWithChildren<ISuspenseProps>) => {
  return <React.Suspense fallback={<Spin />}>{children}</React.Suspense>;
};

export const withSuspense = <P extends object>(
  Component: React.ComponentType<P>
) => (props: P) => (
  <Suspense>
    <Component {...props} />
  </Suspense>
);
