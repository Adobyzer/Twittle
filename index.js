import { tweetsData } from './data.js'
// add the uuid js library to get random UUID for tweets
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';



let anchor = document.querySelector("a")


anchor.addEventListener("click",function(){
    changeUser()
})
//this part for double click better UX 

document.addEventListener("dblclick",function(e){

    //listen to click on like button with handle function passing uuid as arg

    if(e.target.dataset.like){
        handleClickLike(e.target.dataset.like)
    }

    //listen to click on retweet button with handle function passing uuid as arg
    else if(e.target.dataset.retweet){
        handleClickRetweet(e.target.dataset.retweet)
    }
})

// separation of concern this for single click only model minding

document.addEventListener("click",function(e){

    //listen to click on  reply

     if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }

    //finally on the main button of the app
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
})

// render click like logic with not operator and filter array method 
function handleClickLike(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    
    else{
        targetTweetObj.likes++ 
    }

    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

// render click retweet logic with not operator and filter array method 
function handleClickRetweet(retweetId){
    const targetRetweetObj = tweetsData.filter(function(retweet){
        return retweet.uuid === retweetId
    })[0]
    
        if(targetRetweetObj.isRetweeted){
            targetRetweetObj.retweets--
        }
    
        else{
            targetRetweetObj.retweets++
        }
    
    targetRetweetObj.isRetweeted = !targetRetweetObj.isRetweeted
    
    render()
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    let userInfo = passInfoUser()

    console.log(userInfo)
    //if user write something eventually on text field
    if(tweetInput.value){

        console.log(userInfo)
        if(userInfo)
        {

            tweetsData.unshift({
                handle: `${userInfo[1]}`,
                profilePic: `images/${userInfo[0]}`,
                likes: 0,
                retweets: 0,
                tweetText: tweetInput.value,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4()
            })
        render()
        tweetInput.value = ''

        
        }
        
        else{

            tweetsData.unshift({
                handle: `@Boss`,
                profilePic: `images/captain.png`,
                likes: 0,
                retweets: 0,
                tweetText: tweetInput.value,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4()
            })
        render()
        tweetInput.value = ''
            }

    }

}

    
function changeUser(){
    let div = 
    
    `<div>
    <h1> Select a picture * </h1>

    <input type="file" id = "input">

    <h2> Enter a dope username to start twittle </h2>

    <input type="text" id="textfield">

    <button id="btn-change"> MAGIC CHANGE !</button>

    </div>`

    
    //make it visisble (toggle the switch)
    document.getElementById('modal').classList.toggle("hidden")


    document.querySelector("main").classList.toggle("hidden")

    document.getElementById('modal').innerHTML = div

    const btnMagic = document.getElementById("btn-change")

    btnMagic.addEventListener("click", handleClickMagicButton)
}

function passInfoUser(){


    let arr = []

    //get file image and name to change it dynamically

    const selectedFile = document.getElementById("input").files[0].name;


    //if user entered a file
    if(selectedFile){

        const pseudo = document.getElementById("textfield").value

        arr.push(selectedFile)

        arr.push(pseudo)

        //change the image dynamically

        const imgAvatar = document.getElementById('img-avatar')

        imgAvatar.src = `./images/${selectedFile}`

        return arr

    }

    else{

        alert("Upload a image first !!")

        return null
    }

}


function handleClickMagicButton(){

    
    let arr = []

     //get file image and name to change it dynamically

     const selectedFile = document.getElementById("input").files[0].name;


     //if user entered a file
     if(selectedFile){

         const pseudo = document.getElementById("textfield").value

         arr.push(selectedFile)

         arr.push(pseudo)
         
         //close the modal
 
 
         document.getElementById('modal').classList.toggle("hidden")
 
         document.querySelector("main").classList.toggle("hidden")

         //change the image dynamically

         const imgAvatar = document.getElementById('img-avatar')

         imgAvatar.src = `./images/${selectedFile}`

         return arr

     }

     else{

         alert("Upload a image first !!")

         return null
     }

    
}







function getFeedHtml(){
    let feedHtml = ""


    /* loop in each  generated tweet and add uuid for source identificator */

    
    tweetsData.forEach(function(tweet){
    
        //add ternarys operations for better refractor 
        const likeIconClass = tweet.isLiked ? 'liked': ''
        

        const retweetIconClass = tweet.isRetweeted ? 'retweeted': ''

        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>
                `
            })
        }


        feedHtml += `
                <div class="tweet">
                    <div class="tweet-inner">
                        <img src="${tweet.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${tweet.handle}</p>
                            <p class="tweet-text">${tweet.tweetText}</p>
                            <div class="tweet-details">
                                <span class="tweet-detail">
                                    <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                    ${tweet.replies.length}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                                    ${tweet.likes}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                                    ${tweet.retweets}
                                </span>
                            </div>   
                        </div>            
                    </div>
                    <div class="hidden" id="replies-${tweet.uuid}">
                        ${repliesHtml}
                    </div>  
                </div>
                `
   })
   return feedHtml 
}



/* render data from data.js */

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

