const app = document.getElementById('app');

const totalItems = 50;
const itemsPerPage = 5;
const totalPages = Math.ceil(totalItems / itemsPerPage);

let currentPage = 1;

function renderItems(page) {
  const start = (page - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalItems);

  const list = document.createElement('ul');
  for (let i = start; i <= end; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    list.appendChild(li);
  }

  return list;
}

function renderPagination() {
  const pagination = document.createElement('div');
  pagination.className = 'pagination';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'page-button';
    if (i === currentPage) btn.classList.add('active');

    btn.addEventListener('click', () => {
      currentPage = i;
      update();
    });

    pagination.appendChild(btn);
  }

  return pagination;
}

function update() {
  app.innerHTML = '';
  app.appendChild(renderItems(currentPage));
  app.appendChild(renderPagination());
}

update();
