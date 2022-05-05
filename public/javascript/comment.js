async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.getElementById("comment-text").value.trim();

    const pub_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                pub_id,
                comment_text
            }),
            headers: {
                'Content_Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById("add-comment").addEventListener('submit', commentFormHandler);