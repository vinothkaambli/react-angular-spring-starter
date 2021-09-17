import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { FetcherContext, IFetcher } from "./Client";
import { Header } from "./Header";
import { Grid, Table } from '@material-ui/core';
import TableComponent from "./Table";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0096D6'
    }
  }
});

function App() {
  const fetcher: IFetcher = {
    async json<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
      try {
        const response: Response | void = await Promise.race([fetch(input, init), new Promise<void>(resolve => setTimeout(resolve, 300))]);
        let result;
        if (response && response.ok) {
          result = response.json();
          return result;
        }
        throw response
      }
      catch (e) {
        console.log(e);
        throw Promise.reject();
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <FetcherContext.Provider value={fetcher}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <TableComponent />
          </Grid>
        </Grid>
      </FetcherContext.Provider>
    </ThemeProvider>
  );
}

export default App;
