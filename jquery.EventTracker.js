/**
 * Javascript to look for <div> tag with data-program-name attribute
 * and insert expanding table along with data for the specific period
 * it has been made flexible to improvements
 * @type {{javascript}}
 *
 * @todo use eventDate to filter events(i.e. show only particular period event,
 *       enter first date of selected period, today's date is not within the period
 *       otherwise enter today's date
 * @todo set storedby attribute in new instance
 * @todo set eventDate on new event for dataSetPeriod
 * @todo start with initial predefined fields for some of the fields
 * @todo filter options for some of the fields
 * 
 * 
 * Template example:
 * <!--Initial data -->
 * <div style="min-height:100px;">
 * <div data-initialize-program="Kuzuia magonjwa/visumbufu kwa kutumia kemikali" style="display:none;">
 *   <datavalues> 
 *     <datavalue>
 *        <dataelement name="Jina la ugonjwa / kisumbufu (i)">Green stink bug</dataelement>
 *     </datavalue> 
 *     <datavalue> 
 *       <dataelement name="Jina la ugonjwa / kisumbufu (i)">American ball worm</dataelement> 
 *     </datavalue> 
 *   </datavalues>
 * </div>
 * <!--Program place holder
 * <div class="handsontable" data-program-name="Kuzuia magonjwa/visumbufu kwa kutumia kemikali">&nbsp;</div>

 * 
 * 
 */
var hotAction ={};
var orgUnitId=null;
var hotInstance = {};
var dataSetPeriod=null;
//var dhis2={};dhis2.de={};dhis2.de.currentOrganisationUnitId='m0frOspS7JY';
//Action methods
hotAction.hasOptions = function(dataElement) {
    if( (dataElement.type=="string" && typeof (dataElement.optionSet) !=='undefined') || dataElement.type =="bool" ) {
        return true;
    }else {
        return false;
    }
};
hotAction.getHandsontableType = function(dataElement) {
    var type = this.hasOptions(dataElement) ? 'autocomplete'
        : dataElement.type=='int' ? 'numeric'
        : dataElement.type=='string' ?  'text'
        : dataElement.type=='bool' ? 'autocomplete'
        : dataElement.type=='trueOnly' ? 'checkbox'
        : dataElement.type=='date' ? 'date'
        : 'text';
    return type;
};
hotAction.getHandsontableOptions = function(dataElement) {
    var handsOnOptions = [];
    if(dataElement.type =="bool" ) {
		handsOnOptions.push("YES");
		handsOnOptions.push("NO");
	}else {
		$(dataElement.optionSet.options).each(function(index,option){
			handsOnOptions.push(option.name);
		});
	}
    return handsOnOptions;
};
hotAction.getColHeaders = function(){
    var colLabels = [];
    $(this.colHeaders).each(function(index,column){
        colLabels.push(column.name);
    });
    return colLabels;
};
hotAction.isEmptyRow = function(instance, row) {
    var rowData = instance.dataValues[row];
    for (var i in rowData) {
        if (rowData[i] !== null) {
            return false;
        }
    }
    return true;
};

hotAction.defaultCellRenderer = function (instance, td, row, col, prop, value, cellProperties) {
    //td: Object, row: Number, col: Number, prop: String, value: String, cellProperties: Object
    //Use this render to run validations and change colors
    var hotInstance =instance.getSettings().instance,programId=hotInstance.activeProgramStage.programId;
    var args = arguments;
    if (args[5] === null && instance.isEmptyRow(hotInstance, row)) {
        args[5] = hotInstance.visibleColumns[col].type;
        td.style.color = '#999';
    }
    else {
        td.style.color = '';
    }
    var className1=programId+'-'+col+'-'+row;//programId-colNum-rowNum
    var className2=' '+programId+'-'+prop+'-'+row;//pogramId-dataElementId-rowNum
    var className3=' '+typeof(hotInstance.dataValues[row])!=="undefined" && typeof(typeof(hotInstance.dataValues[row].eventId)!=="undefined") ?
        ' '+programId+'-'+prop+'-'+hotInstance.dataValues[row].eventId:''//programId-dataElementId-eventId

    td.className=className1+className2+className3;
    Handsontable.renderers.TextRenderer.apply(this, args);
    //td.style.backgroundColor = 'yellow';
    //td.style.backgroundColor = 'green';
    //td.style.backgroundColor = 'red';
    //console.log(td);//Displays td tag with it's classess

};
hotAction.greenRenderer = function (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = 'green';

};
hotAction.setColHeaders = function() {
    var hotInstance= this;
    $(hotInstance.activeProgramStage.programStageDataElements).each(function(index,item){
        hotInstance.colHeaders.push({
            id:item.dataElement.id,
            name:'<em style="width:12em;white-space: pre-wrap; white-space: -moz-pre-wrap !important;white-space: -pre-wrap;font-style:normal;text-wrap:unrestricted;word-wrap:break-word;">'+item.dataElement.name+'</em>',
            type:hotInstance.getHandsontableType(item.dataElement)
        });
        if(item.dataElement.name!=='dataSetPeriod' && item.dataElement.name!=='dataSetForm') {
			if(item.dataElement.name.length<=12) {
				hotInstance.colWidths.push(100);
			}else {
				hotInstance.colWidths.push(Math.floor(item.dataElement.name.length*3.5));
			}
            //Set column visible if dataelement is not dataSetPeriod or datasetForm
            var column = {
                data:item.dataElement.id,
                type:hotInstance.getHandsontableType(item.dataElement),
                renderer:hotInstance.defaultCellRenderer
            };
            if(hotInstance.hasOptions(item.dataElement)) {
                column.source=hotInstance.getHandsontableOptions(item.dataElement);
            }
            hotInstance.visibleColumns.push(column);
        }
    });
};
hotAction.afterRenderer = function (TD, row, col, prop, value, cellProperties) {
    var hotInstance =this.getSettings().instance;
    //TD: Object, row: Number, col: Number, prop: String, value: String, cellProperties: Object
};
hotAction.afterChange = function(changes,source) {
    //After change event is fired when afterRender is done
    var hotInstance =this.getSettings().instance;

    if(source==='loadData') {
        return;//Dont save changes
    }else if(source==='edit' || source==='paste') {
        //@todo if all values of the events are deleted, fire delete event instead of deleting values
        //@todo work on not sending empty values i.e. '', on empty value don't include the data value
        //@todo when event exists and data values and has no value
        // (e.g. it had only one value and was removed by cell delete, trigger delete event
        //@todo when event is new and dataValues have not a single value, don't create new event

        $(changes).each(function(changeIndex,change){
            var dataValueIndex = change[0],colDataElementId=change[1];
            var dataValue = hotInstance.dataValues[dataValueIndex];
            // Only update entire event for the row with detected changes
            var dhisEvent = {};
            dhisEvent.dataValues=[];

            var savingUrl='';
            var savingMethod='';
            var eventExists=null;
            var dataValuesExists=null;


            if(typeof(dataValue["eventId"])!=='undefined'
                && dataValue["eventId"]!==null
                && typeof(dataValue["eventDate"])!=='undefined'
                && dataValue["eventDate"]!==null) {
                //Event exists i.e. re-use eventId and eventDate
                eventExists=true;
                var dataSetPeriodExist=false;
                dhisEvent.eventDate=dataValue["eventDate"];
                dhisEvent.event=dataValue["eventId"];
                dhisEvent.status="ACTIVE";
                savingUrl='/ards/api/events/'+dhisEvent.event;
                savingMethod='PUT';
                //Fetch all datavalues into the table
                for(dataElementId in dataValue) {
                    if(dataElementId!=='eventId'
                        && dataElementId!=='eventDate'
                        && dataValue[dataElementId]!==null) {
						//Replace yes/no with true/false for boolean
						if(hotInstance.dataElementById[dataElementId].type=="bool") {
							dataValue[dataElementId].replace("YES","true");
							dataValue[dataElementId].replace("NO","false");
						}
                        dhisEvent.dataValues.push({dataElement:dataElementId,value:dataValue[dataElementId]});
                        dataValuesExists=true;
                        if(hotInstance.dataElementIds.dataSetPeriod==dataElementId && dataValue[dataElementId]!==null) dataSetPeriodExist=true;
                    }
                }
                //update dataset period for existing record without period
                if(!dataSetPeriodExist) dhisEvent.dataValues.push({dataElement:hotInstance.dataElementIds.dataSetPeriod,value:dataSetPeriod});
                console.log('stupid app passed thorugh here!');
            }else{
                //New Event
                today = new Date();
                eventExists=false;
                //Set dataSetPeriod
                var periodSaved=false;
                hotInstance.dataValues[hotInstance.dataElementIds.dataSetPeriod]=dataSetPeriod;
                dhisEvent.program = hotInstance.activeProgramStage.programId;
                dhisEvent.programStage = hotInstance.activeProgramStage.id;
                dhisEvent.status='ACTIVE';
                dhisEvent.orgUnit=orgUnitId;
                dhisEvent.eventDate=today.toISOString();
                savingUrl='/ards/api/events.json';
                savingMethod='POST';
                //Fetch all datavalues into the table
                for(dataElementId in dataValue) {
                    if(dataElementId!=='eventId'
                        && dataElementId!=='eventDate'
                        && hotInstance.dataElementNames[dataElementId]!=='dataSetPeriod'//Don't persist
                        && dataValue[dataElementId]!==null
                        ) {
						//Replace yes/no with true/false for boolean
						console.log(' data element:'+JSON.stringify(hotInstance.dataElementById[dataElementId]));
						if(hotInstance.dataElementById[dataElementId].type=="bool") {
							dataValue[dataElementId].replace("YES","true");
							dataValue[dataElementId].replace("NO","false");
							console.log('new event data value for boolean:'+JSON.stringify(dataValue[dataElementId]));
						}
                        dhisEvent.dataValues.push({dataElement:dataElementId,value:dataValue[dataElementId]});
                        dataValuesExists=true;
                    }else if(hotInstance.dataElementNames[dataElementId]=='dataSetPeriod'){
                        dhisEvent.dataValues.push({dataElement:dataElementId,value:dataSetPeriod});
                        periodSaved=true;
                    }
                }
                //Make sure period exists, just in case
                if(periodSaved==false) dhisEvent.dataValues.push({dataElement:hotInstance.dataElementIds['dataSetPeriod'],value:dataSetPeriod});
            }
            if(dhisEvent.event==null) {
                var cellClass='.'+hotInstance.activeProgramStage.programId+'-'+colDataElementId+'-'+(hotInstance.dataValues.length-2);
            }else {
                var cellClass='.'+hotInstance.activeProgramStage.programId+'-'+colDataElementId+'-'+dhisEvent.event;
            }
            //console.log('changes:'+change);
            //console.log(cellClass);
            //Persist event after formulation
            if(dataValuesExists) {
                $.ajax({
                    headers: {
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    'type':savingMethod,
                    'url': savingUrl,
                    'data':JSON.stringify(dhisEvent),
                    'dataType':'json'
                }).done(function(data){
                    if(eventExists===false) {
                        //New event was created
                        hotInstance.dataValues[dataValueIndex]["eventId"]=data.importSummaries[0].reference;
                        hotInstance.dataValues[dataValueIndex]["eventDate"]=today.toISOString();
                    }else {
                        //Existing event was updated background-color: ;
                    }
                    $(hotInstance.savedClasses).each(function(cssClassIndex,cssClass){

                    });

                    hotInstance.savedCSSClasses[cellClass]="#B9FFB9";//Green
                    for(cellClass in hotInstance.savedCSSClasses) {
                        $(cellClass).css({backgroundColor: hotInstance.savedCSSClasses[cellClass] });
                    }

                }).fail(function(data){
                    if(savingMethod=="PUT") {
                        //@workaround: jquery dont return success for put promise
                        hotInstance.savedCSSClasses[cellClass]="#B9FFB9";//Green
                    }else {
                        hotInstance.savedCSSClasses[cellClass]="#B9FFB9";//Yellow
                    }
                    for(cellClass in hotInstance.savedCSSClasses) {
                        $(cellClass).css({backgroundColor: hotInstance.savedCSSClasses[cellClass] });
                    }
                });
            }
        })
    }
};
hotAction.beforeChange = function (changes) {
    var hotInstance = this.getSettings().instance
        , i
        , ilen = changes.length
        , c
        , clen = hotInstance.colCount
        , rowColumnSeen = {}
        , rowsToFill = {};
    for (i = 0; i < ilen; i++) {
        if (changes[i][2] === null && changes[i][3] !== null) { //if oldVal is empty
            if (hotInstance.isEmptyRow(hotInstance, changes[i][0])) {
                rowColumnSeen[changes[i][0] + '/' + changes[i][1]] = true; //add this row/col combination to cache so it will not be overwritten by template
                rowsToFill[changes[i][0]] = true;
            }
        }
    }
    for (var r in rowsToFill) {
        if (rowsToFill.hasOwnProperty(r)) {
            for (c = 0; c < clen; c++) {
                if (!rowColumnSeen[r + '/' + c]) { //if it is not provided by user in this change set, take value from template
                    changes.push([r, c, null, hotInstance.visibleColumns[c].type]);
                }
            }
        }
    }
}
hotAction.beforeRemoveRow = function(rowIndex,amount){
    //@todo figure out how to delete from single table
    var hotInstance = this.getSettings().instance;
    var deletingMethod="DELETE";
    $(hotInstance.dataValues).each(function(dataValueIndex,dataValue){
        for(var selectedIndex = rowIndex;selectedIndex<(amount+rowIndex);selectedIndex++){
            if(dataValueIndex==selectedIndex && typeof(dataValue["eventId"])!=='undefined'
                && dataValue["eventId"]!==null
                && typeof(dataValue["eventDate"])!=='undefined'
                && dataValue["eventDate"]!==null) {
                var deletingUrl='/ards/api/events/'+dataValue["eventId"];
                //Remove event
                $.ajax({
                    headers: {
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    'type':deletingMethod,
                    'url': deletingUrl,
                    'dataType':'json'
                });
            }
        }
    });

};
hotAction.updateInstance = function(orgUnitId,hotInstance) {
    //console.log('current orgunit:'+orgUnitId);
    //Reset data
    hotInstance.dataValues=[];
	$.get(hotInstance.getEventUrl(orgUnitId,hotInstance.activeProgramStage.id)).done(function(data){
		$(data.events).each(function(eventIndex,event){
            var handsOnTableEventObject = {};
			handsOnTableEventObject['eventId']=event.event;
			handsOnTableEventObject['eventDate']=event.eventDate;
			//Go through data values
			if(typeof(event.dataValues)!=='undefined') {
				var eventIsOfThisPeriod=false;//helps to filter dataValues of different period
				$(event.dataValues).each(function(dataValueIndex,dataValue){
					var dataElementName=hotInstance.dataElementNames[dataValue.dataElement];
                    dataSetPeriod=$("#selectedPeriodId option[value='"+$('#selectedPeriodId').val()+"']").text();
					if(dataElementName=="dataSetPeriod" && dataValue.value===dataSetPeriod) {
                        eventIsOfThisPeriod=true;
                        console.log('period received here is:'+dataSetPeriod+' period form db is:'+dataValue.value);
                    }
					//Replace yes/no with true/false
					if(hotInstance.dataElementById[dataValue.dataElement].type=="bool") {
						dataValue[dataElementId].replace("true","YES");
						dataValue[dataElementId].replace("false","NO");
					}
					handsOnTableEventObject[dataValue.dataElement]=dataValue.value;
				});
				if(!$.isEmptyObject(handsOnTableEventObject) && eventIsOfThisPeriod) {
					hotInstance.dataValues.push(handsOnTableEventObject);
				}
			}
		});
		
		//If no data found from database initialize with xml data
		if(hotInstance.dataValues.length==0 && hotInstance.initialDataValues.length>0) {
			$.extend(hotInstance.dataValues,hotInstance.initialDataValues);
		}
        hotInstance.instance.updateSettings({data:hotInstance.dataValues});
	});
}
hotAction.setDataElementNames =function() {
    var hotInstance = this;
    $(hotInstance.activeProgramStage.programStageDataElements).each(function(dataElKey,dataElement){
        hotInstance.dataElementNames[dataElement.dataElement.id]=dataElement.dataElement.name;
        hotInstance.dataElementIds[dataElement.dataElement.name]=dataElement.dataElement.id;
        hotInstance.dataElementById[dataElement.dataElement.id]=dataElement.dataElement;
    });
};
hotAction.setInitialDataValues = function() {
	var hotInstance = this;
	if($("div[data-initialize-program='"+hotInstance.activeProgramStage.programName+"']").length>0) {
		var rawXMLData=$($("div[data-initialize-program='"+hotInstance.activeProgramStage.programName+"']")[0]).html();
		var initialData = $.xml2json($.parseXML(rawXMLData));
		$(initialData.datavalue).each(function(valueIndex,dataItem) {
			var initialData = {},dataElementId=hotInstance.dataElementIds[dataItem.dataelement.name];
			initialData[dataElementId]=dataItem.dataelement.text;
			hotInstance.initialDataValues.push(initialData);
		});
	}
}
hotAction.getEventUrl = function (orgunitId,programStageId) {
    var dataUrl = '/ards/api/events.json'+'?orgUnit='+orgunitId+'&programStage='+programStageId+'&paging=false';
    return dataUrl;
};

hotAction.getDataValues = function() {
    var programsUrl =  "/ards/api/programs.json?filter=type:eq:3&paging=false&fields=id,name,version,programStages[id,version,programStageSections[id],programStageDataElements[dataElement[id,name,type,optionSet[id,name,options[id,name],version]]]]";
    $.get(programsUrl).done(function(data){
        $(data.programs).each(function(pIncr,program){
            $($("div[class='handsontable']")).each(function(hIncr,div){
                var programName = $(div).attr("data-program-name");
                if(program.name==programName) {
                    //Instantiate all information associated with program`
                    hotInstance[hIncr] = {};
                    hotInstance[hIncr].colHeaders = [];
                    hotInstance[hIncr].colWidths = [];
                    hotInstance[hIncr].visibleColumns = [];
                    hotInstance[hIncr].dataElementNames = {};//help to deduce name from id
                    hotInstance[hIncr].dataElementIds = {};//help to deduce id from name
                    hotInstance[hIncr].dataElementById = {};//help to deduce dataElement from id
                    hotInstance[hIncr].dataValues = [];
                    hotInstance[hIncr].initialDataValues = [];
                    hotInstance[hIncr].savedCSSClasses = {};
                    hotInstance[hIncr].settings = {};
                    hotInstance[hIncr].settings.minSpareRows = 1;
                    hotInstance[hIncr].settings.contextMenu = ['row_above', 'row_below', 'remove_row'];
                    hotInstance[hIncr].name=program.name;
                    hotInstance[hIncr].activeProgramStage=program.programStages[0];
                    hotInstance[hIncr].activeProgramStage.programId=program.id;
                    hotInstance[hIncr].activeProgramStage.programName=program.name;
                    //Assign all functions to this instance
                    $.extend(hotInstance[hIncr],hotAction);
                    //Use assigned functions
                    hotInstance[hIncr].setDataElementNames();
                    hotInstance[hIncr].setColHeaders();
                    //Initialize values of instance if they exist
                    hotInstance[hIncr].setInitialDataValues();

                    //Get initial data
                    orgUnitId=dhis2.de.currentOrganisationUnitId;
                    dataSetPeriod=$("#selectedPeriodId option[value='"+$('#selectedPeriodId').val()+"']").text();
                    $.get(hotInstance[hIncr].getEventUrl(orgUnitId,hotInstance[hIncr].activeProgramStage.id)).done(function(data){
                        $(data.events).each(function(eventIndex,event){
                            var handsOnTableEventObject = {};
                            handsOnTableEventObject['eventId']=event.event;
                            handsOnTableEventObject['eventDate']=event.eventDate;
                            //Go through data values
                            if(typeof(event.dataValues)!=='undefined') {
                                var eventIsOfThisPeriod=false;//helps to filter dataValues of different period
                                $(event.dataValues).each(function(dataValueIndex,dataValue){
                                    var dataElementName=hotInstance[hIncr].dataElementNames[dataValue.dataElement];
                                    if(dataElementName=="dataSetPeriod" && dataValue.value===dataSetPeriod) eventIsOfThisPeriod=true;
                                    //Replace yes/no with true/false
									if(hotInstance[hIncr].dataElementById[dataValue.dataElement].type=="bool") {
										dataValue[dataElementId].replace("true","YES");
										dataValue[dataElementId].replace("false","NO");
									console.log('loading first time data value for boolean:'+JSON.stringify(dataValue[dataElementId]));
									}
                                    handsOnTableEventObject[dataValue.dataElement]=dataValue.value;
                                });
                                if(!$.isEmptyObject(handsOnTableEventObject) && eventIsOfThisPeriod) {
                                    var nextIndex=hotInstance[hIncr].dataValues.length;
                                    hotInstance[hIncr].dataValues[nextIndex]=handsOnTableEventObject;
                                }
                            }
                        });
                        //If no data found from database initialize with xml data
                        if(hotInstance[hIncr].dataValues.length==0 && hotInstance[hIncr].initialDataValues.length>0) {
							$.extend(hotInstance[hIncr].dataValues,hotInstance[hIncr].initialDataValues);
						}

                        //Deploy programstage table
                        hotInstance[hIncr].instance = new Handsontable($("div[data-program-name='"+programName+"']").get(0), {
                            data: hotInstance[hIncr].dataValues,
                            autoWrapRow:true,
                            minSpareRows: hotInstance[hIncr].settings.minSpareRows,
                            colHeaders: hotInstance[hIncr].getColHeaders(),
                            colWidths: hotInstance[hIncr].colWidths,
                            columns: hotInstance[hIncr].visibleColumns,
                            contextMenu: hotInstance[hIncr].settings.contextMenu,
                            afterChange: hotInstance[hIncr].afterChange,
                            afterRenderer:hotInstance[hIncr].afterRenderer,
                            beforeChange: hotInstance[hIncr].beforeChange,
                            autoWrapRow: true,
                            manualColumnResize: true,
                            manualRowResize: true,
                            autoWrapCol:true,//Pressing enter in last row should moves to first row in next column
                            'instance':hotInstance[hIncr]
                        });
                        hotInstance[hIncr].instance.addHook('beforeRemoveRow',hotInstance[hIncr].beforeRemoveRow);

                    });
                }
            });
        });
    });
};

$(document).ready(function () {
	//To be fetchhed from the from by jQuery
	$('#selectedPeriodId').addClass("handsontableOption");
	$('#selectedOrganisationUnit').addClass("handsontableOption");
	orgUnitId=dhis2.de.currentOrganisationUnitId;
	var dataSetName = $("#selectedDataSetId option[value='"+$('#selectedDataSetId').val()+"']").text();
	var dataSetPeriod=$("#selectedPeriodId option[value='"+$('#selectedPeriodId').val()+"']").text();
	//This is where the program start
	hotAction.getDataValues();
    //Hook up event triggers
    Handsontable.Dom.addEvent($('#selectedPeriodId')[0], 'change', function () {
        //Period changed, update all handsontable
        dataSetPeriod=$("#selectedPeriodId option[value='"+$('#selectedPeriodId').val()+"']").text();
        console.log('period changed'+dataSetPeriod);
        ($("div[class='handsontable']")).each(function(temphIncr,div){
            hotInstance[temphIncr].savedCSSClasses={};//Clear css on form change
            if($.isArray(orgUnitId)) orgUnitId = orgUnitId[0];
            var fetchedData = hotInstance[temphIncr].updateInstance(orgUnitId,hotInstance[temphIncr]);
        });
    });
    dhis2.util.on( 'dhis2.ou.event.orgUnitSelected', function( event, ds, cr ) {
        //Orgunit changed, update all handsontable
        orgUnitId=ds;
        ($("div[class='handsontable']")).each(function(temphIncr,div){
            hotInstance[temphIncr].savedCSSClasses={};//Clear css on form change
            if($.isArray(orgUnitId)) orgUnitId = orgUnitId[0];
            var fetchedData = hotInstance[temphIncr].updateInstance(orgUnitId,hotInstance[temphIncr]);
        });
    });
	
});

//WhenPluggedInFormUseTheseEventTriggers
//dhis2.util.on( 'dhis2.de.event.formReady', function( event, ds ) {
//	console.log( 'The form with id: ' + ds + ' is loaded!' );
//    //Remove any prior instantiated handsontable
//    ($("div[class='handsontable']")).each(function(temphIncr,div){
//        var fetchedData = hotInstance[temphIncr].updateInstance(orgUnitId,hotInstance[temphIncr]);
//    });
//});

//dhis2.util.on( 'dhis2.de.event.completed', function( event, ds, cr ) {
//    console.log( 'Form was completed for org unit: ' + cr.ou );
//} );

