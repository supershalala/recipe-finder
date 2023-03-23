var searchField = $('#search-field')

//<<<<<<< HEAD
var myArray = [];
var recentSearches = [];
function searchFunction(data) {

    recentSearches.push($('#search-field').val());
    $('#search-field').val("");
    $('#searchHistory').text("");
    $.each(recentSearches, function (index, value) {
        $('#searchHistory').append("<li class='historyItem'  onclick='addtosearchfield(" + index + ")'>" + value + '</li>');
    });
    localStorage.setItem('history',JSON.stringify(recentSearches))
}

function addtotextbox(id) {
    $('#search-field').val(recentSearches[id]);
    console.log(recentSearches);
}

// recipe list API
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'dba8a30f3bmsh6d57e2363b99b58p123acajsn53546ffc007f',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
};

fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${search}`, options),

    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        const recipeObject = {
            recipeName: data.results[0].name,
            description: data.results[0].description,
            instructionsArray: [],
            ingredientsArray: [],
            serves: data.results[0].num_servings,
            cookTime: data.results[0].cook_time_minutes,
            prepTime: data.results[0].prep_time_minutes,

        }
        console.log(recipeObject);




        let recipeContainer = $('#recipe-section')

        var myArray = [];
        myArray.push($('#search-field').val());
        var recentSearches = [];
        function searchFunction(data) {

            recentSearches.push($('#search-field').val());
            $('#search-field').val("");
            $('#searchHistory').text("");
            $.each(recentSearches, function (index, value) {
                $('#searchHistory').append("<li class='historyItem'  onclick='addtotextbox(" + index + ")'>" + value + '</li>');
            });
        }

        function addtotextbox(id) {
            $('#textboxSearch').val(recentSearches[id]);
        }
=======
function getRecipe(search) {

    $('#recipe-heading').empty();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'dba8a30f3bmsh6d57e2363b99b58p123acajsn53546ffc007f',
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
>>>>>>> main

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
           $('#prep-time').text(`Prep time: ${recipeObject.prepTime}`) 
        }
        
        let cookTime = $('#cook-time')
        if(recipeObject.cookTime !== null) {
           $('#cook-time').text(`Cook time: ${recipeObject.cookTime}`)
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
