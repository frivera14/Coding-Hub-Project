async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#pub-title').value;
    const pub_text = document.querySelector('#pub-text').value;

    const response = await fetch(`/api/pubs`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            pub_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.new-post').addEventListener('submit', newFormHandler)