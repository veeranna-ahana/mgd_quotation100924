import React, { useState, useContext } from "react";

const QuotationItemListContext = React.createContext();

export function useQuotationItemListContext() {
    return useContext(QuotationItemListContext);
}

export function QuotationItemListProvider({children}) {
    const [quotationitemlist, setQuotationItemList] = useState();

    function setQuotationItemListState(quotationitemlist) {
        setQuotationItemList(quotationitemlist);
    }
    return (
        <QuotationItemListContext.Provider value={{quotationitemlist, setQuotationItemListState}}>
            {children}
        </QuotationItemListContext.Provider>
    );
}