var searchField = $('#search-field')

// function GetRecipe() {
              
//     const options1 = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '8d789e69ebmshb3b96351afb1710p18b2f6jsnc1ff524e4196',
//             'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
//         }
//     };

//     let searchField = 'pizza'
//     fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=&${searchField}`, options1)

//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
        
//         const recipeObject = {
//             recipeName: data.results[0].name,
//             description: data.results[0].description,
//             instructionsArray: [],
//             ingredientsArray: [],
//             serves: data.results[0].num_servings,
//             cookTime: data.results[0].cook_time_minutes,
//             prepTime: data.results[0].prep_time_minutes,
            
//         }    
//         console.log(recipeObject);

//         let recipeContainer = $('#recipe-section') 
        
//         //get recipe heading
//         let recipeHeading = $('<h1>').text(recipeObject.recipeName);
//         recipeHeading.addClass('recipe-heading')
        
//         //get recipe description
//         let description = $('<p>').text(recipeObject.description);
//         description.addClass('recipe-description')
        
//         // get recipe ingredients - loop through each ingredient & create <li>
//         let ingredients = data.results[0].sections[0].components;
//         recipeObject.ingredientsArray.push(ingredients)
//         let ingredientsList = $('#ingredients-list');
//         // ingredient - loop through array of ingredients
//         for (let i = 0; i < ingredients.length; i++) {
//             let ingredient = ingredients[i].raw_text;
//             let recipeIngredient = $('<li>').text(ingredient);
//             ingredientsList.append(recipeIngredient);
//         }
        
//         //cooking instructions - loop through each instruction & create <li>
//         let instructions = data.results[0].instructions
//         let instructionList = $('#instruction-list');
        
//         for (let i = 0; i < instructions.length; i++) {
//             let displayText = instructions[i].display_text
//             recipeObject.instructionsArray.push(displayText)
//             let recipeInstructions = $('<li>').text(displayText);
//             instructionList.append(recipeInstructions)
//         }
        
//         //additional recipe information
//         $('#serves').text(recipeObject.serves);
//         $('#prep-time').text(recipeObject.prepTime);
//         $('#cook-time').text(recipeObject.cookTime);
        
        
//         //append to recipe container
//         recipeContainer.append(recipeHeading, description, ingredientsList, instructionList)
        
//     })
// }

//GetRecipe()


function getRecipe(search) {

    $('#recipe-heading').empty();

    const options3 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8d789e69ebmshb3b96351afb1710p18b2f6jsnc1ff524e4196',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    // let search = searchField.val();
    // console.log(search);
    
    
    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${search}`, options3)
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
      
}
    
    function handleForm(e) {
        e.preventDefault();
        const searchField = $("#search-field").val();
        getRecipe(searchField)
    }
      //handle form submissions
      $("#search-btn").on("click", handleForm);