import React, { Fragment } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      borderBottom:"1px"
    },
    slno: {
      width: "10%",
    },
    itemname: {
        width: "20%",
        },
    quantity: {
        width: "10%",
        textAlign: "right",
    },
    unitPrice: {
        width: "20%",
        textAlign: "right",
    },
    total: {
      width: "30%",
        textAlign: "right",
    }
  });
  let index = 0;
  const ItemDetailsTableRow = ({ items }) => {
    const rows = items.map((item) => (
      <View style={styles.row}>
        <Text style={styles.slno}>{index + 1}</Text>
        <Text style={styles.itemname}>{item.itemName}</Text>
        <Text style={styles.quantity}>{item.qty}</Text>
        <Text style={styles.unitPrice}>{item.unitPrice}</Text>
        <Text style={styles.total}>{item.total}</Text>
      </View>
    ));
    return <Fragment>{rows}</Fragment>;
  };
  
  export default ItemDetailsTableRow;
  