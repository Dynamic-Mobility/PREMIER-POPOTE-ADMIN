import React from "react";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import MKButton from "../@mui-components/button";

const ExcelExportButton = (props) => {
    const {
        apiData = [],
        fileName = "MpesaTransactions",
        label,
        ...other
    } = props;
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportFile = () => {
            const ws = XLSX.utils.json_to_sheet(apiData);
            // ws.add_format({'bold': true})
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, {
                bookType: "xlsx",
                type: "array",
            });

            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <>
            <MKButton {...other} onClick={exportFile}>
                {label}
            </MKButton>
        </>
    );
};

export default ExcelExportButton;
