(function(app){
    "use strict";
    app.factory("dataService", function () {
   // return a hardcoded profile for this example

   var images = {};
    images.list = [];

    images.add = function(img){
        images.list.push(img);
        alert(":adding from factory");
    };

   var labels = {
        created_at: "Date Added",
        size: "Size in Megabytes",
        type:"Type",
        category:"Category",
        description:"Description",
        place:"Place",
        aspect_ratio:"Aspect Ratio",
        author:"Free (Usage Rights)"
    }

   var types = [
            { name: 'Photo', value: 'photo' }, 
            { name: 'Logo', value: 'logo' }, 
            { name: 'Map', value: 'map' },
            { name: 'Chart', value: 'chart' },
            { name: 'Poster', value: 'poster' },
            { name: 'Publication', value: 'publication' }
            ];
    var date = [
    {name: "New - first", value:true},
    {name: "Old - first", value:false}
    ];

     var typeselect = [
            { name: 'All', value: '' }, 
            { name: 'Photo', value: 'photo' }, 
            { name: 'Logo', value: 'logo' }, 
            { name: 'Map', value: 'map' },
            { name: 'Chart', value: 'chart' },
            { name: 'Poster', value: 'poster' },
            { name: 'Publication', value: 'publication' }
            ];
   var soil = [
            { name: 'None', value: '' },
            { name: 'Black Cotton', value: 'blackcotton' },
            { name: 'Clay', value: 'clay' },
            { name: 'Red', value: 'red' },
            { name: 'Sand', value: 'sand' }
            
            ];

   var eco = [
               { name: 'None', value: '' },
            { name: 'Coastal', value: 'coast' },
            { name: 'Field', value: 'field' },
            { name: 'Forest', value: 'forest' },
            { name: 'Plantation', value: 'plantation' },
            { name: 'Ravine', value: 'ravine' },
            { name: 'Sacred Grove', value: 'sacredgrove' },
            { name: 'Sand Dune', value: 'dune' },           
            { name: 'Scrub Jungle', value: 'scrub' },
            { name: 'Wetland: Canal', value: 'canal' },
            { name: 'Wetland: Estuary', value: 'estuary' },
            { name: 'Wetland: Floodplain', value: 'floodplain' },
            { name: 'Wetland: Lake', value: 'lake' },
            { name: 'Wetland: Mangrove', value: 'mangrove' },
            { name: 'Wetland: Marsh', value: 'marsh' }, 
            { name: 'Wetland: Mud Flat', value: 'mudflat' },
            { name: 'Wetland: Pond', value: 'pond' },
            { name: 'Wetland: River', value: 'river' }, 
            { name: 'Wetland: Shallows', value: 'shallows' },
            { name: 'Wetland: Tidal Flat', value: 'tidalflat' }, 
            { name: 'Urban', value: 'urban' },
            { name: 'Hillock', value: 'hillock' },
            { name: 'Inland', value: 'inland' }
            ];

           var category = [
            { name: 'General', value: 'general' }, 
            { name: 'Art', value: 'art' },
            { name: 'Flora', value: 'flora' },
            { name: 'Fauna', value: 'fauna' }, 
            { name: 'Education', value: 'education' },
            { name: 'Event', value: 'event' },
            { name: 'People', value: 'people' },
            { name: 'Research', value: 'research' },
            { name: 'Social Enterprise', value: 'enterprise' },  
            { name: 'PFCommunity', value: 'pf-community' }
            ];

            var categoryselect = [
            { name: 'All', value: '' },
            { name: 'Art', value: 'art' },  
            { name: 'General', value: 'general' }, 
            { name: 'Flora', value: 'flora' },
            { name: 'Fauna', value: 'fauna' }, 
            { name: 'Education', value: 'education' },
            { name: 'Event', value: 'event' },
            { name: 'People', value: 'people' },
            { name: 'Research', value: 'research' },
            { name: 'Social Enterprise', value: 'enterprise' },  
            { name: 'PFCommunity', value: 'pf-community' }
            ];

            var country = [
            { name: 'India', value: 'india' }, 
            { name: 'Other', value: 'other' }
            ];

            var state = [
            { name: 'Tamil Nadu', value: 'tamilnadu' }, 
            { name: 'Kerala', value: 'kerala' },
            { name: 'Andhra Pradesh', value: 'andhra' }, 
            { name: 'Karnataka', value: 'karnataka' }
            ];
            
            var place = [
            { name: 'Pitchandikulam', value: 'pitchandikulam' }, 
            { name: 'Nadukuppam', value: 'nadukuppam' },
            { name: 'Kadapakkam', value: 'kadapakkam' }, 
            { name: 'Adyar Poonga', value: 'adyar' },
            { name: 'Chennai', value: 'chennai' },
            { name: 'Kazhuveli', value: 'kazhuveli' }
            ];

              var placeselect = [
            { name: 'All', value: '' }, 
            { name: 'Pitchandikulam', value: 'pitchandikulam' }, 
            { name: 'Nadukuppam', value: 'nadukuppam' },
            { name: 'Kadapakkam', value: 'kadapakkam' }, 
            { name: 'Adyar Poonga', value: 'adyar' },
            { name: 'Chennai', value: 'chennai' },
            { name: 'Kazhuveli', value: 'kazhuveli' }
            ];

   return {
            typeOptions: function() {return types;},
            typeSelectOptions: function() {return typeselect;},
            placeOptions: function() {return place;},
            placeSelectOptions: function() {return placeselect;},
            stateOptions: function() {return state;},
            countryOptions: function() {return country;},
            categoryOptions: function() {return category;},
            categorySelectOptions: function() {return categoryselect;},
            ecoOptions: function() {return eco;},
            soilOptions: function() {return soil;},
            labelsOption: function() {return labels;},
            dateOption: function() {return date;},
            images: function() {return images;}
        };
    });
})(PFApp);
       


// .service('dataService', function() {

//   // private variable
//   var _dataObj = {};
//   var _dataArr = [];

//   // public API
//   this.dataObj = _dataObj;
//   this.dataArr = _dataArr;
//   this.typeOptions = 
// })
