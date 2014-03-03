$(document).ready(function() {
		//Setting loading parameters
		var lastQuarter=$( '#selectedPeriodId' ).val().split(/\Q/)[0]+'Q'+($( '#selectedPeriodId' ).val().split(/\Q/)[1]-1);
		if( $( '#selectedPeriodId' ).val() != '2013Q4' ) {
			var params = { periodId : lastQuarter, dataSetId : $( '#selectedDataSetId' ).val(), organisationUnitId : getCurrentOrganisationUnit(), multiOrganisationUnit: dhis2.de.multiOrganisationUnit };
			var cc = dhis2.de.getCurrentCategoryCombo();
			var cp = dhis2.de.getCurrentCategoryOptionsQueryValue();
			if ( cc && cp ) {params.cc = cc; params.cp = cp;}
			var loadedDatavaluesLastQuarter = {};
			var currentCumulativeSum = {};
			var action = $.ajax( {
				url: 'getDataValues.action', data: params, dataType: 'json',
				error: function() { var json = getOfflineDataValueJson( params );$.each(json.dataValues,function(datavalueIndex,datavalue) {loadedDatavaluesLastQuarter[datavalue.id]=datavalue.val;});},
				success: function( json ) {$.each(json.dataValues,function(datavalueIndex,datavalue) {loadedDatavaluesLastQuarter[datavalue.id]=datavalue.val;});}
			} ).done(function() {
				// After getting previously loaded data,
				// Enlist for manouvering
				// sum them up to store on current quarter.
				if( $( '#selectedPeriodId' ).val() != '2013Q4' || $( '#selectedPeriodId' ).val() != '2012Q1' ) {
					currentCumulativeSum['G1Xh1qsVqKJ-nehCW5s6Hx4-val'] =  parseInt((loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-nehCW5s6Hx4'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-nehCW5s6Hx4'] : 0 )) + parseInt((loadedDatavaluesLastQuarter['HiCsdWaUEma-nehCW5s6Hx4'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-nehCW5s6Hx4']: 0 ));//cumulativePersonsEnrolledInART under1Me
					fieldId='G1Xh1qsVqKJ' + '-' + 'nehCW5s6Hx4' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-nehCW5s6Hx4-val']);saveVal( 'G1Xh1qsVqKJ', 'nehCW5s6Hx4', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-ttFf9vc6pnB-val'] = parseInt((loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-ttFf9vc6pnB'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-ttFf9vc6pnB'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-ttFf9vc6pnB'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-ttFf9vc6pnB'] : 0 ));//cumulativePersonsEnrolledInART oneToFourMe
					fieldId='G1Xh1qsVqKJ' + '-' + 'ttFf9vc6pnB' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-ttFf9vc6pnB-val']);saveVal( 'G1Xh1qsVqKJ', 'ttFf9vc6pnB', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-Xns0ysCNhcv-val'] = parseInt((loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-Xns0ysCNhcv'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-Xns0ysCNhcv'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-Xns0ysCNhcv'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-Xns0ysCNhcv']: 0 ));//cumulativePersonsEnrolledInART fiveToFourteen Me
					fieldId='G1Xh1qsVqKJ' + '-' + 'Xns0ysCNhcv' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-Xns0ysCNhcv-val']);saveVal( 'G1Xh1qsVqKJ', 'Xns0ysCNhcv', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-OKxxCNhyCrd-val'] = parseInt((loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-OKxxCNhyCrd'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-OKxxCNhyCrd'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-OKxxCNhyCrd'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-OKxxCNhyCrd'] : 0 ));//cumulativePersonsEnrolledInART aboveFifteenMe
					fieldId='G1Xh1qsVqKJ' + '-' + 'OKxxCNhyCrd' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-OKxxCNhyCrd-val']);saveVal( 'G1Xh1qsVqKJ', 'OKxxCNhyCrd', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-IR5epaaFjxT-val'] = parseInt(( loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-IR5epaaFjxT'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-IR5epaaFjxT'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-IR5epaaFjxT'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-IR5epaaFjxT'] : 0 ));//cumulativePersonsEnrolledInART under1Ke
					fieldId='G1Xh1qsVqKJ' + '-' + 'IR5epaaFjxT' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-IR5epaaFjxT-val']);saveVal( 'G1Xh1qsVqKJ', 'IR5epaaFjxT', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-ttFf9vc6pnB-val'] = parseInt(( loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-ttFf9vc6pnB'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-ttFf9vc6pnB'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-ttFf9vc6pnB'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-ttFf9vc6pnB'] : 0 ));//cumulativePersonsEnrolledInART oneToFourKe
					fieldId='G1Xh1qsVqKJ' + '-' + 'ttFf9vc6pnB' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-ttFf9vc6pnB-val']);saveVal( 'G1Xh1qsVqKJ', 'ttFf9vc6pnB', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-Xns0ysCNhcv-val'] = parseInt(( loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-Xns0ysCNhcv'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-Xns0ysCNhcv'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-Xns0ysCNhcv'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-Xns0ysCNhcv'] : 0 ));//cumulativePersonsEnrolledInART fiveToFourteenKe
					fieldId='G1Xh1qsVqKJ' + '-' + 'Xns0ysCNhcv' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-Xns0ysCNhcv-val']);saveVal( 'G1Xh1qsVqKJ', 'Xns0ysCNhcv', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-KmmKuXofUzA-val'] = parseInt(( loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-KmmKuXofUzA'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-KmmKuXofUzA'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-KmmKuXofUzA'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-KmmKuXofUzA'] : 0 ));//cumulativePersonsEnrolledInART aboveFifteenKe
					fieldId='G1Xh1qsVqKJ' + '-' + 'KmmKuXofUzA' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-KmmKuXofUzA-val']);saveVal( 'G1Xh1qsVqKJ', 'KmmKuXofUzA', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-uGIJ6IdkP7Q-val'] = parseInt(( loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-uGIJ6IdkP7Q'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-uGIJ6IdkP7Q'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-uGIJ6IdkP7Q'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-uGIJ6IdkP7Q'] : 0 ));//cumulativePersonsEnrolledInART pregant
					fieldId='G1Xh1qsVqKJ' + '-' + 'uGIJ6IdkP7Q' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-uGIJ6IdkP7Q-val']);saveVal( 'G1Xh1qsVqKJ', 'uGIJ6IdkP7Q', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
				}
			});
		}
		
	// Event trigger on Orgunit/Period Switching
	$( 'body' ).bind( 'dhis-web-dataentry-form-loaded', function() {
		//Setting loading parameters
		var lastQuarter=$( '#selectedPeriodId' ).val().split(/\Q/)[0]+'Q'+($( '#selectedPeriodId' ).val().split(/\Q/)[1]-1);
		if( $( '#selectedPeriodId' ).val() != '2013Q4' ) {
			var params = { periodId : lastQuarter, dataSetId : $( '#selectedDataSetId' ).val(), organisationUnitId : getCurrentOrganisationUnit(), multiOrganisationUnit: dhis2.de.multiOrganisationUnit };
			var cc = dhis2.de.getCurrentCategoryCombo();
			var cp = dhis2.de.getCurrentCategoryOptionsQueryValue();
			if ( cc && cp ) {params.cc = cc; params.cp = cp;}
			var loadedDatavaluesLastQuarter = {};
			var currentCumulativeSum = {};
			var action = $.ajax( {
				url: 'getDataValues.action', data: params, dataType: 'json',
				error: function() { var json = getOfflineDataValueJson( params );$.each(json.dataValues,function(datavalueIndex,datavalue) {loadedDatavaluesLastQuarter[datavalue.id]=datavalue.val;});},
				success: function( json ) {$.each(json.dataValues,function(datavalueIndex,datavalue) {loadedDatavaluesLastQuarter[datavalue.id]=datavalue.val;});}
			} ).done(function() {
				// After getting previously loaded data,
				// Enlist for manouvering
				// sum them up to store on current quarter.
				if( $( '#selectedPeriodId' ).val() != '2013Q4' || $( '#selectedPeriodId' ).val() != '2012Q1' ) {
					currentCumulativeSum['G1Xh1qsVqKJ-nehCW5s6Hx4-val'] =  parseInt((loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-nehCW5s6Hx4'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-nehCW5s6Hx4'] : 0 )) + parseInt((loadedDatavaluesLastQuarter['HiCsdWaUEma-nehCW5s6Hx4'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-nehCW5s6Hx4']: 0 ));//cumulativePersonsEnrolledInART under1Me
					fieldId='G1Xh1qsVqKJ' + '-' + 'nehCW5s6Hx4' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-nehCW5s6Hx4-val']);saveVal( 'G1Xh1qsVqKJ', 'nehCW5s6Hx4', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-ttFf9vc6pnB-val'] = parseInt((loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-ttFf9vc6pnB'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-ttFf9vc6pnB'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-ttFf9vc6pnB'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-ttFf9vc6pnB'] : 0 ));//cumulativePersonsEnrolledInART oneToFourMe
					fieldId='G1Xh1qsVqKJ' + '-' + 'ttFf9vc6pnB' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-ttFf9vc6pnB-val']);saveVal( 'G1Xh1qsVqKJ', 'ttFf9vc6pnB', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-Xns0ysCNhcv-val'] = parseInt((loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-Xns0ysCNhcv'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-Xns0ysCNhcv'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-Xns0ysCNhcv'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-Xns0ysCNhcv']: 0 ));//cumulativePersonsEnrolledInART fiveToFourteen Me
					fieldId='G1Xh1qsVqKJ' + '-' + 'Xns0ysCNhcv' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-Xns0ysCNhcv-val']);saveVal( 'G1Xh1qsVqKJ', 'Xns0ysCNhcv', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-OKxxCNhyCrd-val'] = parseInt((loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-OKxxCNhyCrd'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-OKxxCNhyCrd'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-OKxxCNhyCrd'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-OKxxCNhyCrd'] : 0 ));//cumulativePersonsEnrolledInART aboveFifteenMe
					fieldId='G1Xh1qsVqKJ' + '-' + 'OKxxCNhyCrd' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-OKxxCNhyCrd-val']);saveVal( 'G1Xh1qsVqKJ', 'OKxxCNhyCrd', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-IR5epaaFjxT-val'] = parseInt(( loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-IR5epaaFjxT'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-IR5epaaFjxT'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-IR5epaaFjxT'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-IR5epaaFjxT'] : 0 ));//cumulativePersonsEnrolledInART under1Ke
					fieldId='G1Xh1qsVqKJ' + '-' + 'IR5epaaFjxT' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-IR5epaaFjxT-val']);saveVal( 'G1Xh1qsVqKJ', 'IR5epaaFjxT', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-ttFf9vc6pnB-val'] = parseInt(( loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-ttFf9vc6pnB'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-ttFf9vc6pnB'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-ttFf9vc6pnB'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-ttFf9vc6pnB'] : 0 ));//cumulativePersonsEnrolledInART oneToFourKe
					fieldId='G1Xh1qsVqKJ' + '-' + 'ttFf9vc6pnB' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-ttFf9vc6pnB-val']);saveVal( 'G1Xh1qsVqKJ', 'ttFf9vc6pnB', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-Xns0ysCNhcv-val'] = parseInt(( loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-Xns0ysCNhcv'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-Xns0ysCNhcv'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-Xns0ysCNhcv'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-Xns0ysCNhcv'] : 0 ));//cumulativePersonsEnrolledInART fiveToFourteenKe
					fieldId='G1Xh1qsVqKJ' + '-' + 'Xns0ysCNhcv' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-Xns0ysCNhcv-val']);saveVal( 'G1Xh1qsVqKJ', 'Xns0ysCNhcv', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-KmmKuXofUzA-val'] = parseInt(( loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-KmmKuXofUzA'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-KmmKuXofUzA'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-KmmKuXofUzA'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-KmmKuXofUzA'] : 0 ));//cumulativePersonsEnrolledInART aboveFifteenKe
					fieldId='G1Xh1qsVqKJ' + '-' + 'KmmKuXofUzA' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-KmmKuXofUzA-val']);saveVal( 'G1Xh1qsVqKJ', 'KmmKuXofUzA', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
					
					currentCumulativeSum['G1Xh1qsVqKJ-uGIJ6IdkP7Q-val'] = parseInt(( loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-uGIJ6IdkP7Q'] ? loadedDatavaluesLastQuarter['G1Xh1qsVqKJ-uGIJ6IdkP7Q'] : 0 )) + parseInt(( loadedDatavaluesLastQuarter['HiCsdWaUEma-uGIJ6IdkP7Q'] ? loadedDatavaluesLastQuarter['HiCsdWaUEma-uGIJ6IdkP7Q'] : 0 ));//cumulativePersonsEnrolledInART pregant
					fieldId='G1Xh1qsVqKJ' + '-' + 'uGIJ6IdkP7Q' + '-val'; $( '#'+fieldId ).val(currentCumulativeSum['G1Xh1qsVqKJ-uGIJ6IdkP7Q-val']);saveVal( 'G1Xh1qsVqKJ', 'uGIJ6IdkP7Q', fieldId );//console.log('stored value:'+$( '#'+fieldId ).val());
				}
			});
		}
	} );
	
});

	
