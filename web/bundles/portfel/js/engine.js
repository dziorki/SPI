$(document).ready(function(){ 

    $(function() {
        $(".chartslist").sortable({
            connectWith: '.chartslist',
            handle: '.movebtn',
            placeholder: 'placeholder',
            forcePlaceholderSize: true,
            opacity: 0.4, 
            cursor: 'move',
            update: function() {
                var order = $(this).sortable('serialize',{
                    key: 'order'
                }) ;
                $.cookie('recordListing', order);
            }
        });
        
        $(".closebtn").live('click', function() {
            $(this).parent().remove();
            var order = $(".chartslist").sortable('serialize',{
                key: 'order'
            }) ;
            $.cookie('recordListing', order);
        });
    });
    

    
    




var Opt = {
    title: null,
    axes: {
        xaxis:{
            renderer: $.jqplot.DateAxisRenderer,
            tickOptions:{
                formatString: "%H:%M"
            },
            numberTicks: 2
        },
        y2axis:{
            numberTicks: 5,
            tickOptions:{
                formatString:'%.2f'

            }
        },
        yaxis:{
            rendererOptions: {
                barWidth: 1, 
                shadowOffset: 0, 
                shadowDepth: 0
            }
        }
    },
    series:[{
        yaxis: 'y2axis',
        color: '#3B5998',
        shadow: false,
        showMarker: false,
        lineWidth:1   
    }],
    grid: {
        gridLineColor: '#e7e7e7',
        gridLineWidth: 1,
        borderColor:'#e7e7e7',
        borderWidth: 0,
        background: '#ffffff',
        shadow: false
    }
};

Model = {
    
    
    
    
    addchart: function(id){
        if(!$("#chartslist_"+id).length){
        
            $.post("chart",{
                id: id
            }, function(data) {
                $(".chartslist").append('<li id="chartslist_'+id+'"><a class="closebtn" title="Usuń"></a><a class="movebtn" title="Przesuń"></a><div class="header"><a class="hname" href="/notowania/KGH">'+data.data.name+'</a><span class="htime">29 lip 17:33</span><span class="hvalue">'+data.data.value+'</span><span class="hchange"><span class="cminus">(-23.00%)</span></span></div><div id="chartph-'+id+'" class="chartph" style="position: relative; height: 120px; width: 286px; "></div></li>');
                var order = $(".chartslist").sortable('serialize',{
                    key: 'order'
                }) ;

                $.jqplot('chartph-'+id,[data.data.quotes],Opt);
                
                $.cookie('recordListing', order);
            },'json');        
        

        }

    }
}





    var goog = [
    ["2011-07-30 13:55:55", 0.06],
    ["2011-07-30 13:58:55", 0.06],
    ["2011-07-30 14:08:55", 0.05],
    ["2011-07-30 14:12:55", 0.06],
    ["2011-07-30 14:58:55", 0.06],
    ["2011-07-30 14:58:55", 0.06],
    ["2011-07-30 14:59:55", 0.06],
    ["2011-07-30 15:28:55", 0.06],
    ["2011-07-30 15:48:55", 0.05],
    ["2011-07-30 15:51:55", 0.06],
    ["2011-07-30 15:58:55", 0.07],
    ["2011-07-30 16:28:55", 0.07]
    ];
    var kook = [
    ["2011-07-30 08:55:55", 1.06],
    ["2011-07-30 08:58:55", 0.99],
    ["2011-07-30 09:08:55", 0.98],
    ["2011-07-30 09:12:55", 0.97],
    ["2011-07-30 09:47:55", 0.99],
    ["2011-07-30 09:58:55", 0.95],
    ["2011-07-30 09:59:55", 0.89],
    ["2011-07-30 10:28:55", 0.90],
    ["2011-07-30 10:48:55", 0.90],
    ["2011-07-30 10:51:55", 0.90],
    ["2011-07-30 10:58:55", 0.87],
    ["2011-07-30 11:28:55", 0.88],
    ["2011-07-30 12:28:55", 0.88],
    ["2011-07-30 13:28:55", 0.88],
    ["2011-07-30 13:55:55", 1.06],
    ["2011-07-30 13:58:55", 0.99],
    ["2011-07-30 14:08:55", 0.98],
    ["2011-07-30 14:12:55", 0.97],
    ["2011-07-30 14:58:55", 0.99],
    ["2011-07-30 14:58:55", 0.95],
    ["2011-07-30 14:59:55", 0.89],
    ["2011-07-30 15:28:55", 0.90],
    ["2011-07-30 15:48:55", 0.90],
    ["2011-07-30 15:51:55", 0.90],
    ["2011-07-30 15:58:55", 0.87],
    ["2011-07-30 16:28:55", 0.88],
    ["2011-07-30 16:28:55", 0.88],
    ["2011-07-30 16:28:55", 0.88],
    ["2011-07-30 16:28:55", 0.88],
    ["2011-07-30 16:28:55", 0.88],
    ["2011-07-30 16:28:55", 0.87],
    ["2011-07-30 16:28:55", 0.86]
    ];




    plot1 = $.jqplot('chartph-5',[goog],Opt);
    plot2 = $.jqplot('chartph-4',[kook],Opt);

});

