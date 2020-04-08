const userReplyBody = document.getElementById('commentBody--replies');
const userReplyButton = document.getElementById('btn_comment--replies');

userReplyButton.disabled = true;

userReplyBody.addEventListener("keyup", () => {
    if (userReplyBody.value.trim().length > 0) {
        // console.log(userReplyBody.value);
        userReplyButton.disabled = false;
    } else {
        userReplyButton.disabled = true;
    }
})
