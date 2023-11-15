import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useState} from "react";
import {formatDate} from "../../../../utils/helper-functions";

const CustomerViewDetails = props => {
    const { customer, existingCustomer } = props;
    const [showMore, setShowMore] = useState(true);

    const handleToggle = () => {
        setShowMore(prevState => !prevState);
    }

    const displayValue = (value) => {
        if (Boolean(value)){
            return value;
        }
        return "-- not set --"
    }

    return (
        <>
            <TableContainer>
                <Table  size={'small'} sx={{ width: '100%', border: 1, borderColor: 'grey.300'}}>
                    <TableHead sx={{ backgroundColor: 'grey.200'}}>
                        <TableRow>
                            <TableCell sx={{ minWidth: 140}}>
                                {""}
                            </TableCell>
                            <TableCell sx={{ minWidth: 200}}>
                                {"IMAL Details "}
                            </TableCell>
                            <TableCell sx={{ minWidth: 200}}>
                                {"Current Details "}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200'}}>
                                {"CIF"}
                            </TableCell>
                            <TableCell>
                                {displayValue(customer?.cif_no)}
                            </TableCell>
                            <TableCell>
                                {displayValue(existingCustomer?.cif)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200'}}>
                                {"Customer Name"}
                            </TableCell>
                            <TableCell>
                                {displayValue(customer?.name)}
                            </TableCell>
                            <TableCell>
                                {displayValue(existingCustomer?.name)}
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200'}}>
                                {"Phone Number"}
                            </TableCell>
                            <TableCell>
                                {displayValue(customer?.tel)}
                            </TableCell>
                            <TableCell>
                                {displayValue(existingCustomer?.phone)}
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200'}}>
                                {"Email Address"}
                            </TableCell>
                            <TableCell>
                                {displayValue(customer?.email)}
                            </TableCell>
                            <TableCell>
                                {displayValue(existingCustomer?.email)}
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200'}}>
                                {"ID No"}
                            </TableCell>
                            <TableCell>
                                {displayValue(customer?.idno)}
                            </TableCell>
                            <TableCell>
                                {displayValue(existingCustomer?.customerIdNo)}
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200'}} >
                                {"KRA Pin"}
                            </TableCell>
                            <TableCell>
                                {displayValue(customer?.kraPin)}
                            </TableCell>
                            <TableCell>
                                {displayValue(existingCustomer?.kraPin)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200'}}>
                                {"Date of Birth"}
                            </TableCell>
                            <TableCell>
                                {displayValue(formatDate(customer?.dateofBirth))}
                            </TableCell>
                            <TableCell>
                                {displayValue(formatDate(existingCustomer?.dob))}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200'}}>
                                {"Location"}
                            </TableCell>
                            <TableCell>
                                {displayValue(customer?.physicalAddress)}
                            </TableCell>
                            <TableCell>
                                {displayValue(existingCustomer?.location)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default CustomerViewDetails;