import CurrencyFormat from "react-currency-format";
import {RedditTextField} from "./text-input";
const DMTCurrencyInput = props => {
    const { value, onChange, prefix = '', error, onBlur, placeholder, helperText, autoFocus, ...other } = props;

    return(
        <>
            <CurrencyFormat
                value={value}
                allowNegative={false}
                onValueChange={onChange}
                fixedDecimalScale={false}
                //isNumericString={true}
                decimalScale={2}
                thousandSeparator={true}
                prefix={prefix+' '}
                customInput={RedditTextField}
                error={error}
                onBlur={onBlur}
                placeholder={placeholder}
                autoFocus={autoFocus}

                helperText={helperText}
                {...other}
                //name={'sumAssured'}
                //onBlur={formik.handleBlur}
            />
        </>
    )
}

export default DMTCurrencyInput;