import {useSelector} from "../../../store";
import DMTAccordion from "../../@dmt-components/accordion";
import MKBox from "../../@mui-components/box";
import {
    Checkbox, Collapse,
    FormControlLabel,
    Radio,
    RadioGroup, Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React from "react";

const PermissionsForm = props => {
    const { selectedPerms, onPermsChange } = props;
    const { menus, permissions } = useSelector(({ roles }) => roles);

    const handleOnChange = (perm) => e => {
        let data = [...selectedPerms];
        const { checked } = e.target;
        if (checked){
            data.push({
                menuId: perm.id,
                permissionId: permissions[0].id,
                submenus : null,
            })
        }
        else{
            const index  = data.findIndex(datum => datum.menuId === perm.id);
            data.splice(index, 1);
        }
        onPermsChange(data);
    }
    const handleOnChildChange = (perm, child) => e => {
        let data = [...selectedPerms];
        const { checked } = e.target;
        const index = data.findIndex(datum => datum.menuId === perm.id);
        if (checked){
            if (index !== -1){
                let submenus = [...data[index].submenus];
                submenus.push({
                    subId: child.id,
                    permissionId: permissions[0]?.id,
                });

                data[index] = {
                    ...data[index],
                    submenus: submenus,
                }
            }
            else{
                data.push({
                    menuId: perm.id,
                    submenus : [{
                        subId: child.id,
                        permissionId: permissions[0].id,
                    }],
                    permissionId: permissions[0].id,
                })
            }
        }
        else{
            const filteredData = data[index].submenus.filter( item => item.subId !== child.id);
            data[index] = {
                ...data[index],
                submenus:filteredData
            };
            if (data[index].submenus.length < 1){
                data.splice(index, 1);
            }
        }
        onPermsChange(data);
    }
    const handleOnPermissionChange = (perm, child ) => e => {
        let data = [...selectedPerms];
        let index = data.findIndex(datum => datum.menuId === perm.id);
        if (child){
            let childIndex =  data[index].submenus.findIndex( item => item.subId === child.id);
            let submenus = [...data[index].submenus];
            submenus[childIndex] = {
                ...submenus[childIndex],
                permissionId: Number(e.target.value)
            }
            data[index] = {
                ...data[index],
                submenus: submenus,
            }
            // data[index].submenus[childIndex].permissionId = Number(e.target.value);
        }
        else{
            data[index] = {
                ...data[index],
                permissionId :Number(e.target.value)
            }
        }
        onPermsChange(data);
    }


    const getChildren = (perm) => perm.children.map((p, index) => {
            let checked = false;
            let parentIndex;
            let childIndex;
            parentIndex = selectedPerms.findIndex(item => item.menuId === perm.id);
            if (parentIndex !== -1){
                childIndex = selectedPerms[parentIndex]?.submenus.findIndex(opt => opt.subId === p.id);
                if (childIndex !== -1){
                    checked = true;
                }
            }
            return (
                <MKBox key={index} sx={{display: 'flex',  ml: 1, justifyContent: 'space-between'}}>
                        <FormControlLabel
                            checked ={ checked}
                            label={p.pageName}
                            value={p.pageName}
                            control={<Checkbox/>}
                            onChange={handleOnChildChange(perm, p)}
                        />
                    <Collapse in={checked}>
                        {
                            checked && (
                                <RadioGroup
                                    row
                                    aria-labelledby={`permissions_${index}`}
                                    name={`permissions_name${index}`}
                                    value={selectedPerms[parentIndex]?.submenus[childIndex]?.permissionId}
                                    onChange={handleOnPermissionChange(perm, p)}
                                >
                                    { permissions.map((opt, index) => (
                                        <FormControlLabel key={index} value={opt.id} control={<Radio />} label={opt.permission} />
                                    ))}

                                </RadioGroup>
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
                            const index = selectedPerms.findIndex(item => item.menuId === perm.id);
                            if (index !== -1){
                                checked = true;
                            }
                            return (
                                <TableRow key={i}>
                                    { perm.children ? (
                                        <>
                                            <TableCell colSpan={2}>
                                                <DMTAccordion  title={perm.pageName} active={true}>
                                                    {getChildren(perm)}
                                                </DMTAccordion>
                                            </TableCell>
                                        </>

                                    ):(
                                        <>
                                            <TableCell>
                                                <FormControlLabel
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
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby={`permissions_${i}`}
                                                            name={`permissions_name${i}`}
                                                            value={selectedPerms[index].permissionId}
                                                            onChange={handleOnPermissionChange(perm)}
                                                        >
                                                            { permissions.map((opt, index) => (
                                                                <FormControlLabel key={index} value={opt.id} control={<Radio />} label={opt.permission} />
                                                            ))}

                                                        </RadioGroup>
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

export default PermissionsForm;