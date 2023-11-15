import {useSelector} from "../../../store";
import DMTAccordion from "../../@dmt-components/accordion";
import MKBox from "../../@mui-components/box";
import {
    Checkbox, Collapse,
    FormControlLabel,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import React from "react";
import {CheckBox, CheckBoxOutlineBlank} from "@mui/icons-material";
import MKTypography from "../../@mui-components/typography";

const PermissionsForm = props => {
    const { selectedPerms, onPermsChange, isEditable } = props;
    const { menus } = useSelector(({ roles }) => roles);
    const wrapperClass = !isEditable ? "wrapper-disabled" : "";
    const pointerClass =  !isEditable ? "disabled-field" : "";
    const handleOnChange = (perm) => e => {
        let data = [...selectedPerms];
        const { checked } = e.target;
        if (checked){
            data.push({
                mainMenuId: perm.id,
                permission: [0],
                childMenu : null,
            })
        }
        else{
            const index  = data.findIndex(datum => datum.mainMenuId === perm.id);
            data.splice(index, 1);
        }
        onPermsChange(data);
    }
    const handleOnChildChange = (perm, child) => e => {
        let data = [...selectedPerms];
        const { checked } = e.target;
        const index = data.findIndex(datum => datum.mainMenuId === perm.id);
        if (checked){
            if (index !== -1){
                let childMenu = [...data[index].childMenu];
                childMenu.push({
                    childMenuId: child.id,
                    permission: [0],
                });

                data[index] = {
                    ...data[index],
                    childMenu: childMenu,
                }
            }
            else{
                data.push({
                    mainMenuId: perm.id,
                    childMenu : [{
                        childMenuId: child.id,
                        permission: [0],
                    }],
                    permission: [0],
                })
            }
        }
        else{
            const filteredData = data[index].childMenu.filter( item => item.childMenuId !== child.id);
            data[index] = {
                ...data[index],
                childMenu:filteredData
            };
            if (data[index].childMenu.length < 1){
                data.splice(index, 1);
            }
        }
        onPermsChange(data);
    }
    const handleOnPermissionChange = (perm, child ) => values => {
        let data = [...selectedPerms];
        let index = data.findIndex(datum => datum.mainMenuId === perm.id);
        if (child){
            let childIndex =  data[index].childMenu.findIndex( item => item.childMenuId === child.id);
            let childMenu = [...data[index].childMenu];
            childMenu[childIndex] = {
                ...childMenu[childIndex],
                permission: values
            }
            data[index] = {
                ...data[index],
                childMenu: childMenu,
            }
        }
        else{
            data[index] = {
                ...data[index],
                permission : values
            }
        }
        onPermsChange(data);
    }
    const getChildren = (perm) => perm.child.map((p, index) => {
            let checked = false;
            let parentIndex;
            let childIndex;
            parentIndex = selectedPerms.findIndex(item => item.mainMenuId === perm.id);
            if (parentIndex !== -1){
                childIndex = selectedPerms[parentIndex]?.childMenu.findIndex(opt => opt.childMenuId === p.id);
                if (childIndex !== -1){
                    checked = true;
                }
            }
            return (
                <MKBox className={wrapperClass} key={index} sx={{display: 'flex',  ml: 1, justifyContent: 'space-between', alignItems:'center'}}>
                        <FormControlLabel
                            className={pointerClass}
                            checked ={ checked}
                            label={p.pageName}
                            value={p.pageName}
                            control={<Checkbox/>}
                            onChange={handleOnChildChange(perm, p)}
                        />
                    <Collapse in={checked}>
                        {
                            checked && (
                                <PermissionOptions
                                    isEditable={isEditable}
                                    selectedPerms={selectedPerms[parentIndex]?.childMenu[childIndex]?.permission}
                                    onChange={handleOnPermissionChange(perm, p)}
                                />

                            )
                        }
                    </Collapse>
                </MKBox>
            )
        }
    );
    return(
        <>
            <TableContainer>
                <Table  size={'small'} sx={{ width: '100%', border: 1, borderColor: 'grey.300'}}>
                    <TableHead sx={{ backgroundColor: 'grey.200'}}>
                        <TableRow>
                            <TableCell sx={{ width: '30%'}}>
                                {"Menu"}
                            </TableCell>
                            <TableCell sx={{ width: '70%'}}>
                                {"Permissions"}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menus.map((perm, i) => {
                            let checked = false;
                            const index = selectedPerms.findIndex(item => item.mainMenuId === perm.id);
                            if (index !== -1){
                                checked = true;
                            }
                            return (
                                <TableRow key={perm.id}>
                                    { (perm?.child && perm?.child.length > 0) ? (
                                        <>
                                            <TableCell colSpan={2}>
                                                <DMTAccordion  title={perm.pageName} active={true}>
                                                    {getChildren(perm)}
                                                </DMTAccordion>
                                            </TableCell>
                                        </>

                                    ):(
                                        <>
                                            <TableCell className={wrapperClass}>
                                                <FormControlLabel
                                                    className={pointerClass}
                                                    checked={checked}
                                                    label={perm.pageName}
                                                    control={<Checkbox/>}
                                                    value={perm.pageName}
                                                    onChange={handleOnChange(perm)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Collapse in={checked}>
                                                {
                                                    checked && (
                                                        <PermissionOptions
                                                            isEditable={isEditable}
                                                            selectedPerms={selectedPerms[index].permission}
                                                            onChange={handleOnPermissionChange(perm)}
                                                        />
                                                    )
                                                }
                                                </Collapse>
                                            </TableCell>
                                        </>
                                    )

                                    }

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

const PermissionOptions = props => {
    const {selectedPerms, onChange, isEditable } = props;
    const { permissions } = useSelector(({ roles}) => roles);
    const handleModeChange = (e, values) => {
        onChange(values);
    }

    return (
        <>
            <MKBox>
                <ToggleButtonGroup
                    color="info"
                    size={'small'}
                    disabled={!isEditable}
                    value={selectedPerms}
                    onChange={handleModeChange}
                    aria-label="Modes"
                >
                    {permissions.map((mode, index) => {
                        const isSelected = selectedPerms.includes(mode.value);
                        return (
                            <ToggleButton
                                key={index}
                                value={mode.value}
                            >
                                <MKBox sx={{ display: 'flex', alignItems:'center', gap: 1}}>
                                    { isSelected ? (<CheckBox fontSize={'small'}/>) : (<CheckBoxOutlineBlank fontSize={'small'}/>)}
                                    <MKTypography variant={'caption'} fontWeight={'bold'}>{mode.name}</MKTypography>
                                </MKBox>
                            </ToggleButton>
                        )})}

                </ToggleButtonGroup>
            </MKBox>
        </>
    )
}

export default React.memo(PermissionsForm);