import React, { useState, useContext } from "react";

const QuotationTandCContext = React.createContext();

export function useQuotationTandCContext() {
    return useContext(QuotationTandCContext);
}

export function QuotationTandCProvider({children}) {
    const [quotationtandc, setQuotationTandC] = useState();

    function setQuotationTandCState(quotationtandc) {
        setQuotationTandC(quotationtandc);
    }
    return (
        <QuotationTandCContext.Provider value={{quotationtandc, setQuotationTandCState}}>
            {children}
        </QuotationTandCContext.Provider>
    );
}