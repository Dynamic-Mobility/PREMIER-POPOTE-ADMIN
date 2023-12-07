import Watermark from "../../watermark";
import React from "react";
import DataGrid from "devextreme-react/data-grid";
import {ALLOWED_PAGE_SIZES} from "../../../utils/constants";
import {Pagination, TextField} from "@mui/material";
import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import MenuItem from "@mui/material/MenuItem";

const DMTDatagrid = props => {
    const {
        children,
        data,
        height = "70vh",
        pageSize,
        activePage,
        totalRecords,
        onChangePage,
        onChangeSize,
        ...other
    } = props;

    const handleOnChangeLimit = (e) => {
        onChangeSize?.(e.target.value)
    }
    const handleOnChangePage = (e, value) => {
        onChangePage?.(value)
    }

    return (
        <div>
            <Watermark/>
            <DataGrid
                dataSource={data}
                allowColumnReordering={true}
                //rowAlternationEnabled={true}
                showBorders={true}
                remoteOperations={true}
                showColumnLines={true}
                showRowLines={true}
                wordWrapEnabled={true}
                height={height}
                {...other}
            >
                {children}
            </DataGrid>
            {(pageSize && activePage) && (
                <MKBox sx={{ mt:2, display: 'flex', justifyContent: {md: 'space-between'}, flexDirection: { md: 'row', xs: 'column'}, gap:2, alignItems: 'center'}}>
                    <MKBox sx={{ display: 'flex', gap:1, alignItems: 'center'}}>
                        <MKTypography variant={'caption'} sx={{ fontWeight: 'bold'}}>Rows Per Page</MKTypography>
                        <TextField value={pageSize} variant={'standard'} onChange={handleOnChangeLimit} select>
                            {ALLOWED_PAGE_SIZES.map((limit, index) => (
                                <MenuItem key={index} value={limit}>
                                    {limit}
                                </MenuItem>
                            ))}

                        </TextField>
                    </MKBox>

                    <Pagination
                        //variant={'outlined'}
                        shape={'circular'}
                        count={totalRecords}
                        page={activePage}
                        color="info"
                        onChange={handleOnChangePage}
                    />
                </MKBox>
            )}
        </div>
    )

}


export default DMTDatagrid;