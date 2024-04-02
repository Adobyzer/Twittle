import { tweetsData } from './data.js'
const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')

tweetBtn.addEventListener('click', function(){
    alert(tweetInput.value)
})

document.addEventListener("click",function(e){

    //listen to click on like button with handle function passing uuid as arg

    if(e.target.dataset.like){
        handleClickLike(e.target.dataset.like)
    }

    //listen to click on retweet button with handle function passing uuid as arg
    if(e.target.dataset.retweet){
        handleClickRetweet(e.target.dataset.retweet)
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


function getFeedHtml(){
    let feedHtml = ``


    /* loop in each  generated tweet and add uuid for source identificator */
    tweetsData.forEach(function(tweet){
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
                    <i class="fa-solid fa-heart" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
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

