
var searchField = $('#search-field')


var recentSearches = JSON.parse(localStorage.getItem('history')) || [];

function searchFunction(data) {
  recentSearches.push(searchField.val());
//   searchField.val('');
  $('#searchHistory').text('');
  $.each(recentSearches, function (index, value) {
    $('#searchHistory').append("<li class='historyItem' onclick='addtosearchfield(" + index + ")'>" + value + '</li>');
  });
  localStorage.setItem('history', JSON.stringify(recentSearches));
}

function addtosearchfield(id) {
    searchField.val(recentSearches[id]);
  }
  
  // Autocomplete using jQuery UI
  searchField.autocomplete({
    source: recentSearches,
    minLength: 1
  });

  
  function getRecipe(search) {
     $('#recipe-heading').empty();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e1517c5425msh5e3b74296622da7p1b0b1ajsn2a8993a63f53',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };   
    
    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${search}`, options)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        // Search for the first recipe in the 'data.results' array that meets the following conditions:
        // 1. The 'instructions' property exists and contains at least one item.
        // 2. The 'sections' property exists and contains at least one item.
        const validRecipe = data.results.find(recipe => recipe.instructions && recipe.instructions.length > 0 && recipe.sections && recipe.sections.length > 0);
        console.log(validRecipe);

        const recipeObject = {
            image: validRecipe.thumbnail_url,
            recipeName: validRecipe.name,
            description: validRecipe.description,
            instructionsArray: [],
            ingredientsArray: [],
            serves: validRecipe.num_servings,
            prepTime: validRecipe.prep_time_minutes,
            cookTime: validRecipe.cook_time_minutes,
        }
        
        let recipeContainer = $('#recipe-section') 
        // Create a new div for the recipe details
        let recipeDetails = $('<div>');
        
        // get recipe image
        let image = $('<img>').addClass('recipe-image');
        image.attr('src', recipeObject.image)

        //get recipe heading
        let recipeHeading = $('<h1>').text(recipeObject.recipeName);
        recipeHeading.addClass('recipe-heading')
        
        //get recipe description
        let description = $('<p>').text(recipeObject.description);
        description.addClass('recipe-description')
        
        // get recipe ingredients - loop through each ingredient & create <li>
        let ingredients = validRecipe.sections[0].components;
        // add a heading to ingredients
        ingredientsHeading = $('<h2>').text('Ingredients').addClass('ingredients-heading')
        let ingredientsList = $('#ingredients-list');
        
        // Empty the ingredientsList before appending new ingredients
        ingredientsList.empty();
        
        // ingredient - loop through array of ingredients
        for (let i = 0; i < ingredients.length; i++) {
            let ingredient = ingredients[i].raw_text;
            recipeObject.ingredientsArray.push(ingredient)
            let recipeIngredient = $('<li>').text(ingredient);
            ingredientsList.append(recipeIngredient);
        }

        //cooking instructions - loop through each instruction & create <li>
        let instructions = validRecipe.instructions
        // add a heading to instructions
        instructionHeading = $('<h2>').text('Method').addClass('instructions-heading')
        let instructionList = $('#instruction-list');
 
        // Empty the instructionList before appending new instructions
        instructionList.empty();
        
        for (let i = 0; i < instructions.length; i++) {
            let displayText = instructions[i].display_text
            recipeObject.instructionsArray.push(displayText)
            let recipeInstructions = $('<li>').text(displayText);
            instructionList.append(recipeInstructions)
        }
        
        // additional recipe information
        // only display additional info if it exists in the object
        if(recipeObject.serves !== null) {
          let serves = $('#serves').text(`Serves: ${recipeObject.serves}`);
        }

        let prepTime = $('#prep-time')
        if(recipeObject.prepTime !== null) {
           $('#prep-time').text(`Prep time: ${recipeObject.prepTime}`); 
        }
        
        let cookTime = $('#cook-time')
        if(recipeObject.cookTime !== null) {
           $('#cook-time').text(`Cook time: ${recipeObject.cookTime}`);
        }

        //append to recipe details container
        recipeDetails.append(recipeHeading, image, description, ingredientsHeading, ingredientsList, instructionHeading, instructionList, serves, prepTime, cookTime);
        
        // Empty the recipeContainer and append the new recipe details
        recipeContainer.empty().append(recipeDetails);
        
        }) 
    }

    function randomRecipie(event){
        event.preventDefault();
        const options = {
            method: 'GET',
            headers: {'X-RapidAPI-Key': 'e1517c5425msh5e3b74296622da7p1b0b1ajsn2a8993a63f53', 'X-RapidAPI-Host': 'tasty.p.rapidapi.com'}
        };
        var EndP= "https://tasty.p.rapidapi.com/recipes/list?from=0&size=15&tags=under_30_minutes";            
        fetch(EndP, options)
            .then(function(response1){
                return response1.json();
            })
            .then(function(data1){
                addRandomRecipie(data1);
            })
    }
    

    function addRandomRecipie(randBtnData){
        console.log(randBtnData);
        var data1= randBtnData;
        var randArr= Math.floor(Math.random() * data1.results.length);
        // var randArr = 17;
        console.log(data1.results.length);
        console.log(randArr);
        $("#ingredients-list").empty();
        $("#instruction-list").empty();
        $("#recipe-section h1").empty();
        $("#recipe-section span").empty();
        // $(".img-section").attr("src", "");
        
        var image= data1.results[randArr].thumbnail_url;
        var recipieName= data1.results[randArr].name;
        var description= data1.results[randArr].description;
        var serves= data1.results[randArr].yields;
        var prepTime= data1.results[randArr].prep_time_minutes;
        var cookTime= data1.results[randArr].cook_time_minutes;
        var randName= "<div><h1>"+recipieName+"</h1><span>"+description+"</span</div>";
        $("#recipe-section").prepend(randName);
        $("#img-section").attr("src", image);
        $("#serves").text(serves);
        $("#prep-time").text("Prep time: "+prepTime+ " mins");
        $("#cook-time").text("Cook time: "+cookTime+ " mins");

        
        for(var i2= 0; i2 < data1.results[randArr].sections[0].components.length; i2++){
            var ingredientsArray= [data1.results[randArr].sections[0].components];
            $("#ingredients-list").append("<li>"+ingredientsArray[0][i2].raw_text+"</li>");
        }
        for(var i = 0; i <  data1.results[randArr].instructions.length; i++){
            var instructionsArray= [data1.results[randArr].instructions];
            console.log(instructionsArray);
            $("#instruction-list").append("<li>"+instructionsArray[0][i].display_text+"</li>");
        }
        $("#img-section").css({"height": " 500px", "width": "500px", "margin-left": "30%"});
        $("#instruction-list li").css("list-style-type", "disc");

    }
    $("#random-btn").on("click", randomRecipie);
    
    function handleForm(e) {
        e.preventDefault();
        const searchField = $("#search-field").val();
        getRecipe(searchField)
        //remove the trending section if user searches for recipe
        //recipeTabSection.empty();     
    }
      //handle form submissions
      $("#search-btn").on("click", handleForm);

let recipeTabSection = $('#trending-section')

// get trending trending recipes
function trendingRecipes() { 
    const options2 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e1517c5425msh5e3b74296622da7p1b0b1ajsn2a8993a63f53',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    
    fetch('https://tasty.p.rapidapi.com/feeds/list?size=5&timezone=%2B0700&vegetarian=false&from=0', options2)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        
        let trendingSearches = data.results[2].items
        console.log(trendingSearches);

        let container;
        recipeTabSection.empty()
        
        for (let i = 0; i < trendingSearches.length; i++) {
            let trendingHeading = trendingSearches[i].name
            trendingImg = trendingSearches[i].thumbnail_url
            // create a div and img for each search
            container = $('<div>').addClass('trending-container')
            let img = $('<img>').attr('src', trendingImg)
            let trendingTitle = $('<h2>').addClass('trending-title')
            img.addClass('trending-img')
            // append 
            trendingTitle.text(trendingHeading)
            container.append(img, trendingTitle)
            recipeTabSection.append(container)
        }
        console.log(container);
        //click on recipe to log info
        recipeTabSection.on('click', function(e) {
            let test = e.target
            console.log(test); 
        })          
    });
}

trendingRecipes()