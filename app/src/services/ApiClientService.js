const apiBase = 'http://localhost:8000/api/';

export async function ApiClientService(url, options = {}) {
  const access = window.localStorage.getItem('ACCESS');
  const headers = options.headers || {};
  if (access) {
    headers['Authorization'] = `Bearer ${access}`;
  }

  console.log(options);

  let response = await fetch(`${apiBase}${url}`, options);

  if (response.status === 401) {
    const refresh = window.localStorage.getItem('REFRESH');
    const refreshResponse = await fetch(`${apiBase}token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        refresh,
      }),
    });
    const refreshData = await refreshResponse.json();

    window.localStorage.setItem('ACCESS', refreshData.access);

    headers['Authorization'] = `Bearer ${refreshData.access}`;

    response = await fetch(`${apiBase}${url}`, options);
  }

  const data = await response.json();

  return data;
}
