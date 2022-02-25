
document.addEventListener('DOMContentLoaded', e => {

  const TOKEN = 'f34a70eb4641dc5bbaef4bac8b27c9267239208b96db0e42470cec57833b52c7';
  const $form = document.getElementById('form');
  const $table = document.getElementById('table');
  const $error = document.getElementById('error')

  let dni = null
  
  $form.addEventListener('submit', async e => {
    e.preventDefault();

    if (dni !== null && dni === $form.dni.value) return alert('DNI ya ingresado')

    dni = $form.dni.value
    if (!dni || dni.length !== 8) return alert('El DNI no es valido')
    
    window.axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
    axios.get(`https://apiperu.dev/api/dni/${dni}`)
    .then(response => {
      if ($table.querySelector('tbody')) {
        $table.removeChild($table.querySelector('tbody'))
      }

      const $tbody = document.createElement('tbody') 

      for(const props in response.data.data) {
        const $tr = document.createElement('tr'),
            $th = document.createElement('th'),
            $td = document.createElement('td');
        
        $tr.append($th, $td)
        $tr.classList.add('bg-gray-200')
    
    
        $th.innerHTML = `${props}:`
        $th.classList.add('text-blue-600', 'p-3', 'text-left')
        
        $td.innerHTML = response.data.data[props]
        $td.classList.add('text-gray-800', 'py-2')
    
        $tbody.appendChild($tr)
      } 

      $table.appendChild($tbody)
      $error.innerHTML = ''
    })
    .catch(err => {
      $error.innerHTML = `Ocurrio un error ${err}`
      console.error(err)
    })
  })

})