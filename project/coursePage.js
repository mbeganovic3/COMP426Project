//---------------ON PAGE LOAD---------------------

$(document).ready( async function() {
    // let postObj = await getPosts();
    // let posts = postObj.data.result;
    // console.log(posts);

    // var i;
    // for (i = 0; i < posts.length; i++) {
    //     console.log(posts[i])
    //     $('.display').append('<p>posts[i]</p>');
    // }
    console.log(localStorage.getItem('class'));
});

const getPosts = async function() {
    const auth = localStorage.getItem('jwt');
    return await privateRoot.get('/110', {headers: { Authorization: `Bearer ${auth}` }});
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

const privateRoot = new axios.create({
    baseURL: "http://localhost:3000/private"
});
