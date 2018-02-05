var $nytHeaderElem = $('#nytimes-header'); //some variables regarding NY Times to store the heading and article itself
var $nytElem = $('#nytimes-articles');

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

cities = ['krakow','wroclaw','warszawa','gdansk','california'] //to add new city, put data into this 3 tables
lat_data = [50.0646501,51.107885,52.229676,54.352025,33.764000]
long_data = [19.9449799,17.038538,21.012229,18.646638,-118.182356]

var main = function(){

    initMap(51.509865,-0.118092) //starting map, for example London

    $("#showMap").on('click',function(){ //showing google map once "Pokaż" button is clicked
        lat_var = parseInt($('#latitude').val()*1000000)/1000000; //multiplying-dividing to have the precision of coordinates
        long_var = parseInt($('#longitude').val()*1000000)/1000000;
        initMap(lat_var,long_var);
    });

    $(".city").on('click', function(){
        for (let i=0;i<cities.length;i++){
            if ($(this).attr("id")==cities[i]){
                lat_var = lat_data[i];
                long_var = long_data[i]
            }
        }
        initMap(lat_var,long_var);
    })

    $("#showArticles").on('click',NYTSearch); //NYTimes search button
}

$(document).ready(main);
