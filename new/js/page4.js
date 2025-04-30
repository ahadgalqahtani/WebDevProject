document.addEventListener("DOMContentLoaded", function () {
  const startPlanningBtn = document.getElementById("startPlanningBtn");
  const citySelect = document.getElementById("city-select");
  const servicesSection = document.getElementById("services-list");
  const cityWarning = document.getElementById("city-warning");
  const noCityMessages = document.querySelectorAll(".no-city-message"); // Select all messages


  const serviceData = {
    "Riyadh": {
      venue: [
        {
          name: "The Ritz-Carlton Riyadh",
          description: "Starting from 80,000 SAR per event",
          image: "media/riyadhRitz.jpeg"
        },
        {
          name: "Al Mashreq Boutique Hotel",
          description: "From 45,000 SAR for full-day weddings",
          image: "media/AlMashreqRiyadh.jpg"
        },
        {
          name: "Nayyara Banqueting and Conferences Center",
          description: "Packages from 50,000 to 150,000 SAR",
          image: "media/nayyara.jpg"
        }
      ],
      catering: [
        {
          name: "AlFaisaliah Catering",
          description: "Luxury dining packages starting from 250 SAR per guest, tailored to elite events."
        },
        {
          name: "The Delicious Catering",
          description: "Mini buffets and gourmet dishes with full service, serving anywhere from 25 to 1,000 guests."
        },
        {
          name: "Vividevent Catering",
          description: "Curated menus for high-end weddings, priced from 15,000 to 60,000 SAR depending on scale."
        }
      ],
      cake: [
        {
          name: "Magnolia Bakery",
          description: "Signature wedding cakes starting from 1,000 to 4,500 SAR, fully customizable."
        },
        {
          name: "Dalia's Cakes",
          description: "Elegant tiered cakes and dessert tables priced from 800 to 3,000 SAR."
        },
        {
          name: "Vanilla Crumbs",
          description: "Designer cakes with floral or minimalist touches — ranges from 950 to 3,500 SAR."
        }
      ],
      decoration: [
        {
          name: "Bloom Events",
          description: "Full-service floral and lighting design from 12,000 to 70,000 SAR."
        },
        {
          name: "Orchid Designs",
          description: "Modern and classic themes starting from 10,000 SAR, ideal for ballroom and garden weddings."
        },
        {
          name: "Eventique Riyadh",
          description: "Custom setups including backdrops, stages, and aisle decor — packages from 15,000 SAR."
        }
      ],
      photography: [
        {
          name: "LensCrafters Riyadh",
          description: "Photo and video coverage starting from 7,000 to 18,000 SAR with cinematic options."
        },
        {
          name: "Dreamlight Studio",
          description: "Full-day photography with drone and album add-ons — from 6,500 SAR."
        },
        {
          name: "Nour Vision",
          description: "Elegant visual storytelling for weddings — packages range from 5,000 to 15,000 SAR."
        }
      ]
    },

    "Jeddah": {
      venue: [
        {
          name: "Park Hyatt Jeddah",
          description: "Luxury seaside venue — packages start at 90,000 SAR",
          image: "media/parkHyatt.jpg"
        },
        {
          name: "The Venue Corniche",
          description: "Elegant waterfront spaces — from 70,000 SAR per event",
          image: "media/theVenue.jpg"
        },
        {
          name: "Leylaty Ballroom",
          description: "Iconic wedding hall — from 55,000 to 120,000 SAR",
          image: "media/leylaty.jpeg"
        }
      ],
      catering: [
        {
          name: "Le Concheur Catering",
          description: "Gourmet catering — 220 to 350 SAR per guest"
        },
        {
          name: "Sultan Delights",
          description: "Customizable buffet packages from 18,000 SAR"
        },
        {
          name: "Gulf Events Catering",
          description: "Traditional and fusion menus — starting at 15,000 SAR"
        }
      ],
      cake: [
        {
          name: "The Cake Boutique",
          description: "Luxury wedding cakes — 1,200 to 4,500 SAR"
        },
        {
          name: "La Choclatine",
          description: "Handcrafted cakes and sweet tables — from 900 SAR"
        },
        {
          name: "Spoonful Bakery",
          description: "Minimalist cake designs — 750 to 2,500 SAR"
        }
      ],
      decoration: [
        {
          name: "Eventique Jeddah",
          description: "Complete decor setups from 15,000 to 65,000 SAR"
        },
        {
          name: "Jeddah Floral Studio",
          description: "Floral archways & tablescapes — packages from 10,000 SAR"
        },
        {
          name: "Sama Events",
          description: "Modern themes and LED installations — from 12,000 SAR"
        }
      ],
      photography: [
        {
          name: "Focus Studios",
          description: "Wedding photo/video packages from 6,000 SAR"
        },
        {
          name: "Al Saif Production",
          description: "High-end photo and drone coverage — 10,000+ SAR"
        },
        {
          name: "Memories Captured",
          description: "On-site albums and cinematic edits — from 8,000 SAR"
        }
      ]
    },

    "Dammam": {
      venue: [
        {
          name: "Sheraton Dammam Hotel",
          description: "Grand ballroom packages starting from 55,000 SAR to 120,000 SAR",
          image: "media/sheratondammam.jpg"
        },
        {
          name: "Dana Ballroom",
          description: "Elegant hall options ranging between 35,000 SAR and 90,000 SAR",
          image: "media/dana.jpg"
        },
        {
          name: "Mövenpick Hotel Al Khobar (near Dammam)",
          description: "Luxury waterfront venue packages from 70,000 SAR to 150,000 SAR",
          image: "media/movenpick.jpg"
        }
      ],
      catering: [
        {
          name: "DineFine Catering",
          description: "Customizable wedding menus with top chefs."
        },
        {
          name: "Najd Catering Dammam",
          description: "Traditional Saudi cuisine and buffet service — starting at 14,000 SAR"
        },
        {
          name: "Prestige Catering",
          description: "Elegant catering with themed setups — per guest from 200 SAR"
        }
      ],
      cake: [
        {
          name: "Cake House Dammam",
          description: "Beautifully crafted cakes for all wedding styles."
        },
        {
          name: "La Rose Bakery",
          description: "Elegant wedding cakes and dessert tables — from 950 SAR"
        },
        {
          name: "Whisk Studio",
          description: "Custom tiered cakes and sweet miniatures — 1,200 to 3,500 SAR"
        }
      ],
      decoration: [
        {
          name: "Dazzle Events",
          description: "Creative and elegant decor to match your dream wedding."
        },
        {
          name: "Orchid Events",
          description: "Stage, backdrop and lighting packages from 8,000 SAR"
        },
        {
          name: "White Dream Planners",
          description: "Floral centerpieces, arches and aisle design — from 12,000 SAR"
        }
      ],
      photography: [
        {
          name: "Memories Studio",
          description: "Expert photographers capturing every special moment."
        },
        {
          name: "CineClick Dammam",
          description: "Video & cinematic drone packages — 7,000 to 15,000 SAR"
        },
        {
          name: "Shutter Bliss",
          description: "Full wedding coverage + album creation — from 6,000 SAR"
        }
      ]
    }

  };

  function updateServiceInformation(city) {
    const serviceInfoElements = document.querySelectorAll('.city-service-info');
    if (serviceData[city]) {
      const cityServices = serviceData[city];

      const serviceKeys = ["venue", "catering", "cake", "decoration", "photography"];

      serviceKeys.forEach((key, index) => {
        const services = cityServices[key];
        if (services && services.length > 0) {
          // Begin wrapping all cards inside a container
          let cardsHTML = `<div class="service-card-container">`;

          services.forEach(service => {
            const cardHTML = key === "venue"
              ? `
                                <div class="service-card">
                                    <img src="${service.image}" alt="${service.name}" class="service-image">
                                    <div class="service-card-body">
                                        <h4 class="service-name">${service.name}</h4>
                                        <p class="service-description">${service.description}</p>
                                    </div>
                                </div>
                              `
              : `
                                <div class="service-card no-image">
                                    <div class="service-card-body">
                                        <h4 class="service-name">${service.name}</h4>
                                        <p class="service-description">${service.description}</p>
                                    </div>
                                </div>
                              `;
            cardsHTML += cardHTML;
          });

          cardsHTML += `</div>`; // End container
          serviceInfoElements[index].innerHTML = cardsHTML;
        }
      });
    }
  }



  function showNoCityMessages() {
    noCityMessages.forEach(msg => {
      msg.style.display = "block";
    });
  }


  function hideNoCityMessages() {
    noCityMessages.forEach(msg => {
      msg.style.display = "none";
    });
  }


  startPlanningBtn.addEventListener("click", function (event) {
    if (citySelect.value === "") {
      event.preventDefault();
      cityWarning.textContent = "Please select a city before proceeding.";
      showNoCityMessages();
    } else {
      cityWarning.textContent = "";
      hideNoCityMessages();
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  });


  citySelect.addEventListener("change", function () {
    if (citySelect.value === "") {
      cityWarning.textContent = "Please select a city.";
      showNoCityMessages();
    } else {
      cityWarning.textContent = "";
      hideNoCityMessages();
      updateServiceInformation(citySelect.value); // <--- add this line
    }
  });
}); 