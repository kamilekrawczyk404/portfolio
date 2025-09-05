"use client";
import React, { FC, type JSX, ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/redux/store";

type StoreProviderProps = {
  children: ReactNode;
};

const StoreProvider = ({ children }: StoreProviderProps): JSX.Element => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
