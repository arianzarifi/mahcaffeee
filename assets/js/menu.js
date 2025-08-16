fetch('data/menu.json') // داده‌ها را از فایل جیسون می‌گیرد
  .then(res => res.json()) // تبدیل به آبجکت جاوااسکریپتی
  .then(data => {
    const categories = data.categories;

    const categoryList = document.getElementById('categoryList');
    const menuItems = document.getElementById('menuItems');

    // ساخت دکمه‌های دسته‌بندی
    categories.forEach((cat, index) => {
      const btn = document.createElement('button');
      btn.className = "btncat" ;
      btn.textContent = cat.name;
    //   btn.innerHTML = cat.images;
      if (index === 0) btn.classList.add('active'); // اولین دکمه فعال باشد

      btn.addEventListener('click', () => {
        document.querySelectorAll('aside button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showItems(cat.items); // نمایش آیتم‌های همان دسته
      });
      const img = document.createElement('img');

      btn.innerHTML = `
       <img src="${cat.image}" alt="${cat.name}" style="width: 60px; height: 60px; object-fit: cover; " class = "img-cat">
       <br>
      <p class = "name-cat">${cat.name}</p>
      ` ;
  // توجه به نام کلید: image (نه images)
      img.style.objectFit = 'cover';
      img.style.borderRadius = '6px';
      img.style.marginLeft = '8px';
      btn.appendChild(img);
      categoryList.appendChild(btn);
    });

    // نمایش آیتم‌ها
    function showItems(items) {
      menuItems.innerHTML = ''; // پاک کردن محتوای قبلی

      items.forEach(item => {

        const card = document.createElement('div');
        card.className = 'card';

        let pricesHTML = '' ;
        item.prices.forEach(p => {
          pricesHTML += `<p class="price-item">${p.size} ${p.price} </p> `;
        });
        card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" style="width:100%; height:140px; object-fit:cover; border-radius:8px;" class = "item-img">
        <br>
          <h3>${item.title}</h3>
          <span class = "description">${item.description}</span>
              <div class="prices">
              ${pricesHTML}
              </div>
        
        `;
        
        menuItems.appendChild(card);
      });
    }

    showItems(categories[0].items); // نمایش اولین دسته پیش‌فرض
  });
  const buttons = document.querySelectorAll(".btncat");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });


