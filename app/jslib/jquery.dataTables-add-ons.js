// adds hover class, including left and right fixed columns
$(document).on({
	mouseenter : function() {
		trIndex = $(this).index();
		$("table.dataTable tbody").each(function(index) {
			$(this).find("tr:eq(" + trIndex + ")").addClass("hover");
		});
	},
	mouseleave : function() {
		trIndex = $(this).index();
		$("table.dataTable tbody").each(function(index) {
			$(this).find("tr:eq(" + trIndex + ")").removeClass("hover");
		});
	}
}, ".dataTables_wrapper tbody tr");