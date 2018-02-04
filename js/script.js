
var $nytHeaderElem = $('#nytimes-header'); //some variables regarding NY Times to store the heading and article itself
var $nytElem = $('#nytimes-articles');

function NYTSearch(){  // NY Times search function
    var nyItem = $("#nyItem").val();
    var nySearch = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+nyItem+"&sort=newest&api-key=8bdfd17823284d529d4812c0f5fc214c";
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

function initMap() { // Google Maps display function
    latitude=parseInt($('#latitude').val()*1000000)/1000000; //multiplying-dividing to have the precision of coordinates
    longitude=parseInt($('#longitude').val()*1000000)/1000000;
    var uluru = {lat: latitude, lng: longitude};
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
    
    $("#showMap").on('click',function(){ //showing google map
        initMap();
    });

    $("#krakow").on('click',function(){ //cities
        $('#latitude').val(50.0646501);
        $('#longitude').val(19.9449799);
        initMap();
    });

    $("#wroclaw").on('click',function(){
        $('#latitude').val(51.107885);
        $('#longitude').val(17.038538);
        initMap();
    });

    $("#warszawa").on('click',function(){
        $('#latitude').val(52.229676);
        $('#longitude').val(21.012229);
        initMap();
    });

    $("#gdansk").on('click',function(){
        $('#latitude').val(54.352025);
        $('#longitude').val(18.646638);
        initMap();
    });

    $("#california").on('click',function(){
        $('#latitude').val(33.764000);
        $('#longitude').val(-118.182356);
        initMap();
    });

    $("#showArticles").on('click',NYTSearch); //NYTimes search button
}

$(document).ready(main);