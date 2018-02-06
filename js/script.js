var $nytHeaderElem; //some variables regarding NY Times to store the heading and article itself
var $nytElem;

function NYTSearch(){  // NY Times search function
    var nyItem = $("#nyItem").val();
    var nySearch = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+nyItem+"&sort=newest&api-key=8bdfd17823284d529d4812c0f5fc214c";
    $("#nytimes-articles").text("");  
    $.getJSON(nySearch, function(data){
        articles=data.response.docs;
        let howMany = Math.min(articles.length, 4); //showing max 4 the newest articles
        for (let i=0;i<howMany;i++){
            let article = articles[i];
            $nytElem.append("<li class='article'>"+"<a href='"+article.web_url+"'>"+article.headline.main+'</a>'+'<p>'+article.snippet + '</p></li>');
        };
        if (howMany == 0) $nytElem.append("<li class='article'>No articles found.</li>");
    });
}

function initMap(latit,longit) { // Google Maps display function
    var uluru = {lat: latit, lng: longit};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
}

var main = function(){
    $nytHeaderElem = $('#nytimes-header'); //some variables regarding NY Times to store the heading and article itself
    $nytElem = $('#nytimes-articles');

    initMap(51.509865,-0.118092) //starting map, for example London

    $("#showMap").on('click',function(){ //showing google map once "Pokaż" button is clicked
        data_lat = parseInt($('#latitude').val()*1000000)/1000000; //multiplying-dividing to have the precision of coordinates
        data_long = parseInt($('#longitude').val()*1000000)/1000000;
        initMap(data_lat,data_long);
    });

    $(".city").on('click', function(){
        initMap((parseInt($(this).attr("data-lat")*1000000)/1000000),(parseInt($(this).attr("data-long")*1000000)/1000000));
    })

    $("#showArticles").on('click',NYTSearch); //NYTimes search button
}

$(document).ready(main);
