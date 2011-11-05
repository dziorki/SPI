$(document).ready(function(){
    $("#remember_click").click(function(){
        if($("#remember_me").is(':checked')){
            $("#remember_me").attr('checked',false);
        } else {
            $("#remember_me").attr('checked',true);
        }
    });
});


function getPie(link){
    
    $(function() {
        var options = {
            chart: {
                renderTo: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Struktura portfela'
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,

                    },
                    showInLegend: true
                }
            }
        };


        $.getJSON(link, function(data) {
            options.series = data;
            var chart = new Highcharts.Chart(options);

        });
    });
}

