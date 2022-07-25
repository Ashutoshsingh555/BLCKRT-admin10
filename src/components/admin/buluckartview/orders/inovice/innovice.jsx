import React, { Component } from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    margin:"20px"
   
  },
  title:{
     fontWeight:"bold",
     marginBottom:"5px",
     color: "black",
     marginLeft:"5px"

  },
  section: {
    margin: 2,
    padding: 2,
    fontSize:"14px",
    fontWeight:"bold"
  },
  img:{
    height:"40px",
    width:"180px"

  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
   datatable: {
    width: '90%',
    border: '1px solid black',
    display:"flex",
    justifyContent:"space-between"
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
    paddingTop: 8,
    paddingBottom: 2,
  },
  header: {
    borderTop: 'none',
  },
  bold: {
    fontWeight: 'bold',
  },
  // So Declarative and unDRY 👌
  row1: {
    width: '20%',
    fontSize:"14px",
    padding:"5px",
    borderRight: '1px solid black',
    
  },
  row2: {
    width: '18%',
    fontSize:"14px",
    padding:"5px",
    borderRight: '1px solid black',

  },
  row3: {
    width: '18%',
    fontSize:"14px",
    padding:"5px",
    borderRight: '1px solid black',
  },
  row4: {
    width: '18%',
    fontSize:"14px",
    padding:"5px",
    borderRight: '1px solid black',
  },
  row5: {
    width: '25%',
    fontSize:"14px",
    padding:"5px",
    borderRight: '1px solid black',
  },
    row6: {
    width: '18%',
    fontSize:"14px",
    padding:"5px",
    borderRight: '1px solid black',
  },
    row7: {
    width: '18%',
    fontSize:"14px",
    padding:"5px",
   
  },
  ///data stylys
  // So Declarative and unDRY 👌
  datarow1: {
    width: '20%',
    fontSize:"12px",
    padding:"5px",
    borderRight: '1px solid black',
  
    
  },
  datarow2: {
    width: '18%',
    fontSize:"12px",
    padding:"5px",
    borderRight: '1px solid black',
 

  },
  datarow3: {
    width: '18%',
    fontSize:"12px",
    padding:"5px",
    borderRight: '1px solid black',
  },
  datarow4: {
    width: '18%',
    fontSize:"12px",
    padding:"5px",
    borderRight: '1px solid black',
  },
  datarow5: {
    width: '25%',
    fontSize:"12px",
    padding:"5px",
    borderRight: '1px solid black',
  },
    datarow6: {
    width: '18%',
    fontSize:"12px",
    padding:"5px",
    borderRight: '1px solid black',
  },
    datarow7: {
    width: '18%',
    fontSize:"12px",
    padding:"5px",
   
  },
  resultdiv:{
    paddingLeft:"50%",
    marginTop:"100px",
    marginBottom:"100px",
    fontSize:"15px",
 },
  textstyl:{
     textAlign:"center"
    

  },
  rowresult:{
    fontSize:"12px"
  }
});

export default class innovice extends Component {
  render() {
      const self =this.props.location.state
      console.log(this.props.location.state,"ggfggg")
    return (
      <div className='px-4, py-4'>
         <PDFViewer style={styles.viewer}>
         <Document>
          <Page size="A4" style={styles.page}>
              <View style={styles.img}>
                  <Image src='/download.png' alt="logo"/>
              </View>
              <View style={styles.title}>
                <Text className="mx-4">BULUCKART</Text>
              </View>
              <View style={styles.section}>
                <Text  className='text-dark'>Order No.:<h6 style={styles.textstyl}>{"  "+"#"+self.id}</h6></Text>
              </View>
              <View style={styles.section}>
                <Text className='text-dark'>Customer Name:<h6 style={styles.textstyl}>{' '+ self.Addresses[0].fullname}</h6></Text>
              </View>
              <View style={styles.section}>
                <Text className='text-dark'>Order Amount:<h6 style={styles.textstyl}>{"  "+ self.grandtotal}</h6></Text>
              </View>
              <View style={styles.section}>
                <Text className='text-dark'>Contact No:<h6 style={styles.textstyl}>{"  "+ self.Addresses[0].phone}</h6></Text>
              </View>
              <View style={styles.section}>
                <Text className='text-dark'>Address:<h6>{"  "+self.Addresses[0].house +","+self.Addresses[0].landmark +","+self.Addresses[0].street +","+self.Addresses[0].city +","+self.Addresses[0].discrict +","+self.Addresses[0].states}</h6></Text>
              </View>
              <View style={styles.section}>
                <Text className='text-dark'>Order Type:<h6 style={styles.textstyl}>{"  "+ self.status}</h6></Text>
              </View>
              <View style={styles.section}>
              <Text className='text-dark'>Order Date:<h6 style={styles.textstyl}>{"  "+ self.createdAt}</h6></Text>
              </View>
              <View style={styles.section}>
                <Text className='text-dark'>Order Note:<h6 style={styles.textstyl}>{"  "+ self.orderCarts[0].comments}</h6></Text>
              </View>
              <View style={styles.section}>
                <Text className='text-dark'>Payment Mode :<h6 style={styles.textstyl}>{"  "+ self.paymentmethod}</h6> </Text>

              </View>
             <View style={styles.datatable}>
              <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={styles.row1}>Item Name</Text>
                <Text style={styles.row2}>Item Price </Text>
                <Text style={styles.row3}>Qty</Text>
                <Text style={styles.row4}> Net Amount</Text>
                <Text style={styles.row5}> Tax Type</Text>
                <Text style={styles.row6}> Tax Amount</Text>
                <Text style={styles.row7}>Total Amount</Text>
              </View>
              {self.orderCarts.map((row, i) => (
                  <View key={i} style={styles.row} wrap={false}>
                    <Text style={styles.datarow1}>{row.productName}</Text>
                    <Text style={styles.datarow2}>{row.price}</Text>
                    <Text style={styles.datarow3}>{row.qty}</Text>
                    <Text style={styles.datarow4}>{row.mrp}</Text>
                    <Text style={styles.datarow5}>{row.TaxType === "inclusive"?`CGST + SGST(${row.GSTrate}%)`:`CGST(${row.GSTrate}%)`}</Text>
                    <Text style={styles.datarow6}>{row.taxAmount}</Text>
                    <Text style={styles.datarow7}>{row.total}</Text>
                    
                  </View>
                ))} 
                <View style={styles.resultdiv}>
                <Text style={styles.rowresult}>Cart Saving :<Text  style={styles.textstyl}>{self.totalDiscount}</Text></Text>
                <Text style={styles.rowresult}>Checkout Amount:<Text  style={styles.textstyl}>{self.grandtotal}</Text></Text>
                <Text style={styles.rowresult}>Shipping Charges :<Text  style={styles.textstyl}>{self.shipingCharge}</Text></Text>
                <Text style={styles.rowresult}>Net Amount Payable :<Text  style={styles.textstyl}>{self.grandtotal+self.shipingCharge}</Text></Text>
              </View>
              </View>
              
         
             </Page>
          </Document>
        </PDFViewer>
      </div>
    )
  }
}
