import {useState} from "react";
import MKBox from "../../@mui-components/box";
import {Collapse, Grid} from "@mui/material";
import MKTypography from "../../@mui-components/typography";
import LimitsLottie from "../../lottie-files/limits-lottie";
import RolesList from "./roles-list";
import MKButton from "../../@mui-components/button";
import AddIcon from "@mui/icons-material/AddCircle";
import RolesForm from "./roles-form";

const UserRoles = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const handleOnSelect = async role => {
        setSelectedRole(role);
    }

    const handleOnAdd = () => {
        setSelectedRole(null)
    }


    return (
        <>
            <MKBox>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={4} xs={12}>

                        <RolesList
                            selectedRole={selectedRole}
                            onSelect={handleOnSelect}
                            onAdd={handleOnAdd}
                        />
                    </Grid>
                    <Grid sx={{ px:1 }} item sm={12} md={8} xs={12}>
                        <RolesForm
                            role={selectedRole}
                            key={selectedRole?.id}
                        />
                    </Grid>
                </Grid>
            </MKBox>
        </>
    )
}

export default UserRoles;