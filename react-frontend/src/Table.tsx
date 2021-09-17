import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import { IUser } from './Client';
import useFetcher from './useFetcher';

export interface ITable {
    id: string,
    label: string,
    minWidth: number
}

const columns: ITable[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'point', label: 'Point', minWidth: 100 }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    item: {
        padding: 20,
    },
    button: {
        padding: 10,
    }
});

export default function TableComponent() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState<IUser[]>([]);
    const fetcher = useFetcher();

    const openListener = (event: any) => {
        console.log('Successfully established connection');
    }

    const messageListener = (message: any) => {
        const data = JSON.parse(message.data);
        console.log('Successfully established connection');
    }

    const closeListener = (event: any) => {
        console.log('Successfully closed connection');
    }

    const errorListener = (event: any) => {
        console.log('Error connection');
    }

    useEffect(() => {
        var client = new WebSocket('ws://localhost:3030');
        client.addEventListener('open', openListener);
        client.addEventListener('message', messageListener);
        client.addEventListener('close', closeListener);
        client.addEventListener('error', errorListener);
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            console.log('inside interval');
            let res = await fetcher.json<IUser[]>('/api/get', {
                method: "GET"
            });
            setRows(res);
        }, 10000)
        return () => {
            console.log('clearing interval', interval);
            clearInterval(interval);
        };
    }, [rows]);

    return (
        <Grid container justifyContent="center">
            <Grid item className={classes.item}>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column, index) => (
                                        <TableCell
                                            key={index}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow hover tabIndex={-1} key={index}>
                                        <TableCell>
                                            {row.name}
                                        </TableCell>
                                        <TableCell>
                                            {row.point}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
}
