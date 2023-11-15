import {alpha, Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import React, {useState} from "react";
import DMTTextInput from "../../@dmt-components/form/text-input";
import MKBox from "../../@mui-components/box";
import {Scrollbar} from "../../@mui-components/scrollbar";
import RoleItem from "./role-item";
import MKTypography from "../../@mui-components/typography";
import {useSelector} from "react-redux";
import MKButton from "../../@mui-components/button";
import {LoaderIcon} from "react-hot-toast";
import ArrowRight from "@mui/icons-material/ArrowRight";
import {getInitials} from "../../../utils/helper-functions";
import {Add} from "@mui/icons-material";
const filterSearch = (options,  query) => {
    return options.filter((option) => {
        if (query){
            const name = option?.name.toLowerCase();
            return name?.includes(query.toLowerCase());
        }
        return true;
    });
}

const RolesList = props => {
    const { selectedRole, onSelect, onAdd} = props;
    const { roles , isLoadingTypes } = useSelector(({ roles }) => roles);
    const [query, setQuery] = useState('');

    const rolesList = filterSearch(roles, query);

    const handleOnChange = e => {
        setQuery(e.target.value);
    }

    return(
        <>
            <MKBox sx={{ display: 'flex', p:1, gap:2, flexDirection: 'column',}}>

                  <MKButton sx={{ width: '100%'}} onClick={onAdd} variant={'contained'} color={'primary'}>
                      {"Add New Role"}
                  </MKButton>
                <MKTypography variant={'caption'} sx={{ mt:2,}}>
                    {"EXISTING PROFILES"}
                </MKTypography>
                <DMTTextInput
                    fullWidth={true}
                    placeholder="Search..."
                    size={'small'}
                    label={"Search"}
                    type={"search"}
                    value={query}
                    onChange={handleOnChange}
                />
            </MKBox>



            {isLoadingTypes ? (
                <>
                    <MKTypography sx={{p:2}} align={'center'}>
                        {"Loading..."}
                    </MKTypography>
                </>
            ) : (
                <>
                    {rolesList.length > 0 ? (
                        <Scrollbar
                            autoHide={false}
                            forceVisible={true}
                            sx={{
                                height: "80%",
                                pr: 1,
                            }}
                        >
                            <List sx={{ px:1 }}  aria-label="product list">
                                {rolesList.map((role, index) => (
                                    <RoleItem key={ index} {...{selectedRole,  role, onSelect}}/>
                                ))}
                            </List>
                        </Scrollbar>
                    ) : (
                        <MKTypography sx={{p:2}} align={'center'}>
                            {"No profiles found."}
                        </MKTypography>
                    )}
                </>
            )}


        </>
    )
}

export default RolesList;