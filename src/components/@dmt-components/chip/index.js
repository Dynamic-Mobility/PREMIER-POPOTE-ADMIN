import {alpha, Chip} from "@mui/material";
import CurrencyFormat from "react-currency-format";

const DMTChip = props => {
    const { numeral = false, label, color, ...other } = props

    if (numeral){
        return (
            <Chip
                sx={{
                    width: '200px',
                    borderRadius: 1,
                    backgroundColor: theme => alpha(theme.palette[color].main, 0.1),
                    fontWeight: 'bold',
                    fontSize: 'inherit',
                }}
                label={
                    <CurrencyFormat
                        displayType={'text'}
                        value={label}
                        thousandSeparator={true}
                        prefix={''}
                    />
                }
                color={color}
                variant={"outlined"}
                {...other}
            />
        )
    }

    return (
        <Chip
            label={label}
            color={color}
            variant={"outlined"}
            {...other}
        />
    )
}

export default DMTChip;