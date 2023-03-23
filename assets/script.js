
// get search input value
function handleForm(e) {
    e.preventDefault()
    
    const searchField = $('#search-field').val()
    console.log(searchField);
}
//handle form submissions
$('#search-btn').on('click', handleForm)

// recipe list API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e1517c5425msh5e3b74296622da7p1b0b1ajsn2a8993a63f53',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', options)
	
.then(function(response){
    return response.json();
})
.then(function(data) {
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
    
    //get recipe heading
    let recipeHeading = $('<h1>').text(recipeObject.recipeName);
    recipeHeading.addClass('recipe-heading')
    
    //get recipe description
    let description = $('<p>').text(recipeObject.description);
    description.addClass('recipe-description')
    
    // get recipe ingredients - loop through each ingredient & create <li>
    let ingredients = data.results[0].sections[0].components;
    recipeObject.ingredientsArray.push(ingredients)
    let ingredientsList = $('#ingredients-list');
    // ingredient - loop through array of ingredients
    for (let i = 0; i < ingredients.length; i++) {
        let ingredient = ingredients[i].raw_text;
        let recipeIngredient = $('<li>').text(ingredient);
        ingredientsList.append(recipeIngredient);
    }
    
    //cooking instructions - loop through each instruction & create <li>
    let instructions = data.results[0].instructions
    let instructionList = $('#instruction-list');

    for (let i = 0; i < instructions.length; i++) {
        let displayText = instructions[i].display_text
        recipeObject.instructionsArray.push(displayText)
        let recipeInstructions = $('<li>').text(displayText);
        instructionList.append(recipeInstructions)

    }

    //additional recipe information
    $('#serves').text(recipeObject.serves);
    $('#prep-time').text(recipeObject.prepTime);
    $('#cook-time').text(recipeObject.cookTime);


    //append to recipe container
    recipeContainer.append(recipeHeading, description, ingredientsList, instructionList)
    
})

var randomBtn= $("#random-btn");
randomBtn.click(function(){
    console.log("pass");
    const options = {
        method: 'GET',
        headers: {'X-RapidAPI-Key': 'e1517c5425msh5e3b74296622da7p1b0b1ajsn2a8993a63f53', 'X-RapidAPI-Host': 'tasty.p.rapidapi.com'}
    };
    // "https://tasty.p.rapidapi.com/tips/list?id=3562&from=0&size=30";                            // This endpoint is used to load tips (reviews)
    // "https://tasty.p.rapidapi.com/recipes/get-more-info?id=8138";                               // Get more information of recipe if available, such as : ingredients, nutrition info, preparation, etc… This endpoint returns 404 status code, it means there is no more information to obtain.
    // "https://tasty.p.rapidapi.com/feeds/list?size=5&timezone=%2B0700&vegetarian=false&from=0"
    var EndP= "https://tasty.p.rapidapi.com/recipes/list-similarities?recipe_id=8630";             // List similar recipes by specific recipe id
    fetch(EndP, options)
        .then(function(response1){
            return response1.json();
        })
        .then(function(data1){
            console.log(data1);
        })
})