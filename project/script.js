

//--------------------RENDER HTML------------------

const renderUserClass = function(c) {
    let course = ['<div id="',
    c,
    '"class="box post" style="background-color: #e7f4fd">',
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
            '<button id="remove" class="button is-danger" name="',
            c,
            '">Remove</button>',
        '</div>',
    '</article>',
    '</div>'].join('');

    return course;
}

const renderClass = function(c) {
    let course = ['<div id="',
   "" + c.number + "",
    '"class="box post" style="background-color: #e7f4fd">',
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
    let menu = document.getElementById("menu");
    $(menu).replaceWith('<a style="margin-right: 12px" href="login.html" class="navbar-item">Login</a>');
    // get classes
    let classes = await getAllCourses();
    
    let courses = classes.data.result;


    // generate and load classes using renderClass
    let rendered = [];

    courses.forEach (c => {rendered.push(renderClass(c))});
    $('.display').append(rendered);

    // add event handler for joining a class
    $(document).on("click", "#join", handleJoin);
    // $(document).on("click", "#login", login);
}

const loadUserHome = async function() {
    // generate and load other classes
    $('.display').append('<div class="myClasses"></div>');
    $('.myClasses').append('<h1 class="is-family-primary" align="center"><strong>My Classes</strong></h1>');

    $('.display').append('<div style="margin-top: 15px" class="moreClasses"></div>');
    $('.moreClasses').append('<h1 class="is-family-primary" align="center"><strong>More Classes</strong></h1>');

    let myClasses = await getMyCourses();

    if (myClasses !== undefined) {

        let courses = myClasses.data.result;
        
        // generate and load classes using renderClass
        let rendered = [];
    
        courses.forEach (c => {rendered.push(renderUserClass(c))});
        $('.myClasses').append(rendered);

        // get classes
        let classes = await getAllCourses();

        let otherCourses = classes.data.result;
        
        
        // generate and load classes using renderClass
        let otherRendered = [];
    
        otherCourses.forEach (c => {
            if (!courses.includes("" + c.number + "")) {
                otherRendered.push(renderClass(c))
            }
        });
        $('.moreClasses').append(otherRendered);

    } else {
        // get classes
        let classes = await getAllCourses();
        
        let courses = classes.data.result;


        // generate and load classes using renderClass
        let rendered = [];

        courses.forEach (c => {rendered.push(renderClass(c))});
        $('.display').append(rendered);
    }
    
    // add event handler for joining a class
    $(document).on("click", "#join", handleJoin);
    $(document).on("click", "#remove", handleRemove);
    $(document).on("click", "#logout", handleLogout);
}

const getAllCourses = async function() {
    return await pubRoot.get('/authors');
}

const getMyCourses = async function() {
    const id = localStorage.getItem('id');
    const auth = localStorage.getItem('jwt');
    try {
        return await userRoot.get("http://localhost:3000/user/" + id + "/courses", {headers: { Authorization: `Bearer ${auth}` }});
    } catch(e) {
        return;
    }
}

//---------------ON PAGE LOAD---------------------

$(document).ready(function() {
    if (localStorage.getItem('name') == null) {
        loadPublicHome();
    } else {
        loadUserHome();
    }
});

//-----------------LOGOUT/LOGIN------------------------
const handleLogout = function(event) {
    event.preventDefault();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log("User signed out");
    });

    localStorage.clear();

    console.log("b");
    
    $(".display").empty();
    loadPublicHome();

}

function onLoad() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    })
}

function login(event) {
    console.log(window.location);
    // window.location.replace("login.html");
}
//---------------JOIN A CLASS--------------------

const handleJoin = async function(event) {
    if (localStorage.getItem('name') == null) {
        window.location.replace("login.html");
    } else {
        const id = localStorage.getItem('id');
        const course = event.target.name;
        console.log(course);
        const auth = localStorage.getItem('jwt');
        axios
            .post("http://localhost:3000/user/" + id + "/courses/", {data: [course], type: "merge"}, {headers: { Authorization: `Bearer ${auth}` }},
            )
            .then(res => console.log(res))
            .catch(err => console.log(err));
        let c = renderUserClass(course);
        let removed = document.getElementById(course);
        $(removed).remove();
        $('.myClasses').append(c);
    }

    return;
}

//------------REMOVE A CLASS---------------------\

const handleRemove = async function(event) {
    const id = localStorage.getItem('id');
    const course = event.target.name;
    const auth = localStorage.getItem('jwt');

    let x = await axios.get("http://localhost:3000/user/" + id + "/courses", {headers: { Authorization: `Bearer ${auth}` }});
    let y = x.data.result;

    axios.delete("http://localhost:3000/user/" + id + "/courses", {headers: { Authorization: `Bearer ${auth}` }});
    
    let array = [];
    y.forEach(c => {if (c != course) {
        array.push(c);
    }});

    axios.post("http://localhost:3000/user/" + id + "/courses/", {data: array}, {headers: { Authorization: `Bearer ${auth}` }},
    );
    
    let allClasses = await getAllCourses();
    let classes = allClasses.data.result;

    let toBeRendered = classes.filter(c => "" + c.number + "" == course);

    let renderedClass = renderClass(toBeRendered[0]);

    let removed = document.getElementById(course);

    $(removed).remove();

    $('.moreClasses').append(renderedClass);
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