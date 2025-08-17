 const allProjects = Array.from(document.querySelectorAll('.project'));
    const loadMoreBtn = document.getElementById('loadMore');

    let currentCategory = 'all';
    let visible = 3;
    const step = 3;

    function getFiltered() {
      return allProjects.filter(p => currentCategory === 'all' || p.classList.contains(currentCategory));
    }

    function showProjects() {
      const filtered = getFiltered();

      // Hide all first
      allProjects.forEach(p => p.style.display = 'none');

      // Show only the first `visible` of filtered
      filtered.slice(0, visible).forEach(p => p.style.display = 'block');

      // Update button label/visibility
      if (filtered.length <= 3 && visible <= 3) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-block';
        loadMoreBtn.innerText = (visible >= filtered.length) ? 'Show Less' : 'Load More';
      }
    }

    // Initial render
    showProjects();

    // Load More / Show Less
    loadMoreBtn.onclick = () => {
      const filtered = getFiltered();
      visible = (visible >= filtered.length) ? 3 : Math.min(visible + step, filtered.length);
      showProjects();
    };

    // Filtering
    function filterProjects(category, btn) {
      currentCategory = category;
      document.querySelectorAll('.filter-buttons button').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      visible = 3; // reset on filter change
      showProjects();
    }

    // Modal
    function openModal(src) {
      document.getElementById("popupModal").style.display = "flex";
      document.getElementById("modalImg").src = src;
    }
    function closeModal() {
      document.getElementById("popupModal").style.display = "none";
    }
    function outsideClose(e) {
      if (e.target.id === "popupModal") closeModal();
    }