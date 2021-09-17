import { makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import React from 'react';
import { Grid, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { IUser } from './Client';
import useFetcher from './useFetcher';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    margin: {
        margin: theme.spacing(1)
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    item: {
        padding: 20,
    },
    button: {
        padding: 10,
    }
}));

export const Header = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState("0");
    const fetcher = useFetcher();

    const submitData = async () => {
        const res = await fetcher.json<IUser>('/api/post', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'VINO',
                point: value
            })
        });
        console.log(res);
    }

    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item className={classes.item}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Point</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            labelWidth={60}
                        />
                    </FormControl>
                </Grid>
                <Grid item className={classes.item}>
                    <div className={classes.button}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={(event) => submitData()}
                        >
                            Save
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}