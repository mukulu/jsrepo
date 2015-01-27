	$(document).ready(function(){
		//@todo use reversecode to reverse input values of target input field
		//@todo use indicator to manouver enable/disable feture
		//@todo put in place choice of enable/disable for multiple checkboxes(i.e. any/all disables section)
		//@todo no value should also disable input fields
		//@todo put in place hide and show(animated) for hide and show sections
		var lars={};
		lars.getDataElementsToSeal = function(selectorName) {
			//Get all declared data elements
			$(lars.dataElements).each(function(deIndex,dataElement){
				//Only bother to set on-change events for dataelements in the dictionary
				var tdSectionNames=null,tdSections=null;
				if(dataElement.sectionsToSeal.length>0) {
					$(dataElement.sectionsToSeal).each(function(toSealIndex,sectionToseal){
						if($.isEmptyObject(tdSectionNames)) tdSectionNames='td.'+sectionToseal;else tdSectionNames=tdSectionNames+',td.'+sectionToSeal;
					});
					var tdSections=$(tdSectionNames);
				}
				//console.log(tdSectionNames);
				if(!$.isEmptyObject(tdSections) && tdSections.length>0) {
						//For each section handle disabling of input fields;
						//console.log(dataElement.name+' section for dataElement '+dataElement.question+'  exist');
						//Setup all trigger dataElements
						$(dataElement.triggerDataElements).each(function(triggerIndex,triggerDataElement){
							//We only expect one triggerid to find one input tag,if it's not the case, screem
							if(!$.isEmptyObject($('#'+triggerDataElement)) &&  $('#'+triggerDataElement).length==1) {
								var inputDataElement=$('#'+triggerDataElement)[0];
								//Set change event for dataElement
								$(inputDataElement).change(function(){
									if(inputDataElement.type=="checkbox") {
										var response =JSON.stringify($(inputDataElement).get(0).checked);
									}else {
										var response=$(inputDataElement).val();
									}
									var disableFields=null;
									if(response=="true") {
										disableFields=true;
									}else if(response=="false") {
										disableFields=false;
									}else {
										disableFields=true;
									}
									if(typeof(dataElement.reverseCoded)!=="undefined" && dataElement.reverseCoded==true) response= ! response;
									console.log( dataElement.question+':'+JSON.stringify(response).replace("true","yes").replace("false","no"));
									//Go through found sections assoicated with this input and disable based on configurations
									$(tdSections).each(function(tdSectIndex,tdSection){
										//List input fields to disable for the section
										var inputFieldsToDisable=$(tdSection).find('input');
										//Run down all input fields to disable
										$(inputFieldsToDisable).each(function(inputToDisIndex,inputFieldToDisable){
											if(disableFields) {
												//console.log($('span#'+inputFieldToDisable.id.split('-')[1]+'-optioncombo').text()+"has been disabled");
												$(inputFieldToDisable).attr("disabled","disabled");
											}else {
												//console.log($('span#'+inputFieldToDisable.id.split('-')[1]+'-optioncombo').text()+"has been enabled");
												$(inputFieldToDisable).removeAttr('disabled');
											}
										});

									});
								});
								//Execute these change on first glance
								if(inputDataElement.type=="checkbox") {
										var response =JSON.stringify($(inputDataElement).get(0).checked);
									}else {
										var response=$(inputDataElement).val();
									}
									var disableFields=null;
									if(response=="true") {
										disableFields=true;
									}else if(response=="false") {
										disableFields=false;
									}else {
										disableFields=true;
									}
									if(typeof(dataElement.reverseCoded)!=="undefined" && dataElement.reverseCoded==true) response= ! response;
									console.log( dataElement.question+':'+JSON.stringify(response).replace("true","yes").replace("false","no"));
									//Go through found sections assoicated with this input and disable based on configurations
									$(tdSections).each(function(tdSectIndex,tdSection){
										//List input fields to disable for the section
										var inputFieldsToDisable=$(tdSection).find('input');
										//Run down all input fields to disable
										$(inputFieldsToDisable).each(function(inputToDisIndex,inputFieldToDisable){
											if(disableFields) {
												//console.log($('span#'+inputFieldToDisable.id.split('-')[1]+'-optioncombo').text()+"has been disabled");
												$(inputFieldToDisable).attr("disabled","disabled");
											}else {
												//console.log($('span#'+inputFieldToDisable.id.split('-')[1]+'-optioncombo').text()+"has been enabled");
												$(inputFieldToDisable).removeAttr('disabled');
											}
										});

									});
							}else{
								//console.log('There is a problem! more than one dataElement was found for one trigger id');
							}

						});

				}else {
					//console.log(dataElement.name+' section for dataElement '+dataElement.question+' does not exist');
				}
			});
		},
		lars.sealDataElements = function() {

		},
		lars.dataElements = [
			{
				name:'TLE1a',
				question:'Do they know Correct Procedure for TLE ordering?',
				triggerDataElements:['tMZTZnfgAoh-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['TLE1a'],
				sectionsToHide:[]
			},
			{
				name:'OE2',
				question:'Facility has a copy of R&amp;R form from the last completed quarter',
				triggerDataElements:['WEC20UqrE1h-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['OE2'],
				sectionsToHide:['oe3','oe4','oe5']
			},
			{
				name:'OE3',
				question:'Facility ordered RTK, TLE, NVP syrup or DBS kits during the last full quarter',
				triggerDataElements:['haaXv4XigpQ-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['OE3'],
				sectionsToHide:[]
			},
			{
				name: 'OE4',
				question:'Site received less than the quantity ordered',
				triggerDataElements:['pIjv5Fx2N5y-uGIJ6IdkP7Q-val'],
				reverseCoded:true,
				sectionsToSeal:['OE4'],
				sectionsToHide:['oe5']
			},
			{
				name:'OE5',
				question:'Commodities received in a smaller amount than ordered',
				triggerDataElements:['rBfygTRHACp-h7E6ZQ0MxMv-val','rBfygTRHACp-lUP491XDRgt-val','rBfygTRHACp-ZvMjnh5ggfo-val','rBfygTRHACp-BhstbsYypfl-val'],
				sectionsToSeal:['OE5'],
				sectionsToHide:[]
			},
			{
				name:'TLE1',
				question:'Stock-outs of TLE',
				triggerDataElements:['uGYFdnhGPzN-uGIJ6IdkP7Q-val'],
				reverseCoded:true,
				sectionsToSeal:['TLE1'],
				sectionsToHide:[]
			},
			{
				name:'TLE2',
				question:'Currently stocked-out of TLE today',
				triggerDataElements:['HdGib5DG8qn-uGIJ6IdkP7Q-val'],
				reverseCoded:true,
				sectionsToSeal:['TLE2'],
				sectionsToHide:[]
			},
			{
				name:'RTK1',
				question:'Stock-out of Determine HIV test kits',
				triggerDataElements:['siKuduSDbbR-uGIJ6IdkP7Q-val'],
				reverseCoded:true,
				sectionsToSeal:['RTK1'],
				sectionsToHide:[]
			},
			{
				name:'RTK2',
				question:'Currently stocked-out of Determine HIV test kits',
				triggerDataElements:['mjjMPXGBbEr-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['RTK2'],
				sectionsToHide:[]
			},
			{
				name:'RTK3',
				question:'Stock-out of Unigold HIV test kit',
				triggerDataElements:['c1wppqJL5hU-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['RTK3'],
				sectionsToHide:[]
			},
			{
				name:'RTK4',
				question:'Currently stocked-out of Unigold HIV test kit',
				triggerDataElements:['gtRBBeB1hEm-uGIJ6IdkP7Q-val'],
				reverseCoded:true,
				sectionsToSeal:['RTK4'],
				sectionsToHide:[]
			},
			{
				name:'DBS1',
				question:'Stock-out of DBS test kit',
				triggerDataElements:['jBSzy7754mc-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['DBS1'],
				sectionsToHide:[]
			},
			{
				name:'DBS2',
				question:'Currently stocked-out of DBSS',
				triggerDataElements:['JwEBWLD88g3-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['DBS2'],
				sectionsToHide:[]
			},
			{
				name:'TLE3',
				question:'Stock on Hand (SOH) - usable TLE (i.e. no expiries) at facility store and at all issuing locations within the facility',
				triggerDataElements:['eO4qdzWOgr7-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['TLE3'],
				sectionsToHide:[]
			},
			{
				name:'OE6',
				question:'TLE expired or within 1month of expiration',
				triggerDataElements:['RGbhdLG8iiH-uGIJ6IdkP7Q-val','r9XmI6XWNgE-uGIJ6IdkP7Q-val'],
				reverseCoded:true,
				sectionsToSeal:['OE6'],
				sectionsToHide:[]
			},
			{
				name:'OE7',
				question:'RTKs expired or within 1month of expiration',
				triggerDataElements:['cVUEil8nD1F-uGIJ6IdkP7Q-val'],
				reverseCoded:true,
				sectionsToSeal:['OE7'],
				sectionsToHide:[]
			},
			{
				name:'OE8',
				question:'DBS expired or within 1month of expiration',
				triggerDataElements:['GHon0v8MWjL-uGIJ6IdkP7Q-val'],
				reverseCoded:true,
				sectionsToSeal:['OE8'],
				sectionsToHide:[]
			},
			{
				name:'TLE5',
				question:'ARV dispensing register: Number of drugs dispensed over the course of the last 3 full months =A',
				triggerDataElements:['hIvojXs7y42-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'TLE6',
				question:'Number of patients who received TLE according to ART register @RCH at the same period = B',
				triggerDataElements:['PItpOPKQjR1-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'TLE7',
				question:'Are A and B equal?',
				triggerDataElements:['d3BU9tFpZlr-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['TLE7'],
				sectionsToHide:[]
			},
			{
				name:'TLE8',
				question:'Average monthly consumption (AMC), A/3',
				triggerDataElements:['indicatorL2aG4fzSpLo'],
				indicator:true,
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'TLE9',
				question:'Number of months that the current stock of TLE they have will last (SOH/AMC)',
				triggerDataElements:['indicatorLutsNRVHC1N'],//No dataelements to seal
				indicator:true,
				sectionsToSeal:[],
				sectionsToHide:[]
			},
			{
				name:'TLE10',
				question:'Is C under 1.5 for facilities which have placed order and are waiting delivery of TLE?',
				triggerDataElements:['NMtZ9axTSzU-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['TLE10'],
				sectionsToHide:[]
			},
			{
				name:'TLE11',
				question:'Is C above 7 for facilities which have already received new stocks of TLE?',
				triggerDataElements:['PaFHK6ATBpt-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['TLE11'],
				sectionsToHide:[]
			},
			{
				name:'LAB1',
				question:'Lab Logbook for Consumption and Quality Assurance availability at site',
				triggerDataElements:['Fo05hc7gc5z-Dcq5eito8bn-val'],
				sectionsToSeal:['LAB1'],
				sectionsToHide:['lab2','lab3','lab4','lab5','-lab6','-lab7']
			},
			{
				name:'LAB2',
				question:'Every positive result has a documented confirmatory test',
				triggerDataElements:['WeHNjxrlXjX-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['LAB2'],
				sectionsToHide:[]
			},
			{
				name:'LAB3',
				question:'Number of patients receiving an HIV test (A)',
				triggerDataElements:['l9sa7guaVae-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'LAB4',
				question:'Number of indeterminate/inconclusive results in the last 30 days (B)',
				triggerDataElements:['YfAF6UdtXWP-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'LAB5',
				question:'% of indeterminate/inconclusive results in the last 30 days (C). C = B/A x100',
				triggerDataElements:['indicatorVWEu6OEvsVT'],
				indicator:true,
				sectionsToSeal:['LAB5'],
				sectionsToHide:[]
			},
			{
				name:'LAB6',
				question:'Number of INVALID results in the last 30 days (D)',
				triggerDataElements:['kaDpb9StuY5-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['LAB6'],
				sectionsToHide:[]//No dataelements to seal
			},
			{
				name:'LAB7',
				question:'% of INVALID results in the last 30 days (E)',
				triggerDataElements:['indicatorlAXSzh9agQ2'],
				indicator:true,
				sectionsToSeal:['LAB7'],
				sectionsToHide:[]
			},
			{
				name:'RTK6',
				question:'Procedure for Rapid Test Kit ordering',
				triggerDataElements:['gkvVnd0Q0jC-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['RTK6'],
				sectionsToHide:[]
			},
			{
				name:'DBS4',
				question:'Do they know the correct Procedure for DBS Kits ordering',
				triggerDataElements:['flPT1loeAFB-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['DBS4'],
				sectionsToHide:[]
			},
			{
				name:'RTK7',
				question:'Days where no testing occurred in the last month',
				triggerDataElements:['OOrOph37ycg-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['RTK7'],
				sectionsToHide:[]
			},
			{
				name:'MnE1',
				question:'Facility has functional CTC2 database',
				triggerDataElements:['sMvJDoWfEcN-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE1'],
				sectionsToHide:['me2','me3','-me11']
			},
			{
				name:'MnE2',
				question:'Facility has system for backing up records',
				triggerDataElements:['pMR0Pd7U8cB-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE2'],
				sectionsToHide:[]
			},
			{
				name:'MnE3',
				question:'Backup system',
				triggerDataElements:['DzDSOzvuZzS-tnP5NB9GPW1-val','DzDSOzvuZzS-A04UsS7U2Mn-val','DzDSOzvuZzS-NehllZHGRHy-val','DzDSOzvuZzS-Z4e3HhqTquU-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'MnE4',
				question:'Frequency of data back up',
				triggerDataElements:['YmzBkKeXTxW-kiYQ2NLrhId-val','YmzBkKeXTxW-mkqA1mmXjip-val','YmzBkKeXTxW-K8peOIFZfUs-val','YmzBkKeXTxW-ZD3G0ABnmzR-val','YmzBkKeXTxW-P18Bse9XzQw-val'],
				sectionsToSeal:[],
				sectionsToHide:[]
			},
			{
				name:'R1',
				question:'Number of mothers in the monthly cohort initiated two full month ago = (A)',
				triggerDataElements:['s6xvO1ZGftk-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'R2',
				question:'Number of women from this cohort who returned for ARVs 1 month after initiation = (B)',
				triggerDataElements:['r1xZURNVHxA-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'R3',
				question:'Percentage (C) of women in this cohort who returned ART refill 1 month after initiation. C = B/A x 100',
				triggerDataElements:['indicatorXaj125XCVBd'],
				indicator:true,
				sectionsToSeal:['R3'],
				sectionsToHide:[]
			},
			{
				name:'MnE6',
				question:'Total number of number of HIV positive pregnant women who initiated on ART in previous quarter (A) from ART Register or CTC2 Database',
				triggerDataElements:['SKixVF6xSk3-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'MnE7',
				question:'Total number of number of HIV positive pregnant women who initiated on ART in previous quarter (B) [From District Office Hardcopy - Quarterly Facility-based HIV Care/ ART Reporting Form, Table 2 – Indicator #2.2.  Note, Skip for sites with CTC2 database]',
				triggerDataElements:['wEG1tiOEYSu-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'MnE8',
				question:'Total number of number of HIV positive pregnant women who initiated on ART in previous quarter (C) from DHIS Quarterly Report Printout',
				triggerDataElements:['zjtBAGFaNoN-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'MnE9',
				question:'Are A and B equal (A=B)',
				triggerDataElements:['nLozgJizxAk-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE9'],
				sectionsToHide:[]
			},
			{
				name:'MnE10',
				question:'Are A and C equal (A=C)',
				triggerDataElements:['onpA1Fj1MUg-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE10'],
				sectionsToHide:[]
			},
			{
				name:'MnE11',
				question:'Are B and C equal (B=C)',
				triggerDataElements:['KpzavhvPBdb-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE11'],
				sectionsToHide:[]
			},
			{
				name:'EID1',
				question:'Number of HEI 28 days (4 weeks) old who were registered in the past 90 days = (A)',
				triggerDataElements:['q6CBLhO9o9X-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'EID2',
				question:'Number of HEI > 28 days who received an EID test between 4-8 weeks (28-56 days) of age = (B)',
				triggerDataElements:['MGZ31s3ZrNu-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'EID3',
				question:'Percentage (C) of HEI (>28 days old) who were registered in the last 90 days and who received an EID test between 4-8 weeks (28-56 days) of age. C=B/A x 100',
				triggerDataElements:['indicatorRYx755rec4l'],
				sectionsToSeal:['EID3'],
				sectionsToHide:[]
			},
			{
				name:'MnE13',
				question:'CTC2 cards:  Quality and completeness criteria met?',
				triggerDataElements:['uL5rWCJpE3g-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE13'],
				sectionsToHide:[]
			},
			{
				name:'MnE14',
				question:'EID cards: Quality and completeness criteria met?',
				triggerDataElements:['b4Z8H9C0wyC-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE14'],
				sectionsToHide:[]
			},
			{
				name:'MnE15',
				question:'ANC/MTUHA Book 6 register. Criteria met? Most current version MoHSW, Entries legible &amp; complete  (90% each field complete),Updated daily per guideline, Used for routine facility reporting, Stored (when not in use) in secure location',
				triggerDataElements:['MrfUD36Radb-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE15'],
				sectionsToHide:[]
			},
			{
				name:'MnE16',
				question:'Total number of pregnant women who tested positive in the previous quarter according to ANC/ MTUHA 6 Register (A)',
				triggerDataElements:['StLYvzRtp1U-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'MnE17',
				question:'Number of of HIV positive pregnant women reported (B) according to MTUHA 6 Monthly Reporting Summary Forms (Item #6c) submitted to district level',
				triggerDataElements:['yWZoTZrLUWP-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'MnE18',
				question:'Total number of HIV positive pregnant women reported (C) according to DHIS',
				triggerDataElements:['LVSXq7GBQVo-uGIJ6IdkP7Q-val'],
				sectionsToSeal:[],//No dataelements to seal
				sectionsToHide:[]
			},
			{
				name:'MnE19',
				question:'Are A and B equal (A=B)?',
				triggerDataElements:['pgkuR2fGTxx-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE19'],
				sectionsToHide:[]
			},
			{
				name:'MnE20',
				question:'Are A and C equal (A=C)?',
				triggerDataElements:['FPTjxZuaEnv-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE20'],
				sectionsToHide:[]
			},
			{
				name:'MnE21',
				question:'Are B and C equal (B=C)?',
				triggerDataElements:['s5EtmULKM1G-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE21'],
				sectionsToHide:[]
			},
			{
				name:'MnE22',
				question:'L&amp;D/MTUHA Book 12 register. Criteria met? Most current version MoHSW Entries legible &amp; complete  (90% each field complete) Updated daily per guideline Used for routine facility reporting Stored (when not in use) in secure location',
				triggerDataElements:['cMtBXtV82bD-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE22'],
				sectionsToHide:[]
			},
			{
				name:'MnE23',
				question:'CTC1, CTC2, RCH1, RCH4 or cards stocked out?',
				triggerDataElements:['sBrNrv9g2bu-uGIJ6IdkP7Q-val'],
				sectionsToSeal:['MnE23'],
				sectionsToHide:[]
			}
		];
		lars.getDataElementsToSeal('TLE1a');


		//Skip for OE2
		$("#WEC20UqrE1h-uGIJ6IdkP7Q-val").change(function() {
			var select = $("#WEC20UqrE1h-uGIJ6IdkP7Q-val").val();
			if(select=="false"){
				$("#oe3").hide();
				$("#oe4").hide();
				$("#oe5").hide();
				console.log('No value was captured');
			}
			else{
				$("#oe3").show();
				$("#oe4").show();
				$("#oe5").show();
				console.log('Yes value was captured');
			}
			console.log('OE2 was changed');
			console.log('Value:'+$('#WEC20UqrE1h-uGIJ6IdkP7Q-val').val());
		});

		//Skip for OE4
		$("#pIjv5Fx2N5y-uGIJ6IdkP7Q-val").change(function() {
			var select = $("#pIjv5Fx2N5y-uGIJ6IdkP7Q-val").val();
			if(select=="false"){
				$("#oe5").hide();
				console.log('No value was captured');
			}
			else{
				$("#oe5").show();
				console.log('Yes value was captured');
			}
			console.log('OE4 was changed');
			console.log('Value:'+$('#pIjv5Fx2N5y-uGIJ6IdkP7Q-val').val());
		});


		//Skip for LAB1
		$("#Fo05hc7gc5z-Dcq5eito8bn-val").focusout(function() {
			var select = $("#Fo05hc7gc5z-Dcq5eito8bn-val").val();
			if(select=="false"){
				$("#lab2").hide();
				$("#lab3").hide();
				$("#lab4").hide();
				$("#lab5").hide();
				$("#lab6").show();
				$("#lab7").show();
				console.log('No value was captured');
			}
			else{
				$("#lab2").show();
				$("#lab3").show();
				$("#lab4").show();
				$("#lab5").show();
				$("#lab6").show();
				$("#lab7").show();
				console.log('Yes value was captured');
			}
			console.log('Lab1 was changed');
			console.log('Value:'+$('#Fo05hc7gc5z-Dcq5eito8bn-val').val());
		});

		//Skip for M&E1
		$("#sMvJDoWfEcN-uGIJ6IdkP7Q-val").change(function() {
			var select = $("#sMvJDoWfEcN-uGIJ6IdkP7Q-val").val();
			if(select=="false"){
				$("#me2").hide();
				$("#me3").hide();
				console.log('No value was captured');
			}
			else if(select=="true"){
				$("#me2").show();
				$("#me3").show();
				$("#me11").hide();
				console.log('Yes value was captured');
			}
			else{
				$("#me2").show();
				$("#me3").show();
				console.log('Yes value was captured');
			}
			console.log('Lab1 was changed');
			console.log('Value:'+$('#sMvJDoWfEcN-uGIJ6IdkP7Q-val').val());
		});






		//compare TLE5 and TLE6
		$("#hIvojXs7y42-uGIJ6IdkP7Q-val").change(function() {
			var tle5 = $("#hIvojXs7y42-uGIJ6IdkP7Q-val").val();
			var tle6 = $("#PItpOPKQjR1-uGIJ6IdkP7Q-val").val();
			if(tle5==tle6){
				$("#tle7").value=true;
				console.log('true value was captured');
			}
			else{
				$("#tle7").value =false;
				console.log('false value was captured');
			}
		});
		$("#PItpOPKQjR1-uGIJ6IdkP7Q-val").change(function() {
			var tle5 = $("#hIvojXs7y42-uGIJ6IdkP7Q-val").val();
			var tle6 = $("#PItpOPKQjR1-uGIJ6IdkP7Q-val").val();
			if(tle5==tle6){
				$("#tle7").value =true;
				console.log('true value was captured');
			}
			else{
				$("#tle7").value=false;
				console.log('false value was captured');
			}
		});
	});
