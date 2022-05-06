async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#updated-title').value.trim();
    const pub_text = document.querySelector('#updated-text').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/pubs/${id}`, {
      method: 'PUT',
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
      alert(response.statusText);
    }
  }
  
  document.querySelector('.update-post').addEventListener('submit', editFormHandler);
  