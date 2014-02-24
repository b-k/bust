L.Control.FullScreen=L.Control.extend({options:{position:"topleft",title:"Full Screen",forceSeparateButton:false},onAdd:function(e){var t="leaflet-control-zoom-fullscreen",n;if(e.zoomControl&&!this.options.forceSeparateButton){n=e.zoomControl._container}else{n=L.DomUtil.create("div","leaflet-bar")}this._createButton(this.options.title,t,n,this.toogleFullScreen,e);return n},_createButton:function(e,t,n,r,i){var s=L.DomUtil.create("a",t,n);s.href="#";s.title=e;L.DomEvent.addListener(s,"click",L.DomEvent.stopPropagation).addListener(s,"click",L.DomEvent.preventDefault).addListener(s,"click",r,i);L.DomEvent.addListener(n,fullScreenApi.fullScreenEventName,L.DomEvent.stopPropagation).addListener(n,fullScreenApi.fullScreenEventName,L.DomEvent.preventDefault).addListener(n,fullScreenApi.fullScreenEventName,this._handleEscKey,i);L.DomEvent.addListener(document,fullScreenApi.fullScreenEventName,L.DomEvent.stopPropagation).addListener(document,fullScreenApi.fullScreenEventName,L.DomEvent.preventDefault).addListener(document,fullScreenApi.fullScreenEventName,this._handleEscKey,i);return s},toogleFullScreen:function(){this._exitFired=false;var e=this._container;if(this._isFullscreen){if(fullScreenApi.supportsFullScreen){fullScreenApi.cancelFullScreen(e)}else{L.DomUtil.removeClass(e,"leaflet-pseudo-fullscreen")}this.invalidateSize();this.fire("exitFullscreen");this._exitFired=true;this._isFullscreen=false}else{if(fullScreenApi.supportsFullScreen){fullScreenApi.requestFullScreen(e)}else{L.DomUtil.addClass(e,"leaflet-pseudo-fullscreen")}this.invalidateSize();this.fire("enterFullscreen");this._isFullscreen=true}},_handleEscKey:function(){if(!fullScreenApi.isFullScreen(this)&&!this._exitFired){this.fire("exitFullscreen");this._exitFired=true;this._isFullscreen=false}}});L.Map.addInitHook(function(){if(this.options.fullscreenControl){this.fullscreenControl=L.control.fullscreen(this.options.fullscreenControlOptions);this.addControl(this.fullscreenControl)}});L.control.fullscreen=function(e){return new L.Control.FullScreen(e)};(function(){var e={supportsFullScreen:false,isFullScreen:function(){return false},requestFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"",prefix:""},t="webkit moz o ms khtml".split(" ");if(typeof document.exitFullscreen!="undefined"){e.supportsFullScreen=true}else{for(var n=0,r=t.length;n<r;n++){e.prefix=t[n];if(typeof document[e.prefix+"CancelFullScreen"]!="undefined"){e.supportsFullScreen=true;break}}}if(e.supportsFullScreen){e.fullScreenEventName=e.prefix+"fullscreenchange";e.isFullScreen=function(){switch(this.prefix){case"":return document.fullScreen;case"webkit":return document.webkitIsFullScreen;default:return document[this.prefix+"FullScreen"]}};e.requestFullScreen=function(e){return this.prefix===""?e.requestFullscreen():e[this.prefix+"RequestFullScreen"](Element.ALLOW_KEYBOARD_INPUT)};e.cancelFullScreen=function(e){return this.prefix===""?document.exitFullscreen():document[this.prefix+"CancelFullScreen"]()}}if(typeof jQuery!="undefined"){jQuery.fn.requestFullScreen=function(){return this.each(function(){var t=jQuery(this);if(e.supportsFullScreen){e.requestFullScreen(t)}})}}window.fullScreenApi=e})()

d3.json("blackBox/js/oasp.json", function(statesData) { 
  //Class for customizing icons on zoom
  var LeafIcon = L.Icon.extend({
      options: {
          iconSize:     [15, 23],
          popupAnchor:  [0, -15]
      }
  });
  L.icon = function (options) {
      return new L.Icon(options);
  };
  function detectBoundaries(tipBounds, elem){
    tipBounds.left = (tipBounds.left + $(elem).width()) > window.innerWidth ? tipBounds.left - $(elem).width() - 30 : tipBounds.left;
    tipBounds.left = (tipBounds.left - $(elem).width()) < 0 ? $(elem).width() : tipBounds.left;

    tipBounds.top = (tipBounds.top + $(elem).height()) > window.innerHeight ? tipBounds.top - $(elem).height() + 10 : tipBounds.top;
    tipBounds.top = tipBounds.top < 0 ? $(elem).height() : tipBounds.top;

    return tipBounds;
  }
  function numberWithCommas(x) {
    if(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
      return "No Data";
    }     
  }

  //initialize map
  function initMap(statesData){
    // Added for stamen tiles
        var layer = new L.StamenTileLayer("toner");
        var map = new L.Map('mapdiv', {
            layers: [layer],
            center: new L.LatLng(-11.3514, 40.00977),
            zoom: 5,
            fullscreenControl: true,
            fullscreenControlOptions: { // optional
                title:"Fullscreen"
            }
        });
        map.addLayer(layer);

        return map;

    return map;
  }

  function getColorAsian(d) {
    return d > 250000 ? '#800026' :
     d > 100000  ? '#BD0026' :
     d > 10000  ? '#E31A1C' :
     d > 5000  ? '#FC4E2A' :
     d > 1000   ? '#FD8D3C' :
     d > 500   ? '#FEB24C' :
     d > 250   ? '#FED976' :
     d > 1    ? '#FFEDA0':
     isNaN(d) == true  ? '#ccc':
     d == 0 ?    '#ccc':
     '#ccc';
  }
  function getColorHawaiian(d) {
    return d > 50000 ? '#800026' :
     d > 20000  ? '#BD0026' :
     d > 10000  ? '#E31A1C' :
     d > 5000  ? '#FC4E2A' :
     d > 1000   ? '#FD8D3C' :
     d > 500   ? '#FEB24C' :
     d > 100   ? '#FED976' :
     d > 1    ? '#FFEDA0':
     isNaN(d) == true  ? '#ccc':
     d == 0 ?    '#ccc':
     '#ccc';
  }
  function getColorBoth(d){
    //10, 250, 500, 1000, 5000, 10000, 200000, 500000
    return d > 500000 ? '#800026' :
     d > 200000  ? '#BD0026' :
     d > 10000  ? '#E31A1C' :
     d > 5000  ? '#FC4E2A' :
     d > 1000   ? '#FD8D3C' :
     d > 500   ? '#FEB24C' :
     d > 250   ? '#FED976' :
     d > 1    ? '#FFEDA0':
     isNaN(d) == true  ? '#ccc':
     d == 0 ?    '#ccc':
     '#ccc';
  }
  function getColorJob(d) { 
    return d > 60 ? '#1F5C99' :
     d > 45  ? '#297ACC' :
     d > 30  ? '#47A3FF' :
     d > 20  ? '#47A3FF' :
     d > 10   ? '#70B8FF' :
     d > 5   ? '#B0D3FF' :
     d > 1   ? '#C8EAFF' :
     d >= 1    ? '#F3F7FF':
     isNaN(d) == true  ? '#1A1A1A':
     '#1A1A1A';
  }
  //Class for placing data on the map and tree map
  function buildMapData(statesData){
    
    function xAxisTooltip(e){
      // Grab the height of the generated tooltip
      var tmPopHeight = $(".leaflet-top.leaflet-right").height();
      var tmPopWidth = $(".leaflet-top.leaflet-right").width() / 2; 
      var tipBounds = {};
          tipBounds = e.pageX -305;

      tipBounds = detectBoundaries(tipBounds, "#mapdiv");

      if(tipBounds > 900){
        $(".leaflet-top.leaflet-right").css({
          "right":0, "width":"300px",
          "top":0, "opacity":0.9, "padding-bottom":"15px"
        });
      }else if(tipBounds < -10){
        $(".leaflet-top.leaflet-right").css({
          "left":0, "width":"300px",
          "top":0, "opacity":0.9, "padding-bottom":"15px"
        });
      }else{
        $(".leaflet-top.leaflet-right").css({
          "left":tipBounds, "width":"300px",
          "top":0, "opacity":0.9, "padding-bottom":"15px"
        });
      }  
      
      $("body").mouseover(function(e){
        $(".leaflet-top.leaflet-right").css("left", "");
        $(".leaflet-top.leaflet-left").css("top","");
      });
    }
    function treemapToolTip(popCount, sets, group, jobCount){
      // Grab the height of the generated tooltip
      var tmPopHeight = $("#treemapPopup").height();
      var tmPopWidth = $("#treemapPopup").width() / 2;

      // Style the title for the tooltip
      if(group == 'asian' && sets == 'jobcount'){
        $("#treemapPopup").css({"background": getColorAsian(popCount), "margin":0, "text-align":"center"});
      } else if(group == 'hawaiian' && sets == 'jobcount'){
        $("#treemapPopup").css({"background": getColorHawaiian(popCount), "margin":0, "text-align":"center"});
      }else{
        $("#treemapPopup").css({"background": getColorBoth(popCount), "margin":0, "text-align":"center"});
      }
      
      if(sets == 'populationcount'){
        $("#treemapPopup").css({"background": getColorJob(jobCount), "margin":0, "text-align":"center"});
      }
      
      // Position the tooltip based on mouse position
      $(document).mousemove(function(e){
        $("#treemapPopup").css({"left":e.pageX - tmPopWidth + "px","top":e.pageY - tmPopHeight-40 + "px", "opacity":0.9, "padding-bottom":"10px"});
      });
    } 
    //Not in Use yet 
    /*
    function barChartToolTip(MSA, ratio){
      $("#barchartPopup").show().html(
          "<p>"+MSA +": <br />"+
          "<strong>People Per Job Center:</strong> "+numberWithCommas(Math.round(ratio))+"<br />"
      );

      // Grab the height of the generated tooltip
      var tmPopHeight = $("#barchartPopup").height();
      var tmPopWidth = $("#barchartPopup").width() / 2;

      // Position the tooltip based on mouse position
      $(document).mousemove(function(e){
        var tmPopHeight = $("#barchartPopup").height();
        var tmPopWidth = $("#barchartPopup").width() / 2;

        // Position the tooltip based on mouse position
        $(document).mousemove(function(e){
          $("#barchartPopup").css({"left":e.pageX - tmPopWidth + "px","top":e.pageY - tmPopHeight-40 + "px", "opacity":0.9, "padding":"5px"});
        });
      });
    }
    */

    //Begin Choropleth code
    function choropleth(statesData, group){      
      function style(feature) {
        var ethnicGroup;
        //return dynamic legend
        switch(group){
          case 'hawaiian':
            ethnicGroup = feature.properties.hawaiian_pop;

            return {
              fillColor: getColorHawaiian(ethnicGroup),
              weight: 1,
              opacity: .5,
              color: getColorHawaiian(ethnicGroup),
              //dashArray: '3',
              fillOpacity: 0.7,
              className: feature.properties.metro_area.replace(/[\W\s]/g,"")
            };
          break;
          case 'asian':
            ethnicGroup = feature.properties.asian_pop;

            return {
              fillColor: getColorAsian(ethnicGroup),
              weight: 1,
              opacity: .5,
              color: getColorAsian(ethnicGroup),
              fillOpacity: 0.7,
              className: feature.properties.metro_area.replace(/[\W\s]/g,"")
            };
          break;
          case '':
            console.log("Group is not set.");
            return false;
          break;
          default:
            ethnicGroup = feature.properties.asian_pop + feature.properties.hawaiian_pop;

            return {
              fillColor: getColorBoth(ethnicGroup),
              weight: 1,
              opacity: .5,
              color: getColorBoth(ethnicGroup),
              fillOpacity: 0.7,
              className: feature.properties.metro_area.replace(/[\W\s]/g,"")
            };
        }//end switch
      }
      
      function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            //color: '#B7D2D2',
            color: '#000',
            dashArray: '1',
            fillOpacity: 2
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
        
        var mapPolyId = '#'+layer.feature.properties.metro_area.replace(/[\W\s]/g,"");
        $(mapPolyId).addClass("treemapNodeHighlight");
        //Hover text update
        info.update(e.target.feature.properties);
      }

      function resetHighlight(e) {
        var layer = e.target;
        var mapPolyId = '#'+layer.feature.properties.metro_area.replace(/[\W\s]/g,"");
        
        geojson.resetStyle(layer);
        info.update();       
        $(mapPolyId).removeClass("treemapNodeHighlight");
      }

      function zoomToFeature(e) {
          map.fitBounds(e.target.getBounds());
      }

      function mapToTreeIds(feature){
        return feature.properties.metro_area;
      }

      function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature, 
        });
        /*layer.on({ //Adds a second tooltip to map
          mouseover: toolTip,
          mouseout: toolTipHide
        });*/      
      }

      //Not is use, but working
      /*    
      function toolTip(feature){
        var data = feature.target.feature.properties;
        
        $("#dolofficesPopup").show().html(
            "<p><strong>DoL Offices: "+data.total_job_centers+"</p>"
        );

        // Grab the height of the generated tooltip
        var tmPopHeight = $("#dolofficesPopup").height();
        var tmPopWidth = $("#dolofficesPopup").width() / 2;


        // Position the tooltip based on mouse position
        $(document).mousemove(function(e){
          var tipBounds = {};
          tipBounds.left = e.pageX - 45,
          tipBounds.top = e.pageY - 80;

          $("#dolofficesPopup").css({"background": getColorJob(
              feature.target.feature.properties.total_job_centers
            ), "margin":0, "text-align":"center"});
          
          tipBounds = detectBoundaries(tipBounds, "#dolofficesPopup");    
          $("#dolofficesPopup").css({"left":tipBounds.left,"top":tipBounds.top, "opacity":0.9, "padding-bottom":"15px"});
        })
      }
      //Not is use, but working
      function toolTipHide(feature){
        $("#dolofficesPopup").hide();
      }
      */
      //End Choropleth code

      var info = L.control();
      info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();

        return this._div;
      };

      //Method that we will use to update the control based on feature properties passed
      info.update = function (metroArea) {     
        var Data ='', jobCenters, jobCenterName;

        // Position the tooltip based on mouse position            
        if(metroArea){
          jobCenterName = metroArea.metro_area.split("_");
          jobCenters = "<br /><div id='dolOffices' style='background:"+getColorJob(metroArea.total_job_centers)+" '>"+
            "Total # of DOL-Sponsored Offices:"
            +metroArea.total_job_centers +"</div>";

          switch(group){
            case 'both':
              Data ='<br /> Asian Population: '+ numberWithCommas(metroArea.asian_pop)
              +'<br /> Pacific Islander Population: '+ numberWithCommas(metroArea.hawaiian_pop)+
              jobCenters;
            break;
            case 'asian':
              Data ='<br /> Asian Population: '+ numberWithCommas(metroArea.asian_pop)+
              jobCenters;
            break;
            case 'hawaiian':
              Data ='<br /> Pacific Islander Population: '+ numberWithCommas(metroArea.hawaiian_pop)+
              jobCenters;
            break;
          }  
        }
        
        this._div.innerHTML = '<div id="populationBox">'+
          '<h4>Disease Areas Before or After Raids</h4>' +  
          (metroArea ?
              '<b> Metro Area: ' + jobCenterName[0]+ '</b>'+ Data
          : 'Hover over state areas.') +
        '</div>';
      };
      info.addTo(map);

      geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature,
      }).addTo(map);
    } //end choropleth() class
    
    /* Build Legend Color Scale */
    function legendMap(group){
      var div = "<div class='info legend'>",
      labels = [], grades = [], i;

      if(group == "hawaiian"){
        grades = [1, 100, 500, 1000, 5000, 10000, 20000, 50000];

        // loop through our density intervals and generate a label 
        //with a colored square for each interval for legend
        //div.innerHTML +='<i style="background:#ccc"></i>No Data<br>';
        for (i = 0; i < grades.length; i++) {
            div +=
                '<i style="background:' + getColorHawaiian(grades[i] + 1) + '; clear:both"></i> ' +
                numberWithCommas(grades[i]) + (grades[i + 1] ? '&ndash;' + numberWithCommas(grades[i + 1]) + '<br>' : '+');
        }
        return div;
      }else if(group == "asian"){
        grades = [10, 250, 500, 1000, 5000, 10000, 100000, 250000];

        for (i = 0; i < grades.length; i++) {
            div +=
                '<i style="background:' + getColorAsian(grades[i] + 1) + '; clear:both"></i> ' +
                numberWithCommas(grades[i]) + (grades[i + 1] ? '&ndash;' + numberWithCommas(grades[i + 1]) + '<br>' : '+');
        }
        return div;
      }else{
        grades = [10, 250, 500, 1000, 5000, 10000, 200000, 500000];

        for (i = 0; i < grades.length; i++) {
            div +=
                '<i style="background:' + getColorBoth(grades[i] + 1) + '; clear:both"></i> ' +
                numberWithCommas(grades[i]) + (grades[i + 1] ? '&ndash;' + numberWithCommas(grades[i + 1]) + '<br>' : '+');
        }
        div+="</div>"

        return div;
      }        
    }

    //Main
    function main(statesData){
      $(".leaflet-top.leaflet-right").css({
        "right":0
      });

      $("#mapdiv").mousemove(function(e){
          xAxisTooltip(e);   
      });

      var group = 'both', sets = 'jobcount';

      choropleth(statesData, group);
      stackedCharts(statesData, group);
      //treeMap(statesData, sets, group);

      $(".legendDiv").append(legendMap(group));
      $(".jobCenterSwitch").hide();
      $("#ethnicButtons input:radio[value=both]").prop('checked', true);

      //Group Switch
      $("#ethnicButtons input:radio[name=ethnic]").on( "click", function( event ) {
        var group = $(this).val().toLowerCase();
        map.removeLayer(geojson);
        $("#jobCenterButtons input:radio[value=jobcount]").prop('checked', true);

        //remove old legends when switching populations
        $(".legend").remove(); $(".info").remove(); 
        $("#treemap").remove();

        choropleth(statesData, group);
        treeMap(statesData, sets, group);
        $(".legendDiv").append(legendMap(group)); 
        $(".jobCenterSwitch").show();
        //Job Switch       
        $("#jobCenterButtons input:radio[name=jobC]").on( "click", function( event ) {
          var sets = $(this).val().toLowerCase();
          $("#treemap").remove();
 
          treeMap(statesData, sets, group);
        });
      });
      function onMapClick(e) {//Coordinate pop up
    popup.setLatLng(e.latlng)
         .setContent("Coordinates clicked are: " + e.latlng.toString())
         .openOn(map);
  }
  map.on('click', onMapClick);
    }
    main(statesData);
    //End Main

    //Working, but not in use
    
    function stackedCharts(statesData, group){//D3 Vis
      var width = 1200,
          height = 110;

      var y = d3.scale.linear()
          .range([height, 0]);

      var chart = d3.select(".chart")
          .attr("width", width)
          .attr("height", height);  

      var data = statesData.features;

      var filterData = data.filter(function(d){
        if(d.properties){
          if(d.properties.asian_pop || d.properties.hawaiian_pop){
            var total = d.properties.asian_pop + d.properties.hawaiian_pop;
            if(total > 20000)
              return d;
          }
        }
      });

      y.domain([0, d3.max(filterData, function(d) {
        var total = d.properties.asian_pop + d.properties.hawaiian_pop;
        var ratio = total / d.properties.total_job_centers;          
        return ratio;    
      })]);
      
      var barWidth = width / filterData.length;
   
      var bar = chart.selectAll("g")
        .data(filterData)
        .enter().append("g")
        .attr("transform", function(d, i) {
          return "translate(" + i * barWidth + ",0)"; 
        }); 

      bar.append("rect")
        .attr("y", function(d) { 
          var total = d.properties.asian_pop + d.properties.hawaiian_pop;
          var ratio = total / d.properties.total_job_centers;          
          return y(ratio);
        })
        .attr("height", function(d) { 
          var total = d.properties.asian_pop + d.properties.hawaiian_pop;
          var ratio = total / d.properties.total_job_centers;          
          return ratio/100;
        })
        .attr("width", barWidth - 1)
        .attr("class", "bar")
        .attr("id", function(d){
          return d.properties.metro_area.replace(/[\W\s]/g,"");
        });

      bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", function(d) { 
          var total = d.properties.asian_pop + d.properties.hawaiian_pop;
          return y(total) + 3;
        })
        .attr("dy", ".75em")
        .attr("title", function(d){
          var total = d.properties.asian_pop + d.properties.hawaiian_pop;
          return d.properties.metro_area +': '+numberWithCommas(total);
      });
    
      bar.on("mouseover", function (d) { 
        var total = d.properties.asian_pop + d.properties.hawaiian_pop;
        var ratio = total / d.properties.total_job_centers;
        var MSA = d.properties.metro_area;

        barChartToolTip(MSA, ratio);
      });
    }//end D3 Vis 
    /*
    function treeMap(statesData, sets, group){
      var margin = {top: 1, right: 0, bottom: 10, left: 0},
        width = 1197 - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom;

      var color = d3.scale.category20c();
      var root = statesData.features, newRoot = [], i, msaData; 
      
      //Create new object for tree map
      var msa = {name: "metro_areas", children:[]};
      for(i=0; i < root.length; i++){
        msaData = {name:root[i].properties.metro_area, 
          metro_area:root[i].properties.metro_area,
          job_centers: root[i].properties.total_job_centers, populus:group, 
          asian:root[i].properties.asian_pop,
          pacific_islander: root[i].properties.hawaiian_pop,
          total_pop:root[i].properties.aapi_pop,
          children: [
            {name: "jobcenters", size: root[i].properties.total_job_centers},
          ]
        } 

        msa.children.push(msaData);             
      } 
      newRoot.push(msa);

      var treemap = d3.layout.treemap()
        .size([width, height])
        .sticky(true)
        .value(function(d) { 
          return d.size; 
        });

      var div = d3.select("#dashboardA").append("div")
        .style("position", "relative")
        .attr("id", "treemap")
        .style("width", (width + margin.left + margin.right) + "px")
        .style("height", (height + margin.top + margin.bottom) + "px")
        .style("left", margin.left + "px")
        .style("top", margin.top + "px");

      var node = div.datum(newRoot[0]).selectAll(".node")
        .data(treemap.nodes)
        .enter().append("rect")
          .attr("class", "node")
          .attr("id", function(d){
            return d.metro_area ? d.metro_area.replace(/[\W\s]/g,""): null;
          })
          .call(position)
          .on("mouseover",function (d) {
            var group = d.parent.populus, text, popCount, mapPolyId, jobCenterName;
            
            if(d.parent.metro_area){
              
              mapPolyId = '.'+d.parent.metro_area.replace(/[\W\s]/g,"")
              jobCenterName = d.parent.metro_area.split("_");
            }
            
            if(group == "hawaiian"){ 
              popCount = d.parent.pacific_islander;           
              text = "<strong>Pacific Islander Population:</strong> "+
                numberWithCommas(popCount);
            }else if(group == "asian"){
              popCount = d.parent.asian;  
              text = "<strong>Asian Population:</strong> "+
                numberWithCommas(popCount);
            }else{
              popCount = d.parent.total_pop;  
              text = "<strong>Both Populations:</strong> "+
                numberWithCommas(popCount);
            }

            $("#treemapPopup").show().html(
              "<p>DOL-Sponsored Offices / Metro Area.<br />"
              +"<strong>"+jobCenterName[0] +"</strong><br />"+ text +'</p>'
            ); 

            treemapToolTip(popCount, sets, group, d.size);

            //add tree to map functionality
            d3.select("svg").selectAll(mapPolyId)
              .attr("stroke-width",6)
              .attr("fill-opacity","1.0")
              .attr("stroke","#000");            
          }
      )
      .on("mouseout",function (d) {
          var mapPolyId = '.'+d.parent.metro_area.replace(/[\W\s]/g,"");

          d3.select("svg").selectAll(mapPolyId)
            .attr("fill-opacity","0.7")
            .attr("stroke","")
            .attr("stroke-width",1);
        }
      );

      //Tree map transition
      node.transition().duration(1500);

      if(sets == 'populationcount'){
        node.text(function(d) { 
          if(d.size > 0){
            return d.parent.job_centers;
          }             
        })
        .style("font-weight","bold")
        .style("line-height","20px")
        .style("color","#fff");

        if(group == 'asian'){
          node.style("background", function(d) {                      
            if(d.asian){ 
              return getColorAsian(d.asian);                 
            }  
          });
        }else if(group == 'hawaiian'){
          node.style("background", function(d) {  
            if(d.pacific_islander){     
              return getColorHawaiian(d.pacific_islander);                                       
            }  
          });
        }else{
          node.style("background", function(d) {                      
            if(d.total_pop){ 
              return getColorBoth(d.total_pop);                 
            }  
          });
        }
      }
      if(sets == 'jobcount'){
        node.text(function(d) { 
            if(d.size > 0){
              return d.parent.job_centers;
            }             
          })
          .style("line-height","20px")
          .style("font-weight","bold")
          .style("color","#000")
          .style("background", function(d) {            
          if(d.size)
            return getColorJob(d.size); 
        });  
      }  

      function position() {
        this.style("left", function(d) { return d.x + "px"; })
            .style("top", function(d) { return d.y + "px"; })
            .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
            .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
      }
    }//end treeMap
    */
  }

  /*
  function getPoints(statesData){
    $.ajax({
      url: "blackBox/js/oshaReginalAndWhdDistrictOffices.json",
      dataType:'json',
      type: 'POST',
    }).done(function(data){
        //Create map points and Geometry for layer > 2
        function populate(pointsBucket){
          var generic, marker, oshaoffice, whdoffice, jobCentersComp, jobCentersCorps, jobCentersAffiliate;

          for(w=0; w < pointsBucket.length; w++){
              var firstWord = pointsBucket[w].TYPE.split(" ");

              switch(pointsBucket[w].TYPE){
                case "OSHA Regional Offices":
                  oshaoffice = new LeafIcon({iconUrl: 'blackBox/js/img/oshaOffice.png'});
                  marker = L.marker(
                    new L.LatLng(pointsBucket[w].LATITUDE, 
                        pointsBucket[w].LONGITUDE), 
                    {icon: oshaoffice}
                  );
                  break;
                case "WHD District Offices":
                  whdoffice = new LeafIcon({iconUrl: 'blackBox/js/img/whdOffice.png'});
                  marker = L.marker(
                    new L.LatLng(pointsBucket[w].LATITUDE, 
                        pointsBucket[w].LONGITUDE), 
                    {icon: whdoffice}
                  );
                  break;
                case "Comprehensive":
                  jobCentersComp = new LeafIcon({iconUrl: 'blackBox/js/img/jobCentersComp.png'});
                  marker = L.marker(
                    new L.LatLng(pointsBucket[w].LATITUDE, 
                        pointsBucket[w].LONGITUDE), 
                    {icon: jobCentersComp}
                  );
                  break;
                case "Job Corps Center":
                  jobCentersCorps = new LeafIcon({iconUrl: 'blackBox/js/img/jobCentersCorps.png'});
                  marker = L.marker(
                    new L.LatLng(pointsBucket[w].LATITUDE, 
                        pointsBucket[w].LONGITUDE), 
                    {icon: jobCentersCorps}
                  );
                  break;
                case "Affiliate":
                  jobCentersAffiliate = new LeafIcon({iconUrl: 'blackBox/js/img/jobCentersAffiliate.png'});
                  marker = L.marker(
                    new L.LatLng(pointsBucket[w].LATITUDE, 
                        pointsBucket[w].LONGITUDE), 
                    {icon: jobCentersAffiliate}
                  );
                  break;
                default:
                  generic = new LeafIcon({iconUrl: 'blackBox/js/img/jobCentersOther.png'});
                  marker = L.marker(
                    new L.LatLng(pointsBucket[w].LATITUDE, 
                        pointsBucket[w].LONGITUDE), 
                    {icon: generic}
                  );
              }
                 
              marker.bindPopup(
                  "<strong>Type: "+pointsBucket[w].TYPE+"</strong><br />"
                  +pointsBucket[w].NAME+"<br />"
                  +pointsBucket[w].Street_Address+"<br />"
                  +pointsBucket[w].City+","
                  +pointsBucket[w].State+", "
                  +pointsBucket[w].Zip+"<br />"
                );                   
            markers.addLayer(marker);
          }
          return false;
        }
        
        //Begin Layer 2 and 3 Intigration
        var pointsBucket = data,           
            jsonPoint = L.geoJson(pointsBucket, {
            filter: function(feature, layer) {
                return feature.properties.show_on_map;
            },
        });
        populate(pointsBucket);  
        
        var legendPoints = L.control({position: 'bottomright'});
        legendPoints.onAdd = function(map){
          var div = L.DomUtil.create('div', 'info2 legend2');
            div.innerHTML +='<i style="background:#CCFF33"></i>OSHA Regional Offices<br>';
            div.innerHTML +='<i style="background:#FF00FF"></i>WHD District Offices<br>';
            div.innerHTML +='<i style="background:#0099FF"></i>Affiliate Job Center<br>';           
            div.innerHTML +='<i style="background:#CC3300"></i>Comprehensive Job Center<br>';
            div.innerHTML +='<i style="background:#3B0737"></i>Job Corps Center<br>';
            
          return div;
        }  
        legendPoints.addTo(map); $(".info2").hide();  
        //END Layer 2 Construction    
    });
    //Zoom based Data Traversal method
    map.on('zoomend', function(e){
      if(map.getZoom() >= 6){                 
          map.addLayer(markers);           
          $(".info2").show();
      }
      // Add circles with job count
      if(map.getZoom() < 7){
          map.removeLayer(markers);
          $(".info2").hide();
      }
      if(map.getZoom() > 6){ 
        $(".info").hide(); 
        $(".ethnicSwitch").hide(); 
      }else{ 
        $(".info").show(); 
        $(".ethnicSwitch").show();
      } 
      if(map.getZoom() >= 7){ map.removeLayer(geojson); }//order matters

      if(map.getZoom() == 6 || map.getZoom() <= 5){ map.addLayer(geojson); }  
    });
  }//End getPoints()
  */
  
  var popup = L.popup();
  var map = initMap();
  var markers = new L.FeatureGroup(), polyData;
 
  buildMapData(statesData);
  //getPoints(statesData);

  //Place ID on both Map and Treemap with D3
  /*polyData = statesData.features;
  d3.select(map.getPanes().overlayPane).selectAll("path")
  .data(polyData)
  .attr("id", function(d){
    return d.properties.metro_area.replace(/[\W\s]/g,"");
  });*/
});       