async function newFormHandler(event) {
    event.preventDefault();

    const title = document.getElementById('pub-title').value;
    const pub_text = document.getElementById('pub-text').value;

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

document.getElementById('new-post').addEventListener('submit', newFormHandler)