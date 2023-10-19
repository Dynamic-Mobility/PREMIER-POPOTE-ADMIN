import MKButton from "../@mui-components/button";
import {useRouter} from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButtonLink = props => {
    const { label = "Go back" } = props;
    const router = useRouter();
    const handleOnBack = () => {
        router.back();
    }
    return (
        <>
            <MKButton
                color={'primary'}
                variant={'text'}
                onClick={handleOnBack}
                startIcon={<ArrowBackIcon/>}
                sx={{ textTransform: 'capitalize'}}
            >
                {label}
            </MKButton>
        </>
    )
}

export default BackButtonLink;