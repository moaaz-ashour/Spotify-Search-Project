$(document).ready(function(){
   var moreResults;
   $('#textInput, #options').keypress(function(e){
      if(e.keyCode === 13){
         $('#go').click();
      }
   })

   $('#go').click(function (){
      $('#resultsBox').empty();
      $('#resultsForArtist').empty();
      var textInput = $('#textInput').val();
      var textInputValueEncoded = encodeURIComponent(textInput);
      var options = $('#options').val();
      $.ajax({
         url: 'https://api.spotify.com/v1/search?q=' + textInput + "&type=" + options,
         method: 'GET',
         dataType: 'json',
         success: function(data){
            if ($('#options').val() === 'artist'){
               var items = data.artists.items;
               moreResults = data.artists.next;
               if (items.length === 0){
                  $('#resultsForArtist').append("<h1> No results found for ' " +  textInput + " ' </h1>");
               } else {
                  $('#resultsForArtist').append("<h1>Results for ' " +  textInput + " ' </h1>");
                  for (var i = 0; i < items.length; i++) {
                     $('#resultsBox').append("<div class='innerResultBox'> <a href=" + items[i].external_urls.spotify + "><p>" + items[i].name + "</p></a>");
                     if(items[i].images.length > 0){
                        $('#resultsBox').append("<a href=" + items[i].external_urls.spotify + "> <img src=" + items[i].images[1].url + " height='200' width='200'><a></div>");
                     } else {
                        $('#resultsBox').append("<a href=" + items[i].external_urls.spotify + "> <img src='No_Image.png' height='200' width='200'><a></div>");
                     }
                  }
                  if (moreResults){
                     $('#showMoreResults').append("<button id='moreResultsButton'>" + 'Show More' + "</button>");
                     $('#moreResultsButton').click(function(){
                        getMoreResultsForArtists();
                     })
                  }
               }
            } else if ($('#options').val() === 'album'){
               var items = data.albums.items;
               if (items.length === 0){
                  $('#resultsForArtist').append("<h1> No results found for ' " +  textInput + " ' </h1>");
               } else {
                  $('#resultsForArtist').append("<h1>Results for ' " +  textInput + " ' </h1>");
                  for (var i = 0; i < items.length; i++) {
                     $('#resultsBox').append("<div class='innerResultBox'> <a href=" + items[i].external_urls.spotify + "><p>" + items[i].name + "</p></a>");
                     if(items[i].images.length > 0){
                        $('#resultsBox').append("<a href=" + items[i].external_urls.spotify + "> <img src=" + items[i].images[1].url + " height='200' width='200'><a></div>");
                     } else {
                        $('#resultsBox').append("<a href=" + items[i].external_urls.spotify + "><img src='No_Image.png.png' height='200' width='200'><a></div>");
                     }
                  }
                  if (moreResults){
                     $('#showMoreResults').append("<button id='moreResultsButton'>" + 'Show More' + "</button>");
                     $('#moreResultsButton').click(function(){
                        getMoreResultsForAlbums();
                     })
                  }
               }
            }
         }
      })
   })

   function getMoreResultsForArtists(){
      if(moreResults){
         $.ajax({
            url: moreResults,
            method: 'GET',
            dataType: 'json',
            success: function(data){
               moreResults = data.artists.next;
               for (var i = 0; i < data.artists.items.length; i++) {
                  $('#resultsBox').append("<div class='innerResultBox'> <a href="+ data.artists.items[i].external_urls.spotify +"><p>" + data.artists.items[i].name + "</p></a>");
                  if (data.artists.items[i].images.length > 0) {
                     $('#resultsBox').append("<a href=" + data.artists.items[i].external_urls.spotify + "> <img src=" + data.artists.items[i].images[0].url + " height='200' width='200'><a></div>");
                  } else {
                     $('#resultsBox').append("<img src='No_Image.png.png' height='200' width='200'><a></div>");
                  }
               }
            }
         })
      } else {
         $("#noMoreResults").append("<h1> No More Results To Show </h1>");
         $('#showMoreResults').empty();
      }
   }

   function getMoreResultsForAlbums() {
      if (moreResults) {
         $.ajax({
            url: moreResults,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
               moreUrl = data.albums.next;
               for (var i = 0; i < data.albums.items.length; i++) {
                  $('#resultsBox').append("<div class='innerResultBox'> <a href="+ data.albums.items[i].external_urls.spotify +"><p>" + data.albums.items[i].name + "</p></a>");
                  if (data.albums.items[i].images.length > 0) {
                     $('#resultsBox').append("<a href=" + data.albums.items[i].external_urls.spotify + "> <img src=" + data.albums.items[i].images[0].url + " height='200' width='200'><a></div>");
                  } else {
                     $('#resultsBox').append("<img src='No_Image.png.png' height='200' width='200'><a></div>");
                  }
               }
            }
         })
      } else {
         $('#noMoreResults').append("<h1> No More Results To Show </h1>")
         $('#showMoreResults').empty();
      }
   }
});
