const skillsContainer = document.getElementById("skillsContainer")
const nextBtn = document.getElementById("skillsNext");
const prevBtn = document.getElementById("skillsPrev");
const track = document.getElementById("skillsTrack");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const contactBtn = document.getElementById("contactMe");
const contactItem1 = document.getElementById("contactItem1");
const contactItem2 = document.getElementById("contactItem2")  
const contactBackBtn = document.getElementById("backBtn");
const footer = document.getElementById("footer");

contactBtn.addEventListener("click",() =>{

  contactItem1.classList.add("hidden");
  contactItem2.classList.remove("hidden");
  footer.classList.add("hidden");
    
    
});

contactBackBtn.addEventListener("click", () =>{
    contactItem2.classList.add("hidden");
    contactItem1.classList.remove("hidden");
    footer.classList.remove("hidden");
})


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");

          const id = entry.target.getAttribute("id");
          document
            .querySelector(`nav a[href="#${id}"]`)
            .classList.add("active");
        });
      }
    });
  },
  {
    threshold: 0.6, // adjust this if needed
  }
);
sections.forEach((section) => {
  observer.observe(section);
});




const skillSets = [
  [
    "html5.png",
    "css.png",
    "JS.png",
    "sql.png",
    "github.png"
  ],
  [ "node.png",
    "react.png",
    "aws.png",
    "mongoDB.png",
    "postman.png"
   ]
];

let currentSet = 0;

function renderAll() {
  track.innerHTML = "";

  skillSets.forEach(set => {
    set.forEach(imgSrc => {
      const div = document.createElement("div");

      const img = document.createElement("img");
      img.src = `./Images/${imgSrc}`;

      div.appendChild(img);
      track.appendChild(div);
    });
  });
}

renderAll();

function updateSlide() {
  const itemWidth = 120; // same as CSS
  const itemsPerSet = skillSets[0].length;

  track.style.transform = `translateX(-${currentSet * itemWidth * itemsPerSet}px)`;
}

// 🔹 next
nextBtn.addEventListener("click", () => {
  currentSet = (currentSet + 1) % skillSets.length;
  updateSlide();
});

// 🔹 prev
prevBtn.addEventListener("click", () => {
  currentSet = (currentSet - 1 + skillSets.length) % skillSets.length;
  updateSlide();
});

let autoSlide = setInterval(() => {
  currentSet = (currentSet + 1) % skillSets.length;
  updateSlide();
}, 3000); // every 3 seconds


