
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
        recipeDetails.append(image, recipeHeading, description, ingredientsHeading, ingredientsList, instructionHeading, instructionList, serves, prepTime, cookTime);
        
        // Empty the recipeContainer and append the new recipe details
        recipeContainer.empty().append(recipeDetails);
        
        }) 
    }
    
    function handleForm(e) {
        e.preventDefault();
        const searchField = $("#search-field").val();
        getRecipe(searchField)        
    }
      //handle form submissions
      $("#search-btn").on("click", handleForm);


// get trending trending recipes
function trendingRecipes() { 
    const options2 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dba8a30f3bmsh6d57e2363b99b58p123acajsn53546ffc007f',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    
    fetch('https://tasty.p.rapidapi.com/feeds/list?size=5&timezone=%2B0700&vegetarian=false&from=0', options2)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        //console.log(data);
        
        let trendingSearches = data.results[2].items
        console.log(trendingSearches);
        
        let trendingSection = $('#trending-section')
        let container;
        trendingSection.empty()
        
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
            trendingSection.append(container)
        }
        console.log(container);
        
        trendingSection.on('click', function(e) {
            let test = e.target
            console.log(test); 
        })          
    });
}
    
//click on trending recipes tab will show recipes
$('#trending-recipes-tab').on('click', trendingRecipes);

//get featured recipes
function featuredRecipes() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e1517c5425msh5e3b74296622da7p1b0b1ajsn2a8993a63f53',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    
    fetch('https://tasty.p.rapidapi.com/feeds/list?size=5&timezone=%2B0700&vegetarian=false&from=0', options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            let featuredSearches = data.results[0].item.recipes
        console.log(featuredSearches);

        
        let trendingSection = $('#trending-section')
        let container;
        trendingSection.empty()
        
        for (let i = 0; i < featuredSearches.length; i++) {
            let trendingHeading = featuredSearches[i].name
            trendingImg = featuredSearches[i].thumbnail_url
            // create a div and img for each search
            container = $('<div>').addClass('trending-container')
            let img = $('<img>').attr('src', trendingImg)
            let trendingTitle = $('<h2>').addClass('trending-title')
            img.addClass('trending-img')
            // append 
            trendingTitle.text(trendingHeading)
            container.append(img, trendingTitle)
            trendingSection.append(container)
        }
        console.log(container);
        })
}

//click on spring treats tab will show recipes
$('#featured-recipes-tab').on('click', featuredRecipes);

//get spring sweets recipes
function springSweetsRecipes() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dba8a30f3bmsh6d57e2363b99b58p123acajsn53546ffc007f',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    
    fetch('https://tasty.p.rapidapi.com/feeds/list?size=5&timezone=%2B0700&vegetarian=false&from=0', options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

        let springSweets = data.results[3].items
        console.log(springSweets);
         
        $('#tab-heading').text(data.results[3].name)
        
        let trendingSection = $('#trending-section')
        let container;
        trendingSection.empty()
        
        for (let i = 0; i < springSweets.length; i++) {
            let trendingHeading = springSweets[i].name
            trendingImg = springSweets[i].thumbnail_url
            // create a div and img for each search
            container = $('<div>').addClass('trending-container')
            let img = $('<img>').attr('src', trendingImg)
            let trendingTitle = $('<h2>').addClass('trending-title')
            img.addClass('trending-img')
            // append 
            trendingTitle.text(trendingHeading)
            container.append(img, trendingTitle)
            trendingSection.append(container)
        }
        console.log(container);
        })
}
//click on spring sweets tab will show recipes
$('#sweets-recipes-tab').on('click', springSweetsRecipes);

$(document).ready(function() {
    $('#search-btn').click(function() {
      $('#homepage').hide();
    });

    $('#random-btn').click(function(){
        event.preventDefault();
        $('#homepage').hide();
        console.log ("you clicked the random button");
    });
    
    $('#title').on('click', function() {
      
        location.reload();
      });

  });