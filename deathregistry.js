<script type="text/javascript">
$(document).ready(function() {
	var wasDateInvestigated='83398-238613-val';
	var investigationDate='83398-238616-val';
	$(wasDateInvestigated).on('change', function() {
		if( ($(wasDateInvestigated).val()=='true'))  {
			$(investigationDate).removeAttr('disabled');
		}else{
			$(investigationDate).attr('disabled', 'true');
		};
	});
});
</script>
