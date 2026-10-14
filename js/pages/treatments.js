document.addEventListener('DOMContentLoaded', () => {
  if (document.body?.dataset?.page !== 'treatments') return;

  initNavigation();
  initAgencyToast();

  const treatmentGrid = document.getElementById('treatmentGrid');
  const resultsCount = document.getElementById('resultsCount');
  const sortSelect = document.getElementById('sortSelect');
  const resetButton = document.getElementById('resetFilters');
  const searchField = document.getElementById('treatmentSearch');
  const allCategorySelect = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');
  const durationFilter = document.getElementById('durationFilter');
  const ratingFilter = document.getElementById('ratingFilter');
  const skinConcerns = Array.from(document.querySelectorAll('input[name="skinConcern"]'));

  if (!treatmentGrid || !resultsCount) return;

  function updateCount(value) {
    resultsCount.textContent = `${value} result${value === 1 ? '' : 's'}`;
  }

  function getPriceValue(value) {
    if (value === 'all') return null;
    const options = {
      under100: { max: 99 },
      '100-250': { min: 100, max: 250 },
      '250-500': { min: 250, max: 500 },
      over500: { min: 500 }
    };
    return options[value] || null;
  }

  function getDurationValue(value) {
    if (value === 'all') return null;
    const options = {
      under30: { max: 29 },
      '30-60': { min: 30, max: 60 },
      over60: { min: 61 }
    };
    return options[value] || null;
  }

  function getRatingValue(value) {
    if (value === 'all') return null;
    const options = { '4.0': 4, '4.5': 4.5, '4.8': 4.8 };
    return options[value] || null;
  }

  function sortTreatments(list, type) {
    const sorted = [...list];

    switch (type) {
      case 'az':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        sorted.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'recommended':
      default:
        sorted.sort((a, b) => (b.featured === true) - (a.featured === true) || b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
    }

    return sorted;
  }

  function renderTreatmentCards(list) {
    if (!list.length) {
      treatmentGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <h3>No treatments match</h3>
          <p>Try widening your search or reset the filters to explore the full catalogue.</p>
          <div class="inline-actions" style="justify-content: center; margin-top: 18px;">
            <button type="button" class="btn btn-dark" id="clearFiltersEmpty">Clear filters</button>
          </div>
        </div>
      `;

      const button = document.getElementById('clearFiltersEmpty');
      if (button) {
        button.addEventListener('click', resetFilters);
      }

      updateCount(0);
      return;
    }

    treatmentGrid.innerHTML = list.map((treatment) => `
      <article class="treatment-card">
        <img class="card-image" src="${treatment.image}" alt="${treatment.name}" loading="lazy" width="800" height="600">
        <div class="card-body">
          <div class="card-meta">
            <span>${treatment.category}</span>
            <span>${treatment.treatmentDuration}</span>
          </div>
          <h3>${treatment.name}</h3>
          <p>${treatment.shortDescription}</p>
          <div class="card-footer">
            <div class="price">${formatPrice(treatment.startingPrice)} <small>Illustrative</small></div>
            <div class="rating"><span class="star">★</span> ${treatment.rating} <span class="muted-copy">(${treatment.reviewCount})</span></div>
          </div>
          <div class="treatment-actions">
            <a class="btn btn-soft" href="treatment.html?id=${treatment.id}">View treatment</a>
            <a class="btn btn-dark" href="contact.html">Book consultation</a>
          </div>
        </div>
      </article>
    `).join('');

    updateCount(list.length);
  }

  function getSelectedConcerns() {
    return skinConcerns.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
  }

  function resetFilters() {
    if (searchField) searchField.value = '';
    if (allCategorySelect) allCategorySelect.value = 'all';
    if (priceFilter) priceFilter.value = 'all';
    if (durationFilter) durationFilter.value = 'all';
    if (ratingFilter) ratingFilter.value = 'all';
    if (sortSelect) sortSelect.value = 'recommended';
    skinConcerns.forEach((checkbox) => { checkbox.checked = false; });
    applyFilters();
  }

  function applyFilters() {
    const searchQuery = (searchField ? searchField.value : '').trim().toLowerCase();
    const categoryValue = allCategorySelect ? allCategorySelect.value : 'all';
    const priceRule = priceFilter ? getPriceValue(priceFilter.value) : null;
    const durationRule = durationFilter ? getDurationValue(durationFilter.value) : null;
    const selectedConcerns = getSelectedConcerns();
    const ratingRule = ratingFilter ? getRatingValue(ratingFilter.value) : null;
    const sortValue = sortSelect ? sortSelect.value : 'recommended';

    let filtered = TREATMENTS.filter((treatment) => {
      const matchesSearch = !searchQuery || [
        treatment.name,
        treatment.category,
        treatment.shortDescription,
        treatment.fullDescription,
        ...(treatment.skinConcerns || [])
      ].some((field) => String(field || '').toLowerCase().includes(searchQuery));

      const matchesCategory = categoryValue === 'all' || treatment.category === categoryValue;
      const matchesConcerns = !selectedConcerns.length || (treatment.skinConcerns || []).some((concern) => selectedConcerns.includes(concern));
      const matchesPrice = !priceRule || (
        (priceRule.min === undefined || treatment.startingPrice >= priceRule.min) &&
        (priceRule.max === undefined || treatment.startingPrice <= priceRule.max)
      );
      const matchesDuration = !durationRule || (
        (durationRule.min === undefined || treatment.durationMinutes >= durationRule.min) &&
        (durationRule.max === undefined || treatment.durationMinutes <= durationRule.max)
      );
      const matchesRating = !ratingRule || treatment.rating >= ratingRule;

      return matchesSearch && matchesCategory && matchesConcerns && matchesPrice && matchesDuration && matchesRating;
    });

    filtered = sortTreatments(filtered, sortValue);
    renderTreatmentCards(filtered);
  }

  const filterControls = [
    searchField,
    allCategorySelect,
    priceFilter,
    durationFilter,
    ratingFilter,
    sortSelect
  ].filter(Boolean);

  filterControls.forEach((element) => {
    element.addEventListener('input', applyFilters);
    element.addEventListener('change', applyFilters);
  });

  skinConcerns.forEach((checkbox) => checkbox.addEventListener('change', applyFilters));

  if (resetButton) {
    resetButton.addEventListener('click', resetFilters);
  }

  renderTreatmentCards(sortTreatments([...TREATMENTS], 'recommended'));
  applyFilters();
});
