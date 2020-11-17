const Customer = require("../models/customer.model.js");
const substrings = require("../../node_modules/substrings");
// const substr = require("../../node_modules/substr");
//  const parser = require('../../node_modules/xml2json');
//onst https = require('../../node_modules/https');
var mysql = require('../../node_modules/mysql');
var jsonxml  = require('../../node_modules/xml2js');
var jsonxml  = require('../../node_modules/jsontoxml');
var convert = require('../../node_modules/xml-js');
var express = require('../../node_modules/express');

const axios = require('../../node_modules/axios');

var fs = require('fs');
const { ECONNABORTED } = require("constants");

  //////////////////////////////////////////////////////////////
 // Customer.m_addBankDetail(req.body, (err, data) => {
  exports.purchase = (req, res) => {  
    console.log("purchase")
    const postarray= { email:req.body.email,
      sub_trxn_type:req.body.sub_trxn_type,
      trxn_acceptance:req.body.trxn_acceptance,
      payment_mode:req.body.payment_mode,
      instrm_amount:req.body.instrm_amount,
      debit_amount_type:req.body.debit_amount_type,
      Return_paymnt_flag:req.body.Return_paymnt_flag,
      Client_callback_url:req.body.Client_callback_url,
      ach_exist:req.body.ach_exist,
      amc:req.body.amc,
      product_code:req.body.product_code,
      reinvest:req.body.reinvest,
      amount:req.body.amount,
      input_ref_no:req.body.input_ref_no,
      perpetual_flag:req.body.perpetual_flag

    }
   // return;
   Customer.purchase_normal(postarray.email,(err, data) => {

    if(data!=null){        
      if (!Array.isArray(data) || !data.length) {                
     return res.json({
       success: 200,
       message: "Email Record not Found in user table"
     });
   }}
   
   let urs=data[0]
   let resdatemy=String(urs.date_of_birrth);   
    let resaccountNomy=urs.accountNo;
    console.log("res line 844",urs.bank_code);
    //return
   let xb=resdatemy.split(" ");     
   let mydob_xb=xb[2]+"-"+xb[1]+"-"+xb[3]
   let pep= (urs.exposedPolitically == '1') ? "N" : "Y";
   //console.log("res line 844",urs);
   //return
    //Customer.perchase_normal((err, data) => {
     
      let ash_arrk={NMFIIService:{
        service_request:{
        appln_id:'MFS21399',
        password:'Account@2121',
        broker_code:'ARN-21399',
        iin:urs.iin,
        sub_trxn_type:postarray.sub_trxn_type,
        poa: 'N',
        poa_bank_trxn_type: [],
        trxn_acceptance:postarray.trxn_acceptance,
        demat_user: 'N',
        dp_id: [],
        bank: urs.bank_code,
        ac_no: resaccountNomy,
        ifsc_code: urs.fscode,
        sub_broker_arn_code: [],
        sub_broker_code: [],
        euin_opted: 'N',
        euin: 'E073161',
        trxn_execution: [],
        remarks: [],
        payment_mode: postarray.payment_mode,
        billdesk_bank: urs.bank_code,
        instrm_bank:  urs.bank_code,
        instrm_ac_no: [],
        instrm_no: [],
        instrm_amount:postarray.instrm_amount,
        instrm_date: [],
        instrm_branch: [],
        instrm_charges: [],
        micr: [],
        rtgs_code: [],
        neft_ifsc: [],
        advisory_charge: [],
        dd_charge: [],
        cheque_deposit_mode: [],
        debit_amount_type: postarray.debit_amount_type,
        sip_micr_no: [],
        sip_bank: [],
        sip_branch: [],
        sip_acc_no: [],
        sip_ac_type: [],
        sip_ifsc_code: [],
        sip_paymech: [],
        umrn: [],
        ach_amt: [],
        ach_fromdate: [],
        ach_enddate: [],
        until_cancelled: [],
        Return_paymnt_flag: postarray.Return_paymnt_flag,
        Client_callback_url: postarray.Client_callback_url,
        Bank_holder_name: urs.name,
        Bank_holder_name1: [],
        Bank_holder_name2: [],
        iin_conf_flag: 'Y',
        trxn_initiator: 'O',
        trans_count: '1',
        utr_no: [],
        transfer_date: '15-Feb-2020',
        investor_auth_log: [],
        ach_exist: postarray.ach_exist,
        instrm_bank: urs.bank_code
        },
        childtrans: { 
        amc: postarray.amc,
        folio: [],
        product_code: postarray.product_code,
        ft_acc_no: [],
        reinvest: postarray.reinvest,
        amount: postarray.amount,
        sip_from_date: [],
        sip_end_date: [],
        sip_freq: [],
        sip_amount: [],
        sip_period_day: [],
        input_ref_no: postarray.input_ref_no,
        perpetual_flag: postarray.perpetual_flag,
        insurance_enabled: [],
        GOAL_BASED_SIP: [],
        GOAL_TYPE: [],
        GOAL_AMOUNT: [],
        FREEDOM_SIP: [],
        FREEDOM_TARGET_SCHEME: [],
        FREEDOM_TENURE: [],
        FREEDOM_SWP_AMOUNT: [],
        iin: [],
        sub_broker_arn_code: [],
        sub_broker_code: [],
        instrm_date: [],
        instrm_branch: [],
        instrm_charges: [],
        micr: [],
        rtgs_code: [],
        neft_ifsc: [],
        advisory_charge: [],
        dd_charge: [],
        cheque_deposit_mode: [],
        debit_amount_type: [],
        sip_micr_no: [],
        sip_bank: [],
        sip_branch: [],
        sip_acc_no: [],
        sip_ac_type: [],
        sip_ifsc_code: [],
        sip_paymech: [],
        umrn: [],
        ach_amt: [],
        ach_fromdate: [],
        ach_enddate: []
       }  
      }//service_request
    } //NMFIIService
    //else
    
    
     
     
   // console.log(ash_arrk);
    let ash_xml_agamji=jsonxml(ash_arrk);  
    //console.log(ash_xml_agamji);

    
    console.log(ash_xml_agamji);
    axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/PURCHASETRXN',
    ash_xml_agamji,
    {headers:
      {'Content-Type': 'text/xml'}
    }).then(res22=>{
     console.log("C- Output XML - Line 946", res22)  


     let result1 = convert.xml2js(res22.data, {compact: true, spaces: 4});
          let fatcaresult=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
          let fatcaresult2=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;
     //  console.log("C- Output XML - Line 950", result1)
       //   console.log("C- Output XML - Line 951", fatcaresult)
        //  console.log("C- Output XML - Line 956", fatcaresult2)
		//console.log("i am cool 880");
		//var gi=typeof fatcaresult2[0].return_msg;
		//console.log("c- 881- ", gi);
		
		let newdata0= fatcaresult2[0];
		let newdata0_0= fatcaresult2[1];
		let adddata1="";
		let	adddata2="";
		
		if(typeof newdata0 !== "undefined"  || typeof newdata0_0 !== "undefined"){
		let newdata1= fatcaresult2[0].return_msg;
		let newdata2= fatcaresult2[1].return_msg;
		
		let newdata3= fatcaresult2[0].Status_Desc;
		let newdata4= fatcaresult2[1].Status_Desc;
		if( typeof newdata1 !== "undefined"  || typeof newdata2 !== "undefined"){
			adddata1= fatcaresult2[0].return_msg._text
			adddata2= fatcaresult2[1].return_msg._text
			
		}else if(typeof newdata3 !== "undefined"  || typeof newdata4 !== "undefined"){
			adddata1= fatcaresult2[0].Status_Desc._text
			adddata2= fatcaresult2[1].Status_Desc._text
		}else{
			adddata1="";
			adddata2="";
			
		}
    }
    
    if(fatcaresult==0){    
    console.log("C- Output XML - Unique_No:", fatcaresult2.Unique_No._text)
    console.log("C- Output XML - Trxn_No:", fatcaresult2.Trxn_No._text)
		console.log("C- Output XML - Application_No:", fatcaresult2.Application_No._text)
    console.log("C- Output XML - Fund:", fatcaresult2.Fund._text)    
    console.log("C- Output XML - Scheme:", fatcaresult2.Scheme._text)
		console.log("C- Output XML - Scheme_Name:", fatcaresult2.Scheme_Name._text)
    console.log("C- Output XML - Amt:", fatcaresult2.Amt._text)
    console.log("C- Output XML - Amt:", fatcaresult2.Paymentlink._text)
		//	console.log("C- Output XML - Line 960", fatcaresult2[6].return_msg._text)
			//console.log("C- Output XML - Line 960", fatcaresult2[7].return_msg._text)
     ashdata1=fatcaresult2.Unique_No._text;
     ashdata2=fatcaresult2.Trxn_No._text;
     ashdata3=fatcaresult2.Application_No._text;
     ashdata4=fatcaresult2.Fund._text;
     ashdata5=fatcaresult2.Scheme._text;
     ashdata6=fatcaresult2.Scheme_Name._text;
     ashdata7=fatcaresult2.Amt._text;
    }
    else 
    { 
    //console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
	  //console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
    }


      let agmess='';  
		  
      if(fatcaresult==0){    
        agmess= {
           status:200,
           message:'Successfull',            
           data:  { "Unique_No ": ashdata1,"Trxn_No: ": ashdata2 ,"Application_No: ": ashdata3, "Fund: ": ashdata4,"Scheme: ": ashdata5, "Scheme_Name: ": ashdata6, "Amt: ": ashdata7,"Status_Desc ":"","Status_code ":"","Input_ref_no ":"","Paymentlink ":fatcaresult2.Paymentlink._text.substring(9,fatcaresult2.Paymentlink._text.length-4).InnerHtnl,},  
           message_full: fatcaresult2 ,
         }
       }else{
         agmess= {
           status:400,
           message:'Failed',
          // message_1: fatcaresult2,               
         // data:  { "0": ashdata1},
           //"1": ashdata2 ,"2": ashdata3, "3": ashdata4,"4": ashdata5, "5": ashdata6, "6": ashdata7},              
      //message_third_api:'FAILED',
     message_full:fatcaresult2,
          }
       }
       return res.status(200).json(agmess)
      }).catch(err=>{console.log(err)});
      console.log("res last line 829");



    });
  };
  
  
  ////////////////
