//--------------------RENDER HTML------------------

const renderUserClass = function(c) {
    let course = ['<div class="box post" style="background-color: #e7f4fd">',
    '<article class="media">',
        '<div class="media-content">',
            '<div class="content">',
                '<p><strong>',
                'COMP ', c,
                '</strong>',
                '</p>',
            '</div>',
        '</div>',
        '<div class="media-right">',
            '<button class="button is-danger">Remove</button>',
        '</div>',
    '</article>',
    '</div>'].join('');

    return course;
}

const renderClass = function(c) {
    let course = ['<div class="box post" style="background-color: #e7f4fd">',
    '<article class="media">',
        '<div class="media-content">',
            '<div class="content">',
                '<p><strong>',
                'COMP ', c.number,
                '</strong><br>',
                c.professor,
                '</p>',
            '</div>',
        '</div>',
        '<div class="media-right">',
            '<button id="join" class="button is-info" name="',
            c.number,
            '">Join</button>',
        '</div>',
    '</article>',
    '</div>'].join('');

    return course;
}

const renderPost = function() {
    let p = ['<div id="post.id" class="box post" >',
    '<article class="media">',
        '<div class="media-left">',
            '<figure class="image is-64x64">',
                '<img src="Default-Profile.png" alt="Image">',
            '</figure>',
        '</div>',
        '<div class="media-content">',
                '<div class="content">',
                    '<p><strong>Hannah Bodnar</strong><br> post content</p>',
                '</div>',
                '<nav class="level is-mobile">',
                    '<div class="level-left">',
                        '<button id="reply" class="level-item is-small" aria-label="reply" name="post.id">',
                                '<span class="replies icon is-small">',
                                    '<i class="fas fa-reply"></i>',
                                    '<p id="replyCount">#</p>',
                                '</span>',
                            '</button>',
                        '<button id="heart" class="level-item is-small" aria-label="like" name="post.id">',
                                '<span class="likes icon is-small">',
                                    '<i class="fas fa-heart" aria-hidden="true"></i>',
                                    '<p id="likeCount">#</p>',
                                '</span>',
                            '</button>',
                    '</div>',
                    '<div class="level-right">',
                    '</div>',
                '</nav>',
            '</div>',
    '</article>',
    '</div>'].join('');

    return p;
}

const renderUserPost = function() {
    let p = ['<div id="post.id" class="box post" style="background-color: #e7f4fd">',
    '<article class="media">',
        '<div class="media-left">',
            '<figure class="image is-64x64">',
                '<img src="Default-Profile.png" alt="Image">',
            '</figure>',
        '</div>',
        '<div class="media-content">',
            '<div class="content">',
                '<p><strong>My Name</strong><br> post content</p>',
            '</div>',
            '<nav class="level is-mobile">',
                '<div class="level-left">',
                    '<button id="reply" class="level-item is-small" aria-label="reply" name="post.id">',
                            '<span class="replies icon is-small">',
                                '<i class="fas fa-reply"></i>',
                                '<p id="replyCount">#</p>',
                            '</span>',
                        '</button>',
                    '<button id="heart" class="level-item is-small" aria-label="like" name="post.id">',
                            '<span class="likes icon is-small">',
                                '<i class="fas fa-heart" aria-hidden="true"></i>',
                                '<p id="likeCount">#</p>',
                            '</span>',
                        '</button>',
                '</div>',
                '<div class="level-right">',
                    '<button id="delete" class="button is-dark mine" name="post.id">Delete</button>',
                '</div>',
            '</nav>',
        '</div>',
    '</article>',
    '</div>'].join('');

    return p;
}

const renderPostForm = function() {
    let f = ['<div class="box post" style="background-color: #b8def9">',
    '<article class="media">',
        '<div class="media-content">',
            '<div class="content">',
                '<p>',
                    '<textarea id="body" class="textarea" placeholder="Type post here">',
                    '</textarea>',
                '</p>',
            '</div>',
            '<div class="container has-text-right">',
                '<button id="post" class="button is-dark"> Post </button>',
            '</div>',
        '</div>',
    '</article>',
    '</div>'].join('');
}

//---------------LOAD HOME PAGE-------------------

const loadPublicHome = async function() {
    // get classes
    let classes = await getAllCourses();
    
    let courses = classes.data.result;


    // generate and load classes using renderClass
    let rendered = [];

    courses.forEach (c => {rendered.push(renderClass(c))});
    $('.display').append(rendered);

    // add event handler for joining a class
    $(document).on("click", "#join", handleJoin);
}

const loadUserHome = async function() {
    $('.display').append('<div class="myClasses"></div>');
    $('.myClasses').append('<h1 class="is-family-primary" align="center"><strong>My Classes</strong></h1>');
    // get classes
    let myClasses = await getMyCourses();
    
    let courses = myClasses.data.result;

    console.log(courses);
    // generate and load classes using renderClass
    let rendered = [];

    courses.forEach (c => {rendered.push(renderUserClass(c))});
    $('.myClasses').append(rendered);

    // generate and load other classes
    $('.display').append('<div class="moreClasses"></div>');
    $('.myClasses').append('<h1 class="is-family-primary" align="center"><strong>More Classes</strong></h1>');

    // get classes
    let classes = await getAllCourses();
    
    let otherCourses = classes.data.result;


    // generate and load classes using renderClass
    let otherRendered = [];

    otherCourses.forEach (c => {
        if (!myClasses.includes(c.number)) {
            otherRendered.push(renderClass(c))
        }
    });
    $('.display').append(otherRendered);


    // add event handler for joining a class
    $(document).on("click", "#join", handleJoin);
}

const getAllCourses = async function() {
    return await pubRoot.get('/authors');
}

const getMyCourses = async function() {
    const auth = localStorage.getItem('jwt');
    return await userRoot.get('/' + auth, {headers: { Authorization: `Bearer ${auth}` }});
}

//---------------ON PAGE LOAD---------------------

$(document).ready(function() {
    // if (localStorage.getItem('name') == null) {
    //     loadPublicHome();
    // } else {
    //     loadUserHome();
    // }

    loadPublicHome();

    //Adding listener to search button
    var myEl = document.getElementById('searchButton');

    myEl.addEventListener('click', function() {
        selection = document.getElementById('mainSearchBar').value
        alert(selection);
    }, false);

});

//---------------JOIN A CLASS--------------------

const handleJoin = async function(event) {
    console.log(localStorage.getItem('name'));
    if (localStorage.getItem('name') == null) {
        window.location.replace("login.html");
    } else {
        const name = localStorage.getItem('name');
        const course = event.target.name;
        const auth = localStorage.getItem('jwt');
        axios
            .post("http://localhost:3000/user/" + auth + "/", {data: [course], type: "merge"}, {headers: { Authorization: `Bearer ${auth}` }},
            )
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }


    return;
}

// ---------------BACK END-----------------------

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
  });

const userRoot = new axios.create({
    baseURL: "http://localhost:3000/user"
});

const accountRoot = new axios.create({
    baseURL: "http://localhost:3000/account"
});