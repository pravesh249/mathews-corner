/**
 * MATHEWS CORNER - Interactive Frontend Logic
 * Kerala Hillside Homestay | Paruthumpara, Peermade, Kerala
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initRoomDataAndModals();
  initRoomFilters();
  initGalleryAndLightbox();
  initBookingForm();
  initReviewModal();
  initScrollAnimations();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL BEHAVIOR
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const links = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  links.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. ROOM DATA & INTERACTIVE ROOM MODAL
   ========================================================================== */
const ROOMS_DATA = {
  flowery: {
    id: 'flowery',
    title: 'Flowery',
    subtitle: 'Bathtub Suite • Mist Valley View',
    type: 'bathtub',
    bathType: 'Deep Soaking Bathtub + Rain Shower',
    teaGrade: 'Flowery Orange Pekoe (FOP)',
    image: 'assets/images/room_flowery.jpg',
    description: 'Inspired by the delicate Flowery Orange Pekoe tea harvest, this premier room features generous natural lighting, polished solid teak 4-poster Queen bed with linen canopy, and wide French balcony doors framing rolling mist and tea slopes. Indulge in an expansive private bathroom equipped with a deep soaking bathtub.',
    amenities: [
      'Queen-size 4-poster bed with hypoallergenic mattress',
      'Private luxury attached bathroom with soaking bathtub',
      'Private cantilevered balcony with panoramic hill views',
      '24-hour hot & cold running water',
      'Fresh High Range estate leaf tea & coffee station',
      'High-speed Wi-Fi (remote work ready)',
      'Smart TV with streaming access',
      'Natural cross-ventilation & ceiling fan',
      'Full mosquito mesh protection',
      'Safe drinking water & kettle'
    ]
  },
  tippy: {
    id: 'tippy',
    title: 'Tippy',
    subtitle: 'Bathtub Suite • Garden & Mist View',
    type: 'bathtub',
    bathType: 'Deep Soaking Bathtub + Brass Shower',
    teaGrade: 'Tippy Golden Flowery Orange Pekoe (TGFOP)',
    image: 'assets/images/room_tippy.jpg',
    description: 'Named after the prized golden tips of the High Ranges, Tippy is a haven of quiet reflection. It features warm wood paneling, comfortable Queen bed, a private balcony facing our cardamom garden and distant mist-shrouded peaks, complemented by a private bathtub designed for restorative warm soaks after hill walks.',
    amenities: [
      'Queen-size bed with soft organic cotton linens',
      'Private attached bathroom with deep soaking bathtub',
      'Private sunlit balcony facing spice gardens',
      '24-hour continuous hot & cold water',
      'In-room estate tea & local spice infusion kettle',
      'High-speed Wi-Fi',
      'Smart TV',
      'Optimal hill-breeze ventilation',
      'Mosquito screens on all windows',
      'Writing desk & reading chair'
    ]
  },
  elixir: {
    id: 'elixir',
    title: 'Elixir',
    subtitle: 'Bathtub Suite • Sunset Ridge View',
    type: 'bathtub',
    bathType: 'Scenic Window Bathtub + Rain Shower',
    teaGrade: 'The Revitalizing Cup (Golden Elixir)',
    image: 'assets/images/mathews_corner_bathtub_view.jpg',
    description: 'Celebrating the curative, soul-warming elixir of high-altitude orthodox teas. Elixir offers a handcrafted wooden mountain headboard, serene workspace with high-speed internet, private sunset balcony, and a warm private bath that captures the golden twilight over Peermade.',
    amenities: [
      'Queen-size bed with handcrafted mountain wood headboard',
      'Private attached bathroom with scenic bathtub',
      'Private western-facing balcony for golden sunsets',
      '24-hour hot water powered by solar backup',
      'Electric kettle with High Range tea selection',
      'Ergonomic work desk & Wi-Fi',
      'Smart TV',
      'Natural cross-ventilation & mountain air',
      'Mosquito protection',
      'Wardrobe with luggage bench'
    ]
  },
  velvet: {
    id: 'velvet',
    title: 'Velvet',
    subtitle: 'Balcony Room • Courtyard Garden View',
    type: 'standard',
    bathType: 'Standard Private Bathroom with Rain Shower',
    teaGrade: 'Velvet Full-Bodied Estate Blend',
    image: 'assets/images/room_crimson.jpg',
    description: 'Evoking the rich, velvety mouthfeel of aged Peermade tea leaves, Velvet is cozy and calming. Featuring sliding wooden doors to private attached bathroom, comfortable Queen bed, and a private balcony looking onto flowering tropical flora and morning birdsong.',
    amenities: [
      'Queen-size bed with plush duvet',
      'Private attached standard bathroom with rain shower',
      'Private balcony overlooking the inner garden',
      '24-hour hot & cold running water',
      'Tea & coffee making station',
      'High-speed Wi-Fi',
      'TV',
      'Pleasant mountain ventilation',
      'Mosquito netting & window screens',
      'Safe drinking water flask'
    ]
  },
  crimson: {
    id: 'crimson',
    title: 'Crimson',
    subtitle: 'Balcony Room • Sunrise Vista',
    type: 'standard',
    bathType: 'Standard Private Bathroom with Modern Shower',
    teaGrade: 'Amber-Crimson Liquor Grade',
    image: 'assets/images/room_emerald.jpg',
    description: 'Reflecting the glowing amber-crimson brew that warms Kerala mornings. Positioned to catch the earliest mountain sunrise, Crimson features a live-edge wooden work desk, wall-mounted TV, tea facilities, and private balcony to watch mist clear across Paruthumpara.',
    amenities: [
      'Queen-size bed with crisp linens',
      'Private attached standard bathroom with modern fittings',
      'Private sunrise-facing balcony',
      '24-hour hot & cold water',
      'Handcrafted live-edge work desk',
      'Tea & coffee facilities',
      'High-speed Wi-Fi',
      'Wall-mounted Smart TV',
      'Airy natural airflow & ceiling fan',
      'Mosquito protection throughout'
    ]
  },
  emerald: {
    id: 'emerald',
    title: 'Emerald',
    subtitle: 'Balcony Room • Plantation Slope View',
    type: 'standard',
    bathType: 'Standard Private Bathroom with Modern Shower',
    teaGrade: 'Emerald Estate Green Harvest',
    image: 'assets/images/peermade_hills.jpg',
    description: 'Named in honor of the undulating emerald carpets of Kallar and Peermade tea estates. Emerald provides direct balcony access overlooking lush plantation slopes and towering silver oak trees, making it a favorite for quiet readers and nature lovers.',
    amenities: [
      'Queen-size bed with extra warm hill-blankets',
      'Private attached standard bathroom with modern fixtures',
      'Private balcony framing emerald tea slopes',
      '24-hour hot & cold running water',
      'Tea & coffee kettle station',
      'High-speed Wi-Fi for remote work',
      'TV',
      'Ample natural ventilation',
      'Mosquito screens',
      'Tea table & comfortable outdoor chairs'
    ]
  }
};

function initRoomDataAndModals() {
  const modal = document.getElementById('room-detail-dialog');
  if (!modal) return;

  const modalImg = modal.querySelector('#room-modal-img');
  const modalTitle = modal.querySelector('#room-modal-title');
  const modalSubtitle = modal.querySelector('#room-modal-subtitle');
  const modalGrade = modal.querySelector('#room-modal-grade');
  const modalDesc = modal.querySelector('#room-modal-desc');
  const modalAmenities = modal.querySelector('#room-modal-amenities');
  const modalEnquireBtn = modal.querySelector('#room-modal-enquire-btn');
  const closeBtn = modal.querySelector('.modal-close-btn');

  // Open Room Detail
  document.querySelectorAll('.view-room-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const roomId = btn.dataset.room;
      const room = ROOMS_DATA[roomId];
      if (!room) return;

      modalImg.src = room.image;
      modalImg.alt = `${room.title} Room at Mathews Corner`;
      modalTitle.textContent = room.title;
      modalSubtitle.textContent = room.subtitle;
      modalGrade.textContent = `Heritage Grade: ${room.teaGrade}`;
      modalDesc.textContent = room.description;

      modalAmenities.innerHTML = room.amenities.map(amenity => `
        <div class="room-modal-amenity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${amenity}</span>
        </div>
      `).join('');

      modalEnquireBtn.onclick = () => {
        closeRoomModal();
        openBookingModal(room.title);
      };

      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
      document.body.style.overflow = 'hidden';
    });
  });

  const closeRoomModal = () => {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
    document.body.style.overflow = '';
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeRoomModal);
  }

  // Light dismiss on backdrop click
  modal.addEventListener('click', (e) => {
    const wrapper = modal.querySelector('.modal-content-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      closeRoomModal();
    }
  });

  modal.addEventListener('cancel', () => {
    document.body.style.overflow = '';
  });
}

/* ==========================================================================
   4. ROOM FILTERS (All, Bathtub Suites, Standard Bathrooms)
   ========================================================================== */
function initRoomFilters() {
  const filterBtns = document.querySelectorAll('.room-filter-btn');
  const roomCards = document.querySelectorAll('.room-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      roomCards.forEach(card => {
        const type = card.dataset.roomType;
        if (filter === 'all' || filter === type) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. GALLERY & LIGHTBOX MODAL
   ========================================================================== */
function initGalleryAndLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-dialog');
  
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('#lightbox-img');
  const lightboxCaption = lightbox.querySelector('#lightbox-caption');
  const closeBtn = lightbox.querySelector('.modal-close-btn');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentGalleryList = Array.from(galleryItems);
  let currentIndex = 0;

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const cat = item.dataset.category;
        if (filter === 'all' || filter === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      // Update active visible list for lightbox
      currentGalleryList = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    });
  });

  const showLightboxImage = (index) => {
    if (currentGalleryList.length === 0) return;
    if (index < 0) index = currentGalleryList.length - 1;
    if (index >= currentGalleryList.length) index = 0;

    currentIndex = index;
    const item = currentGalleryList[currentIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-title')?.textContent || '';
    const category = item.querySelector('.gallery-category')?.textContent || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || title;
    lightboxCaption.textContent = `${title} • ${category}`;
  };

  // Open Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      currentGalleryList = Array.from(galleryItems).filter(i => i.style.display !== 'none');
      const idx = currentGalleryList.indexOf(item);
      showLightboxImage(idx >= 0 ? idx : 0);
      if (typeof lightbox.showModal === 'function') {
        lightbox.showModal();
      } else {
        lightbox.setAttribute('open', '');
      }
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    if (typeof lightbox.close === 'function') {
      lightbox.close();
    } else {
      lightbox.removeAttribute('open');
    }
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showLightboxImage(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showLightboxImage(currentIndex + 1); });

  lightbox.addEventListener('click', (e) => {
    const wrapper = lightbox.querySelector('.modal-content-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.open) return;
    if (e.key === 'ArrowLeft') showLightboxImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showLightboxImage(currentIndex + 1);
  });
}

/* ==========================================================================
   6. BOOKING & STAY ENQUIRY FORM / WHATSAPP INTEGRATION
   ========================================================================== */
function initBookingForm() {
  const enquiryDialog = document.getElementById('booking-dialog');
  const closeBtn = enquiryDialog?.querySelector('.modal-close-btn');

  // Direct trigger buttons
  document.querySelectorAll('.open-booking-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preferredRoom = btn.dataset.room || '';
      openBookingModal(preferredRoom);
    });
  });

  if (closeBtn && enquiryDialog) {
    closeBtn.addEventListener('click', () => {
      if (typeof enquiryDialog.close === 'function') {
        enquiryDialog.close();
      } else {
        enquiryDialog.removeAttribute('open');
      }
      document.body.style.overflow = '';
    });
  }

  if (enquiryDialog) {
    enquiryDialog.addEventListener('click', (e) => {
      const wrapper = enquiryDialog.querySelector('.modal-content-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        if (typeof enquiryDialog.close === 'function') {
          enquiryDialog.close();
        } else {
          enquiryDialog.removeAttribute('open');
        }
        document.body.style.overflow = '';
      }
    });
  }

  // Handle all booking forms (inline and modal)
  document.querySelectorAll('.stay-enquiry-form').forEach(form => {
    // Set min dates
    const checkinInput = form.querySelector('input[name="checkin"]');
    const checkoutInput = form.querySelector('input[name="checkout"]');
    
    if (checkinInput && checkoutInput) {
      const today = new Date().toISOString().split('T')[0];
      checkinInput.min = today;

      checkinInput.addEventListener('change', () => {
        checkoutInput.min = checkinInput.value;
        if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
          const nextDay = new Date(checkinInput.value);
          nextDay.setDate(nextDay.getDate() + 1);
          checkoutInput.value = nextDay.toISOString().split('T')[0];
        }
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name') || 'Guest';
      const phone = formData.get('phone') || '';
      const checkin = formData.get('checkin') || 'Upcoming';
      const checkout = formData.get('checkout') || '';
      const room = formData.get('room') || 'Any Preferred Room';
      const guests = formData.get('guests') || '2';
      const notes = formData.get('notes') || '';

      // Prepare warm WhatsApp text
      const waMessage = `*New Stay Enquiry - Mathews Corner, Paruthumpara*\n\n` +
        `• *Name:* ${name}\n` +
        `• *Phone:* ${phone}\n` +
        `• *Dates:* Check-in ${checkin} to ${checkout}\n` +
        `• *Preferred Room:* ${room}\n` +
        `• *Guests:* ${guests}\n` +
        (notes ? `• *Special Notes:* ${notes}\n\n` : `\n`) +
        `We are looking forward to slowing down and experiencing the Kerala hills at Mathews Corner!`;

      const waUrl = `https://wa.me/919447012345?text=${encodeURIComponent(waMessage)}`;

      // Friendly confirmation UI
      form.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <div style="width: 54px; height: 54px; border-radius: 50%; background: #c5a059; color: #1b281e; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 style="font-family: 'Playfair Display', serif; font-size: 1.6rem; color: #c5a059; margin-bottom: 0.5rem;">Thank You, ${name}!</h3>
          <p style="color: #cbd4cc; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
            We have received your stay dates (<strong>${checkin}</strong> to <strong>${checkout}</strong>) for <strong>${room}</strong>. As Mathews Corner is our private family home, we personally assist each guest.
          </p>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="display: inline-flex; width: auto; font-size: 0.95rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.995.545 1.764.832 2.796.832h.005c3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.767-5.773-5.767zm7.53 10.966c-.347.982-1.724 1.83-2.398 1.954-.658.12-1.516.171-2.457-.132-2.784-.897-4.577-3.712-4.717-3.898-.139-.187-1.127-1.498-1.127-2.859 0-1.36.711-2.029.965-2.304.254-.275.553-.344.737-.344.184 0 .368.002.529.01.171.008.4-.065.626.478.234.562.797 1.944.866 2.085.069.141.115.306.023.49-.092.184-.139.299-.275.46-.139.16-.292.358-.418.48-.139.136-.284.285-.122.563.162.278.718 1.185 1.542 1.919 1.06 1.006 1.952 1.316 2.23 1.455.278.139.44.116.602-.07.162-.185.694-.809.878-1.087.185-.278.369-.232.624-.139.254.093 1.615.762 1.892.9.277.139.462.208.531.324.069.116.069.671-.278 1.653z"/>
            </svg>
            Connect Instantly on WhatsApp
          </a>
        </div>
      `;
    });
  });
}

function openBookingModal(preferredRoom = '') {
  const modal = document.getElementById('booking-dialog');
  if (!modal) return;

  const roomSelect = modal.querySelector('select[name="room"]');
  if (roomSelect && preferredRoom) {
    for (let option of roomSelect.options) {
      if (option.value.toLowerCase().includes(preferredRoom.toLowerCase()) || 
          option.text.toLowerCase().includes(preferredRoom.toLowerCase())) {
        option.selected = true;
        break;
      }
    }
  }

  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    modal.setAttribute('open', '');
  }
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   7. GUEST REVIEWS MODAL ("Share Your Experience")
   ========================================================================== */
function initReviewModal() {
  const reviewDialog = document.getElementById('review-dialog');
  const openBtns = document.querySelectorAll('.open-review-modal');
  const closeBtn = reviewDialog?.querySelector('.modal-close-btn');
  const form = document.getElementById('guest-review-form');
  const reviewsGrid = document.querySelector('.reviews-grid');

  if (!reviewDialog || !form) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof reviewDialog.showModal === 'function') {
        reviewDialog.showModal();
      } else {
        reviewDialog.setAttribute('open', '');
      }
      document.body.style.overflow = 'hidden';
    });
  });

  const closeReviewModal = () => {
    if (typeof reviewDialog.close === 'function') {
      reviewDialog.close();
    } else {
      reviewDialog.removeAttribute('open');
    }
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeReviewModal);

  reviewDialog.addEventListener('click', (e) => {
    const wrapper = reviewDialog.querySelector('.modal-content-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      closeReviewModal();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="reviewer_name"]').value;
    const location = form.querySelector('[name="reviewer_location"]').value;
    const roomStayed = form.querySelector('[name="reviewer_room"]').value;
    const feedback = form.querySelector('[name="reviewer_text"]').value;
    const rating = form.querySelector('[name="reviewer_rating"]:checked')?.value || '5';

    // Insert new review at the top of the grid
    if (reviewsGrid) {
      const card = document.createElement('div');
      card.className = 'review-card fade-in-up visible';
      card.innerHTML = `
        <div class="review-rating">
          ${'★'.repeat(parseInt(rating))}${'☆'.repeat(5 - parseInt(rating))}
        </div>
        <p class="review-quote">“${feedback}”</p>
        <div class="reviewer-meta">
          <div class="reviewer-avatar">${name.charAt(0)}</div>
          <div class="reviewer-details">
            <h5>${name}</h5>
            <span>${location} • Stayed in ${roomStayed}</span>
          </div>
        </div>
      `;
      reviewsGrid.prepend(card);
    }

    form.reset();
    closeReviewModal();
    showToast('Thank you for sharing your experience! Your kind words mean the world to our family at Mathews Corner.');
  });
}

/* ==========================================================================
   8. SCROLL INTERSECTION OBSERVER ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   9. ELEGANT FLOATING TOAST NOTIFICATION
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'site-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <span class="site-toast-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
      <span class="site-toast-text"></span>
    `;
    document.body.appendChild(toast);
  }

  toast.querySelector('.site-toast-text').textContent = message;
  toast.classList.add('show');

  if (window._toastTimeout) clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
