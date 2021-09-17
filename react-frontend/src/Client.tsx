import React from "react";

export interface IFetcher {
    json<T>(input: RequestInfo, init?: RequestInit): Promise<T>
}

export interface IUser {
    name: string,
    point: string
}

export const FetcherContext = React.createContext<IFetcher | null>(null);