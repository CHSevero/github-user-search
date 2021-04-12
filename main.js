let btnSearch = document.querySelector("#btnSearch");
let userName = document.getElementById("search");
let bio = document.querySelector(".bio");
let repositories = document.querySelector(".repositories");


// Handle the search and populate the page
btnSearch.addEventListener('click', function(event){
    event.preventDefault();
    
    // Clear the bio seaction
    while(bio.firstChild){
        bio.removeChild(bio.lastChild);
    }

    while(repositories.firstChild){
        repositories.removeChild(repositories.lastChild);
    }

    // fetch the data and populate the bio section
    fetch(`https://api.github.com/users/${userName.value}`)
    .then(response => response.json())
    .then(json => {
        if(json['message']){
            let errorMessage = document.createElement('p');
            errorMessage.textContent = "Username not find.";
            bio.appendChild(errorMessage);
        }else {
            let name = document.createElement("h2");
            let followers = document.createElement("p");
            let following = document.createElement("p");
            let img = document.createElement('img');
            let email = document.createElement('p');
            let biogra = document.createElement('p');

            name.textContent = json["name"];
            bio.appendChild(name);

            img.src = json["avatar_url"];
            bio.appendChild(img);

            biogra.textContent = json['bio'];
            bio.appendChild(biogra);

            followers.textContent = 'Followers: ' + json["followers"];
            bio.appendChild(followers);

            following.textContent = 'Following: ' + json["following"];
            bio.appendChild(following);
            
            if(json['email'] !== null){
                email.textContent = 'Email: ' + json["email"];
                bio.appendChild(email);
            }
            
            updateRepositories(json['repos_url']);
        }
    })
    .catch(error => {
        console.log(error);
    })

    // Fetch the repositories data and fill then into the repositories section.
    // The function takes one parameter
    // repos_url: the repositories url
    function updateRepositories(repos_url) {
        fetch(repos_url)
        .then(response => response.json())
        .then(json => {
            let repo_heading = document.createElement('h2');
            repo_heading.textContent = 'Repositories';
            repositories.appendChild(repo_heading);
            let div = document.createElement('div');
            div.classList.add('layout');
            repositories.appendChild(div);
            for(let i=0; i< json.length; i++) {
                let div_ = document.createElement('div');
                let repo_name = document.createElement('h3');
                let description = document.createElement('p');
                let repo_link = document.createElement('a'); 

                repo_name.textContent = json[i]['name'];
                
                repo_link.appendChild(repo_name);
                repo_link.href = json[i]['html_url'];
                repo_link.target = '_blank';
                div_.appendChild(repo_link);

                description.textContent = json[i]['description'];
                div_.appendChild(description);

                

                div.appendChild(div_);
            }  
        })
    }

});