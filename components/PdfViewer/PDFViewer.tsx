import React, { useState } from 'react';


function PDFViewer({ pdfUrl }:any) {

    return (
        <div>
            <iframe className="" height={460} width={700} src={pdfUrl} ></iframe>
        </div>
    );
}

export default PDFViewer;
