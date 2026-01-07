fetch('tool-registry.json')
  .then(response => response.json())
  .then(tools => {
    const container = document.getElementById('tools-container');
    tools.forEach(tool => {
      const card = document.createElement('div');
      card.className = 'tool-card';
      card.onclick = () => window.location.href = tool.route;
      card.innerHTML = `
        <span>${tool.icon}</span>
        <h2>${tool.name}</h2>
        <p>${tool.description}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading tools:', err));

