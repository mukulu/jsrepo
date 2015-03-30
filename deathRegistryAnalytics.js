var authentication_url = 'dhis-web-commons/security/login.action?authOnly=true'
	var dataValueSetsUrl='api/dataValueSets'
	var datasetUrl='api/dataSets/ws4ZoC7SC1d.json?fields=id,name,href,shortName,periodType,categoryCombo,organisationUnits,dataElements[id,name,type,categoryCombo[id,name,categoryOptionCombos[id,name],categories[id,name,categoryOptions[id,name]]]]'
	$(document).ready(function(){
		var payload = {
		  'j_username': '********',
		  'j_password': '********'
		  }
		$.ajax({    type: "POST",
					url: authentication_url,
					data: payload
		}).done(function(authData){
			//Done authentication
			console.log('Auth secccessful');
			//Call datasets json
			$.ajax({    type: "GET",
					url: datasetUrl
			}).done(function(dataSetJson){
				console.log(dataSetJson);
				var period=$( '#selectedPeriodId' ).val();
				var year=period.substring(0,4);
				var month=period.substring(4,6);
				var periodId=period;
				console.log(month);
				 
					var organisationUnit=dhis2.de.currentOrganisationUnitId;
					var analyticsUrl='api/analytics/events/aggregate/Mvc0jfU9Ua2.json?stage=mlDzRw3ibhE&dimension=JJkV68Devly:IN%3ADays%3BMonths%3BYears&dimension=Swn04dN2EwP&dimension=UjPZIq15xs1&dimension=uochSI2xLGI&filter=pe:'+year+'&filter=ou:'+organisationUnit+'&filter=xqH6UiBNIQC:GE%3A'+year+'-'+month+'-01%3ALE%3A'+year+'-'+month+'-31'
					 
					$.ajax({type: "GET",
							url: analyticsUrl
					}).done(function(analyticsData){
					 if(! $.isEmptyObject(analyticsData.rows)){
					 function range(start,end) {
					 var array = [];
					 for(var incr=start;incr<end;incr++) {
						array.push(incr);
					 }
					 return array;
							}
							console.log(analyticsData);
							var dataValues={};
							var jsonDataValues = {};
							jsonDataValues["dataSet"]=dataSetJson.id;
							jsonDataValues["dataValues"]=[];
							
							$(dataSetJson.dataElements).each(function(dataElementIndex,dataElement){
								 $(dataElement.categoryCombo.categoryOptionCombos).each(function(categoryOptionComboIndex,categoryOptionCombo){
									 //Go through row values and compute dataelement values
									//"periodId-orgunitId-dataElementId-categoryOptionComboId"
									$(analyticsData.rows).each(function(rowIndex,row){
										var filterArray= {
											"(ME, Umri chini ya mwezi 1)": {"0":["Hours","Days"],"1":[0,31],"2":"Male"},
											"(KE, Umri chini ya mwezi 1)": {"0":["Hours","Days"],"1":[0,31],"2":"Female"},
											"(ME, Umri mwezi 1 hadi umri chini ya mwaka 1)": {"0":["Months"],"1":[1,12],"2":"Male"},
											"(KE, Umri mwezi 1 hadi umri chini ya mwaka 1)": {"0":["Months"],"1":[1,12],"2":"Female"},
											"(ME, Umri mwaka 1 hadi umri chini ya miaka 5)": {"0":["Years"],"1":[1,4],"2":"Male"},
											"(KE, Umri mwaka 1 hadi umri chini ya miaka 5)": {"0":["Years"],"1":[1,4],"2":"Female"},
											"(ME, Umri miaka 5 hadi umri chini ya miaka 60)": {"0":["Years"],"1":[5,59],"2":"Male"},
											"(KE, Umri miaka 5 hadi umri chini ya miaka 60)": {"0":["Years"],"1":[5,59],"2":"Female"},
											"(ME, Umri miaka 60 au zaidi)": {"0":["Months"],"1":[60,150],"2":"Male"},
											"(KE, Umri miaka 60 au zaidi)": {"0":["Months"],"1":[60,150],"2":"Female"},
											
											"(Umri chini ya mwezi 1, ME)": {"0":["Hours","Days"],"1":[0,31],"2":"Male"},
											"(Umri chini ya mwezi 1, KE)": {"0":["Hours","Days"],"1":[0,31],"2":"Female"},
											"(Umri mwezi 1 hadi umri chini ya mwaka 1, ME)": {"0":["Months"],"1":[1,12],"2":"Male"},
											"(Umri mwezi 1 hadi umri chini ya mwaka 1, KE)": {"0":["Months"],"1":[1,12],"2":"Female"},
											"(Umri mwaka 1 hadi umri chini ya miaka 5, ME)": {"0":["Years"],"1":[1,4],"2":"Male"},
											"(Umri mwaka 1 hadi umri chini ya miaka 5, KE)": {"0":["Years"],"1":[1,4],"2":"Female"},
											"(Umri miaka 5 hadi umri chini ya miaka 60, ME)": {"0":["Years"],"1":[5,59],"2":"Male"},
											"(Umri miaka 5 hadi umri chini ya miaka 60, KE)": {"0":["Years"],"1":[5,59],"2":"Female"},
											"(Umri miaka 60 au zaidi, ME)": {"0":["Months"],"1":[60,150],"2":"Male"},
											"(Umri miaka 60 au zaidi, KE)": {"0":["Months"],"1":[60,150],"2":"Female"}				
										};
										if( $.inArray(row[0],filterArray[categoryOptionCombo.name][0] )!="-1"
											&& $.inArray( Number(row[1]), range( filterArray[categoryOptionCombo.name][1][0], filterArray[categoryOptionCombo.name][1][1] ) )!="-1"
											&& row[2]==filterArray[categoryOptionCombo.name][2]
											&& row[3].split("- ")[1]==dataElement.name
											) {
												console.log('dataElement:'+dataElement.name);
												console.log('category:'+categoryOptionCombo.name);
												console.log('row values:');console.log(row);
												if(typeof(dataValues[periodId+'-'+organisationUnit+'-'+dataElement.id+'-'+categoryOptionCombo.id])=="undefined") {
													dataValues[periodId+'-'+organisationUnit+'-'+dataElement.id+'-'+categoryOptionCombo.id]=Number(row[4]);
												}else {
													dataValues[periodId+'-'+organisationUnit+'-'+dataElement.id+'-'+categoryOptionCombo.id]+=Number(row[4]);
												}
												console.log('datavalue:');console.log(dataValues);
										}
										
									});
									
								});
							
							});
							//console.log('datavalues:');
							//console.log(JSON.stringify(jsonDataValues));
							$.each(dataValues,function(dataValueKey,dataValue){
							$('#'+dataValueKey.split("-")[2]+'-'+dataValueKey.split("-")[3]+'-val').val(dataValue);
								//console.log('key:');console.log(dataValueKey);
								//console.log('value:');console.log(dataValue);
								jsonDataValues["dataValues"].push(
									{
										"period":dataValueKey.split("-")[0],
										"orgUnit":dataValueKey.split("-")[1],
										"dataElement":dataValueKey.split("-")[2],
										"categoryOptionCombo":dataValueKey.split("-")[3],
										"value":dataValue
										
									}
									
								);
							});
							console.log(JSON.stringify(jsonDataValues));
							$.ajax({    type: "POST",
								contentType:"application/json",
								url: dataValueSetsUrl,
								data: JSON.stringify(jsonDataValues)
							}).done(function(importSummary){
								console.log(importSummary);
							});
						}
					});
				});
			//});
		}).fail(function(data){
			//Failed authentication
			console.log('authentication failed');
		});
	});
