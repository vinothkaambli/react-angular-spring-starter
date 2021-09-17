import React from "react";
import { FetcherContext, IFetcher } from "./Client";

export default function useFetcher(): IFetcher {
    const fetcher = React.useContext(FetcherContext)
    return fetcher!;
}